import {AxiosCustomerClient} from "../../client/Client";
import React from "react";
import FormDialog from "../common/FormDialog";
import {useSave} from "../../hooks/useFetch";
import PeopleIcon from '@material-ui/icons/People';
import {emptyCustomer} from "../../services/EmptyObjects";

const customerService = new AxiosCustomerClient();
const fields = [
    {
        title: 'Name', field: "name"
    },
    {
        title: 'Phone number', field: "phoneNumber", required: false
    },
    {
        title: 'Email', field: "email", required: false
    },
    {
        title: 'Max debt', field: "maxDebt", type: "number", required: false
    },
    {
        title: 'Current debt', field: "currentDebt", editable: "never", type: "number", required: false
    },
    {
        title: 'Discount', field: "discount", type: "number", required: false
    }
];

export default function NewCustomer({refreshTable, isOpen, setOpen}) {

    const [saveCustomer, {errors, loading}, setState] = useSave(x => customerService.create(x));

    console.log("Inside new customer");

    function handleSubmit(evt, customer, reset) {
        saveCustomer(customer).then(() => {
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
            title="Customer"
            open={isOpen}
            onSubmit={handleSubmit}
            onClose={handleClose}
            fields={fields}
            errors={errors}
            loading={loading}
            icon={<PeopleIcon/>}
            initialObject={emptyCustomer}
        />
    )
}