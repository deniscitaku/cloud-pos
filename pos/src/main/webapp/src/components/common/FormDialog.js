import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Grid from "@material-ui/core/Grid";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import Dialog from "@material-ui/core/Dialog";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import useTheme from "@material-ui/core/styles/useTheme";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Divider from "@material-ui/core/Divider";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    },
}));

export default function FormDialog(props) {

    const {open, title, onSubmit, onClose, focusSubmit = false, formElements} = props;

    const theme = useTheme();
    const classes = useStyles();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Dialog open={open} onClose={onClose} fullScreen={fullScreen} aria-labelledby="form-dialog-title">
            <form>
                <DialogTitle id="form-dialog-title">{title}</DialogTitle>
                <Divider/>
                <DialogContent style={{overflowY: "hidden"}}>
                    <Grid container className={classes.root} justify='center' spacing={3}>
                        {formElements.map((item, index) => (
                            <Grid item key={index}>
                                {item}
                            </Grid>
                        ))
                        }
                    </Grid>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose} color="secondary" variant={"outlined"} style={{margin: '1em'}}>
                        Cancel
                    </Button>
                    <Button autoFocus={focusSubmit} onClick={onSubmit} color="primary" variant={"contained"} style={{margin: '1em'}}>
                        Add
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}