import React from 'react';
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';
import SubscribeBox from '../components/SubscribeBox';
import InfoBox from "../components/InfoBox";
import HeroUnit from '../components/HeroUnit';
import '../assets/css/main.css'
import WhyQuestence from '../components/WhyQuestence';
import HorizontalCard from '../components/HorizontalCard';
import CoursesSection from '../components/CoursesSection';


const Landing = () => {
    return ( 
        <>
            <NavBar />
            <HeroUnit />
            <CoursesSection />
            <HorizontalCard />
            <WhyQuestence />
            <InfoBox />
            <SubscribeBox />
            <div className="my-auto border-top bg-green">
                <div className="container">
                        <Footer />
                </div>
            </div>
        </>
     );
}
 
export default Landing;