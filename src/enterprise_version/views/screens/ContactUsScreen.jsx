import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import ContactUs from "../components/ContactUs";

const ContactUsScreen = () => {
  return (
    <>
      <NavBar />
      <PageHeader pageTitle="Contact Us" bgClass="courses-banner-bg" />
      <ContactUs />
      <Footer />
    </>
  );
};

export default ContactUsScreen;
