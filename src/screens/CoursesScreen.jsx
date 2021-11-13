import React, { useState } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import SubscribeBox from "../components/SubscribeBox";
import "../assets/css/main.css";
import PageHeader from "../components/PageHeader";
import FilterWidget from "../components/FilterWidget";
import SortWidget from "../components/SortWidget";
import HorizontalCourseCard from "../components/HorizontalCourseCard";
import CourseCard from "../components/CourseCard";
import SearchWidget from "../components/SearchWidget";

const CoursesScreen = () => {
  const [sortType, setSortType] = useState("grid");
  const handleSort = (sortType) => {
    setSortType(sortType);
  };
  return (
    <>
      <NavBar />
      <PageHeader pageTitle="Our Courses" bgClass="courses-banner-bg" />
      <SearchWidget />
      <SortWidget onHandleSort={handleSort} />
      <div className="container">
        <div className="row">
          <div className="col-md-3">
            <FilterWidget />
          </div>
          <div className="col-md-9">
            <div className="mb-5">
              {sortType === "fullWidth" && (
                <>
                  <HorizontalCourseCard
                    courseHeading="Becoming a Successful Leader (Inclusive Leadership Training)"
                    courseAuthor="Deepali Bagati"
                    courseDesc="Become a successful leader by learning 21st-century leadership skills and applying concepts to th"
                    learningStyle="Self Paced"
                    learningLang="English"
                    learningLevel="Level"
                    coursePrice="N20, 000"
                  />
                  <HorizontalCourseCard
                    courseHeading="Becoming a Successful Leader (Inclusive Leadership Training)"
                    courseAuthor="Deepali Bagati"
                    courseDesc="Become a successful leader by learning 21st-century leadership skills and applying concepts to th"
                    learningStyle="Self Paced"
                    learningLang="English"
                    learningLevel="Level"
                    coursePrice="N20, 000"
                  />
                  <HorizontalCourseCard
                    courseTitle="IBM-PV0101EN"
                    courseAuthor="Joseph Santarcangelo"
                    courseDesc="Python Basics For Data"
                    learningStyle="Self Paced"
                    learningLang="English"
                    learningLevel="Level"
                    coursePrice="N12, 000"
                  />
                </>
              )}
              {sortType === "grid" && (
                <>
                  <div className="row">
                    <div className="col-md-4">
                      <CourseCard
                        courseTitle="Becoming a Successful Leader (Inclusive Leadership Training)"
                        courseDesc="Become a successful leader by learning 21st-century leadership skills and applying concepts to th"
                        courseAuthorCompany="IBM"
                        courseAuthor="Deepali Bagati"
                        coursePrice="N20, 000"
                      />
                    </div>
                    <div className="col-md-4">
                      <CourseCard
                        courseTitle="IBM-PV0101EN"
                        courseDesc="Python Basics For Data"
                        courseAuthorCompany="IBM"
                        courseAuthor="Joseph Santarcangelo"
                        coursePrice="N12, 000"
                      />
                    </div>
                    <div className="col-md-4">
                      <CourseCard
                        courseTitle="IBM-PV0101EN"
                        courseDesc="Python Basics For Data"
                        courseAuthorCompany="IBM"
                        courseAuthor="Joseph Santarcangelo"
                        coursePrice="N20, 000"
                      />
                    </div>
                    <div className="col-md-4">
                      <CourseCard
                        courseTitle="IBM-PV0101EN"
                        courseDesc="Python Basics For Data"
                        courseAuthorCompany="IBM"
                        courseAuthor="Joseph Santarcangelo"
                        coursePrice="N20, 000"
                      />
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
      <SubscribeBox />
      <div className="my-auto border-top bg-green">
        <div className="container">
          <Footer />
        </div>
      </div>
    </>
  );
};

export default CoursesScreen;
