import InventoryMovementView from "../InventoryMovementView";
import React from "react";
import {MovementKind} from "../../../client/Client";
import {ShoppingBasket} from "@material-ui/icons";

export default function PurchaseView() {

    return (
        <InventoryMovementView movementKind={MovementKind.PURCHASE} Icon={ShoppingBasket}/>
    );
}