import {
  GET_COURSES,
  COURSE_ERROR,
  ADD_TO_CART,
  REMOVE_FROM_CART,
  ADD_QUANTITY,
  SUB_QUANTITY,
  CLEAR_CART,
  GET_CART
} from "../actions/types";

import { EncryptCart, DecryptCart} from "../../../api/encrypter"
import toast from "react-hot-toast";
import { getCourses } from "../../../api/courses.services";
/*perform encryption decryption to secure this data*/
/*dontsave the total price  just jibber the data context ten on decryption evaluate the total decyphered item and sum price*/

let cachedCart = [];
if(localStorage.getItem("giffy_image_*")){ // yes a deceptive technique. hacker dont know this is the cart key
  cachedCart =JSON.parse(DecryptCart(localStorage.getItem("giffy_image_*")))
}

/*fixed security issue with localstorage by encrypting user cart details*/
const initialState = {
   cart: cachedCart.length>0 ? cachedCart: [],
   courses: [],
   total:0
  
};

 const cartReset =() =>{
  const flatcart =[]
   localStorage.setItem(
        "giffy_image_*",
        EncryptCart(JSON.stringify(flatcart))
      );
 }

const applyGetCart = (state, action) => ({
  ...state,
  cart: action.payload
});



/*reducer wragler*/
export default (state = initialState, action) => {
  switch (action.type) {
    case GET_COURSES:
      return {
        ...state,
        courses: action.payload,
        //cart:[...state.cart]
      };
    case COURSE_ERROR:
      return {
        ...state,
        //cart:[...state.cart]
      };
    case ADD_TO_CART:
      const searchId = action.payload
      let {courses, cart } =  state
     // alert(searchId)
    //console.log(coursesSet)

    let itemToBeAdded =  courses.filter(
       (item) => item.id === searchId
    );
    

   console.log(state.cart);

    let existingItem = state.cart.flat().find((item) =>  item.id== searchId);
    if (existingItem) {
      toast.error(`You have already added this course to your cart.`);
      return {
        ...state,
      };
    } else {
      itemToBeAdded.quantity = 1;
       console.log(itemToBeAdded.flat())
      let newTotal = parseInt(state.total) + parseInt(itemToBeAdded.flat().price);
      toast.success(`Course added to cart`);
      /*give it some name not to evade the eyes from suspecting hackers*/
      localStorage.setItem(
        "giffy_image_*",
        EncryptCart(JSON.stringify([...state.cart.flat(), itemToBeAdded.flat()].flat()))
      );

      //console.log(JSON.parse(DecryptCart(localStorage.getItem("cart_data"))))
   
      return {
        ...state,
        cart: [...state.cart.flat(), itemToBeAdded.flat()].flat(),
        total: newTotal,
      };
    }
    case REMOVE_FROM_CART:
       //using state
      // let itemToRemove = state.cart.find((item) => action.payload === item.id);
      // let newCart = state.cart.filter((item) => action.payload !== item.id);
      // console.log(newCart)

      // let newTotal = state.total - itemToRemove.price * itemToRemove.quantity;
      // toast.success(`Course removed from cart`);
      // const flatcart = state.cart;
      // localStorage.setItem(
      //   "giffy_image_*",
      //   EncryptCart(JSON.stringify(flatcart))
      // );

  //write hot scripts that makes wonders saladin jake!!!
      //using storage
      let newCart = JSON.parse(DecryptCart(localStorage.getItem("giffy_image_*")));
      //manipulate the state
      let itemToRemove = newCart.flat().find((item) => action.payload === item.id);
       newCart = newCart.filter((item) => action.payload !== item.id);
      // console.log(newCart)

      //change encrypted store data
      localStorage.setItem(
        "giffy_image_*",
        EncryptCart(JSON.stringify(newCart.flat()))
      );
      const flatcart = newCart.flat()
      return {
        ...state,
        cart: [...flatcart], //for human consumption
      };
    case ADD_QUANTITY:
      let addedItem = state.cart.flat().find((item) => item.id === action.payload);
      addedItem.quantity += 1;
      let newTotal = state.total + addedItem.price;
      return {
        ...state,
      
      };
    case SUB_QUANTITY:
      addedItem = state.cart.flat().find((item) => item.id === action.payload);

      if (addedItem.quantity === 1) {
        let new_items = state.cart.filter((item) => item.id !== action.payload);
        let newTotal = state.total - addedItem.price;
        return {
          ...state,
          cart: new_items,
          total: newTotal,
        };
      } else {
        addedItem.quantity -= 1;
        let newTotal = state.total - addedItem.price;
        return {
          ...state,
          total: newTotal,
        };
      }
    case CLEAR_CART:
      toast.success(`Cart Cleared`);
     
      cartReset()
  
      return {
        ...state,
        cart: state.cart,
        total: state.total
      };

    case GET_CART:
       return applyGetCart
    default:
      return state;
  }
};


