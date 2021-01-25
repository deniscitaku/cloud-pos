import {AxiosSupplierClient, QueryKeys} from "../../client/Client";
import React from "react";
import FormDialog from "../common/FormDialog";
import LocalShippingOutlinedIcon from '@material-ui/icons/LocalShippingOutlined';
import {emptySupplier} from "../../services/EmptyObjects";
import {useQueryClient, useMutation} from "react-query";

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

function NewSupplier({savedSupplier, onClose = () => {}, isOpen, setOpen, initialSupplier = emptySupplier, autoFocusIndex}) {

    console.log("Inside NewSupplier!");

    const queryClient = useQueryClient();
    const {mutate: saveSupplier, error, isLoading, reset} = useMutation(x => supplierService.create(x.data).then(x => x.data), {
        onSuccess: (data, vars) => {
            setOpen(false);
            vars.reset();
            savedSupplier(data);
            if (queryClient.getQueryData(QueryKeys.SUPPLIERS)) {
                queryClient.setQueryData(QueryKeys.SUPPLIERS, old => [...old, data]);
            }
        },
    });

    function handleSubmit(event, supplier, reset) {
        saveSupplier({data: supplier, reset: reset});
    }

    function handleClose() {
        setOpen(false);
        onClose();
        reset();
    }

    return (
        <FormDialog
            open={isOpen}
            title="Supplier"
            onSubmit={handleSubmit}
            onClose={handleClose}
            fields={fields}
            errors={error?.response?.data}
            loading={isLoading}
            icon={<LocalShippingOutlinedIcon/>}
            initialObject={initialSupplier}
            autoFocusIndex={autoFocusIndex}
        />
    )
}

export default NewSupplier;