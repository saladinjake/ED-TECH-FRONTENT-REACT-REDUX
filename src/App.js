import React, { useEffect } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ScrollToTop from "helper/ScrollToTop";
import { GlobalStyle } from "components/common/styles/global.js";
import HomeOne from "HomeOne";
import About from "pages/about/About";
import NewAbout from "pages/about/NewAbout";
import ForInstructor from "pages/instructors/ForInstructor";
import ForBusiness from "pages/instructors/ForBusiness";
import ForGovernment from "pages/instructors/ForGovernment";
import ForSchool from "pages/instructors/ForSchool";
import Checkout from "pages/checkout/Checkout";
import Contact from "./pages/contact/Contact";
import CourseGrid from "pages/courses/CourseGrid";
import CourseGridList from "pages/courses/CourseGridList";

import ResponsiveGrid from "pages/courses/components/ResponsiveGrid";

import ProgramGrid from "pages/courses/ProgramGrid";
import ProgramGridList from "pages/courses/ProgramGridList";

import CourseDetails from "pages/courses/CourseDetails";
import CoursePreview from "pages/courses/CoursePreview";

import Instructor from "pages/instructor/Instructors";
import InstructorDetails from "pages/instructor/InstructorDetails";
import Institution from "pages/institution/Institutions";
import InstitutionDetails from "pages/institution/InstitutionDetails";
import Login from "pages/account/Login";
import LearnerProfiler from "pages/profile/LearnerProfile";
import InstructorProfiler from "pages/profile/InstructorProfile";
import UpdateLearner from "pages/profile/UpdateLearner";
import UpdateInstructor from "pages/profile/UpdateInstructor";
import Register from "pages/account/Register";
import ResetPassword from "pages/account/ResetPassword";
import ForgotPassword from "pages/account/PasswordForgot";
import ChangeCredentials from "pages/account/LoggedOutChangePassword";
import InstructorRegister from "pages/account/InstructorRegister";
import BusinessRegister from "pages/account/BusinessRegister";
import PageNotFound from "pages/404/PageNotFound";
// import Product from "pages/shop/Products";
import InstructorCourses from "pages/instructors/InstructorCourses";
import MyInstructorCourses from "pages/instructorAuthoredCourses/MyLearning";
// import CreateCourse from "pages/account/CreateCourse";
import CreateCourseForm from "pages/account/CreateCourseForm";
import EditCourseForm from "pages/account/NewEditForm";
import InstructorDashboard from "pages/instructors/InstructorDashboard";
import NewInstructorDashboard from "pages/dashboardInstructor/MyDashboard";

import Cart from "pages/shop/Cart";
import WishLists from "pages/shop/Wishlist";
// import DashBoard from "pages/shop/Dashboard";
import Billing from "pages/shop/Billing";
// import Notifications from "pages/shop/Notifications";
import InstructorNotifications from "pages/instructors/InstructorNotifications";
import InstructorPendingCourses from "pages/instructors/InstructorPendingCourses";
import InstructorDeclinedCourses from "pages/instructors/InstructorDeclinedCourses";
// import { Toaster } from "react-hot-toast";
import LearnersRoute from "routes/LearnersRoute";
import InstructorsRoute from "routes/InstructorsRoute";
// import AuthenticatedRoute from "routes/AuthenticatedRoute";
import PublicRoute from "routes/PublicRoute";

import MylearningDashboard from "./pages/courses/components/MyLearning";
import OverViewPane from "./pages/dashboard/MyDashboard";
import SortTest from "./SortTest";
import NewNotifications from "./pages/mynotifications/Notifications";
import NewInstructorNotifications from "./pages/mynotifications/NewInstructorNotification";
import WorkBench from "./pages/workbench/WorkSheet";

import Purchases from "./pages/purchases/Purchases";

import history from "./history";

import HomePageDesign from "./newHome/home";
import HomePageDesignTwo from "./newHome/home2";

