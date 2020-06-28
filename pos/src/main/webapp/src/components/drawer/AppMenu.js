import React from 'react'

import List from '@material-ui/core/List'

import IconDashboard from '@material-ui/icons/Dashboard'

import AppMenuItem from './AppMenuItem'
import {ShoppingCartOutlined} from "@material-ui/icons";
import ShoppingBasketOutlinedIcon from "@material-ui/icons/ShoppingBasketOutlined";
import InsertChartOutlinedOutlinedIcon from "@material-ui/icons/InsertChartOutlinedOutlined";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";

const appMenuItems = [
    {
        name: "Main menu",
        Icon: IconDashboard,
        link: "/",
    },
    {
        name: "Sale",
        Icon: ShoppingCartOutlined,
        link: "/sale",
    },
    {
        name: "Purchase",
        Icon: ShoppingBasketOutlinedIcon,
        link: "/purchase",
    },
    {
        name: "Reports",
        Icon: InsertChartOutlinedOutlinedIcon,
        link: "/reports",
    },
    {
        divider: true,
        name: "Divider",
    },
    {
        name: "Settings",
        Icon: SettingsIcon,
        link: "/settings",
    },
    {
        name: "Log out",
        Icon: ExitToAppIcon,
        link: "/log-out",
    },
];

const AppMenu = () => {

    return (
        <List component="nav">
            {appMenuItems.map((item, index) => (
                <AppMenuItem {...item} key={index} />
            ))}
        </List>
    )
}

export default AppMenu;
