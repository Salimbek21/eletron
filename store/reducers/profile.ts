import {ProfileAction, ProfileActionTypes, ProfileState} from "../types/profile";

const initialState: ProfileState = {
   userInfo: {},
   userAddresses: [],
   orders: [],
   ordersMeta: {},
   order: undefined,
   mainAddressChanged: false
};

const profileReducer = (state = {...initialState}, action: ProfileAction): ProfileState => {
   switch (action.type) {
      case ProfileActionTypes.FETCH_USER_INFO:
         return {...state, userInfo: action.payload};

      case ProfileActionTypes.UPDATE_USER_INFO:
         return {...state, userInfo: action.payload};

      case ProfileActionTypes.FETCH_USER_ADDRESSES:
         return {...state, userAddresses: action.payload};

      case ProfileActionTypes.CLEAR_USER_ADDRESSES:
         return {...state, userAddresses: action.payload};

      case ProfileActionTypes.FETCH_USER_ORDERS:
         return {...state, orders: action.payload.orders, ordersMeta: action.payload.meta}

      case ProfileActionTypes.FETCH_USER_ORDER:
         return {...state, order: action.payload}

      case ProfileActionTypes.CHANGE_MAIN_ADDR:
         return {...state, mainAddressChanged: action.payload}

      default:
         return state;
   }
};

export default profileReducer;
