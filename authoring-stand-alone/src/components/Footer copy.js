import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import BackToTop from "./common/BackToTop";
import { Styles } from "./styles/footerOne.js";

class Footer extends Component {
  render() {
    return (
      <Styles>
        {/* Footer Area */}
        <footer className="footer1">
          <Container>
            <Row>
              <Col md="4">
                <div className="footer-logo-info">
                  <img
                    src={process.env.PUBLIC_URL + "/assets/images/f-logo.png"}
                    alt=""
                    className="img-fluid"
                  />
                  <p>
                    Lorem ipsum dolor sit amet, consectet adipisicing elit.
                    Saepe porro neque a nam null quos. Adipisci eius unde magnam
                    ad, nisi voluptates.
                  </p>
                  <ul className="list-unstyled">
                    <li>
                      <i className="las la-map-marker"></i>795 South Park
                      Avenue, CA 94107
                    </li>
                    <li>
                      <i className="las la-envelope"></i>enquery@domain.com
                    </li>
                    <li>
                      <i className="las la-phone"></i>+1 908 875 7678
                    </li>
                  </ul>
                </div>
              </Col>
              <Col md="4">
                <div className="f-links">
                  <h5>Useful Links</h5>
                  <ul className="list-unstyled">
                    <li>
                      <Link to={process.env.PUBLIC_URL + "/"}>
                        <i className="las la-angle-right"></i>Terms of Service
                      </Link>
                    </li>
                    <li>
                      <Link to={process.env.PUBLIC_URL + "/"}>
                        <i className="las la-angle-right"></i>Privacy Policy
                      </Link>
                    </li>
                    <li>
                      <Link to={process.env.PUBLIC_URL + "/"}>
                        <i className="las la-angle-right"></i>Trademark Policy
                      </Link>
                    </li>
                    <li>
                      <Link to={process.env.PUBLIC_URL + "/"}>
                        <i className="las la-angle-right"></i>Sitemap
                      </Link>
                    </li>
                    <li>
                      <Link to={process.env.PUBLIC_URL + "/"}>
                        <i className="las la-angle-right"></i>Blog
                      </Link>
                    </li>
                  </ul>
                  <ul className="list-unstyled">
                    <li>
                      <Link to={process.env.PUBLIC_URL + "/"}>
                        <i className="las la-angle-right"></i>Contact Us
                      </Link>
                    </li>
                    <li>
                      <Link to={process.env.PUBLIC_URL + "/"}>
                        <i className="las la-angle-right"></i>About
                      </Link>
                    </li>
                    <li>
                      <Link to={process.env.PUBLIC_URL + "/"}>
                        <i className="las la-angle-right"></i>Events
                      </Link>
                    </li>
                    <li>
                      <Link to={process.env.PUBLIC_URL + "/"}>
                        <i className="las la-angle-right"></i>News
                      </Link>
                    </li>
                    <li>
                      <Link to={process.env.PUBLIC_URL + "/"}>
                        <i className="las la-angle-right"></i>Online Support
                      </Link>
                    </li>
                  </ul>
                </div>
              </Col>
              <Col md="4">
                <div className="f-post"></div>
              </Col>
            </Row>
          </Container>
          <BackToTop />
        </footer>
      </Styles>
    );
  }
}

export default Footer;
