import {ProductAction, ProductActionTypes, ProductState} from "../types/product";


const initialState: ProductState = {
    similar: [],
    similarLoading: false
}

const productReducer = (state = {...initialState}, action: ProductAction): ProductState => {
    switch (action.type) {
        case ProductActionTypes.FETCH_SIMILAR:
            return {...state, similar: action.payload, similarLoading: action.similarLoading}

        case ProductActionTypes.CLEAR_SIMILAR:
            return {...state, similar: action.payload}
        default:
            return state
    }
}
export default productReducer