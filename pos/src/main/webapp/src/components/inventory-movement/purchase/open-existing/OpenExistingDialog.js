import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import Box from "@material-ui/core/Box/index";
import Divider from "@material-ui/core/Divider/index";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import CloseIcon from '@material-ui/icons/Close';
import Dialog from "@material-ui/core/Dialog/Dialog";
import React, {useEffect, useState} from "react";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Zoom from "@material-ui/core/Zoom/Zoom";
import useTheme from "@material-ui/core/styles/useTheme";
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";
import BasicTable from "../../../common/BasicTable";
import IconButton from "@material-ui/core/IconButton/index";
import GridList from "@material-ui/core/GridList/index";
import GridListTile from "@material-ui/core/GridListTile/index";
import GridListTileBar from "@material-ui/core/GridListTileBar/index";
import {resolveField} from "../../../../services/utils";
import CircularProgress from "@material-ui/core/CircularProgress/index";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        overflow: 'hidden',
        backgroundColor: theme.palette.background.paper,
    },
    gridList: {
        width: 550,
        height: 500,
        alignItems: "stretch"
        // Promote the list into his own layer on Chrome. This cost memory but helps keeping high FPS.
    },
    tile: {
        borderStyle: "solid",
        borderRadius: "5px",
        borderWidth: "1px",
        borderColor: theme.palette.text.primary,
        cursor: "pointer",
        transition: 'transform .2s',
        paddingLeft: '0.6em',
        '&:hover': {
            borderWidth: "2px",
            borderColor: theme.palette.primary.main,
            transform: 'scale(1.03)'
        }
    },
    disabledTile: {
        opacity: 0.6,
        borderStyle: "solid",
        borderRadius: "5px",
        borderWidth: "1px",
        transition: 'transform .2s',
        paddingLeft: '0.6em',
    },
    titleBar: {
        background: 'linear-gradient(to bottom, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)',
    },
    icon: {
        color: 'white',
    }
}));

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Zoom ref={ref} {...props} />;
});

export default function OpenExistingDialog({open, setOpen, dialogTitle, Icon, data, linesField, titleField, lineColumns, onTileClick, onCloseClick, isLoading}) {

    const [loadingIndex, setLoadingIndex] = useState(-1);
    const theme = useTheme();
    const classes = useStyles();
    const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

    function handleTileClick(lineData) {
        onTileClick(lineData);
        setOpen(false);
    }

    function handleCloseClick(event, lineData, index) {
        event.stopPropagation();
        setLoadingIndex(index);
        console.log("LineData: ", lineData);
        onCloseClick(lineData);
    }

    useEffect(() => {
        if (!isLoading) {
            setLoadingIndex(-1)
        }
    }, [isLoading]);

    return (
        <Dialog open={open} onClose={() => setOpen(false)} fullScreen={fullScreen} TransitionComponent={Transition}
                aria-labelledby="form-dialog-title">
            <form>
                <DialogTitle id="form-dialog-title" style={{backgroundColor: theme.palette.background.default}}>
                    <Box display="flex" justifyContent="center" alignItems="center">
                        <div style={{display: "flex", color: theme.palette.primary.main, marginRight: "0.5em"}}>
                            <Icon/>
                        </div>
                        {dialogTitle}
                    </Box>
                </DialogTitle>
                <Divider style={{backgroundColor: theme.palette.primary.main}}/>
                <DialogContent className={classes.root} style={{overflowY: "hidden", margin: '2em'}}>
                    <GridList cellHeight={200} spacing={15} className={classes.gridList}>
                        {data.map((x, i) => (
                            <GridListTile key={i} classes={{tile: i === loadingIndex ? classes.disabledTile : classes.tile}} onClick={() => handleTileClick(x)}>
                                {i === loadingIndex ? <CircularProgress style={{
                                    marginTop: "5.6em",
                                    marginLeft: "5.8em",
                                }}/> : <BasicTable data={resolveField(x, linesField, [])} columns={lineColumns}/>}
                                        <GridListTileBar
                                            title={resolveField(x, titleField)}
                                            titlePosition="top"
                                            actionIcon={
                                                <IconButton aria-label={`star ${x.title}`} className={classes.icon}
                                                            onClick={(e) => handleCloseClick(e, x, i)} disabled={i === loadingIndex}>
                                                    <CloseIcon fontSize="inherit"/>
                                                </IconButton>
                                            }
                                            actionPosition="right"
                                            className={classes.titleBar}
                                        />
                            </GridListTile>
                        ))}
                    </GridList>
                </DialogContent>
            </form>
        </Dialog>
    );
}