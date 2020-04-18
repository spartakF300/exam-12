import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import imageNotAvailable from "../../assets/images/image_not_available.jpg";
import {apiURL} from "../../constants";

const useStyles = makeStyles((theme) => ({
    root: {
        display: 'flex',
        '& > *': {
            margin: theme.spacing(1),
        },
    },
}));

export default function ImageAvatars(props) {
    let image = imageNotAvailable;

    if (props.avatar) {
        image = apiURL + '/' + props.avatar;
    }
    if (props.facebookId){
        image = props.avatar
    }
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Avatar alt="Remy Sharp" src={image} />
        </div>
    );
}