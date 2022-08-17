import {Product} from "./product";
import {PageMeta} from "./category";

export interface FavouriteState {
   favouriteProducts: Product[]
   meta: PageMeta,
   favLoading: boolean
}

export enum FavouriteActionTypes {
   FETCH_FAVOURITES = "FETCH_FAVOURITES",
   TOGGLE_FAVOURITE = "TOGGLE_FAVOURITE"
}

interface FetchFavouritesAction {
   type: FavouriteActionTypes.FETCH_FAVOURITES,
   payload: {
      meta?: PageMeta,
      products?: Product[],
      loading: boolean
   }
}

interface ToggleFavouriteAction {
   type: FavouriteActionTypes.TOGGLE_FAVOURITE,
   payload: boolean
}

export type FavouriteAction = FetchFavouritesAction | ToggleFavouriteAction