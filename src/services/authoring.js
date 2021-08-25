import httpRequest from "services/axiosAuthoring"



export const getCourses = async (limit=800000,offet=0) => {
  let request = httpRequest.get(`courses/?limit=${limit}&offset=${offset}`);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const getInstitutionCourses = async (id,limit=800000,offet=0) => {
  let request = httpRequest.get(`courses/${id}/?limit=${limit}&offset=${offset}`);
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
    if (response.status === 201) {
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



export const getInstitutions = async (id,limit=8000000,offset=0) => {
  let request = httpRequest.get(`courses/${id}/?limit=${limit}&offset=${offset}`);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};


export const getInstructorProfiles = async (id,limit=8000000,offset=0) => {
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











/*future implementations*/



export const createSection = async (details) => {
  let request = httpRequest.post("create/section", details);
  return request.then((response) => {
    if (response.status === 201) {
      return response && response;
    }
  });
};


export const createSubsection = async (details) => {
  let request = httpRequest.post("create/subsection", details);
  return request.then((response) => {
    if (response.status === 201) {
      return response && response;
    }
  });
};

export const createLesson = async (details) => {
  let request = httpRequest.post("create/lesson", details);
  return request.then((response) => {
    if (response.status === 201) {
      return response && response;
    }
  });
};





export const createInstitution = async (details) => {
  let request = httpRequest.post("create/institution", details);
  return request.then((response) => {
    if (response.status === 201) {
      return response && response;
    }
  });
};



export const createGapsGroup = async (details) => {
  let request = httpRequest.post("create/gaps-group", details);
  return request.then((response) => {
    if (response.status === 201) {
      return response && response;
    }
  });
};


export const createUserProfile = async (details) => {
  let request = httpRequest.post("create/user-profile", details);
  return request.then((response) => {
    if (response.status === 201) {
      return response && response;
    }
  });
};



export const createStudentProfile = async (details) => {
  let request = httpRequest.post("create/student-profile", details);
  return request.then((response) => {
    if (response.status === 201) {
      return response && response;
    }
  });
};




export const createAuthorProfile = async (details) => {
  let request = httpRequest.post("create/author-profile", details);
  return request.then((response) => {
    if (response.status === 201) {
      return response && response;
    }
  });
};





