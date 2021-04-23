
import React, { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import ScrollToTop from "helper/ScrollToTop";
import { GlobalStyle } from "components/common/styles/global.js";
import { Toaster } from "react-hot-toast";


const HomeOne = lazy(() => import('./HomeOne'));
const About = lazy(() => import('./pages/about/About'));
const ForInstructor = lazy(() => import('./pages/instructors/ForInstructor'));
const ForBusiness = lazy(() => import('./pages/instructors/ForBusiness'))
const Checkout = lazy(() => import('./pages/checkout/Checkout'))
const CourseGrid = lazy(() => import('./pages/courses/CourseGrid'))
// const CourseDetails = lazy(() => import('./pages/courses/CourseDetails'))
const Instructor = lazy(() => import('./pages/instructor/Instructors'))
const InstructorDetails = lazy(() => import('./pages/instructor/InstructorDetails'))
const Institution = lazy(() => import('./pages/institution/Institutions'))
const InstitutionDetails = lazy(() => import('./pages/institution/InstitutionDetails'))
// const Login = lazy(() => import('./pages/account/Login'))

// const LearnerProfiler = lazy(() => import('./pages/profile/LearnerProfile'))
const InstructorProfiler = lazy(() => import('./pages/profile/InstructorProfile'))
// const UpdateLearner = lazy(() => import('./pages/profile/UpdateLearner'))
const UpdateInstructor = lazy(() => import('./pages/profile/UpdateInstructor'))
// const Register = lazy(() => import('./pages/account/Register'))
const InstructorRegister = lazy(() => import('./pages/account/InstructorRegister'))
const BusinessRegister = lazy(() => import('./pages/account/BusinessRegister'))
const PageNotFound = lazy(() => import('./pages/404/PageNotFound'))
// const Product = lazy(() => import('./pages/shop/Products'))
const InstructorCourses = lazy(() => import('./pages/instructors/InstructorCourses'))
const CreateCourse = lazy(() => import('./pages/account/CreateCourse'))
const InstructorDashboard = lazy(() => import('./pages/instructors/InstructorDashboard'))
// const Cart = lazy(() => import('./pages/shop/Cart'))
// const DashBoard = lazy(() => import('./pages/shop/Dashboard'))
const Billing = lazy(() => import('./pages/shop/Billing'))
// const Notifications = lazy(() => import('./pages/shop/Notifications'))
const Wishlists = lazy(() => import('./pages/wishlist/wishlist'))
const InstructorNotifications = lazy(() => import('./pages/instructors/InstructorNotifications'))
const InstructorPendingCourses = lazy(() => import('./pages/instructors/InstructorPendingCourses'))
const InstructorDeclinedCourses = lazy(() => import('./pages/instructors/InstructorDeclinedCourses'))

const LearnersRoute = lazy(() => import('./routes/LearnersRoute'))
const InstructorsRoute = lazy(() => import('./routes/InstructorsRoute'))
// const AuthenticatedRoute = lazy(() => import('./routes/AuthenticatedRoute'))
const PublicRoute = lazy(() => import('./routes/PublicRoute'))




/*start code refactor here*/
const NewDashboard= lazy(() => import('./pages/shop/newdashboard/NewDashboard'));
const AllCoursesPageOverview = lazy(() => import('./pages/shop/mylearning/MyLearning'))
const MyCoursesWithTabs = lazy(() => import('./pages/shop/mylearning/tabsection/Mycourseswithtabs'))
// const NewProduct = lazy(() => import('./pages/shop/mycourses/NewProduct'));
const NewRegister = lazy(() => import('./pages/account/NewRegister'))
const NewLogin = lazy(() => import('./pages/account/NewLogin'))
const MyCourseDetail = lazy(() => import('./pages/shop/mycourses/MyCourseDetailOverview'))
const NewNotifications = lazy(() => import('./pages/shop/mynotifications/Notifications'))
const NewCart = lazy(() => import('./pages/shop/mycart/Cart'))
const NewProfile = lazy(() => import('./pages/shop/myprofile/LearnerProfile'))
const NewProfileUpdater = lazy(() => import('./pages/shop/myprofile/UpdateLearner'))
function App() {
  return (
    <Router>
       <Suspense fallback={<div>Page is Loading...</div>}>
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
          path={`${process.env.PUBLIC_URL + "/government"}`}
          component={ForInstructor}
        />
        <Route
          path={`${process.env.PUBLIC_URL + "/business"}`}
          component={ForBusiness}
        />

        {/*<Route
          exact
          path={`${process.env.PUBLIC_URL + "/courses"}`}
          component={CourseGrid}
        />*/}
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

        {/*<PublicRoute
          exact
          path={`${process.env.PUBLIC_URL + "/login"}`}
          component={Login}
        />*/}

        {/*<PublicRoute
          exact
          path={`${process.env.PUBLIC_URL + "/register"}`}
          component={Register}
        />*/}
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

        {/*<Route path={`${process.env.PUBLIC_URL + "/cart"}`} component={Cart} />*/}
        <Route
          exact
          path={`${process.env.PUBLIC_URL + "/checkout"}`}
          component={Checkout}
        />

        <Route
          path={`${process.env.PUBLIC_URL + "/payment/callback"}`}
          component={Checkout}
        />

        

        

        { /* <LearnersRoute exact path="/mycourses" component={Product} />*/ }
        { /* <LearnersRoute exact path="/dashboard" component={DashBoard} /> */ }
        
        <LearnersRoute exact path="/billing" component={Billing} />
        <LearnersRoute
          exact
          path={`${process.env.PUBLIC_URL + "/learner/wishlist"}`}
          component={Wishlists}
        />

        <InstructorsRoute
          exact
          path="/instructor/dashboard"
          component={InstructorDashboard}
        />
        <InstructorsRoute
          exact
          path="/instructor/profile"
          component={InstructorProfiler}
        />
        <InstructorsRoute
          exact
          path="/instructor/mycourses"
          component={InstructorCourses}
        />

        <InstructorsRoute
          exact
          path={`${process.env.PUBLIC_URL + "/instructor/profile/update"}`}
          component={UpdateInstructor}
        />

        <InstructorsRoute
          exact
          path={`${process.env.PUBLIC_URL + "/instructor/notifications"}`}
          component={InstructorNotifications}
        />

        <InstructorsRoute
          exact
          path={`${process.env.PUBLIC_URL + "/instructor/course/create"}`}
          component={CreateCourse}
        />

        <InstructorsRoute
          exact
          path={`${process.env.PUBLIC_URL + "/instructor/course/pending"}`}
          component={InstructorPendingCourses}
        />

        <InstructorsRoute
          exact
          path={`${process.env.PUBLIC_URL + "/instructor/course/declined"}`}
          component={InstructorDeclinedCourses}
        />


        


        <LearnersRoute exact path="/dashboard" component={NewDashboard} />
        <Route exact path="/courses" component={AllCoursesPageOverview} />
         <Route exact path="/mycourses" component={MyCoursesWithTabs} />
         <Route exact path={`${process.env.PUBLIC_URL + "/courses/:id"}`} component={MyCourseDetail} />

        <PublicRoute exact path={`${process.env.PUBLIC_URL + "/login"}`} component={NewLogin} />
        <PublicRoute exact path={`${process.env.PUBLIC_URL + "/register"}`} component={NewRegister} />
        <LearnersRoute exact path="/notifications" component={NewNotifications} />
        
        <Route path={`${process.env.PUBLIC_URL + "/profile"}`} component={NewProfile} />
        <LearnersRoute
          exact
          path={`${process.env.PUBLIC_URL + "/learner/profile/update"}`}
          component={NewProfileUpdater}
        />

        <Route path={`${process.env.PUBLIC_URL + "/cart"}`} component={NewCart} />

       


        

        <Route component={PageNotFound} />
      </Switch>
      </Suspense>
    </Router>
  );
}

export default App;
