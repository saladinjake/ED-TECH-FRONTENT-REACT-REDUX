import React, { useEffect, useState } from "react";
import topnav from "./topnav";
import Header from "./header";
import OldNavBar from "components/Navbar";
// import Topnav from "./topnav";
import Hero from "./hero";
import HeroImage from "components/HeroImage";
import Infosection from "./infosection";
import Sideicons from "./gallerysection";
import Gallery from "./sideicons";
import newsletter from "./newsletter";
import Joinup from "./joinup";
import Testimonial from "./testimonial_slide";
import Footer from "components/Footer";
import Featured from "./featured_products";
import InstitutionsIcons from "components/InstitutionsIcons";
import Guide from "components/Guide";
// import CTA from "components/cta";
import AboutUs from "components/AboutUs";
// import TestimonialSlider from "components/TestimonialSlider"

import "./reboot.css";
// import "./topnav.css"
// import "./animate.css"
import "./hero.css";
import "./sideicons.css";

import Loader from "components/Loader/Loader";

// import Hambugger from "./megamenu2"

const Section = () => {
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    // setTimeout(()=>{
    //   setLoading(false);
    document.getElementsByTagName("body")[0].style.background = "#fff";
    // },10000)
  });
  return (
    <div>
      {loading ? (
        <Loader width="70" />
      ) : !loading ? (
        <div>
          <div className="section-home">
            <OldNavBar />
            <br />
            <br />
            <Hero />
            <div className="vc_clearfix"></div>
            <br />

            <Gallery />
            <div className="container">
              <Featured />
            </div>

            <AboutUs />
            <br />
            <InstitutionsIcons />
            <br />
            <Joinup />
            <br />
            <Guide />

            <br />
            <HeroImage />

            <Footer />
          </div>
        </div>
      ) : (
        <div class="container">Network error</div>
      )}
    </div>
  );
};

export default Section;
