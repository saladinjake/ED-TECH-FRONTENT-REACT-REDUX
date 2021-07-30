import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { Styles } from "./styles/aboutUs.js";
import "./partner.css";

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
        <section className="about-us" style={{ background: "#fff" }}>
          <Container>
            <Row>
              <Col md="6">
                <div className="about-content">
                  <h2
                    className="about-title-x"
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
                    Get Certified!
                  </h2>
                  <p
                    className="about-para-x"
                    style={{
                      fontFamily: "Open Sans",
                      color: "#777",
                      fontSize: "14px",
                    }}
                  >
                    The Questence Digital Learning Centre deploys cutting edge
                    technology to aid your quest for your next certification.
                    Providing unparalled levels of interactivity and
                    convenience.
                    <br />
                    The centre also features Our Certification Pathway
                    programmes which have been designed by best-in-class
                    industry experts. These pathway programmes are guaranteed to
                    help you
                    <br />
                    <span>⦁ Broaden your skillset</span>
                    <br />
                    <span>⦁ Process your knowledge</span>
                    <br />
                    <span>⦁ Ace your certification exams.</span>
                    <br />
                  </p>

                  <Link
                    className="readmore-btn"
                    to={process.env.PUBLIC_URL + "/courses"}
                  >
                    Start Learning
                  </Link>
                </div>
              </Col>
              <Col md="6">
                <div
                  class="grid"
                  style={{
                    width: "100%",
                    margin: "0px auto",
                    marginLeft: "4%",
                    marginTop: "20px",
                  }}
                >
                  <div
                    class="cell-width"
                    style={{ width: "150px", float: "left", margin: "5px" }}
                  >
                    <div class="cell-height">
                      <div class="item">
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/institutions/anan.jpg"
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    class="cell-width"
                    style={{ width: "150px", float: "left", margin: "5px" }}
                  >
                    <div class="cell-height">
                      <div class="item">
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/institutions/cia.png"
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    class="cell-width"
                    style={{ width: "150px", float: "left", margin: "5px" }}
                  >
                    <div class="cell-height">
                      <div class="item">
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/institutions/cibn.jpg"
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    class="cell-width"
                    style={{ width: "150px", float: "left", margin: "5px" }}
                  >
                    <div class="cell-height">
                      <div class="item">
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/institutions/cipm.jpg"
                          }
                        />
                      </div>
                    </div>
                  </div>
                  <div
                    class="cell-width"
                    style={{ width: "150px", float: "left", margin: "5px" }}
                  >
                    <div class="cell-height">
                      <div class="item">
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/institutions/citn.png"
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    class="cell-width"
                    style={{ width: "150px", float: "left", margin: "5px" }}
                  >
                    <div class="cell-height">
                      <div class="item">
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/institutions/ican.jpg"
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    class="cell-width"
                    style={{ width: "150px", float: "left", margin: "5px" }}
                  >
                    <div class="cell-height">
                      <div class="item">
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/institutions/nim.png"
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    class="cell-width"
                    style={{ width: "150px", float: "left", margin: "5px" }}
                  >
                    <div class="cell-height">
                      <div class="item">
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/institutions/ipan.png"
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div
                    class="cell-width"
                    style={{ width: "150px", float: "left", margin: "5px" }}
                  >
                    <div class="cell-height">
                      <div class="item">
                        <img
                          src={
                            process.env.PUBLIC_URL +
                            "/assets/images/institutions/nipr.png"
                          }
                        />
                      </div>
                    </div>
                  </div>
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
