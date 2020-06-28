import React from "react";
import {Redirect} from "react-router-dom";

export default class HttpErrorHandling {

    public handle401Unauthorized = () => {
        return  <Redirect to="/unauthorized"/>
    }

    public handle402LicenseExpired = () => {
        return  <Redirect to="/license-expired"/>
    }

    public handle403Forbidden = () => {
        return  <Redirect to="/forbidden"/>
    }

    public handle404NotFound = () => {
        return  <Redirect to="/page-not-found"/>
    }
}
