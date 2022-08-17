import {AuthAction, AuthActionTypes, AuthState} from "../types/auth";

const initialState: AuthState = {
   codeGenerate: {},
   codeUpdate: {},
   phoneVerified: {},
   userRegister: {},
   tokenRefreshed: {},
   userLogout: false,
   userLogin: false,
   userPassUpdated: false
};

const authReducer = (state = {...initialState}, action: AuthAction): AuthState => {
   switch (action.type) {
      case AuthActionTypes.GENERATE_CODE:
         return {...state, codeGenerate: action.payload};

      case AuthActionTypes.UPDATE_CODE:
         return {...state, codeUpdate: action.payload};

      case AuthActionTypes.VERIFY_PHONE:
         return {...state, phoneVerified: action.payload};

      case AuthActionTypes.AUTH_REGISTER:
         return {...state, userRegister: action.payload};

      case AuthActionTypes.REFRESH_TOKEN:
         return {...state, tokenRefreshed: action.payload};

      case AuthActionTypes.AUTH_LOGOUT:
         return {...state, userLogout: action.payload};

      case AuthActionTypes.AUTH_LOGIN:
         return {...state, userLogin: action.payload};

      case AuthActionTypes.AUTH_PASS_FORGOT:
         return {...state, userPassUpdated: action.payload};

      default:
         return state;
   }
};

export default authReducer;
