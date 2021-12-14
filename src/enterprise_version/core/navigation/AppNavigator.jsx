import React from "react";

import Landing from "../../views/screens/LandingScreen";
import CoursesScreen from "../../views/screens/CoursesScreen";
import CourseScreen from "../../views/screens/CourseScreen";
import Notification from "../helpers/Toaster";
import LegalScreen from "../../views/screens/LegalScreen";
import ContactUsScreen from "../../views/screens/ContactUsScreen";
import DigitalOnlineLearningScreen from "../../views/screens/DigitalOnlineLearningScreen";
import DashboardScreen from "../../views/screens/DashboardScreen";
import MyLearning from "../../views/screens/MyLearning";
import CartScreen from "../../views/screens/CartScreen";
import NotificationScreen from "../../views/screens/NotificationScreen";
import WishListScreen from "../../views/screens/WishListScreen";
import ProfileScreen from "../../views/screens/ProfileScreen";



import HonorCodeScreen from "../../views/screens/HonorCodeScreen";
import PrivacyScreen from "../../views/screens/PrivacyScreen";
import AboutScreen from "../../views/screens/AboutScreen";
import TosScreen from "../../views/screens/TosScreen";
import BlogScreen from "../../views/screens/BlogScreen";
import CareerScreen from "../../views/screens/CareersScreen";
import BusinessAndSchools from "../../views/screens/BusinessAndSchools";

import InstitutionScreen from "../../views/screens/InstitutionScreen";
import InstitutionCoursesScreen from "../../views/screens/InstitutionCoursesScreen";

/*Import requirements and configuration files*/
import history from "../helpers/history";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

/*Gate Keepers*/
import AuthenticatedRoute from "../adhocs/AuthenticatedRoutes";
import InstructorsRoute from "../adhocs/AuthenticatedRoutes";
import LearnersRoute from "../adhocs/AuthenticatedRoutes";

const AppNavigator = () => {
  return (
    <Router history={history}>
      {/*page COMPONENT READY FOR INTEGRATION*/}
      <Notification />
      <Switch>
        <Route
          path="/course-detail/:id"
          render={(props) => <CourseScreen {...props} />}
        />
        
        <Route
          path="/cart"
          render={(props) => (
            <AuthenticatedRoute
              {...props}
              exact
              path="/cart"
              component={CartScreen}
            />
          )}
        />
        <Route
          path="/learner/profile"
          render={(props) => (
            <AuthenticatedRoute
              {...props}
              exact
              path="/learner/profile"
              component={ProfileScreen}
            />
          )}
        />

        <Route
          path="/learner/wishlists"
          render={(props) => (
            <AuthenticatedRoute
              {...props}
              exact
              path="/learner/wishlists"
              component={WishListScreen}
            />
          )}
        />

        <Route
          path="/notifications"
          render={(props) => (
            <AuthenticatedRoute
              {...props}
              exact
              path="/notifications"
              component={NotificationScreen}
            />
          )}
        />

        <Route
          path="/contact-us"
          render={(props) => <ContactUsScreen {...props} />}
        />
        <Route path="/legal" render={(props) => <LegalScreen {...props} />} />
        <Route
          path="/courses"
          render={(props) => <CoursesScreen {...props} />}
        />


        <Route
          path="/programs/:id/courses/:name"
          render={(props) => <InstitutionCoursesScreen {...props} />}
        />
        <Route
          path="/program-detail/:id"
          render={(props) => <InstitutionScreen {...props} />}
        />

        <Route
          path="/mylearning"
          render={(props) => <MyLearning {...props} />}
        />
        {/*both user and instructors use same dash board*/}
        <Route
          path="/dashboard"
          render={(props) => (
            <AuthenticatedRoute
              {...props}
              exact
              path="/dashboard"
              component={DashboardScreen}
            />
          )}
        />

        <Route path="/" render={(props) => <Landing {...props} />} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default AppNavigator;
