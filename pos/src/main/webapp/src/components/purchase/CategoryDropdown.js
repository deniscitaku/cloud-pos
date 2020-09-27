import React, {useEffect, useState} from "react";
import {fetch} from "../../services/fetch";
import AutocompleteDropdown from "../common/AutocompleteDropdown";
import FormDialog from "../common/FormDialog";
import ValidTextField from "../common/ValidTextField";
import {AxiosCategoryClient, CategoryPayload} from "../../client/Client";

const categoryClient = new AxiosCategoryClient();
const emptyCategory = new CategoryPayload({
    name: ''
})

export default function CategoryDropdown(props) {
    const {error} = props;

    const [isOpen, setOpen] = useState(false);
    const {category, setCategory} = props
    const [categories, setCategories] = useState([]);
    const [errors, setErrors] = useState({});

    useEffect(() => {
        fetch(categoryClient.findAll(), setCategories);
    }, [])

    function handleAutocompleteValueChange(event, newValue) {
        event.preventDefault();
        if (typeof newValue === 'string') {
            setOpen(true);
            setCategory(({...emptyCategory, name: newValue}))
        } else if (newValue && newValue.inputValue) {
            setOpen(true);
            setCategory(({...emptyCategory, name: newValue.inputValue}))
        } else if (!newValue) {
            setCategory(emptyCategory);
        } else {
            setCategory(newValue);
        }
    }

    const handleClose = () => {
        setOpen(false);
        setCategory(emptyCategory);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        fetch(categoryClient.create(category), response => {
            setCategories(prevState => [...prevState, response]);
            setCategory(response);
            setOpen(false);
        }, setErrors)
    }

    return (
        <>
            <AutocompleteDropdown
                label='Select category'
                required
                error={error}
                variant='standard'
                width={200}
                items={categories}
                value={category}
                onChange={handleAutocompleteValueChange}
            />
            <FormDialog
                open={isOpen}
                title="Add category"
                onSubmit={handleSubmit}
                onClose={handleClose}
                focusSubmit
                formElements={[
                    <ValidTextField
                        error={errors.name}
                        margin="dense"
                        id="name"
                        value={category.name}
                        onChange={(event) => setCategory({
                            ...category,
                            name: event.target.value
                        })}
                        label="Name"
                        type="text"
                    />
                ]}/>
        </>
    )
}