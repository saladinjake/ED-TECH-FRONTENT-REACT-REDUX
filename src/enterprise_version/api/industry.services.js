/* eslint-disable no-unused-vars */
import axios from "./api_config/axios.config";

export const getIndustries = () => {
  let request = axios.get("industries");
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};
