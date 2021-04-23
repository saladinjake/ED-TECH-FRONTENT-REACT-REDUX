import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'react-bootstrap';
import { Styles } from "./styles/aboutUs.js";

class AboutUs extends Component {
    constructor() {
        super()
        this.state = {
            isOpen: false
        }
        this.openModal = this.openModal.bind(this)
    }

    openModal() {
        this.setState({ isOpen: true })
    }

    render() {
        return (
          <Styles>
            {/* About Us */}
            <section className="about-us">
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
                      <h2 className="about-title">
                      Building new skill with ease and earn recognized credential
                      </h2>
                      <p className="about-para">
                      Learn anytime, anywhere, at your own pace and in your own space with an interactive, multimedia 
                      content provided by world-class institutions and trainers, while receiving instant feedback 
                      through online exercises and grading. And you have the option to earn a verified certificate 
                      upon successful completion of a course.
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

export default AboutUs
