import Dialog from "@material-ui/core/Dialog";
import React from "react";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogContentText from "@material-ui/core/DialogContentText";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import CancelOutlinedIcon from '@material-ui/icons/CancelOutlined';
import CircularProgress from "@material-ui/core/CircularProgress/CircularProgress";
import CheckCircleOutlineIcon from '@material-ui/icons/CheckCircleOutline';

function ConfirmationDialog({open, title, content, loading, handleClose, handleConfirmation}) {
    console.log("Inside Confirmation dialog!");
    return (
        <Dialog
            open={open}
            onClose={handleClose}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
        >
            <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
            <DialogContent>
                <DialogContentText id="alert-dialog-description">
                    {content}
                </DialogContentText>
            </DialogContent>
            <DialogActions>
                <Button onClick={handleClose}
                        color="secondary"
                        variant={"outlined"}
                        style={{margin: '1em'}}
                        startIcon={<CancelOutlinedIcon/>}>
                    No
                </Button>
                <Button onClick={handleConfirmation}
                        color="primary"
                        variant={"outlined"}
                        style={{margin: '1em'}}
                        startIcon={loading ? <CircularProgress size={20}/> : <CheckCircleOutlineIcon/>}
                        disabled={loading}>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>
    )
}

export default React.memo(ConfirmationDialog);