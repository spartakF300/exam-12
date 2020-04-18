import React, {useState} from 'react';
import {Link} from "react-router-dom";

import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import ListItem from "@material-ui/core/ListItem";
import Divider from "@material-ui/core/Divider";
import Avatar from "../../Avatar/Avatar";

const UserMenu = ({user, logout}) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <>
      <IconButton color="inherit" onClick={handleClick}>
       <Avatar
           avatar={user.avatar}
           facebookId={user.facebookId}
       />
      </IconButton>
      <Menu
        id="menu-list-grow"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
        variant="menu"
      >

        <ListItem disabled>Hello, {user.displayName || user.username}!</ListItem>
        <Divider/>
        <MenuItem onClick={logout}>Logout</MenuItem>
          <MenuItem onClick={handleClose} component={Link} to="/new_photo">Add photo</MenuItem>
          <MenuItem onClick={handleClose} component={Link} to={"/my_photo/"+ user._id}>My photo</MenuItem>
      </Menu>
    </>
  );
};

export default UserMenu;