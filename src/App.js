import React,{useEffect } from "react"
import "./App.css";
import AppNavigator from "./enterprise_version/core/navigation/AppNavigator";
const  App = ()  =>{
  useEffect(()=>{
      (function launchAIDefence(){
        /*the ai script is always called on every nth component*/
        /*to serve and protect the application*/
        
      }())
  },[])
  return <AppNavigator />;
}

export default App;
