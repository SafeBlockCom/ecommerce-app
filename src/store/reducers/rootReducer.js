import { combineReducers } from "redux";
import { persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage/session";

import alertReducer from "./alert.reducer";
import errorReducer from "./error.reducer";
import loadingReducer from "./loading.reducer";
import metadataReducer from "./metadata.reducer";
import productsReducer from "./products.reducer";
import homeReducer from "./home.reducer";
import menuReducer from "./menu.reducer";
import authReducer from "./auth.reducer";
import closetReducer from "./closet.reducer";
import orderReducer from "./order.reducer";

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

const metaConfig = {
  key: "meta",
  storage,
  whitelist: [
    "meta",
    "banners",
    "brands",
    "authBanners",
    "homeContent",
    "mainMenuCategories",
    "metaCountryList",
    "subscription",
  ],
};

const homeConfig = {
  key: "home",
  storage,
};

const menuConfig = {
  key: "menu",
  storage,
};
const authConfig = {
  key: "auth",
  storage,
  blacklist: [
    "authLoading",
    "sendOTP",
    "retryOtp",
    "isLoggedIn",
    "isVerified",
    "isVerificationAttempt",
    "isVerificationAttemptPhone",
    "customerMetaRequested",
  ],
};

const closetConfig = {
  key: "closet",
  storage,
};
const productsConfig = {
  key: "products",
  storage,
  whitelist: [
    "addedProduct",
    "brands",
    "categories",
    "color",
    "condition",
    "size",
    "standard",
  ],
};
const orderConfig = {
  key: "order",
  storage,
  whitelist: [
    "order_ref",
    "payment_initiated",
    "payment_completed",
    "billing_details",
    "requires_action",
    "order",
    "order_completed",
  ],
};

const rootReducer = combineReducers({
  alert: alertReducer,
  error: persistReducer(errorPersistConfig, errorReducer),
  loading: persistReducer(loadingPersist, loadingReducer),
  metadata: persistReducer(metaConfig, metadataReducer),
  auth: persistReducer(authConfig, authReducer),
  closet: persistReducer(closetConfig, closetReducer),
  menu: persistReducer(menuConfig, menuReducer),
  products: persistReducer(productsConfig, productsReducer),
  home: persistReducer(homeConfig, homeReducer),
  order: persistReducer(orderConfig, orderReducer),
});

export default rootReducer;
