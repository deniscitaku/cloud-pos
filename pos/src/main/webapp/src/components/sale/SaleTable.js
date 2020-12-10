import React from 'react';
import MaterialTable from 'material-table';
import {AxiosProductClient, AxiosTicketLineClient} from "../../client/Client";
import {useDispatch, useSelector} from "react-redux";
import Paper from "@material-ui/core/Paper";
import {Actions} from "../../reducers/global/saleTabsReducer";
import IntTextField from "../common/IntTextField";
import {fetch, fetchPromise} from "../../services/fetch";

export default function SaleTable({qtyRef, searchRef, qtyFocusRef}) {
    const dispatch = useDispatch();
    const {selectedIndex, tickets} = useSelector((state) => state.tabs);
    const ticketLines = tickets[selectedIndex].ticketLines;
    const productService = new AxiosProductClient();
    const ticketLineService = new AxiosTicketLineClient();

    console.log("--> Inside SALE TABLE");

    const columns = [
        {title: '#', field: 'tableData.id', editable: "never", width: "1%", cellStyle: {padding: 0}},
        {title: 'Code', field: "product.code", width: "20%", cellStyle: {padding: 0}},
        {title: 'Name', field: "product.name", width: "40%", cellStyle: {padding: 0}},
        {
            title: 'Qty',
            field: 'quantity',
            type: 'numeric',
            editable: "never",
            initialEditValue: 1,
            width: "1%",
            cellStyle: {padding: 0},
            render: rowData =>
                    <IntTextField type="number"
                               size="small"
                               defaultValue={1}
                               inputRef={qtyRef}
                               onFocus={handleQtyOnFocus}
                               onBlur={e => handleQtyOnBlur(rowData, e)}
                    />
        },
        {title: 'Price', field: 'product.priceTax', type: 'numeric', width: "1%", cellStyle: {padding: 0}},
        {
            title: 'Amount',
            field: 'amount',
            type: 'numeric',
            editable: "never",
            width: "1%",
            cellStyle: {padding: "0 .5em 0 0"}
        },
    ];

    function onRowAdd(newData) {
        return fetch(productService.saveFromSale(newData.product),
                product => fetchPromise(ticketLineService.create({...newData, product: product, lineNumber: ticketLines.length}))
                    .then(ticketLine => {
                        dispatch({type: Actions.NEW_TICKET_LINE, payload: ticketLine})
                        return ticketLine;
                    }));
    }

    function onRowUpdate(newData, oldData) {
        return fetch(productService.saveFromSale(newData.product), product => fetchPromise(ticketLineService.update({...newData, product: product})
            .then(ticketLine => {
                dispatch({type: Actions.SET_TICKET_LINE, payload: ticketLine});
                return ticketLine;
            })));
    }

    function deleteSelectedOnAction(evt, data) {
        fetch(ticketLineService.deleteInBatch(data), () => dispatch({type: Actions.REMOVE_TICKET_LINE, payload: data}));
    }

    function handleQtyOnFocus(event) {
        event.target.select();
        qtyFocusRef.current = true;
    }

    function handleQtyOnBlur(ticketLine, event) {
        if (typeof ticketLine !== 'object') {
            return;
        }

        const qty = event.target.value;
        ticketLine.quantity = qty && qty > 0 ? qty : 1;
        dispatch({type: Actions.SET_TICKET_LINE, payload: ticketLine});
        searchRef.current.focus();
        qtyFocusRef.current = false;
    }

    return (
        <Paper square variant="outlined">
            <MaterialTable
                title="Ticket"
                columns={columns}
                data={ticketLines}
                options={{
                    actionsColumnIndex: -1,
                    selection: true,
                    draggable: true,
                    paging: false,
                    maxBodyHeight: "60vh",
                    rowStyle: {
                        padding: 0,
                    },
                    headerStyle: {
                        padding: 0,
                    }
                }}
                actions={[
                    {
                        tooltip: 'Remove selected rows',
                        icon: 'delete',
                        onClick: deleteSelectedOnAction
                    }
                ]}
                editable={{
                    onRowAdd: onRowAdd,
                    onRowUpdate: onRowUpdate,
                }}
            />
        </Paper>
    );
}