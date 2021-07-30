import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./styles/aboutheader.scss";

const Features = () => {
  return (
    <section className="features">
      <Container>
        <Row>
          <Col lg="7">
            <div className="features__item shortintro-x">
              <br />
              <span>About us</span> <br />
              <br />
              <h2
                style={{
                  fontWeight: "300px",
                  color: "#fff",
                  fontSize: "45px",
                  fontFamily: "Open Sans",
                  lineHight: "34px",
                  letterSpacing: "-1px",
                  fontWeight: "normal",
                }}
              >
                TLorem ipsum dolor sit <br />
                amet, conconsectetur <br />
                adipiscing elit.{" "}
              </h2>
            </div>
          </Col>
          <Col lg="5">
            <img
              src={process.env.PUBLIC_URL + `/assets/images/aboutheaders.jpg`}
              className="main-img"
              alt=""
              width="450px"
            />
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Features;
