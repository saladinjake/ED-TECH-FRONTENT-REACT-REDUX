/*barrel script to autoload all reducers*/
import { combineReducers } from "redux";
import coursesReducer from "./courses.reducer";
import cartReducer from "./cart.reducer";
import authReducer from "./auth.reducer";
import wishListReducer from "./wishlist.reducer";

//barrel reducer as root reducer
export default combineReducers({
  course: coursesReducer,
  cart: cartReducer,
  auth: authReducer,
  wishList: wishListReducer,
});