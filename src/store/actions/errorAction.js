import { ERROR_CONSTANTS } from "../../store/actionTypes";
import { store } from "../../store";
import {
  ERROR_MSGS,
  CONSTANTS,
  HELPER,
  history,
  ROUTE_CONSTANTS,
} from "../../utils";

let bodyDirection;
let errorMessage;
let errorMessageDescription;
let errorCodes = [
  CONSTANTS.HTTP_RESPONSE.INPROCESSIBLE,
  CONSTANTS.HTTP_RESPONSE.UNAUTHORIZED,
  CONSTANTS.HTTP_RESPONSE.SERVER_ERROR,
  CONSTANTS.HTTP_RESPONSE.BAD_REQUEST,
];
const handleError = (error_response) => {
  const status = error_response?.status;
  const description = error_response?.statusText;
  const message = error_response?.data?.message;
  const body = error_response?.data?.body;
  if (errorCodes.includes(parseInt(status))) {
    return { type: ERROR_CONSTANTS.ERROR, status, message, description, body };
  } else {
    const error_message = error_response?.data?.message;
    return {
      type: ERROR_CONSTANTS.MESSAGE,
      status,
      message: error_message,
      description,
      body,
    };
  }
};

export const errorAction = (error_response) => {
  bodyDirection = HELPER.getBodyDirection();
  const status = CONSTANTS.HTTP_RESPONSE.INPROCESSIBLE;
  if (error_response === undefined) {
    const error_message =
      bodyDirection === "rtl"
        ? ERROR_MSGS.UR.NETWORK_CONNECTIVITY
        : ERROR_MSGS.EN.NETWORK_CONNECTIVITY;
    return {
      type: ERROR_CONSTANTS.MESSAGE,
      status,
      message: error_message,
      description: {},
      body: {},
    };
  } else if (
    parseInt(error_response.status) === CONSTANTS.HTTP_RESPONSE.SERVER_ERROR
  ) {
    errorMessage =
      bodyDirection === "rtl"
        ? ERROR_MSGS.UR.INTERNAL_SERVER_ERROR
        : ERROR_MSGS.EN.INTERNAL_SERVER_ERROR;
    errorMessageDescription =
      bodyDirection === "rtl"
        ? ERROR_MSGS.UR.INTERNAL_SERVER_ERROR
        : ERROR_MSGS.EN.INTERNAL_SERVER_ERROR;
    const error_message = {
      type: ERROR_CONSTANTS.ERROR,
      status: CONSTANTS.HTTP_RESPONSE.SERVER_ERROR,
      message: errorMessage,
      description: "",
      body: errorMessageDescription,
    };
    return error_message;
  } else {
    return handleError(error_response);
  }
};

export const errorPageAction = (error_response) => {
  bodyDirection = HELPER.getBodyDirection();
  const status = error_response?.status;
  if (error_response === undefined) {
    errorMessage =
      bodyDirection === "rtl"
        ? ERROR_MSGS.UR.NETWORK_CONNECTIVITY
        : ERROR_MSGS.EN.NETWORK_CONNECTIVITY;
    errorMessageDescription =
      bodyDirection === "rtl"
        ? ERROR_MSGS.UR.NETWORK_CONNECTIVITY_DESCRIPTION
        : ERROR_MSGS.EN.NETWORK_CONNECTIVITY_DESCRIPTION;

    return {
      type: ERROR_CONSTANTS.ERROR,
      status: ERROR_MSGS.EN.NETWORK_CONNECTIVITY_STATUS,
      message: errorMessage,
      description: "",
      body: errorMessageDescription,
    };
  } else if (parseInt(status) === 500) {
    errorMessage =
      bodyDirection === "rtl"
        ? ERROR_MSGS.UR.INTERNAL_SERVER_ERROR
        : ERROR_MSGS.EN.INTERNAL_SERVER_ERROR;
    errorMessageDescription =
      bodyDirection === "rtl"
        ? ERROR_MSGS.UR.INTERNAL_SERVER_ERROR
        : ERROR_MSGS.EN.INTERNAL_SERVER_ERROR;

    let _errorObj = {
      type: ERROR_CONSTANTS.ERROR,
      status: CONSTANTS.HTTP_RESPONSE.SERVER_ERROR,
      message: errorMessage,
      description: "",
      body: errorMessageDescription,
    };

    store.dispatch(LOG_ERROR(_errorObj));
    history.push({
      pathname: ROUTE_CONSTANTS.GENERAL_ERROR_PAGE,
    });
    return false;
  } else {
    return handleError(error_response);
  }
};

export const LOG_ERROR = (error) => {
  return (dispatch) => {
    dispatch(errorScreen(error));
  };
  function errorScreen(error) {
    return { type: ERROR_CONSTANTS.ERROR, error };
  }
};

export const SUCCESS_ALERT_ACTION = (success_response) => {
  const responseMessage = success_response?.data?.message;
  return responseMessage;
};
