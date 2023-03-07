import React, { Component } from "react";
import { Route, Redirect } from "react-router-dom";

const RouteGaurd = ({ component: Component, ...rest }) => {
    
    function hasJWT() {
        let flag = false;

        var d = new Date();
        d.setTime(d.getTime() + (1000));
        var expires = "expires=" + d.toUTCString();
        document.cookie = "token=new_value;path=/;" + expires;

        flag = document.cookie.indexOf("token=") > 0;

        return flag;
    }

    return (
        <Route {...rest}
            render={props => (
                hasJWT() ?
                    <Component {...props} />
                    :
                    <Redirect to={{ pathname: '/login' }} />
            )}
        />
    )
}

export default RouteGaurd;