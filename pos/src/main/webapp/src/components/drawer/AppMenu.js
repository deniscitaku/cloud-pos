import React from 'react'

import List from '@material-ui/core/List'

import IconDashboard from '@material-ui/icons/Dashboard'

import AppMenuItem from './AppMenuItem'
import {ShoppingCartOutlined} from "@material-ui/icons";
import ShoppingBasketOutlinedIcon from "@material-ui/icons/ShoppingBasketOutlined";
import CategoryOutlinedIcon from '@material-ui/icons/CategoryOutlined';
import LocalShippingOutlinedIcon from '@material-ui/icons/LocalShippingOutlined';
import SwapHorizIcon from '@material-ui/icons/SwapHoriz';
import DeleteSweepIcon from '@material-ui/icons/DeleteSweep';
import EventBusyIcon from '@material-ui/icons/EventBusy';
import AssignmentReturnIcon from '@material-ui/icons/AssignmentReturn';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import PeopleIcon from '@material-ui/icons/People';
import TransformIcon from '@material-ui/icons/Transform';
import FastfoodIcon from '@material-ui/icons/Fastfood';

import InsertChartOutlinedOutlinedIcon from "@material-ui/icons/InsertChartOutlinedOutlined";
import SettingsIcon from "@material-ui/icons/Settings";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import SubCategoryIcon from "../icons/SubCategoryIcon";
import ProductConfigIcon from "../icons/ProductConfigIcon";
import UomIcon from "../icons/UomIcon";
import TaxIcon from "../icons/TaxIcon";

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
        name: "Inventory Movement",
        Icon: TransformIcon,
        items: [
            {
                name: "Purchase",
                Icon: ShoppingBasketOutlinedIcon,
                link: "/inventory-movement/purchase",
            },
            {
                name: "Return to supplier",
                link: "/inventory-movement/return-supplier",
                Icon: AssignmentReturnIcon
            },
            {
                name: "Waste",
                link: "/inventory-movement/waste",
                Icon: DeleteSweepIcon
            },
            {
                name: "Expire",
                link: "/inventory-movement/expire",
                Icon: EventBusyIcon
            },
            {
                name: "Registration",
                link: "/inventory-movement/registration",
                Icon: EqualizerIcon
            },
            {
                name: "Transfer",
                link: "/inventory-movement/transfer",
                Icon: SwapHorizIcon
            }
        ]
    },
    {
        name: "Product configuration",
        Icon: ProductConfigIcon,
        items: [
            {
                name: "Products",
                Icon: FastfoodIcon,
                link: "/products",
            },
            {
                name: "Units of measure",
                link: "/uom",
                Icon: UomIcon
            },
            {
                name: "Taxes",
                link: "/taxes",
                Icon: TaxIcon
            },
            {
                name: "Categories",
                link: "/categories",
                Icon: CategoryOutlinedIcon
            },
            {
                name: "Sub-Categories",
                link: "/sub-categories",
                Icon: SubCategoryIcon
            }
        ]
    },
    {
        name: "Customers",
        link: "/customers",
        Icon: PeopleIcon
    },
    {
        name: "Suppliers",
        link: "/suppliers",
        Icon: LocalShippingOutlinedIcon
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
};

export default AppMenu;
