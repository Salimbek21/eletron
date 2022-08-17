import {Dispatch} from "redux";
import {CartAction, CartActionTypes} from "../types/cart";
import {API_AddToCart, API_DeleteFromCart, API_fetchCart} from "../../api/cart";
import {errorNotifier} from "./Error-Notifier";

export function fetchCart(params: any | undefined = undefined) {
   return async (dispatch: Dispatch<CartAction>) => {
      dispatch({
         type: CartActionTypes.FETCH_CART,
         payload: {
            cart: {},
            cartLoading: true
         },
      });
      await API_fetchCart(params)
          .then((res: any) => {
             dispatch({
                type: CartActionTypes.FETCH_CART,
                payload: {
                   cart: res.data.data,
                   cartLoading: false
                },
             });
          })
          .catch((e: any) => {
             errorNotifier(e);
             dispatch({
                type: CartActionTypes.FETCH_CART,
                payload: { cart: {}, cartLoading: false },
             });
          });
   };
}

export function addToCart(id: number, quantity: number) {
   return async (dispatch: Dispatch<CartAction>) => {
      dispatch({
         type: CartActionTypes.ADD_TO_CART,
         payload: { adding: true }
      })
      await API_AddToCart(id, quantity)
         .then((res: any) => {
            dispatch({
               type: CartActionTypes.ADD_TO_CART,
               payload: { cart: res.data.data, adding: false }
            });
         })
         .catch((e: any) => {
            errorNotifier(e)
            dispatch({
               type: CartActionTypes.ADD_TO_CART,
               payload: { adding: false }
            })
         });
   };
}

export function deleteFromCart(id:number) {
   return async (dispatch: Dispatch<CartAction>) => {
      await API_DeleteFromCart(id)
          .then((res:any) => {
             dispatch({
                type: CartActionTypes.DELETE_FROM_CART,
                payload: res.data.data
             })
          })
          .catch((e:any) => {
             errorNotifier(e)
          })
   }
}
