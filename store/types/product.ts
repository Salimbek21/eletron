import {SectionProducts} from "./home";

export interface Image {
    url?: string,
    types?: {
        home_default?: string,
        large_default?: string
    }
}

export interface Feature {
    value: string,
    name: string
}

export interface Product extends SectionProducts {
    random_shop: SectionProducts['random_shop'] & {
        reference: string,
        shop_reference: string
    }
}

export interface ProductState {
    similar: Product[],
    similarLoading: boolean
}

export enum ProductActionTypes {
    FETCH_SIMILAR= "FETCH_SIMILAR",
    CLEAR_SIMILAR = "CLEAR_SIMILAR"
}

interface FetchSimilarAction {
    type: ProductActionTypes.FETCH_SIMILAR,
    payload: Product[],
    similarLoading: boolean
}

interface ClearSimilarAction {
    type: ProductActionTypes.CLEAR_SIMILAR,
    payload: []
}

export type ProductAction = FetchSimilarAction | ClearSimilarAction