import {AxiosCustomerClient, QueryKeys} from "../../client/Client";
import React from "react";
import FormDialog from "../common/FormDialog";
import PeopleIcon from '@material-ui/icons/People';
import {emptyCustomer} from "../../services/EmptyObjects";
import {useMutation, useQueryClient} from "react-query";

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
    console.log("Inside new customer");

    const queryClient = useQueryClient();
    const {mutate: saveCustomer, error, isLoading, reset} = useMutation(x => customerService.create(x.data).then(x => x.data), {
        onSuccess: (data, vars) => {
            setOpen(false);
            vars.reset();
            refreshTable();
            if (queryClient.getQueryData(QueryKeys.CUSTOMERS)) {
                queryClient.setQueryData(QueryKeys.CUSTOMERS, old => [...old, data]);
            }
        },
    });

    function handleSubmit(evt, customer, reset) {
        saveCustomer({data: customer, reset: reset});
    }

    function handleClose() {
        setOpen(false);
        reset();
    }

    return (
        <FormDialog
            title="Customer"
            open={isOpen}
            onSubmit={handleSubmit}
            onClose={handleClose}
            fields={fields}
            errors={error?.response?.data}
            loading={isLoading}
            Icon={PeopleIcon}
            initialObject={emptyCustomer}
        />
    )
}