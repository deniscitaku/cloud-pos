import React from "react";
import InventoryMovementView from "../InventoryMovementView";
import {MovementKind} from "../../../client/Client";
import EqualizerIcon from '@material-ui/icons/Equalizer';

export default function RegistrationView() {
    return (
        <InventoryMovementView movementKind={MovementKind.REGISTRATION} Icon={EqualizerIcon}/>
    );
}