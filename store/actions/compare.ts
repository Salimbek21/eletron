import {Dispatch} from "redux";
import {CompareAction, CompareActionTypes} from "../types/compare";
import {API_FetchCompare, API_FetchCompareClasses, API_ToggleComparison} from "../../api/compare";
import {errorNotifier} from "./Error-Notifier";

export const fetchCompare = (class_id: number | undefined = undefined) => {
    return async (dispatch: Dispatch<CompareAction>) => {
        await API_FetchCompare(class_id).then((res: any) => {
            dispatch({
                type: CompareActionTypes.FETCH_COMPARE,
                payload: {
                    features: res.data.data.features,
                    products: res.data.data.products
                }
            })
        }).catch((e: any) => errorNotifier(e))
    }
}

export const fetchCompareClasses = () => {
    return async (dispatch: Dispatch<CompareAction>) => {
        await API_FetchCompareClasses()
            .then((res: any) => {
                dispatch({
                    type: CompareActionTypes.FETCH_COMPARE_CLASSES,
                    payload: res.data.data.classes
                })
            }).catch((e: any) => errorNotifier(e))
    }
}

export const toggleCompare = (product_id: number, class_id: number | undefined = undefined) => {
    return async (dispatch: Dispatch<CompareAction>) => {
        await API_ToggleComparison(product_id)
            .then(async (res: any) => {
                dispatch({
                    type: CompareActionTypes.TOGGLE_COMPARE,
                    payload: true
                })
            })
            .catch((e: any) => {
                errorNotifier(e)
                dispatch({
                    type: CompareActionTypes.TOGGLE_COMPARE,
                    payload: false
                })
            });
    }
}
