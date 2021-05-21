import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./styles/newsletter.scss";

const Newsletter = () => {
  return (
    <section className="newsletter">
      <Container>
        <Row>
          <Col lg="10">
            <h2 className="mb-sm">
              Get our latest news, courses & updates in your box
            </h2>
            <div className="d-flex">
              <div className="form__group">
                <input type="email" name="email" placeholder="Email Address" />
              </div>
              <button style={{width:"160px",padding:"25px"}}>Subscribe Now</button>
            </div>
          </Col>
        </Row>
      </Container>
    </section>
  );
};

export default Newsletter;
