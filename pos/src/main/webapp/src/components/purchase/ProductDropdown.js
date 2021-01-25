import React, {lazy, useCallback, useEffect, useState} from 'react';
import {emptyProduct} from "../../services/EmptyObjects";
import FastFoodIcon from '@material-ui/icons/Fastfood';
import AutocompleteDropdown from "../common/AutocompleteDropdown";
import {useDispatch, useSelector} from "react-redux";
import {createInventoryMovementLine} from "../../reducers/global/inventoryMovementReducer";
import {AxiosInventoryMovementClient, InventoryMovementLinePayload, MovementKind, QueryKeys} from "../../client/Client";
import store from "../../store";
import {useMutation, useQuery} from "react-query";

const NewProduct = lazy(() => import("../product-config/product/NewProduct"));

const inventoryMovementService = new AxiosInventoryMovementClient();
const kind = MovementKind.PURCHASE;

function addInventoryMovementLinePromise(inventoryMovementLine) {
    const inventoryMovementId = store.getState().inventoryMovement.get(kind).id;

    return inventoryMovementService.addInventoryMovementLine(inventoryMovementId, inventoryMovementLine).then(x => x.data)
}

export default function ProductDropdown({searchProductRef, setTableLoading}) {
    console.log("Inside ProductDropdown");

    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [key, resetAutocompleteInput] = useState(false);

    const {data: products, isLoading: productsLoading} = useQuery(QueryKeys.PRODUCTS);
    const {mutate: addInventoryMovementLine, isLoading} = useMutation(addInventoryMovementLinePromise, {
        onSuccess: data => createInventoryMovementLine(kind, data.inventoryMovementLines[data.inventoryMovementLines.length - 1], dispatch),
    });

    const supplier = useSelector(x => x.inventoryMovement.get(kind).supplier);
    const dispatch = useDispatch();

    useEffect(() => setTableLoading(isLoading), [isLoading]);

    const handleSavedProduct = useCallback(savedProduct => {
        productChanged(savedProduct);
    }, []);

    const handleChange = useCallback((event, newValue) => {
        event.preventDefault();
        if (typeof newValue === 'string') {
            const productByCode = products.find(x => x.code === newValue);
            if (productByCode) {
                productChanged(productByCode);
                return;
            }
            setName(newValue);
            setOpen(true);
        } else if (newValue && newValue.inputValue) {
            const productByCode = products.find(x => x.code === newValue.inputValue);
            if (productByCode) {
                productChanged(productByCode);
                return;
            }
            setName(newValue.inputValue);
            setOpen(true);
        } else if (newValue) {
            productChanged(newValue);
        }
    }, []);

    const autoCompleteProps = {
        key: key,
        defaultValue: emptyProduct,
        onChange: handleChange,
        disabled: !supplier || !supplier.id
    };

    function productChanged(newValue) {
        handleValueChange(newValue);
        resetAutocompleteInput(prev => !prev);
    }

    const handleValueChange = (value) => {
        if (value) {
            addInventoryMovementLine(new InventoryMovementLinePayload({
                product: value,
                quantity: 1
            }));
        }
    };

    return (
        <>
            <AutocompleteDropdown
                label="Product"
                variant="outlined"
                icon={<FastFoodIcon/>}
                required
                items={products}
                enableAddOption
                minWidth={250}
                props={autoCompleteProps}
                inputRef={searchProductRef}
                isLoading={productsLoading}
            />
            {open && (
                <NewProduct
                    isOpen={open}
                    setOpen={x => setOpen(x)}
                    savedProduct={handleSavedProduct}
                    initialProduct={(taxes) => {
                        return {
                            ...emptyProduct,
                            code: name,
                            tax: taxes?.find(x => x.default)
                        }
                    }}
                    onClose={() => setName('')}
                    autoFocusIndex={1}
                />
            )}
        </>
    );
};