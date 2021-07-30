import React, { Component } from "react";
import NavBar from "components/Navbar";
// import { BreadcrumbBox } from '../../components/common/Breadcrumb';
import AboutHeader from "components/AboutHeader";
import AboutSec from "components/AboutSec";
// import AboutQuestence from '../../components/AboutQuestence';
// import TabBox from './../../components/TabBox';
import Newsletter from "components/Newsletter";
import Footer from "../../components/Footer";
import { Styles } from "./styles/about.js";

class About extends Component {
  render() {
    return (
      <Styles>
        {/* Main Wrapper */}
        <div className="main-wrapper about-page">
          <NavBar />
          <AboutHeader />
          
          <AboutSec />
          <Newsletter />
          <Footer />
        </div>
      </Styles>
    );
  }
}

export default About;
