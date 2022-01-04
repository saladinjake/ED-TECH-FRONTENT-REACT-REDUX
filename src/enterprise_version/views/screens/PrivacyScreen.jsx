import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import SidebarTos from "../components/SidebarTos";
import MainPrivacy from '../components/MainPrivacy'

const DigitalOnlineLearningScreen = () => {
  return (
    <>
      <NavBar />
      <PageHeader
        pageTitle="Privacy"
        bgClass="courses-banner-bg"
      />

  


      <div className="container-fluid">
          <div class="row-flexes">
           
              <SidebarTos />
              <MainPrivacy />
              </div>
       
      </div>
      <Footer />
    </>
  );
};

export default DigitalOnlineLearningScreen;
