import { ALERT_CONSTANTS } from "../actionTypes";
import { CONSTANTS } from "../../utils";

export const alertActions = {
  success,
  warning,
  error,
  secondary,
  clear,
  info
};

function success(message, group = CONSTANTS.ERROR_TYPE.ALERT, autoDismiss = true) {
  return { type: ALERT_CONSTANTS.SUCCESS, message, group, autoDismiss };
}

function error(message, hide = true, group = CONSTANTS.ERROR_TYPE.ALERT, autoDismiss = true) {
  return { type: ALERT_CONSTANTS.ERROR, message, group, autoDismiss, hide };
}

function secondary(message, group = CONSTANTS.ERROR_TYPE.ALERT, autoDismiss = true) {
  return { type: ALERT_CONSTANTS.SECONDARY, message, group, autoDismiss };
}

function warning(message, group = CONSTANTS.ERROR_TYPE.ALERT, autoDismiss = true) {
  return { type: ALERT_CONSTANTS.WARNING, message, group, autoDismiss };
}


function info(message, group = CONSTANTS.ERROR_TYPE.ALERT, autoDismiss = false) {
  return { type: ALERT_CONSTANTS.INFO, message: message, group, autoDismiss };
}

function clear() {
  return { type: ALERT_CONSTANTS.CLEAR };
}
