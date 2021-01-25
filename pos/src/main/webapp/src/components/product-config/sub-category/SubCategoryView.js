import React, {useCallback, useEffect, useRef, useState} from 'react';
import {AxiosCategoryClient, AxiosSubCategoryClient, QueryKeys} from "../../../client/Client";
import ValidTableCell from "../../common/ValidTableCell";
import NewSubCategory from "./NewSubCategory";
import AutocompleteDropdown from "../../common/AutocompleteDropdown";
import ValidTextField from "../../common/ValidTextField";
import Table from "../../common/CustomTable";
import SubCategoryIcon from "../../icons/SubCategoryIcon";
import {useQueryClient} from "react-query";

const subCategoryService = new AxiosSubCategoryClient();
const categoryService = new AxiosCategoryClient();

export default function SubCategoryView() {
    const tableRef = useRef();
    const errorsRef = useRef([]);
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();

    useEffect(() => {
        queryClient.prefetchQuery(QueryKeys.CATEGORIES, () => categoryService.findAll().then(x => x.data))
    }, []);

    console.log("Sub-Category rendered!");

    const openDialog = useCallback(() => setOpen(true), []);
    const subCategoryIcon = useRef(<SubCategoryIcon/>);
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
                items: queryClient.getQueryData(QueryKeys.CATEGORIES),
                variant: "standard",
                isLoading: !!queryClient.isFetching(QueryKeys.CATEGORIES),
                props: {
                    value: props.value,
                    onChange: (event, newValue) => props.onChange(newValue)
                }
            })
        }
    ], []);

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
                queryKey={QueryKeys.SUB_CATEGORIES}
            />
            {open && <NewSubCategory isOpen={open} setOpen={setOpen} refreshTable={() => tableRef.current && tableRef.current.onQueryChange()}/>}
        </>
    );
}
