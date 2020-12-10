import React from "react";

export default function ValidTableCell(props, errorsRef, component, extraProps = {}) {
    const newProps = {
        type: props.columnDef.type === 'numeric' ? 'number' : 'text',
        error: errorsRef.current && errorsRef.current[props.columnDef.field],
        id: props.columnDef.field,
        value: props.value,
        onChange: (event) => props.onChange(event.target.value),
        label: props.columnDef.title,
        required: props.columnDef.required
    };

    return component({...newProps, ...extraProps});
}