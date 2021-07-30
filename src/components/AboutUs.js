import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { Styles } from "./styles/aboutUs.js";
import $ from "jquery";

class AboutUs extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
    };
    this.openModal = this.openModal.bind(this);
  }

  componentDidMount() {
    $(".about-us h1,.about-us h2,.about-us h3,.about-us h4,.about-us h5").each(
      function () {
        $(this).css({ color: "#000" });
      }
    );
  }

  openModal() {
    this.setState({ isOpen: true });
  }

  render() {
    return (
      <Styles>
        {/* About Us */}
        <section className="about-us" style={{ background: "#fafafa" }}>
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
                    className="about-title-x head__style-2 mobile-centry"
                    style={{
                      fontWeight: "300px",
                      color: "#000",
                      fontSize: "45px",
                      fontFamily: "Open Sans",
                      lineHight: "34px",
                      letterSpacing: "-1px",
                      fontWeight: "normal",
                    }}
                  >
                    Building new skill with ease and earn recognized credential
                  </h2>
                  <p
                    className="about-para-x mobile-centry"
                    style={{
                      fontFamily: "Open Sans",
                      color: "#000",
                      fontSize: "14px",
                    }}
                  >
                    Learn anytime, anywhere, at your own pace and in your own
                    space with an interactive, multimedia content provided by
                    world-class institutions and trainers, while receiving
                    instant feedback through online exercises and grading. And
                    you have the option to earn a verified certificate upon
                    successful completion of a course.
                  </p>
                  <div className="mobile-centry entry-center">
                    <Link
                      style={{
                        textAlign: "center",
                        background: "#0253c8",

                        height: "40px",
                        fontFamily: "Open Sans",

                        color: "#fff",
                        fontSize: "14px",
                        fontWeight: "normal",
                        marginLeft: "10px",
                        marginTop: "25px",

                        transition: "0.5s ease-in-out",
                      }}
                      className="readmore-btn "
                      to={process.env.PUBLIC_URL + "/courses"}
                    >
                      Start Learning
                    </Link>
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
