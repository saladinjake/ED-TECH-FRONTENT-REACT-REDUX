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

/*Import requirements and configuration files*/
import history from "../helpers/history";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

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
          path="/my-learning"
          render={(props) => <MyLearning {...props} />}
        />
        <Route
          path="/dashboard"
          render={(props) => <DashboardScreen {...props} />}
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
        <Route path="/" render={(props) => <Landing {...props} />} />
        <Redirect to="/" />
      </Switch>
    </Router>
  );
};

export default AppNavigator;
