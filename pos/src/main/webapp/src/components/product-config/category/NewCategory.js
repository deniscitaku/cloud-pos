import {AxiosCategoryClient} from "../../../client/Client";
import React from "react";
import FormDialog from "../../common/FormDialog";
import CategoryIcon from '@material-ui/icons/Category';
import {useSave} from "../../../hooks/useFetch";
import {emptyCategory} from "../../../services/EmptyObjects";

const categoryService = new AxiosCategoryClient();

export default function NewCategory({refreshTable, isOpen, setOpen}) {

    const [createCategory, {errors, loading}, setState] = useSave(x => categoryService.create(x));

    function handleSubmit(event, category, reset) {
        createCategory(category)
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
            title="Category"
            onSubmit={handleSubmit}
            onClose={handleClose}
            fields={[{title: 'Name', field: "name"}]}
            errors={errors}
            loading={loading}
            icon={<CategoryIcon/>}
            initialObject={emptyCategory}
        />
    )
}