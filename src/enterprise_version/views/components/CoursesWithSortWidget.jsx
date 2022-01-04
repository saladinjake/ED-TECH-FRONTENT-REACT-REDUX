import React, { useState } from "react";
import SortWidget from "./SortWidgetMyLearning";
import HorizontalCourseCard from "./EnrolledHorizontalCourseCard";
import CourseCard from "./EnrolledCourseCard";
const CoursesWithSortWidget = ({ filteredCourses }) => {
  const [sortType, setSortType] = useState("grid");
  const defaultCourseIdForTestingPurpose ="fd3a6e73-e95b-4199-990b-553f15218276"
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
                  {filteredCourses.length > 0 &&
                    filteredCourses.map((course, index) => {
                      let givenCourseId =course?.course?.lms_course_id
                      if(!course?.course?.lms_course_id || course?.course?.lms_course_id==null){
                          givenCourseId = defaultCourseIdForTestingPurpose
                      }
                      return (
                        <HorizontalCourseCard
                          key={index + "_" + Math.random() * 90}
                          courseTitle={course?.course?.course_code}
                          courseDesc={course?.course?.course_description}
                          courseAuthorCompany={
                            course?.course?.instructor?.instructor_profile
                              ?.current_employer_designation
                          }
                          courseAuthor={
                            course?.course?.instructor?.first_name +
                            " " +
                            course?.course?.instructor?.last_name
                          }
                          coursePrice={course?.course?.price}
                          courseId={course?.course?.id}
                          courseImage={course?.course?.course_cover_image}
                          learningLang={course?.course?.language?.english}
                          learningStyle={course?.course?.learning_style}
                          learningLevel={course?.course?.level}
                          courseBtnText="View Course"
                          courseRating="3"
                          courseCompletion="90"
                          givenCourseId={givenCourseId }
                        />
                      );
                    })}
                </>
              )}
              {sortType === "grid" && (
                <>
                  <div className="row">
                    <>
                      {filteredCourses.length > 0 &&
                        filteredCourses.map((course, index) => {
                          console.log(course?.course)
                          let givenCourseId =course?.course?.lms_course_id
                          if(!course?.course?.lms_course_id || course?.course?.lms_course_id==null){
                              givenCourseId = defaultCourseIdForTestingPurpose
                          }
                          return (
                            <div className="col-md-4">
                              <CourseCard
                                key={index + "_" + Math.random() * 90}
                                courseTitle={course?.course?.course_code}
                                courseDesc={course?.course?.course_description}
                                courseAuthorCompany={
                                  course?.course?.instructor?.instructor_profile
                                    ?.current_employer_designation
                                }
                                courseAuthor={
                                  course?.course?.instructor?.first_name +
                                  " " +
                                  course?.course?.instructor?.last_name
                                }
                                coursePrice={course?.course?.price}
                                courseId={course?.course?.id}
                                courseImage={course?.course?.course_cover_image}
                                courseBtnText="View Course"
                                courseRating="4"
                                courseCompletion="40"
                                givenCourseId={givenCourseId }
                              />
                            </div>
                          );
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
