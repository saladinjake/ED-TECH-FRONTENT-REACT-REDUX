import React, { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
// import { useHistory } from "react-router-dom";
import InstructorNavBar from "../../components/shared/NavBar";
import Footer from "../../components/shared/Footer";
// import Pagination from "./../../components/Pagination";
import { Styles } from "./styles/product.js";
import { getInstructorCourses } from "../../api/enrollment_services/instructor.services";
import Loader from "../../components/Loader/Loader";
import toast from "react-hot-toast";
// import InstructorBtns from "./InsructorBtns";

import { useHistory } from "react-router-dom";

const InstructorCourses = () => {
  const [activeCourses, setActiveCourses] = useState([]);
  const [loading, setLoading] = useState(true);
  // let history = useHistory();

  useEffect(() => {
    fetchAuthProfile();
  }, []);

  const fetchAuthProfile = async () => {
    try {
      let allCourses = await getInstructorCourses();
      setActiveCourses(
        allCourses.data.data.data.length > 0 &&
          allCourses.data.data.data.filter((course) => {
            return parseInt(course.status) === 1;
          })
      );
    } catch (err) {
      toast.error(
        err?.response?.data?.message || `Error occured fetching active courses`
      );
    }
    setLoading(false);
  };

  return (
    <Styles>
      {/* Main Wrapper */}
      <div className="main-wrapper product-page">
        {/* Header 2   <InstructorNavBar /> */}

    

        {/* New Poducts Area */}
        <Container>
          <Fragment>
            <br />
            <br />
            <br />
            <br />
            <br />
            <Container>
              <Row class="row">
                <Col lg="3" sm="6">
                  <div class="widget-panel widget-style-2 bg-white">
                    <i class="md md-add text-info"></i>
                    <h2 class="m-0 text-dark counter font-600"></h2>
                    <div class="text-muted m-t-5">Create A course</div>
                  </div>
                </Col>

                <Col lg="3" sm="6">
                  <div class="widget-panel widget-style-2 bg-white">
                    <Link to={process.env.PUBLIC_URL + `/learner/wishlists`}>
                      <i class="md md-store-mall-directory  text-brown"></i>
                      <h2 class="m-0 text-dark counter font-600"></h2>
                      <div class="text-muted m-t-5">Wishlists</div>
                    </Link>
                  </div>
                </Col>
                <Col lg="3" sm="6">
                  <Link to={process.env.PUBLIC_URL + `/cart`}>
                    <div class="widget-panel widget-style-2 bg-white">
                      <i class="md md-add-shopping-cart text-pink"></i>
                      <h2 class="m-0 text-dark counter font-600"></h2>
                      <div class="text-muted m-t-5">Cart</div>
                    </div>
                  </Link>
                </Col>
                <Col lg="3" sm="6">
                  <div class="widget-panel widget-style-2 bg-white">
                    <i class="md md-account-child text-custom"></i>
                    <h2 class="m-0 text-dark counter font-600"></h2>
                    <div class="text-muted m-t-5">Enrollments</div>
                  </div>
                </Col>
              </Row>
            </Container>
          </Fragment>

          <Row>
            <Col md="12">
              <div className="sec-title text-center">
                <h4>My Active Courses</h4>
              </div>
              <Row className="filter-items">
                {loading ? (
                  <Loader width="70" />
                ) : activeCourses.length > 0 ? (
                  <Fragment>
                    {activeCourses.map((data, i) => (
                      <Col lg="4" md="6" key={i} data-id={data.id}>
                        <div className="course-item">
                          <Link to={process.env.PUBLIC_URL + data.id}>
                            <div
                              className="course-image"
                              style={{
                                backgroundImage: `url(${data?.course_thumbnail})`,
                              }}
                            >
                              <div className="author-img d-flex"></div>
                            </div>
                          </Link>
                          <div className="course-content">
                            <h6 className="heading">
                              <Link to={process.env.PUBLIC_URL + data.id}>
                                {data?.course_name}
                              </Link>
                            </h6>
                            <p className="author">
                              {/* A Course by {data.authorName} */}
                            </p>
                            <p className="desc">{data.course_description}</p>
                            <div className="course-face d-flex justify-content-between">
                              <div className="duration">
                                <p>
                                  <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M15.9583 6.13748C15.8536 5.81349 15.5662 5.58339 15.2262 5.55275L10.6082 5.13342L8.78208 0.859266C8.64744 0.546026 8.34079 0.343262 8.00008 0.343262C7.65937 0.343262 7.35273 0.546026 7.21808 0.859999L5.39198 5.13342L0.773211 5.55275C0.433847 5.58412 0.147219 5.81349 0.0418692 6.13748C-0.0634802 6.46146 0.0338123 6.81682 0.290533 7.04082L3.78122 10.1022L2.7519 14.6364C2.67658 14.9697 2.80598 15.3143 3.0826 15.5143C3.23128 15.6217 3.40524 15.6764 3.58066 15.6764C3.7319 15.6764 3.88193 15.6356 4.01658 15.5551L8.00008 13.1743L11.9821 15.5551C12.2735 15.7304 12.6408 15.7144 12.9168 15.5143C13.1936 15.3137 13.3228 14.969 13.2475 14.6364L12.2182 10.1022L15.7089 7.04143C15.9656 6.81682 16.0636 6.46207 15.9583 6.13748Z"
                                      fill="#FFC107"
                                    />
                                  </svg>
                                </p>
                              </div>
                              <div className="student">
                                <p>#{data.price}</p>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Col>
                    ))}
                  </Fragment>
                ) : (
                  <p>No active course yet.</p>
                )}
              </Row>
            </Col>
          </Row>
        </Container>

        {/* <Footer /> */}
        <Footer />
      </div>
    </Styles>
  );
};

export default InstructorCourses;
