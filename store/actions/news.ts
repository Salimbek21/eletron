import {Dispatch} from "redux";
import {NewsAction, NewsActionTypes} from "../types/news";
import {API_FetchPosts} from "../../api/news";
import {errorNotifier} from "./Error-Notifier";

export const fetchNews = () => async (dispatch: Dispatch<NewsAction>) => {
   dispatch({
      type: NewsActionTypes.FETCH_NEWS,
      payload: {news: [], newsLoading: true}
   });

   await API_FetchPosts()
       .then((res: any) => {
          dispatch({
             type: NewsActionTypes.FETCH_NEWS,
             payload: {news: res.data.data, newsLoading: false}
          });
       })
       .catch((e: any) => {
          errorNotifier(e)
       });
}