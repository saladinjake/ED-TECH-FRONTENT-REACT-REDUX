import {
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  RESET_ERROR,
  SET_PATH,
  SET_LOADING,
} from "./../actions/types";
import toast from "react-hot-toast"

const cachedUser = localStorage && JSON?.parse(localStorage.getItem("user"));
const cachedRole =
  localStorage && JSON?.parse(localStorage.getItem("user_roles"));
const cachedToken = localStorage && localStorage.getItem("token");
const cachedAuthorization = localStorage.user && localStorage.token;

const initialState = {
  isAuthenticated: cachedAuthorization ? true : false,
  user: cachedUser ? cachedUser : null,
  token: cachedToken ? cachedToken : null,
  user_roles: cachedRole ? cachedRole : null,
  error: null,
  loading: false,
  errFlag: false,
  prevPath: "",
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_SUCCESS:

      let userPayLoad  ={}; // user starts off an empty value.. i dont know you yet
      console.log(action.payload.user)
      if(action.payload.user.hasOwnProperty("id") ){
        //more security check befor grants are allowed
        //all this should be encrypted so its not just plain
        localStorage.setItem("access_token", action.payload.access_token);
        localStorage.setItem("token", action.payload.access_token);
        localStorage.setItem("user", JSON.stringify(action.payload.user));
        localStorage.setItem("lms_user_profile_id", JSON.stringify(action.payload.lms_user_profile_id));
        let userPayLoad = action.payload.user;
        userPayLoad["lms_id"] = action.payload.lms_user_profile_id;
        userPayLoad["lms_token_key"] = action.payload.lms_token
        
        localStorage.setItem(
          "user_roles",
          JSON.stringify(action.payload.user_roles)
        );
        localStorage.setItem(
          "lms_token",
          JSON.stringify(action.payload.lms_token)
        );
  
       toast.success("Login Successful");
      }else{
       toast.error("Login Credentials not found");
       localStorage.clear()
      }

    

      // set the lms token to cookies
      return {
        ...state,
        loading: false,
        user: userPayLoad, // action.payload.user,
        token: action.payload.access_token,
        user_roles: action.payload.user_roles,
        isAuthenticated: true,
        errFlag: false,
      };
    case AUTH_ERROR:
    case LOGIN_FAIL:
    case LOGOUT:
      localStorage.removeItem("access_token");
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("user_roles");
      localStorage.removeItem("cart");
       localStorage.removeItem("giffy_image_*")
      localStorage.removeItem("total");
      localStorage.removeItem("lms_token");

      return {
        ...state,
        token: null,
        loading: false,
        user_roles: null,
        isAuthenticated: false,
        isRegistered: false,
        user: null,
        errFlag: true,
        error: action.payload,
      };
    case SET_PATH:
      return {
        ...state,
        prevPath: action.payload,
      };
    case RESET_ERROR:
      return {
        ...state,
        loading: false,
        errFlag: false,
      };
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    default:
      return state;
  }
};