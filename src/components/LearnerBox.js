import React from "react";
import Datas from "data/service/learnerdash.json";
import { Container, Row, Col } from "react-bootstrap";
import { Styles } from "./styles/learnerBox.js";

import PropTypes from "prop-types";
import { connect } from "react-redux";

const LearnerBox = ({ auth: { user }, info }) => {
  return (
    <Styles>
      {/* Service Box */}
      <section className="service-area">
        <Container>
          <Row>
            {/* all_enrollments: 2 ​​​ all_subscriptions */}
            <Col md="3">
              <div className="service-box d-flex">
                <a href="#" className="modal-link">
                  <div className="box-title">
                    {/* <h6>ALL COURSES</h6> */}
                    <h6>Login</h6>
                    <p style={{ color: "#000" }}>Resume your learning</p>
                  </div>
                </a>
              </div>
            </Col>
            <Col md="3">
              <div className="service-box d-flex">
                <a href="#" className="modal-link2">
                  <div className="box-title">
                    {/* <h6>ACTIVE COURSES</h6> */}
                    <h6>Signup</h6>
                    <p style={{ color: "#000" }}>
                      Sign up to enroll for our courses
                    </p>
                  </div>
                </a>
              </div>
            </Col>
            <Col md="3">
              <div className="service-box d-flex">
                <a href="./help">
                  <div className="box-title">
                    <h6>Support</h6>
                    <p style={{ color: "#000" }}>Visit our support page</p>
                  </div>
                </a>
              </div>
            </Col>
            <Col md="3">
              <div className="service-box d-flex">
                <div className="box-title">
                  <h6>Courses</h6>
                  <p style={{ color: "#000" }}>Browse our courses</p>
                </div>
              </div>
            </Col>
          </Row>
          <hr />

          {/*<Row>
            <Col md="12">
              <div className="sec-title text-center">
                <h4>What would you like to do next?</h4>
              </div>
            </Col>
            {Datas.dataList.map((data, i) => (
              <Col md="4" key={i}>
                <div className="service-box d-flex">
                  <div className="box-icon">
                    <i className={data.boxIcon}></i>
                  </div>
                  <div className="box-title">
                    <h6>{data.title}</h6>
                    <p>{data.subTitle}</p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>*/}
        </Container>
      </section>
    </Styles>
  );
};

LearnerBox.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(LearnerBox);

// export default LearnerBox;
