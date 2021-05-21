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

  return (
    <Styles>
      {/* Main Wrapper */}
      <div className="main-wrapper product-details-page">
        {/* Header 2 */}
        <InstructorNavBar />

        {/* Breadcroumb */}
        <BreadcrumbBox title="Profile" />

        {/* Product Details */}
        <br/><br/><br/><br/>
        <section className="">
          <Container>
            {loading ? (
              <Loader width="70" />
            ) : Object.entries(profile).length !== 0 ? (
              <Fragment>
                <Row>
                  <Col md="5">
                    <div className="product-slider">
                      <div className="slider-item">
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            `/assets/images/product-01.jpg`
                          }
                          alt=""
                          height="200"
                        width="200"
                        alt=""
                        className="circle card-box"
                        />
                      </div>
                    </div>
                  </Col>

                  <Col md="7">
                    <div className="product-information pull-right">
                      <div className="product-title">
                        <h4>{`${profile?.first_name}  ${profile?.last_name}`}</h4>
                      </div>
                      <div className="product-rating d-flex">
                        <div className="review-num">
                          {/* <Link to={process.env.PUBLIC_URL + "/"}>
                          </Link> */}
                        </div>
                      </div>
                      <div className="product-desc">
                        <p>{profile.email}</p>
                      </div>
                      <div className="product-stock">
                        <p>
                          User type :{" "}
                          <span className="stock">{user_roles[0].name}</span>
                        </p>
                      </div>
                      <br/><br/><br/>

                      <div className="product-cart-wh-com-btn">
                        <Link
                          to="/instructor-detail/profile/update"
                          className="cart-btn btn btn-primary"
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
                          <tr>
                            <td><i
                              className="fa fa-user"
                              style={{ marginRight: "20px" }}
                            ></i>Username</td>
                            <td style={{border:"none"}} className="pull-right">{`${profile?.username}`}</td>
                          </tr>
                          <tr>
                            <td><i
                              className="fa fa-user"
                              style={{ marginRight: "20px" }}
                            ></i>Fisrt Name</td>
                            <td style={{border:"none"}} className="pull-right">{`${profile?.first_name}`}</td>
                          </tr>
                          <tr>
                            <td><i
                              className="fa fa-user"
                              style={{ marginRight: "20px" }}
                            ></i>Last Name</td>
                            <td style={{border:"none"}} className="pull-right">{`${profile?.last_name}`}</td>
                          </tr>
                          <tr>
                            <td><i
                              className="fa fa-user"
                              style={{ marginRight: "20px" }}
                            ></i>Email</td>
                            <td style={{border:"none"}} className="pull-right">{`${profile?.email}`}</td>
                          </tr>
                          <tr>
                            <td><i
                              className="fa fa-user"
                              style={{ marginRight: "20px" }}
                            ></i>Gender</td>
                            <td style={{border:"none"}} className="pull-right">{`${profile?.instructor_profile?.gender}`}</td>
                          </tr>
                          <tr>
                            <td><i
                              className="fa fa-user"
                              style={{ marginRight: "20px" }}
                            ></i>Phone</td>
                            <td style={{border:"none"}} className="pull-right">{`${profile?.phone_number}`}</td>
                          </tr>
                          <tr>
                            <td><i
                              className="fa fa-user"
                              style={{ marginRight: "20px" }}
                            ></i>Employment Status</td>
                            <td style={{border:"none"}} className="pull-right">{`${profile?.instructor_profile?.employment_status}`}</td>
                          </tr>
                          <tr>
                            <td><i
                              className="fa fa-user"
                              style={{ marginRight: "20px" }}
                            ></i>Education Level</td>
                            <td style={{border:"none"}} className="pull-right">{`${profile?.instructor_profile?.education_level}`}</td>
                          </tr>
                          <tr>
                            <td><i
                              className="fa fa-user"
                              style={{ marginRight: "20px" }}
                            ></i>Degree Obtained</td>
                            <td style={{border:"none"}} className="pull-right">{`${profile?.instructor_profile?.degree_obtained}`}</td>
                          </tr>
                          <tr>
                            <td><i
                              className="fa fa-user"
                              style={{ marginRight: "20px" }}
                            ></i>Date of Birth</td>
                            <td style={{border:"none"}} className="pull-right">{`${profile?.instructor_profile?.instructor_profile}`}</td>
                          </tr>
                          <tr>
                            <td><i
                              className="fa fa-user"
                              style={{ marginRight: "20px" }}
                            ></i>Marital Status</td>
                            <td style={{border:"none"}} className="pull-right">{`${profile?.instructor_profile?.marital_status}`}</td>
                          </tr>
                          <tr>
                            <td><i
                              className="fa fa-user"
                              style={{ marginRight: "20px" }}
                            ></i>LinkedIn</td>
                            <td style={{border:"none"}} className="pull-right">{`${profile?.instructor_profile?.linkedin_url}`}</td>
                          </tr>
                          
                        </tbody>
                      </Table>



                       <h1>My Courses</h1>
                       <hr/>

                       <table className="table table-borderless table-reveal">
                          <thead>
                            <tr>
                              <th scope="col">Course Name</th>
                              <th scope="col">Course Created Date</th>
                              <th scope="col">Course End Date</th>
                              <th scope="col" className="pull-right">Last Updated</th>
                            </tr>
                          </thead>
                          <tbody>
                      

                       

                        {profile?.instructor_profile?.courses.length > 0 && profile?.instructor_profile?.courses.map(course =>{
                           return (

                            <tr>
                            <td>{`${course?.course_name}`}</td>
                            <td> {getTimeAgoInterval(new Date(course?.start_date)) }</td>
                            <td> {getTimeAgoInterval(new Date(course?.end_date)) }</td>

                            <td className="pull-right"> {getTimeAgoInterval(new Date(course?.updated_at)) }</td>
                          </tr>


                           )
                        })}
                         
                         
                        </tbody>
                      </table>

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
