import React, { Component } from 'react';
import NavBar from "components/Navbar";
import { GovernmentTitle } from '../../components/common/GovernmentTitle';
import AboutBusiness from '../../components/AboutBusiness'
import BusinessRegister from '../../components/BusinessRegister';
import Footer from "components/Footer";

export default class ForBusiness extends Component {
    render() {
        return (
            <div className="main-wrapper">
                <NavBar/>
                <GovernmentTitle />
                <AboutBusiness />
                <BusinessRegister />
                <Footer/>
            </div>
        )
    }
}
