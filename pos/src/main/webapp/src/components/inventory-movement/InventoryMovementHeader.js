import React, {useContext} from 'react';
import Box from "@material-ui/core/Box/index";
import SupplierDropdown from "./purchase/SupplierDropdown";
import ProductDropdown from "./ProductDropdown";
import {Divider} from "@material-ui/core/index";
import TextField from "@material-ui/core/TextField/index";
import {MovementKind} from "../../client/Client";
import GradientButton from "../common/GradientButton";
import ReturnSupplierContext from "./return-supplier/ReturnSupplierContext";

export default function InventoryMovementHeader({movementKind, searchProductRef, sequenceNumber, setTableLoading}) {
    console.log("Inside InventoryMovementHeader!");

    const returnSupplierContext = useContext(ReturnSupplierContext);

    return (
        <>
            <Box display="flex" flexWrap='wrap' mx='auto'>
                <Box m='2em'><TextField variant={"outlined"}
                                        label={"Sequence number"}
                                        value={sequenceNumber}
                                        InputProps={{readOnly: true}}/>
                </Box>
                {(movementKind === MovementKind.PURCHASE || movementKind === MovementKind.RETURN_SUPPLIER) &&
                <Box m='2em'>
                    <SupplierDropdown movementKind={movementKind} searchProductRef={searchProductRef}/>
                </Box>}
                <Box m='2em'><ProductDropdown movementKind={movementKind}
                                              searchProductRef={searchProductRef}
                                              setTableLoading={setTableLoading}/>
                </Box>
                {movementKind === MovementKind.RETURN_SUPPLIER && <Box m='2em' style={{marginLeft: "auto"}}>
                    <GradientButton onClick={() => returnSupplierContext.backToSearch()}>Back to search</GradientButton>
                </Box>}
            </Box>
            <Divider/>
        </>
    );
};