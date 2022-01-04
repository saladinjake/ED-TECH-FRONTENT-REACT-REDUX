import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import SidebarTos from "../components/SidebarTos";
import MainHonour from '../components/MainTos'

const DigitalOnlineLearningScreen = () => {
  return (
    <>
      <NavBar />
      <PageHeader
        pageTitle="Honour Code"
        bgClass="courses-banner-bg"
      />

    

      <div className="container-fluid">
          <div class="row-flexes">
           
              <SidebarTos />
              <MainHonour  />
              </div>
       
      </div>
      <Footer />
    </>
  );
};

export default DigitalOnlineLearningScreen;
