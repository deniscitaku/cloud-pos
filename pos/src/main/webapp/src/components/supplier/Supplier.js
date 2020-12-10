import {AxiosSupplierClient} from "../../client/Client";
import React, {useCallback, useMemo, useRef, useState} from "react";
import ValidTableCell from "../common/ValidTableCell";
import ValidTextField from "../common/ValidTextField";
import NewSupplier from "./NewSupplier";
import LocalShippingOutlinedIcon from '@material-ui/icons/LocalShippingOutlined';
import Table from "../common/Table";

const supplierService = new AxiosSupplierClient();

export default function Supplier() {
    console.log("Supplier rendered!");

    const tableRef = useRef();
    const errorsRef = useRef([]);
    const [open, setOpen] = useState(false);

    const openDialog = useCallback(() => setOpen(true), []);
    const supplierIcon = useCallback(() => <LocalShippingOutlinedIcon/>, []);
    const columns = useCallback(() => {
        return [
            {title: '#', field: 'tableData.id', editable: "never", width: "1%"},
            {
                title: 'Name', field: "name", width: "25%", editComponent: (props) => ValidTableCell(props, errorsRef, ValidTextField)
            },
            {
                title: 'NUI', field: "nui", width: "25%", required: false, editComponent: props => ValidTableCell(props, errorsRef, ValidTextField)
            },
            {
                title: 'Phone number', field: "phoneNumber", width: "25%", required: false, editComponent: props => ValidTableCell(props, errorsRef, ValidTextField)
            },
            {
                title: 'Email', field: "email", width: "25%", required: false, editComponent: props => ValidTableCell(props, errorsRef, ValidTextField)
            }
        ];
    }, []);

    return (
        <>
            <Table
                title="Suppliers"
                addNewLabel="Add supplier"
                addNewIcon={supplierIcon}
                onAddNew={openDialog}
                service={supplierService}
                columns={columns}
                tableRef={tableRef}
                errorsRef={errorsRef}
            />
            <NewSupplier isOpen={open} setOpen={val => setOpen(val)} savedSupplier={() => tableRef.current && tableRef.current.onQueryChange()}/>
        </>
    );
}