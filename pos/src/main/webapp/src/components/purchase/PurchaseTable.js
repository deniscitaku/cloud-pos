import React, {useCallback, useEffect, useRef, useState} from 'react';
import {AxiosInventoryMovementLineClient, MovementKind} from "../../client/Client";
import {useDispatch, useSelector} from "react-redux";
import Paper from "@material-ui/core/Paper";
import MaterialTable from "material-table";
import {
    deleteInventoryMovementLines,
    updateInventoryMovementLine
} from "../../reducers/global/inventoryMovementReducer";
import IntTextField from "../common/IntTextField";
import {useDeleteAll, useSave} from "../../hooks/useFetch";
import ValidTextField from "../common/ValidTextField";
import ConfirmationDialog from "../common/ConfirmationDialog";
import useTraceUpdate from "../../hooks/useTraceUpdate";

const movementKind = MovementKind.PURCHASE;
const inventoryMovementLineService = new AxiosInventoryMovementLineClient();

const PurchaseTable = ({searchProductRef}) => {

    console.log("Inside Purchase table");

    useEffect(() => console.log('searchProductRef changed!'), [searchProductRef]);

    const [yesNoDialog, setYesNoDialog] = useState({open: false, itemsToRemove: []});
    const [saveInventoryMovementLine, {loading, errors}] = useSave(x => inventoryMovementLineService.update(x));
    const [deleteSelectedLines, deleteLinesLoading] = useDeleteAll(lines => inventoryMovementLineService.deleteAll(lines));
    const dispatch = useDispatch();
    const purchaseLines = useSelector((state) => state.inventoryMovement.get(movementKind).inventoryMovementLines, (oldVal, newVal) => {
        return oldVal.length === newVal.length && oldVal.map(x => x.quantity).reduce((x,y) => x + y, 0) === newVal.map(x => x.quantity).reduce((x,y) => x + y, 0)
    });
    const handleYesNoDialogOnClose = useCallback(() => setYesNoDialog(prevState => ({...prevState, open: false})), []);
    const handleDeleteSelected = useCallback(deleteSelectedOnAction, [yesNoDialog.itemsToRemove]);
    const qty = useRef(1);

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
            render: rowData => {
                qty.current = 1;
                return (
                    <ValidTextField
                        type="number"
                        size="small"
                        autoFocus={rowData.lineNumber === purchaseLines.length}
                        defaultValue={1}
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
                        error={errors && errors.quantity}
                    />
                );
            },
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
            title: 'Amount', field: 'amount', type: 'numeric', editable: "never", width: "15%", cellStyle: {paddingRight: '1em'}, headerStyle: {paddingRight: '1em'}
        },
    ];

    function openDeleteSelectedConfirmationDialog(event, data) {
        event.preventDefault();
        setYesNoDialog({open: true, itemsToRemove: data});
    }

    function deleteSelectedOnAction() {
        deleteSelectedLines(yesNoDialog.itemsToRemove)
            .then(() => deleteInventoryMovementLines(movementKind, yesNoDialog.itemsToRemove, dispatch))
            .then(() => setYesNoDialog({itemsToRemove: [], open: false}));
    }

    function handleQtyOnBlur(inventoryMovementLine) {
        if (!purchaseLines.length) {
            return;
        }
        saveInventoryMovementLine({...inventoryMovementLine, quantity: qty.current})
            .then(x => updateInventoryMovementLine(movementKind, x, dispatch));
    }

    return (
        <Paper square variant="outlined">
            <MaterialTable
                isLoading={loading}
                title="Purchase"
                columns={columns}
                data={purchaseLines}
                options={{
                    actionsColumnIndex: -1,
                    selection: true,
                    draggable: true,
                    paging: false,
                    search: false,
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
                        onClick: openDeleteSelectedConfirmationDialog
                    }
                ]}
            />
            <ConfirmationDialog title={"Are you sure want do delete all selected records?"}
                                content={`There are (${yesNoDialog.itemsToRemove.length}) records to be deleted`}
                                open={yesNoDialog.open}
                                handleClose={handleYesNoDialogOnClose}
                                handleConfirmation={handleDeleteSelected}
                                loading={deleteLinesLoading}
            />
        </Paper>
    );
};

export default PurchaseTable;