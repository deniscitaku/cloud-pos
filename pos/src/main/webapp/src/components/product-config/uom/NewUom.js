import React from 'react';
import FormDialog from "../../common/FormDialog";
import {AxiosUomClient, QueryKeys} from "../../../client/Client";
import UomIcon from "../../icons/UomIcon";
import {emptyUom} from "../../../services/EmptyObjects";
import {useMutation, useQueryClient} from "react-query";

const uomService = new AxiosUomClient();

const fields = [
    {title: 'Smaller unit name', field: "smallerUnitName"},
    {title: 'Bigger unit name', field: "biggerUnitName"},
    {title: 'Convert value', field: "convertValue", type: 'number'}
];

export default function NewUom({refreshTable, isOpen, setOpen}) {

    const queryClient = useQueryClient();
    const {mutate: saveUom, error, loading, reset} = useMutation(x => uomService.create(x.data), {
        onSuccess: (data, variables) => {
            setOpen(false);
            variables.reset();
            refreshTable();
            if (queryClient.getQueryData(QueryKeys.UOM)) {
                queryClient.setQueryData(QueryKeys.UOM, old => [...old, data]);
            }
        }
    });

    function handleSubmit(event, uom, reset) {
        saveUom({data: uom, reset: reset});
    }

    function handleClose() {
        setOpen(false);
        reset();
    }

    return (
        <FormDialog
            open={isOpen}
            title="UOM"
            onSubmit={handleSubmit}
            onClose={handleClose}
            fields={fields}
            errors={error?.response?.data}
            loading={loading}
            icon={<UomIcon/>}
            initialObject={emptyUom}
        />
    )
}