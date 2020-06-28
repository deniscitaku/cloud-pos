import React, {createRef, forwardRef, useEffect, useImperativeHandle, useRef} from 'react';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import {withWidth} from "@material-ui/core";
import Divider from "@material-ui/core/Divider";
import SearchIcon from '@material-ui/icons/Search';
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import GridList from "@material-ui/core/GridList";
import ProductTile from "./ProductTile";
import {AxiosProductClient} from "../../client/Client";
import Skeleton from "@material-ui/lab/Skeleton";
import Box from "@material-ui/core/Box";
import {cancelerFetch, fetch} from "../../services/fetch";
import {useSnackbar} from "notistack";
import {useTranslation} from "react-i18next";

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

const ProductsList = forwardRef((props, ref) => {
    const productClient = new AxiosProductClient();
    const {ticketIndex} = props;
    const classes = useStyles();
    const [products, setProducts] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const {enqueueSnackbar} = useSnackbar();
    const searchRef = createRef();
    const { t } = useTranslation();

    useEffect(() => {
        fetch(productClient.findAll(), setProducts);
    }, []);

    function handleSearchButtonOnChange(event) {
        cancelerFetch(cancelToken => {
            console.log("Cancel token: ", cancelToken);
            return productClient.findByCodeOrName({codeOrName: event.target.value}, cancelToken);
            },
            setProducts,
            setLoading,
            () => enqueueSnackbar('Unexpected error occurred, please contact support for more information.', {variant: "error"}));
    }

    useImperativeHandle(ref, () => ({
        focusSearch() {
            if (searchRef.current) {
                searchRef.current.focus();
            }
        }
    }));

    console.log("Inside Products list", products)
    return (
        <div className={classes.root}>
            <TextField
                id="search-textfield"
                label={t("app.searchOrScan")}
                variant="outlined"
                color="primary"
                className={classes.searchOrScanTextField}
                onChange={handleSearchButtonOnChange}
                inputRef={searchRef}
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
                            (<ProductTile product={product} ticketIndex={ticketIndex} key={index} index={index}/>)
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
})

export default ProductsList;