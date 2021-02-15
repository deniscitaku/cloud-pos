import React, {lazy, useCallback, useEffect, useState} from 'react';
import {emptyProduct} from "../../services/EmptyObjects";
import FastFoodIcon from '@material-ui/icons/Fastfood';
import AutocompleteDropdown from "../common/AutocompleteDropdown";
import {useDispatch, useSelector} from "react-redux";
import {createInventoryMovementLine, setInventoryMovement} from "../../reducers/global/inventoryMovementReducer";
import {
    AxiosInventoryMovementClient,
    InventoryMovementLinePayload,
    MovementKind,
    QueryKeys
} from "../../client/Client";
import store from "../../store";
import {useMutation, useQuery} from "react-query";
import Tooltip from "@material-ui/core/Tooltip";

const NewProduct = lazy(() => import("../product-config/product/NewProduct"));

const inventoryMovementService = new AxiosInventoryMovementClient();

export default function ProductDropdown({movementKind, searchProductRef, setTableLoading}) {
    console.log("Inside ProductDropdown!");

    const [open, setOpen] = useState(false);
    const [openTooltip, setOpenTooltip] = useState(false);
    const [name, setName] = useState('');
    const [key, resetAutocompleteInput] = useState(false);

    const dispatch = useDispatch();

    const {data: products, isLoading: productsLoading} = useQuery(QueryKeys.PRODUCTS);
    const {mutate: addInventoryMovementLine, isLoading} = useMutation(addInventoryMovementLinePromise, {
        onSuccess: data => setInventoryMovement(data, dispatch),
    });

    const supplier = useSelector(x => x.inventoryMovement.get(movementKind).supplier);

    useEffect(() => setTableLoading(isLoading), [isLoading]);
    useEffect(() => searchProductRef && searchProductRef.current.focus(), []);

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
        disabled: movementKind === MovementKind.PURCHASE && (!supplier || !supplier.id)
    };

    function productChanged(newValue) {
        handleValueChange(newValue) && resetAutocompleteInput(prev => !prev);
    }

    function addInventoryMovementLinePromise(inventoryMovementLine) {
        const inventoryMovementId = store.getState().inventoryMovement.get(movementKind).id;

        return inventoryMovementService.addInventoryMovementLine(inventoryMovementId, inventoryMovementLine).then(x => x.data)
    }

    const handleValueChange = (value) => {
        const exists = store.getState()
            .inventoryMovement
            .get(movementKind)
            .inventoryMovementLines.map(x => x.product.id)
            .find(x => x === value.id);

        if (exists) {
            setOpenTooltip(true);
            setTimeout(() => setOpenTooltip(false), 5000);
            return false;
        }

        if (value) {
            addInventoryMovementLine(new InventoryMovementLinePayload({
                product: value,
                quantity: 1
            }));
            return true;
        }

        return false;
    };

    return (
        <>
            <Tooltip
                PopperProps={{
                    disablePortal: true,
                }}
                onClose={() => setOpenTooltip(false)}
                open={openTooltip}
                disableFocusListener
                disableHoverListener
                disableTouchListener
                title="Product already exists in table"
                arrow
            >
                <AutocompleteDropdown
                    label="Product"
                    variant="outlined"
                    Icon={FastFoodIcon}
                    required
                    items={products}
                    enableAddOption
                    minWidth={250}
                    props={autoCompleteProps}
                    inputRef={searchProductRef}
                    isLoading={productsLoading}
                />
            </Tooltip>
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