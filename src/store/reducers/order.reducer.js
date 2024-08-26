import { ORDER_CONSTANTS, RESET_DETAILS } from "../actionTypes";

const initialState = {
  order_ref: "",
  payment_initiated: false,
  payment_completed: false,
  order_completed: 0,
  payment_intent_client_secret: "",
  requires_action: 0,
  payment_succeded: 0,
  billing_details: {},
  order: {},
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case RESET_DETAILS:
      return initialState;
    case ORDER_CONSTANTS.CREATE_ORDER.REQUEST:
      return {
        ...state,
        loading: true,
      };
    case ORDER_CONSTANTS.CREATE_ORDER.SUCCESS:
      return {
        ...state,
        order_ref: action?.response?.order_ref,
      };
    case ORDER_CONSTANTS.CREATE_ORDER.FAILURE:
      return {
        ...state,
      };
    case ORDER_CONSTANTS.ORDER_PAYMENT.REQUEST:
      return {
        ...state,
        payment_initiated: true,
        billing_details: action.response.orderData?.billing_details,
      };
    case ORDER_CONSTANTS.ORDER_PAYMENT.SUCCESS:
      return {
        ...state,
        payment_completed: true,
        order_completed: action?.response?.order_completed,
        payment_intent_client_secret:
          action?.response?.payment_intent_client_secret,
        requires_action: action?.response?.requires_action,
        order: action?.response?.order,
      };
    case ORDER_CONSTANTS.ORDER_PAYMENT.FAILURE:
      return {
        ...state,
        payment_completed: true,
      };
    case ORDER_CONSTANTS.ORDER_PAYMENT_SUCCEDED:
      return {
        ...state,
        payment_succeded: 1,
        payment_intent_client_secret: "",
        payment_initiated: false,
        payment_completed: false,
        order_completed: 0,
        requires_action: 0,
      };
    case ORDER_CONSTANTS.ORDER_STATUS.REQUEST:
      return {
        ...state,
      };
    case ORDER_CONSTANTS.ORDER_STATUS.SUCCESS:
      return {
        ...state,
        payment_completed: true,
        billing_details: action?.response?.billing_details,
        order: action?.response?.order,
        order_ref: "",
      };
    case ORDER_CONSTANTS.ORDER_STATUS.FAILURE:
      return {
        ...state,
      };
    default:
      return state;
  }
};
export default orderReducer;
