import React from "react";
// import { Row, Col } from "react-bootstrap";
import CourseSearch from "./CourseSearch";
import CoursePrice from "./CoursePrice";
import CourseCategory from "./CourseCategory";
import CourseStyle from "./CourseStyle";

function CourseSidebar({
  setSearch,
  search,
  setFilterAllCourses,
}) {
  
  return (
    <div className="course-sidebar">
      
          <CourseSearch setSearch={setSearch} search={search} />
       
          <CourseCategory setFilterAllCourses={setFilterAllCourses} />
       
          <CoursePrice setFilterAllCourses={setFilterAllCourses} />
      
          <CourseStyle setFilterAllCourses={setFilterAllCourses} />
        
    </div>
  );
}

export default CourseSidebar;
