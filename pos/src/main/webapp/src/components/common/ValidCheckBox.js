import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import React, {useState} from "react";
import FormHelperText from "@material-ui/core/FormHelperText";
import useTheme from "@material-ui/core/styles/useTheme";

export default function ValidCheckBox({label, error, checkboxProps = {}}) {
    const [checked, setChecked] = useState(checkboxProps.checked !== undefined && checkboxProps.checked);
    const helperText = error ? Array.isArray(error) ? error[0].message : error.message : '';
    const theme = useTheme();

    const handleChange = (event) => {
        if (checkboxProps.onCheckChange) {
            checkboxProps.onCheckChange(event.target.checked)
        }
        setChecked(event.target.checked);
    };

    return (
        <>
            <FormControlLabel
                control={<Checkbox color="primary" checked={checked} onChange={handleChange}/>}
                label={label}
            />
            <FormHelperText style={{color: theme.palette.error.main}}>{helperText}</FormHelperText>
        </>
    )
}