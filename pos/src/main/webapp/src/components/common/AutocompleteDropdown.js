import React, {useEffect} from "react";
import Autocomplete, {createFilterOptions} from "@material-ui/lab/Autocomplete";
import InputAdornment from "@material-ui/core/InputAdornment";
import ValidTextField from "./ValidTextField";

const filter = createFilterOptions();

function AutocompleteDropdown({
                                  props,
                                  label,
                                  icon,
                                  required,
                                  error,
                                  variant = 'standard',
                                  minWidth = 180,
                                  items,
                                  enableAddOption = false,
                                  inputRef = undefined
                              }) {
    console.log("Inside AutocompleteDropdown");

    return (
        <>
            <Autocomplete
                {...props}
                id={label}
                filterOptions={(options, params) => {
                    const filtered = filter(options, params);

                    if (enableAddOption && params.inputValue !== '') {
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
                    return option.name;
                }}
                selectOnFocus
                autoHighlight
                clearOnEscape
                handleHomeEndKeys
                renderOption={(option) => option.name}
                style={{minWidth: minWidth}}
                freeSolo
                renderInput={(params) => (
                    icon ?
                        <ValidTextField {...params} error={error} required={required} label={label} variant={variant}
                                        inputRef={inputRef}
                                        InputProps={{
                                            ...params.InputProps,
                                            startAdornment: (
                                                <InputAdornment position="start">
                                                    {icon}
                                                </InputAdornment>
                                            ),
                                        }}/> :
                        <ValidTextField {...params} error={error} required={required} label={label} variant={variant}
                                        inputRef={inputRef}/>
                )}
            />
        </>
    );
}

export default React.memo(AutocompleteDropdown)