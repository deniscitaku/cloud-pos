import React, {lazy, useCallback, useRef, useState} from 'react';
import {AxiosTaxClient, QueryKeys} from "../../../client/Client";
import ValidTableCell from "../../common/ValidTableCell";
import ValidTextField from "../../common/ValidTextField";
import CustomTable from "../../common/CustomTable";
import TaxIcon from "../../icons/TaxIcon";

const NewTax = lazy(() => import("./NewTax"));

const taxService = new AxiosTaxClient();

export default function TaxView() {
    console.log("Tax rendered!");

    const [open, setOpen] = useState(false);

    const tableRef = useRef();
    const errorsRef = useRef([]);

    const openDialog = useCallback(() => setOpen(true), []);
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

    return (
        <>
            <CustomTable
                title="Taxes"
                addNewLabel="Add tax"
                AddNewIcon={TaxIcon}
                onAddNew={openDialog}
                service={taxService}
                columns={columns}
                tableRef={tableRef}
                errorsRef={errorsRef}
                queryKey={QueryKeys.TAXES}
            />
            {open && <NewTax isOpen={open} setOpen={setOpen} refreshTable={() => tableRef.current && tableRef.current.onQueryChange()}/>}
        </>
    );
}