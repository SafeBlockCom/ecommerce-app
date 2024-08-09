import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";

import alertReducer from "./alert.reducer";
import errorReducer from "./error.reducer";
import loadingReducer from "./loading.reducer";

const errorPersistConfig = {
  key: "error",
  storage: storage,
  whitelist: [],
};

const loadingPersist = {
  key: "loading",
  storage: storage,
  whitelist: ["splashLoading"],
};

const rootReducer = combineReducers({
  alert: alertReducer,
  error: persistReducer(errorPersistConfig, errorReducer),
  loading: persistReducer(loadingPersist, loadingReducer),
});

export default rootReducer;
