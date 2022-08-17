import {Product} from "./product";
import {PageMeta} from "./category";

interface SearchProducts extends Product {
    image: string
}


export interface SearchState {
    searchProducts: SearchProducts[],
    searchMeta: PageMeta
    searchLoading: boolean
}

export enum SearchActionTypes {
    GET_SEARCH = "GET_SEARCH",
    CLEAR_SEARCH = "CLEAR_SEARCH"
}

interface GetSearchAction {
    type: SearchActionTypes.GET_SEARCH,
    payload: SearchProducts[],
    meta: PageMeta
    loading: boolean
}

interface ClearSearchAction {
    type: SearchActionTypes.CLEAR_SEARCH,
    payload: [],
    meta: {}
    loading: boolean
}

export type SearchAction = GetSearchAction | ClearSearchAction