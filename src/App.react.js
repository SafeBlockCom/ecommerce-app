import React from "react";
import { Router, Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";
// import { StylesProvider, ThemeProvider, jssPreset } from "@material-ui/styles";
import { create } from "jss";
// import { createTheme } from "@material-ui/core/styles";
import rtl from "jss-rtl";

import "react-phone-input-2/lib/style.css";
import routes from "./route";
import {
  ErrorBoundary,
  PrivateRoute,
  DefaultRoute,
  PageLoader,
} from "./components";

import { history } from "./utils";
import "./assets/sass/app.scss";
import "./App.css";
import { useMobileAlerts } from "../src/hooks";
import { useRollbarPerson } from "@rollbar/react";

// const jss = create({ plugins: [...jssPreset().plugins, rtl()] });

// const ltrTheme = createTheme({ direction: "ltr" });

function App() {
  useMobileAlerts();
  // const { customer, order_ref } = useSelector((state) => state.configuration);

  // useRollbarPerson({
  //   id: order_ref,
  //   username: customer?.name,
  //   email: customer?.email,
  // });

  return (
    <>
      <PageLoader />
      {/* <StylesProvider jss={jss}> */}
      {/* <ThemeProvider theme={ltrTheme}> */}
      <Router history={history}>
        <ErrorBoundary>
          <Routes>
            {routes.map((route, index) => {
              return route.protected ? (
                <PrivateRoute key={index} {...route} />
              ) : route.default ? (
                <DefaultRoute key={index} {...route} />
              ) : (
                <Route key={index} {...route} />
              );
            })}
          </Routes>
        </ErrorBoundary>
      </Router>
      {/* </ThemeProvider> */}
      {/* </StylesProvider> */}
    </>
  );
}

export default App;
