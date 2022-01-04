/* eslint-disable no-unused-vars */
import axios from "./api_config/axios.config";

export const getCountries = () => {
  let request = axios.get("countries");
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};