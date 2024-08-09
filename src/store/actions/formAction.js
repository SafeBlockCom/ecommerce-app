import { FORM_CONSTANTS } from "../actionTypes";

export const formAction = {
  SHOW_LOADER,
  HIDE_LOADER,
  MAINTAIN_ROUTER_HISTORY,
  NO_INTERNET_CONNECTION,
};

function NO_INTERNET_CONNECTION(state) {
  return (dispatch) => {
    dispatch(request(state));
  };

  function request(state) {
    return { type: FORM_CONSTANTS.NO_INTERNET_CONNECTION, state };
  }
}

function SHOW_LOADER() {
  return (dispatch) => {
    dispatch(request());
  };

  function request() {
    return { type: FORM_CONSTANTS.SHOW_LOADER };
  }
}

function HIDE_LOADER() {
  return (dispatch) => {
    dispatch(request());
  };

  function request() {
    return { type: FORM_CONSTANTS.HIDE_LOADER };
  }
}

function MAINTAIN_ROUTER_HISTORY(route) {
  return (dispatch) => {
    dispatch(request(route));
  };

  function request(route) {
    return { type: FORM_CONSTANTS.MAINTAIN_ROUTER_HISTORY, route };
  }
}
