import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { Styles } from "./styles/aboutUs.js";

class AboutUs extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
    };
    this.openModal = this.openModal.bind(this);
  }

  openModal() {
    this.setState({ isOpen: true });
  }

  render() {
    return (
      <Styles>
        {/* About Us */}
        <br />
        <br />
        <section className="about-us" style={{ background: "#fff" }}>
          <Container>
            <Row>
              <Col md="6">
                <div className="about-image">
                  <img
                    src={process.env.PUBLIC_URL + `/assets/images/lady.png`}
                    className="main-img"
                    alt=""
                  />
                </div>
              </Col>
              <Col md="6">
                <div className="about-content">
                  <h2
                    className="about-title"
                    style={{ fontFamily: "Open Sans" }}
                  >
                    Digital Online Learning
                  </h2>
                  <p
                    className="about-para"
                    style={{ fontFamily: "Open Sans", fontSize: "16px" }}
                  >
                    Looking forward to excellence!!!. Browse through our job
                    opportunities to find your match to grow with excellence. We
                    provide flexible working experience and help you build a
                    successful career path.
                  </p>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </Styles>
    );
  }
}

export default AboutUs;
