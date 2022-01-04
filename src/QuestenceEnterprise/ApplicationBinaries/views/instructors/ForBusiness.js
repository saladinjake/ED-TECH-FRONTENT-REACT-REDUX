import React, { Component } from "react";
import NavBar from "../../components/shared/NavBar";
import Footer from "../../components/shared/Footer";
import { BusTitle } from "../../components/common/BusTitle";
import AboutBusiness from "../../components/AboutBusiness";
import BusinessRegister from "../../components/BusinessRegister";


export default class ForBusiness extends Component {
  render() {
    return (
      <div className="main-wrapper">
        <NavBar />
        <BusTitle />
        <AboutBusiness />
        <BusinessRegister />
        <Footer />
      </div>
    );
  }
}