import Terms from "./pages/terms/Terms";
import Privacy from "./pages/terms/Privacy";
import Honor from "./pages/terms/Honor";
import BlogClassic from "./pages/blog/BlogClassic";
import BlogDetail from "./pages/blog/BlogDetails";
import Events from "./pages/events/Events";
import EventsDetails from "./pages/events/EventsDetails";
import CareersPage from "./pages/careers/Career";
import HelpCenter from "./pages/help/Help";

import DynamicContentForInstitutions from "./pages/institution/NewInstitutionDetailLanding";
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
import AuthoringSectionDynamicLessons from "pages/AuthoringTool/dynamic_content";
import AuthoringSectionDynamicLessons3 from "pages/AuthoringTool/dynamic_content_3layer";

import AuthoringPreview from "./pages/AuthoringTool/preview"
import TestForm from "pages/AuthoringTool/test-formcreate";
import $ from "jquery";

function App(props) {
  useEffect(() => {
    $(".footer p , .footer span").each(function () {
      $(this).css({ color: "#fff" });
    });



    // Selecting all required elements
const wrapper = document.querySelector(".wrapper-notice"),
toast = wrapper.querySelector(".toast-offline"),
title = toast.querySelector("span"),
subTitle = toast.querySelector("p"),
wifiIcon = toast.querySelector(".icon"),
closeIcon = toast.querySelector(".close-icon");

window.onload = ()=>{
    function ajax(){
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
    }
  });

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


      <div class="wrapper-notice">
          <div class="toast-offline">
            <div class="content">
                  <div class="icon"><i class=" fa fa-wifi "></i></div>
                      <div class="details">
                        <span>Network status</span>
                        <p>Connecting...</p>
                      </div>
                  </div>
                <div class="close-icon"><i class="fa fa-times"></i></div>
          </div>
        </div>


        <div class="notification-notice">
          <div class="toast-offline2">
            <div class="content">
                  <div class="icon"><i class=" fa fa-wifi "></i></div>
                      <div class="details">
                        <span>Information Message</span>
                        <p></p>
                      </div>
                  </div>
                <div class="close-icon"><i class="fa fa-times"></i></div>
          </div>
        </div>
      
      <Notification />
      <GlobalStyle />
      <ScrollToTop />
      <Switch>
        <Route
          exact
          path={`${process.env.PUBLIC_URL + "/"}`}
          component={HomePageDesignTwo}
        />

        <Route
          path={`${process.env.PUBLIC_URL + "/about"}`}
          component={NewAbout}
        />
        <Route
          path={`${process.env.PUBLIC_URL + "/contact"}`}
          component={Contact}
        />
        <Route
          path={`${process.env.PUBLIC_URL + "/instructor"}`}
          component={ForInstructor}
        />
        <Route
          path={`${process.env.PUBLIC_URL + "/government"}`}
          component={ForGovernment}
        />
        <Route
          path={`${process.env.PUBLIC_URL + "/schools"}`}
          component={ForSchool}
        />
        <Route
          path={`${process.env.PUBLIC_URL + "/business"}`}
          component={ForBusiness}
        />

        <Route
          exact
          path={`${process.env.PUBLIC_URL + "/courses"}`}
          component={
            CourseGrid //CourseGridList
          }
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL + "/course-grid/list"}`}
          component={CourseGrid}
        />

        <Route exact path="/courses/category/:id" component={CourseGrid} />

        <Route
          exact
          path={`${process.env.PUBLIC_URL + "/instructors"}`}
          component={Instructor}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL + "/instructors/:id"}`}
          component={InstructorDetails}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL + "/institutions"}`}
          component={Institution}
        />

        <Route
          exact
          path={`${process.env.PUBLIC_URL + "/institute/:id"}`}
          component={DynamicContentForInstitutions}
        />

        <Route
          exact
          path={`${process.env.PUBLIC_URL + "/institution/:id"}`}
          component={InstitutionDetails}
        />

        <PublicRoute
          exact
          path={`${process.env.PUBLIC_URL + "/register/instructor"}`}
          component={InstructorRegister}
        />
        <PublicRoute
          exact
          path={`${process.env.PUBLIC_URL + "/register/business"}`}
          component={BusinessRegister}
        />

        <Route path={`${process.env.PUBLIC_URL + "/cart"}`} component={Cart} />
        <Route
          exact
          path={`${process.env.PUBLIC_URL + "/checkout"}`}
          component={Checkout}
        />
        <Route
          path={`${process.env.PUBLIC_URL + "/payment/callback"}`}
          component={Checkout}
        />
        <LearnersRoute
          exact
          path={`${process.env.PUBLIC_URL + "/learner/profile/update"}`}
          component={UpdateLearner}
        />
        <LearnersRoute
          exact
          path={`${process.env.PUBLIC_URL + "/learner/profile"}`}
          component={LearnerProfiler}
        />
        <LearnersRoute exact path="/billing" component={Billing} />

        {/*<InstructorsRoute
          exact
          path="/instructor-pages/dashboard"
          component={InstructorDashboard}
        />*/}

        <InstructorsRoute
          exact
          path="/instructor-pages/dashboard"
          component={NewInstructorDashboard}
        />

        <InstructorsRoute
          exact
          path="/instructor-pages/profile"
          component={InstructorProfiler}
        />
        {/*<InstructorsRoute
          exact
          path="/instructor-pages/mycourses"
          component={InstructorCourses}
        />*/}

        <InstructorsRoute
          exact
          path="/instructor-pages/mycourses"
          component={MyInstructorCourses}
        />
        <InstructorsRoute
          exact
          path={`${
            process.env.PUBLIC_URL + "/instructor-detail/profile/update"
          }`}
          component={UpdateInstructor}
        />

        <InstructorsRoute
          exact
          path={`${process.env.PUBLIC_URL + "/instructor-pages/notifications"}`}
          component={NewInstructorNotifications}
        />

        {/*<InstructorsRoute
          exact
          path={`${
            process.env.PUBLIC_URL + "/instructor-pages/course-edit/:id"
          }`}
          component={EditCourseForm}
        />*/}

        <InstructorsRoute
          exact
          path={`${process.env.PUBLIC_URL + "/course-preview/:id"}`}
          component={CoursePreview}
        />

        <InstructorsRoute
          exact
          path={`${process.env.PUBLIC_URL + "/instructor-pages/course/create"}`}
          component={CreateCourseForm}
        />

        <InstructorsRoute
          exact
          path={`${
            process.env.PUBLIC_URL + "/instructor-pages/course/pending"
          }`}
          component={InstructorPendingCourses}
        />
        <InstructorsRoute
          exact
          path={`${
            process.env.PUBLIC_URL + "/instructor-pages/course/declined"
          }`}
          component={InstructorDeclinedCourses}
        />
        <LearnersRoute
          exact
          path="/mycourses"
          component={MylearningDashboard}
        />
        <LearnersRoute
          exact
          path="/notifications"
          component={NewNotifications}
        />
        <LearnersRoute
          path={`${process.env.PUBLIC_URL + "/dashboard"}`}
          component={OverViewPane}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL + "/courses/:id"}`}
          component={CourseDetails}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL + "/courses/:id/:slug"}`}
          component={CourseDetails}
        />

        <LearnersRoute
          path={`${process.env.PUBLIC_URL + "/learner/accounts"}`}
          component={ResetPassword}
        />
        <InstructorsRoute
          path={`${process.env.PUBLIC_URL + "/instructor-account/reset"}`}
          component={ResetPassword}
        />

        <LearnersRoute
          path={`${process.env.PUBLIC_URL + "/learner/purchase/history"}`}
          component={Purchases}
        />

        <Route
          path={`${process.env.PUBLIC_URL + "/password-forgot"}`}
          component={ForgotPassword}
        />

        <Route
          path={`${process.env.PUBLIC_URL + "/sorttest"}`}
          component={SortTest}
        />

        {/*THESE HAS NOW BEEN PLACED IN A MODAL*/}
        {/*<PublicRoute
          exact
          path={`${process.env.PUBLIC_URL + "/login"}`}
          component={Login}
        />

        <PublicRoute
          exact
          path={`${process.env.PUBLIC_URL + "/register"}`}
          component={Register}
        />*/}

        <PublicRoute
          exact
          path={`${process.env.PUBLIC_URL + "/password/reset/:id"}`}
          component={ChangeCredentials}
        />

        <LearnersRoute
          path={`${process.env.PUBLIC_URL + "/learner/wishlists"}`}
          component={WishLists}
        />

        <Route
          exact
          path={`${process.env.PUBLIC_URL + "/programs"}`}
          component={ProgramGrid}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL + "/programs-grid/list"}`}
          component={ProgramGridList}
        />

        <Route
          exact
          path={`${process.env.PUBLIC_URL + "/home"}`}
          component={HomePageDesign}
        />

        <Route
          exact
          path={`${process.env.PUBLIC_URL + "/home-2"}`}
          component={HomePageDesignTwo}
        />

        <Route
          exact
          path={`${process.env.PUBLIC_URL + "/learning/workbench/:id"}`}
          component={WorkBench}
        />

        <Route
          exact
          path={`${process.env.PUBLIC_URL + "/terms"}`}
          component={Terms}
        />

        <Route
          exact
          path={`${process.env.PUBLIC_URL + "/privacy"}`}
          component={Privacy}
        />

        <Route
          exact
          path={`${process.env.PUBLIC_URL + "/honor"}`}
          component={Honor}
        />

        <Route
          exact
          path={`${process.env.PUBLIC_URL + "/blog"}`}
          component={BlogClassic}
        />

        <Route
          exact
          path={`${process.env.PUBLIC_URL + "/blog-details"}`}
          component={BlogDetail}
        />

        <Route
          exact
          path={`${process.env.PUBLIC_URL + "/news"}`}
          component={Events}
        />

        <Route
          exact
          path={`${process.env.PUBLIC_URL + "/event-details"}`}
          component={EventsDetails}
        />

        <Route
          exact
          path={`${process.env.PUBLIC_URL + "/careers"}`}
          component={CareersPage}
        />

        <Route
          exact
          path={`${process.env.PUBLIC_URL + "/test-grid"}`}
          component={ResponsiveGrid}
        />

        <Route
          exact
          path={`${process.env.PUBLIC_URL + "/authoring/dashboard"}`}
          component={AuthoringDashboard}
        />

        <Route
          exact
          path={`${process.env.PUBLIC_URL + "/authoring/course/history"}`}
          component={AuthoringCourseList}
        />

        <Route
          exact
          path={`${process.env.PUBLIC_URL + "/authoring/create/new"}`}
          component={AuthorForm}
        />

        <Route
          exact
          path={`${process.env.PUBLIC_URL + "/authoring/create/new/:id"}`}
          component={AuthorFormCont}
        />


        <Route
          exact
          path={`${process.env.PUBLIC_URL + "/authoring/preview/:id"}`}
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

        <Route
          exact
          path={`${process.env.PUBLIC_URL + "/test/lesson-content"}`}
          component={AuthoringSectionDynamicLessons}
        />

        <Route
          exact
          path={`${process.env.PUBLIC_URL + "/test/lesson-content3"}`}
          component={AuthoringSectionDynamicLessons3}
        />

        {/*test grounds*/}

        <Route
          exact
          path={`${process.env.PUBLIC_URL + "/test"}`}
          component={TestForm}
        />

        <Route component={PageNotFound} />
      </Switch>
    </Router>
  );
}

export default App;
