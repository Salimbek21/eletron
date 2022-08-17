import {Dispatch} from "redux";
import {CheckoutAction, CheckoutActionTypes} from "../types/checkout";
import {notifyError} from "../../helpers/NotifyBtn";
import {API_Cities, API_DeliveryOptions, API_MakeOrder, API_PaymentOptions} from "../../api/checkout";
import {errorNotifier} from "./Error-Notifier";

export const createOrder = (data: any) => async (dispatch: Dispatch<CheckoutAction>) => {
   await API_MakeOrder(data).then((res: any) => {
      dispatch({type: CheckoutActionTypes.MAKE_ORDER, payload: {created: true, order: res.data.data}})
      dispatch({type: CheckoutActionTypes.MAKE_ORDER, payload: {created: false, order: undefined}})
   }).catch((e: any) => errorNotifier(e))
}

export function fetchDeliveryOptions() {
   return async (dispatch: Dispatch<CheckoutAction>) => {
      await API_DeliveryOptions()
          .then((res: any) => {
             dispatch({
                type: CheckoutActionTypes.FETCH_DELIVERY_TYPES,
                payload: res.data.data
             });
          })
          .catch((e: any) => {
             errorNotifier(e);
          });
   };
}

export function fetchPaymentOptions() {
   return async (dispatch: Dispatch<CheckoutAction>) => {
      await API_PaymentOptions()
          .then((res: any) => {
             dispatch({
                type: CheckoutActionTypes.FETCH_PAYMENT_TYPES,
                payload: res.data.data
             });
          })
          .catch((e: any) => {
             errorNotifier(e);
          });
   };
}

export const fetchCities = () => async (dispatch: Dispatch<CheckoutAction>) => {
   await API_Cities().then((res: any) => dispatch(
       {type: CheckoutActionTypes.FETCH_CITIES, payload: res.data.data}
   )).catch((e: any) => notifyError(e))
}