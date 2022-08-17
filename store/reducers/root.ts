import { combineReducers } from "redux";
import authReducer from "./auth";
import categoriesReducer from "./categories";
import contactsReducer from "./contacts";
import homeReducer from "./home";
import filterReducer from "./filter";
import cartReducer from "./cart";
import productReducer from "./product";
import compareReducer from "./compare";
import searchReducer from "./search";
import FavouriteReducer from "./favourite";
import bannerReducer from "./banner";
import checkoutReducer from "./checkout";
import profileReducer from "./profile";
import newsReducer from "./news";

const rootReducer = combineReducers({
  auth: authReducer,
  category: categoriesReducer,
  contacts: contactsReducer,
  home: homeReducer,
  filters: filterReducer,
  cart: cartReducer,
  product: productReducer,
  compare: compareReducer,
  search: searchReducer,
  favourite: FavouriteReducer,
  banners: bannerReducer,
  checkout: checkoutReducer,
  profile: profileReducer,
  news: newsReducer,
});
// this is done for typescript, to understand type of root reducer
export type RootState = ReturnType<typeof rootReducer>;

export default rootReducer;
