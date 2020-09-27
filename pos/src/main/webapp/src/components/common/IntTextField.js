import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";

export default function IntTextField(props) {

    const [isInt, setIsInt] = useState(true);

    const handleChange = (event) => {
        setIsInt(/[0-9]+/.test(event.target.value))
    }
    return (
        <TextField {...props} onChange={handleChange} error={!isInt}/>
    )
}