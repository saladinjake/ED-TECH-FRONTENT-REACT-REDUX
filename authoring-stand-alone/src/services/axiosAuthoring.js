import axios from "axios";
import $ from "jquery";
let baseURL = process.env.REACT__URL2
  ? process.env.REACT__URL2
  : "http://gapslmsservices.herokuapp.com/lms/api";
let token;
let lms_token;
axios.defaults.headers.common["Content-Type"] =
  "application/x-www-form-urlencoded";
//axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;
axios.defaults.headers.common["Access-Control-Allow-Origin"] = "*";
axios.defaults.headers.common["Access-Control-Allow-Methods"] =
  "GET,PUT,POST,DELETE,PATCH,OPTIONS";
/**
 * Config global for axios/django
 */
//axios.defaults.xsrfHeaderName = "X-CSRFToken";
//axios.defaults.xsrfCookieName = "csrftoken";
axios.defaults.withCredentials = false;
axios.defaults.crossDomain = true;
axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

//in settings.py
const CSRF_COOKIE_NAME = "csrftoken";
function getCookie(name) {
  var cookieValue = null;
  if (document.cookie && document.cookie !== "") {
    var cookies = document.cookie.split(";");
    for (var i = 0; i < cookies.length; i++) {
      // var cookie = $.trim(cookies[i]);
      var cookie = cookies[i].toString().replace(/^([\s]*)|([\s]*)$/g, "");
      //var cookie =  cookies[i].trim()
      if (cookie.substring(0, name.length + 1) === name + "=") {
        cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
        break;
      }
    }
  }
  return cookieValue;
}

const instance = axios.create({
  baseURL,
});

var csrftoken = getCookie("csrftoken") || CSRF_COOKIE_NAME;
instance.interceptors.request.use(
  function (config) {
    // token = localStorage.getItem("token");
    // lms_token = localStorage.getItem("lms_token");
    // if (token && lms_token) {
    //   config.headers["Authorization"] = `Bearer ${token}`;
    //   config.headers["X-CSRFToken"] = csrftoken;
    // }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// import React from 'react';

// var csrftoken = getCookie('csrftoken');

// const CSRFToken = () => {
//     return (
//         <input type="hidden" name="csrfmiddlewaretoken" value={csrftoken} />
//     );
// };
// export default CSRFToken;

// import React, { Component , PropTypes} from 'react';

// import CSRFToken from './csrftoken';

// class aForm extends Component {
//     render() {

//         return (
//                  <form action="/endpoint" method="post">
//                         <CSRFToken />
//                         <button type="submit">Send</button>
//                  </form>
//         );
//     }
// }

// export default aForm;

//in django
//@ensure_csrf_cookie
//def myview(request):

// CSRF_TRUSTED_ORIGINS = ['front.bluemix.net']

// fetch("http://gapslmsservices.herokuapp.com/lms/api/courses/?limits=1000&offset=0", {
//     method: "get",
//     // credentials: "same-origin",
//     headers: {
//         // "X-CSRFToken": getCookie("csrftoken"),
//         "Accept": "application/json",
//         "Content-Type": "application/json"
//     },
//     // body: JSON.stringify(myData)
// }).then(function(response) {

//      return response.json();
// }).then(function(data) {

//     console.log("Data is ok", data);
// }).catch(function(ex) {

//     console.log("parsing failed", ex);
// });

export default instance;
