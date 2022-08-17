import {API_fetchFilters} from "../../api/filter";
import {Dispatch} from "redux";
import {FilterAction, FilterActionTypes} from "../types/filter";
import {errorNotifier} from "./Error-Notifier";

export function fetchFilters(params:any) {
    return async (dispatch: Dispatch<FilterAction>) => {
        await API_fetchFilters(params)
            .then((res: any) => {
                dispatch({
                    type: FilterActionTypes.FETCH_FILTERS,
                    payload: res.data
                });
            })
            .catch((e: any) => {
                errorNotifier(e)
            });
    };
}