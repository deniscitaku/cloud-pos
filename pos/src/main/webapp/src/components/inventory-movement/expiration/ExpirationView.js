import InventoryMovementView from "../InventoryMovementView";
import {MovementKind} from "../../../client/Client";
import EventBusyIcon from '@material-ui/icons/EventBusy';
import React from "react";

export default function ExpirationView() {
    return (
        <InventoryMovementView movementKind={MovementKind.EXPIRATION} Icon={EventBusyIcon}/>
    );
}