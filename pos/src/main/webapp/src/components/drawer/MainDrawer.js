import React, {lazy, Suspense} from 'react';
import clsx from 'clsx';
import {createStyles, makeStyles, ThemeProvider} from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import DarkModeIcon from '@material-ui/icons/Brightness4';
import LightModeIcon from '@material-ui/icons/Brightness7';

import {BrowserRouter, Route, Switch} from "react-router-dom";
import AppMenu from "./AppMenu";
import {AccountCircle} from "@material-ui/icons";
import MoreIcon from '@material-ui/icons/MoreVert';
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import {useDarkMode} from "../../themeObject";
import createMuiTheme from "@material-ui/core/styles/createMuiTheme";
import {SnackbarProvider} from "notistack";
import Tooltip from "@material-ui/core/Tooltip";
import Button from "@material-ui/core/Button";
import TranslateIcon from '@material-ui/icons/Translate';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {useTranslation} from "react-i18next";
import UomView from "../product-config/uom/UomView";
import TaxView from "../product-config/tax/TaxView";
import CategoryView from "../product-config/category/CategoryView";
import SubCategoryView from "../product-config/sub-category/SubCategoryView";
import {QueryClientProvider} from "react-query";
import {ReactQueryDevtools} from "react-query/devtools";
import ProductView from "../product-config/product/ProductView";
import CustomerView from "../customer/CustomerView";
import SupplierView from "../supplier/SupplierView";
import CustomBackdrop from "../common/CustomBackdrop";
import queryClient from "../../hooks/queryClient";
import MuiPickersUtilsProvider from "@material-ui/pickers/MuiPickersUtilsProvider";

const drawerWidth = 270;

const PurchaseView = lazy(() => import("../inventory-movement/purchase/PurchaseView"));
const ReturnSupplierView = lazy(() => import("../inventory-movement/return-supplier/ReturnSupplierView"));
const RegistrationView = lazy(() => import("../inventory-movement/registration/RegistrationView"));
const WasteView = lazy(() => import("../inventory-movement/waste/WasteView"));
const ExpirationView = lazy(() => import("../inventory-movement/expiration/ExpirationView"));
const SaleView = lazy(() => import("../sale/SaleView"));

const useStyles = makeStyles((theme) =>
    createStyles({
        root: {
            display: 'flex',
            height: '93.5vh',
        },
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
        },
        appBarShift: {
            marginLeft: drawerWidth,
            width: `calc(100% - ${drawerWidth}px)`,
            transition: theme.transitions.create(['width', 'margin'], {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        menuButton: {
            marginRight: 36,
        },
        hide: {
            display: 'none',
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
            whiteSpace: 'nowrap',
        },
        drawerOpen: {
            width: drawerWidth,
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
        },
        drawerClose: {
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.leavingScreen,
            }),
            overflowX: 'hidden',
            width: theme.spacing(7) + 1,
            [theme.breakpoints.up('sm')]: {
                width: theme.spacing(9) + 1,
            },
        },
        toolbar: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-end',
            padding: theme.spacing(0, 1),
            // necessary for content to be below app bar
            ...theme.mixins.toolbar,
        },
        grow: {
            flexGrow: 1,
        },
        sectionDesktop: {
            display: 'none',
            [theme.breakpoints.up('md')]: {
                display: 'flex',
            },
        },
        sectionMobile: {
            display: 'flex',
            [theme.breakpoints.up('md')]: {
                display: 'none',
            },
        },
    }),
);

