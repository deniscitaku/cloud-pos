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
import TicketSummary from "./TicketSummary";
import {fetch, loadingFetch} from "../../services/fetch";
import ProgressButton from "../common/ProgressButton";
import AddShoppingCartIcon from '@material-ui/icons/AddShoppingCart';
import TabPanel from "./TabPanel";
import {Actions} from "../../reducers/global/saleTabsReducer";
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
    const {selectedIndex, tickets} = useSelector((state) => state.tabs);
    const {selectedTicket} = tickets[selectedIndex];

    useEffect(() => {
        window.addEventListener('keydown', downHandler);
        return () => {
            window.removeEventListener('keydown', downHandler);
        };
    });

    useEffect(() => {
        fetch(ticketClient.openTicket("5e9d89599d4e0c79447630f4"),
                response => dispatch({type: Actions.SET_SELECTED_TICKET, ticket: response}))
    }, []);

    function downHandler(keyboardEvent) {
        console.log("Key pressed: ", keyboardEvent)
        if (keyboardEvent.altKey && keyboardEvent.code === 'KeyT') {
            fetch(ticketClient.openTicket("5e9d89599d4e0c79447630f4"),
                response => dispatch({type: Actions.NEW_TICKET, ticket: response}));
        } else if (keyboardEvent.altKey && keyboardEvent.code === 'KeyW') {
            dispatch({type: Actions.REMOVE_SELECTED_TICKET})
        } else if (keyboardEvent.altKey && keyboardEvent.code === 'ArrowRight') {
            dispatch({type: Actions.NEW_TICKET})
        } else if (keyboardEvent.altKey && keyboardEvent.code === 'ArrowLeft') {
            dispatch({type: Actions.PREV_TICKET})
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
        loadingFetch(ticketClient.update(selectedTicket),
            () => {
                if (tickets.length === 1) {
                    fetch(ticketClient.openTicket("5e9d89599d4e0c79447630f4"), response => {
                        dispatch({type: Actions.SET_SELECTED_TICKET, ticket: response});
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
            <Tabs
                value={selectedIndex}
                indicatorColor="primary"
                textColor="primary"
                variant="fullWidth"
            >
                {tickets.map((item, index) =>
                    <Tab id={index}
                         key={index}
                         label={formatMoney(item.totalAmount)}
                         style={{
                             fontSize: "2em",
                             fontWeight: "bold"
                         }}
                         onClick={() => dispatch({type: Actions.GOTO_TICKET, selectedIndex: index})}
                         {...a11yProps(index)}>
                    </Tab>
                )}
            </Tabs>
        </AppBar>
        <SwipeableViews
            axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
            index={selectedIndex}
            onChangeIndex={(index => dispatch({type: Actions.GOTO_TICKET, selectedIndex: index}))}
        >
            {tickets.map((item, index) =>
                <TabPanel key={index} value={selectedIndex} index={index} {...a11yProps(index)}>
                    <Grid container spacing={3}>
                        <Grid className={classes.firstGridPart} key={"left-side"} item md={6} sm={12}>
                            <Tools/>
                            <SaleTable ref={e => childRefs.current[0] = e} style={{maxHeight: "200px"}}
                                       ticketIndex={selectedIndex}/>
                            <TicketSummary ticketIndex={selectedIndex}/>
                        </Grid>
                        <Grid key={"right-side"} className={classes.secondGridPart} item md={6} sm={12}>
                            <ProductsList ref={e => childRefs.current[1] = e} ticketIndex={selectedIndex}/>
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
                <ProgressButton className={classes.fab}
                                size="large"
                                icon={<AddShoppingCartIcon style={{fontSize: "4em"}}/>}
                                disabled={(selectedTicket.totalAmount === 0)}
                                onClick={(setLoading, setSuccess) => payButtonOnAction(setLoading, setSuccess)}/>
            </Zoom>)}
    </div>;
}
