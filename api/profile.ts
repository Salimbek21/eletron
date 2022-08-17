import {httpGet, httpPost} from "./index";

const userApi = '/api/user'

export const API_userInfo = () => httpGet({
   url: `${userApi}/info/`
});

export const API_userAddresses = () => httpGet({
   url: `${userApi}/address`
})

export const API_userMainAddress = (id: number) => httpPost({
   url: `${userApi}/address/main/${id}`
})

export const API_userInfoUpdate = (data:any) => httpPost({
   url: `${userApi}/info/update`,
   data,
   headers: {"Content-Type": "multipart/form-data"}
});

export const API_userOrdersHistory = (params: any) => httpGet({
   url: `${userApi}/orders`,
   params: {
      per_page: 10,
      ...params
   }
});