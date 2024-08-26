import { apiService } from "../../store/middlewares/api_service";
import { ORDER_CONSTANTS } from "../actionTypes";
import { CONSTANTS, HELPER } from "../../utils";
import { ALERT_ACTIONS } from "./alertActions";

export const ORDER_ACTIONS = {
  CREATE_ORDER,
  PAY,
  ORDER_STATUS,
};

function CREATE_ORDER(orderData) {
  return (dispatch, getState) => {
    dispatch(request());
    apiService
      .createOrder(orderData)
      .then((response) => {
        const responseStatus = response?.data?.status;
        if (
          !HELPER.isEmpty(responseStatus) &&
          responseStatus === CONSTANTS.HTTP_RESPONSE.SUCCESS
        ) {
          const data = response?.data?.body;
          dispatch(success(data));
        }
      })
      .catch((error) => {
        const { error_message } = HELPER.formatFailureApiResponse(error);
        dispatch(failure(error_message?.message));
        dispatch(ALERT_ACTIONS.error(error_message?.message));
      });
  };

  function request() {
    return { type: ORDER_CONSTANTS.CREATE_ORDER.REQUEST };
  }
  function success(response) {
    return {
      type: ORDER_CONSTANTS.CREATE_ORDER.SUCCESS,
      response,
    };
  }
  function failure() {
    return { type: ORDER_CONSTANTS.CREATE_ORDER.FAILURE };
  }
}

function PAY(stripe, orderData) {
  return (dispatch, getState) => {
    dispatch(request({ orderData }));
    apiService
      .pay(orderData)
      .then(async (response) => {
        const responseStatus = response?.data?.status;
        if (
          !HELPER.isEmpty(responseStatus) &&
          responseStatus === CONSTANTS.HTTP_RESPONSE.SUCCESS
        ) {
          const data = response?.data?.body;
          const {
            payment_intent,
            payment_intent_client_secret,
            payment_method_id,
          } = data;

          // Step 2: Confirm the PaymentIntent with the created PaymentMethod
          const { error: piError, paymentIntent } =
            await stripe.confirmCardPayment(payment_intent_client_secret, {
              payment_method: payment_method_id,
            });
          if (piError) {
            // Handle error here
            console.error(piError.message);
          } else if (paymentIntent?.status == "succeeded") {
            // Payment succeeded, redirect the user to a success page or handle accordingly
            dispatch({ type: ORDER_CONSTANTS.ORDER_PAYMENT_SUCCEDED });
          } else if (paymentIntent.status === "requires_action") {
            // The payment requires further action (e.g., 3D Secure authentication)
          } else {
            // Handle other statuses such as 'requires_payment_method'
            console.error("Payment failed:", paymentIntent.status);
            // Redirect or handle failure as appropriate
          }
          dispatch(success(data));
        }
      })
      .catch((error) => {
        const { error_message } = HELPER.formatFailureApiResponse(error);
        dispatch(failure(error_message?.message));
        dispatch(ALERT_ACTIONS.error(error_message?.message));
      });
  };

  function request(response) {
    return { type: ORDER_CONSTANTS.ORDER_PAYMENT.REQUEST, response };
  }
  function success(response) {
    return {
      type: ORDER_CONSTANTS.ORDER_PAYMENT.SUCCESS,
      response,
    };
  }
  function failure() {
    return { type: ORDER_CONSTANTS.ORDER_PAYMENT.FAILURE };
  }
}

function ORDER_STATUS(ref) {
  return (dispatch, getState) => {
    dispatch(request());
    apiService
      .orderStatus({ order_ref: ref })
      .then((response) => {
        const responseStatus = response?.data?.status;
        if (
          !HELPER.isEmpty(responseStatus) &&
          responseStatus === CONSTANTS.HTTP_RESPONSE.SUCCESS
        ) {
          const data = response?.data?.body;
          dispatch(success(data));
        }
      })
      .catch((error) => {
        const { error_message } = HELPER.formatFailureApiResponse(error);
        dispatch(failure(error_message?.message));
        dispatch(ALERT_ACTIONS.error(error_message?.message));
      });
  };

  function request() {
    return { type: ORDER_CONSTANTS.ORDER_STATUS.REQUEST };
  }
  function success(response) {
    return {
      type: ORDER_CONSTANTS.ORDER_STATUS.SUCCESS,
      response,
    };
  }
  function failure() {
    return { type: ORDER_CONSTANTS.ORDER_STATUS.FAILURE };
  }
}
