import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Col } from "react-bootstrap";
import Pagination from "./Pagination";
import "./filter.css";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addToCart } from "actions/cartActions";
import { getAuthProfile } from "services/learner.js";
import toast from "react-hot-toast";

import { addToWishList } from "actions/wishListActions";


function CourseItemGrid({
  allCourses,
  courses,
  auth: { isAuthenticated },
  cart: { cart },
  wishList: { wishList },
  addToCart,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [coursePerPage] = useState(50);
  const [currentCourses, setCurrCourses] = useState([]);

  //added
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const [coursedetails, setCourseDetails] = useState({});
  // eslint-disable-next-line
  const [status, setStatus] = useState("init");
  const [loading, setLoading] = useState(true);

  // Get current course
  var indexOfLastCourse = currentPage * coursePerPage;
  var indexOfFirstCourse = indexOfLastCourse - coursePerPage;

  //added

  console.log(wishList)

  useEffect(() => {
    (async function CheckStatus() {
      if (isAuthenticated === true) {
        try {
          let res = await getAuthProfile();
          let enrolledCourses = res.data.data;

          let ids = enrolledCourses.map((course) => course.course.id);

          setEnrolledCourses([...ids]);

          console.log(ids);
        } catch (err) {
          toast.error(
            err?.response?.data?.message ||
              `Error occured fetching active courses`
          );
        }
        setLoading(false);
      }
    })();
    // eslint-disable-next-line
  }, []);

  const checkCourseStatus = (courseId) => {
    var check = false;
    if (enrolledCourses.length > 0) {
      check = enrolledCourses.includes(courseId);
    }
    console.log(`cehck for ${courseId} is ${check}`);
    return check;
  };

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
            
            return (
              <Fragment  key={data.id}>
                <div className="widget grid grid-item" >
                  
                    <div className="widgetImage animation">
                    <Link to={`${process.env.PUBLIC_URL}/courses/${data.id}`}>
                      <img src={`${data.course_cover_image}`} alt="Product 1" />
                         </Link>
                    </div>
                    <div className="widgetContent animation">
                      <Link to={`${process.env.PUBLIC_URL}/courses/${data.id}`}>
                         <h6 className="widgetTitle">{data.course_name}</h6>
                      </Link>
                      <p style={{ padding: "10px" }}>
                        A course by {data.instructor.user.first_name}
                      </p>

                      <div className="short_desc">
                        <p style={{ color: "#333" }}>
                          {data.course_description}
                        </p>
                      </div>

                      <div className="course_infox">
                        <br />
                        <br />

                        <div className="info">
                          <p style={{ float: "left", marginLeft: "20px" }}>
                            Category {data.category.name}
                          </p>

                          <p style={{ float: "left", marginLeft: "20px" }}>
                            Language {data.language.english}
                          </p>

                          <p style={{ float: "left", marginLeft: "20px" }}>
                            Learning Style {data.learning_style}
                          </p>
                        </div>

                        <div className="price" style={{ float: "right" }}>
                          <i className="fa fa-2x fa-shopping-cart"></i> N{" "}
                          {data.price}
                        </div>

                        <div>
                          <br />

                          {isAuthenticated ? (
                            checkCourseStatus(data.id) ? (
                              ""
                            ) : (
                              <button
                                type="button"
                                onClick={addToCart.bind(this, data?.id)}
                                className="btn btn-primary add-to-cart"
                              >
                                Add to cart
                              </button>
                            )
                          ) : (
                            <button
                              className="btn btn-primary add-to-cart"
                              type="button"
                              onClick={(e) => {
                                return (window.location.href =
                                  process.env.PUBLIC_URL + `/login`);
                              }}
                            >
                              <i className="fa fa-lock"></i> Login To Enroll
                            </button>
                          )}

                          <button
                            className="btn btn-info add-to-cart"
                            type="button"
                            onClick={() =>{window.location.href =
                                  process.env.PUBLIC_URL + `/courses/`+ data.id
                                }}
                          >
                            <i style={{marginRight:"10px"}} className="fa fa-eye"></i>Course Detail{" "}
                          </button>
                        </div>
                      </div>

                      <br />
                      <div className="widgetSubTitle">
                        <hr style={{ width: "240px" }} />
                        <h2>Course</h2>
                      </div>
                    </div>
               
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
              </Fragment>
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

// export default CourseItemGrid;

CourseItemGrid.propTypes = {
  cart: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addToCart: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.cart,
  auth: state.auth,
  wishList:state.wishList

});

export default connect(mapStateToProps, {
  addToCart,
  addToWishList
})(CourseItemGrid);
