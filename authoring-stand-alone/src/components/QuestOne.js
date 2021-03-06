import React, { Component } from "react";
import Datas from "../data/about-us/questone.json";
import { Container, Row, Col } from "react-bootstrap";
import { Styles } from "./styles/questOne.js";

class QuestOne extends Component {
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
                    style={{ color: "#000", fontFamily: "Open Sans" }}
                  >
                    Questence learning tools allow you to create and manage your
                    entire learning portfolio from one powerful dashboard
                  </h4>
                  <p
                    className="about-para"
                    style={{ color: "#000", fontFamily: "Open Sans" }}
                  >
                    Seamlessly see the tasks that need your attention, check
                    when your next class is coming up, and keep up with your
                    progress.{" "}
                  </p>

                  {Datas.dataList.map((data, i) => (
                    <div className="cta-box d-flex" key={i}>
                      <div className="cta-icon text-center">
                        <i className="las la-thumbs-up"></i>
                      </div>
                      <div className="cta-content">
                        <h6 style={{ color: "#000", fontFamily: "Open Sans" }}>
                          {data.iconTitle}
                        </h6>
                        <p style={{ color: "#000", fontFamily: "Open Sans" }}>
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
                    src={process.env.PUBLIC_URL + `/assets/images/sample.png`}
                    className="main-img1"
                    alt=""
                  />
                  <img
                    src={process.env.PUBLIC_URL + `/assets/images/questone.jpg`}
                    className="main-img2"
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

export default QuestOne;
