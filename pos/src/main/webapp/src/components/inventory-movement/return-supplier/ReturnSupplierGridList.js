import GridListTile from "@material-ui/core/GridListTile";
import BasicTable from "../../common/BasicTable";
import {resolveField} from "../../../services/utils";
import GridListTileBar from "@material-ui/core/GridListTileBar/GridListTileBar";
import IconButton from "@material-ui/core/IconButton";
import CloseIcon from "@material-ui/core/SvgIcon/SvgIcon";
import GridList from "@material-ui/core/GridList";
import React from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Skeleton from "@material-ui/lab/Skeleton";
import Box from "@material-ui/core/Box";
import {AxiosInventoryMovementClient} from "../../../client/Client";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        overflow: 'hidden',
    },
    tile: {
        borderStyle: "solid",
        borderRadius: "5px",
        borderWidth: "1px",
        borderColor: theme.palette.text.primary,
        cursor: "pointer",
        transition: 'transform .2s',
        paddingLeft: '0.6em',
        '&:hover': {
            borderWidth: "2px",
            borderColor: theme.palette.primary.main,
            transform: 'scale(1.03)'
        }
    },
    disabledTile: {
        opacity: 0.6,
        borderStyle: "solid",
        borderRadius: "5px",
        borderWidth: "1px",
        transition: 'transform .2s',
        paddingLeft: '0.6em',
    },
    titleBar: {
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    }
}));

const lineColumns = [
    {title: 'Code', field: "product.code"},
    {title: 'Name', field: "product.name"},
    {title: 'Price buy', field: "priceBuy"},
    {title: 'Qty', field: "quantity"},
];

export default function ReturnSupplierGridList({data, loading, onPurchaseClick}) {

    const classes = useStyles();

    const finalData = loading ? new Array(6).fill(undefined) : data || [];

    return (
        <GridList cellHeight={250} spacing={1} className={classes.root}>
            {finalData.map((x, i) => x ?
                (<GridListTile key={i} classes={{tile: classes.tile}}
                               style={{minWidth: '25em', maxWidth: '30em', padding: "1em"}}
                               onClick={() => onPurchaseClick(x)}>
                    <BasicTable data={resolveField(x, 'inventoryMovementLines', [])} columns={lineColumns}/>
                    <GridListTileBar
                        title={x.supplier?.name}
                        titlePosition="top"
                        className={classes.titleBar}
                    />
                </GridListTile>)
                :
                (<Box key={i} maxWidth={"30em"} maxHeight={"26em"} margin={2}>
                    <Skeleton width="60%"/>
                    <Skeleton />
                    <Skeleton variant="rect" height={"10em"}/>
                </Box>)
            )}
        </GridList>
    );
}