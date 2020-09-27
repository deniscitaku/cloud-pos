import React from "react";
import Autocomplete, {createFilterOptions} from "@material-ui/lab/Autocomplete";
import InputAdornment from "@material-ui/core/InputAdornment";
import ValidTextField from "./ValidTextField";

const filter = createFilterOptions();

export default function AutocompleteDropdown(props) {
    const {
        label,
        icon,
        required,
        error,
        variant = 'outlined',
        width = 300,
        items,
    } = props;

    function isEmptyObject(obj) {
        return typeof obj === 'object'
            && Object.values(obj)?.every(x => (x === undefined || x === '' || Object.keys(x).length === 0));
    }

    return (
        <>
            <Autocomplete
                {...props}
                id={label}
                filterOptions={(options, params) => {
                    const filtered = filter(options, params);

                    if (params.inputValue !== '') {
                        filtered.push({
                            inputValue: params.inputValue,
                            name: `Add "${params.inputValue}"`,
                        });
                    }

                    return filtered;
                }}
                options={items}
                getOptionLabel={(option) => {
                    // e.g value selected with enter, right from the input
                    if (typeof option === 'string') {
                        return option;
                    }
                    if (option.inputValue) {
                        return option.inputValue;
                    }
                    if (isEmptyObject(option)) {
                        return '';
                    }
                    return option.name;
                }}
                selectOnFocus
                clearOnBlur
                clearOnEscape
                handleHomeEndKeys
                renderOption={(option) => option.name}
                style={{width: width}}
                freeSolo
                renderInput={(params) => (
                    icon ?
                        <ValidTextField {...params} error={error} required={required} label={label} variant={variant}
                                        InputProps={{
                                            ...params.InputProps,
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    {icon}
                                                </InputAdornment>
                                            ),
                                        }}/> :
                        <ValidTextField {...params} error={error} required={required} label={label} variant={variant}/>
                )}
            />

        </>
    );
}