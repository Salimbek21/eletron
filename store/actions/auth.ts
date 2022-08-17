import {
   API_codeUpdate,
   API_codeVerify, API_forgotPassword,
   API_generateCode, API_updateCode,
   API_userLogin,
   API_userLogout, API_userPassChange,
   API_userRefreshToken,
   API_userRegister
} from "../../api/auth";
import {notifyError, notifySuccess} from "../../helpers/NotifyBtn";
import Cookies from "universal-cookie";
import {Dispatch} from "redux";
import {AuthAction, AuthActionTypes} from "../types/auth";
import {ProfileActionTypes, ProfileAction} from "../types/profile";
import {errorNotifier} from "./Error-Notifier";

const cookies = new Cookies();

/* ----------------------------------------------Registration */

export const authGenerateCode = (data: any) => async (dispatch: Dispatch<AuthAction>) => {
   await API_generateCode(data)
       .then((res: any) => {
          dispatch({type: AuthActionTypes.GENERATE_CODE, payload: res.data})
       })
       .catch((e: any) => errorNotifier(e))
}

export const authVerifyPhone = (data: any) => async (dispatch: Dispatch<AuthAction>) => {
   await API_codeVerify(data)
       .then((res: any) => {
          dispatch({type: AuthActionTypes.VERIFY_PHONE, payload: res.data})
       })
       .catch((e: any) => errorNotifier(e))
}

export const authUpdatePhone = (data: any) => async (dispatch: Dispatch<ProfileAction>) => {
   await API_codeUpdate(data)
       .then((res: any) => {
          dispatch({type: ProfileActionTypes.UPDATE_USER_INFO, payload: res.data.data})
          notifySuccess("Вы изменили номер")
       })
       .catch((e: any) => errorNotifier(e))
}

export const authRegister = (data: any) => async (dispatch: Dispatch<AuthAction>) => {
    let shopID = new URLSearchParams(location.search).get("shop_id");
    if(shopID !== null) {
        data['shop_id'] = shopID
        await API_userRegister(data)
            .then((res: any) => {
                auth_cookies_setter(res.data)
                dispatch({
                    type: AuthActionTypes.AUTH_REGISTER, payload: res.data,
                })
            })
            .catch((e: any) => errorNotifier(e))
    } else {
        await API_userRegister(data)
            .then((res: any) => {
                auth_cookies_setter(res.data)
                dispatch({
                    type: AuthActionTypes.AUTH_REGISTER, payload: res.data,
                })
            })
            .catch((e: any) => errorNotifier(e))
    }
}

/* ----------------------------------------------Login Logout */
export const authLogin = (data: any) => async (dispatch: Dispatch<AuthAction>) => {
   await API_userLogin(data)
       .then((res: any) => {
          if (res.data.access_token) {
             auth_cookies_setter(res.data)
             dispatch({type: AuthActionTypes.AUTH_LOGIN, payload: true})
          } else
             notifyError("Неверный пароль")
          dispatch({type: AuthActionTypes.AUTH_LOGIN, payload: false})
       })
       .catch((e: any) => errorNotifier(e))
}

export const authLogout = () => async (dispatch: Dispatch<AuthAction>) => {
   const cookies = new Cookies();
   await API_userLogout(cookies.get('device_token'))
       .then((res: any) => {
          cookies.remove("access_token", {path: "/"});
          cookies.remove("refresh_token", {path: "/"});
          cookies.remove("user_id", {path: "/"});

          dispatch({type: AuthActionTypes.AUTH_LOGOUT, payload: true})
          dispatch({type: AuthActionTypes.AUTH_LOGOUT, payload: false})
       })
       .catch((e: any) => errorNotifier(e))
}

export const refreshToken = (refr_token: any) => async (dispatch: Dispatch<AuthAction>) => {
   await API_userRefreshToken(refr_token)
       .then((res: any) => {
          auth_cookies_setter(res.data)
          dispatch({type: AuthActionTypes.REFRESH_TOKEN, payload: res.data})
       })
       .catch((e: any) => errorNotifier(e))
}


/* ----------------------------------------------Forgot Password */
export const authUpdateCode = (data: any) => async (dispatch: Dispatch<AuthAction>) => {
   await API_updateCode(data)
       .then((res: any) => {
          dispatch({type: AuthActionTypes.UPDATE_CODE, payload: res.data})
          notifySuccess(res.data?.message || "Вы изменили номер")
       })
       .catch((e: any) => errorNotifier(e))
}

export const authPasswordUpdate = (data: any) => async (dispatch: Dispatch<AuthAction>) => {
   await API_forgotPassword(data)
       .then(() => {
          dispatch({type: AuthActionTypes.AUTH_PASS_FORGOT, payload: true})
          dispatch({type: AuthActionTypes.AUTH_PASS_FORGOT, payload: false})
       })
       .catch((e: any) => errorNotifier(e))
}

export const authPasswordChange = (data: any) => async (dispatch: Dispatch<AuthAction>) => {
   await API_userPassChange(data)
       .then((r: any) => {
          notifySuccess(r.data.message)
       })
       .catch((e: any) => errorNotifier(e))
}

// export function clearUserRegister() {
//    return async dispatch => {
//       dispatch({
//          type: actions.CLEAR_REGISTER,
//          payload: ''
//       })
//    }
// }

// export function userInfo() {
//    return async dispatch => {
//
//       await userInfoAPI().then(response => {
//          dispatch({
//             type: actions.FETCH_USER,
//             payload: response.data.data
//          })
//       }).catch(e => console.log(e));
//    }
// }

// export function updateUserInfo(data) {
//    return async dispatch => {
//       await userInfoUpdateAPI(data).then(res => {
//          dispatch({
//             type: actions.USER_UPDATE,
//             payload: res.data.data
//          });
//          notifySuccess('Информация о пользователе обновлена')
//       }).catch(e => notifyError(e.data.message));
//    }
// }

// export function userInfoClean() {
//    return async dispatch => {
//       dispatch({
//          type: actions.CLEAN_USER_INFO,
//          payload: {}
//       })
//    }
// }

// export function getOrdersHistory() {
//    return async dispatch => {
//       await userOrdersHistoryAPI().then(res => {
//          dispatch({
//             type: actions.FETCH_ORDERS,
//             payload: res.data.data
//          })
//       })
//    }
// }

const auth_cookies_setter = (data: any) => {
   const today = new Date();
   const days14 = new Date();
   const days15 = new Date();
   days14.setDate(today.getDate() + 14);
   days15.setDate(today.getDate() + 15);
   cookies.set('access_token', data.access_token, {
      path: '/',
      expires: days14
   });
   cookies.set("refresh_token", data.refresh_token, {
      path: "/",
      expires: days15
   });
   cookies.set("user_id", data.user_id, {
      path: "/"
   });
}