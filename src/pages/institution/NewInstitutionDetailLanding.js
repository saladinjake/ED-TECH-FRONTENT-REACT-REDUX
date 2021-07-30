import React, { useEffect, useState, Fragment } from "react";
import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
import NavBar from "components/Navbar";
import Footer from "../../components/Footer";
import { BreadcrumbBox } from "../../components/common/Breadcrumb";
import { Styles } from "./styles/detail.js";
import moment from "moment";
import { Link } from "react-router-dom";

import Loader from "components/Loader/Loader";
import Datas from "../../data/institutions/info_data";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchCourses, addToCart } from "actions/cartActions";
import { getAuthProfile } from "services/learner.js";
import toast from "react-hot-toast";
// import { useHistory, useLocation } from "react-router-dom";
// import "./relatedcoursesmodal.css";
import $ from "jquery";
import "./more.css";

const CourseDetails = ({
  history,
  match,
  auth: { isAuthenticated, user },
  cart: { cart },
  wishList: { wishList },
  addToCart,
  addToWishList,
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

  const handleToggleAccordion = (event) => {
    //Bail if our clicked element doesn't have the class
    if (!event.target.classList.contains("accordion-toggle")) return;

    // Get the target content
    var content = document.querySelector(event.target.hash);
    if (!content) return;

    // Prevent default link behavior
    event.preventDefault();

    // If the content is already expanded, collapse it and quit
    if (content.classList.contains("active")) {
      content.classList.remove("active");
      return;
    }

    // Get all open accordion content, loop through it, and close it
    var accordions = document.querySelectorAll(".accordion-content.active");
    for (var i = 0; i < accordions.length; i++) {
      accordions[i].classList.remove("active");
    }

    // Toggle our content
    content.classList.toggle("active");
  };

  useEffect(() => {
    $("body").css({ backgroundColor: "#fff", "overflow-x": "hidden" });
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

      $(".dark")
        .find("p, strong, span,ul,li,div")
        .each(function () {
          $(this).css({ color: "#000", fontFamily: "Open Sans" });
        });

      // var h = $(".a-little-more-text")[0].scrollHeight;

      // $('.more').click(function(e) {
      //     e.stopPropagation();
      //     e.preventDefault();
      //     $('.a-little-more-text-'+ $(this).attr("id")).animate({
      //         'height': h+ 500
      //     })
      // });

      $(document).click(function () {
        $(".a-little-more-text").animate({
          height: "90px",
        });
      });
    });
  });

  const redressFooter = () => {
    $("#resetFooter").css({ height: "8000px" });
  };

  const getInstitution = async (id) => {
    const result = await Datas.institutions.find(
      (institution) => parseInt(institution.id) === id
    );
    return result;
  };

  const init = async () => {
    setStatus("loading");
    let courseId = parseInt(match.params.id);
    try {
      let response = await getInstitution(courseId);
      setCourseDetails({ ...response });

      setStatus("success");
    } catch (err) {
      setStatus("error");
    }
    setLoading(false);
  };

  useEffect(() => {
    init();
    redressFooter();

    // eslint-disable-next-line
  }, []);

  function YouTubeGetID(url) {
    url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    return url[2] !== undefined ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
  }

  useEffect(() => {});

  const checkCourseStatus = (courseId) => {
    var check = false;
    if (enrolledCourses.length > 0) {
      check = enrolledCourses.includes(courseId);
    }
    console.log(`cehck for ${courseId} is ${check}`);
    return check;
  };

  console.log(coursedetails);

  return (
    <Fragment>
      <div className="main-wrapper course-details-page">
        {/* Header 2 */}
        <NavBar />

        {editClicked == true ? (
          <Fragment />
        ) : (
          <Fragment>
            <br />
            <br />
            <br />
            {loading ? (
              <Fragment />
            ) : (
              <section
                className="course-header-area"
                style={{ marginTop: "-70px", height: "370px" }}
              >
                <div className="container">
                  <div className="row align-items-end">
                    <div className="col-md-8">
                      <br />
                      <div className="course-header-wrap">
                        <h1 className="t shown" style={{ color: "#fff" }}>
                          {coursedetails?.institution}
                        </h1>

                        <h2 style={{ color: "#fff", marginTop: "10px" }}>
                          {coursedetails?.fullname}
                        </h2>

                        <p
                          className="subtitle"
                          style={{
                            color: "#fff",
                            fontSize: "20px",
                            marginTop: "10px",
                            width: "500px",
                          }}
                        >
                          {coursedetails?.intro}
                        </p>

                        <div className="rating-row">
                          <span className="course-badge best-seller">
                            Level
                          </span>
                          <i className="fas fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <i className="fa fa-star"></i>
                          <span className="d-inline-block average-rating">
                            0
                          </span>
                          <span>(0 Ratings)</span>
                        </div>
                        {/*<div className="created-row">
                    <span className="created-by">
                      A course by 
                    </span>
                    <span className="last-updated-date">Last updated {}</span>
                    <span className="comment">
                      <i className="fa fa-comment"></i>
                      
                    </span>
                  </div>*/}
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
                            className="course-details-top nav nav-pills"
                            style={{ marginTop: "-10px" }}
                          >
                            <div className="course-tab-list ">
                              <Tab.Container defaultActiveKey="overview">
                                <Nav className="flex-column">
                                  <Nav.Item>
                                    <Nav.Link eventKey="overview">
                                      About
                                    </Nav.Link>
                                  </Nav.Item>
                                  <Nav.Item>
                                    <Nav.Link
                                      eventKey="curriculum"
                                      onClick={() => {
                                        redressFooter();
                                      }}
                                    >
                                      Courses
                                    </Nav.Link>
                                  </Nav.Item>
                                  <Nav.Item>
                                    <Nav.Link eventKey="instructor">
                                      Instructors
                                    </Nav.Link>
                                  </Nav.Item>
                                  <Nav.Item>
                                    <Nav.Link eventKey="review">
                                      Enrollment Options
                                    </Nav.Link>
                                  </Nav.Item>
                                  <Nav.Item>
                                    <Nav.Link eventKey="announcements">
                                      FAQs
                                    </Nav.Link>
                                  </Nav.Item>
                                </Nav>
                                <Tab.Content>
                                  <Tab.Pane
                                    eventKey="overview"
                                    className="overview-tab"
                                  >
                                    <div className="course-desc">
                                      <h3
                                        style={{
                                          fontWeight: "300px",
                                          color: "#333",
                                          fontSize: "24px",
                                          fontFamily: "Open Sans",
                                          lineHight: "34px",
                                          letterSpacing: "-1px",
                                          fontWeight: "normal",
                                        }}
                                      >
                                        About This Certification
                                      </h3>

                                      <Container lg="12">
                                        <Row>
                                          <Col
                                            lg="12"
                                            style={{
                                              padding: "20px",
                                              color: "#000",
                                              fontSize: "14px",
                                            }}
                                          >
                                            {coursedetails?.about_program?.map(
                                              (paragraph) => {
                                                return (
                                                  <p
                                                    style={{
                                                      color: "#000",
                                                      fontSize: "14px",
                                                    }}
                                                  >
                                                    {paragraph}
                                                  </p>
                                                );
                                              }
                                            )}
                                          </Col>
                                        </Row>
                                      </Container>
                                    </div>
                                    <div
                                      className="course-feature"
                                      style={{ marginTop: "-20px" }}
                                    ></div>
                                  </Tab.Pane>
                                  <Tab.Pane
                                    eventKey="curriculum"
                                    className="curriculum-tab"
                                  >
                                    <div className="course-element dark">
                                      <h5
                                        style={{
                                          fontWeight: "300px",
                                          color: "#333",
                                          fontSize: "24px",
                                          fontFamily: "Open Sans",
                                          lineHight: "34px",
                                          letterSpacing: "-1px",
                                          fontWeight: "normal",
                                        }}
                                      >
                                        Course Curriculum
                                      </h5>

                                      {coursedetails?.courses?.length > 0 &&
                                        coursedetails?.courses?.map(
                                          (data, i) => {
                                            return (
                                              <Fragment>
                                                {/*<Col md="12">
                                           <a style={{width:"100%",background:"rgba(8,20,200)", color:"#fff"}}  onClick={handleToggleAccordion} href={"#content-"+ (i+1)} className="accordion-toggle card-box">{data?.title}</a>
                                            </Col> 

                                               <div className="accordion-content" id={"content-"+ (i+1)}  style={{ width:"100%",minWidth:"100%"}}>
                                            */}

                                                <Col md="12">
                                                  {/* <h1 style={{fontSize:"16px", color:""}}>{data?.title}</h1>*/}
                                                  <hr />
                                                </Col>

                                                <Col md="12" key={i} style={{}}>
                                                  {data?.body.map(
                                                    (data, index) => {
                                                      return (
                                                        <Fragment>
                                                          <Link to={"#"}>
                                                            <div className="">
                                                              <div
                                                                style={{
                                                                  height:
                                                                    "80px",
                                                                }}
                                                                className="box-title profile-description"
                                                                id="profile-description"
                                                              >
                                                                <h6
                                                                  style={{
                                                                    color:
                                                                      "#000",
                                                                    fontSize:
                                                                      "20px",
                                                                    lineHeight:
                                                                      "30px",
                                                                  }}
                                                                >
                                                                  {data?.title}
                                                                </h6>

                                                                <div
                                                                  className={
                                                                    "text show-more-height a-little-more-text " +
                                                                    " a-little-more-text-" +
                                                                    index
                                                                  }
                                                                >
                                                                  {/*<p style={{fontSize:"12px", color:"#000",margin:"10px"}}>{data?.info}</p>*/}

                                                                  {/*data?.outcomes?.length && (<p style={{color:"#000", fontSize:"14px"}}>What you will learn
                                                     </p>) */}

                                                                  {/*data?.outcomes?.map((outcome)=>{
                                              return (
                                                    <p style={{fontSize:"12px", color:"#000",margin:"10px"}}>{outcome}
                                                     </p>
                                                 

                                                )
                                          })*/}

                                                                  {/*data?.skills_acquired?.length && ( <p style={{color:"#000", fontSize:"14px"}}>Skills you would achieve
                                                     </p>)*/}


                                                                  {/*
                                            data?.skills_acquired?.map(skillPills =>{
                                                return (
                                                  <Col lg="3" style={{float:"left",padding:"5px",margin:"5px",color:"#fff", borderRadius:"20px", height:"40px", fontSize:"10px", margin:"15px",background:"#f4f4f4", marginLeft:"30px"}}>
                                                     <p style={{color:"#000", fontSize:"12px", textAlign:"center"}}>{skillPills}
                                                     </p>
                                                 </Col>
                                                )
                                            })
                                          */}
                                                                </div>
                                                              </div>
                                                            </div>

                                                            {/*<a id={index} className="more" href="#">Read more </a>*/}
                                                          </Link>

                                                          <hr
                                                            style={{
                                                              clear: "both",
                                                            }}
                                                          />
                                                        </Fragment>
                                                      );
                                                    }
                                                  )}

                                                  {/*</div>*/}
                                                </Col>
                                              </Fragment>
                                            );
                                          }
                                        )}

                                        

                                    </div>
                                  </Tab.Pane>
                                  <Tab.Pane
                                    eventKey="instructor"
                                    className="instructor-tab"
                                  >
                                    <h5
                                      style={{
                                        fontWeight: "300px",
                                        color: "#333",
                                        fontSize: "24px",
                                        fontFamily: "Open Sans",
                                        lineHight: "34px",
                                        letterSpacing: "-1px",
                                        fontWeight: "normal",
                                      }}
                                    >
                                      Course Instructors
                                    </h5>
                                  </Tab.Pane>
                                  <Tab.Pane
                                    eventKey="review"
                                    className="review-tab"
                                  >
                                    <Row>
                                      <Col md="12">
                                        <div className="review-comments">
                                          <h5>Enrollment Plan</h5>
                                          <div className="comment-box d-flex">
                                            {/*<div className="comment-image">
                                    <img
                                      src={
                                        process.env.PUBLIC_URL +
                                        `/assets/images/testimonial-2.jpg`
                                      }
                                      alt=""
                                    />
                                  </div>*/}
                                            <div className="comment-content">
                                              <div className="content-title d-flex justify-content-between">
                                                <div className="comment-writer">
                                                  {coursedetails?.enroll_plan}
                                                </div>
                                                <br />
                                                <div className="reply-btn">
                                                  <button type="button">
                                                    <i className="las la-reply-all"></i>
                                                    Enroll
                                                  </button>
                                                </div>
                                              </div>
                                              <div className="comment-desc">
                                                <p></p>
                                              </div>
                                            </div>
                                          </div>
                                        </div>
                                        <div className="review-form"></div>
                                      </Col>
                                    </Row>
                                  </Tab.Pane>
                                  <Tab.Pane
                                    eventKey="announcements"
                                    className="annoncements-tab"
                                  >
                                    <Row>
                                      <Col md="12">
                                        <div className="container">
                                          {coursedetails?.faqs?.map(
                                            (faq, index) => {
                                              return (
                                                <Fragment>
                                                  <a
                                                    onClick={
                                                      handleToggleAccordion
                                                    }
                                                    href={"#content-" + index}
                                                    className="accordion-toggle card-box col-sm-12 col-md-12 col-lg-12"
                                                    style={{
                                                      color: "#000",
                                                      fontSize: "14px",
                                                      fontWeight: "bold",
                                                      margin: "10px",
                                                    }}
                                                  >
                                                    {faq.question}
                                                  </a>
                                                  <div
                                                    className="accordion-content col-sm-12 col-md-8"
                                                    id={"content-" + index}
                                                  >
                                                    <ul
                                                      style={{
                                                        marginLeft: "20px",
                                                      }}
                                                    >
                                                      {faq?.answers?.map(
                                                        (answer) => {
                                                          return (
                                                            <li
                                                              style={{
                                                                color: "#000",
                                                                listStyleType:
                                                                  "number",
                                                                fontSize:
                                                                  "14px",
                                                                margin: "5px",
                                                                marginTop:
                                                                  "10px",
                                                              }}
                                                            >
                                                              {answer}
                                                            </li>
                                                          );
                                                        }
                                                      )}
                                                    </ul>
                                                  </div>
                                                </Fragment>
                                              );
                                            }
                                          )}
                                        </div>
                                      </Col>
                                    </Row>
                                  </Tab.Pane>
                                </Tab.Content>
                              </Tab.Container>
                            </div>
                          </div>
                        </Col>

                        <Col lg="4" md="4" sm="12">
                          <div
                            className="single-details-sidbar shown"
                            style={{
                              marginTop: "-240px",
                              zIndex: "99",
                              opacity: "1",
                            }}
                          >
                            <Row>
                              <Col md="12">
                                <div
                                  className="course-details-feature"
                                  style={{ zIndex: "99", opacity: "1" }}
                                >
                                  <div
                                    className="video_poster"
                                    style={{ height: "234px", width: "308px" }}
                                  >
                                    <div className="overplay">
                                      <div className="">
                                        {coursedetails &&
                                        coursedetails?.hero_image?.length >
                                          0 ? (
                                          <div
                                            style={{
                                              display: "flex",
                                              justifyContent: "center",
                                            }}
                                          >
                                            <a
                                              href="#no-hotlinks"
                                              className="video-banner js-trigger-video-modal"
                                            >
                                              <img
                                                className=""
                                                style={{ width: "100%" }}
                                                src={coursedetails?.hero_image}
                                                alt=""
                                              />
                                              {/*<div class="triangle"></div>*/}
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
                                      fontWeight: "300px",
                                      color: "#333",
                                      fontSize: "24px",
                                      fontFamily: "Open Sans",
                                      lineHight: "34px",
                                      letterSpacing: "-1px",
                                      fontWeight: "normal",
                                    }}
                                  ></h5>
                                  <br />
                                  <br />
                                  <br />
                                  <br />

                                  <div style={{ marginTop: "-70px" }}>
                                    <ul className="list-unstyled feature-list-maker"></ul>
                                  </div>

                                  {isAuthenticated ? (
                                    checkCourseStatus(
                                      coursedetails?.data?.id
                                    ) ? (
                                      ""
                                    ) : (
                                      <Fragment></Fragment>
                                    )
                                  ) : (
                                    <Fragment />
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
      </div>

      <div style={{ clear: "both" }} id="resetFooter"></div>
      <Footer />
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
  // addToCart: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.cart,
  auth: state.auth,
  wishList: state.wishList,
});

export default connect(mapStateToProps, {
  // addToCart,
  fetchCourses,
  // addToWishList,
})(CourseDetails);
