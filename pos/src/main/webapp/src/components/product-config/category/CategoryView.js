import React, {lazy, useCallback, useRef, useState} from 'react';
import {AxiosCategoryClient, QueryKeys} from "../../../client/Client";
import ValidTableCell from "../../common/ValidTableCell";
import ValidTextField from "../../common/ValidTextField";
import CategoryIcon from '@material-ui/icons/Category';
import Table from "../../common/CustomTable";

const NewCategory = lazy(() => import("./NewCategory"));

const categoryService = new AxiosCategoryClient();

export default function CategoryView() {
    console.log("Category rendered!");

    const [open, setOpen] = useState(false);

    const tableRef = useRef();
    const errorsRef = useRef([]);

    const openDialog = useCallback(() => setOpen(true), []);
    const columns = useCallback(() => [
        {title: '#', field: 'tableData.id', editable: "never", width: "1%"},
        {
            title: 'Name', field: "name", width: "40%", editComponent: (props) => ValidTableCell(props, errorsRef, ValidTextField),
        },
        {
            title: 'Sub Categories', field: 'subCategories', width: "40%", editable: "never", render: category => category.subCategories?.map(x => x.name).join(', ')
        }
    ], []);

    return (
        <>
            <Table
                title="Categories"
                addNewLabel="Add category"
                AddNewIcon={CategoryIcon}
                onAddNew={openDialog}
                service={categoryService}
                columns={columns}
                tableRef={tableRef}
                errorsRef={errorsRef}
                queryKey={QueryKeys.CATEGORIES}
            />
            {open && <NewCategory isOpen={open} setOpen={setOpen} refreshTable={() => tableRef.current && tableRef.current.onQueryChange()}/>}
        </>
    );
}