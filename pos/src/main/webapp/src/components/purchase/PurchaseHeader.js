import React, {useCallback, useEffect} from 'react';
import Box from "@material-ui/core/Box";
import SupplierDropdown from "./SupplierDropdown";
import ProductDropdown from "./ProductDropdown";
import {Divider} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import {
    AxiosCategoryClient,
    AxiosInventoryMovementClient,
    AxiosProductClient,
    AxiosSubCategoryClient,
    AxiosSupplierClient,
    AxiosTaxClient
} from "../../client/Client";
import {useFindAll, useMultipleFindAll} from "../../hooks/useFetch";
import CircularProgress from "@material-ui/core/CircularProgress";
import Backdrop from "@material-ui/core/Backdrop";
import makeStyles from "@material-ui/core/styles/makeStyles";

const supplierService = new AxiosSupplierClient();
const productService = new AxiosProductClient();
const categoryService = new AxiosCategoryClient();
const subCategoryService = new AxiosSubCategoryClient();
const taxService = new AxiosTaxClient();

const useStyles = makeStyles((theme) => ({
    backdrop: {
        zIndex: theme.zIndex.drawer + 1,
    },
}));

export default function PurchaseHeader({searchProductRef, sequenceNumber}) {
    console.log("Inside PurchaseHeader!");
    const classes = useStyles();
    const [findAll, state, setStateForIndex] = useMultipleFindAll([() => productService.findAll(), () => supplierService.findAll(), () => categoryService.findAll(), () => subCategoryService.findAll(), () => taxService.findAll()]);
    const [products, suppliers, categories, subCategories, taxes] = state.data;

    const multipleLoading = state.progress !== 'done';

    const addProduct = useCallback((product) => setStateForIndex(0, prev => [...prev, product]), []);
    const addSupplier = useCallback((supplier) => setStateForIndex(1, prev => [...prev, supplier]), []);

    useEffect(findAll, []);

    return (
        <>
            {
                multipleLoading ?
                    (
                        <Backdrop className={classes.backdrop} open={multipleLoading}>
                            <CircularProgress/>
                        </Backdrop>
                    )
                    :
                    (
                        <>
                            <Box display="flex" flexWrap='wrap' mx='auto'>
                                <Box m='2em'><TextField variant={"outlined"}
                                                        label={"Sequence number"}
                                                        value={sequenceNumber}
                                                        InputProps={{readOnly: true}}/></Box>
                                <Box m='2em'><SupplierDropdown suppliers={suppliers} addSupplier={addSupplier}/></Box>
                                <Box m='2em'><ProductDropdown products={products} categories={categories}
                                                              subCategories={subCategories} taxes={taxes}
                                                              addProduct={addProduct}
                                                              searchProductRef={searchProductRef}/></Box>
                            </Box>
                            <Divider/>
                        </>
                    )
            }
        </>
    );
};