import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import BusinessAndSchools from "../components/BusinessAndSchools";

const DigitalOnlineLearningScreen = ({pageTitle}) => {
  return (
    <>
      <NavBar />
      <PageHeader
        pageTitle={pageTitle}
        bgClass="courses-banner-bg"
      />
      <BusinessAndSchools />
      <Footer />
    </>
  );
};

export default DigitalOnlineLearningScreen;
