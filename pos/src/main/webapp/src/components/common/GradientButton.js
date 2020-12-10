import React from 'react';
import {createStyles, makeStyles} from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles(theme =>
    createStyles({
        root: {
            background: theme.palette.type === 'dark' ? 'linear-gradient(90deg, rgba(103,96,150,1) 0%, rgba(78,159,181,1) 100%)': "linear-gradient(90deg, rgba(123,116,170,1) 0%, rgba(98,179,201,1) 100%)",
            padding: '0.5em 1em',
            color: 'white',
            '&:hover': {
                boxShadow: '0px 0px 5px 1px rgba(65,216,219,0.5)'
            },
            MuiTouchRipple: {
              background: "RED"
            },
            '.MuiTouchRipple-child': {
                backgroundColor: 'red'
            }
        }
    }),
);

export default function GradientButton(props) {
    const classes = useStyles();
    return <Button {...props} variant="contained" className={classes.root}/>;
}