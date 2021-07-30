import React, { useEffect, useState, Fragment } from "react";
import Datas from "../../data/instructor/details.json";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Swiper from "react-id-swiper";
import NavBar from "components/Navbar";
import { BreadcrumbBox } from "../../components/common/Breadcrumb";
import Footer from "components/Footer";
import { Styles } from "./styles/instructor.js";
import $ from "jquery";

import Loader from "components/Loader/Loader";
import { getInstructor, getActiveInstructors } from "services/instructor";

import MyCourses from "./mycourses";

const InstructorDetails = ({ match }) => {
  const settings = {
    slidesPerView: 3,
    loop: true,
    speed: 1000,
    autoplay: false,
    spaceBetween: 30,
    watchSlidesVisibility: true,
    pagination: {
      el: ".slider-dot.text-center",
      clickable: true,
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      576: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      992: {
        slidesPerView: 3,
      },
    },
  };

  const [details, setDetails] = useState({});
  // eslint-disable-next-line
  const [status, setStatus] = useState("init");
  const [loading, setLoading] = useState(true);

  const [currentInstructorViewed, setActiveInstructor] = useState({});
  const [allInst, setAllInst] = useState([]);

  const [co_authored_course, setCoAuthoredCourses] = useState([]);
  const [my_courses, setAuthoredCourses] = useState([]);

  const init = async () => {
    let instructorId = parseInt(match.params.id);
    try {
      let response = await getInstructor(instructorId);
      let resWithCourses = await getActiveInstructors();
      setDetails({ ...response.data.data.profile });
      setAuthoredCourses([...response.data.data?.profile?.courses]);
      setCoAuthoredCourses([...response.data.data?.co_authored_courses]);
      console.log([...response.data.data?.co_authored_courses]);

      setAllInst([...resWithCourses.data.data.data]);

      if (response.status_code === 200) {
        setStatus("success");
      } else {
        setStatus("error");
      }
    } catch (err) {
      setStatus("error");
    }
    setLoading(false);
  };

  useEffect(() => {
    init();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    $(".footer p,.footer span, footer p, footer span").each(function () {
      $(this).css({ color: "#fff", fontFamily: "Open Sans" });
    });
  });

  console.log(allInst);
  let targetProfile = allInst.find((instructor) => {
    console.log(instructor);

    return (
      details.email === instructor.email &&
      details.first_name === instructor.first_name &&
      details.last_name === instructor.last_name
    );
  });

  console.log(targetProfile);

  // if(targetProfile){
  // setActiveInstructor({...targetProfile})
  // }

  // console.log(details)
  return (
    <Styles>
      {/* Main Wrapper */}

      <div className="main-wrapper instructor-details-page">
        {/* Header 2 */}
        <NavBar />

        {/* Breadcroumb  <BreadcrumbBox title="Instructor Details" />*/}
        <br />

        {/* Instructor Details Area */}
        <section className="instructor-details-area">
          <Container>
            {loading ? (
              <Loader width="70" />
            ) : Object.entries(details).length !== 0 ? (
              <Fragment>
                <Row>
                  <Col md="4">
                    <div className="instructor-img">
                      <img
                        src={
                          details?.image_url
                            ? details?.image_url
                            : `${process.env.PUBLIC_URL}/assets/images/team-7.jpg`
                        }
                        alt=""
                        className="img-fluid card-box"
                      />
                      {/*<ul className="list-unstyled getintouch card-box">
                        <li style={{ fontSize: "15px" }}>
                          <i
                            style={{ marginLeft: "10px", marginRight: "20px" }}
                            className="fa fa-phone"
                          ></i>
                          {details?.phone_number}
                        </li>
                        <li style={{ fontSize: "15px" }}>
                          <i
                            style={{ marginLeft: "10px", marginRight: "20px" }}
                            className="fa fa-envelope"
                          ></i>{" "}
                          {details?.email}
                        </li>
                      </ul>*/}
                      {/*<ul className="list-unstyled list-inline card-box">
                        <li className="list-inline-item">
                          <Link
                            to={{
                              pathname:
                                details?.instructor_profile?.facebook_url,
                            }}
                            target="_blank"
                          >
                            <i
                              style={{
                                marginLeft: "10px",
                                marginRight: "10px",
                              }}
                              className="fa fa-facebook-f fa-2x"
                            ></i>
                          </Link>
                        </li>
                        <li className="list-inline-item">
                          <Link
                            to={{
                              pathname:
                                details?.instructor_profile?.twitter_url,
                            }}
                            target="_blank"
                          >
                            <i
                              style={{
                                marginLeft: "10px",
                                marginRight: "10px",
                              }}
                              className="fa fa-twitter fa-2x"
                            ></i>
                          </Link>
                        </li>
                        <li className="list-inline-item">
                          <Link
                            to={{
                              pathname:
                                details?.instructor_profile?.linkedin_url,
                            }}
                            target="_blank"
                          >
                            <i
                              style={{
                                marginLeft: "10px",
                                marginRight: "10px",
                              }}
                              className="fa fa-linkedin fa-2x"
                            ></i>
                          </Link>
                        </li>
                         <li className="list-inline-item">
                          <a href={process.env.PUBLIC_URL + "/"}>
                            <i className="fab fa-youtube"></i>
                          </a>
                        </li>
                        <li className="list-inline-item">
                          <a href={process.env.PUBLIC_URL + "/"}>
                            <i className="fab fa-dribbble"></i>
                          </a>
                        </li> 
                      </ul>*/}
                    </div>
                  </Col>
                  <Col md="8">
                    <div className="instructor-content  card-box">
                      <h4>
                        <i
                          className="fa fa-user"
                          style={{ marginLeft: "10px", marginRight: "20px" }}
                        ></i>
                        {`${details.first_name} ${details.last_name}`}
                      </h4>
                      {/*<span>
                        Experience Level{" "}
                        {`${details.instructor_profile.experience_level}`}
                      </span>*/}
                      <h5>About Me</h5>
                      <br />
                      <p>
                        <i
                          className="fa fa-work"
                          style={{ marginRight: "20px" }}
                        ></i>
                        {`${details?.instructor_profile?.detailed_introduction}`}
                        <br />
                      </p>
                    </div>
                    {/* <div className="qual-expe d-flex">
                      <div className="qualification card-box">
                        <h5>Qualifications</h5>
                        <div className="qual-expe-box">
                          <h6>
                            <i
                              className="fa fa-user"
                              style={{
                                marginLeft: "10px",
                                marginRight: "20px",
                              }}
                            ></i>{" "}
                            Experience Level{" "}
                            {`${details.instructor_profile.experience_level}`}
                          </h6>
                          <p>
                            Education Level{" "}
                            {`${details.instructor_profile.education_level}`}
                          </p>
                        </div>
                      </div>
                      <div className="experiance card-box">
                        <h5>Experience</h5>
                        <div className="qual-expe-box">
                          <h6>
                            <i
                              className="fa fa-user"
                              style={{
                                marginLeft: "10px",
                                marginRight: "20px",
                              }}
                            ></i>{" "}
                            Previous Employer Name{" "}
                            {`${details.instructor_profile.current_employer_name}`}
                          </h6>
                          <p>
                            Previous Employer Designation{" "}
                            {`${details.instructor_profile.current_employer_designation}`}
                          </p>
                        </div>
                        <div className="qual-expe-box">
                          <h6>
                            <i
                              className="fa fa-user"
                              style={{
                                marginLeft: "10px",
                                marginRight: "20px",
                              }}
                            ></i>{" "}
                            Current Employer Name{" "}
                            {`${details.instructor_profile.previous_employer_name}`}
                          </h6>
                          <p>
                            Current Employer Designation{" "}
                            {`${details.instructor_profile.previous_employer_designation}`}
                          </p>
                        </div>
                      </div>
                    </div>*/}
                  </Col>
                  <Col md="12">
                    <div className="instructor-course-title ">
                      <h5>
                        <i
                          className="fa fa-user"
                          style={{ marginLeft: "10px", marginRight: "20px" }}
                        ></i>
                        Courses by{" "}
                        {`${details.first_name}  ${details.last_name}`}
                      </h5>
                    </div>
                    <div className="instructor-course-slider">
                      {my_courses?.length > 0 ? (
                        <MyCourses show={4} children={my_courses} />
                      ) : (
                        <p className="card-box">
                          No course for this instructor yet.
                        </p>
                      )}
                    </div>
                  </Col>

                  <Col md="12">
                    <div className="instructor-course-title ">
                      <h5>
                        <i
                          className="fa fa-user"
                          style={{ marginLeft: "10px", marginRight: "20px" }}
                        ></i>
                        Courses Featured by{" "}
                        {`${details.first_name}  ${details.last_name}`}
                      </h5>
                    </div>
                    <div className="instructor-course-slider">
                      {co_authored_course?.length > 0 ? (
                        <MyCourses show={4} children={co_authored_course} />
                      ) : (
                        <p className="card-box">
                          No course for this instructor yet.
                        </p>
                      )}
                    </div>
                  </Col>
                </Row>
              </Fragment>
            ) : (
              <Row>
                <h1>No details for this instructor yet</h1>
              </Row>
            )}
          </Container>
        </section>

        {/* Footer 2 */}
        <Footer />
      </div>
    </Styles>
  );
};

export default InstructorDetails;
