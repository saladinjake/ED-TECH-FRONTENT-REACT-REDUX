/* eslint-disable no-unused-vars */
import axios from "./api_config/axios.config";
import { BASE_URL } from "./api_config/constants";
import toast from "react-hot-toast";

export const enrollCourses = async (data) => {
  let request = axios.post("enrollments/enrol/learnerEnrolMultiple", data);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const checkoutCourses = async (data) => {
  let request = axios.post("checkout", data);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const getEnrolledCourse = async (id) => {
  let request = axios.get(`enrollments/me`);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};



export const enrollCourseInLMS = (payload) =>{


}




