import React, { Component } from "react";
import NavBar from "components/Navbar";
import BillingBox from "../../components/BillingBox";
import Footer from "../../components/Footer";

class Billing extends Component {
  render() {
    return (
      <div className="main-wrapper">
        <NavBar />
        <BillingBox />
        <Footer />
      </div>
    );
  }
}

export default Billing;
