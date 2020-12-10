import React from 'react';
import clsx from 'clsx';
import {makeStyles} from '@material-ui/core/styles';
import CircularProgress from '@material-ui/core/CircularProgress';
import {green} from '@material-ui/core/colors';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';

const useStyles = makeStyles((theme) => ({
    fab: {
        position: 'absolute',
        bottom: theme.spacing(5),
        right: theme.spacing(5),
    },
    wrapper: {
        margin: theme.spacing(1),
        position: 'relative',
    },
    buttonSuccess: {
        backgroundColor: green[500],
        '&:hover': {
            backgroundColor: green[700],
        },
        '&:disabled': {
            color: "BLACK",
            backgroundColor: green[500],
        }
    },
    fabProgress: {
        color: green[500],
        position: 'absolute',
        top: -6,
        left: -6,
        zIndex: 1,
    },
}));

const ProgressButton = ({onClick, icon, size, disabled, loading, success}) => {
    const classes = useStyles();
    let buttonSize, iconSize, circularProgressSize = 68;

    if (size === 'medium') {
        buttonSize = ({
            width: "5em",
            height: "5em"
        });
        iconSize = ({
            fontSize: "3em"
        });
        circularProgressSize = 83;
    } else if (size === 'large') {
        buttonSize = ({
            width: "8em",
            height: "8em"
        });
        iconSize = ({
            fontSize: "5em"
        });
        circularProgressSize = 126;
    }

    const buttonClassname = clsx({
        [classes.buttonSuccess]: success,
    });

    const handleButtonClick = () => {
        onClick();
    };

    return (
        <div className={classes.fab}>
            <div className={classes.wrapper}>
                <Fab
                    aria-label="save"
                    color="primary"
                    className={buttonClassname}
                    style={buttonSize}
                    onClick={handleButtonClick}
                    disabled={disabled}
                >
                    {success ? <CheckIcon style={iconSize}/> : icon}
                </Fab>
                {loading && <CircularProgress size={circularProgressSize} className={classes.fabProgress}/>}
            </div>
        </div>
    );
};

export default ProgressButton;