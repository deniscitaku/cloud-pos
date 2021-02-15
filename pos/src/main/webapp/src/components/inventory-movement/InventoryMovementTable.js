import React, {lazy, useEffect, useState} from 'react';
import {AxiosInventoryMovementLineClient} from "../../client/Client";
import {useDispatch, useSelector} from "react-redux";
import Paper from "@material-ui/core/Paper/index";
import MaterialTable from "material-table";
import {deleteInventoryMovementLines} from "../../reducers/global/inventoryMovementReducer";
import {useMutation} from "react-query";
import QtyTextField from "./QtyTextField";

const ConfirmationDialog = lazy(() => import("../common/ConfirmationDialog"));

const inventoryMovementLineService = new AxiosInventoryMovementLineClient();

const InventoryMovementTable = ({movementKind, searchProductRef, setDisableCloseButton, tableLoading, setTableLoading}) => {

    console.log("Inside Purchase table");

    const dispatch = useDispatch();
    const [yesNoDialog, setYesNoDialog] = useState({open: false, itemsToRemove: []});
    const {mutate: deleteSelectedLines, isLoading: deleteLinesLoading} = useMutation(lines => inventoryMovementLineService.deleteAll(lines), {
        onSuccess: () => {
            deleteInventoryMovementLines(movementKind, yesNoDialog.itemsToRemove, dispatch);
            setYesNoDialog({itemsToRemove: [], open: false})
        }
    });
    const movementLines = useSelector((state) => state.inventoryMovement.get(movementKind).inventoryMovementLines);
    console.log("MovementLines changed: ", movementLines);
    const [errors, setErrors] = useState([]);

    useEffect(() => {
        setDisableCloseButton(errors.length > 0 && errors.some(x => x))
    }, [errors]);

    const columns = [
        {title: '#', field: 'tableData.id', editable: "never", width: "1%", cellStyle: {padding: 0}},
        {title: 'Code', field: "product.code", width: "20%", cellStyle: {padding: 0}},
        {title: 'Name', field: "product.name", width: "30%", cellStyle: {padding: 0}},
        {title: 'Category', field: "product.category.name", width: "20%", cellStyle: {padding: 0}},
        {
            title: 'Qty',
            field: 'quantity',
            type: 'numeric',
            width: "1%",
            render: rowData => <QtyTextField
                movementKind={movementKind}
                rowData={rowData}
                searchProductRef={searchProductRef}
                setErrors={setErrors}
                setTableLoading={setTableLoading}
            />,
            cellStyle: {padding: 0}
        },
        /*{title: 'UOM', field: 'product.uom.smallerUnitName', width: "5%", editable: "never", cellStyle: {padding: 0}},*/
        {title: 'Price buy', field: 'product.priceBuy', type: 'numeric', width: "10%", cellStyle: {padding: 0}},
        {title: 'Price sell', field: 'product.priceSell', type: 'numeric', width: "10%"},
        {
            title: 'Tax', field: 'product.tax.name', cellStyle: {paddingLeft: "1em"}, headerStyle: {paddingLeft: "1em"}
        },
        {title: 'Price tax', field: 'product.priceTax', type: 'numeric', width: "10%", cellStyle: {padding: 0}},
        {
            title: 'Amount',
            field: 'amount',
            type: 'numeric',
            editable: "never",
            width: "15%",
        },
        {
            title: 'Stock',
            field: 'product.stock',
            type: "numeric",
            emptyValue: 0,
            editable: "never",
            width: "1%",
            cellStyle: {paddingRight: '1em'},
            headerStyle: {paddingRight: '1em'}
        }
    ];

    function openDeleteSelectedConfirmationDialog(event, data) {
        event.preventDefault();
        setYesNoDialog({open: true, itemsToRemove: data});
    }

    return (
        <Paper square variant="outlined">
            <MaterialTable
                isLoading={tableLoading}
                title={movementKind}
                columns={columns}
                data={movementLines}
                options={{
                    actionsColumnIndex: -1,
                    selection: true,
                    draggable: true,
                    paging: false,
                    search: false,
                    maxBodyHeight: "60vh",
                    loadingType: "linear",
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
};

export default InventoryMovementTable;