import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Table } from "react-bootstrap";
import InstructorNavBar from "components/Navbar/InstructorNavbar";
import { BreadcrumbBox } from "../../components/common/Breadcrumb";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Footer from "components/Footer";
import { Styles } from "./styles/productDetails.js";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import Loader from "components/Loader/Loader";
import { getAuthProfile } from "services/instructor";
import toast from "react-hot-toast";

import "./avatar.css";

function getTimeAgoInterval(date) {
  let seconds = Math.floor((Date.now() - date) / 1000);
  let unit = "second";
  let direction = "ago";
  if (seconds < 0) {
    seconds = -seconds;
    direction = "from now";
  }
  let value = seconds;
  if (seconds >= 31536000) {
    value = Math.floor(seconds / 31536000);
    unit = "year";
  } else if (seconds >= 86400) {
    value = Math.floor(seconds / 86400);
    unit = "day";
  } else if (seconds >= 3600) {
    value = Math.floor(seconds / 3600);
    unit = "hour";
  } else if (seconds >= 60) {
    value = Math.floor(seconds / 60);
    unit = "minute";
  }
  if (parseInt(value) !== 1) unit = unit + "s";
  return value + " " + unit + " " + direction;
}
const InstructorProfiler = ({ auth: { user, user_roles } }) => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  let dummyAvatar = "https://d30y9cdsu7xlg0.cloudfront.net/png/138926-200.png";
  const [image_url, setImageProfile] = useState("");

  // console.log(user);

  useEffect(() => {
    (async function loadContent() {
      try {
        let res = await getAuthProfile();
        setProfile({ ...res.data.data });
      } catch (err) {
        toast.error(`Error fetching instructor's details`);
      }
      setLoading(false);
    })();
    // eslint-disable-next-line
  }, []);

  // console.log(profile);
  return (
    <Styles>
      {/* Main Wrapper */}
      <div className="main-wrapper product-details-page">
        {/* Header 2 */}
        <InstructorNavBar />

        {/* Breadcroumb <BreadcrumbBox title="Profile" /> */}

        {/* Product Details */}
        <br />
        <br />
        <br />
        <br />
        <section className="">
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
                <Row>
                  <Col md="5">
                    <div className="product-slider">
                      <div className="slider-item">
                        {profile?.user?.image_url ? (
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
                            src={dummyAvatar}
                            alt=""
                            height="200"
                            width="200"
                            alt=""
                            className="circle card-box"
                          />
                        )}
                      </div>
                      <Link
                        className="btn btn-primary"
                        to={
                          process.env.PUBLIC_URL +
                          "/instructors/" +
                          profile?.user?.id
                        }
                        style={{
                          background: "rgba(8,23,200)",
                          fontSize: "12px",
                          marginLeft: "10px",
                          fontWeight: "bold",
                          fontFamily: "Open Sans",
                          color: "#fff",
                        }}
                      >
                        See Details
                      </Link>
                    </div>
                    <br />
                    <br /> <br />
                    <br />
                  </Col>

                  <Col md="7">
                    <div className="product-information pull-right">
                      <div className="product-title">
                        <h4>{`${profile?.user?.first_name}  ${profile?.user?.last_name}`}</h4>
                      </div>
                      <div className="product-rating d-flex">
                        <div className="review-num">
                          {/* <Link to={process.env.PUBLIC_URL + "/"}>
                          </Link> */}
                        </div>
                      </div>
                      <div className="product-desc">
                        <p
                          style={{
                            border: "none",
                            fontFamily: "Open Sans",
                            color: "#000",
                            fontSize: "14px",
                          }}
                        >
                          {profile.email}
                        </p>
                      </div>
                      <div className="product-stock">
                        <p
                          style={{
                            border: "none",
                            fontFamily: "Open Sans",
                            color: "#000",
                            fontSize: "14px",
                          }}
                        >
                          Role :{" "}
                          <span
                            className="stock"
                            style={{
                              border: "none",
                              fontFamily: "Open Sans",
                              color: "#000",
                              fontSize: "14px",
                            }}
                          >
                            {user_roles[0].name}
                          </span>
                        </p>
                      </div>
                      <br />
                      <br />
                      <br />

                      <div className="product-cart-wh-com-btn">
                        <Link
                          to="/instructor-detail/profile/update"
                          className="cart-btn btn btn-primary"
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
                      </div>
                    </div>
                  </Col>

                  <Col md="12">
                    <div className="product-tab">
                      <Table className="table table-bordered">
                        <tbody>
                          {/*<tr>
                            <td><i
                              className="fa fa-user"
                              style={{ marginRight: "20px" }}
                            ></i>Username</td>
                            <td style={{border:"none"}} className="pull-right">{`${profile?.username}`}</td>
                          </tr>*/}
                          <tr>
                            <td>
                              <i
                                className="fa fa-user"
                                style={{
                                  marginRight: "20px",
                                  border: "none",
                                  color: "#000",
                                  fontSize: "14px",
                                }}
                              ></i>
                              Fisrt Name
                            </td>
                            <td
                              style={{
                                border: "none",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "14px",
                              }}
                              className="pull-right"
                            >{`${profile?.user?.first_name}`}</td>
                          </tr>

                          <tr>
                            <td>
                              <i
                                className="fa fa-user"
                                style={{
                                  marginRight: "20px",
                                  border: "none",
                                  color: "#000",
                                  fontSize: "14px",
                                }}
                              ></i>
                              Last Name
                            </td>
                            <td
                              style={{
                                border: "none",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "14px",
                              }}
                              className="pull-right"
                            >{`${profile?.user?.last_name}`}</td>
                          </tr>

                          <tr>
                            <td>
                              <i
                                className="fa fa-user"
                                style={{
                                  marginRight: "20px",
                                  border: "none",
                                  color: "#000",
                                  fontSize: "14px",
                                }}
                              ></i>
                              Email
                            </td>
                            <td
                              style={{
                                border: "none",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "14px",
                              }}
                              className="pull-right"
                            >{`${profile?.user?.email}`}</td>
                          </tr>
                          <tr>
                            <td>
                              <i
                                className="fa fa-user"
                                style={{
                                  marginRight: "20px",
                                  border: "none",
                                  color: "#000",
                                  fontSize: "14px",
                                }}
                              ></i>
                              Gender
                            </td>
                            <td
                              style={{
                                border: "none",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "14px",
                              }}
                              className="pull-right"
                            >{`${profile?.user?.instructor_profile?.gender}`}</td>
                          </tr>
                          <tr>
                            <td>
                              <i
                                className="fa fa-user"
                                style={{
                                  marginRight: "20px",
                                  border: "none",
                                  color: "#000",
                                  fontSize: "14px",
                                }}
                              ></i>
                              Phone
                            </td>
                            <td
                              style={{
                                border: "none",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "14px",
                              }}
                              className="pull-right"
                            >{`${profile?.user?.phone_number}`}</td>
                          </tr>
                          <tr>
                            <td>
                              <i
                                className="fa fa-user"
                                style={{
                                  marginRight: "20px",
                                  border: "none",
                                  color: "#000",
                                  fontSize: "14px",
                                }}
                              ></i>
                              Employment Status
                            </td>
                            <td
                              style={{
                                border: "none",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "14px",
                              }}
                              className="pull-right"
                            >{`${profile?.user?.instructor_profile?.employment_status}`}</td>
                          </tr>

                          <tr>
                            <td>
                              <i
                                className="fa fa-user"
                                style={{
                                  marginRight: "20px",
                                  border: "none",
                                  color: "#000",
                                  fontSize: "14px",
                                }}
                              ></i>
                              Breif Introduction
                            </td>
                            <td
                              style={{
                                border: "none",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "14px",
                              }}
                              className="pull-right"
                            >{`${profile?.user?.instructor_profile?.brief_introduction}`}</td>
                          </tr>

                          <tr>
                            <td>
                              <i
                                className="fa fa-user"
                                style={{
                                  marginRight: "20px",
                                  border: "none",
                                  color: "#000",
                                  fontSize: "14px",
                                }}
                              ></i>
                              Detailed Introduction
                            </td>
                            <td
                              style={{
                                border: "none",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "14px",
                              }}
                              className="pull-right"
                            >{`${profile?.user?.instructor_profile?.detailed_introduction}`}</td>
                          </tr>

                          <tr>
                            <td
                              style={{
                                fontFamily: "Open Sans",
                                marginRight: "20px",
                                border: "none",
                                color: "#000",
                                fontSize: "14px",
                              }}
                            >
                              <i
                                className="fa fa-user"
                                style={{
                                  marginRight: "20px",
                                  border: "none",
                                  color: "#000",
                                  fontSize: "14px",
                                }}
                              ></i>
                              Education Level
                            </td>
                            <td
                              style={{
                                border: "none",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "14px",
                              }}
                              className="pull-right"
                            >{`${profile?.user?.instructor_profile?.education_level}`}</td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                marginRight: "20px",
                                border: "none",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "14px",
                              }}
                            >
                              <i
                                className="fa fa-user"
                                style={{
                                  marginRight: "20px",
                                  border: "none",
                                  color: "#000",
                                  fontSize: "14px",
                                }}
                              ></i>
                              Degree Obtained
                            </td>
                            <td
                              style={{
                                border: "none",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "14px",
                              }}
                              className="pull-right"
                            >{`${profile?.user?.instructor_profile?.degree_obtained}`}</td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                marginRight: "20px",
                                border: "none",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "14px",
                              }}
                            >
                              <i
                                className="fa fa-user"
                                style={{
                                  marginRight: "20px",
                                  border: "none",
                                  color: "#000",
                                  fontSize: "14px",
                                }}
                              ></i>
                              Date of Birth
                            </td>
                            <td
                              style={{
                                border: "none",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "14px",
                              }}
                              className="pull-right"
                            >{`${profile?.user?.instructor_profile?.date_of_birth}`}</td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                marginRight: "20px",
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
                              style={{
                                border: "none",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "14px",
                              }}
                              className="pull-right"
                            >{`${profile?.user?.instructor_profile?.marital_status}`}</td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                marginRight: "20px",
                                border: "none",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "14px",
                              }}
                            >
                              <i
                                className="fa fa-user"
                                style={{
                                  marginRight: "20px",
                                  border: "none",
                                  fontFamily: "Open Sans",
                                  color: "#000",
                                  fontSize: "14px",
                                }}
                              ></i>
                              LinkedIn
                            </td>
                            <td
                              style={{
                                border: "none",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "14px",
                              }}
                              className="pull-right"
                            >{`${profile?.user?.instructor_profile?.linkedin_url}`}</td>
                          </tr>

                          <tr>
                            <td
                              style={{
                                marginRight: "20px",
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
                                border: "none",
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
                                marginRight: "20px",
                                border: "none",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "14px",
                              }}
                            >
                              Current employer designation
                            </td>
                            <td
                              style={{ border: "none" }}
                              className="pull-right"
                            >{`${profile?.user?.instructor_profile?.current_employer_designation}`}</td>
                          </tr>

                          <tr>
                            <td
                              style={{
                                marginRight: "20px",
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
                                marginRight: "20px",
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

                          <tr>
                            <td
                              style={{
                                marginRight: "20px",
                                border: "none",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "14px",
                              }}
                            >
                              <i
                                className="fa fa-user"
                                style={{
                                  marginRight: "20px",
                                  border: "none",
                                  fontFamily: "Open Sans",
                                  color: "#000",
                                  fontSize: "14px",
                                }}
                              ></i>
                              Brief Introduction
                            </td>
                            <td
                              style={{
                                border: "none",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "14px",
                              }}
                              className="pull-right"
                            >{`${profile?.user?.instructor_profile?.brief_introduction}`}</td>
                          </tr>
                          <tr>
                            <td
                              style={{
                                marginRight: "20px",
                                border: "none",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "14px",
                              }}
                            >
                              <i
                                className="fa fa-user"
                                style={{
                                  marginRight: "20px",
                                  border: "none",
                                  fontFamily: "Open Sans",
                                  color: "#000",
                                  fontSize: "14px",
                                }}
                              ></i>
                              Detailed Introduction
                            </td>
                            <td
                              style={{
                                border: "none",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "14px",
                              }}
                              className="pull-right"
                            >{`${profile?.user?.instructor_profile?.detailed_introduction}`}</td>
                          </tr>
                        </tbody>
                      </Table>
                    </div>
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
    </Styles>
  );
};

InstructorProfiler.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.cart,
  auth: state.auth,
});

export default connect(mapStateToProps, {})(InstructorProfiler);
