import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Col } from "react-bootstrap";
import Pagination from "./Pagination";
import "./filter.css"

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
                  

                       <div class="widget">
                        <Link to={`${process.env.PUBLIC_URL}/courses/${data.id}`}>
                        <div class="widgetImage animation">
                          <img src={`${data.course_cover_image}`} alt="Product 1" />
                        </div>
                        <div class="widgetContent animation" style={{background: `linear-gradient(200deg, #fff 30%, #2a0845 60%)` }}>
                          <h6 class="widgetTitle">
                        {data.course_name}
                         </h6>
                          <h2 class="widgetSubTitle">Course</h2>
                          <p>{data.description}</p>
                        </div>
                        </Link>
                      </div>


                {/*<div className="course-item " style={{width:"200px",height:"300px", background:"#fff"}}>
                  <Link to={`${process.env.PUBLIC_URL}/courses/${data.id}`}>
                    <div
                      
                      style={{
                        height:"150px",
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

                   <div
                      className="card-box"
                      style={{
                        height:"30px",
                        width:"50px",
                        position:"absolute",
                        top:"120px",
                        right:"90px",
                        padding:"5px",
                        backgroundImage: data

                          ? `url(${data.course_cover_image})`
                          : "",
                             backgroundRepeat:"no-repeat",
    backgroundPosition: "center center",
    
    minHeight:"20%"
                      }}
                    >
                      
                      
                    </div>
                  <div className="course-content" >
                    <h6 className="" style={{fontSize:"10px", color:"#fff"}}><br/>
                      <Link to={`${process.env.PUBLIC_URL}/courses/${data.id}`} >
                        {data.course_name}
                      </Link>
                    </h6>
                  
                    <div className="course-face " style={{position:"absolute",bottom: "40px"}}>
                      <div className="duration pull-left" style={{marginLeft:"40px",float:"left"}}>
                        <p style={{fontSize:"10px"}}>
                         Course
                        </p>
                      </div>
                     
                      <div className="student pull-right">
                        <p style={{fontSize:"10px", float:"right"}}>
                          
                        </p>
                      </div>
                    </div>
                  </div>
                </div>*/}
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
