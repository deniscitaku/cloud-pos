import React, {useEffect, useState} from 'react';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import Divider from "@material-ui/core/Divider";
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from "@material-ui/core/InputAdornment";
import GridList from "@material-ui/core/GridList";
import ProductTile from "./ProductTile";
import {AxiosProductClient, AxiosTicketClient, QueryKeys, TicketLinePayload} from "../../client/Client";
import Skeleton from "@material-ui/lab/Skeleton";
import Box from "@material-ui/core/Box";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";
import {Actions} from "../../reducers/global/saleTabsReducer";
import store from "../../store";
import CircularProgress from "@material-ui/core/CircularProgress";
import ValidTextField from "../common/ValidTextField";
import {useMutation, useQueryClient} from "react-query";
import axios from 'axios';

const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        searchOrScanTextField: {
            width: "100%",
        },
        grid: {
            width: "100%",
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'flex-start',
            overflow: 'auto',
            maxHeight: '70vh',
            backgroundColor: theme.palette.background.paper,
        }
    }),
);

const productService = new AxiosProductClient();
const ticketService = new AxiosTicketClient();

let source = axios.CancelToken.source();

function addTicketLinePromise(ticketLine) {
    const tabs = store.getState().tabs;
    const ticketId = tabs.tickets[tabs.selectedIndex].id;

    return ticketService.addTicketLine(ticketId, ticketLine).then(x => x.data)
}

export default function ProductList({searchRef, productsByCategoryOrSubCategory, isLoading, setTableLoading}) {
    console.log("Inside Product list");

    const {t} = useTranslation();
    const classes = useStyles();
    const [searchValue, setSearchValue] = useState('');
    const queryClient = useQueryClient();
    const dispatch = useDispatch();

    const {mutate: findByCodeOrName, data: products, status, reset} = useMutation(findByCodeOrNamePromise);

    const {mutate: findByCode, isLoading: findByCodeLoading} = useMutation(findByCodePromise, {
        onSuccess: x => {
            if (x) {
                addTicketLine(new TicketLinePayload({
                    product: x,
                    quantity: 1,
                }));
                setSearchValue('');
            }
        }
    });

    const {mutate: addTicketLine, isLoading: addTicketLineLoading} = useMutation(addTicketLinePromise, {
        onSuccess: x => dispatch({type: Actions.UPDATE_SELECTED_TICKET, payload: x})
    });

    useEffect(() => {
        if (!searchValue) {
            return;
        }

        reset();
        const findByCodeOrNameTimeout = setTimeout(() => {
            findByCodeOrName()
        }, 300);

        return () => clearTimeout(findByCodeOrNameTimeout)
    }, [searchValue]);

    useEffect(() => setTableLoading(addTicketLineLoading), [addTicketLineLoading]);

    const finalProducts = !searchValue ?
        (isLoading || !productsByCategoryOrSubCategory ? new Array(9).fill(undefined) : productsByCategoryOrSubCategory)
        :
        (status !== 'success' ? new Array(9).fill(undefined) : products);

    function handleSearchKeyPress(event) {
        if (event.target.value && event.key === 'Enter') {
            event.preventDefault();
            findByCode(event.target.value);
        }
    }

    function findByCodePromise(code) {
        source && source.cancel();

        const productFound = queryClient.getQueryData(QueryKeys.PRODUCTS)
            ?.find(x => x.code === code);
        if (productFound) {
            return Promise.resolve(productFound);
        }

        return productService.findByCode(code).then(x => x.data);
    }

    function findByCodeOrNamePromise() {
        const searchValueLowerCase = searchValue.toLowerCase();
        const productsFound = queryClient.getQueryData(QueryKeys.PRODUCTS)
            ?.filter(x => x.code.toLowerCase().includes(searchValueLowerCase) || x.name.toLowerCase().includes(searchValueLowerCase));

        console.log("Products found: ", productsFound);
        if (productsFound?.length) {
            return Promise.resolve(productsFound);
        }

        source && source.cancel();
        source = axios.CancelToken.source();

        return productService.findByCodeOrName({codeOrName: searchValue}, source.token).then(x => x.data);
    }

    return (
        <div className={classes.root}>
            <ValidTextField
                autoFocus
                id="search-textfield"
                label={t("app.searchOrScan")}
                variant="outlined"
                color="primary"
                className={classes.searchOrScanTextField}
                onKeyPress={handleSearchKeyPress}
                onChange={e => setSearchValue(e.target.value)}
                inputRef={searchRef}
                value={searchValue}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            {findByCodeLoading ? <CircularProgress size={25}/> : <SearchIcon/>}
                        </InputAdornment>
                    ),
                }}
            />
            <Divider style={{marginTop: 15, marginBottom: 15}}/>
            <GridList cellHeight={"auto"} spacing={5} className={classes.grid}>
                {
                    finalProducts.map((product, index) => (
                        product ?
                            (<ProductTile product={product} key={index} index={index} setTableLoading={setTableLoading}/>)
                            :
                            (<Box key={index} maxWidth={"13em"} maxHeight={"9em"} margin={2}>
                                <Skeleton variant="rect" height={"5em"}/>
                                <Skeleton/>
                                <Skeleton width="60%"/>
                            </Box>)
                    ))
                }
            </GridList>
        </div>
    );
}