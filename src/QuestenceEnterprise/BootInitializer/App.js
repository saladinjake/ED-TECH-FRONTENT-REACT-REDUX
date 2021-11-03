import React, { useEffect } from "react";
import './App.css';
/*Import requirements and configuration files*/
import history from "../ApplicationBinaries/helpers/history";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom"; 
//import Notification from "./Toaster";
 

/*import components and pages*/
import HomeScreen from '../ApplicationBinaries/views/HomeScreen';

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

      </Switch>
   </Router>
   )
}

export default App;
