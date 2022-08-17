export interface CartItem {
  price: number;
  reference: string;
  shop_reference: string;
  stock_quantity: number;
  total: number;
  discount: {
    price: number;
  };
  total_with_discount: number;
  item_shop_id: number;
  warranty: number;
  quantity: number;
  product: {
    name: string;
    slug: string;
    id: number;
    images: [
      {
        url: string;
        types: {
          medium_default: string;
        };
      }
    ];
  };
}

export interface Cart {
  total?: number;
  total_count?: number;
  discount?: number;
  total_with_discount?: number;
  potential_cashback?: number;
  items?: CartItem[];
}

export interface CartState {
  cart?: Cart;
  adding?: boolean;
  cartLoading: boolean;
}

export enum CartActionTypes {
  ADD_TO_CART = "ADD_TO_CART",
  FETCH_CART = "FETCH_CART",
  DELETE_FROM_CART = "DELETE_FROM_CART",
}

interface FetchCartAction {
  type: CartActionTypes.FETCH_CART;
  payload: { cart: Cart; cartLoading: boolean };
}

interface AddToCartAction {
  type: CartActionTypes.ADD_TO_CART;
  payload: { cart?: Cart; adding: boolean };
}

interface DeleteFromCartAction {
  type: CartActionTypes.DELETE_FROM_CART;
  payload: Cart;
}

export type CartAction =
  | AddToCartAction
  | FetchCartAction
  | DeleteFromCartAction;
