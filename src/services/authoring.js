import httpRequest from "services/axiosAuthoring"



export const getCourses = async () => {
  let request = httpRequest.get("courses");
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const getInstitutionCourses = async (id) => {
  let request = httpRequest.get(`courses/${id}`);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const getCourse = async (id) => {
  let request = httpRequest.get(`course/${id}`);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const createCourse = async (details) => {
  let request = httpRequest.post("create/course", details);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const updateCourse = async (courseId, data) => {
  const config = {
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
      _method: "PUT",
    },
  };

  let request = httpRequest.put(
    `courses/${courseId}`,
    qs.stringify(data),
    // data,
    config
  );
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};



export const getInstitutions = async (id,limit=3000000,offset=0) => {
  let request = httpRequest.get(`courses/${id}/?limit=${limit}&offset=${offset}`);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};


export const getInstructorProfiles = async (id,limit=3000000,offset=0) => {
  let request = httpRequest.get(`author-profiles/${id}/?limit=${limit}&offset=${offset}`);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};




export const getInstructorProfile = async (id) => {
  let request = httpRequest.get(`author-profile/${id}`);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};





