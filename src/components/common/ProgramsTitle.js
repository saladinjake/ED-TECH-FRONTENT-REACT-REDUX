import React, { Component } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Styles } from "./styles/pagetitle.js";

export class ProgramsTitle extends Component {
  state = {
    backgroundImage: "qbreadcrumb.jpg",
  };

  render() {
    return (
      <Styles>
        <section
          className="breadcrumb-area article-dummy"
          style={{
            backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/${this.state.backgroundImage})`,
          }}
        >
          <Container>
            <Row>
              <Col md="12" className="text-left">
                <div className="breadcrumb-box">
                  <h2 className="breadcrumb-title">Search our programs</h2>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </Styles>
    );
  }
}
