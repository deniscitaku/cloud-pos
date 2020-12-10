import React, {useState} from 'react';
import FormDialog from "../../common/FormDialog";
import {loadingFetch} from "../../../services/fetch";
import {AxiosTaxClient} from "../../../client/Client";
import TaxIcon from "../../icons/TaxIcon";
import ValidCheckBox from "../../common/ValidCheckBox";
import ValidTableCell from "../../common/ValidTableCell";
import ValidTextField from "../../common/ValidTextField";
import {emptyTax} from "../../../services/EmptyObjects";
import {useSave} from "../../../hooks/useFetch";

const taxService = new AxiosTaxClient();

export default function NewTax({refreshTable, isOpen, setOpen}) {
    console.log("Inside New tax!");

    const [createTax, {loading, errors}, setState] = useSave((x) => taxService.create(x));

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
        createTax(tax).then(() => {
            setOpen(false);
            reset();
            refreshTable();
        });
    }

    function handleClose() {
        setOpen(false);
        setState(x => ({...x, errors: {}}));
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