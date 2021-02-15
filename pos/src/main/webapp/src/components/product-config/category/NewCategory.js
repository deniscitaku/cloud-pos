import {AxiosCategoryClient, QueryKeys} from "../../../client/Client";
import React from "react";
import FormDialog from "../../common/FormDialog";
import CategoryIcon from '@material-ui/icons/Category';
import {useSave} from "../../../hooks/useFetch";
import {emptyCategory} from "../../../services/EmptyObjects";
import {default as queryCache, useMutation, useQuery, useQueryClient} from "react-query";

const categoryService = new AxiosCategoryClient();

export default function NewCategory({refreshTable, isOpen, setOpen}) {

    const queryClient = useQueryClient();
    const {mutate: saveCategory, error, loading, reset} = useMutation(x => categoryService.create(x.data), {
        onSuccess: (data, variables) => {
            setOpen(false);
            variables.reset();
            refreshTable();
            if (queryClient.getQueryData(QueryKeys.CATEGORIES)) {
                queryClient.setQueryData(QueryKeys.CATEGORIES, old => [...old, data]);
            }
        }
    });

    function handleSubmit(event, category, reset) {
        saveCategory({data: category, reset: reset});
    }

    function handleClose() {
        setOpen(false);
        reset();
    }

    return (
        <FormDialog
            open={isOpen}
            title="Category"
            onSubmit={handleSubmit}
            onClose={handleClose}
            fields={[{title: 'Name', field: "name"}]}
            errors={error?.response?.data}
            loading={loading}
            Icon={CategoryIcon}
            initialObject={emptyCategory}
        />
    )
}