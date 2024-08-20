import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import "react-phone-input-2/lib/style.css";
import routes from "./route";
import { ErrorBoundary, PrivateRoute, DefaultRoute } from "./components";

import "./assets/scss/app.scss";
import "./App.css";

import CartContextProvider from "./context/cart/CartContext";
import { FilterProvider } from "./context/filter/FilterProvider";
import { CompareContextProvider } from "./context/Compare/CompareContext";
import { CurrencyContextProvider } from "./context/Currency/CurrencyContext";
import { CUSTOMER_ACTIONS } from "./store/actions/customerActions";
import { HELPER, ROUTE_CONSTANTS } from "./utils";
import { HOMEPAGE_ACTIONS } from "./store/actions";
import {
  CreateCloset,
  Dashboard,
  EditClosetProducts,
  LoginMobileVerification,
  LoginOtpVerification,
  AddClosetProducts,
} from "./containers";
import { ToastContainer } from "react-toastify";

function App() {
  const dispatch = useDispatch();

  const { closetRef, customerMetaRequested, isLoggedIn } = useSelector(
    (state) => state.auth
  );
  const { meta } = useSelector((state) => state.metadata);

  // const { customer, order_ref } = useSelector((state) => state.configuration);

  // useRollbarPerson({
  //   id: order_ref,
  //   username: customer?.name,
  //   email: customer?.email,
  // });

  useEffect(() => {
    setTimeout(function () {
      document.querySelectorAll(".loader-wrapper").style = "display: none";
    }, 2000);

    if ((!closetRef || !isLoggedIn) && !customerMetaRequested) {
      dispatch(CUSTOMER_ACTIONS.FETCH_CUSTOMER_METADATA());
    }

    if (HELPER.isEmpty(meta?.app_title)) {
      dispatch(HOMEPAGE_ACTIONS.FETCH_HOMEPAGE_APP_METADATA());
    }

    return () => {};
  }, []);
  return (
    <>
      <Router>
        <ErrorBoundary>
          <CompareContextProvider>
            <FilterProvider>
              <CurrencyContextProvider>
                <CartContextProvider>
                  <ToastContainer />
                  <Routes>
                    <Route element={<PrivateRoute />}>
                      <Route
                        key="r-11"
                        path={ROUTE_CONSTANTS.CREATE_CLOSET}
                        element={<CreateCloset />}
                      />
                      <Route
                        key="r-11"
                        path={ROUTE_CONSTANTS.PRODUCT_ADD}
                        element={<AddClosetProducts />}
                      />
                      <Route
                        key="r-11"
                        path={ROUTE_CONSTANTS.PRODUCT_EDIT}
                        element={<EditClosetProducts />}
                      />
                      <Route
                        key="r-1"
                        path={ROUTE_CONSTANTS.EDIT_CLOSET_PRODUCT}
                        element={<EditClosetProducts />}
                      />
                      <Route
                        key="r-2"
                        path={ROUTE_CONSTANTS.ACCOUNT_DASHBOARD}
                        element={<Dashboard />}
                      />
                      <Route
                        key="r-3"
                        path={ROUTE_CONSTANTS.PHONE_VERIFICATION}
                        element={<LoginMobileVerification />}
                      />
                      <Route
                        key="r-4"
                        path={ROUTE_CONSTANTS.OTP_VERIFICATION}
                        element={<LoginOtpVerification />}
                      />
                    </Route>{" "}
                    {routes.map((route, index) => {
                      return (
                        <Route
                          key={index}
                          path={route.path}
                          element={<route.component />}
                        />
                      );
                    })}
                  </Routes>
                </CartContextProvider>
              </CurrencyContextProvider>
            </FilterProvider>
          </CompareContextProvider>
        </ErrorBoundary>
      </Router>
    </>
  );
}

export default App;
