import Drawer from "@material-ui/core/Drawer";
import IconButton from "@material-ui/core/IconButton";
import Divider from "@material-ui/core/Divider";
import React, {useEffect, useState} from "react";
import ToggleButtonGroup from "@material-ui/lab/ToggleButtonGroup";
import ToggleButton from "@material-ui/lab/ToggleButton";
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ViewListIcon from '@material-ui/icons/ViewList';
import makeStyles from "@material-ui/core/styles/makeStyles";
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import useTheme from "@material-ui/core/styles/useTheme";
import {AxiosCategoryClient, QueryKeys} from "../../client/Client";
import Button from "@material-ui/core/Button";
import {useQuery} from "react-query";
import Box from "@material-ui/core/Box";
import SubCategoryIcon from "../icons/SubCategoryIcon";
import Tooltip from "@material-ui/core/Tooltip";
import Skeleton from "@material-ui/lab/Skeleton";
import Avatar from "@material-ui/core/Avatar";

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

function CategoriesDrawer({open, handleDrawerClose, onChange}) {

    console.log("Inside Categories Drawer");

    const classes = useStyles();
    const theme = useTheme();
    const [openTooltip, setOpenTooltip] = useState(-1);
    const [selected, setSelected] = useState();
    const [buttons, setButtons] = useState(new Array(9));

    const {data: categories, isLoading} = useQuery([QueryKeys.CATEGORIES, {include: QueryKeys.SUB_CATEGORIES}],
        () => categoryService.findAll({include: 'subCategories'}).then(x => x.data));

    useEffect(() => {
        if (!selected && categories && categories.length) {
            setButtons(categories);
            setSelected(categories[0]);
        }
    }, [categories]);

    useEffect(() => {
        if (selected) {
            onChange({id: selected.id, isCategory: !!selected.subCategories});
        }
    }, [selected]);

    const handleCategoryButton = (newValue) => {
        if (!newValue)
            return;

        setSelected(newValue);
    };


    function handleSubCategoryButton(newValue, index) {
        if (!newValue.subCategories || !newValue.subCategories.length) {
            setOpenTooltip(index);
            setTimeout(() => {
                setOpenTooltip(-1);
            }, 3000);
        } else {
            setButtons(newValue.subCategories);
            setSelected(newValue.subCategories[0]);
        }
    }

    function handleBackButton() {
        setSelected(categories[0]);
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
                {selected?.name}
            </div>
            <div className={classes.drawerHeader}>
                <IconButton onClick={handleDrawerClose}>
                    <ChevronRightIcon/>
                </IconButton>
            </div>
            {selected && !selected.subCategories && (
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
            {
                <ToggleButtonGroup orientation="vertical" value={selected}
                                   exclusive
                >
                    {buttons.map((x, index) => (
                        isLoading || !selected || !x ?
                            (<Box key={index} maxWidth={"14em"} maxHeight={"9em"}><Skeleton><Avatar/></Skeleton></Box>)
                            :
                            (
                                <div key={index}>
                                    <Box display="flex">
                                        <Box flexGrow={1}>
                                            <ToggleButton value={x}
                                                          aria-label="list"
                                                          onClick={() => handleCategoryButton(x)}
                                                          style={{
                                                              width: '100%',
                                                              border: "none"
                                                          }}
                                            >
                                                <ViewListIcon style={{
                                                    marginRight: '0.5em',
                                                    color: selected === x ? theme.palette.primary.main : theme.palette.text.secondary
                                                }}/>
                                                {x.name}
                                            </ToggleButton>
                                        </Box>
                                        {
                                            x.subCategories && <Box>
                                                <Tooltip
                                                    key={index}
                                                    PopperProps={{
                                                        disablePortal: true,
                                                    }}
                                                    onClose={() => setOpenTooltip(-1)}
                                                    open={openTooltip === index}
                                                    disableFocusListener
                                                    disableHoverListener
                                                    disableTouchListener
                                                    title={"No subcategories exist for " + x.name}
                                                >
                                                    <IconButton aria-label="delete" color="primary"
                                                                onClick={() => handleSubCategoryButton(x, index)}>
                                                        <SubCategoryIcon/>
                                                        <ChevronRightIcon/>
                                                    </IconButton>
                                                </Tooltip>
                                            </Box>
                                        }
                                    </Box>
                                    <Divider/>
                                </div>
                            )
                    ))}
                </ToggleButtonGroup>
            }
        </Drawer>
    );
}

export default React.memo(CategoriesDrawer);