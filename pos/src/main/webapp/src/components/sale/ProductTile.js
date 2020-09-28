import React from 'react';
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {GridListTile} from "@material-ui/core";
import GridListTileBar from "@material-ui/core/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import InfoIcon from '@material-ui/icons/Info';
import noImage from '../../static/noimage.png';
import {addTicketLineFromProduct} from "../../reducers/global/saleTabsReducer";
import {useDispatch} from "react-redux";
import Grow from "@material-ui/core/Grow";

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

const ProductTile = props => {
    const { index, product, ticketIndex } = props;
    const classes = useStyles();
    const dispatch = useDispatch();

    function createTicketLine() {
        addTicketLineFromProduct(ticketIndex, product, dispatch);
    }

    function handleInformationButton(event) {
        event.preventDefault();
        return undefined;
    }

    return (
        <Grow
            in={true}
            style={{ transformOrigin: '0 0 0'}}
              {...({timeout: index * 50})}
        >
            <GridListTile key={product.code} className={classes.productTile} onClick={createTicketLine}>
                <img src={product.image ? product.image : noImage} alt={product.name}/>
                <GridListTileBar
                    title={product.name}
                    subtitle={<span>{product.code}</span>}
                    actionIcon={
                        <IconButton aria-label={`info about ${product.name}`} onClick={e => handleInformationButton(e)}>
                            <InfoIcon/>
                        </IconButton>
                    }
                />
            </GridListTile>
        </Grow>
    )
}

export default ProductTile;