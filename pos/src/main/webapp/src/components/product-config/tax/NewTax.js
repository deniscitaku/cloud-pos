import React from 'react';
import FormDialog from "../../common/FormDialog";
import {AxiosTaxClient, QueryKeys} from "../../../client/Client";
import TaxIcon from "../../icons/TaxIcon";
import ValidCheckBox from "../../common/ValidCheckBox";
import {emptyTax} from "../../../services/EmptyObjects";
import {useMutation, useQueryClient} from "react-query";

const taxService = new AxiosTaxClient();

export default function NewTax({refreshTable, isOpen, setOpen}) {
    console.log("Inside New tax!");

    const queryClient = useQueryClient();
    const {mutate: saveTax, error, loading, reset} = useMutation(x => taxService.create(x.data), {
        onSuccess: (data, variables) => {
            setOpen(false);
            variables.reset();
            refreshTable();
            if (queryClient.getQueryData(QueryKeys.TAXES)) {
                queryClient.setQueryData(QueryKeys.TAXES, old => [...old, data]);
            }
        }
    });

    const errors = error?.response?.data;
    const fields = [
        {
            title: 'Name', field: "name"
        },
        {
            title: 'Tax rate', field: "taxRate", type: 'number'
        },
        {
            title: 'Is default',
            field: "default",
            type: 'boolean',
            customElement: (tax, setTax) => <ValidCheckBox label="Is default?"
                                                           error={errors && errors.isDefault}
                                                           checkboxProps={{
                                                               onCheckChange: newVal => setTax({
                                                                   ...tax,
                                                                   default: newVal
                                                               })
                                                           }}/>
        }];

    function handleSubmit(event, tax, reset) {
        saveTax({data: tax, reset: reset});
    }

    function handleClose() {
        setOpen(false);
        reset();
    }

    return (
        <FormDialog
            open={isOpen}
            title="Taxes"
            onSubmit={handleSubmit}
            onClose={handleClose}
            fields={fields}
            errors={errors}
            loading={loading}
            icon={<TaxIcon/>}
            initialObject={emptyTax}
        />
    )
}