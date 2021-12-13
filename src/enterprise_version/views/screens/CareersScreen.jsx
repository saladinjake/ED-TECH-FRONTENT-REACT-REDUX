import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import CareersOnlineLearning from "../components/CareersOnlineLearning";

const DigitalOnlineLearningScreen = () => {
  return (
    <>
      <NavBar />
      {/* <PageHeader
        pageTitle="About"
        bgClass="courses-banner-bg"
      /> */}
      <CareersOnlineLearning />
      <Footer />
    </>
  );
};

export default DigitalOnlineLearningScreen;
