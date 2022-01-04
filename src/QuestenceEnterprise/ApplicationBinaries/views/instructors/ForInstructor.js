import React, { Component } from "react";
import NavBar from "../../components/shared/NavBar";
import Footer from "../../components/shared/Footer";
import { InstructorTitle } from "../../components/common/InstructorTitle";
import AboutInstructor from "../../components/AboutInstructor";
import InstructorRegister from "../../components/InstructorRegister";


export default class ForInstructor extends Component {
  render() {
    return (
      <div className="main-wrapper">
        <NavBar />
        <InstructorTitle />
        <AboutInstructor />
        <InstructorRegister />
        <Footer />
      </div>
    );
  }
}
