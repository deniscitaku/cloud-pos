import {AxiosCustomerClient, QueryKeys} from "../../client/Client";
import React, {lazy, useCallback, useRef, useState} from "react";
import ValidTableCell from "../common/ValidTableCell";
import ValidTextField from "../common/ValidTextField";
import PeopleIcon from '@material-ui/icons/People';
import Table from "../common/CustomTable";

const NewCustomer = lazy(() => import("./NewCustomer"));

const customerService = new AxiosCustomerClient();

export default function CustomerView() {
    console.log("Inside CustomerView!");

    const errorsRef = useRef([]);
    const tableRef = useRef();
    const [open, setOpen] = useState(false);

    const openDialog = useCallback(() => setOpen(true), []);
    const customerIcon = useRef(<PeopleIcon/>);
    const columns = useCallback(() => [
        {title: '#', field: 'tableData.id', editable: "never", width: "1%"},
        {
            title: 'Name', field: "name", width: "25%", editComponent: (props) => ValidTableCell(props, errorsRef, ValidTextField)
        },
        {
            title: 'Phone number', field: "phoneNumber", width: "25%", required: false, editComponent: props => ValidTableCell(props, errorsRef, ValidTextField)
        },
        {
            title: 'Email', field: "email", width: "25%", required: false, editComponent: props => ValidTableCell(props, errorsRef, ValidTextField)
        },
        {
            title: 'Max debt', field: "maxDebt", width: "25%", type: "numeric", required: false, editComponent: props => ValidTableCell(props, errorsRef, ValidTextField)
        },
        {
            title: 'Current debt', field: "currentDebt", width: "25%", editable: "never", type: "numeric", required: false, editComponent: props => ValidTableCell(props, errorsRef, ValidTextField)
        },
        {
            title: 'Discount', field: "discount", width: "25%", type: "numeric", required: false, editComponent: props => ValidTableCell(props, errorsRef, ValidTextField)
        },
    ], []);

    return (
        <>
            <Table
                title="Customers"
                addNewLabel="Add customer"
                addNewIcon={customerIcon}
                columns={columns}
                service={customerService}
                tableRef={tableRef}
                errorsRef={errorsRef}
                onAddNew={openDialog}
                queryKey={QueryKeys.CUSTOMERS}
            />
            {open && <NewCustomer isOpen={open} setOpen={val => setOpen(val)} refreshTable={() => tableRef.current && tableRef.current.onQueryChange()} />}
        </>
    );
}