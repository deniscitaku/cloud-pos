import ValidTextField from "../common/ValidTextField";
import React, {useEffect, useRef, useState} from "react";
import {updateInventoryMovementLine} from "../../reducers/global/inventoryMovementReducer";
import {useDispatch, useSelector} from "react-redux";
import {AxiosInventoryMovementLineClient} from "../../client/Client";
import {useMutation} from "react-query";

const inventoryMovementLineService = new AxiosInventoryMovementLineClient();

export default function QtyTextField({movementKind, rowData, searchProductRef, setErrors, setTableLoading}) {

    const dispatch = useDispatch();
    const [qty, setQty] = useState(rowData.quantity || 1);
    const lineSize = useSelector((state) => state.inventoryMovement.get(movementKind).inventoryMovementLines.length);
    const qtyRef = useRef();

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
    useEffect(() => setQty(rowData.quantity), [rowData.quantity]);

    function handleQtyOnBlur(inventoryMovementLine) {
        if (!lineSize || rowData.quantity === Number(qty)) {
            return;
        }

        saveInventoryMovementLine({...inventoryMovementLine, quantity: qty, kind: movementKind});
    }

    return (
        <ValidTextField
            type="number"
            style={{
                width: '3em'
            }}
            autoFocus={searchProductRef && searchProductRef.current !== document.activeElement && rowData.lineNumber === lineSize}
            value={qty}
            required={true}
            onFocus={event => event.target.select()}
            onKeyPress={(ev) => {
                if (ev.key === 'Enter') {
                    ev.preventDefault();
                    searchProductRef.current && searchProductRef.current.focus();
                }
            }}
            onChange={e => setQty(e.target.value)}
            onBlur={() => handleQtyOnBlur(rowData)}
            error={error && error.lineNumber === rowData.lineNumber && error.quantity}
        />
    );
}