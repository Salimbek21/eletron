import {CategoriesState, CategoryAction, CategoryActionTypes,} from "../types/category";

const initialState: CategoriesState = {
    categories: [],
    filteredProducts: {
        products: [],
        meta: {},
        loading: false
    },
    params: {}
};

const categories = (state = {...initialState}, action: CategoryAction): CategoriesState => {
    switch (action.type) {
        case CategoryActionTypes.FETCH_CATEGORIES:
            return {...state, categories: action.payload};
        case CategoryActionTypes.FETCH_CATEGORY_PRODUCTS:
            return {...state, filteredProducts: action.payload, params: action.params}
        case CategoryActionTypes.CLEAR_FILTER_CAT_PRODUCTS:
            return {...state, filteredProducts: action.payload}
        default:
            return state;
    }
};

export default categories;
