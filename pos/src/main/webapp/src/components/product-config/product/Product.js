import React, {useCallback, useEffect, useRef, useState} from 'react';
import {AxiosCategoryClient, AxiosProductClient, AxiosSubCategoryClient, AxiosTaxClient} from "../../../client/Client";
import ValidTableCell from "../../common/ValidTableCell";
import ValidTextField from "../../common/ValidTextField";
import NewProduct from "./NewProduct";
import {useMultipleFindAll} from "../../../hooks/useFetch";
import AutocompleteDropdown from "../../common/AutocompleteDropdown";
import CircularProgress from "@material-ui/core/CircularProgress";
import Table from "../../common/Table";
import FastFoodIcon from '@material-ui/icons/Fastfood';

const productService = new AxiosProductClient();
const categoryService = new AxiosCategoryClient();
const subCategoryService = new AxiosSubCategoryClient();
const taxService = new AxiosTaxClient();

export default function Product() {
    console.log("Product rendered!");

    const tableRef = useRef();
    const errorsRef = useRef([]);
    const [open, setOpen] = useState(false);
    const [findAll, state] = useMultipleFindAll([() => categoryService.findAll(), () => subCategoryService.findAll(), () => taxService.findAll()]);
    const [categories, subCategories, taxes] = state.data;

    const openDialog = useCallback(() => setOpen(true), []);
    const productIcon = useCallback(() => <FastFoodIcon/>, []);

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
                items: taxes,
                variant: "standard",
                props: {
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
                items: categories,
                variant: "standard",
                props: {
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
                items: subCategories,
                variant: "standard",
                props: {
                    onChange: (event, newValue) => props.onChange(newValue)
                }
            })
        },
        {
            title: 'Min. stock',
            field: 'minStock',
            type: 'numeric',
            required: false,
            width: "5%"
        }
    ], [state.data]);

    useEffect(findAll, []);

    if (state.progress === 'idle') {
        return (<CircularProgress style={{position: 'absolute', left: '50%', top: '50%'}}/>)
    }

    function refreshTable() {
        tableRef.current && tableRef.current.onQueryChange();
    }

    return (
        <>
            <Table
                title="Products"
                addNewLabel="Add product"
                addNewIcon={productIcon}
                onAddNew={openDialog}
                service={productService}
                columns={columns}
                tableRef={tableRef}
                errorsRef={errorsRef}
            />
            <NewProduct isOpen={open}
                        setOpen={setOpen}
                        refreshTable={refreshTable}
                        categories={categories}
                        subCategories={subCategories}
                        taxes={taxes}
            />
        </>
    );
}