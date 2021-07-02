import React, { useEffect, useState } from "react";
import topnav from "./topnav";
import Header from "./header";
import OldNavBar from "components/Navbar";
// import Topnav from "./topnav";
import Hero from "./hero";
import Infosection from "./infosection";
import Sideicons from "./gallerysection";
import Gallery from "./sideicons";
import newsletter from "./newsletter";
import Joinup from "./joinup";
import Testimonial from "./testimonial_slide";
import Footer from "components/Footer";
import Featured from "./featured_products";
import InstitutionsIcons2 from "components/InstitutionsIcons2";
import Guide from "components/Guide";
// import CTA from "components/cta";
import AboutUs from "components/AboutUs";
// import TestimonialSlider from "components/TestimonialSlider"

import "./reboot.css";
// import "./topnav.css"
// import "./animate.css"
import "./hero.css";
import "./sideicons.css";

// import Hambugger from "./megamenu2"

const Section = () => {
  useEffect(() => {
    document.getElementsByTagName("body")[0].style.background = "#fff";
  });
  return (
    <div>
    <div className="section-home">
      <OldNavBar />
      <br />
      <br />
      <Hero />
      <div className="vc_clearfix"></div>
      <br />
    {/*<Sideicons />*/}
    <Gallery />
      <div className="container">
        <Featured />
      </div>
      
      <AboutUs />
      <br />
      <InstitutionsIcons2 />
      <br />
      <Joinup />
      <br />
      <Guide />

      {/*<Infosection />  <Testimonial />*/}

      <br />
      <Testimonial />

     
       <Footer />

    </div>
      
    </div>
  );
};

export default Section;
