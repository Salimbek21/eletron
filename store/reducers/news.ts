import {NewsAction, NewsActionTypes, NewsState} from "../types/news"

const initialState: NewsState = {
   news: [],
   newsLoading: false
}

const newsReducer = (state = {...initialState}, action: NewsAction): NewsState => {
   switch (action.type) {
      case NewsActionTypes.FETCH_NEWS:
         return {
            ...state,
            news: action.payload.news,
            newsLoading: action.payload.newsLoading
         }

      default:
         return state
   }
}

export default newsReducer