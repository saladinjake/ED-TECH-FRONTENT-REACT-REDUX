import React, { useState, useEffect, Fragment } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col, Table } from "react-bootstrap";
import NavBar from "components/Navbar";
import Footer from "components/Navbar";
import "react-responsive-carousel/lib/styles/carousel.min.css";
// import FooterTwo from "../../components/FooterTwo";
// import { Styles } from "./styles/productDetails.js";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import Loader from "components/Loader/Loader";
import { getLearnerProfile } from "services/profile";
import toast from "react-hot-toast";

import "./tabnotifications.css"
import Sidebar from "../newdashboard/Sidebar";


import "../newdashboard/assets/css/bootstrap.min.css";
import "../newdashboard/assets/css/core.css";
import "../newdashboard/assets/css/components.css";
import "../newdashboard/assets/css/icons.css";
import "../newdashboard/assets/css/pages.css";
import "../newdashboard/assets/css/responsive.css";
import "./tabnotifications.css"

import $ from 'jquery';
import Popper from 'popper.js';
import 'bootstrap/dist/js/bootstrap.bundle.min';

const LearnerProfiler = ({ auth: { user, user_roles } }) => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);

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
console.log(profile)
  return (
 
   
       <div className="wrapper">

      <div className="content-page">


              
                <div className="content" style={{height:"1200px"}}>
                    <div className="container" >
     
        <NavBar />

    

        <br/><br/> <br/><br/>
        <section className="content">
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
                          className="img-fluid avatar card-box"
                        />
                      </div>
                    </div>
                  </Col>

                  <Col md="7">
                    <div className="product-information card-box">
                      <div className="product-title">
                        <h4>{`${profile.user?.first_name}  ${profile.user?.last_name}`}</h4>
                      </div>
                      <div className="product-rating d-flex">
                        <div className="review-num">
                          
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

                      <div className="product-cart-wh-com-btn">
                        <Link to="/learner/profile/update" className="btn btn-primary">
                          Update Profile
                        </Link>
                      </div>
                    </div>
                  </Col>

                  <Col md="12">
                    <div className="product-tab ">

                    <div className="col-lg-4">
                <div className="panel panel-border panel-success">
                  <div className="panel-heading">
                    <h3 className="panel-title">username</h3>
                  </div>
                  <div className="panel-body">
                    <p>Username 
                    {`${profile.user?.username}`}
                    </p>

                    <p>
                    
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="panel panel-border panel-success">
                  <div className="panel-heading">
                    <h3 className="panel-title">Firstname</h3>
                  </div>
                  <div className="panel-body">
                    <p>{`${profile.user?.first_name}`}
                        </p>
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="panel panel-border panel-success">
                  <div className="panel-heading">
                    <h3 className="panel-title">Lastname</h3>
                  </div>
                  <div className="panel-body">
                    <p>
                      {`${profile.user?.last_name}`}     </p>
                  </div>
                </div>
              </div>
                      <Table className="table table-borderless table-reveal ">
                        <tbody>
                          
                          <tr>
                            <td>Email</td>
                            <td>{`${profile.user?.email}`}</td>
                          </tr>
                          <tr>
                            <td>Gender</td>
                            <td>{`${profile.user.learner_profile?.gender}`}</td>
                          </tr>
                          <tr>
                            <td>Phone</td>
                            <td>{`${profile.user?.phone_number}`}</td>
                          </tr>
                          <tr>
                            <td>Country</td>
                             <td>{`${profile.user.learner_profile?.country_id}`}</td>
                          </tr>
                          
                        </tbody>
                      </Table>



                                          <div className="col-lg-4">
                <div className="panel panel-border panel-success">
                  <div className="panel-heading">
                    <h3 className="panel-title">Date of birth</h3>
                  </div>
                  <div className="panel-body">
                    <p>Username 
                    {`${profile.user.learner_profile?.date_of_birth}`}
                    </p>

                    <p>
                    
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="panel panel-border panel-success">
                  <div className="panel-heading">
                    <h3 className="panel-title">Marital Status</h3>
                  </div>
                  <div className="panel-body">
                    <p>{`${profile.user.learner_profile?.marital_status}`}
                        </p>
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="panel panel-border panel-success">
                  <div className="panel-heading">
                    <h3 className="panel-title">Linkedin Url</h3>
                  </div>
                  <div className="panel-body">
                    <p>{`${profile.user.learner_profile?.linkedin_url}`}
                         </p>
                  </div>
                </div>
              </div>



                          <div className="col-lg-4">
                <div className="panel panel-border panel-success">
                  <div className="panel-heading">
                    <h3 className="panel-title">Educational Level</h3>
                  </div>
                  <div className="panel-body">
                    <p>Username 
                    {`${profile.user.learner_profile?.education_level}`}
                    </p>

                    <p>
                    
                    </p>
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="panel panel-border panel-success">
                  <div className="panel-heading">
                    <h3 className="panel-title">Degree Obtained</h3>
                  </div>
                  <div className="panel-body">
                    <p>{`${profile.user.learner_profile?.degree_obtained}`}
                        </p>
                  </div>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="panel panel-border panel-success">
                  <div className="panel-heading">
                    <h3 className="panel-title">Employment Status</h3>
                  </div>
                  <div className="panel-body">
                    <p>
                      {`${profile.user.learner_profile?.employment_status}`}    </p>
                  </div>
                </div>
              </div>

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
      </div>
      </div>
         <Sidebar />
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
