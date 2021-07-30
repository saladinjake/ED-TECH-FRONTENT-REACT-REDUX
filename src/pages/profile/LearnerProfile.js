import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Table } from "react-bootstrap";
import NavBar from "components/Navbar";
import Footer from "components/Footer";
import "react-responsive-carousel/lib/styles/carousel.min.css";
// import FooterTwo from "../../components/FooterTwo";
// import { Styles } from "./styles/productDetails.js";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import Loader from "components/Loader/Loader";
import { getLearnerProfile } from "services/profile";
import toast from "react-hot-toast";

import "./avatar.css";

const LearnerProfiler = ({ auth: { user, user_roles } }) => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);

  console.log(user);

  useEffect(() => {
    (async function loadContent() {
      try {
        let res = await getLearnerProfile();
        setProfile({ ...res.data.data });
      } catch (err) {
        toast.error(`Error fetching user's details`);
      }
      setLoading(false);
    })();
    // eslint-disable-next-line
  }, []);
  // console.log(profile.user);
  return (
    <div className=" ">
      <NavBar />

      <section className=" ">
        <Container>
          <div className="col-sm-12">
            <h4
              className="page-title"
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
              My Profile
            </h4>
          </div>
          {loading ? (
            <Loader width="70" />
          ) : Object.entries(profile).length !== 0 ? (
            <Fragment>
              <br />
              <br />
              <br />
              <Row>
                <Col md="5">
                  <div className="product-slider">
                    <div className="slider-item">
                      {profile?.user?.image_url?.length > 0 ? (
                        <img
                          src={profile?.user?.image_url}
                          alt=""
                          height="200"
                          width="200"
                          alt=""
                          className="circle card-box"
                        />
                      ) : (
                        <img
                          src="https://d30y9cdsu7xlg0.cloudfront.net/png/138926-200.png"
                          alt=""
                          height="200"
                          width="200"
                          alt=""
                          className="circle card-box"
                        />
                      )}
                    </div>
                  </div>

                  <Col>
                    <Table className="table table-borderless table-reveal ">
                      <tbody>
                        {/*<tr>
                          <td>
                            <i
                              className="fa fa-user"
                              style={{ marginRight: "20px" }}
                            ></i>
                            Username{" "}
                          </td>

                          <td className="pull-right">{`${profile?.user?.username}`}</td>
                        </tr>*/}

                        <tr>
                          <td
                            style={{
                              border: "none",
                              fontFamily: "Open Sans",
                              color: "#000",
                              fontSize: "14px",
                            }}
                          >
                            <i
                              className="fa fa-user"
                              style={{ marginRight: "20px" }}
                            ></i>
                            First Name{" "}
                          </td>

                          <td
                            className="pull-right"
                            style={{
                              fontFamily: "Open Sans",
                              color: "#000",
                              fontSize: "14px",
                            }}
                          >{`${profile?.user?.first_name}`}</td>
                        </tr>

                        <tr>
                          <td
                            style={{
                              border: "none",
                              fontFamily: "Open Sans",
                              color: "#000",
                              fontSize: "14px",
                            }}
                          >
                            <i
                              className="fa fa-user"
                              style={{ marginRight: "20px" }}
                            ></i>
                            Last Name
                          </td>

                          <td
                            className="pull-right"
                            style={{
                              fontFamily: "Open Sans",
                              color: "#000",
                              fontSize: "14px",
                            }}
                          >
                            {`${profile?.user?.last_name}`}{" "}
                          </td>
                        </tr>

                        <tr>
                          <td
                            style={{
                              border: "none",
                              fontFamily: "Open Sans",
                              color: "#000",
                              fontSize: "14px",
                            }}
                          >
                            <i
                              className="fa fa-email"
                              style={{ marginRight: "20px" }}
                            ></i>
                            Email
                          </td>
                          <td
                            className="pull-right"
                            style={{
                              fontFamily: "Open Sans",
                              color: "#000",
                              fontSize: "14px",
                            }}
                          >{`${profile?.user?.email}`}</td>
                        </tr>
                        <tr>
                          <td
                            style={{
                              border: "none",
                              fontFamily: "Open Sans",
                              color: "#000",
                              fontSize: "14px",
                            }}
                          >
                            <i
                              className="fa fa-user"
                              style={{ marginRight: "20px" }}
                            ></i>
                            Gender
                          </td>
                          <td
                            className="pull-right"
                            style={{
                              fontFamily: "Open Sans",
                              color: "#000",
                              fontSize: "14px",
                            }}
                          >{`${profile?.user?.learner_profile?.gender}`}</td>
                        </tr>
                        <tr>
                          <td
                            style={{
                              border: "none",
                              fontFamily: "Open Sans",
                              color: "#000",
                              fontSize: "14px",
                            }}
                          >
                            <i
                              className="fa fa-mobile"
                              style={{ marginRight: "20px" }}
                            ></i>
                            Phone
                          </td>
                          <td
                            className="pull-right"
                            style={{
                              fontFamily: "Open Sans",
                              color: "#000",
                              fontSize: "14px",
                            }}
                          >{`${profile?.user?.phone_number}`}</td>
                        </tr>
                      </tbody>
                    </Table>
                  </Col>
                </Col>

                <Col md="7">
                  <Table className="table table-borderless table-reveal ">
                    <tbody>
                      <tr>
                        <td
                          style={{
                            border: "none",
                            fontFamily: "Open Sans",
                            color: "#000",
                            fontSize: "14px",
                          }}
                        >
                          <i
                            className="fa fa-user"
                            style={{ marginRight: "20px" }}
                          ></i>
                          Marital Status
                        </td>
                        <td
                          className="pull-right"
                          style={{
                            fontFamily: "Open Sans",
                            color: "#000",
                            fontSize: "14px",
                          }}
                        >{`${profile?.user?.learner_profile?.marital_status}`}</td>
                      </tr>

                      <tr>
                        <td
                          style={{
                            border: "none",
                            fontFamily: "Open Sans",
                            color: "#000",
                            fontSize: "14px",
                          }}
                        >
                          <i
                            className="fa fa-briefcase"
                            style={{ marginRight: "20px" }}
                          ></i>
                          Date Of Birth
                        </td>
                        <td
                          className="pull-right"
                          style={{
                            fontFamily: "Open Sans",
                            color: "#000",
                            fontSize: "14px",
                          }}
                        >
                          >{`${profile?.user?.learner_profile?.date_of_birth}`}
                        </td>
                      </tr>
                      <tr>
                        <td>Employment Status</td>
                        <td
                          className="pull-right"
                          style={{
                            fontFamily: "Open Sans",
                            color: "#000",
                            fontSize: "14px",
                          }}
                        >{`${profile?.user?.learner_profile?.employment_status}`}</td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            border: "none",
                            fontFamily: "Open Sans",
                            color: "#000",
                            fontSize: "14px",
                          }}
                        >
                          <i
                            className="fa fa-graduation-cap"
                            style={{ marginRight: "20px" }}
                          ></i>
                          Education Level
                        </td>
                        <td
                          className="pull-right"
                          style={{
                            fontFamily: "Open Sans",
                            color: "#000",
                            fontSize: "14px",
                          }}
                        >{`${profile?.user?.learner_profile?.education_level}`}</td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            border: "none",
                            fontFamily: "Open Sans",
                            color: "#000",
                            fontSize: "14px",
                          }}
                        >
                          <i
                            className="fa fa-graduation-cap"
                            style={{ marginRight: "20px" }}
                          ></i>{" "}
                          Degree Obtained
                        </td>
                        <td
                          className="pull-right"
                          style={{
                            fontFamily: "Open Sans",
                            color: "#000",
                            fontSize: "14px",
                          }}
                        >{`${profile?.user?.learner_profile?.degree_obtained}`}</td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            border: "none",
                            fontFamily: "Open Sans",
                            color: "#000",
                            fontSize: "14px",
                          }}
                        >
                          <i
                            className="fa fa-twitter"
                            style={{ marginRight: "20px" }}
                          ></i>
                          Twitter Link
                        </td>
                        <td
                          className="pull-right"
                          style={{
                            fontFamily: "Open Sans",
                            color: "#000",
                            fontSize: "14px",
                          }}
                        >{`${profile?.user?.learner_profile?.twitter_url}`}</td>
                      </tr>
                      <tr>
                        <td
                          style={{
                            border: "none",
                            fontFamily: "Open Sans",
                            color: "#000",
                            fontSize: "14px",
                          }}
                        >
                          <i
                            className="fa fa-facebook"
                            style={{ marginRight: "20px" }}
                          ></i>
                          Facebook Link
                        </td>
                        <td
                          className="pull-right"
                          style={{
                            fontFamily: "Open Sans",
                            color: "#000",
                            fontSize: "14px",
                          }}
                        >{`${profile?.user?.learner_profile?.facebook_url}`}</td>
                      </tr>

                      <tr>
                        <td
                          style={{
                            border: "none",
                            fontFamily: "Open Sans",
                            color: "#000",
                            fontSize: "14px",
                          }}
                        >
                          <i
                            className="fa fa-linkedin"
                            style={{ marginRight: "20px" }}
                          ></i>
                          LinkedIn Link
                        </td>
                        <td
                          className="pull-right"
                          style={{
                            fontFamily: "Open Sans",
                            color: "#000",
                            fontSize: "14px",
                          }}
                        >{`${profile?.user?.learner_profile?.linkedin_url}`}</td>
                      </tr>

                      <tr>
                        <td
                          style={{
                            border: "none",
                            fontFamily: "Open Sans",
                            color: "#000",
                            fontSize: "14px",
                          }}
                        >
                          Current employer Name
                        </td>
                        <td
                          style={{
                            fontFamily: "Open Sans",
                            color: "#000",
                            fontSize: "14px",
                          }}
                          className="pull-right"
                        >{`${profile?.user?.instructor_profile?.current_employer_name}`}</td>
                      </tr>

                      <tr>
                        <td
                          style={{
                            border: "none",
                            fontFamily: "Open Sans",
                            color: "#000",
                            fontSize: "14px",
                          }}
                        >
                          Current employer designation
                        </td>
                        <td
                          style={{
                            fontFamily: "Open Sans",
                            color: "#000",
                            fontSize: "14px",
                          }}
                          className="pull-right"
                        >{`${profile?.user?.instructor_profile?.current_employer_designation}`}</td>
                      </tr>

                      <tr>
                        <td
                          style={{
                            border: "none",
                            fontFamily: "Open Sans",
                            color: "#000",
                            fontSize: "14px",
                          }}
                        >
                          Previous employer Name
                        </td>
                        <td
                          style={{
                            border: "none",
                            fontFamily: "Open Sans",
                            color: "#000",
                            fontSize: "14px",
                          }}
                          className="pull-right"
                        >{`${profile?.user?.instructor_profile?.previous_employer_name}`}</td>
                      </tr>

                      <tr>
                        <td
                          style={{
                            border: "none",
                            fontFamily: "Open Sans",
                            color: "#000",
                            fontSize: "14px",
                          }}
                        >
                          Previous employer designation
                        </td>
                        <td
                          style={{
                            border: "none",
                            fontFamily: "Open Sans",
                            color: "#000",
                            fontSize: "14px",
                          }}
                          className="pull-right"
                        >{`${profile?.user?.instructor_profile?.previous_employer_designation}`}</td>
                      </tr>
                    </tbody>
                  </Table>
                  <Link
                    to="/learner/profile/update"
                    className="btn btn-primary pull-right"
                    style={{
                      background: "rgba(8,23,200)",
                      fontSize: "12px",
                      marginLeft: "10px",
                      fontWeight: "bold",
                      fontFamily: "Open Sans",
                      color: "#fff",
                    }}
                  >
                    Update Profile
                  </Link>
                </Col>
              </Row>
            </Fragment>
          ) : (
            <p>No Details for this user yet</p>
          )}
        </Container>
      </section>

      <Footer />
    </div>
  );
};

LearnerProfiler.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.cart,
  auth: state.auth,
});

export default connect(mapStateToProps, {})(LearnerProfiler);
