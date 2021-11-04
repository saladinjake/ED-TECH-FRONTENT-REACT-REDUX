import React, { Component } from "react";
import InstructorNavBar from "components/Navbar/InstructorNavbar";
import BillingBox from "../../components/BillingBox";
import Footer from "../../components/Footer";

class Billing extends Component {
  render() {
    return (
      <div className="main-wrapper">
        <InstructorNavBar />
        <BillingBox />
        <Footer />
      </div>
    );
  }
}

export default Billing;
