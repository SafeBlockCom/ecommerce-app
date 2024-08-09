import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { HELPER, CONSTANTS } from "../../utils";
import { alertActions } from "../../store/actions";
import { useCustomAlerts } from "../../hooks";
// import { useCustomAlerts, useToaster } from "../../hooks";

let timeoutTime;

function AlertComponent() {
  let dispatch = useDispatch();
  // let { addToast, removeAllToasts } = useToaster();

  const { message, hide, type, clearAll, autoDismiss, group } = useSelector(
    (state) => state.alert
  );

  useEffect(() => {
    // returned function will be called on component unmount
    return () => {
      if (!HELPER.isEmpty(message) && hide) {
        HELPER.scrollScreen();
        dispatch(alertActions.clear());
      }
      clearTimeout(timeoutTime);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    // removeAllToasts();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clearAll]);

  useEffect(() => {
    /*
      TOAST ALERTS
    */
    if (!HELPER.isEmpty(message) && !HELPER.isEmpty(type)) {
      HELPER.scrollTo("alert_classes", -100);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message, type]);

  useEffect(() => {
    if (!HELPER.isEmpty(message) && hide) {
      HELPER.scrollScreen();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [alert]);

  return useCustomAlerts();
}

export default AlertComponent;
