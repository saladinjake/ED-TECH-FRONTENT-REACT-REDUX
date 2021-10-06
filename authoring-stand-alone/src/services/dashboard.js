/* eslint-disable no-unused-vars */
import axios from "services/axiosConfig";

export const getLearnerInfo = async (userId) => {
  let request = axios.get(`search/courses/counter/${userId}`);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const getInstructorInfo = async () => {
  let request = axios.get(`search/mycourses/counter`);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const uuid = () => {
  var now = new Date();

  var timestamp = now.getFullYear().toString();
  timestamp += (now.getMonth < 9 ? "0" : "") + now.getMonth().toString(); // JS months are 0-based, so +1 and pad with 0's
  timestamp += (now.getDate < 10 ? "0" : "") + now.getDate().toString(); // pad with a 0

  return timestamp;
};
