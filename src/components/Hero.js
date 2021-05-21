import React from "react";
import "./styles/hero.scss";
import { Container, Row, Col } from "react-bootstrap";
import { useHistory } from "react-router-dom";

const Hero = () => {
  let history = useHistory();

  return (
    <section className="hero-area">
      <Container>
        <Row>
          <Col lg="7">
            <div className="hero-area__left" style={{ marginTop: "40px" }}>
              <h2>
                Accelerate your quest,<br></br>
                <span>learn</span> anywhere, anytime.
              </h2>
              <p>
                Acquire new knowledge and skills, train for certifications,
                diplomas and degrees from world-class institutions at your own
                pace and space.
              </p>
              <div className="cta">
                <button style={{width:"200px",height:"50px"}} className="btn" onClick={() => history.push("/courses")}>
                  Find Courses
                </button>
                <button
                style={{width:"200px",height:"50px"}}
                  className="outline"
                  onClick={() => history.push("/register")}
                >
                  Sign Up
                </button>
              </div>
            </div>
          </Col>
          {/* <div className="hero-area__right"> */}
          <Col lg="5">
            <figure>
              <img
                style={{ marginTop: "40px" }}
                src={process.env.PUBLIC_URL + `/assets/images/questone.png`}
                className="main-img1"
                alt=""
              />
            </figure>
          </Col>
        </Row>
      </Container>
      {/* </div> */}
    </section>
  );
};

export default Hero;
