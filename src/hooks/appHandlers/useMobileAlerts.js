import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

import { HELPER, CONSTANTS } from "../../utils";
import { alertActions } from "../../store/actions";

const useMobileAlerts = () => {
  let dispatch = useDispatch();
  const { message, type, autoDismiss } = useSelector((state) => state.alert);

  const clearAlert = () => {
    if (autoDismiss) {
      dispatch(alertActions.clear());
    }
  };

  //clear alert msg in mobile after 3 sec
  const clearMessage = () => {
    setTimeout(clearAlert, 3000);
  };

  useEffect(() => {
    if (!HELPER.isEmpty(message) && !HELPER.isEmpty(type)) {
      clearMessage();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [message, type]);
};

export default useMobileAlerts;
