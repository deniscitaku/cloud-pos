import React, {lazy, useEffect, useState} from 'react';
import MaterialTable from 'material-table';
import {AxiosTicketLineClient} from "../../client/Client";
import {useDispatch, useSelector} from "react-redux";
import Paper from "@material-ui/core/Paper";
import {Actions} from "../../reducers/global/saleTabsReducer";
import {useMutation} from "react-query";
import QtyTextField from "./QtyTextField";

const ConfirmationDialog = lazy(() => import("../common/ConfirmationDialog"));

const ticketLineService = new AxiosTicketLineClient();

export default function SaleTable({searchRef, qtyRef, setDisablePayButton, tableLoading, setTableLoading}) {
    console.log("Inside Sale Table");

    const dispatch = useDispatch();
    const [yesNoDialog, setYesNoDialog] = useState({open: false, itemsToRemove: []});
    const [errors, setErrors] = useState([]);
    const ticketLines = useSelector((state) => state.tabs.tickets[state.tabs.selectedIndex].ticketLines);
    const {mutate: deleteSelectedLines, isLoading: deleteLinesLoading} = useMutation(lines => ticketLineService.deleteAll(lines), {
        onSuccess: () => {
            dispatch({type: Actions.REMOVE_TICKET_LINE, payload: yesNoDialog.itemsToRemove});
            setYesNoDialog({itemsToRemove: [], open: false})
        }
    });

    useEffect(() => {
        setDisablePayButton(errors.length > 0 && errors.some(x => x))
    }, [errors]);

    const columns = [
        {title: '#', field: 'tableData.id', editable: "never", width: "1%", cellStyle: {padding: 0}},
        {title: 'Code', field: "product.code", width: "20%", cellStyle: {padding: "0 .5em 0 0"}},
        {title: 'Name', field: "product.name", width: "40%", cellStyle: {padding: "0 .5em 0 0"}},
        {
            title: 'Qty',
            field: 'quantity',
            type: 'numeric',
            editable: "never",
            initialEditValue: 1,
            width: "1%",
            cellStyle: {padding: "0 .5em 0 0"},
            render: rowData => <QtyTextField
                rowData={rowData}
                searchRef={searchRef}
                qtyRef={qtyRef}
                setTableLoading={setTableLoading}
                setErrors={setErrors}
            />
        },
        {title: 'Price', field: 'product.priceTax', type: 'numeric', width: "1%", cellStyle: {padding: "0 .5em 0 0"}},
        {
            title: 'Amount',
            field: 'amount',
            type: 'numeric',
            editable: "never",
            width: "1%",
            cellStyle: {padding: "0 .5em 0 0"}
        },
    ];

    function openDeleteSelectedConfirmationDialog(event, data) {
        event.preventDefault();
        setYesNoDialog({open: true, itemsToRemove: data});
    }

    return (
        <Paper square variant="outlined">
            <MaterialTable
                title="Ticket"
                isLoading={tableLoading}
                columns={columns}
                data={ticketLines}
                options={{
                    selection: true,
                    draggable: true,
                    paging: false,
                    maxBodyHeight: "60vh",
                    rowStyle: {
                        padding: 0,
                    },
                    headerStyle: {
                        padding: 0,
                    },
                    loadingType: 'linear'
                }}
                actions={[
                    {
                        icon: 'delete',
                        onClick: openDeleteSelectedConfirmationDialog
                    }
                ]}
            />
            {yesNoDialog.open && (
                <ConfirmationDialog title={"Are you sure want do delete all selected records?"}
                                    content={`There are (${yesNoDialog.itemsToRemove.length}) records to be deleted`}
                                    open={yesNoDialog.open}
                                    handleClose={() => setYesNoDialog(prevState => ({...prevState, open: false}))}
                                    handleConfirmation={() => deleteSelectedLines(yesNoDialog.itemsToRemove)}
                                    loading={deleteLinesLoading}
                />
            )}
        </Paper>
    );
}