import {Dispatch} from "redux";
import {SearchAction, SearchActionTypes} from "../types/search";
import {API_Search} from "../../api/search";
import {errorNotifier} from "./Error-Notifier";

export const getSearchResults = (search: string, page = 1) => {
   return async (dispatch: Dispatch<SearchAction>) => {
      await API_Search(search, page).then((res: any) => {
         dispatch({
            type: SearchActionTypes.GET_SEARCH,
            payload: res.data.data || [],
            meta: res.data.meta || {},
            loading: false
         })
      }).catch((e: any) => {
         errorNotifier(e)
      });
   }
}

export const clearSearchResults = () => {
   return async (dispatch: Dispatch<SearchAction>) => {
      dispatch({
         type: SearchActionTypes.CLEAR_SEARCH,
         payload: [],
         meta: {},
         loading: true
      })
   }
}