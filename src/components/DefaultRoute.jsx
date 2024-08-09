import React from "react";
import { Route, Navigate } from "react-router-dom";
import { LOCAL_STORAGE_SERVICE } from "../utils";

export const DefaultRoute = ({ component: Component, ...rest }) => (
  <Route
    {...rest}
    render={(props) => {
      return LOCAL_STORAGE_SERVICE._getAccessTokenFromSession(
        "access_token"
      ) ? (
        <Navigate to="/" state={{ from: props.location }} />
      ) : (
        <Component {...props} />
      );
    }}
  />
);
