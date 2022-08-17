import * as CategoryActionCreators from "./categories";
import * as HomeActionCreators from "./home";
import * as FilterActionCreators from "./filter";
import * as CartActionCreators from "./cart";
import * as ContactActionCreators from "./contacts";
import * as ProductActionCreators from "./product";
import * as CompareActionCreators from "./compare";
import * as SearchActionCreators from "./search";
import * as FavouriteActionCreators from "./favourite";
import * as BannerActionCreators from "./banner";
import * as CheckoutActionCreators from "./checkout";
import * as AuthActionCreators from "./auth";
import * as ProfileActionCreators from "./profile";
import * as NewsActionCreators from "./news";

// In index, we combine all actions from all the files and export them
export default {
  ...CategoryActionCreators,
  ...HomeActionCreators,
  ...FilterActionCreators,
  ...CartActionCreators,
  ...ContactActionCreators,
  ...ProductActionCreators,
  ...CompareActionCreators,
  ...SearchActionCreators,
  ...FavouriteActionCreators,
  ...BannerActionCreators,
  ...CheckoutActionCreators,
  ...AuthActionCreators,
  ...ProfileActionCreators,
  ...NewsActionCreators,
};
