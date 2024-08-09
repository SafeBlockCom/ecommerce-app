import React from "react";
import { Route, Navigate } from "react-router-dom";
import { LOCAL_STORAGE_SERVICE } from "../utils";

export const PrivateRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      return LOCAL_STORAGE_SERVICE._getAccessTokenFromSession(
        "access_token"
      ) ? (
        <Component {...props} />
      ) : (
        <Navigate to="/" state={{ from: props.location }} />
      );
    }}
  />
);
