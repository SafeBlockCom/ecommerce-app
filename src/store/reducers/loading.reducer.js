import { ACTION_CONSTANTS } from "../actionTypes";

import queryString from "query-string";

const initState = {
  showPageLoader: false,
  showBtnLoader: false,
  disableNextBtn: false,
  showBackBtnLoader: false,
  loadingStatus: 2.5,
  callProfileApi: false,
  placeOrder: false,
  splashLoading: true,
  showPleaseWaitLoader: false,
};

// Save query string parameters

const loadingReducer = (state = initState, action) => {
  switch (action.type) {
    case ACTION_CONSTANTS.SHOW_PAGE_LOADER:
      return {
        ...state,
        showPageLoader: true,
      };
    default:
      return state;
  }
};
export default loadingReducer;
