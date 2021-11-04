import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import Pagination from "./Pagination";
import "./filter.css";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addToCart, fetchCourses } from "../../../redux/actions/courses.action";
import { getAuthProfile } from "../../../api/enrollment_services/learner.services";
import toast from "react-hot-toast";

import { addToWishList } from "../../../redux/actions/wishlist.action";
import { useQuery } from "../../../helpers/hooks/useQuery.js";
import "./rating.css";
import moment from "moment";
import { enrollCourses } from "../../../api/enrollment_services/enrollment.services";
import $ from "jquery";
function CourseItemGrid({
  allCourses,
  courses,
  auth: { isAuthenticated, user },
  cart: { cart },
  wishList: { wishList },
  addToCart,
  fetchCourses,
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

  useEffect(() => {
    (async function loadContent() {
      await fetchCourses();
      // const lastLocation = useLocation();
    })();
    // eslint-disable-next-line
  }, []);

  const handleWishList = async (e, id) => {
    e.preventDefault();
    return await addToWishList(id);
  };

 

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

  const handleAddToCart = async (e, course) => {
    e.preventDefault();
    console.log(course?.price);
    if (parseInt(course?.price) <= 0) {
      //automaitcally enroll
      let payload = [];
      let newObj = {};
      newObj.user_id = user?.id;
      newObj.course_id = course?.id;
      payload.push(newObj);

      try {
        await enrollCourses({
          enrollments: payload,
        });
        toast.success(`Free Course enrolled succesfully`);

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (err) {
        toast.error(
          `Could not enroll you in for the free course: ` + course.course_name
        );
      }
    } else {
      let paidCourseId = course?.id;
      addToCart(course.id);
    }
  };

  return (
    <Fragment>
      {currentCourses.length > 0 &&
        currentCourses.map((item, i) => {
          return (
            <Fragment className="container-fluid found-item" key={item.id}>
              <div
                className="product-view col-merge-12 col-md-3 col-sm-12 col-merge-s-4 col-merge-d3 bookset"
                style={{ marginRight: "-15px" }}
              >
                <div className="product product-set left_adjust">
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
                    className="info full-width card-box"
                    style={{ zIndex: 2147483647 + 900, height: "110%" }}
                  >
                    <div
                      style={{ padding: "5px", color: "#000", width: "100%" }}
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
                              item?.course_description?.substring(0, 100) +
                              "...",
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
                          {item?.course_description.substring(0, 100) + "..."}
                        </p>
                      )}
                    </div>

                    <div
                      className="stm_lms_courses__single--info_meta style-8a"
                      style={{ marginBottom: "-10px" }}
                    >
                      <div className="stm_lms_course__meta style-8a">
                        <i
                          className="fa fa-signal "
                          style={{ marginRight: "4px", fontWeight: "bold" }}
                        ></i>{" "}
                        Beginner
                      </div>
                      <div className="stm_lms_course__meta style-8a">
                        <i
                          className="fa fa-bars "
                          style={{ marginLeft: "4px", fontWeight: "bold" }}
                        >
                          {item?.course?.learning_style}
                        </i>
                      </div>
                      <div className="stm_lms_course__meta style-8a">
                        <i
                          className="fa fa-clock "
                          style={{ marginLeft: "4px", fontWeight: "bold" }}
                        >
                          {item?.course?.duration} hrs
                        </i>
                      </div>
                    </div>

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
                              process.env.PUBLIC_URL + "/courses/" + item?.id;
                          }}
                          className="button-c button-rounded-right seedetail"
                        >
                          Detail
                        </a>
                      </div>
                      <div
                        className="stm_lms_course__meta"
                        style={{ marginLeft: "30px" }}
                      >
                        {isAuthenticated ? (
                          <a
                            href="#addTowishBox"
                            style={{ color: "#fff", background: "red" }}
                            className=" button-c button-rounded-top"
                            onClick={(e) => {
                              handleWishList(e, item);
                            }}
                          >
                            Wishlist
                          </a>
                        ) : (
                          <a
                            href="#loginRequired"
                            style={{ color: "#fff", background: "red" }}
                            className="button-c button-rounded-right modal-link"
                          >
                            Wishlist
                          </a>
                        )}
                      </div>
                      <div
                        className="stm_lms_course__meta"
                        style={{ marginLeft: "30px" }}
                      >
                        {isAuthenticated ? (
                          <a
                            href="#addTocart"
                            className="button-c button-rounded-left"
                            style={{
                              backgroundColor: "rgba(8,23,200)",
                              color: "#fff",
                            }}
                            onClick={(e) => {
                              handleAddToCart(e, item);
                            }}
                          >
                            Buy
                          </a>
                        ) : (
                          <a
                            href="#addTocart"
                            className="button-c button-rounded-left  modal-link"
                            style={{
                              backgroundColor: "rgba(8,23,200)",
                              color: "#fff",
                            }}
                          >
                            Buy
                          </a>
                        )}
                      </div>
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
                    <div style={{ padding: "1px", marginLeft: "3px" }}>
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
                          bottom: "60px",
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
                          bottom: "40px",
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
                        bottom: "0px",
                        width: "100%",
                        padding: "10px",
                        fontSize: "10px",
                      }}
                    >
                      Course
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
                          color: "gray",
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
  wishList: state.wishList,
});

export default connect(mapStateToProps, {
  addToCart,
  addToWishList,
  fetchCourses,
})(CourseItemGrid);
