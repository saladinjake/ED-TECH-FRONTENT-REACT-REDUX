/* eslint-disable no-unused-vars */
import axios from "services/axiosConfig";
import lmsAxios from "services/axiosAuthoring";

export const loginUser = async (details) => {
  let request = axios.post("auth/login", details);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const loginUserForgotPassword = async (details) => {
  let request = axios.post("/auth/reset-password-request", details);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const loggedOutUserForgotPassword = async (details) => {
  let request = axios.post("/auth/reset-password-request", details);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const loginUserForgotChangePassword = async (details) => {
  let request = axios.post("/auth/update-password", details);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const registerLearner = async (details) => {
  let request = axios.post("learners/register", details);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const registerInstructor = async (details) => {
  let request = axios.post("instructors/register", details);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

/*{
  email:"juwavictor@gmail.com",
  password:"password123!@#"
}
*
*/

// X-CSRFToken:"somegibber"
export const loginUserToLMS = async (details) => {
  let request = lmsAxios.post("/user/v1/account/login_session", details);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

/*
*{
    "name": "Victor Saladin Jake",
    "username": "jake",
    "email": "juwavictor@gmail.com",
    "confirm_email": "juwavictor@gmail.com",
    "password": "password123!@#",
    "country": "NG",
    "honor_code":true
}
*/
export const registerLearnerToLMS = async (details) => {
  let request = axios.post("/user/v1/account/registration/", details);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};