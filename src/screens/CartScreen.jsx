import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import CartDetail from "../components/CartDetail";

const DashbaordScreen = () => {
  return (
    <>
      <NavBar />
      <PageHeader
        pageTitle="Shopping Cart"
        bgClass="courses-banner-bg"
        textPosition="text-start"
      />
      <CartDetail />

      <Footer />
    </>
  );
};

export default DashbaordScreen;
