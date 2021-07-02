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

function CoursedataGrid({
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
  var isHTML = RegExp.prototype.test.bind(/(<([^>]+)>)/i);

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
          <div class="category-course-list">
            <ul>
              {currentCourses.map((data, i) => {
                return (
                  <Fragment>
                    <li className="shown">
                      <div class="course-box-2">
                        <div class="course-image" style={{border:"2px solid #f5f5f5"}}>
                          <a
                            href={`${process.env.PUBLIC_URL}/courses/${data.id}`}
                          >
                            <img
                              style={{ height: "180px" }}
                              src={`${data.course_cover_image}`}
                              alt=""
                              class="img-fluid"
                            />
                          </a>
                        </div>
                        <div class="course-details">
                          <a
                            href={`${process.env.PUBLIC_URL}/courses/${data.id}`}
                            class="course-title"
                          >
                            {data.course_name}
                          </a>
                          <a
                            href={`${process.env.PUBLIC_URL}/courses/${data.id}`}
                            class="course-instructor"
                          >
                            <span class="instructor-name">
                              {data?.instructor?.first_name}{" "}
                              {data?.instructor?.last_name}
                            </span>
                          </a>

                          {/^/.test(data?.course_description) ? (
                            <div
                              style={{ display: "table" }}
                              class="course-subtitle"
                              dangerouslySetInnerHTML={{
                                __html: data?.course_description,
                              }}
                            />
                          ) : (
                            <div
                              style={{ display: "table" }}
                              class="course-subtitle"
                            >
                              {data?.course_description}
                            </div>
                          )}

                          <div class="course-meta">
                            <span class="">
                              <i class="fa fa-play-circle"></i>
                              {data?.learning_style}{" "}
                            </span>
                            <span class="">
                              <i class="fa fa-clock"></i>
                            </span>
                            <span class="">
                              <i class="fa fa-closed-captioning"></i>
                              {data?.language?.english}
                            </span>
                            <span class="">
                              <i class="fa fa-level-up"></i>Level
                            </span>
                          </div>
                        </div>
                        <div class="course-price-rating">
                          <div class="course-price">
                            <span class="current-price">NGN {data?.price}</span>
                          </div>
                          <div class="rating">
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <i class="fa fa-star"></i>
                            <span class="d-inline-block average-rating">0</span>
                          </div>
                          <div class="rating-number">0 Ratings </div>
                        </div>
                      </div>
                    </li>
                  </Fragment>
                );
              })}
            </ul>

            <Fragment>
              {currentCourses.map((item, i) => {
                return (
                  <Col md="4" >
                    <div
                      class="product product-set left_adjust hide"
                      style={{ height: "300px",}}
                    >
                      <figure>
                        <Link
                          to={
                            process.env.PUBLIC_URL +
                            "/courses/" +
                            item.id +
                            "/" +
                            item.slug
                          }
                          className="image-popup"
                          title="Screenshot-1"
                        >
                          {item.course_cover_image !== null ? (
                            <img
                              src={item.course_cover_image}
                              className="thumb-img imagemix"
                              alt="work-thumbnail"
                              style={{ width: "100%", height: "auto" }}
                            />
                          ) : (
                            <Fragment />
                          )}{" "}
                          <div className="middle-overlay"></div>
                        </Link>
                      </figure>

                      <div class="product-description">
                        <div class="info">
                          <p style={{ height: "50px", color: "blue" }}>
                            <Link
                              to={
                                process.env.PUBLIC_URL +
                                "/courses/" +
                                item.id +
                                "/" +
                                item.slug
                              }
                              style={{ fontSize: "14px" }}
                              className="text-dark"
                            >
                              {item.course_name}
                            </Link>
                          </p>
                          <p>
                            A course by{" "}
                            {item?.instructor?.first_name !== null &&
                              item?.instructor?.first_name +
                                " " +
                                item?.instructor?.last_name}
                          </p>
                        </div>

                        <div class="priceX" style={{ fontSize: "12px" }}>
                          {item.price}
                        </div>
                      </div>
                    </div>
                  </Col>
                );
              })}
            </Fragment>
          </div>
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

// export default CoursedataGrid;

CoursedataGrid.propTypes = {
  cart: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addToCart: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.cart,
  auth: state.auth,
  wishList: state.wishList,
});

export default connect(mapStateToProps, {
  addToCart,
  addToWishList,
})(CoursedataGrid);
