import React, { Component } from "react";
import Datas from "../../data/event/events.json";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";



import $ from "jquery";
import NavBar from "../../components/shared/Navbar";

import Footer from "../../components/shared/Footer";
import { Styles } from "./styles/event.js";

class Events extends Component {
  componentDidMount() {
    $("body").css({ "background-color": "#fff" });
    $(".footer p,.footer span, footer p, footer span").each(function () {
      $(this).css({ color: "#fff", fontFamily: "Open Sans" });
    });
  }
  render() {
    return (
      <Styles>
        {/* Main Wrapper */}
        <div className="main-wrapper event-page">
          {/* Header 2 */}
          <NavBar />

          {/* Events Area */}
          <section className="event-page-area">
            <Container>
              <Row>
                <Col lg="9" md="12">
                  <br />
                  <br />
                  {Datas.map((data, i) => (
                    <div className="event-box card" key={i}>
                      <Row>
                        <Col xl="3" lg="4" md="0">
                          <div className="event-img">
                            <Link to={process.env.PUBLIC_URL + data.eventLink}>
                              <img
                                src={
                                  process.env.PUBLIC_URL +
                                  `/assets/images/${data.eventImg}`
                                }
                                alt=""
                                className="img-fluid"
                              />
                            </Link>
                          </div>
                        </Col>
                        <Col xl="9" lg="8" md="12">
                          <div className="event-content">
                            <div className="content-box">
                              <Row>
                                <Col md="9">
                                  <div className="event-title">
                                    <h6>
                                      <Link
                                        to={
                                          process.env.PUBLIC_URL +
                                          data.eventLink
                                        }
                                      >
                                        {data.eventTitle}
                                      </Link>
                                    </h6>
                                  </div>
                                  <div className="event-time-location">
                                    <ul className="list-unstyled list-inline">
                                      <li className="list-inline-item">
                                        <i className="las la-clock"></i>{" "}
                                        {data.eventTime}
                                      </li>
                                      <li className="list-inline-item">
                                        <i className="las la-map-marker"></i>{" "}
                                        {data.eventLocation}
                                      </li>
                                    </ul>
                                  </div>
                                  <div className="event-desc">
                                    <p>{data.eventdesc}</p>
                                  </div>
                                </Col>
                                <Col md="3" className="text-center">
                                  <div className="event-date">
                                    <p>{data.eventDate}</p>
                                  </div>
                                  <div className="join-btn">
                                    <Link
                                      to={
                                        process.env.PUBLIC_URL + data.eventLink
                                      }
                                    >
                                      Join Now
                                    </Link>
                                  </div>
                                </Col>
                              </Row>
                            </div>
                          </div>
                        </Col>
                      </Row>
                    </div>
                  ))}

                  {/*                  <Col md="12" className="text-center">
                    <Pagination />
                  </Col>*/}
                </Col>

                <Col lg="3" md="0"></Col>
              </Row>
            </Container>
          </section>

          {/* Footer 2 */}
          <Footer />
        </div>
      </Styles>
    );
  }
}

export default Events;
