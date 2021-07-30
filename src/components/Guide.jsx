import React, { useEffect } from "react";
import guide from "assets/pngs/guide.png";
import hand from "assets/svgs/hand.svg";
import role from "assets/svgs/role.svg";
import analytics from "assets/svgs/analytics.svg";
import { Container, Row, Col } from "react-bootstrap";
import $ from "jquery";

import "./styles/guide.scss";

const Guide = () => {
  useEffect(() => {
    $(".guide h1,.guide h2, .guide h3,.guide h4, .guide h5").each(function () {
      $(this).css({ color: "#000" });
    });
  });
  return (


 




 

 




 

 




 

 

    <section className="guide" style={{ background: "#fff" }}>
      <Container>
        <Row>
          <Col lg="6">
            <div className="guide__item">
              <h4
                className="mobile-centry"
                style={{
                  fontWeight: "300px",
                  color: "#000",
                  fontSize: "24px",
                  fontFamily: "Open Sans",
                  lineHight: "80px",
                }}
              >
                The Questence platform allows you plan and learn at your 
                own pace and in your own style.

              </h4>
              <div className="guide__box">
                <div className="guide__box__item">
                  <figure>
                    <img src={hand} alt="hand" />
                  </figure>
                  <div className="guide__box__item-info">
                    <h6
                      className="reset-h6 "
                      style={{
                        fontWeight: "300px",
                        color: "#000",
                        fontSize: "24px",
                        fontFamily: "Open Sans",
                        lineHight: "80px",
                      }}
                    >
                     Easy to Use
                    </h6>
                    <p
                      style={{
                        fontFamily: "Open Sans",
                        color: "#000",
                        fontSize: "14px",
                      }}
                    >
                      Easily enrol and schedule your classes.
                    </p>
                  </div>
                </div>


                <div className="guide__box__item">
                  <figure>
                    <img src={analytics} alt="analytics" />
                  </figure>
                  <div className="guide__box__item-info">
                    <h6
                      className="reset-h6"
                      style={{
                        fontWeight: "300px",
                        color: "#000",
                        fontSize: "24px",
                        fontFamily: "Open Sans",
                        lineHight: "80px",
                      }}
                    >
                     Certification Pathways
                    </h6>
                    <p
                      style={{
                        fontFamily: "Open Sans",
                        color: "#000",
                        fontSize: "14px",
                      }}
                    >
                      Ease your path to professional certifications by choosing 
                      standalone courses or multiple programmes.


                    </p>
                  </div>
                </div>


                



                <div className="guide__box__item">
                  <figure>
                    <img src={analytics} alt="analytics" />
                  </figure>
                  <div className="guide__box__item-info">
                    <h6
                      className="reset-h6"
                      style={{
                        fontWeight: "300px",
                        color: "#000",
                        fontSize: "24px",
                        fontFamily: "Open Sans",
                        lineHight: "80px",
                      }}
                    >
                      Learn with your Peers
                    </h6>
                    <p
                      style={{
                        fontFamily: "Open Sans",
                        color: "#000",
                        fontSize: "14px",
                      }}
                    >
                      Form tutorial groups with fellow learners and review lessons 
                      together with or without your instuctor present. Post questions
                       either to the instructor, or to your classmates.

                    </p>
                  </div>
                </div>

                <div className="guide__box__item">
                  <figure>
                    <img src={role} alt="role" />
                  </figure>
                  <div className="guide__box__item-info">
                    <h6
                      className="reset-h6"
                      style={{
                        fontWeight: "300px",
                        color: "#000",
                        fontSize: "24px",
                        fontFamily: "Open Sans",
                        lineHight: "80px",
                      }}
                    >
                      Live and Recorded Classes
                    </h6>
                    <p
                      style={{
                        fontFamily: "Open Sans",
                        color: "#000",
                        fontSize: "14px",
                      }}
                    >
                      Attend your class live or watch the recording at your convenience.

                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col lg="6">
            <div className="guide__figure">
              <figure>
                <img src={guide} alt="guide" />
              </figure>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Guide;
