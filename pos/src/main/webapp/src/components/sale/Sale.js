import React, {useEffect, useRef} from 'react';
import SwipeableViews from 'react-swipeable-views';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SaleTable from "./SaleTable";
import Grid from '@material-ui/core/Grid/Grid';
import ProductsList from "./ProductsList";
import {Zoom} from "@material-ui/core";
import Tools from "./Tools";
import {useDispatch, useSelector} from "react-redux";
import {AxiosTicketClient} from "../../client/Client";
import Summary from "./Summary";
import {fetch, loadingFetch} from "../../services/fetch";
import ProgressButton from "../common/ProgressButton";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import TabPanel from "./TabPanel";
import {Actions} from "../../reducers/global/saleTabsReducer";
import {formatMoney} from "../../services/utils";
import IconButton from "@material-ui/core/IconButton";
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from "@material-ui/core/Toolbar";
import clsx from 'clsx';
import CategoriesDrawer from "./CategoriesDrawer";

function a11yProps(index) {
    return {
        id: `full-width-tab-${index}`,
        'aria-controls': `full-width-tabpanel-${index}`,
    };
}

const useStyles = makeStyles((theme) => ({
    root: {
        backgroundColor: theme.palette.background.paper,
        width: '100%',
        height: '100%',
        flexGrow: 1,
    },
    toolbar: {
        display: "flex",
    },
    tabs: {
        flexBasis: '100%'
    },
    '.MuiTab-wrapper': {
        fontSize: "2em",
        fontWeight: "bold"
    },
    firstGridPart: {
        order: 1,
        display: "flex",
        flexDirection: "column",
        [theme.breakpoints.down('sm')]: {
            order: 2,
        }
    },
    secondGridPart: {
        order: 2,
        [theme.breakpoints.down('sm')]: {
            order: 0,
        }
    },
    menuButton: {
        marginLeft: theme.spacing(1),
        marginRight: theme.spacing(1),
    },
    hide: {
        display: 'none',
    },
    content: {
        flexGrow: 1,
        padding: theme.spacing(3),
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
        }),
        marginRight: 0,
    },
    contentShift: {
        transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.easeOut,
            duration: theme.transitions.duration.enteringScreen,
        }),
        marginRight: 280,
    },
}));

export default function Sale() {
    const ticketClient = new AxiosTicketClient();
    const classes = useStyles();
    const theme = useTheme();
    const qtyRef = useRef();
    const qtyFocusRef = useRef(false);
    const searchRef = useRef();
    const dispatch = useDispatch();
    const {selectedIndex, tickets} = useSelector((state) => state.tabs);
    const selectedTicket = tickets[selectedIndex];
    const [open, setOpen] = React.useState(false);

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };

    useEffect(() => {
        window.addEventListener('keydown', downHandler);
        return () => {
            window.removeEventListener('keydown', downHandler);
        };
    });

    useEffect(() => {
        fetch(ticketClient.openTicket(1),
            response => dispatch({type: Actions.SET_SELECTED_TICKET, payload: response}))
    }, []);

    function downHandler(keyboardEvent) {
        console.log("Key pressed: ", keyboardEvent)
        if (keyboardEvent.altKey && keyboardEvent.code === 'KeyT') {
            fetch(ticketClient.openTicket(1),
                response => dispatch({type: Actions.NEW_TICKET, payload: response}));
        } else if (keyboardEvent.altKey && keyboardEvent.code === 'KeyW') {
            fetch(ticketClient.deleteById(selectedTicket.id), () => dispatch({type: Actions.REMOVE_SELECTED_TICKET}))
        } else if (keyboardEvent.altKey && keyboardEvent.code === 'ArrowRight') {
            dispatch({type: Actions.NEXT_TICKET})
        } else if (keyboardEvent.altKey && keyboardEvent.code === 'ArrowLeft') {
            dispatch({type: Actions.PREV_TICKET})
        } else if (keyboardEvent.key === '*' && qtyRef.current) {
            qtyRef.current.focus();
        } else if (keyboardEvent.key === 'Enter' && qtyFocusRef.current && searchRef.current) {
            searchRef.current.focus();
        }
    }

    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    };

    function payButtonOnAction(setLoading, setSuccess) {
        loadingFetch(ticketClient.update(selectedTicket),
            () => {
                if (tickets.length === 1) {
                    fetch(ticketClient.openTicket(1), response => {
                        dispatch({type: Actions.SET_SELECTED_TICKET, payload: response});
                    });
                } else {
                    dispatch({type: Actions.REMOVE_SELECTED_TICKET})
                }
                setSuccess(true);
                setTimeout(() => setSuccess(false), 1500);

            },
            setLoading,
            () => setSuccess(false))
    }

    return <div className={classes.root}>
        <AppBar position="static" color="default">
            <Toolbar classes={classes.toolbar} disableGutters>
                <Tabs
                    value={selectedIndex}
                    indicatorColor="primary"
                    textColor="primary"
                    variant="fullWidth"
                    classes={{
                        root: classes.tabs
                    }}
                >
                    {tickets.map((item, index) =>
                        <Tab id={index}
                             key={index}
                             label={formatMoney(item.totalAmount)}
                             style={{
                                 fontSize: "2em",
                                 fontWeight: "bold"
                             }}
                             onClick={() => dispatch({type: Actions.GOTO_TICKET, payload: index})}
                             {...a11yProps(index)}>
                        </Tab>
                    )}
                </Tabs>
                <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={handleDrawerOpen}
                    className={clsx(classes.menuButton, open && classes.hide)}
                >
                    <MenuIcon/>
                </IconButton>
            </Toolbar>
        </AppBar>
        <CategoriesDrawer open={open} handleDrawerClose={handleDrawerClose}/>
        <main
            style={{position: 'relative', height: '95%'}}
            className={clsx(classes.content, {
                [classes.contentShift]: open,
            })}
        >
        <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={selectedIndex}
        >
            {tickets.map((item, index) =>
                <TabPanel key={index} value={selectedIndex} index={index} {...a11yProps(index)}>
                    <Grid container spacing={3}>
                        <Grid className={classes.firstGridPart} key={"left-side"} item md={6} sm={12}>
                            <Tools/>
                            <SaleTable qtyRef={qtyRef} searchRef={searchRef} qtyFocusRef={qtyFocusRef}/>
                            <Summary total={selectedTicket.totalAmount}/>
                        </Grid>
                        <Grid key={"right-side"} className={classes.secondGridPart} item md={6} sm={12}>
                            <ProductsList searchRef={searchRef} ticketLines={selectedTicket.ticketLines}/>
                        </Grid>
                    </Grid>
                </TabPanel>
            )}
        </SwipeableViews>
        {tickets.map((tab, index) =>
            <Zoom
                key={index}
                in={selectedIndex === index}
                timeout={transitionDuration}
                style={{
                    transitionDelay: `${selectedIndex === index ? transitionDuration.exit : 0}ms`,
                }}
                unmountOnExit
            >
                <ProgressButton size="large"
                                icon={<AddShoppingCartIcon style={{fontSize: "4em"}}/>}
                                disabled={(selectedTicket.totalAmount === 0)}
                                onClick={(setLoading, setSuccess) => payButtonOnAction(setLoading, setSuccess)}/>
            </Zoom>)}
        </main>
    </div>
;
}
