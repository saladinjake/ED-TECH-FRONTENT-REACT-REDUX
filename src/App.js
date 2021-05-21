import React from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import ScrollToTop from "helper/ScrollToTop";
import { GlobalStyle } from "components/common/styles/global.js";
import HomeOne from "HomeOne";
import About from "pages/about/About";
import ForInstructor from "pages/instructors/ForInstructor";
import ForBusiness from "pages/instructors/ForBusiness";
import ForGovernment from "pages/instructors/ForGovernment";
import ForSchool from "pages/instructors/ForSchool";
import Checkout from "pages/checkout/Checkout";
import Contact from "./pages/contact/Contact";
import CourseGrid from "pages/courses/CourseGrid";
import CourseGridList from "pages/courses/CourseGridList";

import ProgramGrid from "pages/courses/ProgramGrid";
import ProgramGridList from "pages/courses/ProgramGridList";

import CourseDetails from "pages/courses/CourseDetails";
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
import CreateCourse from "pages/account/CreateCourse";
import CreateCourseOld from "pages/account/CreateCourseOld";
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
import { Toaster } from "react-hot-toast";
import LearnersRoute from "routes/LearnersRoute";
import InstructorsRoute from "routes/InstructorsRoute";
// import AuthenticatedRoute from "routes/AuthenticatedRoute";
import PublicRoute from "routes/PublicRoute";

import MylearningDashboard from "./pages/courses/components/MyLearning";
import OverViewPane from "./pages/dashboard/MyDashboard";
import SortTest from "./SortTest";
import NewNotifications from "./pages/mynotifications/Notifications";
import  NewInstructorNotifications from  "./pages/mynotifications/NewInstructorNotification";
// import WorkBench from "./pages/workbench/WorkSheet"

import Purchases from "./pages/purchases/Purchases";

import history from "./history";

function App() {
  return (
    <Router history={history}>
      <Toaster
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
      />
      <GlobalStyle />
      <ScrollToTop />
      <Switch>
        <Route
          exact
          path={`${process.env.PUBLIC_URL + "/"}`}
          component={HomeOne}
        />

        <Route
          path={`${process.env.PUBLIC_URL + "/about"}`}
          component={About}
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
          component={CourseGrid}
        />
        <Route
          exact
          path={`${process.env.PUBLIC_URL + "/course-grid/list"}`}
          component={CourseGridList}
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
          path={`${process.env.PUBLIC_URL + "/instructor-detail/profile/update"}`}
          component={UpdateInstructor}
        />
        <InstructorsRoute
          exact
          path={`${process.env.PUBLIC_URL + "/instructor-pages/notifications"}`}
          component={NewInstructorNotifications}
        />
        <InstructorsRoute
          exact
          path={`${process.env.PUBLIC_URL + "/instructor-pages/course/create"}`}
          component={CreateCourseOld}
        />

        <InstructorsRoute
          exact
          path={`${process.env.PUBLIC_URL + "/instructor-pages/course/create-old"}`}
          component={CreateCourse}
        />

        <InstructorsRoute
          exact
          path={`${process.env.PUBLIC_URL + "/instructor-pages/course/pending"}`}
          component={InstructorPendingCourses}
        />
        <InstructorsRoute
          exact
          path={`${process.env.PUBLIC_URL + "/instructor-pages/course/declined"}`}
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

        <PublicRoute
          exact
          path={`${process.env.PUBLIC_URL + "/login"}`}
          component={Login}
        />

        <PublicRoute
          exact
          path={`${process.env.PUBLIC_URL + "/register"}`}
          component={Register}
        />

        <PublicRoute
          exact
          path={`${process.env.PUBLIC_URL + "/reset/password/:id"}`}
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

        

        <Route component={PageNotFound} />
      </Switch>
    </Router>
  );
}

export default App;
