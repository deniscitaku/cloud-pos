import React, {useCallback, useRef, useState} from 'react';
import {AxiosCategoryClient} from "../../../client/Client";
import ValidTableCell from "../../common/ValidTableCell";
import NewCategory from "./NewCategory";
import ValidTextField from "../../common/ValidTextField";
import CategoryIcon from '@material-ui/icons/Category';
import Table from "../../common/Table";

const categoryService = new AxiosCategoryClient();

export default function Category() {
    console.log("Category rendered!");

    const [open, setOpen] = useState(false);
    const tableRef = useRef();
    const errorsRef = useRef([]);

    const openDialog = useCallback(() => setOpen(true), []);
    const categoryIcon = useCallback(() => <CategoryIcon/>, []);
    const columns = useCallback(() => [
        {title: '#', field: 'tableData.id', editable: "never", width: "1%"},
        {
            title: 'Name', field: "name", width: "40%", editComponent: (props) => ValidTableCell(props, errorsRef, ValidTextField),
        },
        {
            title: 'Sub Categories', field: 'subCategories', width: "40%", editable: "never", render: category => category.subCategories?.map(x => x.name).join(', ')
        }
    ], []);

    function refreshTable() {
        tableRef.current && tableRef.current.onQueryChange();
    }

    return (
        <>
            <Table
                title="Categories"
                addNewLabel="Add category"
                addNewIcon={categoryIcon}
                onAddNew={openDialog}
                service={categoryService}
                columns={columns}
                tableRef={tableRef}
                errorsRef={errorsRef}
            />
            <NewCategory isOpen={open} setOpen={setOpen} refreshTable={refreshTable}/>
        </>
    );
}