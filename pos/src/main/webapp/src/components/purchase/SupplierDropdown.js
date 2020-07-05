import React, {useEffect, useState} from 'react';
import TextField from '@material-ui/core/TextField';
import Autocomplete, {createFilterOptions} from '@material-ui/lab/Autocomplete';
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import {AxiosSupplierClient, SupplierPayload} from "../../client/Client";
import {fetch} from "../../services/fetch";

const filter = createFilterOptions();
const emptySupplier = new SupplierPayload({
    name: '',
    nui: '',
    phoneNumber: '',
    email: ''
});
const supplierClient = new AxiosSupplierClient();
export default function SupplierDropdown() {
    const [value, setValue] = React.useState(emptySupplier);
    const [open, toggleOpen] = React.useState(false);
    const [dialogValue, setDialogValue] = React.useState(emptySupplier);
    const [suppliers, setSuppliers] = useState([]);

    useEffect(() => {
        fetch(supplierClient.findAll(), setSuppliers);
    }, [])

    const handleClose = () => {
        setDialogValue(emptySupplier);
        toggleOpen(false);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(supplierClient.create(dialogValue), response => {
            setValue(response);
            setSuppliers(prevState => [...prevState, response]);
        })
        handleClose();
    }

    function handleAutoCompleteValueChange(event, newValue) {
        if (typeof newValue === 'string') {
            // timeout to avoid instant validation of the dialog's form.
            setTimeout(() => {
                toggleOpen(true);
                let supplier = Object.assign({}, {...emptySupplier, name: newValue});
                setDialogValue(supplier);
            });
        } else if (newValue && newValue.inputValue) {
            toggleOpen(true);
            let supplier = Object.assign({}, {...emptySupplier, name: newValue.inputValue});
            setDialogValue(supplier);
        } else {
            setValue(newValue);
        }
    }

    return (
        <React.Fragment>
            <Autocomplete
                value={value}
                onChange={handleAutoCompleteValueChange}
                filterOptions={(options, params) => {
                    const filtered = filter(options, params);

                    if (params.inputValue !== '') {
                        filtered.push({
                            inputValue: params.inputValue,
                            name: `Add "${params.inputValue}"`,
                        });
                    }

                    return filtered;
                }}
                id="supplier-autocomplete"
                options={suppliers}
                getOptionLabel={(option) => {
                    // e.g value selected with enter, right from the input
                    if (typeof option === 'string') {
                        return option;
                    }
                    if (option.inputValue) {
                        return option.inputValue;
                    }
                    return option.name;
                }}
                selectOnFocus
                clearOnBlur
                clearOnEscape
                handleHomeEndKeys
                renderOption={(option) => option.name}
                style={{ width: 300 }}
                freeSolo
                renderInput={(params) => (
                    <TextField {...params} label="Select supplier" variant="outlined" />
                )}
            />
            <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
                <form onSubmit={handleSubmit}>
                    <DialogTitle id="form-dialog-title">Add new item</DialogTitle>
                    <DialogContent>
                        <TextField
                            autoFocus
                            margin="dense"
                            id="name"
                            value={dialogValue.name}
                            onChange={(event) => setDialogValue({ ...dialogValue, name: event.target.value })}
                            label="Name"
                            type="text"
                        />
                        <TextField
                            margin="dense"
                            id="name"
                            value={dialogValue.nui}
                            onChange={(event) => setDialogValue({ ...dialogValue, nui: event.target.value })}
                            label="Nui"
                            type="text"
                        />
                        <TextField
                            margin="dense"
                            id="name"
                            value={dialogValue.email}
                            onChange={(event) => setDialogValue({ ...dialogValue, email: event.target.value })}
                            label="Email"
                            type="text"
                        />
                        <TextField
                            margin="dense"
                            id="name"
                            value={dialogValue.phoneNumber}
                            onChange={(event) => setDialogValue({ ...dialogValue, phoneNumber: event.target.value })}
                            label="Phone number"
                            type="text"
                        />
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose} color="primary">
                            Cancel
                        </Button>
                        <Button type="submit" color="primary">
                            Add
                        </Button>
                    </DialogActions>
                </form>
            </Dialog>
        </React.Fragment>
    );
}