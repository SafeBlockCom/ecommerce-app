import axios from "axios";
// import history from "./history";
import {
  CONSTANTS,
  LOCAL_STORAGE_SERVICE,
  history,
  HELPER,
  ROUTE_CONSTANTS,
} from "../../utils";

var mainInstance = axios.create({
  headers: {
    "Content-Type": "application/json",
    "Access-Control-Allow-Origin": "*",
  },
});

const makeRequest =
  (instance) =>
  (method, url, token, allow_error_pages, allow_byPass_Expiry, ...params) => {
    const locale = LOCAL_STORAGE_SERVICE._getFromLocalStorage("locale");
    // Set Language Headers
    mainInstance.defaults.headers.common["Accept-Language"] = !HELPER.isEmpty(
      locale
    )
      ? locale
      : "en";
    // Set Access token
    const access_token = LOCAL_STORAGE_SERVICE._getAccessTokenFromSession();
    if (access_token) {
      axios.defaults.headers.common["Authorization"] = "Bearer " + access_token;
      mainInstance.defaults.headers.common["Authorization"] =
        "Bearer " + access_token;
    }

    if (!token) {
      delete axios.defaults.headers.common["Authorization"];
      delete mainInstance.defaults.headers.common["Authorization"];
    }
    // Add a response interceptor
    instance.interceptors.response.use(
      (response) => {
        // trigger 'loading=false' event here
        return Promise.resolve(response);
      },
      (error) => {
        // trigger 'loading=false' event here
        if (
          error?.response?.status === CONSTANTS.HTTP_RESPONSE.UNDER_MAINTAINANCE
        ) {
          history.replace(ROUTE_CONSTANTS.STATUS);
        } else if (
          error?.response?.status === CONSTANTS.HTTP_RESPONSE.UNAUTHORIZED &&
          allow_error_pages
        ) {
          history.push("/401");
        } else {
          return Promise.reject(error);
        }
      }
    );
    return instance[method](url, ...params);
  };

const API_REQUEST =
  (method, url, token, allow_error_pages, allow_byPass_Expiry = false) =>
  (...params) => {
    return makeRequest(mainInstance)(
      method,
      url,
      token,
      allow_error_pages,
      allow_byPass_Expiry,
      ...params
    );
  };
export default API_REQUEST;
