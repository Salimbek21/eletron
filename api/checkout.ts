import {httpGet, httpPost} from "./index";


export const API_DeliveryOptions = () =>  httpGet({
   url: '/api/order/deliveries'
})

export const API_PaymentOptions = () =>  httpGet({
   url: '/api/order/payments'
})

export const API_Cities = () => httpGet({
   url: '/api/cities'
})

export const API_MakeOrder = (data: any) => httpPost({
   url: '/api/order/create',
   data
})