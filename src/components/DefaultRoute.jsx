import React from "react";
import { Route } from "react-router-dom";

const DefaultRoute = ({ element: Element, ...rest }) => {
  return <Route {...rest} element={<Element />} />;
};

export default DefaultRoute;
