import React, {useCallback, useEffect, useRef, useState} from 'react';
import {AxiosCategoryClient, AxiosSubCategoryClient} from "../../../client/Client";
import ValidTableCell from "../../common/ValidTableCell";
import NewSubCategory from "./NewSubCategory";
import AutocompleteDropdown from "../../common/AutocompleteDropdown";
import ValidTextField from "../../common/ValidTextField";
import {useFindAll} from "../../../hooks/useFetch";
import Table from "../../common/Table";
import SubCategoryIcon from "../../icons/SubCategoryIcon";

const subCategoryService = new AxiosSubCategoryClient();
const categoryService = new AxiosCategoryClient();

export default function SubCategory() {
    const tableRef = useRef();
    const errorsRef = useRef([]);
    const [open, setOpen] = useState(false);
    const [findAllCategories, categories] = useFindAll(() => categoryService.findAll());

    useEffect(findAllCategories, []);

    console.log("Sub-Category rendered!");

    const openDialog = useCallback(() => setOpen(true), []);
    const subCategoryIcon = useCallback(() => <SubCategoryIcon/>, []);
    const columns = useCallback(() => [
        {title: '#', field: 'tableData.id', editable: "never", width: "1%"},
        {
            title: 'Name',
            field: "name",
            width: "40%",
            editComponent: (props) => ValidTableCell(props, errorsRef, ValidTextField),
        },
        {
            title: 'Category',
            field: 'category',
            width: "40%",
            render: rowData => rowData.category?.name,
            editComponent: props => ValidTableCell(props, errorsRef, AutocompleteDropdown, {
                items: categories,
                variant: "standard",
                props: {
                    onChange: (event, newValue) => props.onChange(newValue)
                }
            })
        }
    ], [categories]);

    function refreshTable() {
        tableRef.current && tableRef.current.onQueryChange();
    }

    return (
        <>
            <Table
                title="Sub-Categories"
                addNewLabel="Add sub-category"
                addNewIcon={subCategoryIcon}
                onAddNew={openDialog}
                service={subCategoryService}
                findAllPagedExtraArgs={{include: 'category'}}
                columns={columns}
                tableRef={tableRef}
                errorsRef={errorsRef}
            />
            <NewSubCategory isOpen={open} setOpen={setOpen} refreshTable={refreshTable} categories={categories}/>
        </>
    );
}
