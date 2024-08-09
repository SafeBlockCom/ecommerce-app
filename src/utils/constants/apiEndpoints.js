export const API_ENDPOINTS = {
  // Customer
  GET_ADDRESS: "v1/customer/address",
  UPDATE_ADDRESS: "v1/customer/address",
  ADD_ADDRESS: "v1/customer/address",
  DELETE_ADDRESS: "v1/customer/address",

  CUSTOMER_PROFILE: "v1/customer/profile",
  UPDATE_CUSTOMER_PROFILE: 'v1/multipage/order/customer/profile/update',

  ORDER_CANCEL: "v1/customer/order/change-status",

  GET_LOCATION_DETAILS: "v1/customer/get-location-details",

  // VALIDATE ACCESS TOKEN
  IDENTIFY_CUSTOMER: "v1/token/identify-customer",

  // ORDER - ADDRESS
  UPDATE_ORDER_ADDRESS: "v1/order/customer-address",

  // ORDER - PAYMENT METHOD
  GET_ALL_PAYMENT_METHODS: "v1/multipage/order/payment-method",
  SET_PAYMENT_METHOD: "v1/multipage/order/payment-method",
  VALIDATE_PAYMENT_METHOD: "v1/multipage/order/validate-payment",
  SET_DEFAULT_PAYMENT_METHOD: "v1/multipage/order/set-default-payment-method",

  DELETE_SAVED_CARD: "v1/order/customer/instrument",
  PAYMENT_PROCESSOR_DETAIL: "v1/order/payment-processor-detail",
  SAVE_PAYMENT_INSTRUMENT: "v1/order/save-payment-instrument",

  // ORDER - SHIPPING METHOD
  GET_ALL_SHIPMENT_METHODS: "v1/multipage/order/shipment-method",
  SET_SHIPMENT_METHOD: "v1/multipage/order/shipment-method",

  // ORDER
  INITIATE_ORDER: "v1/multipage/order/initiate",
  INITIATE_ORDER_ABANDONED: "v1/multipage/order/abandoned-checkout/initiate",
  INITIATE_CATLOG_ORDER: "v1/product-catalogue/create-order",
  GET_CART_DETAILS: "v1/multipage/order/checkout-detail",
  PLACE_ORDER: "v1/multipage/order/place",

  UPDATE_CART_ITEMS: "v1/order/cart-details", 
  APPLY_VOUCHER: "v1/order/apply-voucher",
  APPLY_VOUCHERIFY_VOUCHER: "v1/order/apply-voucherify-voucher",
  GET_PAYMENT_INFO: "v1/order/get-payment-info",
  
  // OTP
  CHECKOUT_OTP_SEND: "v1/checkout/otp/send",
  OTP_SEND: "v1/otp/send",
  OTP_VERIFY: "v1/otp/verify",
  OTP_RESEND: "v1/otp/resend",

  // META
  GET_META: "v1/metadata",
  GET_COUNTRY_DROPDOWN_LIST: "v1/countries-dropdown-list",
  GET_ALL_NETWORKS: "v1/network-providers/list",
};
