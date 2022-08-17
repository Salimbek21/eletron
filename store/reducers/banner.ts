import {BannerAction, BannerActionTypes, BannerState} from "../types/banner";

const initialState: BannerState = {
   banners: [],
   loading: false
};

const bannerReducer = (state = {...initialState}, action: BannerAction): BannerState => {
   switch (action.type) {
      case BannerActionTypes.FETCH_BANNERS:
         return {...state, banners: action.payload.banners, loading: action.payload.loading};

      default:
         return state;
   }
};

export default bannerReducer;
