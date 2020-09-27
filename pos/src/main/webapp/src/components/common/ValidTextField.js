import React from "react";
import TextField from "@material-ui/core/TextField";

export default function ValidTextField(props) {

    const {error, required = true} = props;
    const helperText = error ? Array.isArray(error) ? error[0].message : error.message : '';

    return (
        <TextField {...props} required={required} error={!!error} helperText={helperText}/>
    )
}