const MainDrawer = () => {
    const classes = useStyles();
    const [open, setOpen] = React.useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);
    const [theme, toggleDarkMode] = useDarkMode();
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
    const themeConfig = createMuiTheme(theme);
    const [localeMenu, setLocaleMenu] = React.useState(null);
    const {i18n} = useTranslation();
    const locale = new Map([["en", "English"], ["sq", "Shqip"]])

    const handleProfileMenuOpen = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMobileMenuClose = () => {
        setMobileMoreAnchorEl(null);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
        handleMobileMenuClose();
    };

    const handleMobileMenuOpen = (event) => {
        setMobileMoreAnchorEl(event.currentTarget);
    };

    const handleDrawerOpen = () => {
        setOpen(true);
    };

    const handleDrawerClose = () => {
        setOpen(false);
    };
    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            id={menuId}
            keepMounted
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
            <MenuItem onClick={handleMenuClose}>My account</MenuItem>
        </Menu>
    );

    const mobileMenuId = 'primary-search-account-menu-mobile';

    function setLocale(locale) {
        i18n.changeLanguage(locale);
        setLocaleMenu(null);
    }

    const renderMobileMenu = (
        <Menu
            anchorEl={mobileMoreAnchorEl}
            anchorOrigin={{vertical: 'top', horizontal: 'right'}}
            id={mobileMenuId}
            keepMounted
            transformOrigin={{vertical: 'top', horizontal: 'right'}}
            open={isMobileMenuOpen}
            onClose={handleMobileMenuClose}
        >
            <MenuItem aria-controls="locale-menu" onClick={e => setLocaleMenu(e.currentTarget)}>
                <IconButton
                    color="inherit"
                >
                    <TranslateIcon/>
                </IconButton>
                <p>{locale.get(i18n.language)}</p>
            </MenuItem>
            <Menu
                id="locale-menu"
                anchorEl={localeMenu}
                keepMounted
                open={Boolean(localeMenu)}
                onClose={() => setLocaleMenu(null)}
            >
                <MenuItem onClick={() => setLocale('en')}>{locale.get('en')}</MenuItem>
                <MenuItem onClick={() => setLocale('sq')}>{locale.get('sq')}</MenuItem>
            </Menu>
            {theme.palette.type === 'dark' ?
                (
                    <MenuItem onClick={toggleDarkMode}>
                        <IconButton
                            color="inherit"
                        >
                            <LightModeIcon/>
                        </IconButton>
                        <p>Light</p>
                    </MenuItem>
                ) :
                (
                    <MenuItem onClick={toggleDarkMode}>
                        <IconButton
                            color="inherit"
                        >
                            <DarkModeIcon/>
                        </IconButton>
                        <p>Dark</p>
                    </MenuItem>
                )}
            <MenuItem onClick={handleProfileMenuOpen}>
                <IconButton
                    aria-label="account of current user"
                    aria-controls="primary-search-account-menu"
                    aria-haspopup="true"
                    color="inherit"
                >
                    <AccountCircle/>
                </IconButton>
                <p>Profile</p>
            </MenuItem>
        </Menu>
    );

    return (
        <QueryClientProvider client={queryClient}>
            <ThemeProvider theme={themeConfig}>
                <SnackbarProvider maxSnack={3}>
                    <BrowserRouter>
                        <div className={classes.root}>
                            <CssBaseline/>
                            <AppBar
                                style={{
                                    background: theme.palette.primary.mainGradient,
                                    color: theme.palette.primary.contrastText
                                }}
                                position="fixed"
                                className={clsx(classes.appBar, {
                                    [classes.appBarShift]: open,
                                })}
                            >
                                <Toolbar>
                                    <IconButton
                                        color="inherit"
                                        aria-label="open drawer"
                                        onClick={handleDrawerOpen}
                                        edge="start"
                                        className={clsx(classes.menuButton, {
                                            [classes.hide]: open,
                                        })}
                                    >
                                        <MenuIcon/>
                                    </IconButton>
                                    <Typography variant="h6" noWrap>
                                        D&L POS
                                    </Typography>
                                    <div className={classes.grow}/>
                                    <div className={classes.sectionDesktop}>
                                        <Button aria-controls="locale-menu"
                                                aria-haspopup="true"
                                                color={"inherit"}
                                                size={"medium"}
                                                startIcon={<TranslateIcon/>}
                                                endIcon={<ExpandMoreIcon/>}
                                                onClick={e => setLocaleMenu(e.currentTarget)}>
                                            {locale.get(i18n.language)}
                                        </Button>
                                        <Menu
                                            id="locale-menu"
                                            anchorEl={localeMenu}
                                            keepMounted
                                            open={Boolean(localeMenu)}
                                            onClose={() => setLocaleMenu(null)}
                                        >
                                            <MenuItem onClick={() => setLocale('en')}>{locale.get('en')}</MenuItem>
                                            <MenuItem onClick={() => setLocale('sq')}>{locale.get('sq')}</MenuItem>
                                        </Menu>
                                        <Tooltip title={"Toggle " + theme.palette.type + " theme"}>
                                            <IconButton aria-label="dark mode" color="inherit"
                                                        onClick={toggleDarkMode}>
                                                {theme.palette.type === 'dark' ? <LightModeIcon/> : <DarkModeIcon/>}
                                            </IconButton>
                                        </Tooltip>
                                        <IconButton
                                            edge="end"
                                            aria-label="account of current user"
                                            aria-controls={menuId}
                                            aria-haspopup="true"
                                            onClick={handleProfileMenuOpen}
                                            color="inherit"
                                        >
                                            <AccountCircle/>
                                        </IconButton>
                                    </div>
                                    <div className={classes.sectionMobile}>
                                        <IconButton
                                            aria-label="show more"
                                            aria-controls={mobileMenuId}
                                            aria-haspopup="true"
                                            onClick={handleMobileMenuOpen}
                                            color="inherit"
                                        >
                                            <MoreIcon/>
                                        </IconButton>
                                    </div>
                                </Toolbar>
                            </AppBar>
                            {renderMobileMenu}
                            {renderMenu}
                            <Drawer
                                variant="permanent"
                                className={clsx(classes.drawer, {
                                    [classes.drawerOpen]: open,
                                    [classes.drawerClose]: !open,
                                })}
                                classes={{
                                    paper: clsx({
                                        [classes.drawerOpen]: open,
                                        [classes.drawerClose]: !open,
                                    }),
                                }}
                            >
                                <div className={classes.toolbar}>
                                    <IconButton onClick={handleDrawerClose}>
                                        {theme.direction === 'rtl' ? <ChevronRightIcon/> : <ChevronLeftIcon/>}
                                    </IconButton>
                                </div>
                                <AppMenu/>
                            </Drawer>
                            <main className={classes.grow}>
                                <div className={classes.toolbar}/>
                                <Suspense fallback={<CustomBackdrop/>}>
                                    <Switch>
                                        <Route path="/" exact component={SaleView}/>
                                        <Route path="/sale" component={SaleView}/>
                                        <Route path="/inventory-movement/purchase" component={PurchaseView}/>
                                        <Route path="/inventory-movement/return-supplier"
                                               component={ReturnSupplierView}/>
                                        <Route path="/inventory-movement/registration"
                                               component={RegistrationView}/>
                                        <Route path="/inventory-movement/waste" component={WasteView}/>
                                        <Route path="/inventory-movement/expire" component={ExpirationView}/>
                                        <Route path="/products" component={ProductView}/>
                                        <Route path="/categories" component={CategoryView}/>
                                        <Route path="/sub-categories" component={SubCategoryView}/>
                                        <Route path="/uom" component={UomView}/>
                                        <Route path="/taxes" component={TaxView}/>
                                        <Route path="/customers" component={CustomerView}/>
                                        <Route path="/suppliers" component={SupplierView}/>
                                        <Route path="/reports" component={SaleView}/>
                                        <Route path="/settings" component={SaleView}/>
                                        <Route path="/log-out" component={SaleView}/>
                                    </Switch>
                                </Suspense>
                            </main>
                        </div>
                        <ReactQueryDevtools initialIsOpen={true}/>
                    </BrowserRouter>
                </SnackbarProvider>
            </ThemeProvider>
        </QueryClientProvider>
    );
};

export default MainDrawer;