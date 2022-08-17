import {CartAction, CartActionTypes, CartState} from "../types/cart";

const initialState: CartState = {
    cart: {},
    adding: false,
    cartLoading: false
};

const cartReducer = (
    state = {...initialState},
    action: CartAction
): CartState => {
    switch (action.type) {
        case CartActionTypes.ADD_TO_CART:
            return {
                ...state,
                cart: action.payload.cart ? action.payload.cart : state.cart,
                adding: action.payload.adding
            };
        case CartActionTypes.FETCH_CART:
            return {...state, cart: action.payload.cart, cartLoading: action.payload.cartLoading};

        case CartActionTypes.DELETE_FROM_CART:
            return {...state, cart: action.payload}
        default:
            return state;
    }
};

export default cartReducer;
