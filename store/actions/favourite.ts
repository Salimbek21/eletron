import {Dispatch} from "redux";
import {FavouriteAction, FavouriteActionTypes} from "../types/favourite";
import {API_FetchFavourites, API_ToggleFavourite} from "../../api/favourite";
import {errorNotifier} from "./Error-Notifier";

export const fetchFavourites = (page: number) => {
   return async (dispatch: Dispatch<FavouriteAction>) => {
      dispatch({
         type: FavouriteActionTypes.FETCH_FAVOURITES,
         payload: {loading: true}
      })
      await API_FetchFavourites(page).then((res: any) => {
         dispatch({
            type: FavouriteActionTypes.FETCH_FAVOURITES,
            payload: {
               products: res.data.data,
               meta: res.data.meta,
               loading: false
            }
         })
      }).catch((e: any) => {
         errorNotifier(e)
         dispatch({type: FavouriteActionTypes.FETCH_FAVOURITES, payload: {loading: false}})
      })
   }
}


export const toggleFavourite = (product_id: number) => {
   return async (dispatch: Dispatch<FavouriteAction>) => {
      await API_ToggleFavourite(product_id)
          .then(async (res: any) => {
             dispatch({
                type: FavouriteActionTypes.TOGGLE_FAVOURITE,
                payload: true
             })
          })
          .catch((e: any) => {
             errorNotifier(e)
             dispatch({
                type: FavouriteActionTypes.TOGGLE_FAVOURITE,
                payload: false
             })
          });
   }
}