import {FavouriteState, FavouriteAction, FavouriteActionTypes} from "../types/favourite";

const initialState: FavouriteState = {
   favLoading: false,
   favouriteProducts: [],
   meta: {}
};

const FavouriteReducer = (state = {...initialState}, action: FavouriteAction
): FavouriteState => {
   switch (action.type) {
      case FavouriteActionTypes.FETCH_FAVOURITES:
         return {
            ...state,
            favouriteProducts: action.payload.products ? action.payload.products : state.favouriteProducts,
            meta: action.payload.meta ? action.payload.meta : state.meta,
            favLoading: action.payload.loading
         };
      case FavouriteActionTypes.TOGGLE_FAVOURITE:
         return {...state};

      default:
         return state;
   }
};

export default FavouriteReducer;
