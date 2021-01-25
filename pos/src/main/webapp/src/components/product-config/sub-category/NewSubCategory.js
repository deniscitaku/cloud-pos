import {AxiosCategoryClient, AxiosSubCategoryClient, QueryKeys} from "../../../client/Client";
import React from "react";
import FormDialog from "../../common/FormDialog";
import AutocompleteDropdown from "../../common/AutocompleteDropdown";
import SubCategoryIcon from "../../icons/SubCategoryIcon";
import {emptySubCategory} from "../../../services/EmptyObjects";
import {useMutation, useQuery, useQueryClient} from "react-query";

const subCategoryService = new AxiosSubCategoryClient();

export default function NewSubCategory({refreshTable, isOpen, setOpen}) {
    console.log("Inside NewSubCategory!");

    const queryClient = useQueryClient();
    const {data: categories} = useQuery(QueryKeys.CATEGORIES);
    const {mutate: saveSubCategory, error, loading, reset} = useMutation(x => subCategoryService.create(x.data), {
        onSuccess: (data, variables) => {
            setOpen(false);
            variables.reset();
            refreshTable();
            if (queryClient.getQueryData(QueryKeys.SUB_CATEGORIES)) {
                queryClient.setQueryData(QueryKeys.SUB_CATEGORIES, old => [...old, data]);
            }
        }
    });
    const errors = error?.response?.data;

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
            setSubCategory({...subCategory.current, category: null});
        } else {
            setSubCategory({...subCategory.current, category: newValue});
        }
    }

    function handleSubmit(event, subCategory, reset) {
        saveSubCategory({data: subCategory, reset: reset})
    }

    function handleClose() {
        setOpen(false);
        reset();
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