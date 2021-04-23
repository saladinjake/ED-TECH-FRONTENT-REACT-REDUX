import React, { useEffect, useState, Fragment } from "react";
// import Datas from "../../data/instructor/details.json";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
// import Swiper from "react-id-swiper";
import HeaderTwo from "../../components/HeaderTwo";
import { BreadcrumbBox } from "../../components/common/Breadcrumb";
import FooterTwo from "../../components/FooterTwo";
import { Styles } from "./styles/instructor.js";

import Loader from "components/Loader/Loader";
import { getInstructor } from "services/instructor";

const InstructorDetails = ({ match }) => {
  // const settings = {
  //   slidesPerView: 3,
  //   loop: true,
  //   speed: 1000,
  //   autoplay: false,
  //   spaceBetween: 30,
  //   watchSlidesVisibility: true,
  //   pagination: {
  //     el: ".slider-dot.text-center",
  //     clickable: true,
  //   },
  //   breakpoints: {
  //     0: {
  //       slidesPerView: 1,
  //     },
  //     576: {
  //       slidesPerView: 1,
  //     },
  //     768: {
  //       slidesPerView: 2,
  //     },
  //     992: {
  //       slidesPerView: 3,
  //     },
  //   },
  // };

  const [details, setDetails] = useState({});
  // eslint-disable-next-line
  const [status, setStatus] = useState("init");
  const [loading, setLoading] = useState(true);

  const init = async () => {
    let instructorId = parseInt(match.params.id);
    try {
      let response = await getInstructor(instructorId);
      setDetails({ ...response.data.data });
      console.log(response.data.data);
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

  return (
    <Styles>
      {/* Main Wrapper */}
      <div className="main-wrapper instructor-details-page">
        {/* Header 2 */}
        <HeaderTwo />

        {/* Breadcroumb */}
        <BreadcrumbBox title="Instructor Details" />

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
                        className="img-fluid"
                      />
                      <ul className="list-unstyled getintouch">
                        <li>
                          <i className="las la-phone"></i>
                          {details?.phone_number}
                        </li>
                        <li>
                          <i className="lar la-envelope"></i> {details?.email}
                        </li>
                      </ul>
                      <ul className="social list-unstyled list-inline">
                        <li className="list-inline-item">
                          <Link
                            to={{
                              pathname:
                                details?.instructor_profile?.facebook_url,
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
                                details?.instructor_profile?.twitter_url,
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
                                details?.instructor_profile?.linkedin_url,
                            }}
                            target="_blank"
                          >
                            <i className="fab fa-linkedin-in"></i>
                          </Link>
                        </li>
                        {/* <li className="list-inline-item">
                          <a href={process.env.PUBLIC_URL + "/"}>
                            <i className="fab fa-youtube"></i>
                          </a>
                        </li>
                        <li className="list-inline-item">
                          <a href={process.env.PUBLIC_URL + "/"}>
                            <i className="fab fa-dribbble"></i>
                          </a>
                        </li> */}
                      </ul>
                    </div>
                  </Col>
                  <Col md="8">
                    <div className="instructor-content">
                      <h4>{`${details.first_name} ${details.last_name}`}</h4>
                      <span>{`${details.instructor_profile.experience_level}`}</span>
                      <p>
                        {`${details.instructor_profile.biography}`}
                        <br />
                      </p>
                    </div>
                    <div className="qual-expe d-flex">
                      <div className="qualification">
                        <h5>Qualifications</h5>
                        <div className="qual-expe-box">
                          <h6>
                            {`${details.instructor_profile.experience_level}`}
                          </h6>
                          <p>
                            {`${details.instructor_profile.education_level}`}
                          </p>
                        </div>
                      </div>
                      <div className="experiance">
                        <h5>Experience</h5>
                        <div className="qual-expe-box">
                          <h6>
                            {`${details.instructor_profile.current_employer_name}`}
                          </h6>
                          <p>
                            {`${details.instructor_profile.current_employer_designation}`}
                          </p>
                        </div>
                        <div className="qual-expe-box">
                          <h6>
                            {`${details.instructor_profile.previous_employer_name}`}
                          </h6>
                          <p>
                            {`${details.instructor_profile.previous_employer_designation}`}
                          </p>
                        </div>
                      </div>
                    </div>
                  </Col>
                  <Col md="12">
                    <div className="instructor-course-title">
                      <h5>
                        Courses by {`${details.first_name}  ${details.last_name}`}
                      </h5>
                    </div>
                    <div className="instructor-course-slider">
                      {details.instructor_profile.courses.length > 0 ? (
                        details.instructor_profile.courses.map((data, i) => (
                          // <Row>
                            <Col lg="6" md="12">
                              <div className="course-item" key={i}>
                                <Link to={`/courses/${data.id}`}>
                                  <div
                                    className="course-image"
                                    style={{
                                      backgroundImage: `url(${data.course_thumbnail})`,
                                    }}
                                  >
                                    <div className="author-img d-flex">
                                      <div className="img">
                                        <img
                                          src={
                                            process.env.PUBLIC_URL +
                                            `/assets/images/${data.course_name}`
                                          }
                                          alt=""
                                        />
                                      </div>
                                      <div className="title">
                                        <p>
                                          {`${details.first_name} ${details.last_name}`}
                                        </p>
                                      </div>
                                    </div>
                                    <div className="course-price">
                                      {/* <p>{data.price}</p> */}
                                    </div>
                                  </div>
                                </Link>
                                <div className="course-content">
                                  <h6 className="heading">
                                    <Link to={`/courses/${data.id}`}>
                                      {data.course_name}
                                    </Link>
                                  </h6>
                                  <p className="desc">
                                    {data.course_description}
                                  </p>
                                  <div className="course-face d-flex justify-content-between">
                                    <div className="duration">
                                      <p>
                                        <i className="las la-clock"></i>120
                                      </p>
                                    </div>
                                    <div className="rating">
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
                                    <div className="student">
                                      <p>
                                        <i className="las la-chair"></i>60
                                      </p>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </Col>
                          // </Row>
                        ))
                      ) : (
                        <p>No course for this instructor yet.</p>
                      )}
                      {/* <Swiper {...settings}>
                        {Datas.map((data, i) => (
                          <div className="course-item" key={i}>
                            <Link to={process.env.PUBLIC_URL + data.courseLink}>
                              <div
                                className="course-image"
                                style={{
                                  backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/${data.imgUrl})`,
                                }}
                              >
                                <div className="author-img d-flex">
                                  <div className="img">
                                    <img
                                      src={
                                        process.env.PUBLIC_URL +
                                        `/assets/images/${data.authorImg}`
                                      }
                                      alt=""
                                    />
                                  </div>
                                  <div className="title">
                                    <p>{data.authorName}</p>
                                    <span>{data.authorCourses}</span>
                                  </div>
                                </div>
                                <div className="course-price">
                                  <p>{data.price}</p>
                                </div>
                              </div>
                            </Link>
                            <div className="course-content">
                              <h6 className="heading">
                                <Link
                                  to={process.env.PUBLIC_URL + data.courseLink}
                                >
                                  {data.courseTitle}
                                </Link>
                              </h6>
                              <p className="desc">{data.courseDesc}</p>
                              <div className="course-face d-flex justify-content-between">
                                <div className="duration">
                                  <p>
                                    <i className="las la-clock"></i>120
                                  </p>
                                </div>
                                <div className="rating">
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
                                    <li className="list-inline-item">(4.5)</li>
                                  </ul>
                                </div>
                                <div className="student">
                                  <p>
                                    <i className="las la-chair"></i>60
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </Swiper> */}
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
        <FooterTwo />
      </div>
    </Styles>
  );
};

export default InstructorDetails;
