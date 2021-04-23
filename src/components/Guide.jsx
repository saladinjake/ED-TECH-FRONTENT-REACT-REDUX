import React from "react";
import guide from "assets/pngs/guide.png";
import hand from "assets/svgs/hand.svg";
import role from "assets/svgs/role.svg";
import analytics from "assets/svgs/analytics.svg";
import { Container, Row, Col } from "react-bootstrap";

import "./styles/guide.scss";

const Guide = () => {
  return (
    <section className="guide">
      <Container>
        <Row>
          <Col lg="6">
            <div className="guide__item">
              <h4>
                Questence learning tools allows you to create and manage your entire
                learning portfolio from one powerful dashboard
              </h4>
              <div className="guide__box">
                <div className="guide__box__item">
                  <figure>
                    <img src={hand} alt="hand" />
                  </figure>
                  <div className="guide__box__item-info">
                    <h6>Super Easy to Use</h6>
                    <p>
                      Our custom control panel is simple to use and removes the
                      headache of managing your learning.
                    </p>
                  </div>
                </div>

                <div className="guide__box__item">
                  <figure>
                    <img src={analytics} alt="analytics" />
                  </figure>
                  <div className="guide__box__item-info">
                    <h6>Progress Monitoring</h6>
                    <p>
                      Check your progress on your active courses and programmes at any
                      time
                    </p>
                  </div>
                </div>

                <div className="guide__box__item">
                  <figure>
                    <img src={role} alt="role" />
                  </figure>
                  <div className="guide__box__item-info">
                    <h6>Easy Role Management</h6>
                    <p>
                      Switch between your dashboards with a toggle and manage multiple
                      features and functions with the same account
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
