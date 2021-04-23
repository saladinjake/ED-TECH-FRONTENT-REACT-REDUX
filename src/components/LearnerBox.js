import React from 'react';
import Datas from 'data/service/learnerdash.json';
import { Container, Row, Col } from 'react-bootstrap';
import { Styles } from "./styles/learnerBox.js";

import PropTypes from "prop-types";
import { connect } from "react-redux";

const LearnerBox = ({
  auth: { user },
  info
}) => {
  return (
    <Styles>
      {/* Service Box */}
      <section className="service-area">
        <Container>
          <Row>
            <Col md="12">
              <div className="service-box-main d-flex">
                <h4>Welcome back, {`${user?.first_name}`}</h4>
              </div>
            </Col>
          </Row>
          <Row>
            {/* all_enrollments: 2 ​​​ all_subscriptions */}
            <Col md="3">
              <div className="service-box d-flex">
                <div className="box-title">
                  {/* <h6>ALL COURSES</h6> */}
                  <h6>ALL ENROLLMENTS</h6>
                  <p>{info?.all_enrollments}</p>
                </div>
              </div>
            </Col>
            <Col md="3">
              <div className="service-box d-flex">
                <div className="box-title">
                  {/* <h6>ACTIVE COURSES</h6> */}
                  <h6>ACTIVE SUBSCRIPTIONS</h6>
                  <p>{info?.all_subscriptions}</p>
                </div>
              </div>
            </Col>
            <Col md="3">
              <div className="service-box d-flex">
                <div className="box-title">
                  <h6>UPCOMING COURSES</h6>
                  <p>$count</p>
                </div>
              </div>
            </Col>
            <Col md="3">
              <div className="service-box d-flex">
                <div className="box-title">
                  <h6>EXPIRED COURSES</h6>
                  <p>$count</p>
                </div>
              </div>
            </Col>
          </Row>
          <hr />

          <Row>
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
          </Row>
        </Container>
      </section>
    </Styles>
  );
};


LearnerBox.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {  })(LearnerBox);

// export default LearnerBox;
