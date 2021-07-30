import React, { Fragment } from "react"
import { Container , Row, Col } from "react-bootstrap"

import MainFrame from "./main"
import NavBar from "components/Navbar";
import { Styles } from "./styles/main.js"

const Dashboard = () => {
	return (
	<Fragment>
	<NavBar/><br/><br/><br/><br/>
	
     <Styles>
      <div className="s-layout">
            
     
           <MainFrame />
        </div>
      </Styles>

	

	</Fragment>
	)
}

export default Dashboard