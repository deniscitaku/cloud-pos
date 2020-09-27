import React, {useEffect, useState} from "react";
import {fetch} from "../../services/fetch";
import AutocompleteDropdown from "../common/AutocompleteDropdown";
import FormDialog from "../common/FormDialog";
import ValidTextField from "../common/ValidTextField";
import {AxiosUomClient, UomPayload} from "../../client/Client";

const uomClient = new AxiosUomClient();
const emptyUom = new UomPayload({});

export default function UomDropdown(props) {
    const {error} = props;

    const [isOpen, setOpen] = useState(false);
    const {uom, setUom} = props
    const [uoms, setUoms] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetch(uomClient.findAll(), setUoms);
    }, [])

    function handleAutocompleteValueChange(event, newValue) {
        event.preventDefault();
        if (typeof newValue === 'string') {
            setOpen(true);
            setUom(({...emptyUom, name: newValue}))
        } else if (newValue && newValue.inputValue) {
            setOpen(true);
            setUom(({...emptyUom, name: newValue.inputValue}))
        } else if (!newValue) {
            setUom(emptyUom);
        } else {
            setUom(newValue);
        }
    }

    const handleClose = () => {
        setOpen(false);
        setUom(emptyUom);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(uomClient.create(uom), response => {
            setUoms(prevState => [...prevState, response]);
            setUom(response);
            setOpen(false);
        }, setErrors)
    }

    return (
        <>
            <AutocompleteDropdown
                label='Select uom'
                required
                error={error}
                variant='standard'
                width={200}
                items={uoms}
                value={uom}
                onChange={handleAutocompleteValueChange}
            />
            <FormDialog
                open={isOpen}
                title="Add uom"
                onSubmit={handleSubmit}
                onClose={handleClose}
                focusSubmit
                formElements={[
                    <ValidTextField
                        error={errors.smallerUnitName}
                        margin="dense"
                        id="smallerUnitName"
                        value={uom.smallerUnitName}
                        onChange={(event) => setUom({
                            ...uom,
                            smallerUnitName: event.target.value
                        })}
                        label="Smaller unit name"
                        type="text"
                    />,
                    <ValidTextField
                        error={errors.biggerUnitName}
                        margin="dense"
                        id="biggerUnitName"
                        value={uom.biggerUnitName}
                        onChange={(event) => setUom({
                            ...uom,
                            biggerUnitName: event.target.value
                        })}
                        label="Bigger unit name"
                        type="text"
                    />,
                    <ValidTextField
                        error={errors.convertValue}
                        margin="dense"
                        id="convertValue"
                        value={uom.convertValue}
                        onChange={(event) => setUom({
                            ...uom,
                            convertValue: event.target.value
                        })}
                        label="Convert value"
                        type="text"
                    />
                ]}/>
        </>
    )
}