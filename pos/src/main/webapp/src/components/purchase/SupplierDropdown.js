import React, {lazy, useCallback, useRef, useState} from 'react';
import LocalShippingOutlinedIcon from '@material-ui/icons/LocalShippingOutlined';
import AutocompleteDropdown from "../common/AutocompleteDropdown";
import {emptySupplier} from "../../services/EmptyObjects";
import {useDispatch} from "react-redux";
import {setSupplierToInventoryMovement} from "../../reducers/global/inventoryMovementReducer";
import {AxiosSupplierClient, MovementKind, QueryKeys} from "../../client/Client";
import {useQuery} from "react-query";

const NewSupplier = lazy(() => import("../supplier/NewSupplier"));

const movementKind = MovementKind.PURCHASE;

export default function SupplierDropdown() {

    console.log("Inside SupplierDropdown!");

    const [open, setOpen] = useState(false);
    const [supplier, setSupplier] = useState(emptySupplier);
    const dispatch = useDispatch();

    const {data: suppliers, isSuccess} = useQuery(QueryKeys.SUPPLIERS);

    const handleSavedSupplier = useCallback((savedSupplier) => {
        setSupplier(savedSupplier);
        setSupplierToInventoryMovement(movementKind, savedSupplier, dispatch);
    }, []);

    const handleChange = useCallback((event, newValue) => {
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
    }, []);

    return (
        <>
            {isSuccess && (
                <AutocompleteDropdown
                    label="Supplier"
                    variant="outlined"
                    icon={<LocalShippingOutlinedIcon/>}
                    required
                    items={suppliers}
                    enableAddOption
                    minWidth={250}
                    props={{
                        value: supplier,
                        onChange: handleChange,
                    }}
                />
            )
            }
            {open && (<NewSupplier
                isOpen={open}
                setOpen={value => setOpen(value)}
                savedSupplier={handleSavedSupplier}
                initialSupplier={supplier}
                onClose={() => setSupplier(emptySupplier)}
                autoFocusIndex={1}
            />)}
        </>
    );
}