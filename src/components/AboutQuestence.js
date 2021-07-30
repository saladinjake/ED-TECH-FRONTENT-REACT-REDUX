import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { Styles } from "./styles/aboutUs.js";

class AboutUs extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
    };
    this.openModal = this.openModal.bind(this);
  }

  openModal() {
    this.setState({ isOpen: true });
  }

  render() {
    return (
      <Styles>
        {/* About Us */}
        <br/><br/>
        <section className="about-us" style={{background:"#fff"}}>
          <Container>
            <Row>
              <Col md="6">
                <div className="about-image">
                  <img
                    src={process.env.PUBLIC_URL + `/assets/images/lady.png`}
                    className="main-img"
                    alt=""
                  />
                </div>
              </Col>
              <Col md="6">
                <div className="about-content">
                  <h2 className="about-title" style={{ fontFamily:"Open Sans"}}>
                   Digital Online Learning 
                  </h2>
                  <p className="about-para" style={{ fontFamily:"Open Sans", fontSize:"16px"}}>
                    At Questence, the whole world is your classroom.

We are dedicated to empowering you with  education and skills training from the best tutors, thereby being a positive force social change, while creating opportunities, prosperity, and equality for all.

For institutions, we are a platform through which you can educate the world. For companies, we provide secure white-label platforms where employees can be trained and upskilled.

We are your partner-of-choice for online learning.
                  </p>
                  <Link
                    className="readmore-btn"
                    to={process.env.PUBLIC_URL + "/courses"}
                  >
                    Find a course now
                  </Link>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </Styles>
    );
  }
}

export default AboutUs;
