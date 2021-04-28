import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Col } from "react-bootstrap";
import Pagination from "./Pagination";

function CourseItemGrid({ allCourses, courses }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [coursePerPage] = useState(50);
  const [currentCourses, setCurrCourses] = useState([]);

  // Get current course
  var indexOfLastCourse = currentPage * coursePerPage;
  var indexOfFirstCourse = indexOfLastCourse - coursePerPage;

  useEffect(() => {
    if (allCourses.length > 0) {
      setCurrCourses(allCourses.slice(indexOfFirstCourse, indexOfLastCourse));
    } else {
      setCurrCourses([]);
    }
    // eslint-disable-next-line
  }, [allCourses]);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    indexOfLastCourse = pageNumber * coursePerPage;
    indexOfFirstCourse = indexOfLastCourse - coursePerPage;
    setCurrCourses(allCourses.slice(indexOfFirstCourse, indexOfLastCourse));
  };

  return (
    <Fragment>
      {currentCourses.length > 0 ? (
        <Fragment>
          {currentCourses.map((data, i) => {
            console.log(data)
            return (
              <Col lg="4" md="6" key={i}>
                <div className="course-item " style={{width:"200px",height:"200px", background:"#fafafa"}}>
                  <Link to={`${process.env.PUBLIC_URL}/courses/${data.id}`}>
                    <div
                      
                      style={{
                        height:"100px",
                        backgroundImage: data

                          ? `url(${data.course_cover_image})`
                          : "",
                             backgroundRepeat:"no-repeat",
    backgroundPosition: "center center",
    
    minHeight:"20%"
                      }}
                    >
                      
                      
                    </div>
                  </Link>
                  <div className="course-content">
                    <h6 style={{fontSize:"14px"}}>
                      <Link to={`${process.env.PUBLIC_URL}/courses/${data.id}`}>
                        {data.course_name.substring(0,20)+ "..."}
                      </Link>
                    </h6>
                  
                    <div className="course-face d-flex justify-content-between" >
                      <div className="duration">
                        <p>
                         Instructor
                        </p>
                      </div>
                     
                      <div className="student">
                        <p>
                          {"sakakas"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
            );
          })}
        </Fragment>
      ) : (
        <p>No courses yet.</p>
      )}

      <Col md="12" className="text-center">
        <Pagination
          coursePerPage={coursePerPage}
          totalCourses={allCourses}
          // totalCourses={courses}
          paginate={paginate}
          currentPage={currentPage}
        />
      </Col>
    </Fragment>
  );
}

export default CourseItemGrid;
