/* eslint-disable no-unused-vars */
import axios from "services/axiosConfig";

export const getCourses = async () => {
  let request = axios.get("courses");
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};


export const getFeaturedCourses = async () => {
  let request = axios.get("courses/topPicks");
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};



export const getCourse = async (id) => {
  let request = axios.get(`courses/${id}`);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const createCourse = async (details) => {
  let request = axios.post("courses/create", details);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};



















export const getBusiness = async () => {
  let request = axios.get("business/activeProfiles");
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const getLanguages = () => {
  let request = axios.get("languages");
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const getCategories = () => {
  let request = axios.get("categories");
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const getCertificates = () => {
  let request = axios.get("certificates");
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};










//bundles or programs

export const createBundles = async (details) => {
   let request = axios.post("bundles/create", details);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
}


export const getBundles = () => {
  let request = axios.get("bundles/mybundles");
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const getBundle = (bundleId) => {
  let request = axios.get(`bundles/mybundles/${bundleId}`);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};


export const updateBundle = (bundleId,data) => {
  let request = axios.put(`bundles/${bundleId}`,data);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};