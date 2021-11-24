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
                {filteredCourses.length>0  && filteredCourses.map((course,index) =>{
                  
                    return (
                       <HorizontalCourseCard
                          key={index+ "_" + Math.random()*90}
                courseTitle={course?.course?.course_code}
                courseDesc={course?.course?.course_description}
                courseAuthorCompany={course?.course?.instructor?.instructor_profile?.current_employer_designation}
                courseAuthor={course?.course?.instructor?.first_name+ " " + course?.course?.instructor?.last_name}
                coursePrice={course?.course?.price}
                courseId={course?.course?.id}
                courseImage={course?.course?.course_cover_image}
                learningLang={course?.course?.language?.english}
                learningStyle={course?.course?.learning_style}
                learningLevel={course?.course?.level}
                      />

                      )
                })}
                  
                </>
              )}
              {sortType === "grid" && (
                <>
                  <div className="row">
                 



                    <>
                    {filteredCourses.length>0  && filteredCourses.map( (course,index) =>{
               
                    return (
                        <div className="col-md-4">
                      <CourseCard
                 key={index+ "_" + Math.random()*90}
                courseDesc={course?.course?.course_description}
                courseAuthorCompany={course?.course?.instructor?.instructor_profile?.current_employer_designation}
                courseAuthor={course?.course?.instructor?.first_name+ " " + course?.course?.instructor?.last_name}
                coursePrice={course?.course?.price}
                courseId={course?.course?.id}
                courseImage={course?.course?.course_cover_image}
              />
                    </div>

                      )
                })}
                  
                </>
              
                    
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
