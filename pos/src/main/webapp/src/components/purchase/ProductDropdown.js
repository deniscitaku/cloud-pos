import React, {useCallback, useRef, useState} from 'react';
import {emptyProduct} from "../../services/EmptyObjects";
import FastFoodIcon from '@material-ui/icons/Fastfood';
import AutocompleteDropdown from "../common/AutocompleteDropdown";
import NewProduct from "../product-config/product/NewProduct";
import {useDispatch, useSelector} from "react-redux";
import {addInventoryMovementLine} from "../../reducers/global/inventoryMovementReducer";
import {AxiosInventoryMovementClient, InventoryMovementLinePayload, MovementKind} from "../../client/Client";
import {useSave} from "../../hooks/useFetch";
import store from "../../store";

const inventoryMovementService = new AxiosInventoryMovementClient();
const kind = MovementKind.PURCHASE;

function ProductDropdown({products, categories, subCategories, taxes, addProduct, searchProductRef}) {
    const [open, setOpen] = useState(false);
    const [name, setName] = useState('');
    const [key, resetAutocompleteInput] = useState(false);
    const [createInventoryMovement, {loading}] = useSave((x) => inventoryMovementService.create(x));

    const supplier = useSelector(x => x.inventoryMovement.get(kind).supplier);
    const dispatch = useDispatch();

    console.log("Inside ProductDropdown");

    const handleOpenDialogChange = useCallback(x => setOpen(x), []);
    const handleSavedProduct = useCallback(savedProduct => {
        productChanged(savedProduct);
        addProduct(savedProduct);
    }, []);
    const initialProductOnAdd = useCallback(() => ({
        ...emptyProduct,
        code: name,
        tax: taxes.find(x => x.default)
    }), [open]);
    const handleClose = useCallback(() => setName(''), []);
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

    const icon = useRef(<FastFoodIcon/>);

    const autoCompleteProps = {
        key: key,
        defaultValue: emptyProduct,
        onChange: handleChange,
        disabled: loading || !supplier || !supplier.id
    };

    function productChanged(newValue) {
        handleValueChange(newValue);
        resetAutocompleteInput(prev => !prev);
    }

    const handleValueChange = (value) => {
        if (value) {
            const purchase = store.getState().inventoryMovement.get(kind);
            const lines = purchase.inventoryMovementLines.length;
            const newPurchaseLine = new InventoryMovementLinePayload({
                lineNumber: lines + 1,
                product: value,
                quantity: 1
            });
            const newPurchase = {...purchase, inventoryMovementLines: [...purchase.inventoryMovementLines, newPurchaseLine]};
            createInventoryMovement(newPurchase)
                .then(x => addInventoryMovementLine(kind, x.inventoryMovementLines[lines], dispatch))
        }
    };

    return (
        <>
            <AutocompleteDropdown
                label="Product"
                variant="outlined"
                icon={icon.current}
                required
                items={products}
                enableAddOption
                minWidth={250}
                props={autoCompleteProps}
                inputRef={searchProductRef}

            />
            <NewProduct
                isOpen={open}
                setOpen={handleOpenDialogChange}
                savedProduct={handleSavedProduct}
                initialProductOnAdd={initialProductOnAdd}
                onClose={handleClose}
                autoFocusIndex={1}
                categories={categories}
                subCategories={subCategories}
                taxes={taxes}
            />
        </>
    );
};

export default React.memo(ProductDropdown);