import AutocompleteDropdown from "../common/AutocompleteDropdown";
import React, {useEffect, useState} from "react";
import {AxiosTaxClient, TaxPayload} from "../../client/Client";
import {fetch} from "../../services/fetch";
import FormDialog from "../common/FormDialog";
import ValidTextField from "../common/ValidTextField";

const taxClient = new AxiosTaxClient();
const emptyTax = new TaxPayload({
    name: '',
    taxRate: ''
})

export default function TaxDropdown(props) {

    const {error} = props;

    const [isOpen, setOpen] = useState(false);
    const {tax, setTax} = props
    const [taxes, setTaxes] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetch(taxClient.findAll(), setTaxes);
    }, [])

    function handleAutocompleteValueChange(event, newValue) {
        event.preventDefault();
        if (typeof newValue === 'string') {
            setOpen(true);
            setTax(({...emptyTax, name: newValue}))
        } else if (newValue && newValue.inputValue) {
            setOpen(true);
            setTax(({...emptyTax, name: newValue.inputValue}))
        } else if (!newValue) {
            setTax(emptyTax);
        } else {
            setTax(newValue);
        }
    }

    const handleClose = () => {
        setOpen(false);
        setTax(emptyTax);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(taxClient.create(tax), response => {
            setTaxes(prevState => [...prevState, response]);
            setTax(response);
            setOpen(false);
        }, setErrors)
    }

    return (
        <>
            <AutocompleteDropdown
                error={error}
                label='Select tax'
                variant='standard'
                required
                width={200}
                items={taxes}
                value={tax}
                onChange={handleAutocompleteValueChange}
            />
            <FormDialog
                open={isOpen}
                title="Add tax"
                onSubmit={handleSubmit}
                onClose={handleClose}
                formElements={[
                    <ValidTextField
                        error={errors.name}
                        margin="dense"
                        id="name"
                        value={tax?.name}
                        onChange={(event) => setTax({
                            ...tax,
                            name: event.target.value
                        })}
                        label="Name"
                        type="text"
                    />,
                    <ValidTextField
                        autoFocus
                        error={errors.taxRate}
                        margin="dense"
                        id="taxRate"
                        value={tax?.taxRate}
                        onChange={(event) => setTax({
                            ...tax,
                            taxRate: event.target.value
                        })}
                        label="Tax rate"
                        type="text"
                    />
                ]}/>
        </>
    )
}