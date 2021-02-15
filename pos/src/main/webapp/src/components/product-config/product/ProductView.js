import React, {useCallback, useEffect, useRef, useState} from 'react';
import {
    AxiosCategoryClient,
    AxiosProductClient,
    AxiosSubCategoryClient,
    AxiosTaxClient,
    QueryKeys
} from "../../../client/Client";
import ValidTableCell from "../../common/ValidTableCell";
import ValidTextField from "../../common/ValidTextField";
import NewProduct from "./NewProduct";
import AutocompleteDropdown from "../../common/AutocompleteDropdown";
import Table from "../../common/CustomTable";
import FastFoodIcon from '@material-ui/icons/Fastfood';
import {useQueryClient} from "react-query";

const productService = new AxiosProductClient();
const categoryService = new AxiosCategoryClient();
const subCategoryService = new AxiosSubCategoryClient();
const taxService = new AxiosTaxClient();

export default function ProductView() {
    console.log("ProductView rendered!");

    const tableRef = useRef();
    const errorsRef = useRef([]);
    const [open, setOpen] = useState(false);
    const queryClient = useQueryClient();

    useEffect(() => {
        queryClient.prefetchQuery(QueryKeys.CATEGORIES, () => categoryService.findAll().then(x => x.data));
        queryClient.prefetchQuery(QueryKeys.SUB_CATEGORIES, () => subCategoryService.findAll().then(x => x.data));
        queryClient.prefetchQuery(QueryKeys.TAXES, () => taxService.findAll().then(x => x.data));

    }, []);

    const openDialog = useCallback(() => setOpen(true), []);
    const columns = useCallback(() => [
        {title: '#', field: 'tableData.id', editable: "never", width: "1%"},
        {
            title: 'Code',
            field: "code",
            width: "20%",
            editComponent: (props) => ValidTableCell(props, errorsRef, ValidTextField),
        },
        {
            title: 'Name',
            field: "name",
            width: "30%",
            editComponent: (props) => ValidTableCell(props, errorsRef, ValidTextField),
        },
        {
            title: 'Display name',
            field: "displayName",
            width: "20%",
            required: false,
            editComponent: (props) => ValidTableCell(props, errorsRef, ValidTextField),
        },
        {
            title: 'Buy price',
            field: "priceBuy",
            type: 'numeric',
            width: "10%",
            emptyValue: '0.00',
            editComponent: (props) => ValidTableCell(props, errorsRef, ValidTextField),
        },
        {
            title: 'Sell price',
            field: "priceSell",
            type: 'numeric',
            width: "10%",
            editComponent: (props) => ValidTableCell(props, errorsRef, ValidTextField),
        },
        {
            title: 'Taxes',
            field: "tax",
            width: "10%",
            render: product => product.tax?.name,
            editComponent: (props) => ValidTableCell(props, errorsRef, AutocompleteDropdown, {
                items: queryClient.getQueryData(QueryKeys.TAXES),
                variant: "standard",
                isLoading: !!queryClient.isFetching(QueryKeys.TAXES),
                props: {
                    value: props.value,
                    onChange: (event, newValue) => props.onChange(newValue)
                }
            })
        },
        {
            title: 'Final price',
            field: "priceTax",
            type: 'numeric',
            width: "10%",
            editable: 'never',
            editComponent: (props) => ValidTableCell(props, errorsRef, ValidTextField),
        },
        {
            title: 'Category',
            field: "category",
            width: "20%",
            render: product => product.category?.name,
            editComponent: (props) => ValidTableCell(props, errorsRef, AutocompleteDropdown, {
                items: queryClient.getQueryData(QueryKeys.CATEGORIES),
                variant: "standard",
                isLoading: !!queryClient.isFetching(QueryKeys.CATEGORIES),
                props: {
                    value: props.value,
                    onChange: (event, newValue) => props.onChange(newValue)
                }
            })
        },
        {
            title: 'Sub-Category',
            field: "subCategory",
            width: "20%",
            required: false,
            render: product => product.subCategory?.name,
            editComponent: (props) => ValidTableCell(props, errorsRef, AutocompleteDropdown, {
                    items: queryClient.getQueryData(QueryKeys.SUB_CATEGORIES),
                    variant: "standard",
                    isLoading: !!queryClient.isFetching(QueryKeys.SUB_CATEGORIES),
                    props: {
                        value: props.value,
                        onChange: (event, newValue) => props.onChange(newValue)
                    }
                })

        },
        {
            title: 'Min. stock',
            field: 'minStock',
            type: 'numeric',
            required: false,
            width: "5%",
            editComponent: (props) => ValidTableCell(props, errorsRef, ValidTextField)
        }
    ], []);

    return (
        <>
            <Table
                title="Products"
                addNewLabel="Add product"
                AddNewIcon={FastFoodIcon}
                onAddNew={openDialog}
                service={productService}
                columns={columns}
                tableRef={tableRef}
                errorsRef={errorsRef}
                queryKey={QueryKeys.PRODUCTS}
            />
            {open && (
                <NewProduct isOpen={open}
                            setOpen={setOpen}
                            savedProduct={() => tableRef.current && tableRef.current.onQueryChange()}
                />
            )}
        </>
    );
}