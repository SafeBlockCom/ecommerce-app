import React from "react";
import { useSelector, useDispatch } from "react-redux";

import { HELPER, CONSTANTS } from "../../utils";
import { alertActions } from "../../store/actions";

const useCustomAlerts = () => {
  let dispatch = useDispatch();
  const { message, type, group, autoDismiss } = useSelector(
    (state) => state.alert
  );

  const clearAlert = () => {
    if (autoDismiss) {
      dispatch(alertActions.clear());
    }
  };

  if (!HELPER.isEmpty(message) && !HELPER.isEmpty(type)) {
    return group === CONSTANTS.ERROR_TYPE.ALERT &&
      !HELPER.sendEventToiOS("alertMessage") &&
      !HELPER.sendEventToAndroid("alertMessage") ? (
      <div className="row">
        <div className={`col-12 alert_classes `}>
          <div
            className={`alertCustom  ${
              HELPER.isEmpty(type) ? "default" : type
            }`}
            role="alert"
          >
            <div
              className={`alertAction ${
                HELPER.isEmpty(type) ? "default" : type
              }`}
            >
              <span
                className={`${
                  type === "error"
                    ? "icomoon-close"
                    : type === "warning"
                    ? "icomoon-info"
                    : type === "info"
                    ? "icomoon-info"
                    : "icomoon-check"
                }`}
                onClick={clearAlert}
              ></span>
            </div>
            <div className="alertMsg">{message}</div>
          </div>
        </div>
      </div>
    ) : (
      <></>
    );
  }
  return <></>;
};

export default useCustomAlerts;
