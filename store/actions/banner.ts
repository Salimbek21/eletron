import {Dispatch} from "redux";
import {BannerAction, BannerActionTypes} from "../types/banner";
import {API_Banners} from "../../api/banners";

export const fetchBanners = () => async (dispatch: Dispatch<BannerAction>) => {
   dispatch({
      type: BannerActionTypes.FETCH_BANNERS,
      payload: {banners: [], loading: true}
   })
   await API_Banners().then((res: any) => {
      dispatch({
         type: BannerActionTypes.FETCH_BANNERS,
         payload: {banners: res.data.data, loading: false}
      })
   })
}