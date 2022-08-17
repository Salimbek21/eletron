export interface Banner {
   id: number,
   background?: {
      url: string
   }
   url?: string,
   image?: {
      url: string
   }
}

export interface BannerState {
   banners: Banner[] | [],
   loading: boolean
}

export enum BannerActionTypes {
   FETCH_BANNERS = "FETCH_BANNERS"
}

interface FetchBannerAction {
   type: BannerActionTypes.FETCH_BANNERS;
   payload: { banners: Banner[] | [], loading: boolean }
}

export type BannerAction = FetchBannerAction