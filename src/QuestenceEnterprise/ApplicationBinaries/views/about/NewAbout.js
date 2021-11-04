import React, { Fragment, useEffect } from "react";

import NavBar from "../../components/shared/NavBar";
import Footer from "../../components/shared/Footer";

import $ from "jquery";


import AboutQuestence from "../../components/AboutQuestence";
import TabBox from "../../components/TabBox";
import TeamSlider from "../../components/TeamSlider";
import TestimonialSlider from "../../components/TestimonialSlider";

import QuestOne from "../../components/QuestOne";
import NumberCounter from "../../components/NumberCounter";
import LearnerBox from "../../components/LearnerBox";
import ImageGallery from "../../components/ImageGallery";
const JobSection = () => {
  
  return (
    <Fragment>
      <NavBar />
      <AboutQuestence />
      <TabBox />
      {/*<TestimonialSlider />
      <TeamSlider />*/}
      <QuestOne />
      <NumberCounter />
      <LearnerBox />

      <div className="my-auto border-top bg-green">
                <div className="container">
                        <Footer />
                </div>
            </div>
    </Fragment>
  );
};

export default JobSection;
