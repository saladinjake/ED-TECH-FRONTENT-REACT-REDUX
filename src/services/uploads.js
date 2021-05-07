/* eslint-disable no-unused-vars */
import axios from "services/axiosConfig";
import qs from "qs";

const upload = (file) => {
  let formData = new FormData();
  const image = file;
  formData.append("image", image);
  formData.append("__method", "PUT");
  console.log(formData, image);
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
  };
  let request = axios.post(
    `users/profile-photo`,
    formData,
    
    // config
  );
  return request.then((response) => {
    console.log(response);
    if (response.status === 200) {
      return response && response;
    }
  })
};

export default {
  upload,
};
