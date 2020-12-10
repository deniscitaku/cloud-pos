import {AxiosSubCategoryClient} from "../../../client/Client";
import React from "react";
import FormDialog from "../../common/FormDialog";
import AutocompleteDropdown from "../../common/AutocompleteDropdown";
import SubCategoryIcon from "../../icons/SubCategoryIcon";
import {useSave} from "../../../hooks/useFetch";
import {emptySubCategory} from "../../../services/EmptyObjects";

const subCategoryService = new AxiosSubCategoryClient();

export default function NewSubCategory({refreshTable, isOpen, setOpen, categories}) {

    const [saveSubCategory, {errors, loading}, setState] = useSave(x => subCategoryService.create(x));

    const fields = [
        {
            title: 'Name',
            field: "name",
        },
        {
            title: 'Category',
            field: 'category',
            customElement: (subCategory, setSubCategory) => <AutocompleteDropdown
                props={{
                    value: subCategory.category,
                    onChange: (event, newValue) => handleCategoryChange(event, newValue, subCategory, setSubCategory)
                }}
                label={'Category'}
                required
                error={errors && errors['category']}
                variant="standard"
                items={categories}/>
        }
    ];

    function handleCategoryChange(event, newValue, subCategory, setSubCategory) {
        event.preventDefault();
        if (newValue && newValue.inputValue) {
            setSubCategory({...subCategory, category: null});
        } else {
            setSubCategory({...subCategory, category: newValue});
        }
    }

    function handleSubmit(event, subCategory, reset) {
        saveSubCategory(subCategory)
            .then(() => {
                setOpen(false);
                reset();
                refreshTable();
            })
    }

    function handleClose() {
        setOpen(false);
        setState(x => ({...x, errors: {}}));
    }

    return (
        <FormDialog
            open={isOpen}
            title="Add Sub-Category"
            onSubmit={handleSubmit}
            onClose={handleClose}
            fields={fields}
            errors={errors}
            loading={loading}
            icon={<SubCategoryIcon/>}
            initialObject={emptySubCategory}
        />
    )
}