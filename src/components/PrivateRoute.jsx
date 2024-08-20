import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import {
  COOKIE_STORAGE_SERVICE,
  LOCAL_STORAGE_SERVICE,
  ROUTE_CONSTANTS,
} from "../utils";

const PrivateRoute = () => {
  const isAuthenticated =
    COOKIE_STORAGE_SERVICE._getAccessTokenFromSession("access_token");

  return isAuthenticated ? <Outlet /> : <Navigate to={ROUTE_CONSTANTS.BASE} />;
};

export default PrivateRoute;
