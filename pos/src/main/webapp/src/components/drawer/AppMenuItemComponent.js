import React, {forwardRef} from 'react'
import ListItem from '@material-ui/core/ListItem'
import {NavLink} from 'react-router-dom'
import {Divider} from "@material-ui/core";

const AppMenuItemComponent = props => {
    const {className, onClick, link, divider, children} = props

    if (divider) {
        return (
            <Divider/>
        );
    }
    // If link is not set return the ordinary ListItem
    if (!link) {
        return (
            <ListItem
                button
                className={className}
                children={children}
                onClick={onClick}
            />
        );
    }

    // Return a LitItem with a link component
    return (
        <ListItem
            button
            className={className}
            children={children}
            component={forwardRef((props, ref) => <NavLink exact {...props} innerRef={ref}/>)}
            to={link}
            onClick={onClick}
        />
    )
};

export default AppMenuItemComponent