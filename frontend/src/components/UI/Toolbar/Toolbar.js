import React from 'react';
import {makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import AnonymousMenu from "./AnonymousMenu";
import Button from "@material-ui/core/Button";
import {NavLink} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Typography from "@material-ui/core/Typography";
import UserMenu from "./UserMenu";
import {logoutUser} from "../../../store/actions/actionsUsers";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
    },
}));

const AppToolbar = () => {
    const user = useSelector(state => state.users.user);
    const dispatch = useDispatch();

    const classes = useStyles();
    return (
        <div>
            <div className={classes.root}>
                <AppBar position="static">
                    <Toolbar>
                        <span className={classes.title}>
                        <Button color="inherit" component={NavLink} to="/" exact>Main</Button>
                        </span>
                        <Typography>
                            {user ? (
                                <UserMenu user={user} logout={() => dispatch(logoutUser())}/>
                            ) : (
                                <AnonymousMenu/>
                            )}
                        </Typography>
                    </Toolbar>
                </AppBar>
            </div>
        </div>
    );
};

export default AppToolbar;