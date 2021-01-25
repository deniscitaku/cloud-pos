import ValidTextField from "../common/ValidTextField";
import React, {useEffect, useRef} from "react";
import {updateInventoryMovementLine} from "../../reducers/global/inventoryMovementReducer";
import {useDispatch, useSelector} from "react-redux";
import {AxiosInventoryMovementLineClient, MovementKind} from "../../client/Client";
import {useMutation} from "react-query";

const inventoryMovementLineService = new AxiosInventoryMovementLineClient();
const movementKind = MovementKind.PURCHASE;

export default function QtyTextField({rowData, searchProductRef, setErrors, setTableLoading}) {

    const dispatch = useDispatch();
    console.log("Quantity: ", rowData.quantity);
    const qty = useRef(rowData.quantity || 1);
    console.log("Qty.current: ", qty.current);
    const lineSize = useSelector((state) => state.inventoryMovement.get(movementKind).inventoryMovementLines.length);

    const {mutate: saveInventoryMovementLine, error, isLoading} = useMutation(x => inventoryMovementLineService.update(x)
        .then(y => y.data)
        .catch(y => Promise.reject({...y?.response?.data, lineNumber: x.lineNumber})), {
        onSuccess: data => {
            updateInventoryMovementLine(movementKind, data, dispatch);
            setErrors(prev => {
                const prevState = [...prev];
                prevState[rowData.lineNumber] = false;
                return prevState;
            });
        },
        onError: () => setErrors(prev => {
            const prevState = [...prev];
            prevState[rowData.lineNumber] = true;
            return prevState;
        })
    });

    useEffect(() => setTableLoading(isLoading), [isLoading]);

    function handleQtyOnBlur(inventoryMovementLine) {
        if (!lineSize || rowData.quantity === Number(qty.current)) {
            return;
        }

        saveInventoryMovementLine({...inventoryMovementLine, quantity: qty.current});
    }

    return (
        <ValidTextField
            type="number"
            style={{
                width: '3em'
            }}
            autoFocus={rowData.lineNumber === lineSize}
            defaultValue={qty.current}
            required={true}
            onFocus={event => event.target.select()}
            onKeyPress={(ev) => {
                if (ev.key === 'Enter') {
                    ev.preventDefault();
                    searchProductRef.current && searchProductRef.current.focus();
                }
            }}
            onChange={e => qty.current = e.target.value}
            onBlur={() => handleQtyOnBlur(rowData)}
            error={error && error.lineNumber === rowData.lineNumber && error.quantity}
        />
    );
}