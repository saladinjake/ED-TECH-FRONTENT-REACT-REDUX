import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ScrollToTop from "helper/ScrollToTop";
import { GlobalStyle } from "components/common/styles/global.js";

// import Login from "pages/account/Login";
// import InstructorProfiler from "pages/profile/InstructorProfile";
// import Register from "pages/account/Register";
// import ResetPassword from "pages/account/ResetPassword";
// import ForgotPassword from "pages/account/PasswordForgot";
// import ChangeCredentials from "pages/account/LoggedOutChangePassword";
import PageNotFound from "pages/404/PageNotFound";

// import { Toaster } from "react-hot-toast";
import LearnersRoute from "routes/LearnersRoute";
import InstructorsRoute from "routes/InstructorsRoute";
// import AuthenticatedRoute from "routes/AuthenticatedRoute";
import PublicRoute from "routes/PublicRoute";

import history from "./history";
import "./responsive.css";
import "./app.css";
import "./pre-style.css";
import Notification from "./Toaster";

import AuthoringDashboard from "./pages/AuthoringTool/dashboard";
import AuthoringCourseList from "./pages/AuthoringTool/courselist";
import AuthorForm from "./pages/AuthoringTool/createcourse";
import AuthorFormCont from "./pages/AuthoringTool/createcourse_cont";
import AuthorSales from "./pages/AuthoringTool/Sales";
import AuthorPayments from "./pages/AuthoringTool/Payments";
import AuthorPaymentSetting from "./pages/AuthoringTool/Paymentsettings";
import AuthorProfileSetting from "./pages/AuthoringTool/ProfilePage";

 import AuthoringPreview from "./pages/AuthoringTool/preview"


import $ from "jquery";

import {
  createAnyResource
} from "services/authoring"

const testAjaxificationGet = async (mode="GET",params) => {
   return $.ajax( {
      url: "http://gapslmsservices.herokuapp.com/lms/api/courses?limit=1000&offset=0",
      mode:mode, //use type for post
      contentType: "application/x-www-form-urlencoded; charset=UTF-8", //enc
      data: params, //
    });
}


const testAjaxificationPostX = async (mode="POST",url,form) => {

     try{

   // // let res = await  createAnyResource(
   // //    "POST",
   // //    "/lms/api/create/course/",
   // //     form
   // // );



   // // console.log(res)
   // return res;
   
    }catch(e){
      alert("You only get better if you try harder")
      console.log(e)
    }




   
   
   
}



function App(props) {
  useEffect( async () => {
    $(".footer p , .footer span").each(function () {
      $(this).css({ color: "#fff" });
    });



   let form = $("<form id='create-course' method='POST'></form>");
   let name = $("<input type='text' />")
   name.val("An hidden way to create data to post here")
   name.attr("name","name");
   form.append(name);
   let course_code = $("<input type='text' />");
   course_code.val("123456789"); course_code.attr("name","code");
   form.append(course_code);
   let author = $("<input type='text' />"); author.attr("name","author");
   author.val("30007f4a-0826-4416-ab5e-3b6d236876ad")
   form.append(author)
   let institution = $("<input type='text' />");
   institution.attr("name","institution")
   institution.val("cb85e4ff-6636-4201-8e9f-5a9259c936bf");
   form.append(institution) 


    let res = await testAjaxificationPostX("POST","", form)
    console.log(res)


   //$(document).ready(()=>{



        // Selecting all required elements
    const wrapper = document.querySelector(".wrapper-notice"),
    toast = wrapper.querySelector(".toast-offline"),
    title = toast.querySelector("span"),
    subTitle = toast.querySelector("p"),
    wifiIcon = toast.querySelector(".icon"),
    closeIcon = toast.querySelector(".close-icon");
   
      
     function ajax(){
        try{
          let xhr = new XMLHttpRequest(); //creating new XML object
          xhr.open("GET", "https://jsonplaceholder.typicode.com/posts", true); //sending get request on this URL
          xhr.onload = ()=>{ //once ajax loaded
              //if ajax status is equal to 200 or less than 300 that mean user is getting data from that provided url
              //or his/her response status is 200 that means he/she is online
              if(xhr.status == 200 && xhr.status < 300){
                  toast.classList.remove("offline");
                  title.innerText = "You're online now";
                  subTitle.innerText = "Internet Connection Established.";
                  wifiIcon.innerHTML = '<i class="uil uil-wifi fa fa-wifi fa-2x"></i>';
                  closeIcon.onclick = ()=>{ //hide toast notification on close icon click
                      wrapper.classList.add("hide");
                  }
                  setTimeout(()=>{ //hide the toast notification automatically after 5 seconds
                      wrapper.classList.add("hide");
                  }, 5000);
              }else{
                  offline(); //calling offline function if ajax status is not equal to 200 or not less that 300
              }
          }
          xhr.onerror = ()=>{
              offline(); ////calling offline function if the passed url is not correct or returning 404 or other error
          }
          xhr.send(); //sending get request to the passed url
        }catch(e){
          
        }
      }

        function offline(){ //function for offline
            wrapper.classList.remove("hide");
            toast.classList.add("offline");
            title.innerText = "You're offline now";
            subTitle.innerText = "Opps! Internet is disconnected.";
            wifiIcon.innerHTML = '<i class="uil uil-wifi-slash"></i>';
        }

        setInterval(()=>{ //this setInterval function call ajax frequently after 100ms
            ajax();
        }, 100);
        

     //   })
  },[]);

  return (
    <Router history={history}>
      {/*<Toaster
       
        toastOptions={{
          success: {
            style: {
              background: "green",
              color: "#ffffff",
              

            },
          },
          error: {
            style: {
              background: "orangered",
              color: "#ffffff",
              

            },
          },
        }}
      />*/}


      
      <Notification />
      <GlobalStyle />
      <ScrollToTop />
      <Switch>
        
        <Route
          exact
          path={`${process.env.PUBLIC_URL + "/authoring/dashboard"}`}
          component={AuthoringDashboard}
        />

        <Route
          exact
          path={`${process.env.PUBLIC_URL + "/"}`}
          component={AuthoringCourseList}
        />

        <Route
          exact
          path={`${process.env.PUBLIC_URL + "/course/create/new"}`}
          component={AuthorForm}
        />

        <Route
          exact
          path={`${process.env.PUBLIC_URL + "/course/continue/edit/:id"}`}
          component={AuthorFormCont}
        />


        <Route
          exact
          path={`${process.env.PUBLIC_URL + "/course/preview/:id"}`}
          component={AuthoringPreview}
        />

        <Route
          exact
          path={`${process.env.PUBLIC_URL + "/authoring/sales/history"}`}
          component={AuthorSales}
        />

        <Route
          exact
          path={`${process.env.PUBLIC_URL + "/authoring/payment/history"}`}
          component={AuthorPayments}
        />

        <Route
          exact
          path={`${process.env.PUBLIC_URL + "/authoring/payment/settings"}`}
          component={AuthorPaymentSetting}
        />

        <Route
          exact
          path={`${process.env.PUBLIC_URL + "/authoring/profile/settings"}`}
          component={AuthorProfileSetting}
        />


        {/*test grounds*/}

        

        <Route component={PageNotFound} />
      </Switch>
    </Router>
  );
}

export default App;
