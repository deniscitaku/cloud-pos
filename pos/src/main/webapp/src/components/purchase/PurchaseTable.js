import React from 'react';
import {MovementKind} from "../../client/Client";
import {useDispatch, useSelector} from "react-redux";
import Paper from "@material-ui/core/Paper";
import MaterialTable from "material-table";
import {
    deleteInventoryMovementLines,
    updateInventoryMovementLine
} from "../../reducers/global/inventoryMovementReducer";
import IntTextField from "../common/IntTextField";

const movementKind = MovementKind.PURCHASE;

const PurchaseTable = (props) => {

    const dispatch = useDispatch();
    const purchase = useSelector((state) => state.inventoryMovement).get(movementKind);
    const purchaseLines = purchase ? purchase.inventoryMovementLines : [];

    const columns = [
        {title: '#', field: 'tableData.id', editable: "never", width: "1%", cellStyle: {padding: 0}}, ,
        {title: 'Code', field: "product.code", width: "20%", cellStyle: {padding: 0}},
        {title: 'Name', field: "product.name", width: "30%", cellStyle: {padding: 0}},
        {title: 'Category', field: "product.category.name", width: "20%", cellStyle: {padding: 0}},
        {
            title: 'Qty',
            field: 'quantity',
            type: 'numeric',
            initialEditValue: 1,
            width: "1%",
            render: rowData => <IntTextField type="number"
                                             size="small"
                                             defaultValue={1}
                                             required={true}
                                             onBlur={e => handleQtyOnBlur(rowData, e)}
            />,
            cellStyle: {padding: 0}
        },
        /*{title: 'UOM', field: 'product.uom.smallerUnitName', width: "5%", editable: "never", cellStyle: {padding: 0}},*/
        {title: 'Price buy', field: 'product.priceBuy', type: 'numeric', width: "10%", cellStyle: {padding: 0}},
        {title: 'Price sell', field: 'product.priceSell', type: 'numeric', width: "10%"},
        {
            title: 'Tax', field: 'product.tax.name', cellStyle: {
                width: 50,
                maxWidth: 50,
                padding: 10
            },
            headerStyle: {
                width: 50,
                maxWidth: 50,
                padding: 10
            }
        },
        {title: 'Price tax', field: 'product.priceTax', type: 'numeric', width: "10%", cellStyle: {padding: 0}},
        {title: 'Amount', field: 'amount', type: 'numeric', editable: "never", width: "15%", cellStyle: {padding: 0}},
    ];

    function deleteSelectedOnAction(evt, data) {
        deleteInventoryMovementLines(movementKind, data, dispatch);
    }

    function handleQtyOnBlur(inventoryMovementLine, newQuantity) {
        if (!purchaseLines.length) {
            return;
        }
        let priceBuy = 0;
        if (inventoryMovementLine.product.priceBuy) {
            priceBuy = inventoryMovementLine.product.priceBuy;
        }
        updateInventoryMovementLine(movementKind, {...inventoryMovementLine, amount: priceBuy * newQuantity, quantity: newQuantity}, dispatch);
    }

    return (
        <Paper square variant="outlined">
            <MaterialTable
                title="Purchase"
                columns={columns}
                data={purchaseLines}
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
            />
        </Paper>
    );
}

export default PurchaseTable;