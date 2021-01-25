import React from 'react';
import Box from "@material-ui/core/Box";
import SupplierDropdown from "./SupplierDropdown";
import ProductDropdown from "./ProductDropdown";
import {Divider} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import GradientButton from "../common/GradientButton";
import Button from "@material-ui/core/Button";
import ShoppingBasketIcon from "@material-ui/core/SvgIcon/SvgIcon";
import {setInventoryMovement} from "../../reducers/global/inventoryMovementReducer";
import OpenExistingDialog from "./open-existing/OpenExistingDialog";
import Badge from "@material-ui/core/Badge";

export default function PurchaseHeader({searchProductRef, sequenceNumber, setTableLoading, openedInventoryMovementSize, setOpen}) {
    console.log("Inside PurchaseHeader!");

    return (
        <>
            <Box display="flex" flexWrap='wrap' mx='auto'>
                <Box m='2em'><TextField variant={"outlined"}
                                        label={"Sequence number"}
                                        value={sequenceNumber}
                                        InputProps={{readOnly: true}}/></Box>
                <Box m='2em'><SupplierDropdown/></Box>
                <Box m='2em'><ProductDropdown searchProductRef={searchProductRef}
                                              setTableLoading={setTableLoading}/></Box>
                <Box m='2em' style={{marginLeft: "auto"}}>
                    <Badge color="secondary" badgeContent={openedInventoryMovementSize}>
                        <GradientButton onClick={() => setOpen(true)}>Opened purchases</GradientButton>
                    </Badge>
                </Box>
            </Box>
            <Divider/>
        </>
    );
};