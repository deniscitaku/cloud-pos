import React, {useState} from 'react'
import List from '@material-ui/core/List'

import ListItemIcon from '@material-ui/core/ListItemIcon'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Collapse from '@material-ui/core/Collapse'

import IconExpandLess from '@material-ui/icons/ExpandLess'
import IconExpandMore from '@material-ui/icons/ExpandMore'

import AppMenuItemComponent from './AppMenuItemComponent'
import {createStyles} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";

const useStyles = makeStyles(theme =>
    createStyles({
        menuItem: {
            '&.active': {
                background: 'rgba(0,0,0,0.2)',
                '& .MuiListItemIcon-root': {
                    color: theme.palette.primary.main,
                },
            },
        },
        nested: {
            paddingLeft: theme.spacing(4),
        }
    }),
);

const AppMenuItem = props => {
    const { divider, name, link, Icon, items = [], extraPadding } = props;
    const [open, setOpen] = useState(false);
    const classes = useStyles();
    const isExpandable = items && items.length > 0;

    function handleClick() {
        setOpen(!open)
    }

    const MenuItemRoot = (
        <AppMenuItemComponent className={`${classes.menuItem} ${extraPadding ? classes.nested : ''}`} link={link} onClick={handleClick} divider={!!divider}>
            {!!Icon && (
                <ListItemIcon>
                    <Icon />
                </ListItemIcon>
            )}
            <ListItemText primary={name} inset={!Icon} />
            {isExpandable && !open && <IconExpandMore />}
            {isExpandable && open && <IconExpandLess />}
        </AppMenuItemComponent>
    );

    const MenuItemChildren = isExpandable ? (
        <Collapse in={open} timeout="auto" unmountOnExit>
            <Divider />
            <List component="div" disablePadding>
                {items.map((item, index) => (
                    <AppMenuItem {...item} key={index} extraPadding/>
                ))}
            </List>
        </Collapse>
    ) : null;

    return (
        <>
            {MenuItemRoot}
            {MenuItemChildren}
        </>
    )
};

export default AppMenuItem
