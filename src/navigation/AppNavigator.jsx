import React from "react";

import Landing from "../screens/LandingScreen";
import CoursesScreen from "../screens/CoursesScreen";
import CourseScreen from "../screens/CourseScreen";
import Notification from "../helpers/Toaster";
import LegalScreen from "../screens/LegalScreen";
import ContactUsScreen from "../screens/ContactUsScreen";
import DigitalOnlineLearningScreen from "../screens/DigitalOnlineLearningScreen";
import DashboardScreen from "../screens/DashboardScreen";
import MyLearning from "../screens/MyLearning";
import CartScreen from "../screens/CartScreen";
import NotificationScreen from "../screens/NotificationScreen";
import WishListScreen from "../screens/WishListScreen";
import ProfileScreen from "../screens/ProfileScreen";

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
          path="/digital-online-learning"
          render={(props) => <DigitalOnlineLearningScreen {...props} />}
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
