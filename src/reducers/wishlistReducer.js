import {
  ADD_TO_WISHLIST,
  REMOVE_FROM_WISHLIST,
  CLEAR_WISHLIST,
} from "../actions/types";

import toast from "react-hot-toast";
import { getCourses } from "services/course";

import { addToWishlist, getWishlist } from "services/wishlist";

let cachedCart = [];
let cachedTotal = [];

if (localStorage.getItem("wishes")) {
  cachedCart = JSON?.parse(localStorage.getItem("wishes"));
  cachedTotal = localStorage.getItem("totalwish");
}

const initialState = {
  wishBag: cachedCart, // cachedCart ? cachedCart : [],
  courses: [],
  totalWishes: cachedTotal ? cachedTotal : 0,
};

// let dbWishList = []

export default async (state = initialState, action) => {
  // try{
  //     dbWishList = await getWishlist();
  //   // console.log(dbWishList.data.data)

  // }catch(e){

  // }

  // console.log(dbWishList)

  switch (action.type) {
    case ADD_TO_WISHLIST:
      if( document.getElementById("wishlister")){
        document.getElementById("wishlister").disabled = "true";
      }
      
      let coursesSet = null;
      try {
        coursesSet = await getCourses();
        state.courses = [...coursesSet.data.data.courses];
      } catch (e) {
        toast.success(`Some error occured while fetching data`);
      }

      let itemToBeAdded = state.courses.find(
        (item) => item.id === action.payload
      );
      console.log(itemToBeAdded);

      console.log(state.wishBag);
      let existingItem = cachedCart.find((item) => action.payload === item.id);
      if (existingItem) {
        toast.success(`Course already in wish list`);
        document.getElementById("wishlister").textContent =
          "Already in wish list";
        return {
          ...state,
        };
      } else {
        itemToBeAdded.quantity = 1;
        let newTotal =
          parseInt(state.totalWishes) + parseInt(itemToBeAdded.price);
        toast.success(`Course added to wish list`);
        cachedCart.push(itemToBeAdded);
        localStorage.setItem("wishes", JSON.stringify([...cachedCart]));
        localStorage.setItem("totalwish", newTotal);
        document.getElementById("wishlister").disabled = "false";
        document.getElementById("wishlister").textContent = "Add To Wish List";

        // state.wishBag = cachedCart;
        // state.totalWishes =newTotal;
        // return state;

        await addToWishlist({ course_id: itemToBeAdded.id });

        return {
          ...state,
          wishBag: [...cachedCart],
          totalWishes: newTotal,
        };
      }
    case REMOVE_FROM_WISHLIST:
      let itemToRemove = cachedCart.find((item) => action.payload === item.id);
      let newCart = cachedCart.filter((item) => action.payload !== item.id);
      let newTotal =
        state.totalWishes - itemToRemove.price * itemToRemove.quantity;
      toast.error(`Course removed from wish list`);

      localStorage.setItem("wishes", JSON.stringify([...newCart]));
      localStorage.setItem("totalwish", newTotal);

      // state.wishBag = newCart;
      //   state.totalWishes =newTotal;
      //   return state;

      return {
        ...state,
        wishBag: [...newCart],
        totalWishes: newTotal,
      };

    case CLEAR_WISHLIST:
      toast.success(`Wish list Cleared`);
      localStorage.setItem("wishes", JSON.stringify([]));
      localStorage.setItem("totalwish", 0);
      return {
        ...state,
        wishBag: [],
        totalWishes: 0,
      };

    default:
      return state || initialState;
  }
};
