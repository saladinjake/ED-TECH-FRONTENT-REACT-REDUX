import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import DigitalOnlineLearning from "../components/DigitalOnlineLearning";

const DigitalOnlineLearningScreen = () => {
  return (
    <>
      <NavBar />
      {/* <PageHeader
        pageTitle="About"
        bgClass="courses-banner-bg"
      /> */}
      <DigitalOnlineLearning />
      <Footer />
    </>
  );
};

export default DigitalOnlineLearningScreen;
