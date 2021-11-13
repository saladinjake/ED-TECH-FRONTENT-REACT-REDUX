import React from "react";
import CourseCard from "./CourseCard";
import Slider from "react-slick";
import { Link } from "react-router-dom";

const CoursesSection = () => {
  var settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 4,
    slidesToScroll: 4,
    initialSlide: 0,
    autoplay: false,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <>
      <div className="container my-5">
        <div className="row mb-3">
          <h4 className="subheading-1 col">Featured Courses</h4>
          <div className="col">
            <Link
              to="/courses"
              className="btn btn-solid-teal border-radius-50 float-end px-3 text-14"
            >
              See all courses <i className="bi bi-chevron-right"></i>
            </Link>
          </div>
        </div>
        {/* <div className="row"> */}
        <Slider {...settings} className="row">
          <CourseCard
            courseTitle="MITX-LAUNCHX"
            courseDesc="Becoming An Entrepreneur"
            courseAuthorCompany="Amazon Service"
            courseAuthor="Martin Caulpepper"
            coursePrice="N10, 000"
          />
          <CourseCard
            courseTitle="MANDARIN-MX901X"
            courseDesc="Mandarin Chinese Essentials"
            courseAuthorCompany="Eragon Tech"
            courseAuthor="Estella Chen"
            coursePrice="N12, 000"
          />
          <CourseCard
            courseTitle="CALTECHX-EC1011X"
            courseDesc="Principles Of Economics With Charles Devant and Melvin Minsky"
            courseAuthorCompany="Aerosol Groups"
            courseAuthor="Antonio Rangel"
            coursePrice="N13, 000"
          />
          <CourseCard
            courseTitle="IBM-PV0101EN"
            courseDesc="Python Basics For Data"
            courseAuthorCompany="IBM"
            courseAuthor="Joseph Santarcangelo"
            coursePrice="N20, 000"
          />
        </Slider>
        {/* </div> */}
      </div>
    </>
  );
};

export default CoursesSection;
