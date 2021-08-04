import React, { Fragment } from "react"
import { Container , Row, Col } from "react-bootstrap"

import { SideBar, OverviewDash }  from "./sidebar"
import NavBar from "components/Navbar";
import { Styles } from "./styles/main.js"

const Dashboard = () => {
	return (
	<Fragment>
	<NavBar/><br/><br/><br/><br/>


    <div className="container">
        <div className="wrapper">
           <SideBar />



          <div class="content-page-x col-md-9" style={{float:"right"}}>
           <div class="content-x">
                    <OverviewDash />
                 
             </div>
          </div>


     </div>
    </div>
	
	</Fragment>
	)
}

export default Dashboard