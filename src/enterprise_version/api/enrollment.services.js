/* eslint-disable no-unused-vars */
import axios from "./api_config/axios.config";
import { BASE_URL } from "./api_config/constants";
import toast from "react-hot-toast";

export const enrollCourses = async (data) => {
  let request = axios.post("enrollments/enrol/learnerEnrolMultiple", data);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const checkoutCourses = async (data) => {
  let request = axios.post("checkout", data);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};

export const getEnrolledCourse = async (id) => {
  let request = axios.get(`enrollments/me`);
  return request.then((response) => {
    if (response.status === 200) {
      return response && response;
    }
  });
};



export const enrollCourseInLMS = (payload) =>{


  var formdata = new FormData();
    formdata.append("overall_score", payload.overall_score);
    formdata.append("course_is_complete", payload.course_is_complete);
    formdata.append("start_date", payload.start_date);
    formdata.append("end_date", payload.end_date);
    formdata.append("user", payload.user);
    formdata.append("course", payload.course);
    formdata.append("completed_section", []);
    formdata.append("completed_subsection", []);
    formdata.append("completed_lesson", []);

    var requestOptions = {
      method: 'POST',
      body: formdata,
      redirect: 'follow'
    };

    fetch(`${BASE_URL}/lms/api/create/enrollment/`, requestOptions)
      .then(response => response.json())
      .then(result => {
        console.log(result);
       
        toast.success("Enrollment Successful");
        setTimeout(() => {
          window.location.reload();
        }, 2000);

      })
      .catch(error => { 
        //console.log('error', error)


        toast.error(error);
        


      });
}