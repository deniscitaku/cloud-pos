import React, {lazy, useCallback, useRef, useState} from 'react';
import {AxiosUomClient, QueryKeys} from "../../../client/Client";
import ValidTableCell from "../../common/ValidTableCell";
import ValidTextField from "../../common/ValidTextField";
import Table from "../../common/CustomTable";
import UomIcon from "../../icons/UomIcon";

const NewUom = lazy(() => import("./NewUom"));

const uomService = new AxiosUomClient();

export default function UomView() {
    console.log("Table rendered!");

    const [open, setOpen] = useState(false);

    const tableRef = useRef();
    const errorsRef = useRef([]);

    const openDialog = useCallback(() => setOpen(true), []);
    const columns = useCallback(() => [
        {title: '#', field: 'tableData.id', editable: "never", width: "1%"},
        {title: 'Smaller unit name', field: "smallerUnitName", width: "30%", editComponent: (props) => ValidTableCell(props, errorsRef, ValidTextField)},
        {title: 'Bigger unit name', field: "biggerUnitName", width: "30%", editComponent: (props) => ValidTableCell(props, errorsRef, ValidTextField)},
        {title: 'Convert value', field: "convertValue", width: "20%", type: 'numeric', editComponent: (props) => ValidTableCell(props, errorsRef, ValidTextField)},
    ], []);

    return (
        <>
            <Table
                title="Uom"
                addNewLabel="Add UOM"
                AddNewIcon={UomIcon}
                onAddNew={openDialog}
                service={uomService}
                columns={columns}
                tableRef={tableRef}
                errorsRef={errorsRef}
                queryKey={QueryKeys.UOM}
            />
            {open && <NewUom isOpen={open} setOpen={setOpen} refreshTable={() => tableRef.current && tableRef.current.onQueryChange()} />}
        </>
    );
}