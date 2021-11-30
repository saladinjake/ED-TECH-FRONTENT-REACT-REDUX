import React,{useEffect } from "react"
import "./App.css";
import AppNavigator from "./navigation/AppNavigator";
import DIANA from "./api/_defence_ai/AI_launchpad"
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
