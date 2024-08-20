import { ERROR_MSGS, CONSTANTS } from "../../utils";
import { ALERT_ACTIONS, formAction } from "../../store/actions";
import { store } from "../../store";

const internetConnectionHandler = (online) => {
  store.dispatch(formAction.NO_INTERNET_CONNECTION(online));

  online && store.dispatch(ALERT_ACTIONS.clear());
  !online &&
    store.dispatch(
      ALERT_ACTIONS.error(
        ERROR_MSGS.EN.NETWORK_ERROR,
        CONSTANTS.ERROR_TYPE.TOAST,
        false
      )
    );
  return true;
};

export default internetConnectionHandler;
