import React, {useEffect, useRef, useState} from 'react';
import SwipeableViews from 'react-swipeable-views';
import {makeStyles, useTheme} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import SaleTable from "./SaleTable";
import Grid from '@material-ui/core/Grid/Grid';
import ProductList from "./ProductList";
import {Zoom} from "@material-ui/core";
import Tools from "./Tools";
import {useDispatch, useSelector} from "react-redux";
import {AxiosProductClient, AxiosTicketClient, QueryKeys, Status} from "../../client/Client";
import Summary from "./Summary";
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
import {useIsFetching, useMutation, useQuery, useQueryClient} from "react-query";
import CustomBackdrop from "../common/CustomBackdrop";

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

const MAX_TICKETS = 10;
const productService = new AxiosProductClient();
const ticketService = new AxiosTicketClient();

export default function SaleView() {
    console.log("Inside SaleView!");
    const [open, setOpen] = useState(true);
    const [disabledPayButton, setDisablePayButton] = useState(false);
    const [tableLoading, setTableLoading] = useState(false);

    const classes = useStyles();
    const theme = useTheme();

    const qtyRef = useRef();
    const searchRef = useRef();

    const queryClient = useQueryClient();
    const dispatch = useDispatch();
    const {selectedIndex, tickets} = useSelector((state) => state.tabs);
    const selectedTicket = tickets[selectedIndex];

    const {mutate: findByCategoryOrSubCategory, data: productsByCategoryOrSubCategory, isLoading} =
        useMutation(({id, isCategory}) => isCategory ?
            productService.findByCategoryId(id).then(x => x.data) :
            productService.findBySubCategoryId(id).then(x => x.data));

    const isFetching = useIsFetching([QueryKeys.TICKET, Status.OPENED]);
    const {data: openedTickets, status: openedTicketsStatus} = useQuery([QueryKeys.TICKET, Status.OPENED], () => ticketService
        .findByStatus(Status.OPENED)
        .then(x => x.data), {
        refetchOnMount: true,
    });

    const {mutate: openTicket, isLoading: openTicketLoading} = useMutation(() => ticketService.openTicket(1).then(x => x.data), {
        onSuccess: (data, variables) => dispatch({type: variables, payload: data})
    });

    const {mutate: removeTicketById, isLoading: removeTicketLoading} = useMutation(id => ticketService.deleteById(id), {
        onSuccess: () => dispatch({type: Actions.REMOVE_SELECTED_TICKET})
    });

    const {mutate: closeTicket, status, reset} = useMutation(ticket => {
        return ticketService.closeTicket(ticket)
            .then(x => x.data)
    }, {
        onSuccess: () => {
            if (tickets.length === 1) {
                openTicket(Actions.UPDATE_SELECTED_TICKET);
            } else {
                dispatch({type: Actions.REMOVE_SELECTED_TICKET})
            }
            setTimeout(reset, 1000);
        }
    });

    useEffect(() => {
        window.addEventListener('keydown', downHandler);
        return () => {
            window.removeEventListener('keydown', downHandler);
        };
    });

    useEffect(() => {
        if (openedTicketsStatus === 'success') {
            if (openedTickets && openedTickets.length) {
                console.log("Latest updated: ", openedTickets.reduce((a, b) => a.updatedOn > b.updatedOn ? a : b));
                const selectedTicketIndex = openedTickets.indexOf(openedTickets.reduce((a, b) => a.updatedOn > b.updatedOn ? a : b));
                console.log("Selected ticket index: ", selectedTicketIndex);
                dispatch({
                    type: Actions.SET_TICKETS,
                    payload: openedTickets.slice(0, MAX_TICKETS),
                    selectedIndex: selectedTicketIndex >= 0 ? selectedTicketIndex : 0
                });
            } else {
                if (tickets.length === 0) {
                    openTicket(Actions.CREATE_TICKET);
                } else {
                    dispatch({type: Actions.GOTO_TICKET, payload: selectedIndex})
                }
            }
        }
    }, [isFetching]);

    useEffect(() => {
        queryClient.prefetchQuery(QueryKeys.PRODUCTS, () => productService.findAll().then(x => x.data));
    }, []);

    function downHandler(keyboardEvent) {
        console.log("Key pressed: ", keyboardEvent);
        if (keyboardEvent.altKey && keyboardEvent.code === 'KeyT') {
            openNewTicket(Actions.CREATE_TICKET);
        } else if (keyboardEvent.altKey && keyboardEvent.code === 'KeyW' && tickets.length > 1) {
            removeCurrentTicket()
        } else if (keyboardEvent.altKey && keyboardEvent.code === 'ArrowRight') {
            dispatch({type: Actions.NEXT_TICKET})
        } else if (keyboardEvent.altKey && keyboardEvent.code === 'ArrowLeft') {
            dispatch({type: Actions.PREV_TICKET})
        } else if (keyboardEvent.key === '*' && qtyRef.current) {
            qtyRef.current.focus();
        } else if (keyboardEvent.key === 'Enter' && searchRef.current) {
            searchRef.current.focus();
        }
    }

    function openNewTicket(action) {
        if (tickets.length < MAX_TICKETS) {
            openTicket(action);
        }
    }

    function removeCurrentTicket() {
        if (tickets.length > 1) {
            removeTicketById(selectedTicket.id);
        }
    }

    return (
        <>
            <div className={classes.root}>
                <AppBar position="static" color="default">
                    <Toolbar className={classes.toolbar} disableGutters>
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
                                     label={formatMoney(item.ticketLines.map(x => x.amount).reduce((a, b) => a + b, 0))}
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
                            onClick={() => setOpen(true)}
                            className={clsx(classes.menuButton, open && classes.hide)}
                        >
                            <MenuIcon/>
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <CategoriesDrawer open={open} handleDrawerClose={() => setOpen(false)}
                                  onChange={findByCategoryOrSubCategory}/>
                {!selectedTicket || openTicketLoading || removeTicketLoading || isFetching ?
                    <CustomBackdrop/>
                    :
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
                                            <SaleTable searchRef={searchRef} qtyRef={qtyRef}
                                                       setDisablePayButton={setDisablePayButton}
                                                       tableLoading={tableLoading}
                                                       setTableLoading={setTableLoading}/>
                                            <Summary
                                                total={selectedTicket.ticketLines.map(x => x.amount).reduce((a, b) => a + b, 0)}/>
                                        </Grid>
                                        <Grid key={"right-side"} className={classes.secondGridPart} item md={6} sm={12}>
                                            <ProductList searchRef={searchRef}
                                                         productsByCategoryOrSubCategory={productsByCategoryOrSubCategory}
                                                         isLoading={isLoading}
                                                         setTableLoading={setTableLoading}
                                            />
                                        </Grid>
                                    </Grid>
                                </TabPanel>
                            )}
                        </SwipeableViews>
                        {tickets.map((tab, index) =>
                            <Zoom
                                key={index}
                                in={selectedIndex === index}
                                timeout={{
                                    enter: theme.transitions.duration.enteringScreen,
                                    exit: theme.transitions.duration.leavingScreen,
                                }}
                                style={{
                                    transitionDelay: `${selectedIndex === index ? theme.transitions.duration.leavingScreen : 0}ms`,
                                }}
                                unmountOnExit
                            >
                                <ProgressButton size="large"
                                                Icon={AddShoppingCartIcon}
                                                disabled={selectedTicket.ticketLines.length === 0 || disabledPayButton || tableLoading}
                                                success={status === 'success'}
                                                loading={status === 'loading'}
                                                onClick={() => closeTicket(selectedTicket)}/>
                            </Zoom>)}
                    </main>
                }
            </div>
        </>);
}
