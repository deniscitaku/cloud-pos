import Typography from "@material-ui/core/Typography";
import BuildOutlinedIcon from "@material-ui/icons/BuildOutlined";
import {IconButton} from "@material-ui/core";
import React from "react";
import PersonAddOutlinedIcon from "@material-ui/icons/PersonAddOutlined";
import CreateOutlinedIcon from "@material-ui/icons/CreateOutlined";
import Tooltip from "@material-ui/core/Tooltip";
import Box from "@material-ui/core/Box";

export default function Tools() {
    const toolButtons = [
        {text: "Customers", icon: <PersonAddOutlinedIcon/>, action: e => customersButtonOnAction(e)},
        {text: "Add description", icon: <CreateOutlinedIcon/>, action: e => addDescriptionButtonOnAction(e)}
    ];

    function customersButtonOnAction(event) {

    }

    function addDescriptionButtonOnAction(event) {

    }

    return (
        <div style={{width: '100%'}}>
            <Box display="flex" alignContent="space-around">
                <Box>
                    <Typography variant="h5" component="h5" style={{lineHeight: "unset"}}>
                        <BuildOutlinedIcon style={{paddingTop: 5}}/>
                        Tools
                    </Typography>
                </Box>
                {toolButtons.map((button, i) => (
                    <Box key={i} style={{marginLeft: "1.5em"}}>
                        <Tooltip title={button.text}>
                            <IconButton color="primary" onClick={button.action}
                                        style={{border: "solid 1.2px", padding: "8px", marginBottom: "8px"}}>
                                {button.icon}
                            </IconButton>
                        </Tooltip>
                    </Box>
                ))}
            </Box>
        </div>
    );
}
