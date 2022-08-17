import {SearchAction, SearchActionTypes, SearchState} from "../types/search";

const initialState: SearchState = {
   searchProducts: [],
   searchMeta: {},
   searchLoading: false
}

const searchReducer = (state = {...initialState}, action: SearchAction): SearchState => {
   switch (action.type) {
      case SearchActionTypes.GET_SEARCH:
         return {
            ...state,
            searchProducts: action.payload,
            searchMeta: action.meta,
            searchLoading: action.loading
         }

      case SearchActionTypes.CLEAR_SEARCH:
         return {
            ...state,
            searchProducts: action.payload,
            searchMeta: action.meta,
            searchLoading: action.loading
         }

      default:
         return state
   }
}

export default searchReducer