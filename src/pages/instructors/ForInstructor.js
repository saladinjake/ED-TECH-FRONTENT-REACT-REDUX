import React, { Component } from 'react';
import NavBar from "components/Navbar";
import { InstructorTitle } from 'components/common/InstructorTitle';
import AboutInstructor from 'components/AboutInstructor';
import InstructorRegister from 'components/InstructorRegister';
import Footer from "components/Footer";

export default class ForInstructor extends Component {
    render() {
        return (
            <div className="main-wrapper">
                <NavBar/>
                <InstructorTitle />
                <AboutInstructor />
                <InstructorRegister />
                <Footer/>
            </div>
        )
    }
}
