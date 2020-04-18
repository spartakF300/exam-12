import React from 'react';
import {Redirect, Route, Switch} from "react-router-dom";
import AppToolbar from "./components/UI/Toolbar/Toolbar";
import {useSelector} from "react-redux";
import Login from "./container/Login/Login";
import AddPhoto from "./container/AddPhoto/AddPhoto";
import Gallery from "./container/Gallery/Gallery";

import {NotificationContainer} from 'react-notifications';
import Register from "./container/Register/Register";
const ProtectedRoute = ({isAllowed, ...props}) => (
    isAllowed ? <Route {...props}/> : <Redirect to="/login"/>
);

function App() {
    const user = useSelector(state => state.users.user);
    return (
        <div>
            <NotificationContainer/>
            <AppToolbar/>
            <Switch>
                <Route path="/" exact component={Gallery}/>
                <Route path="/my_photo/:id" component={Gallery}/>
                <ProtectedRoute isAllowed={user} path="/new_photo" component={AddPhoto}/>
                <Route path="/login" exact component={Login}/>
                <Route path="/register" exact component={Register}/>

            </Switch>
        </div>
    );
}


export default App;
