import React from 'react';
import FormDialog from "../../common/FormDialog";
import {AxiosUomClient} from "../../../client/Client";
import UomIcon from "../../icons/UomIcon";
import {useSave} from "../../../hooks/useFetch";
import {emptyUom} from "../../../services/EmptyObjects";

const uomService = new AxiosUomClient();

const fields = [
    {title: 'Smaller unit name', field: "smallerUnitName"},
    {title: 'Bigger unit name', field: "biggerUnitName"},
    {title: 'Convert value', field: "convertValue", type: 'number'}
];

export default function NewUom({refreshTable, isOpen, setOpen}) {

    const [createUom, {errors, loading}, setState] = useSave(x => uomService.create(x))

    function handleSubmit(event, uom, reset) {
        createUom(uom)
            .then(() => {
                handleClose();
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
            title="UOM"
            onSubmit={handleSubmit}
            onClose={handleClose}
            fields={fields}
            errors={errors}
            loading={loading}
            icon={<UomIcon/>}
            initialObject={emptyUom}
        />
    )
}