import { HELPER, ERROR_MSGS, CONSTANTS } from "../../utils";
import { alertActions, formAction } from "../../store/actions";
import { store } from "../../store";

const internetConnectionHandler = (online) => {
  store.dispatch(formAction.NO_INTERNET_CONNECTION(online));

  online && store.dispatch(alertActions.clear());
  !online &&
    store.dispatch(
      alertActions.error(
        ERROR_MSGS.EN.NETWORK_ERROR,
        CONSTANTS.ERROR_TYPE.TOAST,
        false
      )
    );
  return true;
};

export default internetConnectionHandler;
