import React, {useCallback, useRef, useState} from 'react';
import {AxiosUomClient} from "../../../client/Client";
import NewUom from "./NewUom";
import ValidTableCell from "../../common/ValidTableCell";
import ValidTextField from "../../common/ValidTextField";
import Table from "../../common/Table";
import UomIcon from "../../icons/UomIcon";

const uomService = new AxiosUomClient();

export default function Uom() {
    console.log("Table rendered!");

    const tableRef = useRef();
    const errorsRef = useRef([]);
    const [open, setOpen] = useState(false);

    const openDialog = useCallback(() => setOpen(true), []);
    const uomIcon = useCallback(() => <UomIcon/>, []);
    const columns = useCallback(() => [
        {title: '#', field: 'tableData.id', editable: "never", width: "1%"},
        {title: 'Smaller unit name', field: "smallerUnitName", width: "30%", editComponent: (props) => ValidTableCell(props, errorsRef, ValidTextField)},
        {title: 'Bigger unit name', field: "biggerUnitName", width: "30%", editComponent: (props) => ValidTableCell(props, errorsRef, ValidTextField)},
        {title: 'Convert value', field: "convertValue", width: "20%", type: 'numeric', editComponent: (props) => ValidTableCell(props, errorsRef, ValidTextField)},
    ], []);

    function refreshTable() {
        tableRef.current && tableRef.current.onQueryChange();
    }

    return (
        <>
            <Table
                title="Uom"
                addNewLabel="Add UOM"
                addNewIcon={uomIcon}
                onAddNew={openDialog}
                service={uomService}
                columns={columns}
                tableRef={tableRef}
                errorsRef={errorsRef}
            />
            <NewUom isOpen={open} setOpen={setOpen} refreshTable={refreshTable} />
        </>
    );
}