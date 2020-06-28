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
import {closeTicket, openTicket} from "../../reducers/ticketReducer";
import {AxiosTicketClient} from "../../client/Client";
import TicketSummary from "./TicketSummary";
import {fetch, loadingFetch} from "../../services/fetch";
import ProgressButton from "../common/ProgressButton";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import TabPanel from "./TabPanel";
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
    const [selectedTab, setSelectedTab] = React.useState(0);
    const [tabs, setTabs] = React.useState([{label: formatMoney(0)}]);
    const ticket = useSelector(state => state.ticket)[selectedTab];
    const [state, dispatcher] = React.useReducer(tabReducer, {});

    useEffect(() => {
        window.addEventListener('keydown', downHandler);
        return () => {
            window.removeEventListener('keydown', downHandler);
        };
    });

    useEffect(() => {
        openNewTicket()
    }, []);

    useEffect(() => {
        setTabs(prevState => {
            let state = [...prevState];
            state[selectedTab].label = formatMoney(ticket ? ticket.totalAmount : 0);
            return state;
        })
    }, [ticket ? ticket.totalAmount : 0])

    function openNewTicket() {
        fetch(ticketClient.openTicket("5e9d89599d4e0c79447630f4"),
            response => openTicket(tabs.length - 1, response, dispatch));
    }

    function downHandler(keyboardEvent) {
        console.log("Key pressed: ", keyboardEvent)
        if (keyboardEvent.altKey && keyboardEvent.code === 'KeyT') {
            if (tabs.length <= 10) {
                setTabs(prevState => [...prevState, {label: `Ticket ${tabs.length + 1}`}]);
                setSelectedTab(tabs.length);
                openNewTicket();
            }
        } else if (keyboardEvent.altKey && keyboardEvent.code === 'KeyW') {
            if (tabs.length > 1) {
                setSelectedTab(tabs.length - 2);
                setTabs(tabs.filter((val, index) => index !== selectedTab));
            }
        } else if (keyboardEvent.altKey && keyboardEvent.code === 'ArrowRight') {
            const val = selectedTab + 1;
            setSelectedTab(val < tabs.length ? val : selectedTab);
        } else if (keyboardEvent.altKey && keyboardEvent.code === 'ArrowLeft') {
            setSelectedTab(selectedTab > 0 ? selectedTab - 1 : selectedTab);
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
        loadingFetch(ticketClient.update(ticket),
            () => {
                closeTicket(selectedTab, dispatch);
                openNewTicket();
                setSuccess(true);
                setTimeout(() => setSuccess(false), 1500);
                if (tabs.length > 1) {
                    let index = selectedTab;
                    setSelectedTab(index === 0 ? index + 1 : index - 1)
                    setTabs(prevState => {
                        const state = [...prevState];
                        state.splice(index, 1);
                        return state;
                    })
                }
            },
            setLoading,
            () => setSuccess(false))
    }

    return <div className={classes.root}>
        <AppBar position="static" color="default">
            <Tabs
                value={selectedTab}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
            >
                {tabs.map((item, index) =>
                    <Tab id={index}
                         key={index}
                         label={item.label}
                         style={{
                             fontSize: "2em",
                             fontWeight: "bold"
                         }}
                         {...a11yProps(index)}>
                    </Tab>
                )}
            </Tabs>
        </AppBar>
        <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={selectedTab}
            onChangeIndex={setSelectedTab}
        >
            {tabs.map((item, index) =>
                <TabPanel key={index} value={selectedTab} index={index} {...a11yProps(index)}>
                    <Grid container spacing={3}>
                        <Grid className={classes.firstGridPart} key={"left-side"} item md={6} sm={12}>
                            <Tools/>
                            <SaleTable ref={e => childRefs.current[0] = e} style={{maxHeight: "200px"}}
                                       ticketIndex={selectedTab}/>
                            <TicketSummary ticketIndex={selectedTab}/>
                        </Grid>
                        <Grid key={"right-side"} className={classes.secondGridPart} item md={6} sm={12}>
                            <ProductsList ref={e => childRefs.current[1] = e} ticketIndex={selectedTab}/>
                        </Grid>
                    </Grid>
                </TabPanel>
            )}
        </SwipeableViews>
        {tabs.map((tab, index) =>
            <Zoom
                key={index}
                in={selectedTab === index}
                timeout={transitionDuration}
                style={{
                    transitionDelay: `${selectedTab === index ? transitionDuration.exit : 0}ms`,
                }}
                unmountOnExit
            >
                <ProgressButton className={classes.fab}
                                size="large"
                                icon={<AddShoppingCartIcon style={{fontSize: "4em"}}/>}
                                disabled={(ticket ? ticket.ticketLines.length === 0 : true)}
                                onClick={(setLoading, setSuccess) => payButtonOnAction(setLoading, setSuccess)}/>
            </Zoom>)}
    </div>;
}

function tabReducer(state, action) {
    const dispatch = useDispatch();
    const tickets = useSelector(state => state.ticket);

    const Actions = {
        GOTO_TAB: 'GOTO_TAB',
        NEXT_TAB: 'NEXT_TAB',
        PREV_TAB: 'PREV_TAB',
        NEW_TAB: 'NEW_TAB',
        REMOVE_TAB: 'REMOVE_TAB'
    }

    switch (action.type) {
        case Actions.GOTO_TAB :
        {
            return {...state, selectedIndex: action.selectedIndex}
        }
        case Actions.NEXT_TAB :
        {
            return {...state, selectedIndex: (state.selectedIndex + 1) % state.tabs.length}
        }
        case Actions.PREV_TAB :
        {
            return {...state, selectedIndex: (state.selectedIndex - 1 + state.tabs.length) % state.tabs.length}
        }
        case Actions.NEW_TAB :
        {
            let tabs = Array.isArray(state.tabs) ? state.tabs : [];
            if (tabs.length === 10) {
                return state;
            }
            return newTab(tabs);
        }
        case Actions.REMOVE_TAB :
        {
            let tabs = Array.isArray(state.tabs) ? state.tabs : [];
            tabs.splice(state.selectedIndex, 1);
            closeTicket(state.selectedIndex, dispatch);
            if (tabs.length === 0) {
                return newTab(tabs);
            }
            return {...state, selectedIndex: (state.selectedIndex - 1 + state.tabs.length) % state.tabs.length }
        }
    }

    function newTab(tabs) {
        tabs = [...tabs, {label: formatMoney(0), ticket: tickets[tabs.length]}];
        return {...state, tabs, selectedIndex: tabs.length - 1};
    }
}
