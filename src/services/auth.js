/* eslint-disable no-unused-vars */
import axios from "services/axiosConfig";

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




export const loginUserForgotChangePassword = async (details) => {
  let request = axios.post("/auth/password/reset", details);
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
