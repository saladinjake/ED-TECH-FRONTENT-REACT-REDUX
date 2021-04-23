/* eslint-disable no-unused-vars */
import axios from "services/axiosConfig";

export const getInstructors = async () => {
  let request = axios.get("instructors/activeProfiles");
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const getInstructor = async (userId) => {
  let request = axios.get(`instructors/${userId}`);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const getAuthProfile = async  => {
  let request = axios.get(`instructors/my/profile`);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const getActiveInstructors = async () => {
  let request = axios.get("instructors/activeProfiles");
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const getInstructorCourses = async () => {
  let request = axios.get("courses/my/courses");
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};


