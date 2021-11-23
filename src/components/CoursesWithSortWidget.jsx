import React, { useState } from "react";
import SortWidget from "./SortWidget";
import HorizontalCourseCard from "./HorizontalCourseCard";
import CourseCard from "./CourseCard";

const CoursesWithSortWidget = ({ filteredCourses}) => {
  const [sortType, setSortType] = useState("grid");
  const handleSort = (sortType) => {
    setSortType(sortType);
  };
  return (
    <>
      <SortWidget onHandleSort={handleSort} filter={false} />
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="mb-5">
              {sortType === "fullWidth" && (
                <>
                {filteredCourses.length>0  && filteredCourses.map(course =>{
                    return (
                        <HorizontalCourseCard
                    courseHeading="Becoming a Successful Leader (Inclusive Leadership Training)"
                    courseAuthor="Deepali Bagati"
                    courseDesc="Become a successful leader by learning 21st-century leadership skills and applying concepts to th"
                    learningStyle="Self Paced"
                    learningLang="English"
                    learningLevel="Level"
                    coursePrice="N20, 000"
                  />

                      )
                })}
                  
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
                    
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CoursesWithSortWidget;
