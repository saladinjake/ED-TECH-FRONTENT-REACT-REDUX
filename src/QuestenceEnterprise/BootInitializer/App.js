/*
*
*
*
*
*
*
*
*
*/
import React, { useEffect } from "react";
import './App.css';
/*Import requirements and configuration files*/
import history from "../ApplicationBinaries/helpers/history";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"; 
//import Notification from "./Toaster";
/*import components and pages*/
import HomeScreen from '../ApplicationBinaries/views/HomeScreen';
import Contact from "../ApplicationBinaries/views/contact/Contact";
import CourseScreen from "../ApplicationBinaries/views/courses/CourseGrid"
import NewAbout from "../ApplicationBinaries/views/about/NewAbout";
import ForInstructor from "../ApplicationBinaries/views/instructors/ForInstructor";
import ForBusiness from "../ApplicationBinaries/views/instructors/ForBusiness";
import ForGovernment from "../ApplicationBinaries/views/instructors/ForGovernment";
import ForSchool from "../ApplicationBinaries/views/instructors/ForSchool";
import Instructor from "../ApplicationBinaries/views/instructor/Instructors";
import InstructorDetails from "../ApplicationBinaries/views/instructor/InstructorDetails";
import Institution from "../ApplicationBinaries/views/institution/Institutions";
import DynamicContentForInstitutions from "../ApplicationBinaries/views/institution/NewInstitutionDetailLanding";
import Terms from "../ApplicationBinaries/views/terms/Terms";
import Privacy from "../ApplicationBinaries/views/terms/Privacy";
import Honor from "../ApplicationBinaries/views/terms/Honor";
import BlogClassic from "../ApplicationBinaries/views/blog/BlogClassic";
import BlogDetail from "../ApplicationBinaries/views/blog/BlogDetails";
import Events from "../ApplicationBinaries/views/events/Events";
import EventsDetails from "../ApplicationBinaries/views/events/EventsDetails";
import CareersPage from "../ApplicationBinaries/views/careers/Career";
import HelpCenter from "../ApplicationBinaries/views/help/Help";
import PageNotFound from "../ApplicationBinaries/views/404/PageNotFound";
/*login and registration pages have been changed to modal so there are no pages links to them*/
/*find the login registration in the shared folder of the components root folder called authentication module*/
import ResetPassword from "../ApplicationBinaries/views/accounts/ResetPassword";
import ChangeCredentials from "../ApplicationBinaries/views/accounts/LoggedOutChangePassword";
import Checkout from "../ApplicationBinaries/views/checkout/Checkout";
import Cart from "../ApplicationBinaries/views/shop/Cart";
import WishLists from "../ApplicationBinaries/views/shop/Wishlist";
import Billing from "../ApplicationBinaries/views/shop/Billing";
import LearnerProfiler from "../ApplicationBinaries/views/profile/LearnerProfile";
import InstructorProfiler from "../ApplicationBinaries/views/profile/InstructorProfile";
import UpdateLearner from "../ApplicationBinaries/views/profile/UpdateLearner";
import UpdateInstructor from "../ApplicationBinaries/views/profile/UpdateInstructor";
import WorkBench from "../ApplicationBinaries/views/workbench/WorkSheet";
import Purchases from "../ApplicationBinaries/views/purchases/Purchases";

import CreateCourseForm from "../ApplicationBinaries/views/miniauthoring/CreateCourseForm";
import EditCourseForm from "../ApplicationBinaries/views/miniauthoring/NewEditForm";
import InstructorDashboard from "../ApplicationBinaries/views/instructors/InstructorDashboard";
import NewInstructorDashboard from "../ApplicationBinaries/views/dashboardInstructor/MyDashboard";
import InstructorCourses from "../ApplicationBinaries/views/instructors/InstructorCourses";
import InstructorNotifications from "../ApplicationBinaries/views/instructors/InstructorNotifications";
import InstructorPendingCourses from "../ApplicationBinaries/views/instructors/InstructorPendingCourses";
import InstructorDeclinedCourses from "../ApplicationBinaries/views/instructors/InstructorDeclinedCourses";
import MyInstructorCourses from "../ApplicationBinaries/views/instructorAuthoredCourses/MyLearning";
import MylearningDashboard from "../ApplicationBinaries/views/courses/components/MyLearning";
import OverViewPane from "../ApplicationBinaries/views/dashboard/MyDashboard";
import NewNotifications from "../ApplicationBinaries/views/mynotifications/Notifications";
import NewInstructorNotifications from "../ApplicationBinaries/views/mynotifications/NewInstructorNotification";
import CourseDetails from "../ApplicationBinaries/views/courses/CourseDetails";
import CoursePreview from "../ApplicationBinaries/views/courses/CoursePreview";
/*higer ordered components middlewares*/
import LearnersRoute from "../ApplicationBinaries/middlewares/LearnersRoute";
import InstructorsRoute from "../ApplicationBinaries/middlewares/InstructorsRoute";
import AuthenticatedRoute from "../ApplicationBinaries/middlewares/AuthenticatedRoute";
import PublicRoute from "../ApplicationBinaries/middlewares/PublicRoute";



