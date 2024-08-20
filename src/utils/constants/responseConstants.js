const DIALOG = {
  CATEGORY: {
    POPUP: "POPUP",
    MODAL: "MODAL",
  },
  TYPE: {
    POPUP: {
      ORDER_EXPIRED: "ORDER_EXPIRED_POPUP",
      LANGUAGE: "LANGUAGE_POPUP",
    },
    MODAL: {
      TERMS: "TERMS_POPUP",
      PRIVACY: "PRIVACY_POPUP",
    },
  },
};

const ERROR_TYPE = {
  TOAST: "TOAST",
  ALERT: "ALERT",
};

const APP_ALERT_TYPE = {
  DEFAULT: 1,
  CUSTOM: 2,
};

const HTTP_RESPONSE = {
  SUCCESS: 200,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  INPROCESSIBLE: 422,
  SERVER_ERROR: 500,
  UNDER_MAINTAINANCE: 503,
};

export const CONSTANTS = {
  // Payment Screen
  DEFAULT_PAYMENT_METHOD_UI: "none",
  EASYPAISA_PAYMENT_METHOD_UI: "mobile_account_number",
  CC_PAYMENT_METHOD_UI: "credit_card",
  DIALOG,
  ERROR_TYPE,
  APP_ALERT_TYPE,
  YES: 1,
  NO: 0,
  //API RESPONSE
  HTTP_RESPONSE,
  //GENERAL
  IS_RTL: "rtl",
  IS_URDU: "ur",
  IS_ENGLISH: "en",
  ALERTS: {
    GROUP: {
      default: 1,
      custom: 2,
    },
    WEB_TYPE: {
      error: "error",
      success: "success",
      secondary: "info",
      warning: "warning",
      clear: "clear",
    },
    MOBILE_TYPE: {
      default: "default",
      clear: "clear",
    },
  },
  DISCOUNT_TYPE_NAME: {
    FLAT: 1,
    PERCENTAGE: 2,
  },
  PRODUCT_ADDED: {
    PHOTO_AND_DESCRIPTION: "photo_and_description",
    ITEM_INFORMATION: "item_information",
    SHIPMENT_AND_LOCATION: "shipment_and_location",
    VARIANTS: "product_variants",
  },
};
