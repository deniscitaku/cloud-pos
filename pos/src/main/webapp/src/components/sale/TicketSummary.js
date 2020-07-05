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

const TicketSummary = ({ticketIndex}) => {
    const classes = useStyles();
    const ticket = useSelector((state) => state.ticket)[ticketIndex];

    return (
        <Paper className={classes.totalPaper} variant="outlined" square>
            <Typography variant="h3">
                Total:
            </Typography>
            <Typography variant="h3" className={classes.totalAmount}>
                {formatMoney(ticket ? ticket.totalAmount : 0)}
            </Typography>
        </Paper>
    )
}

export default TicketSummary;