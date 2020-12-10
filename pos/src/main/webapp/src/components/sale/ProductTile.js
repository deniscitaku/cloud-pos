import React from 'react';
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {GridListTile} from "@material-ui/core";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from '@material-ui/icons/Info';
import noImage from '../../static/noimage.png';
import {useDispatch} from "react-redux";
import Grow from "@material-ui/core/Grow";
import {Actions} from "../../reducers/global/saleTabsReducer";
import {AxiosTicketLineClient, TicketLinePayload} from "../../client/Client";
import {fetch} from "../../services/fetch";

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

export default function ProductTile({ index, product, ticketLines}) {
    const classes = useStyles();
    const dispatch = useDispatch();
    const ticketLineClient = new AxiosTicketLineClient();

    function handleInformationButton(event) {
        event.preventDefault();
        return undefined;
    }

    function handleProductClick(event) {
        let ticketLine = new TicketLinePayload({
            lineNumber: ticketLines ? ticketLines.length + 1 : 1,
            product: product,
            quantity: 1,
        });
        console.log("TicketLine: ", ticketLine);
        fetch(ticketLineClient.create(ticketLine), ticketLine => dispatch({type: Actions.NEW_TICKET_LINE, payload: ticketLine}));
    }

    return (
        <Grow
            in={true}
            style={{ transformOrigin: '0 0 0'}}
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