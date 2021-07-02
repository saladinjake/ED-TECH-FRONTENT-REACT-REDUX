import React, { Component, Fragment } from "react"
import "./popup.css"

import LoginBox from "../../pages/account/LoginBox"
import RegisterBox from "../../pages/account/RegisterBox"
import PasswordForgotBox from  "../../pages/account/PasswordForgotBox"

export default class GeneralPopUpAuthentication extends Component {
	constructor(props){
		super(props)
	}

	componentDidMount(){
		   }

	render(){

       const { showLogin ,showSignup} = this.props

	  return(

	  	<div className="container" style={{
	  		position:"absolute",
	  	top: "5%",
	  	right:"0",
  
        zIndex:"9999999999999999999999999999999999999999999",
        }}>
		
		   
        {showLogin == true ? ( <LoginBox />) : (<LoginBox />)}
        {showSignup == true ? ( <RegisterBox />) : (<RegisterBox />)}
        {showSignup == true ? ( <PasswordForgotBox />) : (<PasswordForgotBox />)}
		
		  

		
          </div>

	   )

	}
	

}