import {Dispatch} from "redux";
import {ProfileAction, ProfileActionTypes} from "../types/profile";
import {
   API_userAddresses,
   API_userInfo,
   API_userInfoUpdate,
   API_userMainAddress,
   API_userOrdersHistory
} from "../../api/profile";
import {errorNotifier} from "./Error-Notifier";


export const profileInfo = () => async (dispatch: Dispatch<ProfileAction>) => {
   await API_userInfo()
       .then((res: any) => {
          dispatch({
             type: ProfileActionTypes.FETCH_USER_INFO,
             payload: res.data.data
          })
       })
       .catch((e: any) => errorNotifier(e))
}

export const updateProfileInfo = (data: any) => async (dispatch: Dispatch<ProfileAction>) => {
   await API_userInfoUpdate(data)
       .then((res: any) => {
          dispatch({
             type: ProfileActionTypes.UPDATE_USER_INFO,
             payload: res.data.data
          })
       })
       .catch((e: any) => errorNotifier(e))
}

export const getUserAddresses = () => async (dispatch: Dispatch<ProfileAction>) => {
   await API_userAddresses()
       .then((res: any) => {
          dispatch({type: ProfileActionTypes.FETCH_USER_ADDRESSES, payload: res.data.data})
       })
       .catch((e: any) => errorNotifier(e))
}

export const clearUserAddresses = () => async (dispatch: Dispatch<ProfileAction>) => {
   dispatch({type: ProfileActionTypes.CLEAR_USER_ADDRESSES, payload: []})
}

export const changeUserMainAddr = (id: number) => async (dispatch: Dispatch<ProfileAction>) => {
   await API_userMainAddress(id)
       .then(() => {
          dispatch({type: ProfileActionTypes.CHANGE_MAIN_ADDR, payload: true})
          dispatch({type: ProfileActionTypes.CHANGE_MAIN_ADDR, payload: false})
       })
}

export const getUserOrders = (params: any) => async (dispatch: Dispatch<ProfileAction>) => {
   await API_userOrdersHistory(params)
       .then((res: any) => {
          dispatch({
             type: ProfileActionTypes.FETCH_USER_ORDERS,
             payload: {
                orders: res.data.data,
                meta: res.data.meta
             }
          })
       })
       .catch((e: any) => errorNotifier(e))
}

export const getUserOrder = (id: number, code?: string) => async (dispatch: Dispatch<ProfileAction>) => {
   let params = {order_id: id}
   if (code && code.length) {
      // @ts-ignore
      params = {...params, code}
   }
   await API_userOrdersHistory(params)
       .then((res: any) => {
          dispatch({
             type: ProfileActionTypes.FETCH_USER_ORDER,
             payload: res.data.data
          })
       })
       .catch((e: any) => errorNotifier(e))
}

export const clearUserOrder = () => async (dispatch: Dispatch<ProfileAction>) => {
   dispatch({
      type: ProfileActionTypes.FETCH_USER_ORDER,
      payload: undefined
   })
}