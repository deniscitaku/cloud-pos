import React from 'react';
import Box from "@material-ui/core/Box";
import SupplierDropdown from "./SupplierDropdown";
import ProductDropdown from "./ProductDropdown";
import {Divider} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";

const PurchaseHeader = () => {

    return (
        <>
            <Box display="flex" flexWrap='wrap' mx='auto'>
                <Box m='2em'><TextField variant={"outlined"}
                                        label={"Sequence number"}
                                        value={"123"}
                                        InputProps={{readOnly: true}}/></Box>
                <Box m='2em'><SupplierDropdown/></Box>
                <Box m='2em'><ProductDropdown/></Box>
            </Box>
            <Divider/>
        </>
    );
}

export default PurchaseHeader;