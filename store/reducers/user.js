import * as actions from '../types/actionTypes';

const initialState = {
   info: {},
   orders: []
};

const user = (state = {...initialState}, action) => {
   switch (action.type) {

      case actions.FETCH_USER:
         return { ...state, info: action.payload };

      case actions.FETCH_ORDERS:
         return { ...state, orders: action.payload };

      case actions.USER_UPDATE:
         return { ...state, info: action.payload };

      case actions.CLEAN_USER_INFO:
         return { ...state, info: action.payload };

       case actions.AUTH_LOGIN:
          return { ...state, isLogin: action.payload };

      case actions.AUTH_LOGOUT:
         return { ...state, isLogin: action.payload };

      case actions.AUTH_REGISTER:
         return {...state, regSuccess: action.payload};

      case actions.REFRESH_TOKEN:
         return {...state, refreshed: action.payload};

      case actions.CLEAR_REGISTER:
         return {...state, regSuccess: action.payload};
      default:
         return state;
   }
};

export default user;