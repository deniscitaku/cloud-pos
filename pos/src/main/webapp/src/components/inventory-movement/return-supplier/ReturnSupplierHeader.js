import Box from "@material-ui/core/Box";
import {Divider} from "@material-ui/core";
import React, {useCallback} from "react";
import LocalShippingOutlinedIcon from '@material-ui/icons/LocalShippingOutlined';
import AutocompleteDropdown from "../../common/AutocompleteDropdown";
import {useQuery} from "react-query";
import {QueryKeys} from "../../../client/Client";
import TextField from "@material-ui/core/TextField";

export default function ReturnSupplierHeader({setSupplierId, fromDate, setFromDate, toDate, setToDate}) {

    const {data: suppliers, isLoading} = useQuery(QueryKeys.SUPPLIERS);

    const handleChange = useCallback((event, newValue) => {
        event.preventDefault();
        if (newValue) {
            setSupplierId(newValue.id);
        } else {
            setSupplierId(null);
        }
    }, []);

    return (
        <>
            <Box display="flex" flexWrap='wrap' mx='auto'>
                <Box m='2em'>
                    <AutocompleteDropdown
                        label="Supplier"
                        variant="outlined"
                        Icon={LocalShippingOutlinedIcon}
                        required
                        items={suppliers}
                        isLoading={isLoading}
                        minWidth={250}
                        props={{
                            onChange: handleChange,
                        }}
                    />
                </Box>
                <Box m='2em'>
                    <TextField
                        id="fromDate"
                        label="From date"
                        type="date"
                        defaultValue={fromDate}
                        onChange={x => setFromDate(x.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Box>
                <Box m='2em'>
                    <TextField
                        id="toDate"
                        label="To date"
                        type="date"
                        defaultValue={toDate}
                        onChange={x => setToDate(x.target.value)}
                        InputLabelProps={{
                            shrink: true,
                        }}
                    />
                </Box>
            </Box>
            <Divider/>
        </>
    );
}