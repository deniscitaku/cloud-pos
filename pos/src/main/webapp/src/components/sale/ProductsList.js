import React, {useEffect, useState} from 'react';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import Divider from "@material-ui/core/Divider";
import SearchIcon from '@material-ui/icons/Search';
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import GridList from "@material-ui/core/GridList";
import ProductTile from "./ProductTile";
import {AxiosProductClient, AxiosTicketLineClient, TicketLinePayload} from "../../client/Client";
import Skeleton from "@material-ui/lab/Skeleton";
import Box from "@material-ui/core/Box";
import {cancelerFetch, fetch, loadingFetch} from "../../services/fetch";
import {useSnackbar} from "notistack";
import {useTranslation} from "react-i18next";
import {useDispatch} from "react-redux";
import {Actions} from "../../reducers/global/saleTabsReducer";

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

export default function ProductsList({searchRef, ticketLines}) {
    const productClient = new AxiosProductClient();
    const ticketLineClient = new AxiosTicketLineClient();
    const classes = useStyles();
    const [searchValue, setSearchValue] = useState('');
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(false);
    const {enqueueSnackbar} = useSnackbar();
    const {t} = useTranslation();
    const dispatch = useDispatch();

    console.log("--> Inside Products list", products);

    useEffect(() => {
        let timeout = setTimeout(() => loadingFetch(productClient.findAll(), setProducts, setLoading), 300);
        return () => clearTimeout(timeout);
    }, []);

    function handleSearchButtonOnChange(event) {
        setSearchValue(event.target.value);
        cancelerFetch(cancelToken => {
                return productClient.findByCodeOrName({codeOrName: event.target.value}, cancelToken);
            },
            setProducts,
            setLoading,
            () => enqueueSnackbar('Unexpected error occurred, please contact support for more information.', {variant: "error"}));
    }

    function handleSearchKeyPress(event) {
        console.log("Event: ", event);
        if (event.target.value && event.key === 'Enter') {
            loadingFetch(productClient.findByCode(event.target.value), product => {
                if (product) {
                    let ticketLine = new TicketLinePayload({
                        lineNumber: ticketLines ? ticketLines.length + 1 : 1,
                        product: product,
                        quantity: 1,
                    });

                    fetch(ticketLineClient.create(ticketLine), ticketLine => {
                        dispatch({type: Actions.NEW_TICKET_LINE, payload: ticketLine});
                        setSearchValue('');
                    });
                }
            }, setLoading);
        }
    }

    return (
        <div className={classes.root}>
            <TextField
                autoFocus
                id="search-textfield"
                label={t("app.searchOrScan")}
                variant="outlined"
                color="primary"
                className={classes.searchOrScanTextField}
                onKeyPress={handleSearchKeyPress}
                onChange={handleSearchButtonOnChange}
                inputRef={searchRef}
                value={searchValue}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon/>
                        </InputAdornment>
                    ),
                }}
            />
            <Divider style={{marginTop: 15, marginBottom: 15}}/>
            <GridList cellHeight={"auto"} spacing={5} className={classes.grid}>
                {
                    (loading ? Array.from(new Array(9)) : products).map((product, index) => (
                        product ?
                            (<ProductTile product={product} key={index} index={index} ticketLines={ticketLines}/>)
                            :
                            (<Box key={index} maxWidth={"14em"} maxHeight={"9em"} margin={2}>
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