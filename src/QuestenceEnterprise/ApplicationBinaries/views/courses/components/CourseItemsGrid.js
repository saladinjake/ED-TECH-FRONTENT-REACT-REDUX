import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Col } from "react-bootstrap";
import Pagination from "./Pagination";
import "./filter.css";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addToCart } from "../../../redux/actions/cart.action";
import { getAuthProfile } from "../../../api/enrollment_services/learner.services";

import toast from "react-hot-toast";

import { addToWishList } from "../../../redux/actions/wishlist.action";
import $ from "jquery";

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

  useEffect(() => {
    // $(
    //   ".product-view p,.product-view span,.product-view a,.product-view h3, .product-view h4, .product-view h5, .product-view h2 "
    // ).each(function () {
    //   $(this).css({ color: "#000", "font-family": "Open Sans" });
    // });

    // $(
    //   ".category-course-list p,.category-course-list div, .category-course-list span, .category-course-list b"
    // ).each(function () {
    //   $(this).css({ fontFamily: "Open Sans", color: "#000" });
    // });
  });

  return (
    <Fragment>
      {currentCourses.length > 0 ? (
        <Fragment>
          <div className="category-course-list">
            <ul>
              {currentCourses.map((data, i) => {
                return (
                  <Fragment>
                    <li className="shown article-dummy">
                      <div className="course-box-2">
                        <div
                          className="course-image"
                          style={{ border: "2px solid #f5f5f5" }}
                        >
                          <a
                            href={`${process.env.PUBLIC_URL}/courses/${data.id}`}
                          >
                            <img
                              style={{ height: "180px", color: "#000" }}
                              src={`${data.course_cover_image}`}
                              alt=""
                              className="img-fluid"
                            />
                          </a>
                        </div>
                        <div className="course-details">
                          <a
                            href={`${process.env.PUBLIC_URL}/courses/${data.id}`}
                            className="course-title-n head__style-3"
                            style={{
                              color: "#000",
                              lineHeight: "20px",
                              width: "100%",
                              fontFamily: "Open Sans",
                            }}
                          >
                            {data.course_name}
                          </a>
                          <a
                            href={`${process.env.PUBLIC_URL}/courses/${data.id}`}
                            className="course-instructor head__style-7"
                          >
                            <span
                              className="instructor-name head__style-7"
                              style={{ color: "#000", fontWeight: "bold" }}
                            >
                              {data?.instructor?.first_name}{" "}
                              {data?.instructor?.last_name}
                            </span>
                          </a>

                          {/^/.test(data?.course_description) ? (
                            <div
                              style={{ display: "table" }}
                              className="head__style-7"
                              dangerouslySetInnerHTML={{
                                __html: data?.course_description?.substring(
                                  0,
                                  100
                                ),
                              }}
                            />
                          ) : (
                            <div
                              style={{ display: "table" }}
                              className=" head__style-7"
                              style={{ color: "#000" }}
                            >
                              {data?.course_description?.substring(0, 100)}
                            </div>
                          )}

                          <div className="course-meta head__style-7">
                            <span className="">
                              <i className="fa fa-play-circle"></i>
                              {data?.learning_style}{" "}
                            </span>
                            <span className="">
                              <i className="fa fa-clock"></i>
                            </span>
                            <span className="">
                              <i className="fa fa-closed-captioning"></i>
                              {data?.language?.english}
                            </span>
                            <span className="">
                              <i className="fa fa-level-up"></i>Level
                            </span>
                          </div>
                        </div>
                        <div className="course-price-rating">
                          <div
                            className="course-price"
                            style={{ color: "#000" }}
                          >
                            <span
                              className="current-price"
                              style={{ color: "#000" }}
                            >
                              NGN {data?.price}
                            </span>
                          </div>
                          <div className="rating">
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <i className="fa fa-star"></i>
                            <span className="d-inline-block average-rating">
                              0
                            </span>
                          </div>
                          <div className="rating-number"> </div>
                        </div>
                      </div>
                    </li>
                  </Fragment>
                );
              })}
            </ul>

            <Fragment>
              <div className="hide">
                {currentCourses.length > 0 &&
                  currentCourses.map((item, i) => {
                    let width = "";
                    if (currentCourses.length === 1) {
                      width = "200px";
                    } else if (
                      currentCourses.length === 2 ||
                      currentCourses.length === 3
                    ) {
                      width = "350px";
                    } else {
                      width = "";
                    }

                    return (
                      <Fragment
                        className="found-item col-md-3 col-sm-12 col-lg-3"
                        key={item.id}
                      >
                        <div
                          className={
                            currentCourses.length === 1
                              ? "product-view bookset"
                              : "product-view col-merge-12 col-merge-s-4 col-merge-d3 bookset"
                          }
                          style={{
                            width: width,
                            marginRight: "-15px",
                            border: "1px solid #fafafa",
                          }}
                        >
                          <div className="card-box" style={{ height: "350px" }}>
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
                                    style={{
                                      width: "100%",
                                      height: "100px",
                                      borderBottom: "2px solid #000",
                                    }}
                                  />
                                ) : (
                                  <Fragment />
                                )}{" "}
                                <div className="middle-overlay"></div>
                              </Link>
                            </figure>

                            <div
                              className="info2   "
                              style={{
                                zIndex: 2147483647 + 900,
                                height: "110%",
                                width: "170%",
                                marginTop: "80px",
                              }}
                            >
                              <div
                                style={{
                                  padding: "5px",
                                  color: "#000",
                                  width: "100%",
                                }}
                              >
                                <div style={{ width: "100%", height: "50px" }}>
                                  <img
                                    src={item?.instructor?.image_url}
                                    style={{
                                      width: "50px",
                                      height: "50px",
                                      borderRadius: "50%",
                                      float: "left",
                                      marginRight: "10px",
                                    }}
                                  />

                                  <div>
                                    <h5
                                      style={{
                                        width: "100%",
                                        fontSize: "14px",
                                        fontWeight: "small",
                                        color: "#000",
                                        marginLeft: "20px",
                                        fontFamily: "Open Sans",
                                      }}
                                    >
                                      {item?.instructor?.first_name}{" "}
                                      {item?.instructor?.last_name}
                                    </h5>
                                    <p
                                      style={{
                                        width: "100%",
                                        marginTop: "4px",
                                        textTransform: "capitalize",
                                        fontWeight: "bold",
                                        color: "#000",
                                      }}
                                    >
                                      {
                                        item?.instructor?.instructor_profile
                                          ?.current_employer_designation
                                      }
                                    </p>
                                  </div>
                                </div>
                                <br />

                                <h4
                                  className="stori-line"
                                  style={{
                                    fontSize: "25px",
                                    lineHeight: "32px",
                                    fontWeight: "600",
                                    width: "100%",
                                    color: "#000",
                                    margin: "0 0 15px",
                                  }}
                                >
                                  {" "}
                                  {item?.course_name}
                                </h4>

                                {/^/.test(item?.course_description) ? (
                                  <p
                                    className="course-subtitle dark"
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "12px",
                                    }}
                                    dangerouslySetInnerHTML={{
                                      __html:
                                        item?.course_description?.substring(
                                          0,
                                          170
                                        ) + "...",
                                    }}
                                  />
                                ) : (
                                  <p
                                    className="course-subtitle dark"
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "12px",
                                    }}
                                  >
                                    {item?.course_description.substring(
                                      0,
                                      170
                                    ) + "..."}
                                  </p>
                                )}
                              </div>

                              {/* <div className="stm_lms_courses__single--info_meta style-8a" style={{marginBottom:"-10px"}}>
                      <div className="stm_lms_course__meta style-8a"> 
                         <i className="fa fa-signal " style={{marginRight:"4px"}}></i> Beginner
                      </div>
                      <div className="stm_lms_course__meta style-8a"> 
                        <i className="fa fa-bars " style={{marginLeft:"4px"}}>{item?.course?.learning_style}</i> 
                      </div>
                      <div className="stm_lms_course__meta style-8a"> 
                        <i className="fa fa-clock " style={{marginLeft:"4px"}}>{item?.course?.duration} hrs</i>
                      </div>
                    </div>*/}

                              <div
                                className="stm_lms_courses__single--info_meta"
                                style={{ position: "absolute", bottom: "30px" }}
                              >
                                <div className="stm_lms_course__meta">
                                  <a
                                    style={{
                                      background: "rgba(8,23,200)",
                                      color: "#fff",
                                    }}
                                    href="#detailView"
                                    onClick={() => {
                                      window.location.href =
                                        process.env.PUBLIC_URL +
                                        "/courses/" +
                                        item?.id;
                                    }}
                                    className="button-c button-rounded-right seedetail whitish"
                                  >
                                    Detail
                                  </a>
                                </div>
                                <div
                                  className="stm_lms_course__meta"
                                  style={{ marginLeft: "30px" }}
                                ></div>
                                <div
                                  className="stm_lms_course__meta"
                                  style={{ marginLeft: "30px" }}
                                ></div>
                              </div>

                              <div
                                className="bottom-sect"
                                style={{
                                  display: "table",
                                  clear: "both",
                                  height: "30px",
                                }}
                              >
                                <p
                                  style={{
                                    borderTop: "1px solid #000",
                                    color: "#000",
                                    display: "table",
                                    position: "absolute",
                                    bottom: "0px",
                                    width: "86%",
                                    padding: "10px",
                                    fontSize: "10px",
                                  }}
                                >
                                  Reviews
                                </p>

                                <div
                                  style={{
                                    color: "#000",
                                    position: "absolute",
                                    bottom: "0px",
                                    padding: "10px",
                                    float: "right",
                                    right: "0px",
                                  }}
                                >
                                  NGN{item?.price}
                                </div>
                              </div>
                            </div>

                            <div className="">
                              <div
                                style={{ padding: "1px", marginLeft: "3px" }}
                              >
                                <p
                                  style={{
                                    width: "100%",
                                    fontWeight: "bold",
                                    lineHeight: "0px",
                                    marginBottom: "7px",
                                  }}
                                >
                                  <Link
                                    to={
                                      process.env.PUBLIC_URL +
                                      "/courses/" +
                                      item.id +
                                      "/" +
                                      item.slug
                                    }
                                    style={{
                                      fontWeight: "700",
                                      fontFamily: "Open Sans",
                                      fontSize: "12px",
                                      width: "100%",
                                      color: "#000",
                                      lineHeight: "20px",
                                    }}
                                  >
                                    {item?.category?.name} >
                                  </Link>
                                </p>

                                <p
                                  style={{
                                    fontWeight: "700",
                                    width: "100%",
                                    fontFamily: "Open Sans",
                                    fontSize: "12px",
                                    color: "#000",
                                    lineHeight: "20px",
                                  }}
                                >
                                  <Link
                                    to={
                                      process.env.PUBLIC_URL +
                                      "/courses/" +
                                      item.id +
                                      "/" +
                                      item.slug
                                    }
                                    style={{
                                      fontWeight: "700",
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "12px",
                                      lineHeight: "20px",
                                    }}
                                  >
                                    {item?.course_code}
                                  </Link>
                                </p>

                                <p
                                  style={{
                                    width: "100%",
                                    fontWeight: "bold",
                                    marginTop: "3px",
                                    color: "#000",
                                  }}
                                >
                                  <Link
                                    to={
                                      process.env.PUBLIC_URL +
                                      "/courses/" +
                                      item.id +
                                      "/" +
                                      item.slug
                                    }
                                    style={{
                                      width: "100%",
                                      marginTop: "2px",
                                      color: "#000",
                                      fontWeight: "bold",
                                    }}
                                    className=" style-8a"
                                  >
                                    {item.course_name.substring(0, 80) + "..."}
                                  </Link>
                                </p>
                                <p
                                  className="style-8a"
                                  style={{
                                    color: "#000",
                                    width: "100%",
                                    marginTop: "4px",
                                    position: "absolute",
                                    bottom: "95px",
                                    fontSize: "10px",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {
                                    item?.instructor?.instructor_profile
                                      ?.current_employer_designation
                                  }
                                </p>

                                <p
                                  className="style-8a"
                                  style={{
                                    color: "#000",
                                    width: "100%",
                                    position: "absolute",
                                    bottom: "80px",
                                    fontSize: "10px",
                                    fontWeight: "bold",
                                  }}
                                >
                                  {item?.instructor?.first_name !== null &&
                                    item?.instructor?.first_name +
                                      " " +
                                      item?.instructor?.last_name}
                                </p>
                              </div>
                            </div>
                            <div>
                              <p
                                style={{
                                  borderTop: "1px solid #000",
                                  color: "#000",
                                  display: "table",
                                  position: "absolute",
                                  fontWeight: "bold",
                                  bottom: "40px",
                                  width: "75%",
                                  padding: "10px",
                                  fontSize: "10px",
                                }}
                              >
                                Course
                              </p>

                              <div
                                style={{
                                  color: "#000",
                                  marginRight: "20px",
                                  position: "absolute",
                                  fontWeight: "bold",
                                  bottom: "40px",
                                  padding: "10px",
                                  float: "right",
                                  right: "0px",
                                }}
                              >
                                <Link
                                  to={
                                    process.env.PUBLIC_URL +
                                    "/courses/" +
                                    item.id +
                                    "/" +
                                    item.slug
                                  }
                                  style={{
                                    fontSize: "10px",
                                    width: "100%",
                                    color: "#000",
                                  }}
                                >
                                  Details
                                </Link>
                              </div>

                              {/*  <div style={{position:"absolute",
                               bottom:"-18px",width:"100%",padding:"10px",right:"0px"}}><form className="rating-form" action="#" method="post" name="rating-movie">
                              <fieldset className="form-group">
                                
                                <legend className="form-legend">Rating:</legend>
                                
                                <div className="form-item">
                                  
                                  <input id="rating-5" name="rating" type="radio" value="5" />
                                  <label for="rating-5" data-value="5">
                                    <span className="rating-star">
                                      <i className="fa fa-star-o"></i>
                                      <i className="fa fa-star"></i>
                                    </span>
                                    <span className="ir">5</span>
                                  </label>
                                  <input id="rating-4" name="rating" type="radio" value="4" />
                                  <label for="rating-4" data-value="4">
                                    <span className="rating-star">
                                      <i className="fa fa-star-o"></i>
                                      <i className="fa fa-star"></i>
                                    </span>
                                    <span className="ir">4</span>
                                  </label>
                                  <input id="rating-3" name="rating" type="radio" value="3" />
                                  <label for="rating-3" data-value="3">
                                    <span className="rating-star">
                                      <i className="fa fa-star-o"></i>
                                      <i className="fa fa-star"></i>
                                    </span>
                                    <span className="ir">3</span>
                                  </label>
                                  <input id="rating-2" name="rating" type="radio" value="2" />
                                  <label for="rating-2" data-value="2">
                                    <span className="rating-star">
                                      <i className="fa fa-star-o"></i>
                                      <i className="fa fa-star"></i>
                                    </span>
                                    <span className="ir">2</span>
                                  </label>
                                  <input id="rating-1" name="rating" type="radio" value="1" />
                                  <label for="rating-1" data-value="1">
                                    <span className="rating-star">
                                      <i className="fa fa-star-o"></i>
                                      <i className="fa fa-star"></i>
                                    </span>
                                    <span className="ir">1</span>
                                  </label>
                                  
                                  <div className="form-action">
                                    <input className="btn-reset" type="reset" value="Reset" />   
                                  </div>

                                  <div className="form-output">
                                    ? / 5
                                  </div>
                                  
                                </div>
                                
                              </fieldset>
                            </form>*/}
                            </div>
                          </div>
                        </div>
                      </Fragment>
                    );
                  })}
              </div>
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
