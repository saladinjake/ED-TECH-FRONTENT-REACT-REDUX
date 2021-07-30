import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./styles/newsletter.scss";

const Newsletter = () => {
  return (
    <section className="newsletter">
      <Container>
        <Row>
          <Col lg="10">
            <h2
              className="mb-sm"
              style={{
                width: "100%",
                fontWeight: "300px",
                color: "#fff",
                fontSize: "24px",
                fontFamily: "Open Sans",
                lineHight: "34px",
                letterSpacing: "-1px",
                fontWeight: "normal",
              }}
            >
              Get our latest news, courses & updates in your box
            </h2>
            <div className="d-flex">
              <div className="form__group">
                <input type="email" name="email" placeholder="Email Address" />
              </div>

              <button
                style={{
                  width: "160px",
                  padding: "25px",
                  background: "rgb(2, 83, 200)",
                  color: "#fff",

                  zIndex: "25",
                }}
              >
                <b
                  style={{
                    textTransform: "capitalize",
                    fontFamily: "Open Sans",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  Subscribe Now
                </b>
              </button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Newsletter;
