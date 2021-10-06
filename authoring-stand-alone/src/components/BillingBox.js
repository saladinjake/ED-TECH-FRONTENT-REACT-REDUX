import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { Styles } from "./styles/learnerBox.js";

class ServiceBox extends Component {
  render() {
    return (
      <Styles>
        {/* Service Box */}
        <section className="service-area">
          <Container>
            <Row>
              <Col md="12">
                <div className="service-box-main d-flex">
                  <h4> </h4>
                </div>
              </Col>
            </Row>
            <Row>
              <Col md="6">
                <div className="service-box d-flex">
                  <div className="box-title">
                    <h6>CARD ON FILE</h6>
                    <p>Name: Questence Learner</p>
                    <p>Card Number: 52** **** **** 9898</p>
                    <p>Exp: 10/24</p>
                    <p></p>
                    <Link
                      className="readmore-btn"
                      to={process.env.PUBLIC_URL + "#"}
                    >
                      Update card
                    </Link>
                  </div>
                </div>
              </Col>
            </Row>
            <hr />

            <Row>
              <Col md="12">
                <div className="sec-title text-center">
                  <h4>Transactions</h4>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </Styles>
    );
  }
}

export default ServiceBox;
