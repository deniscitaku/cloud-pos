import {AxiosSupplierClient} from "../../client/Client";
import React from "react";
import FormDialog from "../common/FormDialog";
import {useSave} from "../../hooks/useFetch";
import LocalShippingOutlinedIcon from '@material-ui/icons/LocalShippingOutlined';
import {emptySupplier} from "../../services/EmptyObjects";

const supplierService = new AxiosSupplierClient();
const fields = [
    {
        title: 'Name', field: "name"
    },
    {
        title: 'NUI', field: "nui", required: false
    },
    {
        title: 'Phone number', field: "phoneNumber", required: false
    },
    {
        title: 'Email', field: "email", required: false
    }
];

function NewSupplier({savedSupplier, onClose = () => {}, isOpen, setOpen, initialSupplierOnAdd = emptySupplier, autoFocusIndex}) {

    console.log("Inside NewSupplier!");

    const [saveSupplier, {errors, loading}, setState] = useSave(x => supplierService.create(x));

    function handleSubmit(event, supplier, reset) {
        saveSupplier(supplier).then(x => {
            setOpen(false);
            reset();
            savedSupplier(x);
        })
    }

    function handleClose() {
        setOpen(false);
        onClose();
        setState(x => ({...x, errors: {}}));
    }

    return (
        <FormDialog
            open={isOpen}
            title="Supplier"
            onSubmit={handleSubmit}
            onClose={handleClose}
            fields={fields}
            errors={errors}
            loading={loading}
            icon={<LocalShippingOutlinedIcon/>}
            initialObject={emptySupplier}
            initialObjectOnAdd={initialSupplierOnAdd}
            autoFocusIndex={autoFocusIndex}
        />
    )
}

export default React.memo(NewSupplier);