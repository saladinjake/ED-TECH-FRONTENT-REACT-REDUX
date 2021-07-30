import React, { Fragment, useEffect } from "react";

import Footer from "../../components/Footer";
import $ from "jquery";

import NavBar from "components/Navbar";
import AboutQuestence from "components/AboutQuestence"
import TabBox from "components/TabBox"
import TeamSlider from "components/TeamSlider"
import TestimonialSlider from "components/TestimonialSlider"

import QuestOne from "components/QuestOne"
import NumberCounter from "components/NumberCounter"
import LearnerBox from "components/LearnerBox"
import ImageGallery from "components/ImageGallery"
const JobSection = () => {
  useEffect(() => {
    $("body").css({ "background-color": "#fff" });
  });
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



      <Footer />
    </Fragment>
  );
};

export default JobSection;
