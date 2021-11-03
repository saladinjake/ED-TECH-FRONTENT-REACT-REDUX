import React from 'react';
import NavBar from '../components/shared/NavBar';
import Footer from '../components/shared/Footer';
import SubscribeBox from '../components/landing/chips/SubscribeBox';
import CoachesBox from "../components/landing/chips/CoachesBox";
import HeroUnit from '../components/landing/chips/HeroUnit';
import '../assets/css/main.css'

import WhyQuestence from '../components/landing/chips/WhyQuestence';
import HorizontalCard from '../components/landing/chips/HorizontalCard';
import CoursesSection from '../components/landing/chips/CoursesSection';
import CategorySection from '../components/landing/chips/CategorySection';
import ReverseHorizontalCard from '../components/landing/chips/ReverseHorizontalCard';
import ProfessionalBodySection from '../components/landing/chips/ProfessionalBodySection';


const Landing = () => {
    return ( 
        <>
            <NavBar />
            <HeroUnit />
            <CoursesSection />
            <CategorySection />
            <ReverseHorizontalCard />
            <ProfessionalBodySection />
            
            <HorizontalCard />
            <WhyQuestence />
            <CoachesBox />
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