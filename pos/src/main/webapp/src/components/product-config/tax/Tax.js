import React, {useCallback, useRef, useState} from 'react';
import {AxiosTaxClient} from "../../../client/Client";
import NewTax from "./NewTax";
import ValidTableCell from "../../common/ValidTableCell";
import ValidTextField from "../../common/ValidTextField";
import Table from "../../common/Table";
import TaxIcon from "../../icons/TaxIcon";

const taxService = new AxiosTaxClient();

export default function Tax() {
    console.log("Tax rendered!");

    const tableRef = useRef();
    const errorsRef = useRef([]);
    const [open, setOpen] = useState(false);

    const openDialog = useCallback(() => setOpen(true), []);
    const taxIcon = useCallback(() => <TaxIcon/>, []);
    const columns = useCallback(() => [
        {title: '#', field: 'tableData.id', editable: "never", width: "1%"},
        {
            title: 'Name', field: "name", width: "40%", editComponent: (props) => ValidTableCell(props, errorsRef, ValidTextField)
        },
        {
            title: 'Tax rate',
            field: "taxRate",
            width: "40%",
            type: 'numeric',
            editComponent: props => ValidTableCell(props, errorsRef, ValidTextField)
        },
        {
            title: 'Is default',
            field: "default",
            width: "10%",
            type: 'boolean'
        }
    ], []);

    function refreshTable() {
        tableRef.current && tableRef.current.onQueryChange();
    }

    return (
        <>
            <Table
                title="Taxes"
                addNewLabel="Add tax"
                addNewIcon={taxIcon}
                onAddNew={openDialog}
                service={taxService}
                columns={columns}
                tableRef={tableRef}
                errorsRef={errorsRef}
            />
            <NewTax isOpen={open} setOpen={setOpen} refreshTable={refreshTable}/>
        </>
    );
}