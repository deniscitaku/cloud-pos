import React, {useEffect} from 'react';
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {GridListTile} from "@material-ui/core";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from '@material-ui/icons/Info';
import noImage from '../../static/noimage.png';
import {useDispatch} from "react-redux";
import Grow from "@material-ui/core/Grow";
import {Actions} from "../../reducers/global/saleTabsReducer";
import {AxiosTicketClient, AxiosTicketLineClient, TicketLinePayload} from "../../client/Client";
import {fetch} from "../../services/fetch";
import {useSaveWithCallback} from "../../hooks/useFetch";
import store from "../../store";
import {useMutation} from "react-query";

const useStyles = makeStyles(theme =>
    createStyles({
        productTile: {
            cursor: 'pointer',
            width: '14em',
            height: "9em",
            margin: ".5em",
            borderRadius: '5px',
            backgroundColor: "lightgrey",
            '& > :hover': {
                border: `1px solid ${theme.palette.primary.main}`,
                borderRadius: '5px',
                boxShadow: `0px 0px 2px 2px ${theme.palette.primary.main}`,
            },
            '& img': {
                width: '100%',
                height: '100%',
                padding: '5px'
            },
        }
    }),
);

const ticketService = new AxiosTicketClient();

function addTicketLinePromise(ticketLine) {
    const tabs = store.getState().tabs;
    const ticketId = tabs.tickets[tabs.selectedIndex].id;

    return ticketService.addTicketLine(ticketId, ticketLine).then(x => x.data)
}

export default function ProductTile({index, product, setTableLoading}) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const {mutate: addTicketLine, isLoading: addTicketLineLoading} = useMutation(addTicketLinePromise, {
        onSuccess: x => dispatch({type: Actions.UPDATE_SELECTED_TICKET, payload: x})
    });

    useEffect(() => setTableLoading(addTicketLineLoading), [addTicketLineLoading]);

    function handleInformationButton(event) {
        event.preventDefault();
        return undefined;
    }

    function handleProductClick() {
        addTicketLine(new TicketLinePayload({
            product: product,
            quantity: 1,
        }));
    }

    return (
        <Grow
            in={true}
            style={{transformOrigin: '0 0 0'}}
            {...({timeout: index * 50})}
        >
            <GridListTile key={product.code} className={classes.productTile} onClick={handleProductClick}>
                <img src={product.image ? product.image : noImage} alt={product.name}/>
                <GridListTileBar
                    title={product.name}
                    subtitle={<span>{product.code}</span>}
                    actionIcon={
                        <IconButton aria-label={`info about ${product.name}`} onClick={handleInformationButton}>
                            <InfoIcon/>
                        </IconButton>
                    }
                />
            </GridListTile>
        </Grow>
    )
}