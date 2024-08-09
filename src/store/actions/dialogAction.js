import { ACTION_CONSTANTS } from "../actionTypes";

export const dialogAction = {
  openDialog,
  closeDialog,
  openModal,
  reOpenModal,
  closeModal,
  openLanguagePopup,
  closeLanguagePopup,

};
// TERMS & CONDITIONS
function openLanguagePopup() {
  return (dispatch) => {
    dispatch(open());
  };
  function open() {
    return { type: ACTION_CONSTANTS.LANGUAGE_POPUP_OPEN };
  }
}

function closeLanguagePopup() {
  return (dispatch) => {
    dispatch(close());
  };

  function close() {
    return { type: ACTION_CONSTANTS.LANGUAGE_POPUP_CLOSE };
  }
}
// TERMS & CONDITIONS
function openDialog(category, type) {
  return (dispatch) => {
    dispatch(open({ category, type }));
  };
  function open(response) {
    return { type: ACTION_CONSTANTS.TERMS_OPEN, response };
  }
}

function closeDialog() {
  return (dispatch) => {
    dispatch(close());
  };

  function close() {
    return { type: ACTION_CONSTANTS.TERMS_CLOSE };
  }
}

function openModal() {
  return (dispatch) => {
    dispatch(open());
  };
  function open() {
    return { type: ACTION_CONSTANTS.MODAL_OPEN };
  }
}

function reOpenModal() {
  return (dispatch) => {
    dispatch(open());
  };
  function open() {
    return { type: ACTION_CONSTANTS.MODAL_REOPEN };
  }
}

// MODAL
function closeModal() {
  return (dispatch) => {
    dispatch(close());
  };

  function close() {
    return { type: ACTION_CONSTANTS.MODAL_CLOSE };
  }
}

