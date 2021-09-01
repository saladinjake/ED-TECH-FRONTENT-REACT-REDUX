import React, { useEffect, useState, Fragment } from "react";
import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import NavBar from "components/Navbar";
import Footer from "../../components/Footer";
import { BreadcrumbBox } from "../../components/common/Breadcrumb";
import { Styles } from "./styles/course.js";
import moment from "moment";
import { Link } from "react-router-dom";

import Loader from "components/Loader/Loader";
import { getCourse, getCourses } from "services/course";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchCourses, addToCart } from "actions/cartActions";
import { getAuthProfile } from "services/learner.js";
import toast from "react-hot-toast";
// import { useHistory, useLocation } from "react-router-dom";
import { addToWishList } from "actions/wishListActions";
import "./relatedcoursesmodal.css";
import $ from "jquery";

import "./playvideo.scss";

import NewEditForm from "../account/NewEditForm";

import { enrollCourses } from "services/enrollment.js";

const CourseDetails = ({
  history,
  match,
  auth: { isAuthenticated, user },
  cart: { cart },
  wishList: { wishList },
  addToCart,
  addToWishList,
  fetchCourses,
}) => {
  // console.log(cart)

  // console.log(history.location.pathname)

  const lastLocation = history.location.pathname;

  const [coursedetails, setCourseDetails] = useState({});
  // eslint-disable-next-line
  const [status, setStatus] = useState("init");
  const [loading, setLoading] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [relatedCourses, setRelatedCourses] = useState([]);

  const [editClicked, setEditClicked] = useState(false);

  const handleAddToCart = async (e, course) => {
    e.preventDefault();
    if (course.price <= 0) {
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
        toast.success(`Courses enrolled succesfully`);

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (err) {
        toast.error(`Could not enroll for free course` + course.course_name);
      }
    } else {
      let paidCourseId = course?.id;
      addToCart(course.id);
    }
  };

  useEffect(() => {
    $("body").css({ backgroundColor: "#fff" });
    $(document).ready(function () {
      $(".mydetail")
        .find("p, strong, span")
        .each(function () {
          $(this).css({ color: "#fff", fontFamily: "Open Sans" });
        });

      $("body")
        .find("div, p, strong, span,ul,li,b")
        .each(function () {
          $(this).css({ fontFamily: "Open Sans" });
        });

      $(".footer p,.footer span, footer p, footer span").each(function () {
        $(this).css({ color: "#fff", fontFamily: "Open Sans" });
      });

      $(".dark")
        .find("p,div, strong, span,ul,li,div,ol")
        .each(function () {
          $(this).css({
            color: "#000",
            fontFamily: "Open Sans",
            fontSize: "14px",
          });
        });

      $(".spacing")
        .find("p,div, strong, span,ul,li,div,ol")
        .each(function () {
          $(this).css({
            color: "#000",
            fontFamily: "Open Sans",
            fontSize: "14px",
            margin: "10px",
          });
        });

      $(".dark")
        .find("li,ul,ol")
        .each(function () {
          $(this).css({
            color: "#000",
            fontFamily: "Open Sans",
            fontSize: "14px",
            margin: "10px",
          });
        });
    });
  });

  const init = async () => {
    setStatus("loading");
    let courseId = parseInt(match.params.id);
    try {
      let response = await getCourse(courseId);
      setCourseDetails(response.data);

      let allcourses = await getCourses();
      setRelatedCourses(allcourses.data.data); // ;

      setStatus("success");
    } catch (err) {
      setStatus("error");
    }
    setLoading(false);
  };

  useEffect(() => {
    (async function loadContent() {
      await fetchCourses();
      // const lastLocation = useLocation();
    })();
    // eslint-disable-next-line
  }, []);

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

  useEffect(() => {
    init();
    const courseButton = document.querySelectorAll(".course-button");
    courseButton.forEach((button) => {
      button.addEventListener("click", () => {
        button.classList.toggle("active");
        const content = button.nextElementSibling;

        if (button.classList.contains("active")) {
          content.className = "course-content show";
          content.style.maxHeight = content.scrollHeight + "px";
        } else {
          content.className = "course-content";
          content.style.maxHeight = "0";
        }
      });
    });

    // eslint-disable-next-line
  }, []);

  function YouTubeGetID(url) {
    url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    return url[2] !== undefined ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
  }

  useEffect(() => {
    function toggle_video_modal() {
      $(".closeBtn").click(function () {
        // $($(this).data("target")).fadeOut(500);
        close_video_modal();
      });

      $(".js-trigger-video-modal").on("click", function (e) {
        // prevent default behavior for a-tags, button tags, etc.
        e.preventDefault();

        // Grab the video ID from the element clicked
        var id = $(this).attr("data-youtube-id");

        // Autoplay when the modal appears
        // Note: this is intetnionally disabled on most mobile devices
        // If critical on mobile, then some alternate method is needed
        var autoplay = "?autoplay=1";

        // Don't show the 'Related Videos' view when the video ends
        var related_no = "&rel=0";

        // String the ID and param variables together
        var src = "//www.youtube.com/embed/" + id + autoplay + related_no;

        // Pass the YouTube video ID into the iframe template...
        // Set the source on the iframe to match the video ID
        $("#youtube").attr("src", src);

        // Add class to the body to visually reveal the modal
        $("body").addClass("show-video-modal noscroll");

        // $("body").addClass("md-modal")

        $("#slideout").addClass("on");
      });

      // Close and Reset the Video Modal
      function close_video_modal(event) {
        // event.preventDefault();

        // re-hide the video modal
        $("body").removeClass("show-video-modal noscroll");

        // reset the source attribute for the iframe template, kills the video
        $("#youtube").attr("src", "");
      }
      // if the 'close' button/element, or the overlay-video are clicked
      $("body").on(
        "click",
        ".close-video-modal, .video-modal .overlay-video",
        function (event) {
          // call the close and reset function
          close_video_modal();
        }
      );
      // if the ESC key is tapped
      $("body").keyup(function (e) {
        // ESC key maps to keycode `27`
        if (e.keyCode == 27) {
          // call the close and reset function
          close_video_modal();
        }
      });
    }
    toggle_video_modal();

    // $('.btn-default').click(function(){
    //   $('#slideout').toggleClass('on');
    // });
  });

  const checkCourseStatus = (courseId) => {
    var check = false;
    if (enrolledCourses.length > 0) {
      check = enrolledCourses.includes(courseId);
    }
    console.log(`cehck for ${courseId} is ${check}`);
    return check;
  };

  console.log(coursedetails);

  function formaturl(youtube) {
    var url = youtube;
    var idVideo = "";
    var regExp = /^.*(youtu\.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[2].length == 11) {
      var id = match[2];
      idVideo = id;
      console.log(id);
      var path = "https://img.youtube.com/vi/" + id + "/0.jpg";
      console.log(
        path,
        "https://img.youtube.com/vi/" + id + "/1.jpg",
        "http://img.youtube.com/vi/" + id + "/2.jpg"
      );
    }

    return { idVideo, path };
  }

  return (
    <Fragment>
      <div className="main-wrapper course-details-page">
        {/* Header 2 */}
        <NavBar />

        {editClicked == true ? (
          <NewEditForm initialValues={coursedetails?.data} />
        ) : (
          <Fragment>
            <br />
            <br />
            <br />
            {loading ? (
              <Fragment />
            ) : (
              <section
                className="course-header-area article-dummy"
                style={{ marginTop: "-90px", height: "390px" }}
              >
                <div className="container">
                  <div className="row align-items-end">
                    <div className="col-md-8">
                      <br />
                      <div className="course-header-wrap">
                        <h1
                          className="t-x hide"
                          style={{
                            marginTop: "-10px",
                            fontWeight: "300px",
                            color: "#fff",
                            margin: "20px",
                            fontSize: "20px",
                            fontFamily: "Open Sans",
                            lineHight: "24px",
                            fontWeight: "normal",
                          }}
                        >
                          {coursedetails?.data?.course_name}
                        </h1>

                        <h1
                          className="t-x shown"
                          style={{
                            marginTop: "-10px",
                            fontWeight: "300px",
                            color: "#fff",
                            margin: "20px",
                            fontSize: "45px",
                            fontFamily: "Open Sans",
                            lineHight: "54px",
                            fontWeight: "normal",
                          }}
                        >
                          {coursedetails?.data?.course_name}
                        </h1>
                        <p
                          className="subtitle"
                          style={{
                            marginLeft: "30px",
                            fontFamily: "Open Sans",
                            color: "#fff",
                            fontSize: "14px",
                          }}
                        >
                          {/^/.test(coursedetails?.data?.course_description) ? (
                            <div
                              className="mydetail"
                              style={{
                                fontFamily: "Open Sans",
                                color: "#fff",
                                fontSize: "14px",
                              }}
                              dangerouslySetInnerHTML={{
                                __html: coursedetails?.data?.course_description,
                              }}
                            />
                          ) : (
                            <div
                              className="course-subtitle mydetail"
                              style={{
                                fontFamily: "Open Sans",
                                color: "#fff",
                                fontSize: "14px",
                              }}
                            >
                              {coursedetails?.data?.course_description.substring(
                                0,
                                150
                              ) + "..."}
                            </div>
                          )}
                        </p>
                        <div
                          className="rating-row"
                          style={{ marginLeft: "30px" }}
                        >
                          <span
                            className="course-badge best-seller"
                            style={{
                              fontFamily: "Open Sans",
                              color: "#fff",
                              fontSize: "14px",
                            }}
                          >
                            Level
                          </span>
                          <i className="fas fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <span
                            className="d-inline-block average-rating"
                            style={{
                              fontFamily: "Open Sans",
                              color: "#fff",
                              fontSize: "14px",
                            }}
                          >
                            0
                          </span>
                          <span
                            style={{
                              fontFamily: "Open Sans",
                              color: "#fff",
                              fontSize: "14px",
                            }}
                          >
                            (0 Ratings)
                          </span>
                        </div>
                        <div
                          className="created-row"
                          style={{ marginLeft: "30px" }}
                        >
                          <span
                            className="created-by"
                            style={{
                              fontFamily: "Open Sans",
                              color: "#fff",
                              fontSize: "14px",
                            }}
                          >
                            A course by{" "}
                            {coursedetails?.data?.instructor?.first_name}{" "}
                            {coursedetails?.data?.instructor?.last_name}
                          </span>
                          <span
                            className="last-updated-date"
                            style={{
                              fontFamily: "Open Sans",
                              color: "#fff",
                              fontSize: "14px",
                            }}
                          >
                            Last updated {}
                          </span>
                          <span
                            className="comment"
                            style={{
                              fontFamily: "Open Sans",
                              color: "#fff",
                              fontSize: "14px",
                            }}
                          >
                            <i className="fa fa-comment"></i>
                            {coursedetails?.data?.language?.english}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <br />
                <br />
                <br />
                <br />
              </section>
            )}
            <Styles>
              {/* Course Details */}
              {loading ? (
                <Loader width="70" />
              ) : Object.entries(coursedetails).length !== 0 ? (
                <Fragment>
                  <section
                    className="course-details-area"
                    style={{
                      height: "3000px",
                      marginTop: "-20px",
                      background: "#fff",
                    }}
                  >
                    <Container>
                      <Row>
                        <Col lg="8" md="8" sm="12">
                          <div
                            className="course-details-top nav nav-pills "
                            style={{ marginTop: "-10px" }}
                          >
                            <div className="course-tab-list ">
                              <Tab.Container defaultActiveKey="overview">
                                <Nav className="flex-column">
                                  <Nav.Item>
                                    <Nav.Link eventKey="overview">
                                      Overview
                                    </Nav.Link>
                                  </Nav.Item>
                                  <Nav.Item>
                                    <Nav.Link eventKey="curriculum">
                                      Curriculum
                                    </Nav.Link>
                                  </Nav.Item>
                                  <Nav.Item>
                                    <Nav.Link eventKey="instructor">
                                      Instructors
                                    </Nav.Link>
                                  </Nav.Item>
                                  {/*<Nav.Item>
                              <Nav.Link eventKey="review">Reviews</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="announcements">
                                Announcements
                              </Nav.Link>
                            </Nav.Item>*/}
                                </Nav>
                                <Tab.Content>
                                  <Tab.Pane
                                    eventKey="overview"
                                    className="overview-tab"
                                  >
                                    <div className="course-desc-x">
                                      <h5
                                        className="shown"
                                        style={{
                                          fontWeight: "300px",
                                          color: "#000",
                                          fontSize: "25px",
                                          fontFamily: "Open Sans",
                                          lineHight: "34px",
                                          fontWeight: "normal",
                                        }}
                                      >
                                        Course Overview
                                      </h5>
                                      <h5
                                        className="hide"
                                        style={{
                                          fontWeight: "300px",
                                          color: "#000",
                                          fontSize: "25px",
                                          fontFamily: "Open Sans",
                                          lineHight: "24px",
                                          fontWeight: "normal",
                                        }}
                                      >
                                        Course Overview
                                      </h5>
                                      <br className="hide article-dummy" />
                                      <div
                                        className=" main-videosection "
                                        style={{
                                          position: "relative",
                                          marginTop: "-20px",
                                        }}
                                      >
                                        <section
                                          className="column left banner"
                                          style={{ marginTop: "-20px" }}
                                        >
                                          <a
                                            href={
                                              "https://www.youtube.com/embed/" +
                                              formaturl(
                                                coursedetails?.data
                                                  ?.introduction_video
                                              ).idVideo
                                            }
                                            data-youtube-id={YouTubeGetID(
                                              coursedetails?.data
                                                ?.introduction_video
                                            )}
                                            className="video-banner js-trigger-video-modal"
                                          >
                                            <img
                                              className="video-banner-img"
                                              src={
                                                "http://img.youtube.com/vi/" +
                                                YouTubeGetID(
                                                  coursedetails?.data
                                                    ?.introduction_video
                                                ) +
                                                "/0.jpg"
                                              }
                                              alt=""
                                            />

                                            <div class="triangle"></div>
                                          </a>
                                        </section>
                                      </div>
                                      <p
                                        style={{
                                          fontFamily: "Open Sans",
                                          color: "#000",
                                          fontSize: "14px",
                                        }}
                                      >
                                        <br />

                                        {/^/.test(
                                          coursedetails?.data?.course_overview
                                        ) ? (
                                          <div
                                            className="course-subtitle dark"
                                            style={{
                                              fontFamily: "Open Sans",
                                              color: "#000",
                                              fontSize: "14px",
                                            }}
                                            dangerouslySetInnerHTML={{
                                              __html:
                                                coursedetails?.data
                                                  ?.course_overview,
                                            }}
                                          />
                                        ) : (
                                          <div
                                            className="course-subtitle dark"
                                            style={{
                                              fontFamily: "Open Sans",
                                              color: "#000",
                                              fontSize: "14px",
                                            }}
                                          >
                                            {
                                              coursedetails?.data
                                                ?.course_overview
                                            }
                                          </div>
                                        )}
                                      </p>
                                    </div>
                                    <br />
                                    <div
                                      className="course-feature"
                                      style={{ marginTop: "-20px" }}
                                    >
                                      <h5
                                        className="shown"
                                        style={{
                                          fontWeight: "300px",
                                          color: "#333",
                                          fontSize: "25px",
                                          fontFamily: "Open Sans",
                                          lineHight: "34px",
                                          fontWeight: "normal",
                                        }}
                                      >
                                        What you will learn
                                      </h5>
                                      <h5
                                        className="hide"
                                        style={{
                                          fontWeight: "300px",
                                          color: "#333",
                                          fontSize: "25px",
                                          fontFamily: "Open Sans",
                                          lineHight: "24px",
                                          fontWeight: "normal",
                                        }}
                                      >
                                        What you will learn
                                      </h5>

                                      <div>
                                        {/^/.test(
                                          coursedetails?.data?.outcomes
                                        ) ? (
                                          <div
                                            className="course-subtitle dark"
                                            style={{
                                              fontFamily: "Open Sans",
                                              color: "#000",
                                              fontSize: "14px",
                                            }}
                                            dangerouslySetInnerHTML={{
                                              __html:
                                                coursedetails?.data?.outcomes,
                                            }}
                                          />
                                        ) : (
                                          <div
                                            className="course-subtitle dark"
                                            style={{
                                              fontFamily: "Open Sans",
                                              color: "#000",
                                              fontSize: "14px",
                                            }}
                                          >
                                            {coursedetails?.data?.outcomes}
                                          </div>
                                        )}
                                      </div>

                                      <div className="course-element dark">
                                        <h5
                                          className="shown"
                                          style={{
                                            fontWeight: "300px",
                                            color: "#000",
                                            fontSize: "25px",
                                            fontFamily: "Open Sans",
                                            lineHight: "34px",
                                            fontWeight: "normal",
                                          }}
                                        >
                                          Course Prerequisites
                                        </h5>
                                        <h5
                                          className="hide"
                                          style={{
                                            fontWeight: "300px",
                                            color: "#333",
                                            fontSize: "25px",
                                            fontFamily: "Open Sans",
                                            lineHight: "24px",
                                            fontWeight: "normal",
                                          }}
                                        >
                                          Course Prerequisites
                                        </h5>

                                        {/^/.test(
                                          coursedetails?.data
                                            ?.prerequisite_course
                                        ) ? (
                                          <div
                                            className="course-subtitle dark"
                                            style={{
                                              fontFamily: "Open Sans",
                                              color: "#000",
                                              fontSize: "14px",
                                            }}
                                            dangerouslySetInnerHTML={{
                                              __html:
                                                coursedetails?.data
                                                  ?.prerequisite_course,
                                            }}
                                          />
                                        ) : (
                                          <div
                                            className="course-subtitle dark"
                                            style={{
                                              fontFamily: "Open Sans",
                                              color: "#000",
                                              fontSize: "14px",
                                            }}
                                          >
                                            {
                                              coursedetails?.data
                                                ?.prerequisite_course
                                            }
                                          </div>
                                        )}
                                      </div>

                                      <div className="btn-actions">
                                        {isAuthenticated ? (
                                          checkCourseStatus(
                                            coursedetails.data.id
                                          ) ? (
                                            ""
                                          ) : (
                                            <Fragment>
                                              <button
                                                type="button"
                                                onClick={addToCart.bind(
                                                  this,
                                                  coursedetails?.data?.id
                                                )}
                                                className="enroll-btn btn btn-primary"
                                              >
                                                Enroll Course
                                              </button>
                                              <br />
                                              <br />
                                              <br />

                                              <button
                                                id="wishlister"
                                                style={{ background: "red" }}
                                                type="button"
                                                onClick={addToWishList.bind(
                                                  this,
                                                  coursedetails?.data?.id
                                                )}
                                                className=" enroll-btn btn btn-danger"
                                              >
                                                Add To Wish List
                                              </button>
                                            </Fragment>
                                          )
                                        ) : (
                                          <a
                                            style={{
                                              background: "rgba(8,23,200)",
                                              borderRadius: "43px",
                                              width: "200px",
                                            }}
                                            href="#modal"
                                            className="enroll-btn modal-link btn btn-primary btn-large"
                                          >
                                            Login To Enroll
                                          </a>
                                        )}
                                      </div>
                                    </div>
                                  </Tab.Pane>
                                  <Tab.Pane
                                    eventKey="curriculum"
                                    className="curriculum-tab"
                                  >
                                    <div className="course-element dark">
                                      <h5
                                        className="shown"
                                        style={{
                                          fontWeight: "300px",
                                          color: "#333",
                                          fontSize: "25px",
                                          fontFamily: "Open Sans",
                                          lineHight: "34px",
                                          fontWeight: "normal",
                                        }}
                                      >
                                        Course Curriculum
                                      </h5>
                                      <h5
                                        className="hide"
                                        style={{
                                          fontWeight: "300px",
                                          color: "#333",
                                          fontSize: "25px",
                                          fontFamily: "Open Sans",
                                          lineHight: "24px",
                                          fontWeight: "normal",
                                        }}
                                      >
                                        Course Curriculum
                                      </h5>

                                      {/^/.test(coursedetails?.data?.topics) ? (
                                        <div
                                          style={{
                                            fontFamily: "Open Sans",
                                            color: "#000",
                                            fontSize: "14px",
                                          }}
                                          className="course-subtitle dark spacing"
                                          dangerouslySetInnerHTML={{
                                            __html: coursedetails?.data?.topics,
                                          }}
                                        />
                                      ) : (
                                        <div
                                          className="course-subtitle dark spacing"
                                          style={{
                                            fontFamily: "Open Sans",
                                            color: "#000",
                                            fontSize: "14px",
                                          }}
                                        >
                                          {coursedetails?.data?.topics}
                                        </div>
                                      )}
                                    </div>
                                  </Tab.Pane>
                                  <Tab.Pane
                                    eventKey="instructor"
                                    className="instructor-tab"
                                  >
                                    <h5
                                      className="shown"
                                      style={{
                                        fontWeight: "300px",
                                        color: "#333",
                                        fontSize: "25px",
                                        fontFamily: "Open Sans",
                                        lineHight: "34px",
                                        fontWeight: "normal",
                                      }}
                                    >
                                      Course Instructors
                                    </h5>
                                    <h5
                                      className="hide"
                                      style={{
                                        fontWeight: "300px",
                                        color: "#333",
                                        fontSize: "25px",
                                        fontFamily: "Open Sans",
                                        lineHight: "24px",
                                        fontWeight: "normal",
                                      }}
                                    >
                                      Course Instructors
                                    </h5>

                                    <Link
                                      to={`/instructors/${coursedetails?.data?.instructor?.id}`}
                                    >
                                      <Col md="12">
                                        <header
                                          className="col-merge-s-3 col-merge-s-12"
                                          style={{
                                            boxShadow:
                                              "-12px 12px 12px 12px #fafafa",
                                          }}
                                        >
                                          <div class="container">
                                            <div class="profile-sect ">
                                              <div class="profile-image-sect shown">
                                                {coursedetails?.data?.instructor
                                                  ?.image_url ? (
                                                  <img
                                                    className="shown"
                                                    style={{
                                                      width: "100px",
                                                      height: "100px",
                                                    }}
                                                    src={`${coursedetails?.data?.instructor?.image_url}`}
                                                  />
                                                ) : (
                                                  <p></p>
                                                )}
                                              </div>

                                              <div class="profile-image-sect hide col-merge-s3">
                                                {coursedetails?.data?.instructor
                                                  ?.image_url ? (
                                                  <img
                                                    className="hide"
                                                    style={{
                                                      width: "150px",
                                                      height: "150px",
                                                    }}
                                                    src={`${coursedetails?.data?.instructor?.image_url}`}
                                                  />
                                                ) : (
                                                  <p></p>
                                                )}
                                              </div>
                                              <div
                                                style={{ clear: "both" }}
                                                className="card-box hide col-merge-s-3"
                                              >
                                                <h5
                                                  className="hide"
                                                  style={{
                                                    fontSize: "20px",
                                                    color: "#000",
                                                    width: "100%",
                                                    marginTop: "30px",
                                                  }}
                                                >
                                                  {
                                                    coursedetails?.data
                                                      ?.instructor?.first_name
                                                  }{" "}
                                                  {
                                                    coursedetails?.data
                                                      ?.instructor?.last_name
                                                  }
                                                </h5>

                                                {/^/.test(
                                                  coursedetails?.data
                                                    ?.instructor
                                                    ?.instructor_profile
                                                    ?.brief_introduction
                                                ) ? (
                                                  <div>
                                                    <p
                                                      className="dark hide"
                                                      style={{
                                                        color: "#000",
                                                        marginLeft: "-10px",
                                                        fontSize: "12px",
                                                        marginTop: "-30px",
                                                        width: "100%",
                                                      }}
                                                      dangerouslySetInnerHTML={{
                                                        __html:
                                                          coursedetails?.data
                                                            ?.instructor
                                                            ?.instructor_profile
                                                            ?.brief_introduction,
                                                      }}
                                                    />
                                                  </div>
                                                ) : (
                                                  <div>
                                                    <p
                                                      style={{
                                                        color: "#000",
                                                        marginLeft: "-10px",
                                                        fontSize: "12px",
                                                        marginTop: "-30px",
                                                      }}
                                                      className="height"
                                                    >
                                                      {
                                                        coursedetails?.data
                                                          ?.instructor
                                                          ?.instructor_profile
                                                          ?.brief_introduction
                                                      }
                                                    </p>
                                                  </div>
                                                )}
                                              </div>

                                              <div
                                                class="profile-user-settings  shown"
                                                style={{
                                                  marginTop: "30px",
                                                  width: "100%",
                                                }}
                                              >
                                                <h5 className="shown">
                                                  {
                                                    coursedetails?.data
                                                      ?.instructor?.first_name
                                                  }{" "}
                                                  {
                                                    coursedetails?.data
                                                      ?.instructor?.last_name
                                                  }
                                                </h5>

                                                <div
                                                  class="profile-bio-sect col-merge-s-3"
                                                  style={{
                                                    color: "#000",
                                                    padding: "5px",
                                                  }}
                                                >
                                                  {/^/.test(
                                                    coursedetails?.data
                                                      ?.instructor
                                                      ?.instructor_profile
                                                      ?.brief_introduction
                                                  ) ? (
                                                    <div>
                                                      <p
                                                        className="dark shown"
                                                        style={{
                                                          color: "#000",
                                                          marginLeft: "-10px",
                                                          lineHeight: "25px",
                                                          marginTop: "-30px",
                                                          width: "100%",
                                                        }}
                                                        dangerouslySetInnerHTML={{
                                                          __html:
                                                            coursedetails?.data
                                                              ?.instructor
                                                              ?.instructor_profile
                                                              ?.brief_introduction,
                                                        }}
                                                      />
                                                    </div>
                                                  ) : (
                                                    <div>
                                                      <p
                                                        style={{
                                                          color: "#000",
                                                          marginLeft: "-10px",
                                                          lineHeight: "25px",
                                                          marginTop: "-30px",
                                                          width: "100%",
                                                        }}
                                                        className="shown"
                                                      >
                                                        {
                                                          coursedetails?.data
                                                            ?.instructor
                                                            ?.instructor_profile
                                                            ?.brief_introduction
                                                        }
                                                      </p>
                                                    </div>
                                                  )}
                                                </div>
                                              </div>
                                            </div>

                                            {/*<div className="instructor-social shown" style={{float:"right", position:"absolute",top:"10px",right:"10px"}} >
                                            <ul className="social list-unstyled list-inline" style={{marginBottom:"10px",marginLeft:"10px"}}>
                                              <li className="list-inline-item">
                                                <Link
                                                  to={{
                                                    pathname:
                                                      coursedetails?.data?.instructor
                                                        ?.instructor_profile
                                                        ?.facebook_url,
                                                  }}
                                                  target="_blank"
                                                >
                                                  <i className="fa fa-facebook-f fa-2x"></i>
                                                </Link>
                                              </li>
                                              <li className="list-inline-item">
                                                <Link
                                                  to={{
                                                    pathname:
                                                      coursedetails?.data?.instructor
                                                        ?.instructor_profile
                                                        ?.twitter_url,
                                                  }}
                                                  target="_blank"
                                                >
                                                  <i className="fa fa-twitter fa-2x"></i>
                                                </Link>
                                              </li>
                                              <li className="list-inline-item">
                                                <Link
                                                  to={{
                                                    pathname:
                                                      coursedetails?.data?.instructor
                                                        ?.instructor_profile
                                                        ?.linkedin_url,
                                                  }}
                                                  target="_blank"
                                                >
                                                  <i className="fa  fa-linkedin fa-2x"></i>
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>*/}
                                          </div>
                                        </header>
                                      </Col>
                                    </Link>

                                    <br />
                                    <br />

                                    <div className="instructor-item">
                                      {coursedetails?.data?.instructors
                                        ?.length > 0 &&
                                        coursedetails?.data?.instructors.map(
                                          (collaborators) => {
                                            if (
                                              collaborators?.id !==
                                              coursedetails?.data?.instructor
                                                ?.id
                                            ) {
                                              return (
                                                <Link
                                                  to={`/instructors/${collaborators?.id}`}
                                                >
                                                  <Col md="12">
                                                    <header
                                                      className="col-merge-s-3 col-merge-s-12"
                                                      style={{
                                                        boxShadow:
                                                          "-12px 12px 12px 12px #fafafa",
                                                      }}
                                                    >
                                                      <div class="container">
                                                        <div class="profile-sect ">
                                                          <div class="profile-image-sect shown">
                                                            {collaborators?.image_url ? (
                                                              <img
                                                                className="shown"
                                                                style={{
                                                                  width:
                                                                    "100px",
                                                                  height:
                                                                    "100px",
                                                                }}
                                                                src={`${collaborators?.image_url}`}
                                                              />
                                                            ) : (
                                                              <p></p>
                                                            )}
                                                          </div>

                                                          <div class="profile-image-sect hide col-merge-s3">
                                                            {collaborators?.image_url ? (
                                                              <img
                                                                className="hide"
                                                                style={{
                                                                  width:
                                                                    "150px",
                                                                  height:
                                                                    "150px",
                                                                }}
                                                                src={`${collaborators?.image_url}`}
                                                              />
                                                            ) : (
                                                              <p></p>
                                                            )}
                                                          </div>
                                                          <div
                                                            style={{
                                                              clear: "both",
                                                            }}
                                                            className="card-box hide col-merge-s-3"
                                                          >
                                                            <h5
                                                              className="hide"
                                                              style={{
                                                                fontSize:
                                                                  "20px",
                                                                color: "#000",
                                                                width: "100%",
                                                                marginTop:
                                                                  "30px",
                                                              }}
                                                            >
                                                              {
                                                                collaborators?.first_name
                                                              }{" "}
                                                              {
                                                                collaborators?.last_name
                                                              }
                                                            </h5>

                                                            {/^/.test(
                                                              collaborators
                                                                ?.instructor_profile
                                                                ?.brief_introduction
                                                            ) ? (
                                                              <div>
                                                                <p
                                                                  className="dark hide"
                                                                  style={{
                                                                    color:
                                                                      "#000",
                                                                    marginLeft:
                                                                      "-10px",
                                                                    fontSize:
                                                                      "12px",
                                                                    marginTop:
                                                                      "-30px",
                                                                    width:
                                                                      "100%",
                                                                  }}
                                                                  dangerouslySetInnerHTML={{
                                                                    __html:
                                                                      collaborators
                                                                        ?.instructor_profile
                                                                        ?.brief_introduction,
                                                                  }}
                                                                />
                                                              </div>
                                                            ) : (
                                                              <div>
                                                                <p
                                                                  style={{
                                                                    color:
                                                                      "#000",
                                                                    marginLeft:
                                                                      "-10px",
                                                                    fontSize:
                                                                      "12px",
                                                                    marginTop:
                                                                      "-30px",
                                                                  }}
                                                                  className="height"
                                                                >
                                                                  {
                                                                    collaborators
                                                                      ?.instructor_profile
                                                                      ?.brief_introduction
                                                                  }
                                                                </p>
                                                              </div>
                                                            )}
                                                          </div>

                                                          <div
                                                            class="profile-user-settings  shown"
                                                            style={{
                                                              marginTop: "30px",
                                                              width: "100%",
                                                            }}
                                                          >
                                                            <h5 className="shown">
                                                              {
                                                                collaborators?.first_name
                                                              }{" "}
                                                              {
                                                                collaborators?.last_name
                                                              }
                                                            </h5>

                                                            <div
                                                              class="profile-bio-sect col-merge-s-3"
                                                              style={{
                                                                color: "#000",
                                                                padding: "5px",
                                                              }}
                                                            >
                                                              {/^/.test(
                                                                collaborators
                                                                  ?.instructor_profile
                                                                  ?.brief_introduction
                                                              ) ? (
                                                                <div>
                                                                  <p
                                                                    className="dark shown"
                                                                    style={{
                                                                      color:
                                                                        "#000",
                                                                      marginLeft:
                                                                        "-10px",
                                                                      lineHeight:
                                                                        "25px",
                                                                      marginTop:
                                                                        "-30px",
                                                                      width:
                                                                        "100%",
                                                                    }}
                                                                    dangerouslySetInnerHTML={{
                                                                      __html:
                                                                        collaborators
                                                                          ?.instructor_profile
                                                                          ?.brief_introduction,
                                                                    }}
                                                                  />
                                                                </div>
                                                              ) : (
                                                                <div>
                                                                  <p
                                                                    style={{
                                                                      color:
                                                                        "#000",
                                                                      marginLeft:
                                                                        "-10px",
                                                                      lineHeight:
                                                                        "25px",
                                                                      marginTop:
                                                                        "-30px",
                                                                      width:
                                                                        "100%",
                                                                    }}
                                                                    className="shown"
                                                                  >
                                                                    {
                                                                      collaborators
                                                                        ?.instructor_profile
                                                                        ?.brief_introduction
                                                                    }
                                                                  </p>
                                                                </div>
                                                              )}
                                                            </div>
                                                          </div>
                                                        </div>

                                                        {/*<div className="instructor-social shown" style={{float:"right", position:"absolute",top:"10px",right:"10px"}} >
                                            <ul className="social list-unstyled list-inline" style={{marginBottom:"10px",marginLeft:"10px"}}>
                                              <li className="list-inline-item">
                                                <Link
                                                  to={{
                                                    pathname:
                                                      collaborators
                                                        ?.instructor_profile
                                                        ?.facebook_url,
                                                  }}
                                                  target="_blank"
                                                >
                                                  <i className="fa fa-facebook-f fa-2x"></i>
                                                </Link>
                                              </li>
                                              <li className="list-inline-item">
                                                <Link
                                                  to={{
                                                    pathname:
                                                      collaborators
                                                        ?.instructor_profile
                                                        ?.twitter_url,
                                                  }}
                                                  target="_blank"
                                                >
                                                  <i className="fa fa-twitter fa-2x"></i>
                                                </Link>
                                              </li>
                                              <li className="list-inline-item">
                                                <Link
                                                  to={{
                                                    pathname:
                                                      collaborators
                                                        ?.instructor_profile
                                                        ?.linkedin_url,
                                                  }}
                                                  target="_blank"
                                                >
                                                  <i className="fa  fa-linkedin fa-2x"></i>
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>*/}
                                                      </div>
                                                    </header>
                                                  </Col>
                                                </Link>
                                              );
                                            }
                                          }
                                        )}
                                    </div>
                                  </Tab.Pane>
                                  {/* <Tab.Pane eventKey="review" className="review-tab">
                          <Row>
                            <Col md="12">
                              <div className="review-comments">
                                <h5>Course Reviews</h5>
                                <div className="comment-box d-flex">
                                  <div className="comment-image">
                                    <img
                                      src={
                                        process.env.PUBLIC_URL +
                                        `/assets/images/testimonial-2.jpg`
                                      }
                                      alt=""
                                    />
                                  </div>
                                  <div className="comment-content">
                                    <div className="content-title d-flex justify-content-between">
                                      <div className="comment-writer">
                                        <h6>Mark Shadow</h6>
                                        <p>Mar 26, 2020 | 06:30pm</p>
                                        <ul className="list-unstyled list-inline">
                                          <li className="list-inline-item">
                                            <i className="las la-star"></i>
                                          </li>
                                          <li className="list-inline-item">
                                            <i className="las la-star"></i>
                                          </li>
                                          <li className="list-inline-item">
                                            <i className="las la-star"></i>
                                          </li>
                                          <li className="list-inline-item">
                                            <i className="las la-star"></i>
                                          </li>
                                          <li className="list-inline-item">
                                            <i className="las la-star-half-alt"></i>
                                          </li>
                                          <li className="list-inline-item">
                                            (4.5)
                                          </li>
                                        </ul>
                                      </div>
                                      <div className="reply-btn">
                                        <button type="button">
                                          <i className="las la-reply-all"></i>
                                          Reply
                                        </button>
                                      </div>
                                    </div>
                                    <div className="comment-desc">
                                      <p>
                                        Lorem ipsum dolor sit amet consectetur
                                        adipisicing elit. Architecto laborum
                                        quas placeat perspiciatis est, nisi
                                        expedita consectetur sit minus illum
                                        laudantium nostrum dolore odit
                                        asperiores quisquam ad enim iusto
                                        laborum quas placeat perspiciatis saepe.
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              
                              </div>
                              <div className="review-form">
                                <h5>Submit Review</h5>
                                <ReviewForm />
                              </div>
                            </Col>
                          </Row>
                        </Tab.Pane> 
                            <Tab.Pane
                              eventKey="announcements"
                              className="annoncements-tab"
                            >
                              <Row>
                                <Col md="12">
                                  <div className="review-comments">
                                    <h4>No new announcements</h4>
                                  </div>
                                </Col>
                              </Row>
                            </Tab.Pane>*/}
                                </Tab.Content>
                              </Tab.Container>
                            </div>
                          </div>
                        </Col>

                        <Col lg="4" md="4" sm="12">
                          <div
                            className="single-details-sidbar shown "
                            style={{
                              marginTop: "-240px",
                              zIndex: "99",
                              opacity: "1",
                            }}
                          >
                            <Row>
                              <Col md="12">
                                <div
                                  className="course-details-feature "
                                  style={{ zIndex: "99", opacity: "1" }}
                                >
                                  <div
                                    className="video_poster"
                                    style={{
                                      height: "234px",
                                      width: "308px",
                                      border: "1px solid #fafafa",
                                    }}
                                  >
                                    <div className="overplay">
                                      <div className="">
                                        {coursedetails &&
                                        coursedetails?.data?.introduction_video
                                          ?.length > 0 ? (
                                          <div
                                            style={{
                                              display: "flex",
                                              justifyContent: "center",
                                            }}
                                          >
                                            <a
                                              href={
                                                "https://www.youtube.com/embed/" +
                                                formaturl(
                                                  coursedetails?.data
                                                    ?.introduction_video
                                                ).idVideo
                                              }
                                              data-youtube-id={YouTubeGetID(
                                                coursedetails?.data
                                                  ?.introduction_video
                                              )}
                                              className="video-banner js-trigger-video-modal"
                                            >
                                              <img
                                                className=""
                                                src={
                                                  "http://img.youtube.com/vi/" +
                                                  YouTubeGetID(
                                                    coursedetails?.data
                                                      ?.introduction_video
                                                  ) +
                                                  "/0.jpg"
                                                }
                                                alt=""
                                              />
                                              <div class="triangle"></div>
                                            </a>
                                          </div>
                                        ) : (
                                          <Fragment />
                                        )}
                                      </div>
                                    </div>
                                  </div>
                                  <br />
                                  <br />

                                  <h5
                                    className="title"
                                    style={{
                                      textAlign: "left",
                                      fontWeight: "300px",
                                      color: "#000",
                                      margin: "20px",
                                      fontSize: "24px",
                                      fontFamily: "Open Sans",
                                      lineHight: "34px",
                                      fontWeight: "normal",
                                    }}
                                  >
                                    Course Details
                                  </h5>
                                  <br />
                                  <br />
                                  <br />
                                  <br />

                                  <div style={{ marginTop: "-70px" }}>
                                    <ul className="list-unstyled feature-list-maker">
                                      <li
                                        style={{
                                          fontFamily: "Open Sans",
                                          color: "#000",
                                        }}
                                      >
                                        <i className="fa fa-shopping-cart"></i>{" "}
                                        Price Date:
                                        <span
                                          style={{
                                            fontFamily: "Open Sans",
                                            color: "#000",
                                          }}
                                        >
                                          NGN{coursedetails?.data?.price}
                                        </span>
                                      </li>

                                      <li
                                        style={{
                                          fontFamily: "Open Sans",
                                          color: "#000",
                                        }}
                                      >
                                        <i className="fa fa-calendar dark"></i>{" "}
                                        Start Date:
                                        <span
                                          style={{
                                            fontFamily: "Open Sans",
                                            color: "#000",
                                          }}
                                        >
                                          {moment(
                                            `${
                                              coursedetails &&
                                              coursedetails.data
                                                ? coursedetails.data.start_date
                                                : ""
                                            }`
                                          ).format("ll")}
                                        </span>
                                      </li>

                                      <li
                                        style={{
                                          fontFamily: "Open Sans",
                                          color: "#000",
                                        }}
                                      >
                                        <i className="fa fa-calendar "></i>End
                                        Date:
                                        <span
                                          style={{
                                            fontFamily: "Open Sans",
                                            color: "#000",
                                          }}
                                        >
                                          {moment(
                                            `${
                                              coursedetails &&
                                              coursedetails.data
                                                ? coursedetails.data.end_date
                                                : ""
                                            }`
                                          ).format("ll")}
                                        </span>
                                      </li>

                                      <li
                                        style={{
                                          fontFamily: "Open Sans",
                                          color: "#000",
                                        }}
                                      >
                                        <i className="fa fa-clock"></i>{" "}
                                        Duration:
                                        <span
                                          style={{
                                            fontFamily: "Open Sans",
                                            color: "#000",
                                          }}
                                        >
                                          {coursedetails && coursedetails.data
                                            ? coursedetails.data.duration
                                            : ""}
                                        </span>
                                      </li>
                                      <li
                                        style={{
                                          fontFamily: "Open Sans",
                                          color: "#000",
                                        }}
                                      >
                                        <i className="fa fa-globe"></i>{" "}
                                        Language:
                                        <span
                                          style={{
                                            fontFamily: "Open Sans",
                                            color: "#000",
                                          }}
                                        >
                                          {coursedetails && coursedetails.data
                                            ? coursedetails?.data?.language
                                                ?.english
                                            : ""}
                                        </span>
                                      </li>
                                      <li
                                        style={{
                                          fontFamily: "Open Sans",
                                          color: "#000",
                                        }}
                                      >
                                        <i className="fa fa-user"></i> Skill
                                        Level:{" "}
                                        <span
                                          style={{
                                            fontFamily: "Open Sans",
                                            color: "#000",
                                          }}
                                        >
                                          Beginner
                                        </span>
                                      </li>
                                      <li
                                        style={{
                                          fontFamily: "Open Sans",
                                          color: "#000",
                                        }}
                                      >
                                        <i className="fa fa-graduation-cap"></i>{" "}
                                        Learning Partner:
                                        <span>Questence</span>
                                      </li>
                                      <li
                                        style={{
                                          fontFamily: "Open Sans",
                                          color: "#000",
                                        }}
                                      >
                                        <i className="fa fa-user"></i>
                                        Learning Style:{" "}
                                        <span
                                          style={{
                                            fontFamily: "Open Sans",
                                            color: "#000",
                                          }}
                                        >
                                          {coursedetails && coursedetails.data
                                            ? coursedetails.data.learning_style
                                            : ""}
                                        </span>
                                      </li>
                                      <li
                                        style={{
                                          fontFamily: "Open Sans",
                                          color: "#000",
                                        }}
                                      >
                                        <i className="fa fa-certificate"></i>
                                        Certification:{" "}
                                        <span
                                          style={{
                                            fontFamily: "Open Sans",
                                            color: "#000",
                                          }}
                                        >
                                          Yes
                                        </span>
                                      </li>
                                    </ul>
                                  </div>

                                  {isAuthenticated ? (
                                    checkCourseStatus(coursedetails.data.id) ? (
                                      ""
                                    ) : (
                                      <Fragment>
                                        <button
                                          type="button"
                                          // onClick={addToCart.bind(
                                          //   this,
                                          //   coursedetails?.data?.id
                                          // )}

                                          onClick={(e) => {
                                            handleAddToCart(
                                              e,
                                              coursedetails?.data
                                            );
                                          }}
                                          className="enroll-btn"
                                        >
                                          Enroll Course
                                        </button>
                                        <br />
                                        <br />
                                        <br />

                                        <button
                                          id="wishlister"
                                          style={{ background: "red" }}
                                          type="button"
                                          onClick={addToWishList.bind(
                                            this,
                                            coursedetails?.data?.id
                                          )}
                                          className=" enroll-btn btn btn-danger wishlister"
                                        >
                                          Add To Wish List
                                        </button>
                                      </Fragment>
                                    )
                                  ) : (
                                    <a
                                      style={{
                                        borderRadius: "43px",

                                        height: "40px",
                                        padding: "7px",
                                        color: "#fff",
                                        background: "rgb(2, 83, 200)",
                                      }}
                                      className="btn btn-large modal-link"
                                      href="#"
                                      id="register_form"
                                    >
                                      <b
                                        style={{
                                          textTransform: "capitalize",
                                          fontFamily: "Open Sans",
                                          fontSize: "12px",
                                          fontWeight: "bold",
                                        }}
                                      >
                                        Log in to enroll
                                      </b>
                                    </a>
                                  )}
                                </div>
                              </Col>
                            </Row>
                          </div>
                        </Col>
                      </Row>
                    </Container>
                  </section>

                  <section>
                    {/*cart.length > 0 &&
              cart.map((item) => {
                return (
                  <div
                    style={{ padding:"10px"}}
                  >
                    <img
                      src={`${
                        item.course_cover_image && item.course_cover_image
                          ? item.course_cover_image
                          : ""
                      }`}
                      alt="No Wrapper"
                      className="img-fluid"
                    />
                    <p className="text-muted" style={{ marginTop: "20px" }}>
                      {item.course_name}
                    </p>
                    <p className="text-muted">{item.course_code}</p>
                  </div>
                );
              })*/}

                    <div style={{ display: "table", clear: "both" }}>
                      {/*<button
                onClick={() => {
                  closeModal();
                  window.location.href = process.env.PUBLIC_URL + "/courses";
                }}
                className="btn btn-primary pull-left"
              >
                Continue Shopping
              </button>
              <button
                style={{
                  marginLeft: "180px",
                  float: "right",
                  marginRight: "20px",
                }}
                onClick={() => {
                  window.location.href = process.env.PUBLIC_URL + "/cart";
                }}
                className="btn btn-danger pull-right"
              >
                Go to cart
              </button>*/}
                    </div>
                  </section>
                  <footer></footer>

                  <div class="slideout">
                    <button type="button" class="hide">
                      Close
                    </button>
                    <p>
                      Clever girl. That is one big pile of shit. I thought you
                      were one of your big brothers. Don't you see the danger,
                      John, inherent in what you're doing here? They show
                      extreme intelligence, even problem-solving intelligence.
                    </p>
                    <p>
                      Dinosaurs eat man; woman inherits the earth. T-Rex doesn't
                      want to be fed. Boy, do I hate being right all the time.
                      White rabbit object: whatever it did, it did it all.
                    </p>
                  </div>
                </Fragment>
              ) : (
                <p>No Details for this course yet</p>
              )}
            </Styles>
            <br />
            <br />
            <br />
            <section
              className="video-modal col-merge-12 "
              style={{ zIndex: "999999999999999999" }}
            >
              <div
                id="video-modal-content"
                style={{
                  margin: "0px auto",
                  width: "500px",
                  zIndex: "999999999999999999",
                }}
              >
                <a
                  href="#"
                  className="close-video-modal btn btn-primary"
                  style={{
                    position: "absolute",
                    top: "35px",
                    right: "20px",
                    fontSize: "30px",
                  }}
                  style={{ background: "#fafafa" }}
                >
                  close window
                </a>

                <div
                  className="closeBtn"
                  data-target="#video-modal-content"
                  style={{ position: "absolute", right: "300px" }}
                >
                  <img
                    src="https://d1nhio0ox7pgb.cloudfront.net/_img/g_collection_png/standard/512x512/close.png"
                    width="30"
                    height="30"
                  />
                </div>

                <iframe
                  className="iframe-magnet col-merge-10 video-reset-size"
                  style={{}}
                  id="youtube"
                  width="50%"
                  frameborder="0"
                  allow="autoplay"
                  allowfullscreen="true"
                  src=""
                ></iframe>
              </div>

              <div id="slideout">
                <button
                  style={{ display: "none" }}
                  type="button"
                  className="closebtn"
                >
                  Close Video
                </button>
              </div>

              <div className="overlay-video" style={{}}></div>
            </section>
            <br />
            <br />
            <br /> <br />
            <br />
            <br /> <br />
            <br />
            <br />
          </Fragment>
        )}

        <Footer />
      </div>
    </Fragment>
  );
};

const closeModal = () => {
  // document.getElementById('md-close').on('click', function() {
  document.getElementById("md-modal").classList.remove("md-show");
  // });
};

// const showModalEffect = () => {
//   // document.getElementById('md-trigger').addEventListener('click', function() {
//     document.getElementById('md-modal').classList.add('md-show');
//   // });

// }

CourseDetails.propTypes = {
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
  fetchCourses,
  addToWishList,
})(CourseDetails);
