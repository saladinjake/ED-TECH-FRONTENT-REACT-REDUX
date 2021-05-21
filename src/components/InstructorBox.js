import React from "react";
import Datas from "../data/service/instructordash.json";
import { Container, Row, Col } from "react-bootstrap";
import { Styles } from "./styles/learnerBox.js";

const InstructorBox = ({ info }) => {
  console.log(info)
  return (
    <Styles>
      {/* Service Box */}
      <section className="service-area">
        <Container>
          <Row>
            <Col md="12">
              <div className="service-box-main d-flex">
                <h4>Welcome back</h4>
              </div>
            </Col>
          </Row>
          <Row>
            <Col md="4">
              <div className="service-box d-flex">
                <div className="box-title">
                  <h6>ACTIVE COURSES</h6>
                  <p>{info?.active_courses}</p>
                </div>
              </div>
            </Col>
            <Col md="4">
              <div className="service-box d-flex">
                <div className="box-title">
                  <h6>PENDING COURSES</h6>
                  <p>{info?.pending_courses}</p>
                </div>
              </div>
            </Col>
            <Col md="4">
              <div className="service-box d-flex">
                <div className="box-title">
                  <h6>DEACTIVATED COURSES</h6>
                  <p>{info?.deactivated_courses}</p>
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

export default InstructorBox;
