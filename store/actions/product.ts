import {Dispatch} from "redux";
import {ProductAction, ProductActionTypes} from "../types/product";
import {API_FetchSimilarProds} from "../../api/product";
import {errorNotifier} from "./Error-Notifier";


export function fetchSimilarProducts(product_id: number) {
    return async (dispatch: Dispatch<ProductAction>) => {
        dispatch({
            type: ProductActionTypes.FETCH_SIMILAR,
            payload: [],
            similarLoading: true
        })
        await API_FetchSimilarProds(product_id)
            .then((res: any) => {
                dispatch({
                    type: ProductActionTypes.FETCH_SIMILAR,
                    payload: res.data.data || [],
                    similarLoading: false
                })
            })
            .catch((e: any) => {
                errorNotifier(e)
            });
    }
}

export function clearSimilarProducts() {
    return async (dispatch: Dispatch<ProductAction>) => {
        dispatch({
            type: ProductActionTypes.CLEAR_SIMILAR,
            payload: []
        })
    }
}