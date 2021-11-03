/* eslint-disable no-unused-vars */
import axios from "./api_config/axios.config";

export const getWishlist = async () => {
  let request = axios.get("wishlists/me");
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const addToWishlist = async (data) => {
  let request = axios.post("wishlists/add", data);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const deleteWishlist = async (wishlistId) => {
  let request = axios.delete(`wishlists/${wishlistId}/delete`);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};