import {HomeAction, HomeActionTypes, HomeState} from "../types/home";

const initialState: HomeState = {
    brands: [],
    popularProducts: [],
    newProducts: [],
    recommendedProducts: [],
    weekProducts: [],
    ploading: false,
    nloading: false,
    rloading: false,
    wloading: false
};

const homeReducer = (state = {...initialState}, action: HomeAction): HomeState => {
    switch (action.type) {
        case HomeActionTypes.FETCH_BRANDS:
            return {...state, brands: action.payload};

        case HomeActionTypes.FETCH_SECTION_PRODUCTS:
            switch (action.payload.type) {
                case 'popular_products':
                    return {
                        ...state,
                        popularProducts: action.payload.products,
                        ploading: action.payload.loading
                    }
                case 'new':
                    return {
                        ...state,
                        newProducts: action.payload.products,
                        nloading: action.payload.loading
                    }
                case 'recommended_products':
                    return {
                        ...state,
                        recommendedProducts: action.payload.products,
                        rloading: action.payload.loading
                    }
                case 'week_products':
                    return {
                        ...state,
                        weekProducts: action.payload.products,
                        wloading: action.payload.loading
                    }

                default:
                    return state
            }

        default:
            return state;
    }
};

export default homeReducer;
