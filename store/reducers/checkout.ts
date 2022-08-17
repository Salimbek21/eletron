import {CheckoutAction, CheckoutActionTypes, CheckoutState} from "../types/checkout";

const initialState: CheckoutState = {
   deliveryOptions: [],
   paymentOptions: [],
   cities: [],
   orderCreated: false,
   order: undefined
};

const checkoutReducer = (state = {...initialState}, action: CheckoutAction): CheckoutState => {
   switch (action.type) {
      case CheckoutActionTypes.FETCH_DELIVERY_TYPES:
         return {...state, deliveryOptions: action.payload};

      case CheckoutActionTypes.FETCH_PAYMENT_TYPES:
         return {...state, paymentOptions: action.payload}

      case CheckoutActionTypes.FETCH_CITIES:
         return {...state, cities: action.payload}
      case CheckoutActionTypes.MAKE_ORDER:
         return {...state, orderCreated: action.payload.created, order: action.payload.order}

      default:
         return state;
   }
};

export default checkoutReducer;
