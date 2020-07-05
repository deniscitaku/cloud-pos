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
import {closeTicket, openTicket} from "../../reducers/global/ticketReducer";
import {AxiosTicketClient} from "../../client/Client";
import TicketSummary from "./TicketSummary";
import {fetch, loadingFetch} from "../../services/fetch";
import ProgressButton from "../common/ProgressButton";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import TabPanel from "./TabPanel";
import tabReducer, {Actions} from "../../reducers/tabReducer";
import {formatMoney} from "../../services/utils";

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
    '.MuiTab-wrapper': {
        fontSize: "2em",
        fontWeight: "bold"
    },
    fab: {
        position: 'absolute',
        bottom: theme.spacing(5),
        right: theme.spacing(5),
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
    }
}));

export default function Sale() {
    const ticketClient = new AxiosTicketClient();
    const dispatch = useDispatch();
    const classes = useStyles();
    const theme = useTheme();
    const childRefs = useRef([]);
    const [state, dispatcher] = React.useReducer(tabReducer, {tabs: [], selectedIndex: 0});
    const tickets = useSelector((state) => {
        if (!state.ticket.length) {
            return [...state.ticket, {ticketLines: [], totalAmount: 0}]
        }
        return state.ticket;
    });
    const currentTicket = tickets[state.selectedIndex];

    useEffect(() => {
        window.addEventListener('keydown', downHandler);
        return () => {
            window.removeEventListener('keydown', downHandler);
        };
    });

    useEffect(() => {
        openNewTab()
    }, []);

    function openNewTab() {
        fetch(ticketClient.openTicket("5e9d89599d4e0c79447630f4"), response => {
            openTicket(state.selectedIndex, response, dispatch)
            dispatcher({type: Actions.NEW_TAB, ticket: response})
        })
    }

    function removeTab() {
        let selectedIndex = state.selectedIndex;
        dispatcher({type: Actions.REMOVE_TAB})
        closeTicket(selectedIndex, dispatch);
    }

    function downHandler(keyboardEvent) {
        console.log("Key pressed: ", keyboardEvent)
        if (keyboardEvent.altKey && keyboardEvent.code === 'KeyT') {
            openNewTab();
        } else if (keyboardEvent.altKey && keyboardEvent.code === 'KeyW') {
            removeTab();
        } else if (keyboardEvent.altKey && keyboardEvent.code === 'ArrowRight') {
            dispatcher({type: Actions.NEXT_TAB})
        } else if (keyboardEvent.altKey && keyboardEvent.code === 'ArrowLeft') {
            dispatcher({type: Actions.PREV_TAB})
        } else if (keyboardEvent.key === '*' && childRefs.current[0]) {
            childRefs.current[0].focusQty();
        } else if (keyboardEvent.key === 'Enter' && childRefs.current[0] && childRefs.current[0].isFocused() && childRefs.current[1]) {
            childRefs.current[1].focusSearch();
        }
    }

    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    };

    function payButtonOnAction(setLoading, setSuccess) {
        if (!currentTicket || currentTicket.totalAmount === 0) return;

        loadingFetch(ticketClient.update(currentTicket),
            () => {
                if (state.tabs.length > 1) {
                    removeTab();
                } else {
                    closeTicket(state.selectedIndex, dispatch);
                    fetch(ticketClient.openTicket("5e9d89599d4e0c79447630f4"), response => {
                        openTicket(state.selectedIndex, response, dispatch);
                        dispatcher({type: Actions.UPDATE_TAB, ticket: response});
                    });
                }
                setSuccess(true);
                setTimeout(() => setSuccess(false), 1500);

            },
            setLoading,
            () => setSuccess(false))
    }

    return <div className={classes.root}>
        <AppBar position="static" color="default">
            <Tabs
                value={state.selectedIndex}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
            >
                {state.tabs.map((item, index) =>
                    <Tab id={index}
                         key={index}
                         label={formatMoney(state.tabs[index].ticket.totalAmount)}
                         style={{
                             fontSize: "2em",
                             fontWeight: "bold"
                         }}
                         onClick={() => dispatcher({type: Actions.GOTO_TAB, selectedIndex: index})}
                         {...a11yProps(index)}>
                    </Tab>
                )}
            </Tabs>
        </AppBar>
        <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={state.selectedIndex}
            onChangeIndex={(index => dispatcher({type: Actions.GOTO_TAB, selectedIndex: index}))}
        >
            {state.tabs.map((item, index) =>
                <TabPanel key={index} value={state.selectedIndex} index={index} {...a11yProps(index)}>
                    <Grid container spacing={3}>
                        <Grid className={classes.firstGridPart} key={"left-side"} item md={6} sm={12}>
                            <Tools/>
                            <SaleTable ref={e => childRefs.current[0] = e} style={{maxHeight: "200px"}}
                                       ticketIndex={state.selectedIndex}/>
                            <TicketSummary ticketIndex={state.selectedIndex}/>
                        </Grid>
                        <Grid key={"right-side"} className={classes.secondGridPart} item md={6} sm={12}>
                            <ProductsList ref={e => childRefs.current[1] = e} ticketIndex={state.selectedIndex}/>
                        </Grid>
                    </Grid>
                </TabPanel>
            )}
        </SwipeableViews>
        {state.tabs.map((tab, index) =>
            <Zoom
                key={index}
                in={state.selectedIndex === index}
                timeout={transitionDuration}
                style={{
                    transitionDelay: `${state.selectedIndex === index ? transitionDuration.exit : 0}ms`,
                }}
                unmountOnExit
            >
                <ProgressButton className={classes.fab}
                                size="large"
                                icon={<AddShoppingCartIcon style={{fontSize: "4em"}}/>}
                                disabled={(currentTicket.totalAmount === 0)}
                                onClick={(setLoading, setSuccess) => payButtonOnAction(setLoading, setSuccess)}/>
            </Zoom>)}
    </div>;
}
