import React, { Component } from "react";
import NavBar from "../../components/shared/NavBar";
import Footer from "../../components/shared/Footer";
import { SchoolTitle } from "../../components/common/SchoolTitle";
import AboutBusiness from "../../components/AboutBusiness";
import BusinessRegister from "../../components/BusinessRegister";


export default class ForBusiness extends Component {
  render() {
    return (
      <div className="main-wrapper">
        <NavBar />
        <SchoolTitle />
        <AboutBusiness />
        <BusinessRegister />
        <Footer />
      </div>
    );
  }
}
