import {
  AUTH_ERROR,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  LOGOUT,
  RESET_ERROR,
  SET_PATH,
  SET_LOADING,
} from "./../actions/types";

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

    //all this should be encrypted so its not just plain
      localStorage.setItem("access_token", action.payload.access_token);
      localStorage.setItem("token", action.payload.access_token);
      localStorage.setItem("user", JSON.stringify(action.payload.user));
      localStorage.setItem("lms_user_profile_id", JSON.stringify(action.payload.lms_user_profile_id));

      
      localStorage.setItem(
        "user_roles",
        JSON.stringify(action.payload.user_roles)
      );
      localStorage.setItem(
        "lms_token",
        JSON.stringify(action.payload.lms_token)
      );

      // set the lms token to cookies
      return {
        ...state,
        loading: false,
        user: action.payload.user,
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