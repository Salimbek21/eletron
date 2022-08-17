import {httpGet, httpPost} from "./index";

export const API_generateCode = (data: any) => httpPost({
   url: "/api/auth/code/create/",
   data,
});

export const API_updateCode = (data: any) => httpPost({
   url: "/api/auth/code/update/",
   data,
});

export const API_codeVerify = (data: any) => httpPost({
   url: "/api/auth/verify/",
   data,
});

export const API_codeUpdate = (data: any) => httpPost({
   url: "/api/user/phone/update/",
   data,
});

export const API_forgotPassword = (data: any) => httpPost({
   url: "/api/auth/password/forgot/",
   data,
});

export const API_userRegister = (data: any) => httpPost({
   url: "/api/auth/signup/",
   data,
});

export const API_userLogin = (data: any) => httpPost({
   url: "/api/auth/login/",
   data,
});

export const API_userRefreshToken = (rt: any) => httpPost({
   url: "/api/auth/refresh/token/",
   data: {
      refresh_token: rt,
      provider: "users",
   },
});

export const API_userLogout = (dt: any) => httpGet({
   url: "/api/auth/logout/",
   headers: {
      "Device-Token": dt,
   },
});

export const API_userPassChange = (data: any,) => httpPost({
   url: '/api/auth/password/change',
   data
})