import Notification from "../ApplicationBinaries/helpers/Toaster";

const App = () => {
{/*router outlets:components entry point*/}
   return (

   <Router history={history}>  
       <Notification />
       <Switch>
         <Route
          exact
          path={`${process.env.PUBLIC_URL + "/"}`}
          component={HomeScreen}
         />

         <Route
          path={`${process.env.PUBLIC_URL + "/about-us"}`}
          component={NewAbout}
        />
        <Route
          path={`${process.env.PUBLIC_URL + "/contact-us"}`}
          component={Contact}
        />
        <Route
          path={`${process.env.PUBLIC_URL + "/instructors-offerings"}`}
          component={ForInstructor}
        />
        <Route
          path={`${process.env.PUBLIC_URL + "/government-offerings"}`}
          component={ForGovernment}
        />
        <Route
          path={`${process.env.PUBLIC_URL + "/schools-offerings"}`}
          component={ForSchool}
        />
        <Route
          path={`${process.env.PUBLIC_URL + "/business-offerings"}`}
          component={ForBusiness}
        />

         <Route
          exact
          path={`${process.env.PUBLIC_URL + "/courses"}`}
          component={CourseScreen}
         />

         <Route
          exact
          path={`${process.env.PUBLIC_URL + "/course-grid/list"}`}
          component={CourseScreen}
        />
        <Route 
          exact 
          path="/courses/category/:id" 
          component={CourseScreen}
           />

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
          path={`${process.env.PUBLIC_URL + "/honour-code"}`}
          component={Honor}
        />

        <Route
          exact
          path={`${process.env.PUBLIC_URL + "/blogs"}`}
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
          path={`${process.env.PUBLIC_URL + "/help-center"}`}
          component={HelpCenter}
        />
         <LearnersRoute
          path={`${process.env.PUBLIC_URL + "/learner/accounts"}`}
          component={ResetPassword}
        />
        <InstructorsRoute
          path={`${process.env.PUBLIC_URL + "/instructor-account/reset"}`}
          component={ResetPassword}
        />
        <PublicRoute
          exact
          path={`${process.env.PUBLIC_URL + "/password/reset/:id"}`}
          component={ChangeCredentials}
        />



        <Route
          exact
          path={`${process.env.PUBLIC_URL + "/checkout"}`}
          component={Checkout}
        />

         <Route 
        path={`${process.env.PUBLIC_URL + "/cart"}`} 
        component={Cart}
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

        <InstructorsRoute
          exact
          path="/instructor-pages/profile"
          component={InstructorProfiler}
        />
        
        
        <InstructorsRoute
          exact
          path={`${
            process.env.PUBLIC_URL + "/instructor-detail/profile/update"
          }`}
          component={UpdateInstructor}
        />

        <LearnersRoute exact path="/billing" component={Billing} />

         <LearnersRoute
          path={`${process.env.PUBLIC_URL + "/learner/wishlists"}`}
          component={WishLists}
        />

        <Route
          exact
          path={`${process.env.PUBLIC_URL + "/learning/workbench/:id"}`}
          component={WorkBench}
        />


        <InstructorsRoute
          exact
          path="/instructor-pages/dashboard"
          component={NewInstructorDashboard}
        />

      
        

        <InstructorsRoute
          exact
          path="/instructor-pages/mycourses"
          component={MyInstructorCourses}
        />
        

        <InstructorsRoute
          exact
          path={`${process.env.PUBLIC_URL + "/instructor-pages/notifications"}`}
          component={NewInstructorNotifications}
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
         <InstructorsRoute
          exact
          path={`${process.env.PUBLIC_URL + "/course-preview/:id"}`}
          component={CoursePreview}
        />

        

      

        

        


        


       <Route component={PageNotFound} />
      </Switch>
   </Router>
   )
}

export default App;