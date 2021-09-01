import httpRequest from "services/axiosAuthoring";
import qs from "qs";
let base_url = "http://gapslmsservices.herokuapp.com"; //process.env.REACT_APP_API_URL2
/*django ajax set up here for post request*/
var contentType = "multipart/form-data"
     window.drf = {
          csrfHeaderName: "X-CSRFTOKEN",
          csrfToken: "BflbcAqq5u5i8NdzTKBhUZmfFrYXlb1tZwq3EQPrUornyky8l9Vn2AKUJkfHXVR6"
    };

const getCookie = (name) => {
  var cookieValue = null;

  if (document.cookie && document.cookie != '') {
    var cookies = document.cookie.split(';');

    for (var i = 0; i < cookies.length; i++) {
      var cookie = $.trim(cookies[i]);

      // Does this cookie string begin with the name we want?
      if (cookie.substring(0, name.length + 1) == (name + '=')) {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

const  csrfSafeMethod = (method) => {
  // these HTTP methods do not require CSRF protection
  return (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));
}

const sameOrigin = (url) => {
  // test that a given url is a same-origin URL
  // url could be relative or scheme relative or absolute
  var host = document.location.host; // host + port
  var protocol = document.location.protocol;
  var sr_origin = '//' + host;
  var origin = protocol + sr_origin;

  // Allow absolute or scheme relative URLs to same origin
  return (url == origin || url.slice(0, origin.length + 1) == origin + '/') ||
    (url == sr_origin || url.slice(0, sr_origin.length + 1) == sr_origin + '/') ||
    // or any other URL that isn't scheme relative or absolute i.e relative.
    !(/^(\/\/|http:|https:).*/.test(url));
}


/*the post handler action*/
/*
*@param url : description: http://apibase/createlink 
*@param form : jquery form element
*@ Function createAnyResource: creates any resource via jquery formElement  
*@ example usage : createAnyResource("/lms/api/create/section", $("form")) // sweet!!!
*/
export const createAnyResource = (parts ="/lms/api/create/course/", formEl) => {
  var url = base_url+ parts;      
  var form = formEl[0]; // You need to use standard javascript object here
  var formData = new FormData(form);
  // Attach file only if the generic form contains (.* input[type="file"])
  if($('input[type=file]')[0].files[0].length > 0){
    for(let i=0; i < = $('input[type=file]')[0].files[0].length; i++){
      formData.append('filename', $('input[type=file]')[0].files[0][i]);//
    }
  }
  // in the future get the csrf token from the header after identity is established 
  var csrftoken = window.drf.csrfToken;
  $.ajaxSetup({
    beforeSend: function(xhr, settings) {
      if (!csrfSafeMethod(settings.type)  // && sameOrigin(settings.url)

      ) {
        // Send the token to same-origin, relative URLs only.
        // Send the token only if the method warrants CSRF protection
        // Using the CSRFToken value acquired earlier
  
        //if only file download is required or needed via backend to check for file upload
        // xhr.setRequestHeader("Content-Disposition", 'attachment; filename=' + form[0].files.name);
        xhr.overrideMimeType("multipart/form-data");
        
        xhr.setRequestHeader(window.drf.csrfHeaderName, csrftoken);
        }
      }
    });

    if (contentType) {
      if (contentType === 'multipart/form-data') {
        if (!window.FormData) {
          alert('Your browser does not support AJAX multipart form submissions');
          return;
        }
        //this is needed in multipart/forms
        contentType = false;
        // console.log(form[0])
      } else {
        contentType = 'application/x-www-form-urlencoded; charset=UTF-8'
        data = form.serialize();
      }
    }

    //make the post request
    var httpRequestAjax = $.ajax({
        url: url,
        // method: "POST",
        type:"POST",
        data:formData,
        // data: JSON.stringify(data), // if not multipart form
        contentType: false, // NEEDED, DON'T OMIT THIS (requires jQuery 1.6+)
        processData: false, // NEEDED, DON'T OMIT THIS
        headers: {
          'Accept': 'text/html; q=1.0, */*'  // let the backend accepts html element of the form data request instead of jsons
        },
      });

    /*jquery always ajax method used instead of success and error*/
    httpRequestAjax.always(function(data, textStatus, jqXHR) {
        if (textStatus != 'success') {
          jqXHR = data;
        }
        var responseContentType = jqXHR.getResponseHeader("content-type") || "";
        if (responseContentType.toLowerCase().indexOf('text/html') === 0) {
          // do something awesome like animate success box
        } else {
           console.log(responseContentType)
        }
      });

      return httpRequestAjax;
}





/*api request*/

export const makeRequest = (url, method = "get", details) => {
  switch (method.toLowerCase()) {
  
    case "put":
    case "patch":

      fetch(url, {
        method: "post",
        // credentials: "same-origin",
        headers: {
          // "X-CSRFToken": getCookie("csrftoken"),
          Accept: "application/json",
          "Content-Type": "application/json",
        },
    
        body: JSON.stringify(details)
        // body: JSON.stringify(details),
      }).then(res => res.json())
      .then(data => { 
        console.log(data) 
      })
      break;
    case "get":
      console.log("calling get");
      return fetch(url, {
        method: method.toLowerCase(),
        // credentials: "same-origin",
        headers: {
          // "X-CSRFToken": getCookie("csrftoken"),
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      });
      break;
    default:
      throw new Error("misuse of library")
      return false

  }
};

export const getCourses = async (limit = 800000, offset = 0) => {
  let url = base_url + `/lms/api/courses/?limit=${limit}&offset=${offset}`;
  let request = makeRequest(url);
  return request
    .then(function (response) {
      return response.json();
    })
    .then((data) => {
      if (data) {
        console.log("Data retrieved from lms:" + data);
        return data;
      }
    });
};

export const getInstitutionCourses = async (
  id = 0,
  limit = 800000,
  offset = 0
) => {
  let url =
    base_url + `/lms/api/courses/${id}/?limit=${limit}&offset=${offset}`;

  let request = makeRequest(url);
  return request
    .then(function (response) {
      return response.json();
    })
    .then((data) => {
      if (data) {
        console.log("Data retrieved from lms:" + data);
        return data;
      }
    });
};

export const getCourse = async (id) => {
  let url = base_url + `/lms/api/course/${id}`;

  let request = makeRequest(url);
  return request
    .then(function (response) {
      return response.json();
    })
    .then((data) => {
      if (data) {
        console.log("Data retrieved from lms:" + data);
        return data;
      }
    });
};

//awesome
export const createCourse = async (parts, form ) => {
  return createAnyResource(parts, form)
};


/*will try this method differently for update: Realworld solutions provided here*/
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

export const getInstitutions = async (limit = 8000000, offset = 0) => {
  let url = base_url + `/lms/api/institutions`;
  let request = makeRequest(url);

  return request
    .then(function (response) {
      return response.json();
    })
    .then((data) => {
      if (data) {
        console.log("Data retrieved from lms:" + data);
        return data;
      }
    });
};

export const getInstitution = async (id) => {
  let url = base_url + `/lms/api/institution/${id}`;
  let request = makeRequest(url);

  return request
    .then(function (response) {
      return response.json();
    })
    .then((data) => {
      if (data) {
        console.log("Data retrieved from lms:" + data);
        return data;
      }
    });
};

export const getInstructorProfiles = async (limit = 8000000, offset = 0) => {
  let url = base_url + `/profile-resource/api/author-profiles/`;
  let request = makeRequest(url);
  return request
    .then(function (response) {
      return response.json();
    })
    .then((data) => {
      if (data) {
        console.log("Data retrieved from lms:" + data);
        return data;
      }
    });
};

export const getInstructorProfile = async (id) => {
  let url = base_url + `/profile-resource/api/author-profiles/${id}`;
  let request = makeRequest(url);
  return request
    .then(function (response) {
      return response.json();
    })
    .then((data) => {
      if (data) {
        console.log("Data retrieved from lms:" + data);
        return data;
      }
    });
};

/*future implementations create*/

export const createSection = async (details) => {
  let url = base_url + "/lms/api/create/section";
  let request = makeRequest(url, "post", details);

  return request
    .then(function (response) {
      return response.json();
    })
    .then((data) => {
      if (data) {
        console.log("Data retrieved from lms:" + data);
        return data;
      }
    });
};

export const createSubsection = async (details) => {
  let url = base_url + "/lms/api/create/subsection";
  let request = makeRequest(url, "post", details);
  return request
    .then(function (response) {
      return response.json();
    })
    .then((data) => {
      if (data) {
        console.log("Data retrieved from lms:" + data);
        return data;
      }
    });
};

export const createLesson = async (details) => {
  let url = base_url + "/lms/api/create/lesson";
  let request = makeRequest(url, "post", details);
  return request
    .then(function (response) {
      return response.json();
    })
    .then((data) => {
      if (data) {
        console.log("Data retrieved from lms:" + data);
        return data;
      }
    });
};

export const createInstitution = async (details) => {
  let url = base_url + "/lms/api/create/institution";
  let request = makeRequest(url, "post", details);

  return request
    .then(function (response) {
      return response.json();
    })
    .then((data) => {
      if (data) {
        console.log("Data retrieved from lms:" + data);
        return data;
      }
    });
};

export const createGapsGroup = async (details) => {
  let url = base_url + "/lms/api/create/gaps-group";
  let request = makeRequest(url, "post", details);

  return request
    .then(function (response) {
      return response.json();
    })
    .then((data) => {
      if (data) {
        console.log("Data retrieved from lms:" + data);
        return data;
      }
    });
};

export const createUserProfile = async (details) => {
  let url = base_url + "/lms/api/create/user-profile";
  let request = makeRequest(url, "post", details);

  return request
    .then(function (response) {
      return response.json();
    })
    .then((data) => {
      if (data) {
        console.log("Data retrieved from lms:" + data);
        return data;
      }
    });
};

export const createStudentProfile = async (details) => {
  let url = base_url + "/lms/api/create/student-profile";

  let request = makeRequest(url, "post", details);

  return request
    .then(function (response) {
      return response.json();
    })
    .then((data) => {
      if (data) {
        console.log("Data retrieved from lms:" + data);
        return data;
      }
    });
};

export const createAuthorProfile = async (details) => {
  let url = base_url + "/lms/api/create/author-profile";

  let request = makeRequest(url, "post", details);
  return request
    .then(function (response) {
      return response.json();
    })
    .then((data) => {
      if (data) {
        console.log("Data retrieved from lms:" + data);
        return data;
      }
    });
};
