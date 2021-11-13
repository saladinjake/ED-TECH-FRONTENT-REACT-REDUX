import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import SubscribeBox from "../components/SubscribeBox";
import CoachesBox from "../components/CoachesBox";
import HeroUnit from "../components/HeroUnit";
import "../assets/css/main.css";
import WhyQuestence from "../components/WhyQuestence";
import HorizontalCard from "../components/HorizontalCard";
import CoursesSection from "../components/CoursesSection";
import CategorySection from "../components/CategorySection";
import ReverseHorizontalCard from "../components/ReverseHorizontalCard";
import ProfessionalBodySection from "../components/ProfessionalBodySection";

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
};

export default Landing;
