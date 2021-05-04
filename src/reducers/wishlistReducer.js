import {
   ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  CLEAR_WISHLIST
} from "../actions/types";

import toast from "react-hot-toast";

const cachedCart = localStorage && JSON?.parse(localStorage.getItem("wishes"));
const cachedTotal = localStorage && localStorage.getItem("totalwish");

const initialState = {
  cart: cachedCart ? cachedCart : [],
  courses: [],
  total: cachedTotal ? cachedTotal : 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_WISHLIST:
      let itemToBeAdded = state.courses.find(
        (item) => item.id === action.payload
      );
      let existingItem = state.cart.find((item) => action.payload === item.id);
      if (existingItem) {
        toast.success(`Course already in wish list`);
        return {
          ...state,
        };
      } else {
        itemToBeAdded.quantity = 1;
        let newTotal = parseInt(state.total) + parseInt(itemToBeAdded.price);
        toast.success(`Course added to wish list`);

        localStorage.setItem(
          "wishes",
          JSON.stringify([...state.cart, itemToBeAdded])
        );
        localStorage.setItem("totalwish", newTotal);

        return {
          ...state,
          cart: [...state.cart, itemToBeAdded],
          total: newTotal,
        };
      }
    case REMOVE_FROM_WISHLIST:
      let itemToRemove = state.cart.find((item) => action.payload === item.id);
      let newCart = state.cart.filter((item) => action.payload !== item.id);
      let newTotal = state.total - itemToRemove.price * itemToRemove.quantity;
      toast.error(`Course removed from wish list`);

      localStorage.setItem("wishes", JSON.stringify([...newCart]));
      localStorage.setItem("totalwish", newTotal);

      return {
        ...state,
        cart: [...newCart],
        total: newTotal,
      };
    
    case CLEAR_WISHLIST:
      toast.success(`Wish list Cleared`);
      localStorage.setItem("wishes", JSON.stringify([]));
      localStorage.setItem("totalwish", 0);
      return {
        ...state,
        cart: [],
        total: 0
      };
  
    default:
      return state;
  }
};
