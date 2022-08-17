import {httpDelete, httpGet, httpPost} from "./index";

export const API_fetchCart = (params: any = undefined) => httpGet({
   url: "/api/cart/show",
   params
});

export const API_AddToCart = (id: number, quantity: number) =>
    httpPost({
       url: "/api/cart/add",
       data: {
          item_shop_id: id,
          quantity,
       },
    });

export const API_DeleteFromCart = (id: number) =>
    httpDelete({
       url: '/api/cart/delete',
       data: {item_shop_id: id}
    })