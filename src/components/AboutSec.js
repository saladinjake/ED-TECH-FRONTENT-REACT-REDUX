import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import book from "assets/svgs/book.svg";
import professor from "assets/svgs/professor.svg";
import student from "assets/svgs/student.svg";
import university from "assets/svgs/university.svg";
import { Styles } from "./styles/aboutsec.js";

class TabBox extends Component {
  render() {
    return (
      <Styles>
        <section className="mainsect">
          <Container>
            <Row>
              <Col lg="12">
                <div className="features__item shortintro">
                  <h2
                    style={{
                      width: "100%",
                      fontWeight: "300px",
                      color: "#000",
                      fontSize: "24px",
                      fontFamily: "Open Sans",
                      lineHight: "34px",
                      letterSpacing: "-1px",
                      fontWeight: "normal",
                    }}
                  >
                    We Have Experienced Professionals & We <br /> Do Our Best To
                    Achieve Your Goal. Your
                    <br /> Happiness Is Our First Priority.{" "}
                  </h2>
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg="12">
                <div className="features__item">
                  <section class="features__box">
                    <div class="features__box__item">
                      <figure class="features__box__item-icon">
                        <img src={student} alt="student" />
                      </figure>
                      <h3
                        class="mb-xs"
                        style={{
                          fontFamily: "Open Sans",
                          color: "#000",
                          fontSize: "14px",
                        }}
                      >
                        970+ <br></br> Students
                      </h3>
                    </div>
                    <div class="features__box__item">
                      <figure class="features__box__item-icon">
                        <img src={professor} alt="professor" />
                      </figure>
                      <h3
                        class="mb-xs"
                        style={{
                          fontFamily: "Open Sans",
                          color: "#000",
                          fontSize: "14px",
                        }}
                      >
                        100+ <br></br>Instructors
                      </h3>
                    </div>
                    <div class="features__box__item">
                      <figure class="features__box__item-icon">
                        <img src={university} alt="university" />
                      </figure>
                      <h3
                        class="mb-xs"
                        style={{
                          fontFamily: "Open Sans",
                          color: "#000",
                          fontSize: "14px",
                        }}
                      >
                        340+ <br></br>Institutions
                      </h3>
                    </div>
                    <div class="features__box__item">
                      <figure class="features__box__item-icon">
                        <img src={book} alt="book" />
                      </figure>
                      <h3
                        class="mb-xs"
                        style={{
                          fontFamily: "Open Sans",
                          color: "#000",
                          fontSize: "14px",
                        }}
                      >
                        340+ <br></br>Courses
                      </h3>
                    </div>
                  </section>
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg="6">
                <div className="oneup">
                  <img
                    src={process.env.PUBLIC_URL + `/assets/images/mission.jpg`}
                    className="main-img card-box"
                    alt=""
                    width="400px"
                  />
                </div>
              </Col>
              <Col lg="6">
                <div className="oneup">
                  <h3
                    style={{
                      width: "100%",
                      fontWeight: "300px",
                      color: "#000",
                      fontSize: "24px",
                      fontFamily: "Open Sans",
                      lineHight: "34px",
                      letterSpacing: "-1px",
                      fontWeight: "normal",
                    }}
                  >
                    <img
                      src={process.env.PUBLIC_URL + `/assets/images/target.png`}
                      className="icon-img card-box"
                      alt=""
                    />{" "}
                    Our Mission
                  </h3>
                  <p
                    style={{
                      fontFamily: "Open Sans",
                      color: "#000",
                      fontSize: "14px",
                    }}
                  >
                    Acquire new knowledge and skills, train for certifications,
                    diplomas and degrees from world-class institutions at your
                    own pace and space. Acquire new knowledge and skills, train
                    for certifications, diplomas and degrees from world-class
                    institutions at your own pace and space.
                  </p>
                </div>
              </Col>
            </Row>
            <Row>
              <Col lg="6">
                <div className="twoup">
                  <img
                    src={process.env.PUBLIC_URL + `/assets/images/vision.jpg`}
                    className="main-img card-box"
                    alt=""
                    width="400px"
                  />
                </div>
              </Col>
              <Col lg="6">
                <div className="twoup">
                  <h3
                    style={{
                      width: "100%",
                      fontWeight: "300px",
                      color: "#000",
                      fontSize: "24px",
                      fontFamily: "Open Sans",
                      lineHight: "34px",
                      letterSpacing: "-1px",
                      fontWeight: "normal",
                    }}
                  >
                    <img
                      src={process.env.PUBLIC_URL + `/assets/images/vision.png`}
                      className="icon-img card-box"
                      alt=""
                    />{" "}
                    Our Vision
                  </h3>
                  <p
                    style={{
                      fontFamily: "Open Sans",
                      color: "#000",
                      fontSize: "14px",
                    }}
                  >
                    Acquire new knowledge and skills, train for certifications,
                    diplomas and degrees from world-class institutions at your
                    own pace and space. Acquire new knowledge and skills, train
                    for certifications, diplomas and degrees from world-class
                    institutions at your own pace and space.
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

export default TabBox;
