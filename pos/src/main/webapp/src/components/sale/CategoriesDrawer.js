import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import React, {useEffect, useState} from "react";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ViewListIcon from '@material-ui/icons/ViewList';
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import ViewQuiltIcon from '@material-ui/icons/ViewQuilt';
import makeStyles from "@material-ui/core/styles/makeStyles";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import useTheme from "@material-ui/core/styles/useTheme";
import {useDarkMode} from "../../themeObject";
import {AxiosCategoryClient} from "../../client/Client";
import {useFindAll, useOnce} from "../../hooks/useFetch";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";

const drawerWidth = 240;

const useStyles = makeStyles((theme) => ({
    drawer: {
        width: drawerWidth,
        flexShrink: 0,
    },
    drawerPaper: {
        width: drawerWidth,
    },
    drawerHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-start',
    },
}));

const categoryService = new AxiosCategoryClient();

export default function CategoriesDrawer({open, handleDrawerClose}) {

    const classes = useStyles();
    const theme = useTheme();
    const [selected, setSelected] = useState();
    const [findAllCategories, buttons, loading, setButtons] = useFindAll(() => categoryService.findAll({include: 'subCategories'}));
    const [categories, setCategories] = useState();

    useEffect(() => {
        findAllCategories().then(x => setCategories(x));
    }, []);

    const handleChange = (event, newValue) => {
        if (newValue.subCategories && newValue.subCategories.length) {
            setButtons(newValue.subCategories);
            setSelected(newValue.subCategories[0]);
        } else {
            setSelected(newValue);
        }
    };

    console.log("Inside categories drawer!");

    function handleBackButton() {
        setSelected(undefined);
        setButtons(categories);
    }

    return (
        <Drawer
            className={classes.drawer}
            variant="persistent"
            anchor="right"
            open={open}
            classes={{
                paper: classes.drawerPaper,
            }}
        >
            <div className={classes.drawerHeader}>
            </div>
            <div className={classes.drawerHeader}>
                <IconButton onClick={handleDrawerClose}>
                    <ChevronRightIcon/>
                </IconButton>
            </div>
            {selected && Object.keys(selected).find(x => x === 'category') && (
                <Button
                    variant="contained"
                    color="secondary"
                    className={classes.button}
                    startIcon={<ArrowBackIosIcon/>}
                    onClick={handleBackButton}
                >
                    Back to categories
                </Button>
            )}
            <Divider/>
            {loading ? <CircularProgress/> : (
                <ToggleButtonGroup orientation="vertical" value={selected} exclusive onChange={handleChange}>
                    {buttons.map(x => (
                        <ToggleButton value={x} aria-label="list">
                            <ViewListIcon style={{
                                marginRight: '0.5em',
                                color: selected === x ? theme.palette.primary.main : theme.palette.text.secondary
                            }}/>
                            {x.name}
                        </ToggleButton>
                    ))}
                </ToggleButtonGroup>
            )}
        </Drawer>
    );
}