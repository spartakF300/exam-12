import React from 'react';
import {NavLink} from "react-router-dom";
import Button from "@material-ui/core/Button";

const AnonymousMenu = () => (
  <>
    <Button color="inherit" component={NavLink} to="/register" exact>Sign Up</Button>
    <Button color="inherit" component={NavLink} to="/login" exact>Login</Button>
  </>
);

export default AnonymousMenu;