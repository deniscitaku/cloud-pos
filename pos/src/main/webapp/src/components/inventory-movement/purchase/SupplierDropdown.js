import React, {lazy, useCallback, useEffect, useState} from 'react';
import LocalShippingOutlinedIcon from '@material-ui/icons/LocalShippingOutlined';
import AutocompleteDropdown from "../../common/AutocompleteDropdown";
import {emptySupplier} from "../../../services/EmptyObjects";
import {useDispatch, useSelector} from "react-redux";
import {setSupplierToInventoryMovement} from "../../../reducers/global/inventoryMovementReducer";
import {AxiosInventoryMovementClient, QueryKeys} from "../../../client/Client";
import {useMutation, useQuery} from "react-query";
import store from "../../../store";

const NewSupplier = lazy(() => import("../../supplier/NewSupplier"));
const inventoryMovementService = new AxiosInventoryMovementClient();

export default function SupplierDropdown({movementKind, searchProductRef}) {

    console.log("Inside SupplierDropdown!");

    const [open, setOpen] = useState(false);
    const [supplier, setSupplier] = useState(emptySupplier);

    const supplierFromReducer = useSelector(x => x.inventoryMovement.get(movementKind).supplier);
    const dispatch = useDispatch();

    const {data: suppliers, isSuccess} = useQuery(QueryKeys.SUPPLIERS);
    const {mutate: mutateSupplierToInventoryMovement, isLoading} = useMutation(supplier =>
        inventoryMovementService.update({...store.getState().inventoryMovement.get(movementKind), supplier: supplier})
        .then(x => x.data.supplier),
        {
            onSuccess: supplier => {
                setSupplier(supplier);
                setSupplierToInventoryMovement(movementKind, supplier, dispatch);
                searchProductRef && supplier && searchProductRef.current.focus();
            },
            onError: (error, variables) => {
                if (!variables) {
                    setSupplierToInventoryMovement(movementKind, emptySupplier, dispatch);
                    setSupplier(emptySupplier);
                }
            }
        });

    useEffect(() => {
        if (supplierFromReducer !== supplier) {
            setSupplier(supplierFromReducer || emptySupplier)
        }
    }, [supplierFromReducer]);

    const handleSavedSupplier = useCallback(savedSupplier => mutateSupplierToInventoryMovement(savedSupplier), []);

    const handleChange = useCallback((event, newValue) => {
        event.preventDefault();
        if (typeof newValue === 'string') {
            setSupplier({...emptySupplier, name: newValue});
            setOpen(true);
        } else if (newValue && newValue.inputValue) {
            setSupplier({...emptySupplier, name: newValue.inputValue});
            setOpen(true);
        } else if (!newValue) {
            mutateSupplierToInventoryMovement(null);
        } else {
            mutateSupplierToInventoryMovement(newValue);
        }
    }, []);

    return (
        <>
            {isSuccess && (
                <AutocompleteDropdown
                    label="Supplier"
                    variant="outlined"
                    Icon={LocalShippingOutlinedIcon}
                    required
                    items={suppliers}
                    isLoading={isLoading}
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