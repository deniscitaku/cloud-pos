import ValidTextField from "../common/ValidTextField";
import React, {useEffect, useState} from "react";
import {AxiosTicketLineClient} from "../../client/Client";
import {useDispatch} from "react-redux";
import {Actions} from "../../reducers/global/saleTabsReducer";
import {useMutation} from "react-query";

const ticketLineService = new AxiosTicketLineClient();

export default function QtyTextField({rowData, searchRef, qtyRef, setErrors, setTableLoading}) {

    const dispatch = useDispatch();
    const [qty, setQty] = useState(rowData.quantity || 1);

    const {mutate: saveTicketLine, error, isLoading} = useMutation(x => ticketLineService.update(x)
        .then(y => y.data)
        .catch(y => Promise.reject({...y?.response?.data, lineNumber: x.lineNumber})), {
        onSuccess: data => {
            dispatch({type: Actions.UPDATE_TICKET_LINE, payload: data});
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

    function handleQtyOnBlur() {
        if (rowData.quantity !== qty) {
            saveTicketLine({...rowData, quantity: qty});
        }
    }

    return (
        <ValidTextField
            type="number"
            style={{
                width: '3em'
            }}
            inputRef={qtyRef}
            value={qty}
            required={true}
            onFocus={event => event.target.select()}
            onKeyPress={(ev) => {
                if (ev.key === 'Enter') {
                    ev.preventDefault();
                    searchRef.current && searchRef.current.focus();
                }
            }}
            onChange={e => setQty(e.target.value)}
            onBlur={handleQtyOnBlur}
            error={error && error.lineNumber === rowData.lineNumber && error.quantity}
        />
    );
}