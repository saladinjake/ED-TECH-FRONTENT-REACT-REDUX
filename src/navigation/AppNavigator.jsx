import React from "react";

import Landing from "../screens/LandingScreen";
import CoursesScreen from "../screens/CoursesScreen";
import CourseScreen from "../screens/CourseScreen";
import Notification from "../helpers/Toaster";


/*Import requirements and configuration files*/
import history from "../helpers/history";
import { BrowserRouter as Router, Switch, Route,Redirect } from "react-router-dom"; 

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
      <Route path="/courses" render={(props) => <CoursesScreen {...props} />} />
      <Route path="/" render={(props) => <Landing {...props} />} />
      <Redirect to="/" />
    </Switch>
    </Router>
  );
};

export default AppNavigator;
