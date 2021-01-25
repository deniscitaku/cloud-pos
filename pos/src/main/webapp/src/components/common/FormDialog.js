import React, {useCallback, useEffect, useRef, useState} from "react";
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
import ValidTextField from "./ValidTextField";
import CircularProgress from "@material-ui/core/CircularProgress";
import AddCircleOutlineIcon from '@material-ui/icons/AddCircleOutline';
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import Box from "@material-ui/core/Box";
import Zoom from "@material-ui/core/Zoom";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Zoom ref={ref} {...props} />;
});

function FormDialog({
                        open, title, onSubmit, onClose, focusSubmit = false, fields, errors, loading, icon, customBody,
                        onValueChange = () => {
                        }, initialObject = {}, autoFocusIndex
                    }) {

    const object = useRef(initialObject);
    const setObject = obj => object.current = obj;
    const theme = useTheme();
    const classes = useStyles();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    console.log("Inside form dialog!");

    return (
        <Dialog open={open} onClose={onClose} fullScreen={fullScreen} TransitionComponent={Transition} aria-labelledby="form-dialog-title">
            <form>
                <DialogTitle id="form-dialog-title" style={{backgroundColor: theme.palette.background.default}}>
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <div style={{display: "flex", color: theme.palette.primary.main, marginRight: "0.5em"}}>
                            {icon}
                        </div>
                        {title}
                    </Box>
                </DialogTitle>
                <Divider style={{backgroundColor: theme.palette.primary.main}}/>
                <DialogContent style={{overflowY: "hidden", margin: '2em'}}>
                    {customBody ? (customBody) :
                        <Grid container className={classes.root} justify='center' spacing={4}>
                            {fields.map((item, index) => {
                                return (
                                    <Grid item key={index}>
                                        {item.customElement ?
                                            item.customElement(object, setObject)
                                            : <ValidTextField
                                                onKeyPress={(ev) => {
                                                    if (ev.key === 'Enter') {
                                                        ev.preventDefault();
                                                    }
                                                }}
                                                onChange={event => {
                                                    onValueChange(item.field, event.target.value, object.current, setObject);
                                                    setObject({
                                                        ...object.current,
                                                        [item.field]: event.target.value
                                                    });
                                                }
                                                }
                                                autoFocus={autoFocusIndex ? index === autoFocusIndex : index === 0}
                                                required={item.required}
                                                error={errors && errors[item.field]}
                                                id={item.field}
                                                defaultValue={object.current[item.field]}
                                                label={item.title}
                                                type={item.type ? item.type : 'text'}
                                            />
                                        }
                                    </Grid>
                                )
                            })
                            }
                        </Grid>}
                </DialogContent>
                <DialogActions>
                    <Button onClick={onClose}
                            color="secondary"
                            variant={"outlined"}
                            style={{margin: '1em'}}
                            startIcon={<CancelOutlinedIcon/>}>
                        Cancel
                    </Button>
                    <Button autoFocus={focusSubmit}
                            onClick={event => onSubmit(event, object.current, () => setObject(initialObject))}
                            color="primary"
                            variant={"outlined"}
                            style={{margin: '1em'}}
                            startIcon={loading ? <CircularProgress size={20}/> : <AddCircleOutlineIcon/>}
                            disabled={loading}>
                        Add
                    </Button>
                </DialogActions>
            </form>
        </Dialog>
    )
}

export default FormDialog;