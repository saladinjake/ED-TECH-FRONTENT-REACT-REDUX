import React, { Fragment } from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./css/text.css";
import "./css/overview.css";
import "./css/icons.css";

// import notify from "./notification.png"
// import skateboard from  "./skateboard.png"

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logOut } from "actions/authActions";
import { Link } from "react-router-dom";

const WelcomeBanner = ({
  cart: { cart },
  auth: { isAuthenticated, user },
  logOut,
  info,
  wishlists,
  activeCoursesTotal,
}) => {
  return (
    <Fragment>
      <br />
      <br />
      <br />
      <br />
      <br />
      <Container>
        <Row>
          <br />
          <br />
          <br />
          <Col lg="8">
            <div className="card-box" style={{ height: "280px" }}>
              <div
                className="bar-widget"
                style={{ margin: "auto", width: "100%" }}
              >
                <div className="table-box">
                  <div className="table-detail">
                    <h4
                      style={{
                        fontWeight: "300px",
                        color: "#333",
                        fontSize: "45px",
                        fontFamily: "Open Sans",
                        lineHight: "34px",
                        letterSpacing: "-1px",
                        fontWeight: "normal",
                      }}
                    >
                      Hello {`${user?.last_name}`},
                    </h4>
                    <p
                      className="text-muted m-b-0 m-t-0"
                      style={{
                        fontFamily: "Open Sans",
                        color: "#000",
                        fontSize: "14px",
                      }}
                    >
                      Welcome back to your questense dashboard.
                    </p>
                    <p
                      className="text-muted m-b-0 m-t-0"
                      style={{
                        fontFamily: "Open Sans",
                        color: "#000",
                        fontSize: "14px",
                      }}
                    >
                      You can continue your learning path by exploring our pages
                    </p>
                    <br />
                    <br />
                    <a
                      type="button"
                      className="btn dropdown-toggle waves-effect"
                      href={process.env.PUBLIC_URL + "/mycourses"}
                      style={{
                        background: "rgb(2, 83, 200)",
                        fontSize: "12px",
                        marginLeft: "10px",
                        fontWeight: "bold",
                        fontFamily: "Open Sans",
                        color: "#fff",
                      }}
                    >
                      Explore my courses
                    </a>
                  </div>
                  <div className="table-detail text-right">
                    <img
                      alt="noimage"
                      src={
                        process.env.PUBLIC_URL + "/assets/images/skateboard.png"
                      }
                      className="thumbnail"
                      style={{ border: "none" }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col
            lg="4"
            style={{ margin: "auto", width: "100%", height: "300px" }}
          >
            <div className="card-box">
              <div className="bar-widget">
                <div className="table-box">
                  <div
                    className="table-detail"
                    style={{ height: "250px", textAlign: "center" }}
                  >
                    <div>
                      <div>
                        <img
                          alt="not-found"
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/book-open.png"
                          }
                        />
                      </div>
                    </div>
                    <h6 className="m-t-0 ">
                      <b
                        style={{
                          fontFamily: "Open Sans",
                          color: "#000",
                          fontSize: "14px",
                        }}
                      >
                        Active courses
                      </b>
                    </h6>
                    <p
                      className="text-muted m-b-0 m-t-0"
                      // style={{ fontSize: "40px" }}
                    >
                      <b
                        style={{
                          fontFamily: "Open Sans",
                          color: "#000",
                          fontSize: "14px",
                        }}
                      >
                        {activeCoursesTotal}
                      </b>
                    </p>
                  </div>
                  <div className="center"></div>
                </div>
              </div>
            </div>
          </Col>
        </Row>

        <Row className="row">
          <Col lg="3" sm="6">
            <div className="widget-panel widget-style-2 bg-white">
              <i className="md md-add text-info"></i>
              <h2
                className="m-0 text-dark-x counter font-600-x"
                style={{
                  fontFamily: "Open Sans",
                  color: "#000",
                  fontSize: "14px",
                }}
              >
                {info?.upcoming_courses}
              </h2>
              <div
                className="text-muted-x m-t-5-x"
                style={{
                  fontFamily: "Open Sans",
                  color: "#000",
                  fontSize: "14px",
                }}
              >
                Upcoming Courses
              </div>
            </div>
          </Col>

          <Col lg="3" sm="6">
            <div className="widget-panel widget-style-2 bg-white">
              <Link to={process.env.PUBLIC_URL + `/learner/wishlists`}>
                <i className="md md-store-mall-directory  text-brown"></i>
                <h2
                  className="m-0 text-dark-x counter font-600-x"
                  style={{
                    fontFamily: "Open Sans",
                    color: "#000",
                    fontSize: "14px",
                  }}
                >
                  {wishlists !== undefined && `(${wishlists})`}
                </h2>
                <div
                  className="text-muted-x m-t-5-x"
                  style={{
                    fontFamily: "Open Sans",
                    color: "#000",
                    fontSize: "14px",
                  }}
                >
                  Wishlists
                </div>
              </Link>
            </div>
          </Col>
          <Col lg="3" sm="6">
            <Link to={process.env.PUBLIC_URL + `/cart`}>
              <div className="widget-panel widget-style-2 bg-white">
                <i className="md md-add-shopping-cart text-pink"></i>
                <h2
                  className="m-0 text-dark-x counter font-600-x"
                  style={{
                    fontFamily: "Open Sans",
                    color: "#000",
                    fontSize: "14px",
                  }}
                >
                  {cart !== undefined && `(${cart?.length})`}
                </h2>
                <div
                  className="text-muted-x m-t-5-x"
                  style={{
                    fontFamily: "Open Sans",
                    color: "#000",
                    fontSize: "14px",
                  }}
                >
                  Cart
                </div>
              </div>
            </Link>
          </Col>
          <Col lg="3" sm="6">
            <div className="widget-panel widget-style-2 bg-white">
              <i className="md md-account-child text-custom"></i>
              <h2
                className="m-0 text-dark-x counter font-600-x"
                style={{
                  fontFamily: "Open Sans",
                  color: "#000",
                  fontSize: "14px",
                }}
              >
                {info?.all_enrollments}
              </h2>
              <div
                className="text-muted-c m-t-5-x"
                style={{
                  fontFamily: "Open Sans",
                  color: "#000",
                  fontSize: "14px",
                }}
              >
                Enrollments
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

WelcomeBanner.propTypes = {
  auth: PropTypes.object.isRequired,
  logOut: PropTypes.func.isRequired,
  cart: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.cart,
  auth: state.auth,
});

export default connect(mapStateToProps, { logOut })(WelcomeBanner);
