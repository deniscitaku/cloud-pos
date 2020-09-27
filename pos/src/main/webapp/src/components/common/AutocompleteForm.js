import React, {useEffect, useState} from "react";
import {fetch} from "../../services/fetch";
import AutocompleteDropdown from "./AutocompleteDropdown";
import FormDialog from "./FormDialog";

export default function AutocompleteForm(props) {

    const {
        label,
        icon,
        variant,
        dialogTitle,
        required = true,
        error,
        width,
        emptyValue = {},
        onValueChange = (x) => {},
        preDialogOpen = (x) => Promise.resolve(false),
        focusFieldAfterDialogOpen,
        focusSubmit = false,
        findAll,
        create,
        formElements
    } = props

    const [value, setValue] = useState(emptyValue);
    const [isOpen, setOpen] = useState(false);
    const [object, setObject] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetch(findAll(), setObject, setErrors);
    }, [])

    function handleAutocompleteValueChange(event, newValue) {
        event.preventDefault();
        if (typeof newValue === 'string') {
            preDialogOpen(newValue)
                .then(x => {
                    if (x) {
                        return handleValueChange(x);
                    }
                    setOpen(true);
                    setValueToObject(newValue);
                })
        } else if (newValue && newValue.inputValue) {
            setOpen(true);
            setValueToObject(newValue.inputValue)
        } else if (!newValue) {
            setValue(emptyValue);
        } else {
            handleValueChange(newValue);
        }
    }

    const handleValueChange = (value) => {
        onValueChange(value);
        setValue(emptyValue);
    }

    const setValueToObject = (newValue) => {
        let obj = Object.assign({}, emptyValue);
        obj[focusFieldAfterDialogOpen] = newValue;
        setValue(obj);
    }

    const handleClose = () => {
        setOpen(false);
        setValue(emptyValue);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(create(value), response => {
            setObject(prevState => [...prevState, response]);
            handleValueChange(response);
            setOpen(false);
        }, setErrors)
    }

    return (
        <>
            <AutocompleteDropdown
                label={label}
                variant={variant}
                icon={icon}
                required={required}
                error={error}
                width={width}
                items={object}
                value={value}
                onChange={handleAutocompleteValueChange}
            />
            <FormDialog
                open={isOpen}
                title={dialogTitle}
                onSubmit={handleSubmit}
                onClose={handleClose}
                focusSubmit={focusSubmit}
                formElements={formElements(value, setValue, errors)}/>
        </>
    )
}