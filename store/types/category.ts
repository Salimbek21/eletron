import {SectionProducts as Product} from "./home";

// Category that we get from backend
export interface Category {
    id: number,
    name: string,
    slug: string,
    wicon?: string,
    ad?: {
        image?: string
    },
    childs?: Category[]
}

export interface PageMeta {
    current_page?: number,
    last_page?: number,
    per_page?: number,
    total?: number
}

// Typescript state for reducer
export interface CategoriesState {
    categories: Category[],
    filteredProducts: {
        products: Product[],
        meta?: PageMeta,
        loading: boolean
    },
    params: {}
}

// Here we just list all action types which we have for 'Category'
export enum CategoryActionTypes {
    FETCH_CATEGORIES = "FETCH_CATEGORIES",
    FETCH_CATEGORY_PRODUCTS = "FETCH_CATEGORY_PRODUCTS",
    CLEAR_FILTER_CAT_PRODUCTS = "CLEAR_FILTER_CAT_PRODUCTS"
}

interface FetchCategoryProductsAction {
    type: CategoryActionTypes.FETCH_CATEGORY_PRODUCTS,
    payload: {
        products: Product[],
        meta?: PageMeta,
        loading: boolean
    },
    params: {}
}

interface ClearCategoryProductsAction {
    type: CategoryActionTypes.CLEAR_FILTER_CAT_PRODUCTS,
    payload: {
        products: [],
        meta?: {},
        loading: boolean
    }
}

// For each action we need to create new action type and specify its payload
interface FetchCategoriesAction {
    type: CategoryActionTypes.FETCH_CATEGORIES,
    payload: Category[]
}

// Combines all actions
export type CategoryAction =
    FetchCategoriesAction
    | FetchCategoryProductsAction
    | ClearCategoryProductsAction
