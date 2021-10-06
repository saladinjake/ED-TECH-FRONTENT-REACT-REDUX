import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Styles } from "./styles/pagetitle.js";

export class PageTitle extends Component {
  state = {
    backgroundImage: "qbreadcrumb.jpg",
  };

  render() {
    return (
      <Styles>
        <section
          className="breadcrumb-area"
          style={{
            backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/${this.state.backgroundImage})`,
          }}
        >
          <Container>
            <Row>
              <Col md="12" className="text-left">
                <div className="breadcrumb-box">
                  <h2
                    className="breadcrumb-title"
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
                    Search our courses
                  </h2>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </Styles>
    );
  }
}
