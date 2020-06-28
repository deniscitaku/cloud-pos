import React from "react";
import {MenuItem} from "@material-ui/core";
import withStyles from "@material-ui/core/styles/withStyles";
import Menu from "@material-ui/core/Menu";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
    },
})((props) => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles((theme) => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

const RightClickMenu = (element, menuItems = []) => {
    console.log("--> Inside RightClickMenu")
    const anchorElement = element;

    return (
        <div>
            { console.log("--> Inside return: ", element) }
            { console.log("--> Menu items: ", menuItems) }
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorElement}
                keepMounted
                open={Boolean(anchorElement)}
            >
                {
                    menuItems.map(item => (
                        <StyledMenuItem onClick={event => item.onClick(event)}>
                            <ListItemIcon>
                                {item.icon}
                            </ListItemIcon>
                            <ListItemText primary={item.text}/>
                        </StyledMenuItem>
                    ))
                }
            </StyledMenu>
        </div>
    );
};
export default RightClickMenu;