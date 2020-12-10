import Paper from "@material-ui/core/Paper";
import {useSelector} from "react-redux";
import React from "react";
import Typography from "@material-ui/core/Typography";
import {createStyles, makeStyles} from "@material-ui/core/styles";
import {formatMoney} from "../../services/utils";

const useStyles = makeStyles(theme =>
    createStyles({
        totalPaper: {
            marginTop: "auto",
            display: "flex",
            padding: "1em"
        },
        totalAmount: {
            marginLeft: "auto"
        }
    }),
);

export default function Summary({total}) {
    const classes = useStyles();

    return (
        <Paper className={classes.totalPaper} variant="outlined" square>
            <Typography variant="h4">
                Total:
            </Typography>
            <Typography variant="h4" className={classes.totalAmount}>
                {formatMoney(total)}
            </Typography>
        </Paper>
    )
}