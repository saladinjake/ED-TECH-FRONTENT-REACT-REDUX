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


const CourseDetails = ({
  history,
  match,
  auth: { isAuthenticated },
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

  useEffect(() => {
    /* Get all elements with data-vidup */
    const vidupElements = document.querySelectorAll("[data-vidup]");

    const modal = document.getElementById("modalvid");
    const modalVideo = document.getElementById("modal-video");
    const mdc = document.getElementById("mdc");
    const close = document.getElementById("close");

    function closeModal() {
      // mdc.style.width = "0";
      mdc.style.transform = "scale(0)";

      setTimeout(() => {
        modal.style.visibility = "hidden";
        modal.style.opacity = "0";
        modalVideo.src = "";
      }, 500);
    }

    function showModal(element) {
      modal.style.visibility = "visible";
      modal.style.opacity = "1";
      modalVideo.src = element.href;
      mdc.style.width = "100%";

      setTimeout(() => {
        mdc.style.transform = "scale(1)";
      }, 300);
    }

    /* Foreach element add an eventlistener and show the popup when clicked and add the src in the link */
    vidupElements.forEach((element) => {
      element.addEventListener("click", (e) => {
        e.preventDefault();
        showModal(element);
      });
    });

    close.addEventListener("click", (e) => {
      closeModal();
    });

    mdc.addEventListener("click", () => {
      closeModal();
    });

    modal.addEventListener("click", () => {
      closeModal();
    });
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
      var path = "http://img.youtube.com/vi/" + id + "/0.jpg";
      // $(this).css('background-image', 'url(' + path + ')');
    }

    return { idVideo, path };
  }

  return (
    <div className="main-wrapper course-details-page">
      {/* Header 2 */}
      <NavBar />
      {/* Breadcroumb */}
      {/*Object.entries(coursedetails).length !== 0 && (
        <BreadcrumbBox title={coursedetails.data.category.name} />
      )*/}
      <br/><br/><br/>

      {loading ? (
          <Fragment />
        ): (

      <section className="course-header-area">
  <div className="container">
    <div className="row align-items-end">
      <div className="col-lg-8">
        <div className="course-header-wrap">
          <h1 className="t">{ coursedetails?.data?.course_name }</h1>
          <p className="subtitle">{ coursedetails?.data?.course_overview.length > 0 && coursedetails?.data?.course_description.substring(0,150)+ "..." }</p>
          <div className="rating-row">
            <span className="course-badge best-seller">Level</span>
                                      <i className="fas fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                                <i className="fa fa-star"></i>
                                <span className="d-inline-block average-rating">0</span><span>(0 Ratings)</span>
       
        </div>
        <div className="created-row">
          <span className="created-by">
          A course  by { coursedetails?.data?.instructor?.user?.first_name } {coursedetails?.data?.instructor?.user?.last_name}
          </span>
                      <span className="last-updated-date">Last updated {}</span>
                    <span className="comment"><i className="fa fa-comment"></i>{coursedetails?.data?.language?.english}</span>
        </div>
      </div>
    </div>
    <div className="col-lg-4  video-lever-view"  style={{}}>
    <div className="single-details-sidbar">
        <div className="course-details-feature">
                            { coursedetails &&  coursedetails?.data?.introduction_video?.length > 0 ? (
                            <div 
                             style={{display:"flex",justifyContent:"center"}}>
                        
                          <Col md="4" >


                              <a
                              
                                className=""
                                href={
                                  "https://www.youtube.com/embed/" +
                                  formaturl(
                                    coursedetails?.data?.introduction_video
                                  ).idVideo
                                }
                                data-vidup
                              >


                                <div id="all" >


                                 
                                  <a
                                    id="play-video"
                                    
                                    data-url={`${
                                    coursedetails && coursedetails?.data
                                      ? formaturl(
                                          coursedetails?.data?.introduction_video
                                        ).idVideo
                                      : ""
                                  }`  }
                                    data-toggle="modal"
                                    data-target="#myModal"
                                    title="XJj2PbenIsU"
                                  >

                                  <iframe
                                  className="iframe-magnet"
                                  style={{}}
                           src={
                                  "https://www.youtube.com/embed/" +
                                  formaturl(
                                    coursedetails?.data?.introduction_video
                                  ).idVideo
                                }
          
            frameborder="0"
            allow="autoplay; encrypted-media"
            allowfullscreen
            id="modal-videox"
          ></iframe>
                                  
                                  </a>
                                </div>



                                <video
                                  className=""
                                  src={`${
                                    coursedetails && coursedetails?.data
                                      ? formaturl(
                                          coursedetails?.data?.introduction_video
                                        ).idVideo
                                      : ""
                                  }`}
                                  autoplay
                                  muted
                                  replay
                                >
                                  {" "}
                                </video>
                              </a>
                            </Col>
                            </div>
                          ) : (
                            <Fragment />
                          )}






                            
                           
                          </div>

          </div>

    </div>
  </div>
</div>
</section>
)}
      <Styles>
        {/* Course Details */}
        {loading ? (
          <Loader width="70" />
        ) : Object.entries(coursedetails).length !== 0 ? (
          <Fragment>
            <section className="course-details-area" style={{height:"3000px"}}>
              <Container>
                <Row>
                  <Col lg="8" md="8" sm="12">
                    <div className="course-details-top" style={{marginTop:"-10px"}}>
                     
                      
                      <div className="course-tab-list">
                        <Tab.Container defaultActiveKey="overview">
                          <Nav className="flex-column">
                            <Nav.Item>
                              <Nav.Link eventKey="overview">Overview</Nav.Link>
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
                            <Nav.Item>
                              <Nav.Link eventKey="review">Reviews</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                              <Nav.Link eventKey="announcements">
                                Announcements
                              </Nav.Link>
                            </Nav.Item>
                          </Nav>
                          <Tab.Content>
                            <Tab.Pane
                              eventKey="overview"
                              className="overview-tab"
                            >
                              <div className="course-desc">
                                <h5>Course Overview</h5>
                                <p>
                                  
                                    {coursedetails?.data?.course_overview}
                                </p>
                              </div>
                              <div className="course-feature">
                                <h5>What you will learn</h5>
                                <ul>
                                {coursedetails?.data?.outcomes.length> 0 && coursedetails?.data?.outcomes.map((detail)=>{
                                    return( <p>{ detail } </p>)
                                })}
                                </ul>

                                <div className="btn-actions">
                                     {isAuthenticated ? (
                              checkCourseStatus(coursedetails.data.id) ? (
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
                                    onClick={
                                      addToWishList.bind(
                                      this,
                                      coursedetails?.data?.id
                                    )

                                   }
                                    className=" enroll-btn btn btn-danger"
                                  >
                                    Add To Wish List
                                  </button>
                                </Fragment>
                              )
                            ) : (
                              <button
                                type="button"
                                className=" enroll-btn"
                                onClick={(e) => {
                                  return (window.location.href =
                                    process.env.PUBLIC_URL +
                                    `/login?redirectTo=${lastLocation}`);
                                }}
                              >
                                Login To Enroll
                              </button>
                            )}

                                </div>
                                {/* <ul className="list-unstyled">
                              <li>
                                <i className="las la-arrow-right"></i> 
                                {coursedetails && coursedetails.data
                                    ? coursedetails.data.course_description
                                    : ""}
                              </li>
                            </ul> */}
                              </div>
                             
                             
                            </Tab.Pane>
                            <Tab.Pane
                              eventKey="curriculum"
                              className="curriculum-tab"
                            >
                              <div className="course-element">
                                <h5>Course Content</h5>

                                {coursedetails?.data?.curriculum.length > 0 && coursedetails?.data?.curriculum.map((detail, i)=>{
                                    return(<div className="course-item">
                                  <button className="course-button active">
                                    Topic {i+1}: {detail.topic}
                                  </button>
                                  <div className="course-content show">
                                    <ul className="list-unstyled">
                                      <li>
                                        <span className="play-icon">
                                          <i className="las la-play"></i>{" "}
                                          Lesson: {detail.topic}
                                        </span>
                                        <span className="lecture-title">
                                          Lesson 1 title
                                        </span>
                                      </li>
                                      
                                    </ul>
                                  </div>
                                </div>)
                                })}
                                
                                
                                
                              </div>
                            </Tab.Pane>
                            <Tab.Pane
                              eventKey="instructor"
                              className="instructor-tab"
                            >
                              <h5>Course Instructor</h5>
                              <div className="instructor-item">
                                <Row>
                                  <Col md="4">
                                    <div className="instructor-img">
                                      <img
                                        src={
                                          process.env.PUBLIC_URL +
                                          `/assets/images/instructor-1.jpg`
                                        }
                                        alt=""
                                        className="img-fluid"
                                      />
                                    </div>
                                  </Col>
                                  <Col md="8">
                                    <div className="instructor-content">
                                      <div className="instructor-box">
                                        <div className="top-content d-flex justify-content-between">
                                          <div className="instructor-name">
                                            <Link
                                              to={`/instructors/${coursedetails?.data?.instructor?.user?.id}`}
                                            >
                                              <h6>
                                                {
                                                  coursedetails?.data
                                                    ?.instructor?.user
                                                    ?.first_name
                                                }

                                                {
                                                  coursedetails?.data
                                                    ?.instructor?.user
                                                    ?.last_name
                                                }
                                              </h6>
                                            </Link>

                                            <Link
                                              to={`/instructors/${coursedetails?.data?.instructor?.user?.id}`}
                                            >
                                              {`${coursedetails?.data?.instructor?.current_employer_designation}`}
                                            </Link>
                                          </div>
                                          <div className="instructor-social">
                                            <ul className="social list-unstyled list-inline">
                                              <li className="list-inline-item">
                                                <Link
                                                  to={{
                                                    pathname:
                                                      coursedetails?.data
                                                        ?.instructor_profile
                                                        ?.facebook_url,
                                                  }}
                                                  target="_blank"
                                                >
                                                  <i className="fab fa-facebook-f"></i>
                                                </Link>
                                              </li>
                                              <li className="list-inline-item">
                                                <Link
                                                  to={{
                                                    pathname:
                                                      coursedetails?.data
                                                        ?.instructor_profile
                                                        ?.twitter_url,
                                                  }}
                                                  target="_blank"
                                                >
                                                  <i className="fab fa-twitter"></i>
                                                </Link>
                                              </li>
                                              <li className="list-inline-item">
                                                <Link
                                                  to={{
                                                    pathname:
                                                      coursedetails?.data
                                                        ?.instructor_profile
                                                        ?.linkedin_url,
                                                  }}
                                                  target="_blank"
                                                >
                                                  <i className="fab fa-linkedin-in"></i>
                                                </Link>
                                              </li>
                                            </ul>
                                          </div>
                                        </div>
                                        <div className="instructor-desk">
                                          <p>
                                            {
                                              coursedetails?.data?.instructor
                                                ?.biography
                                            }
                                          </p>
                                        </div>
                                      </div>
                                    </div>
                                  </Col>
                                </Row>
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
                        </Tab.Pane> */}
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
                            </Tab.Pane>
                          </Tab.Content>
                        </Tab.Container>
                      </div>
                    </div>
                  </Col>
                  <Col lg="4" md="4" sm="12">
                    <div className="single-details-sidbar" style={{}}>
                      <Row>
                        <Col md="12">
                          <div className="course-details-feature">
                            


                            <h5 className="title">Course Details</h5>

                            <div>

                           <br/><br/><br/>


                              <ul className="list-unstyled feature-list">

                              <li>
                                  <i className="las la-calendar"></i> Price
                                  Date:
                                  <span>
                                    NGN{coursedetails?.data?.price}
                                  </span>
                                </li>


                                <li>
                                  <i className="las la-calendar"></i> Start
                                  Date:
                                  <span>
                                    {moment(
                                      `${
                                        coursedetails && coursedetails.data
                                          ? coursedetails.data.start_date
                                          : ""
                                      }`
                                    ).format("ll")}
                                  </span>
                                </li>
                                <li>
                                  <i className="las la-clock"></i> Duration:
                                  <span>
                                    {coursedetails && coursedetails.data
                                      ? coursedetails.data.duration
                                      : ""}
                                  </span>
                                </li>
                                <li>
                                  <i className="las la-globe"></i> Language:
                                  <span>English</span>
                                </li>
                                <li>
                                  <i className="las la-sort-amount-up"></i>{" "}
                                  Skill Level: <span>Beginner</span>
                                </li>
                                <li>
                                  <i className="las la-graduation-cap"></i>{" "}
                                  Learning Partner:
                                  <span>Questence</span>
                                </li>
                                <li>
                                  <i className="las la-certificate"></i>
                                  Learning Style:{" "}
                                  <span>
                                    {coursedetails && coursedetails.data
                                      ? coursedetails.data.learning_style
                                      : ""}
                                  </span>
                                </li>
                                <li>
                                  <i className="las la-certificate"></i>
                                  Certification: <span>Yes</span>
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
                                    onClick={addToCart.bind(
                                      this,
                                      coursedetails?.data?.id
                                    )}
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
                                    onClick={
                                      addToWishList.bind(
                                      this,
                                      coursedetails?.data?.id
                                    )

                                   }
                                    className=" enroll-btn btn btn-danger"
                                  >
                                    Add To Wish List
                                  </button>
                                </Fragment>
                              )
                            ) : (
                              <button
                                type="button"
                                className=" enroll-btn"
                                onClick={(e) => {
                                  return (window.location.href =
                                    process.env.PUBLIC_URL +
                                    `/login?redirectTo=${lastLocation}`);
                                }}
                              >
                                Login To Enroll
                              </button>
                            )}
                          </div>
                        </Col>
                      </Row>
                    </div>
                  </Col>
                </Row>
              </Container>
            </section>
          </Fragment>
        ) : (
          <p>No Details for this course yet</p>
        )}
      </Styles>
      <br />
      <br />
      <br />
      <div className="md-modal md-effect-12" id="md-modal">
        <div className="md-modal md-header">
          <h4>Course Cart Preview</h4>
        </div>
        <div
          className="md-content"
          style={{
            marginLeft: "0px",
            width: "900px",
            height: "400px",
            overflowY: "scroll",
          }}
        >
          <br />
          <h3>Items in your cart</h3>
          <br />
          <br />

          <div>
            {cart.length > 0 &&
              cart.map((item) => {
                return (
                  <div
                    style={{ float: "left", margin: "10px", width: "200px" }}
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
              })}

            <div style={{ display: "table" }}>
              <button
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
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="md-overlay"></div>
      <div className="modalVid" id="modalvid">
        <div className="close">
          <span className="close" id="close">
            &times;
          </span>
        </div>
        <div className="modal-video-container" id="mdc">
          <iframe
            className="video-popup"
            frameborder="0"
            allow="autoplay; encrypted-media"
            allowfullscreen
            id="modal-video"
          ></iframe>
        </div>
      </div>
      <br />
      <br />
      <br /> <br />
      <br />
      <br /> <br />
      <br />
      <br />
      {/* Footer 2 */}
      <Footer />
    </div>
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
