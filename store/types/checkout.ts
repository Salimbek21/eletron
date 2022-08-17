import {Order} from "./profile";

export interface Delivery {
   id: number,
   name: string,
   description: string
}

interface PaymentOption {
   id: number,
   name: string,
   code: string,
   description: string
}

interface Region {
   id: number,
   name: string
}

interface City {
   id: number,
   name: string,
   regions: Region[]
}

export interface CheckoutState {
   deliveryOptions: Delivery[],
   paymentOptions: PaymentOption[],
   cities: City[],
   orderCreated: boolean,
   order: Order | undefined
}


export enum CheckoutActionTypes {
   FETCH_DELIVERY_TYPES = "FETCH_DELIVERY_TYPES",
   FETCH_PAYMENT_TYPES = "FETCH_PAYMENT_TYPES",
   FETCH_CITIES = "FETCH_CITIES",
   MAKE_ORDER = "MAKE_ORDER"
}

interface FetchDeliveryOptionsAction {
   type: CheckoutActionTypes.FETCH_DELIVERY_TYPES;
   payload: Delivery[]
}

interface FetchPaymentOptionsAction {
   type: CheckoutActionTypes.FETCH_PAYMENT_TYPES;
   payload: PaymentOption[]
}

interface FetchCitiesAction {
   type: CheckoutActionTypes.FETCH_CITIES;
   payload: City[]
}

interface MakeOrder {
   type: CheckoutActionTypes.MAKE_ORDER,
   payload: {
      created: boolean,
      order: Order | undefined
   }
}


export type CheckoutAction =
      FetchDeliveryOptionsAction
    | FetchPaymentOptionsAction
    | FetchCitiesAction
    | MakeOrder

