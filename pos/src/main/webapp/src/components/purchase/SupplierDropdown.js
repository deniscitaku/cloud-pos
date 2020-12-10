import React, {useCallback, useRef, useState} from 'react';
import LocalShippingOutlinedIcon from '@material-ui/icons/LocalShippingOutlined';
import AutocompleteDropdown from "../common/AutocompleteDropdown";
import NewSupplier from "../supplier/NewSupplier";
import {emptySupplier} from "../../services/EmptyObjects";
import {useDispatch} from "react-redux";
import {setSupplierToInventoryMovement} from "../../reducers/global/inventoryMovementReducer";
import {MovementKind} from "../../client/Client";

const movementKind = MovementKind.PURCHASE;

function SupplierDropdown({suppliers, addSupplier}) {

    console.log("Inside SupplierDropdown!");

    const [open, setOpen] = useState(false);
    const [supplier, setSupplier] = useState(emptySupplier);
    const dispatch = useDispatch();
    const icon = useRef(<LocalShippingOutlinedIcon/>);

    const setOpenCallback = useCallback((value) => setOpen(value), []);
    const initialSupplierOnAdd = useCallback(() => supplier, [open]);
    const handleSavedSupplier = useCallback((savedSupplier) => {
        setSupplier(savedSupplier);
        setSupplierToInventoryMovement(movementKind, savedSupplier, dispatch);
        addSupplier(savedSupplier);
    }, []);
    const onClose = useCallback(() => setSupplier(emptySupplier), []);

    function handleChange(event, newValue) {
        event.preventDefault();
        if (typeof newValue === 'string') {
            setSupplier({...emptySupplier, name: newValue});
            setOpen(true);
        } else if (newValue && newValue.inputValue) {
            setSupplier({...emptySupplier, name: newValue.inputValue});
            setOpen(true);
        } else if (!newValue) {
            setSupplier(emptySupplier);
            setSupplierToInventoryMovement(movementKind, emptySupplier, dispatch);
        } else {
            setSupplier(newValue);
            setSupplierToInventoryMovement(movementKind, newValue, dispatch);
        }
    }

    return (
        <>
            <AutocompleteDropdown
                label="Supplier"
                variant="outlined"
                icon={icon.current}
                required
                items={suppliers}
                enableAddOption
                minWidth={250}
                props={{
                    value: supplier,
                    onChange: handleChange
                }}
            />
            <NewSupplier
                isOpen={open}
                setOpen={setOpenCallback}
                savedSupplier={handleSavedSupplier}
                initialSupplierOnAdd={initialSupplierOnAdd}
                onClose={onClose}
                autoFocusIndex={1}
            />
        </>
    );
}

export default React.memo(SupplierDropdown);