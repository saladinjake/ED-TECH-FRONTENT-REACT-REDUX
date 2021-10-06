import React, { Component } from "react";
import Datas from "../data/about-us/business.json";
import { Container, Row, Col } from "react-bootstrap";
import { Styles } from "./styles/institutionAbout.js";

class AboutUsTwo extends Component {
  render() {
    return (
      <Styles>
        {/* About Us 2 */}
        <section className="about-us2">
          <Container>
            <Row>
              <Col md="6">
                <div className="about-content">
                  <h4
                    className="about-title"
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
                    {Datas.secTitle}
                  </h4>
                  <p
                    className="about-para"
                    style={{
                      fontFamily: "Open Sans",
                      color: "#000",
                      fontSize: "14px",
                    }}
                  >
                    {Datas.secDesc}
                  </p>

                  {Datas.dataList.map((data, i) => (
                    <div className="cta-box d-flex" key={i}>
                      <div className="cta-icon text-center">
                        <i className="las la-thumbs-up"></i>
                      </div>
                      <div className="cta-content">
                        <h6
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
                          {data.iconTitle}
                        </h6>
                        <p
                          style={{
                            fontFamily: "Open Sans",
                            color: "#000",
                            fontSize: "14px",
                          }}
                        >
                          {data.iconSubtitle}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>
              </Col>
              <Col md="6">
                <div className="about-image">
                  <img
                    src={
                      process.env.PUBLIC_URL +
                      `/assets/images/business-about.png`
                    }
                    className="main-img1"
                    alt=""
                  />
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </Styles>
    );
  }
}

export default AboutUsTwo;
