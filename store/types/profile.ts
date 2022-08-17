import {PageMeta} from "./category";
import {CartItem} from "./cart";
import {Delivery} from "./checkout";

interface User {
   id?: number;
   phone?: string;
   email?: string;
   first_name?: string;
   last_name?: string;
   image?: any;
   cashback?: number;
   logged_at?: string;
   comment?: any;
   birthdate?: any;
   entity?: number;
   info?: any;
}

export interface Order {
   id: number,
   created_at: string,
   total: number,
   cart: {
      potential_cashback: number,
      used_cashback: number,
      items: CartItem[]
   },
   state: {
      name: string
   },
   payment: {
      code: string,
      name: string,
      description: string,
      id: number
   },
   user: User,
   delivery: Delivery,
   address: {
      address: string,
      phone: number,
      full_name: string,
      region?: {
         name: string,
         city?: {
            name: string
         }
      }
   }
   url: string
}

interface City {
   id: number,
   name: string,
}

interface Region {
   id: number,
   name: string,
   city: City
}


interface UserAddress {
   address: string,
   date: string,
   email: string | null,
   full_name: string,
   id: number,
   main: number,
   name: string,
   phone: string,
   region: Region
}

export interface ProfileState {
   userInfo?: User,
   userAddresses?: UserAddress[],
   orders: Order[],
   ordersMeta: PageMeta,
   order: Order | undefined,
   mainAddressChanged: boolean
}

export enum ProfileActionTypes {
   FETCH_USER_INFO = "FETCH_USER_INFO",
   UPDATE_USER_INFO = "UPDATE_USER_INFO",
   FETCH_USER_ADDRESSES = "FETCH_USER_ADDRESSES",
   CLEAR_USER_ADDRESSES = "CLEAR_USER_ADDRESSES",
   FETCH_USER_ORDERS = "FETCH_USER_ORDERS",
   FETCH_USER_ORDER = "FETCH_USER_ORDER",
   CHANGE_MAIN_ADDR = "CHANGE_MAIN_ADDR",
}

interface UserInfoAction {
   type: ProfileActionTypes.FETCH_USER_INFO;
   payload: User
}

interface UpdateUserInfoAction {
   type: ProfileActionTypes.UPDATE_USER_INFO,
   payload: User
}

interface FetchUserAddressAction {
   type: ProfileActionTypes.FETCH_USER_ADDRESSES,
   payload: UserAddress[]
}

interface ClearUserAddressAction {
   type: ProfileActionTypes.CLEAR_USER_ADDRESSES,
   payload: UserAddress[]
}

interface FetchUserOrdersAction {
   type: ProfileActionTypes.FETCH_USER_ORDERS,
   payload: {
      orders: Order[],
      meta: PageMeta
   }
}

interface FetchUserOneOrderAction {
   type: ProfileActionTypes.FETCH_USER_ORDER,
   payload: Order
}

interface ClearUserOneOrderAction {
   type: ProfileActionTypes.FETCH_USER_ORDER,
   payload: undefined
}

interface ChangeUserMainAddrAction {
   type: ProfileActionTypes.CHANGE_MAIN_ADDR,
   payload: boolean
}

export type ProfileAction =
    UserInfoAction            |
    FetchUserAddressAction    |
    ClearUserAddressAction    |
    FetchUserOrdersAction     |
    FetchUserOneOrderAction   |
    ClearUserOneOrderAction   |
    ChangeUserMainAddrAction  |
    UpdateUserInfoAction
