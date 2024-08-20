import { ERROR_CONSTANTS } from "../actionTypes";
import { apiService } from "../middlewares/api_service";
import { ALERT_ACTIONS } from "./index";
import { CONSTANTS, HELPER } from "../../utils";

export const shippingAction = {
  get_shipping_method,
};

function get_shipping_method(requestData) {
  return (dispatch) => {
    dispatch(request());
    apiService
      .getShippingMethods(requestData)
      .then((response) => {
        const responseStatus = response?.data?.status;
        if (
          !HELPER.isEmpty(responseStatus) &&
          responseStatus === CONSTANTS.HTTP_RESPONSE.SUCCESS
        ) {
          const data = response?.data?.body;
          const shipment_methods = data.shipment_methods;
          let selectedIndex = Object.keys(shipment_methods).find(
            (key) =>
              shipment_methods[key].is_active === 1 &&
              shipment_methods[key].shipment_enabled === 1
          );
          if (HELPER.isEmpty(selectedIndex)) {
            let _selectedIndex = Object.keys(shipment_methods).find(
              (key) => shipment_methods[key].shipment_enabled === 1
            );
            selectedIndex = shipment_methods[_selectedIndex];
          } else {
            selectedIndex = shipment_methods[selectedIndex];
          }
          dispatch(success(data, selectedIndex));
        }
      })
      .catch((error) => {
        const error_response = error?.response;
        const error_message = "";
        // const errorBody = error_response?.data?.body;

        if (error_response?.status === CONSTANTS.HTTP_RESPONSE.SERVER_ERROR) {
          dispatch(errorPage(error_message));
        } else {
          dispatch(failure(error_message?.message));
          dispatch(ALERT_ACTIONS.error(error_message?.message));
        }
      });
  };

  function errorPage(error) {
    return { type: ERROR_CONSTANTS.ERROR, error };
  }
  function request() {
    // return { type: SHIPMENT_CONSTANTS.GET_MERCHANT_SHIPMENT_METHODS_REQUEST };
  }
  function success(data, selectedIndex) {
    return {
      // type: SHIPMENT_CONSTANTS.GET_MERCHANT_SHIPMENT_METHODS_SUCCESS,
      response: data,
      selectedIndex,
    };
  }
  function failure() {
    // return { type: SHIPMENT_CONSTANTS.GET_MERCHANT_SHIPMENT_METHODS_FAILURE };
  }
}
