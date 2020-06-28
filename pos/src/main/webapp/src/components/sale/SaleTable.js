import React, {createRef, forwardRef, useImperativeHandle, useState} from 'react';
import MaterialTable, {MTableCell} from 'material-table';
import {AxiosProductClient} from "../../client/Client";
import {useDispatch, useSelector} from "react-redux";
import {addTicketLine, deleteTicketLines, updateTicketLine} from "../../reducers/ticketReducer"
import TextField from "@material-ui/core/TextField";
import {fetch} from "../../services/fetch";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

const useStyles = makeStyles(theme =>
    createStyles({
        tableCell: {
            padding: ".2em",
            marginRight: ".5em",
            fontSize: "0.875rem",
            textAlign: "left",
            lineHeight: 1.43,
            borderBottom: `1px solid ${theme.palette.divider}`,
            letterSpacing: "0.01071em",
        }
    }),
)
const SaleTable = forwardRef((props, ref) => {
    const {ticketIndex} = props;
    const dispatch = useDispatch();
    const ticket = useSelector((state) => state.ticket)[ticketIndex];
    const ticketLines = ticket ? ticket.ticketLines : [];
    const classes = useStyles();
    const qtyInput = createRef();
    let isQtyFocused = false;

    useImperativeHandle(ref, () => ({
        focusQty() {
            if (qtyInput.current) {
                qtyInput.current.focus();
            }
        },
        isFocused() {
            console.log("Is focused called: ")
            return isQtyFocused;
        }
    }));

    const productService = new AxiosProductClient();

    const columns = [
        {title: '#', field: 'tableData.id', editable: "never", width: "1%", cellStyle: {padding: 0}},
        {title: 'Code', field: "product.code", width: "20%", cellStyle: {padding: 0}},
        {title: 'Name', field: "product.name", width: "40%", cellStyle: {padding: 0}},
        {title: 'Qty', field: 'quantity', type: 'numeric', editable: "never", initialEditValue: 1, width: "1%", cellStyle: {padding: 0}},
        {title: 'Price', field: 'product.priceTax', type: 'numeric', width: "1%", cellStyle: {padding: 0}},
        {title: 'Amount', field: 'amount', type: 'numeric', editable: "never", width: "1%", cellStyle: {padding: "0 .5em 0 0"}},
    ];

    function onRowAdd(newData) {
        return fetch(productService.createFromSale(newData.product),
            response => {
                newData.product = response;
                newData.lineNumber = ticketLines.length;
                newData.amount = newData.quantity * newData.product.priceTax;
                addTicketLine(ticketIndex, newData.product, dispatch);
                return newData;
            });
    }

    function onRowUpdate(oldData, newData) {
        console.log("NewData: ", newData);
        return productService.updateFromSale(newData.product)
            .then(response => {
                console.log("Product updated: ", response.data)
                newData.product = response.data;
                newData.amount = newData.quantity * newData.product.priceTax;
                updateTicketLine(ticketIndex, newData, dispatch);
                console.log("NewData1: ", newData);
                return newData;
            });
    }

    function deleteSelectedOnAction(evt, data) {
        deleteTicketLines(ticketIndex, data, dispatch);
    }

    console.log("Inside SaleTable")

    function handleQtyOnFocus(event) {
        event.target.select()
        isQtyFocused = true
    }

    function handleQtyOnBlur(event) {
        const qty = event.target.value;
        const ticketLine = ticketLines[ticketLines.length - 1];
        ticketLine.quantity = qty && qty > 0 ? qty : 1;
        updateTicketLine(ticketIndex, ticketLine, dispatch);
        isQtyFocused = false
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
                components={{
                    Cell: props1 => {
                        if (props1.columnDef.title === 'Qty') {
                            return (
                                <td className={classes.tableCell}>
                                    <TextField type="number"
                                               size="small"
                                               defaultValue={props1.rowData.quantity}
                                               required={true}
                                               inputRef={qtyInput}
                                               onFocus={handleQtyOnFocus}
                                               onBlur={handleQtyOnBlur}
                                    />
                                </td>)
                        }
                        return (<MTableCell {...props1}/>)
                    }
                }}
            />
        </Paper>
    );
});

export default SaleTable;