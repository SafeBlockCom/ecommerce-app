import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { Form, Label, Input, Row, Col } from "reactstrap";

import Logo from "../../../components/layouts/headers/common/logo";
import AuthLayout from "../../../components/layouts/auth-layout";
import {
  Autocomplete,
  CircularProgress,
  FormControl,
  FormHelperText,
  FormLabel,
} from "@mui/joy";
import {
  ALERT_ACTIONS,
  AUTH_ACTIONS,
  HOMEPAGE_ACTIONS,
  META_ACTIONS,
} from "../../../store/actions";
import {
  CONSTANTS,
  COOKIE_STORAGE_SERVICE,
  HELPER,
  history,
  LOCAL_STORAGE_SERVICE,
  ROUTE_CONSTANTS,
} from "../../../utils";
import AlertComponent from "../../../components/common/alert";
import { useNavigate } from "react-router-dom";

const SignIn = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { meta, authBanners, metaCountryList } = useSelector(
    (state) => state.metadata
  );
  const { isLoggedIn, isLoggedInCustomerScreen, authLoading } = useSelector(
    (state) => state.auth
  );

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoggedInSubmitPressed, setIsLoggedInSubmitPressed] = useState(false);

  useEffect(() => {
    ALERT_ACTIONS.clear();
    let localStorageAuth =
      LOCAL_STORAGE_SERVICE._getFromLocalStorage("access_token");
    let cookieStorageAuth = COOKIE_STORAGE_SERVICE._getAccessToken();

    if (
      HELPER.isNotEmpty(localStorageAuth) ||
      HELPER.isNotEmpty(cookieStorageAuth)
    ) {
      navigate(-1);
    }

    if (HELPER.isEmpty(authBanners)) {
      // dispatch(HOMEPAGE_ACTIONS.FETCH_HOMEPAGE_APP_METADATA());
    }
    if (HELPER.isEmpty(metaCountryList)) {
      dispatch(META_ACTIONS.COUNTRIES_LIST());
    }

    return () => {};
  }, []);

  useEffect(() => {
    if (HELPER.isNotEmpty(isLoggedInCustomerScreen)) {
      if (isLoggedInCustomerScreen === "phone") {
        navigate(ROUTE_CONSTANTS.PHONE_VERIFICATION);
      } else if (isLoggedInCustomerScreen === "otp") {
        navigate(ROUTE_CONSTANTS.OTP_VERIFICATION);
      } else {
        navigate(ROUTE_CONSTANTS.BASE);
      }
    }
  }, [isLoggedInCustomerScreen]);

  const onSignInAction = () => {
    if (!authLoading) {
      dispatch(
        AUTH_ACTIONS.SIGNIN_YOUR_ACCOUNT({
          email_address: email,
          password,
        })
      );
      setIsLoggedInSubmitPressed(true);
    }
  };

  return (
    <AuthLayout parent="home" title="login">
      <div className="d-flex bg-white justify-content-center align-items-center">
        <div className="app-login-box">
          <div
            className="brand-logo app-logo"
            onClick={() => navigate(ROUTE_CONSTANTS.BASE)}
          >
            <Logo logo={meta?.logo} />
          </div>
          <h4 className="mb-0">
            <span className="d-block mb-2">
              <b>Log In to your account</b>
            </span>
            <span className="mb-2">
              Exploring the large variety of clothes with{" "}
              {process.env.REACT_APP_NAME}.
            </span>
          </h4>
          <h6 className="mt-4">
            <span>
              Don't have an account yet?&nbsp;
              <span onClick={() => navigate(ROUTE_CONSTANTS.SIGNUP)}>
                Click here to{" "}
                <b>
                  <u>Sign up</u>
                </b>
              </span>
            </span>
          </h6>
          <div className="divider row"></div>
          <AlertComponent />
          <div className="divider row"></div>
          <div className="mt-5">
            <Form className="">
              <Row>
                <Col xl="12" lg="12" md="12" sm="12">
                  <div className="form-group">
                    <Label className="form-label" htmlFor="email">
                      <b>Email Address</b>
                    </Label>
                    <Input
                      type="email"
                      defaultValue={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="form-control"
                      placeholder="Email"
                      required={true}
                    />
                  </div>
                </Col>
              </Row>
              <Row className="mt-2">
                <Col xl="12" lg="12" md="12" sm="12">
                  <div className="form-group">
                    <Label className="form-label" htmlFor="email">
                      <b>Password</b>
                    </Label>
                    <Input
                      type="password"
                      defaultValue={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="form-control"
                      placeholder="Password"
                      required={true}
                    />
                  </div>
                </Col>
              </Row>
              <Row className="mt-5">
                <button
                  type="submit"
                  className="btn btn-outline black-btn"
                  onClick={() => onSignInAction()}
                  disabled={authLoading && !isLoggedIn ? true : false}
                >
                  Next Step (1/3)
                </button>
              </Row>
            </Form>
          </div>
        </div>
      </div>
    </AuthLayout>
  );
};

export default SignIn;
