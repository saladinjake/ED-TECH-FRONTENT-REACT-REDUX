import React from "react";
import { Redirect, Route, Switch } from "react-router-dom";
import Landing from "../screens/LandingScreen";
import CoursesScreen from "../screens/CoursesScreen";
import CourseScreen from "../screens/CourseScreen";

const AppNavigator = () => {
  return (
    <Switch>
      <Route
        path="/courses/:id"
        render={(props) => <CourseScreen {...props} />}
      />
      <Route path="/courses" render={(props) => <CoursesScreen {...props} />} />
      <Route path="/" render={(props) => <Landing {...props} />} />
      <Redirect to="/" />
    </Switch>
  );
};

export default AppNavigator;
