import httpRequest from "services/axiosAuthoring"
import qs from "qs";

let base_url ="http://gapslmsservices.herokuapp.com"   //process.env.REACT_APP_API_URL2

export const makeRequest = (url, method="get", details) => {
  
  switch(method.toLowerCase()){
      case "post":
      case "put":
      case "patch":

        return fetch(url, {
            method: method.toLowerCase(),
            // credentials: "same-origin",
            headers: {
                // "X-CSRFToken": getCookie("csrftoken"),
                "Accept": "application/json",
                "Content-Type": "application/json",
                
            },
            body: JSON.stringify(details)
         });
        break;
      default: 
       console.log("calling get")
        return fetch(url, {
            method: method.toLowerCase(),
            // credentials: "same-origin",
            headers: {
                // "X-CSRFToken": getCookie("csrftoken"),
                "Accept": "application/json",
                "Content-Type": "application/json",
                
            },
        });
        break;


  }
  
}

export const getCourses = async ( limit=800000,offset=0) => {
  let url = base_url+ `/lms/api/courses/?limit=${limit}&offset=${offset}`;
  let request   = makeRequest(url)
  return request.then(function(response) {
    
         return response.json();
    }).then( (data) => {
        if (data){
          console.log("Data retrieved from lms:" + data)
          return data  
        }

    })
     
       
};

export const getInstitutionCourses = async (id=0,limit=800000,offset=0) => {
  let url = base_url+`/lms/api/courses/${id}/?limit=${limit}&offset=${offset}`


  let request   = makeRequest(url)
  return request.then(function(response) {
    
         return response.json();
    }).then( (data) => {
        if (data){
          console.log("Data retrieved from lms:" + data)
          return data  
        }

    })

 
};

export const getCourse = async (id) => {
  let url = base_url+ `/lms/api/course/${id}`

  let request   = makeRequest(url)
  return request.then(function(response) {
    
         return response.json();
    }).then( (data) => {
        if (data){
          console.log("Data retrieved from lms:" + data)
          return data  
        }

    })
  
};


export const createCourse = async (details) => {
 
     let url = base_url + "/lms/api/create/course"
  let request   = makeRequest(url, "post", details)


  return request.then(function(response) {
    
         return response.json();
    }).then( (data) => {
        if (data){
          console.log("Data retrieved from lms:" + data)
          return data  
        }

    })
  
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

  // let url = base_url + `courses/${id}/?limit=${limit}&offset=${offset}`
  // let request   = makeRequest(url)





  // let request   = makeRequest(url)
  // return request.then(function(response) {
    
  //        return response.json();
  //   }).then( (data) => {
  //       if (data){
  //         console.log("Data retrieved from lms:" + data)
  //         return data  
  //       }

  //   })


};



export const getInstitutions = async (limit=8000000,offset=0) => {
  

  let url = base_url + `/lms/api/institutions`
  let request   = makeRequest(url)

  return request.then(function(response) {
    
         return response.json();
    }).then( (data) => {
        if (data){
          console.log("Data retrieved from lms:" + data)
          return data  
        }

    })
};



export const getInstitution = async (id) => {
  

     let url = base_url + `/lms/api/institution/${id}`
  let request   = makeRequest(url)

  return request.then(function(response) {
    
         return response.json();
    }).then( (data) => {
        if (data){
          console.log("Data retrieved from lms:" + data)
          return data  
        }

    })
};


export const getInstructorProfiles = async (limit=8000000,offset=0) => {
  
   let url = base_url + `/profile-resource/api/author-profiles/`
  let request   = makeRequest(url)
  return request.then(function(response) {
    
         return response.json();
    }).then( (data) => {
        if (data){
          console.log("Data retrieved from lms:" + data)
          return data  
        }

    })
};




export const getInstructorProfile = async (id) => {
  let url = base_url + `/profile-resource/api/author-profiles/${id}`
  let request   = makeRequest(url)
  return request.then(function(response) {
    
         return response.json();
    }).then( (data) => {
        if (data){
          console.log("Data retrieved from lms:" + data)
          return data  
        }

    })
};











/*future implementations create*/



export const createSection = async (details) => {
 

    let url = base_url + "/lms/api/create/section"
  let request   = makeRequest(url, "post", details)

  return request.then(function(response) {
    
         return response.json();
    }).then( (data) => {
        if (data){
          console.log("Data retrieved from lms:" + data)
          return data  
        }

    })
};


export const createSubsection = async (details) => {
  
    let url = base_url + "/lms/api/create/subsection"
  let request   = makeRequest(url, "post", details)
  return request.then(function(response) {
    
         return response.json();
    }).then( (data) => {
        if (data){
          console.log("Data retrieved from lms:" + data)
          return data  
        }

    })
};

export const createLesson = async (details) => {
 


   let url = base_url + "/lms/api/create/lesson"
  let request   = makeRequest(url, "post", details)
  return request.then(function(response) {
    
         return response.json();
    }).then( (data) => {
        if (data){
          console.log("Data retrieved from lms:" + data)
          return data  
        }

    })
};


export const createInstitution = async (details) => {
  
   let url = base_url + "/lms/api/create/institution"
  let request   = makeRequest(url, "post", details)

  return request.then(function(response) {
    
         return response.json();
    }).then( (data) => {
        if (data){
          console.log("Data retrieved from lms:" + data)
          return data  
        }

    })
};



export const createGapsGroup = async (details) => {
  
   let url = base_url + "/lms/api/create/gaps-group"
  let request   = makeRequest(url, "post", details)

  return request.then(function(response) {
    
         return response.json();
    }).then( (data) => {
        if (data){
          console.log("Data retrieved from lms:" + data)
          return data  
        }

    })
};


export const createUserProfile = async (details) => {
  
   let url = base_url + "/lms/api/create/user-profile"
  let request   = makeRequest(url, "post", details)

  return request.then(function(response) {
    
         return response.json();
    }).then( (data) => {
        if (data){
          console.log("Data retrieved from lms:" + data)
          return data  
        }

    })
};



export const createStudentProfile = async (details) => {
  

  let url = base_url + "/lms/api/create/student-profile"
  

  let request   = makeRequest(url, "post", details)

  return request.then(function(response) {
    
         return response.json();
    }).then( (data) => {
        if (data){
          console.log("Data retrieved from lms:" + data)
          return data  
        }

    })
};




export const createAuthorProfile = async (details) => {
  let url = base_url + "/lms/api/create/author-profile"  

  let request   = makeRequest(url, "post", details)
  return request.then(function(response) {
    
         return response.json();
    }).then( (data) => {
        if (data){
          console.log("Data retrieved from lms:" + data)
          return data  
        }

    })

};


