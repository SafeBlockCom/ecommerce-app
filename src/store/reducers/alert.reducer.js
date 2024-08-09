import { ALERT_CONSTANTS } from "../../store/actionTypes";
import { CONSTANTS } from "../../utils";

const clearAppAlerts = {
  android: "clear",
  ios: "clear",
}
const showAppAlerts = {
  android: "default",
  ios: "alert",
}

const mobileInitState = {
  alertType: clearAppAlerts,
  background: "",
  color: "",
  autoDismiss: false,
};

const initState = {
  mobile: mobileInitState,
  type: "",
  message: null,
  hide: true,
  group: CONSTANTS.ERROR_TYPE.TOAST,
  autoDismiss: false,
  clearAll: false
};
const alertReducer = (state = initState, action) => {
  switch (action.type) {
    case ALERT_CONSTANTS.SUCCESS:
      return {
        ...state,
        type: "success",
        message: action.message,
        hide: true,
        group: action.group,
        autoDismiss: action.autoDismiss,
        clearAll: false,
        mobile: {
          ...initState.mobile,
          alertType: showAppAlerts,
          background: "#316100",
          color: "#FFFFFF",
        },
      };
    case ALERT_CONSTANTS.ERROR:
      return {
        ...state,
        type: "error",
        message: action.message,
        hide: action.hide,
        group: action.group,
        autoDismiss: action.autoDismiss,
        clearAll: false,
        mobile: {
          ...initState.mobile,
          alertType: showAppAlerts,
          background: "#BF2600",
          color: "#FFFFFF",
        },
      };
    case ALERT_CONSTANTS.WARNING:
      return {
        ...state,
        type: "warning",
        message: action.message,
        hide: true,
        group: action.group,
        autoDismiss: action.autoDismiss,
        clearAll: false,
        mobile: {
          ...initState.mobile,
          alertType: showAppAlerts,
          background: "#f2994a",
          color: "#FFFFFF",
        },
      };
    case ALERT_CONSTANTS.INFO:
      return {
        ...state,
        type: "info",
        message: action.message,
        hide: false,
        group: action.group,
        autoDismiss: action.autoDismiss,
        clearAll: false,
        mobile: {
          ...initState.mobile,
          alertType: showAppAlerts,
          background: "#0d98ba",
          color: "#FFFFFF",
        },
      };
    case ALERT_CONSTANTS.CLEAR:
      return {
        ...initState,
        clearAll: true,
        mobile: {
          ...initState.mobile,
          type: "clear",
        },
      };
    default:
      return state;
  }
};

export default alertReducer;
