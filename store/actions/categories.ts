import {
   API_fetchCategories,
   API_filter_category_products,
} from "../../api/categories";
import { Dispatch } from "redux";
import { CategoryAction, CategoryActionTypes } from "../types/category";
import {errorNotifier} from "./Error-Notifier";

export function fetchCategories() {
   return async (dispatch: Dispatch<CategoryAction>) => {
      await API_fetchCategories()
         .then((res: any) => {
            dispatch({
               type: CategoryActionTypes.FETCH_CATEGORIES,
               payload: res.data.data,
            });
         })
         .catch((e: any) => {
            errorNotifier(e);
         });
   };
}

export function fetchCategoryFilteredProducts(params: any) {
   return async (dispatch: Dispatch<CategoryAction>) => {
      dispatch({
         type: CategoryActionTypes.FETCH_CATEGORY_PRODUCTS,
         payload: {
            products: [],
            meta: {},
            loading: true,
         },
         params,
      });
      await API_filter_category_products(params)
         .then((res: any) => {
            dispatch({
               type: CategoryActionTypes.FETCH_CATEGORY_PRODUCTS,
               payload: {
                  products: res.data.data,
                  meta: res.data.meta,
                  loading: false,
               },
               params,
            });
         })
         .catch((e: any) => {
            errorNotifier(e);
            dispatch({
               type: CategoryActionTypes.FETCH_CATEGORY_PRODUCTS,
               payload: {
                  products: [],
                  meta: {},
                  loading: false,
               },
               params,
            });
         });
   };
}

export function clearFilteredProducts(meta: any) {
   return async (dispatch: Dispatch<CategoryAction>) => {
      dispatch({
         type: CategoryActionTypes.CLEAR_FILTER_CAT_PRODUCTS,
         payload: {
            products: [],
            meta,
            loading: false,
         },
      });
   };
}
