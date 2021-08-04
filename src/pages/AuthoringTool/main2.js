

import React, { Fragment, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import $ from "jquery"
import Footer from "components/Footer";



import { Link } from "react-router-dom";
import Sidebar from "./sidebar"
import ActivityBox from "./activityboxes"
const WelcomeBanner = () => {

  useEffect(() => {
    $("li a").each(function(){
      $(this).css({fontFamily:"Open Sans"})
    })
    $("li.menu-item-has-children").hover(
        function () {
          $(this).addClass('hover');
        },
        function () {
          $(this).removeClass('hover');
        }
      );
  })
  return (
    <Fragment>
      <br />
    
     
      <div className="container-fluid">
        <Row>
          <br />
          <br />
          <br />
          <Col lg="3" md="3" sm="12">

          <div className="authoring-sidebar-x">
   
        
            <Sidebar/>
        
    
           </div>
           </Col>

          <Col lg="9" md="9" sm="12">
            <ActivityBox />
          </Col>
          
        </Row>

        
      </div>
      <Footer />
    </Fragment>
  );
};


export default WelcomeBanner;
