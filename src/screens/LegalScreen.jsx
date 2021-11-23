import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import SubscribeBox from "../components/SubscribeBox";
import PageHeader from "../components/PageHeader";

const LegalScreen = () => {
  return (
    <>
      <NavBar />
      <PageHeader pageTitle="Legal" bgClass="courses-banner-bg" />
      <SubscribeBox />
      <Footer />
    </>
  );
};

export default LegalScreen;
