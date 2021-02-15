import InventoryMovementView from "../InventoryMovementView";
import {MovementKind} from "../../../client/Client";
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import React from "react";

export default function WasteView() {
    return (
        <InventoryMovementView movementKind={MovementKind.WASTE} Icon={DeleteSweepIcon}/>
    );
}