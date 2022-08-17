export interface News {
   id: number,
   slug: string,
   title: string,
   created_at: string,
   description_short: string,
   image: {
      url: string
   }
}

export interface NewsState {
   news: News[]
   newsLoading: boolean
}

export enum NewsActionTypes {
   FETCH_NEWS = "FETCH_NEWS"
}

export interface FetchNewsAction {
   type: NewsActionTypes.FETCH_NEWS,
   payload: { news: News[], newsLoading: boolean}
}


export type NewsAction = FetchNewsAction