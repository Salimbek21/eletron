import {Dispatch} from "redux";
import {HomeAction, HomeActionTypes} from "../types/home";
import {API_HOME, API_HOME_Brands} from "../../api/home";
import {errorNotifier} from "./Error-Notifier";

export function fetchBrands() {
    return async (dispatch: Dispatch<HomeAction>) => {
        await API_HOME_Brands()
            .then((res: any) => {
                dispatch({
                    type: HomeActionTypes.FETCH_BRANDS,
                    payload: res.data.data,
                });
            })
            .catch((e: any) => {
                errorNotifier(e)
            });
    };
}

export function fetchHomeProducts(type: string) {
    return async (dispatch: Dispatch<HomeAction>) => {
        dispatch({
            type: HomeActionTypes.FETCH_SECTION_PRODUCTS,
            payload: {
                products: [],
                loading: true,
                type
            }
        })
        await API_HOME(type)
            .then((res: any) => {
                dispatch({
                    type: HomeActionTypes.FETCH_SECTION_PRODUCTS,
                    payload: {
                        products: res.data.data.product_request,
                        loading: false,
                        type
                    },
                });
            })
            .catch((e: any) => {
                errorNotifier(e)
            });
    };
}