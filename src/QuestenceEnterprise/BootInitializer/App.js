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


const App = () => {
{/*router outlets:components entry point*/}
   return (

   <Router history={history}>  
       {/*<Notification />*/}
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
          path={`${process.env.PUBLIC_URL + "/honor"}`}
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


        

      </Switch>
   </Router>
   )
}

export default App;
