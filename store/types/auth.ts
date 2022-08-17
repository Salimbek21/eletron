interface CodeGenerateProps {
   phone?: string,
   message?: string,
}

interface PhoneVerifyProps {
   message?: string,
   phone?: string,
   id?: number,
   key?: string
}

interface RegisterProps {
   access_token?: string,
   refresh_token?: string,
   user_id?: number
}

export interface AuthState {
   codeGenerate?: CodeGenerateProps,
   codeUpdate?: CodeGenerateProps,
   phoneVerified?: PhoneVerifyProps,
   userRegister?: RegisterProps,
   tokenRefreshed?: RegisterProps,
   userLogout: boolean,
   userLogin: boolean,
   userPassUpdated: boolean,
}

export enum AuthActionTypes {
   GENERATE_CODE = "GENERATE_CODE",
   UPDATE_CODE = "UPDATE_CODE",
   VERIFY_PHONE = "VERIFY_PHONE",
   REFRESH_TOKEN = "REFRESH_TOKEN",
   AUTH_LOGIN = "AUTH_LOGIN",
   AUTH_LOGOUT = "AUTH_LOGOUT",
   AUTH_REGISTER = "AUTH_REGISTER",
   AUTH_PASS_FORGOT = "AUTH_PASS_FORGOT",
   CHANGE_PASSWORD = "CHANGE_PASSWORD",
}

interface CodeGenerateAction {
   type: AuthActionTypes.GENERATE_CODE;
   payload: CodeGenerateProps
}
interface CodeUpdateAction {
   type: AuthActionTypes.UPDATE_CODE;
   payload: CodeGenerateProps
}

interface PasswordUpdateAction{
   type: AuthActionTypes.AUTH_PASS_FORGOT;
   payload: boolean
}

interface AuthLogoutAction {
   type: AuthActionTypes.AUTH_LOGOUT;
   payload: boolean
}

interface AuthLoginAction {
   type: AuthActionTypes.AUTH_LOGIN;
   payload: boolean
}

interface PhoneVerifyAction {
   type: AuthActionTypes.VERIFY_PHONE;
   payload: PhoneVerifyProps
}

interface AuthRegisterAction {
   type: AuthActionTypes.AUTH_REGISTER;
   payload: { access_token: string, refresh_token: string }
}

interface AuthTokenRefreshAction {
   type: AuthActionTypes.REFRESH_TOKEN;
   payload: RegisterProps
}

interface PasswordChangeAction {
   type: AuthActionTypes.CHANGE_PASSWORD
}

export type AuthAction =
      CodeGenerateAction
    | PhoneVerifyAction
    | AuthRegisterAction
    | AuthTokenRefreshAction
    | AuthLogoutAction
    | AuthLoginAction
    | CodeUpdateAction
    | PasswordUpdateAction
    | PasswordChangeAction
