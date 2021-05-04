import {
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  CLEAR_WISHLIST
} from "./types";

// import { getWishlist } from "services/wishlist";

export const addToWishList = (id) => async (dispatch) => {
  dispatch({
    type: ADD_TO_WISHLIST,
    payload: id
  });
};

export const removeFromWishList = (id) => async (dispatch) => {
  dispatch({
    type: REMOVE_FROM_WISHLIST,
    payload: id,
  });
};




export const clearWishList = () => async (dispatch) => {
  console.log('cart cleared action');
  dispatch({
    type: CLEAR_WISHLIST
  });
};