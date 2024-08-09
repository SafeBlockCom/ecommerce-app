export const logoutAction = {
  CLEAR_REDUX_STORE,
};

function CLEAR_REDUX_STORE() {
  return (dispatch) => {
    dispatch(request());
  };
  // APP.RESET
  function request() {
    return { type: null };
  }
}


