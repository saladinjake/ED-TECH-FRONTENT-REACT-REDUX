import React, { useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "../assets/css/main.css";
import CourseHeader from "../components/CourseHeader";
import CourseDetail from "../components/CourseDetail";

const CourseScreen = () => {
  const [sortType, setSortType] = useState("grid");
  const handleSort = (sortType) => {
    setSortType(sortType);
  };
  return (
    <>
      <NavBar />
      <CourseHeader
        pageTitle="Becoming a Successful Leader (Inclusive Leadership Training)"
        subHeading="Become a successful leader by learning 21st-century leadership skills and applying concepts to the real world.
        "
        bgClass="courses-banner-bg"
        introVideoUrl="https://www.youtube.com/watch?v=ysz5S6PUM-U"
      />
      <CourseDetail />

      <div className="my-auto border-top bg-green">
        <div className="container">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default CourseScreen;
