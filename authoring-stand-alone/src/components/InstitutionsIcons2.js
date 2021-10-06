import React, { Component } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import Swiper from "react-id-swiper";

import { Styles } from "./styles/aboutUs.js";
import "./partner.css";
import { Styles2 } from "components/styles/courseSlider2.js";

class AboutUs extends Component {
  constructor() {
    super();
    this.state = {
      isOpen: false,
    };
    this.openModal = this.openModal.bind(this);

    //swipper for mobile device
    this.settings = {
      sPerView: 3,
      loop: true,
      speed: 1000,
      // autoplay: {
      //   delay: 3000,
      //   disableOnInteraction: false,
      // },
      spaceBetween: 30,
      watchsVisibility: true,
      pagination: {
        el: ".r-dot.text-center",
        clickable: true,
      },
      breakpoints: {
        0: {
          sPerView: 1,
        },
        576: {
          sPerView: 1,
        },
        768: {
          sPerView: 2,
        },
        992: {
          sPerView: 3,
        },
      },
    };
  }

  componentDidMount() {}

  openModal() {
    this.setState({ isOpen: true });
  }

  render() {
    return (
      <Styles>
        {/* About Us */}
        <section className="about-us" style={{ background: "#fff" }}>
          <div className="container">
            <div className="row">
              <div className="col-md-12 col-sm-12 col-lg-12">
                <div className="about-content" style={{ marginTop: "-60px" }}>
                  <h2
                    className="about-title-x mobile-centry"
                    style={{
                      fontWeight: "300px",
                      color: "#000",
                      fontSize: "45px",
                      fontFamily: "Open Sans",
                      lineHight: "34px",
                      marginTop: "40px",
                      letterSpacing: "-1px",
                      fontWeight: "normal",
                    }}
                  >
                    Professional Exams?
                  </h2>
                  <p
                    className="about-para-x mobile-centry"
                    style={{
                      fontFamily: "Open Sans",
                      color: "#000",
                      fontSize: "14px",
                    }}
                  >
                    The Questence Digital Learning Centre deploys cutting edge
                    technology to help you ace your next professional
                    examination. Providing unparalled levels of interactivity
                    and convenience.
                  </p>
                  <br />
                </div>
              </div>

              <div className="container" style={{ margin: "20px" }}>
                <div className="row">
                  <div className="col-md-12 col-sm-12 col-lg-12">
                    <section class="hide ">
                      <Styles2>
                        <div className="hide vc_row wpb_row row vc_row-fluid vc_custom_1533037364435 vc_row-o-equal-height vc_row-flex">
                          <section class=" hide course-slider-area wpb_column vc_column_container vc_col-sm-12 vc_col-lg-12 vc_col-md-12 col-md-12 ">
                            <Col md="12" className="course-slider col-sm-12">
                              <Swiper {...this.settings}>
                                <div
                                  className=" carded-1box  col-merge-s-2 card-1box two two-third react-box"
                                  style={{
                                    marginTop: "20px",
                                    height: "350px",
                                    marginRight: "20px",
                                  }}
                                >
                                  <div
                                    className=""
                                    style={{
                                      textAlign: "center",
                                      margin: "0px auto",
                                    }}
                                  >
                                    <div className="icon-boxs">
                                      <img
                                        style={{
                                          width: "200px",
                                          height: "200px",
                                        }}
                                        src={
                                          process.env.PUBLIC_URL +
                                          `/assets/images/institutions/nim.png`
                                        }
                                      />
                                    </div>

                                    <div className="head-title"></div>
                                  </div>

                                  <div
                                    style={{
                                      background: "rgba(8,23,200)",
                                      height: "50px",
                                      position: "absolute",
                                      bottom: "-15px",
                                      width: "100%",
                                      marginLeft: "-15px",
                                      borderTop: "1px solid #fafafa",
                                      width: "100%",
                                    }}
                                  >
                                    <a
                                      href={
                                        process.env.PUBLIC_URL + "/institute/3"
                                      }
                                      className="style-9"
                                      style={{
                                        float: "left",
                                        color: "#fff",
                                        borderRadius: "10px",
                                      }}
                                    >
                                      Program
                                    </a>

                                    <a
                                      href={
                                        process.env.PUBLIC_URL + "/institute/3"
                                      }
                                      className="style-9"
                                      style={{
                                        float: "right",
                                        borderRadius: "10px",
                                        color: "#fff",
                                      }}
                                    >
                                      Details{" "}
                                    </a>
                                  </div>
                                </div>

                                <div
                                  className=" carded-1box  col-merge-s-2 card-1box two two-third react-box "
                                  style={{
                                    marginTop: "20px",
                                    height: "350px",
                                    marginRight: "20px",
                                  }}
                                >
                                  <div
                                    className=""
                                    style={{
                                      textAlign: "center",
                                      margin: "0px auto",
                                    }}
                                  >
                                    <div className="icon-boxs">
                                      <img
                                        style={{
                                          width: "200px",
                                          height: "200px",
                                        }}
                                        src={
                                          process.env.PUBLIC_URL +
                                          `/assets/images/institutions/ican.jpg`
                                        }
                                      />
                                    </div>
                                    <div className="head-title"></div>
                                  </div>

                                  <div
                                    style={{
                                      background: "rgba(8,23,200)",
                                      height: "50px",
                                      position: "absolute",
                                      bottom: "-15px",
                                      width: "100%",
                                      marginLeft: "-15px",
                                      borderTop: "1px solid #fafafa",
                                      width: "100%",
                                    }}
                                  >
                                    <a
                                      href={
                                        process.env.PUBLIC_URL + "/institute/2"
                                      }
                                      className="style-9"
                                      style={{
                                        float: "left",
                                        color: "#fff",
                                        borderRadius: "10px",
                                      }}
                                    >
                                      Program
                                    </a>

                                    <a
                                      href={
                                        process.env.PUBLIC_URL + "/institute/2"
                                      }
                                      className="style-9"
                                      style={{
                                        float: "right",
                                        borderRadius: "10px",
                                        color: "#fff",
                                      }}
                                    >
                                      Details{" "}
                                    </a>
                                  </div>
                                </div>

                                <div
                                  className=" carded-1box  col-merge-s-2 card-1box two two-third react-box "
                                  style={{
                                    marginTop: "20px",
                                    height: "350px",
                                    marginRight: "20px",
                                  }}
                                >
                                  <div
                                    className=""
                                    style={{
                                      textAlign: "center",
                                      margin: "0px auto",
                                    }}
                                  >
                                    <div className="icon-boxs">
                                      <img
                                        style={{
                                          width: "200px",
                                          height: "200px",
                                        }}
                                        src={
                                          process.env.PUBLIC_URL +
                                          `/assets/images/institutions/cipm.jpg`
                                        }
                                      />
                                    </div>

                                    <div className="head-title"></div>
                                  </div>

                                  <div
                                    style={{
                                      background: "rgba(8,23,200)",
                                      height: "50px",
                                      position: "absolute",
                                      bottom: "-15px",
                                      width: "100%",
                                      marginLeft: "-15px",
                                      borderTop: "1px solid #fafafa",
                                      width: "100%",
                                    }}
                                  >
                                    <a
                                      href={
                                        process.env.PUBLIC_URL + "/institute/1"
                                      }
                                      className="style-9"
                                      style={{
                                        float: "left",
                                        color: "#fff",
                                        borderRadius: "10px",
                                      }}
                                    >
                                      Program
                                    </a>

                                    <a
                                      href={
                                        process.env.PUBLIC_URL + "/institute/1"
                                      }
                                      className="style-9"
                                      style={{
                                        float: "right",
                                        borderRadius: "10px",
                                        color: "#fff",
                                      }}
                                    >
                                      Details{" "}
                                    </a>
                                  </div>
                                </div>

                                <div
                                  className=" carded-1box  col-merge-s-2 card-1box two two-third react-box "
                                  style={{
                                    marginTop: "20px",
                                    height: "350px",
                                    marginRight: "20px",
                                  }}
                                >
                                  <div
                                    className=""
                                    style={{
                                      textAlign: "center",
                                      margin: "0px auto",
                                    }}
                                  >
                                    <div className="icon-boxs">
                                      <img
                                        style={{
                                          width: "200px",
                                          height: "200px",
                                        }}
                                        src={
                                          process.env.PUBLIC_URL +
                                          `/assets/images/institutions/citn.png`
                                        }
                                      />
                                    </div>

                                    <div className="head-title"></div>
                                  </div>

                                  <div
                                    style={{
                                      background: "rgba(8,23,200)",
                                      height: "50px",
                                      position: "absolute",
                                      bottom: "-15px",
                                      width: "100%",
                                      marginLeft: "-15px",
                                      borderTop: "1px solid #fafafa",
                                      width: "100%",
                                    }}
                                  >
                                    <a
                                      href={
                                        process.env.PUBLIC_URL + "/institute/4"
                                      }
                                      className="style-9"
                                      style={{
                                        float: "left",
                                        color: "#fff",
                                        borderRadius: "10px",
                                      }}
                                    >
                                      Program
                                    </a>

                                    <a
                                      href={
                                        process.env.PUBLIC_URL + "/institute/4"
                                      }
                                      className="style-9"
                                      style={{
                                        float: "right",
                                        borderRadius: "10px",
                                        color: "#fff",
                                      }}
                                    >
                                      Details{" "}
                                    </a>
                                  </div>
                                </div>

                                <div
                                  className=" carded-1box  col-merge-s-2 card-1box two two-third react-box "
                                  style={{
                                    marginTop: "20px",
                                    height: "350px",
                                    marginRight: "20px",
                                  }}
                                >
                                  <div
                                    className=""
                                    style={{
                                      textAlign: "center",
                                      margin: "0px auto",
                                    }}
                                  >
                                    <div className="icon-boxs">
                                      <img
                                        style={{
                                          width: "200px",
                                          height: "200px",
                                        }}
                                        src={
                                          process.env.PUBLIC_URL +
                                          `/assets/images/institutions/anan.jpg`
                                        }
                                      />
                                    </div>
                                    <div className="head-title"></div>
                                  </div>

                                  <div
                                    style={{
                                      background: "rgba(8,23,200)",
                                      height: "50px",
                                      position: "absolute",
                                      bottom: "-15px",
                                      width: "100%",
                                      marginLeft: "-15px",
                                      borderTop: "1px solid #fafafa",
                                      width: "100%",
                                    }}
                                  >
                                    <a
                                      href={
                                        process.env.PUBLIC_URL + "/institute/5"
                                      }
                                      className="style-9"
                                      style={{
                                        float: "left",
                                        color: "#fff",
                                        borderRadius: "10px",
                                      }}
                                    >
                                      Program
                                    </a>

                                    <a
                                      href={
                                        process.env.PUBLIC_URL + "/institute/5"
                                      }
                                      className="style-9"
                                      style={{
                                        float: "right",
                                        borderRadius: "10px",
                                        color: "#fff",
                                      }}
                                    >
                                      Details{" "}
                                    </a>
                                  </div>
                                </div>

                                <div
                                  className=" carded-1box  col-merge-s-2 card-1box two two-third react-box "
                                  style={{
                                    marginTop: "20px",
                                    height: "350px",
                                    marginRight: "20px",
                                  }}
                                >
                                  <div
                                    className=""
                                    style={{
                                      textAlign: "center",
                                      margin: "0px auto",
                                    }}
                                  >
                                    <div className="icon-boxs">
                                      <img
                                        style={{
                                          width: "200px",
                                          height: "200px",
                                        }}
                                        src={
                                          process.env.PUBLIC_URL +
                                          `/assets/images/institutions/ipan.png`
                                        }
                                      />
                                    </div>

                                    <div className="head-title"></div>
                                  </div>

                                  <div
                                    style={{
                                      background: "rgba(8,23,200)",
                                      height: "50px",
                                      position: "absolute",
                                      bottom: "-15px",
                                      width: "100%",
                                      marginLeft: "-15px",
                                      borderTop: "1px solid #fafafa",
                                      width: "100%",
                                    }}
                                  >
                                    <a
                                      href={
                                        process.env.PUBLIC_URL + "/institute/6"
                                      }
                                      className="style-9"
                                      style={{
                                        float: "left",
                                        color: "#fff",
                                        borderRadius: "10px",
                                      }}
                                    >
                                      Program
                                    </a>

                                    <a
                                      href={
                                        process.env.PUBLIC_URL + "/institute/6"
                                      }
                                      className="style-9"
                                      style={{
                                        float: "right",
                                        borderRadius: "10px",
                                        color: "#fff",
                                      }}
                                    >
                                      Details{" "}
                                    </a>
                                  </div>
                                </div>

                                <div
                                  className=" carded-1box  col-merge-s-2 card-1box two two-third react-box "
                                  style={{
                                    marginTop: "20px",

                                    height: "350px",
                                    marginRight: "20px",
                                  }}
                                >
                                  <div
                                    className=""
                                    style={{
                                      textAlign: "center",
                                      margin: "0px auto",
                                    }}
                                  >
                                    <div className="icon-boxs">
                                      <img
                                        style={{
                                          width: "200px",
                                          height: "200px",
                                        }}
                                        src={
                                          process.env.PUBLIC_URL +
                                          `/assets/images/institutions/cibn.jpg`
                                        }
                                      />
                                    </div>
                                    <div className="head-title"></div>
                                  </div>

                                  <div
                                    style={{
                                      background: "rgba(8,23,200)",
                                      height: "50px",
                                      position: "absolute",
                                      bottom: "-15px",
                                      width: "100%",
                                      marginLeft: "-15px",
                                      borderTop: "1px solid #fafafa",
                                      width: "100%",
                                    }}
                                  >
                                    <a
                                      href="#"
                                      className="style-9"
                                      style={{
                                        float: "left",
                                        color: "#fff",
                                        borderRadius: "10px",
                                      }}
                                    >
                                      Program
                                    </a>

                                    <a
                                      href="#"
                                      className="style-9"
                                      style={{
                                        float: "right",
                                        borderRadius: "10px",
                                        color: "#fff",
                                      }}
                                    >
                                      Details{" "}
                                    </a>
                                  </div>
                                </div>

                                <div
                                  className=" carded-1box  col-merge-s-2 card-1box two two-third react-box "
                                  style={{
                                    marginTop: "20px",
                                    height: "350px",
                                    marginRight: "20px",
                                  }}
                                >
                                  <div
                                    className=""
                                    style={{
                                      textAlign: "center",
                                      margin: "0px auto",
                                    }}
                                  >
                                    <div className="icon-boxs">
                                      <img
                                        style={{
                                          width: "200px",
                                          height: "200px",
                                        }}
                                        src={
                                          process.env.PUBLIC_URL +
                                          `/assets/images/institutions/cia.png`
                                        }
                                      />
                                    </div>
                                    <div className="head-title"></div>
                                  </div>

                                  <div
                                    style={{
                                      background: "rgba(8,23,200)",
                                      height: "50px",
                                      position: "absolute",
                                      bottom: "-15px",
                                      width: "100%",
                                      marginLeft: "-15px",
                                      borderTop: "1px solid #fafafa",
                                      width: "100%",
                                    }}
                                  >
                                    <a
                                      href="#"
                                      className="style-9"
                                      style={{
                                        float: "left",
                                        color: "#fff",
                                        borderRadius: "10px",
                                      }}
                                    >
                                      Program
                                    </a>

                                    <a
                                      href="#"
                                      className="style-9"
                                      style={{
                                        float: "right",
                                        borderRadius: "10px",
                                        color: "#fff",
                                      }}
                                    >
                                      Details{" "}
                                    </a>
                                  </div>
                                </div>
                              </Swiper>
                            </Col>
                          </section>
                        </div>
                      </Styles2>
                    </section>

                    <section class="shown">
                      <div class="co">
                        <div
                          className=" carded-1box  col-merge-s-2 card-1box two two-third react-box"
                          style={{
                            marginTop: "20px",
                          }}
                        >
                          <div
                            className=""
                            style={{ textAlign: "center", margin: "0px auto" }}
                          >
                            <div className="icon-boxs">
                              <img
                                style={{ width: "200px", height: "200px" }}
                                src={
                                  process.env.PUBLIC_URL +
                                  `/assets/images/institutions/nim.png`
                                }
                              />
                            </div>

                            <div className="head-title"></div>
                          </div>

                          <div
                            style={{
                              background: "rgba(8,23,200)",
                              height: "50px",
                              position: "absolute",
                              bottom: "-15px",
                              width: "100%",
                              marginLeft: "-15px",
                              borderTop: "1px solid #fafafa",
                              width: "100%",
                            }}
                          >
                            <a
                              href={process.env.PUBLIC_URL + "/institute/3"}
                              className="style-9"
                              style={{
                                float: "left",
                                color: "#fff",
                                borderRadius: "10px",
                              }}
                            >
                              Program
                            </a>

                            <a
                              href={process.env.PUBLIC_URL + "/institute/3"}
                              className="style-9"
                              style={{
                                float: "right",
                                borderRadius: "10px",
                                color: "#fff",
                              }}
                            >
                              Details{" "}
                            </a>
                          </div>
                        </div>

                        <div
                          className=" carded-1box  col-merge-s-2 card-1box two two-third react-box "
                          style={{ marginTop: "20px" }}
                        >
                          <div
                            className=""
                            style={{ textAlign: "center", margin: "0px auto" }}
                          >
                            <div className="icon-boxs">
                              <img
                                style={{ width: "200px", height: "200px" }}
                                src={
                                  process.env.PUBLIC_URL +
                                  `/assets/images/institutions/ican.jpg`
                                }
                              />
                            </div>
                            <div className="head-title"></div>
                          </div>

                          <div
                            style={{
                              background: "rgba(8,23,200)",
                              height: "50px",
                              position: "absolute",
                              bottom: "-15px",
                              width: "100%",
                              marginLeft: "-15px",
                              borderTop: "1px solid #fafafa",
                              width: "100%",
                            }}
                          >
                            <a
                              href={process.env.PUBLIC_URL + "/institute/2"}
                              className="style-9"
                              style={{
                                float: "left",
                                color: "#fff",
                                borderRadius: "10px",
                              }}
                            >
                              Program
                            </a>

                            <a
                              href={process.env.PUBLIC_URL + "/institute/2"}
                              className="style-9"
                              style={{
                                float: "right",
                                borderRadius: "10px",
                                color: "#fff",
                              }}
                            >
                              Details{" "}
                            </a>
                          </div>
                        </div>

                        <div
                          className=" carded-1box  col-merge-s-2 card-1box two two-third react-box "
                          style={{ marginTop: "20px" }}
                        >
                          <div
                            className=""
                            style={{ textAlign: "center", margin: "0px auto" }}
                          >
                            <div className="icon-boxs">
                              <img
                                style={{ width: "200px", height: "200px" }}
                                src={
                                  process.env.PUBLIC_URL +
                                  `/assets/images/institutions/cipm.jpg`
                                }
                              />
                            </div>

                            <div className="head-title"></div>
                          </div>

                          <div
                            style={{
                              background: "rgba(8,23,200)",
                              height: "50px",
                              position: "absolute",
                              bottom: "-15px",
                              width: "100%",
                              marginLeft: "-15px",
                              borderTop: "1px solid #fafafa",
                              width: "100%",
                            }}
                          >
                            <a
                              href={process.env.PUBLIC_URL + "/institute/1"}
                              className="style-9"
                              style={{
                                float: "left",
                                color: "#fff",
                                borderRadius: "10px",
                              }}
                            >
                              Program
                            </a>

                            <a
                              href={process.env.PUBLIC_URL + "/institute/1"}
                              className="style-9"
                              style={{
                                float: "right",
                                borderRadius: "10px",
                                color: "#fff",
                              }}
                            >
                              Details{" "}
                            </a>
                          </div>
                        </div>

                        <div
                          className=" carded-1box  col-merge-s-2 card-1box two two-third react-box "
                          style={{
                            marginTop: "20px",
                          }}
                        >
                          <div
                            className=""
                            style={{ textAlign: "center", margin: "0px auto" }}
                          >
                            <div className="icon-boxs">
                              <img
                                style={{ width: "200px", height: "200px" }}
                                src={
                                  process.env.PUBLIC_URL +
                                  `/assets/images/institutions/citn.png`
                                }
                              />
                            </div>

                            <div className="head-title"></div>
                          </div>

                          <div
                            style={{
                              background: "rgba(8,23,200)",
                              height: "50px",
                              position: "absolute",
                              bottom: "-15px",
                              width: "100%",
                              marginLeft: "-15px",
                              borderTop: "1px solid #fafafa",
                              width: "100%",
                            }}
                          >
                            <a
                              href={process.env.PUBLIC_URL + "/institute/4"}
                              className="style-9"
                              style={{
                                float: "left",
                                color: "#fff",
                                borderRadius: "10px",
                              }}
                            >
                              Program
                            </a>

                            <a
                              href={process.env.PUBLIC_URL + "/institute/4"}
                              className="style-9"
                              style={{
                                float: "right",
                                borderRadius: "10px",
                                color: "#fff",
                              }}
                            >
                              Details{" "}
                            </a>
                          </div>
                        </div>

                        <div
                          className=" carded-1box  col-merge-s-2 card-1box two two-third react-box "
                          style={{
                            marginTop: "20px",
                          }}
                        >
                          <div
                            className=""
                            style={{ textAlign: "center", margin: "0px auto" }}
                          >
                            <div className="icon-boxs">
                              <img
                                style={{ width: "200px", height: "200px" }}
                                src={
                                  process.env.PUBLIC_URL +
                                  `/assets/images/institutions/anan.jpg`
                                }
                              />
                            </div>
                            <div className="head-title"></div>
                          </div>

                          <div
                            style={{
                              background: "rgba(8,23,200)",
                              height: "50px",
                              position: "absolute",
                              bottom: "-15px",
                              width: "100%",
                              marginLeft: "-15px",
                              borderTop: "1px solid #fafafa",
                              width: "100%",
                            }}
                          >
                            <a
                              href={process.env.PUBLIC_URL + "/institute/5"}
                              className="style-9"
                              style={{
                                float: "left",
                                color: "#fff",
                                borderRadius: "10px",
                              }}
                            >
                              Program
                            </a>

                            <a
                              href={process.env.PUBLIC_URL + "/institute/5"}
                              className="style-9"
                              style={{
                                float: "right",
                                borderRadius: "10px",
                                color: "#fff",
                              }}
                            >
                              Details{" "}
                            </a>
                          </div>
                        </div>

                        <div
                          className=" carded-1box  col-merge-s-2 card-1box two two-third react-box "
                          style={{ marginTop: "20px" }}
                        >
                          <div
                            className=""
                            style={{ textAlign: "center", margin: "0px auto" }}
                          >
                            <div className="icon-boxs">
                              <img
                                style={{ width: "200px", height: "200px" }}
                                src={
                                  process.env.PUBLIC_URL +
                                  `/assets/images/institutions/ipan.png`
                                }
                              />
                            </div>

                            <div className="head-title"></div>
                          </div>

                          <div
                            style={{
                              background: "rgba(8,23,200)",
                              height: "50px",
                              position: "absolute",
                              bottom: "-15px",
                              width: "100%",
                              marginLeft: "-15px",
                              borderTop: "1px solid #fafafa",
                              width: "100%",
                            }}
                          >
                            <a
                              href={process.env.PUBLIC_URL + "/institute/6"}
                              className="style-9"
                              style={{
                                float: "left",
                                color: "#fff",
                                borderRadius: "10px",
                              }}
                            >
                              Program
                            </a>

                            <a
                              href={process.env.PUBLIC_URL + "/institute/6"}
                              className="style-9"
                              style={{
                                float: "right",
                                borderRadius: "10px",
                                color: "#fff",
                              }}
                            >
                              Details{" "}
                            </a>
                          </div>
                        </div>

                        <div
                          className=" carded-1box  col-merge-s-2 card-1box two two-third react-box "
                          style={{ marginTop: "20px" }}
                        >
                          <div
                            className=""
                            style={{ textAlign: "center", margin: "0px auto" }}
                          >
                            <div className="icon-boxs">
                              <img
                                style={{ width: "200px", height: "200px" }}
                                src={
                                  process.env.PUBLIC_URL +
                                  `/assets/images/institutions/cibn.jpg`
                                }
                              />
                            </div>
                            <div className="head-title"></div>
                          </div>

                          <div
                            style={{
                              background: "rgba(8,23,200)",
                              height: "50px",
                              position: "absolute",
                              bottom: "-15px",
                              width: "100%",
                              marginLeft: "-15px",
                              borderTop: "1px solid #fafafa",
                              width: "100%",
                            }}
                          >
                            <a
                              href="#"
                              className="style-9"
                              style={{
                                float: "left",
                                color: "#fff",
                                borderRadius: "10px",
                              }}
                            >
                              Program
                            </a>

                            <a
                              href="#"
                              className="style-9"
                              style={{
                                float: "right",
                                borderRadius: "10px",
                                color: "#fff",
                              }}
                            >
                              Details{" "}
                            </a>
                          </div>
                        </div>

                        <div
                          className=" carded-1box  col-merge-s-2 card-1box two two-third react-box "
                          style={{ marginTop: "20px" }}
                        >
                          <div
                            className=""
                            style={{ textAlign: "center", margin: "0px auto" }}
                          >
                            <div className="icon-boxs">
                              <img
                                style={{ width: "200px", height: "200px" }}
                                src={
                                  process.env.PUBLIC_URL +
                                  `/assets/images/institutions/cia.png`
                                }
                              />
                            </div>
                            <div className="head-title"></div>
                          </div>

                          <div
                            style={{
                              background: "rgba(8,23,200)",
                              height: "50px",
                              position: "absolute",
                              bottom: "-15px",
                              width: "100%",
                              marginLeft: "-15px",
                              borderTop: "1px solid #fafafa",
                              width: "100%",
                            }}
                          >
                            <a
                              href="#"
                              className="style-9"
                              style={{
                                float: "left",
                                color: "#fff",
                                borderRadius: "10px",
                              }}
                            >
                              Program
                            </a>

                            <a
                              href="#"
                              className="style-9"
                              style={{
                                float: "right",
                                borderRadius: "10px",
                                color: "#fff",
                              }}
                            >
                              Details{" "}
                            </a>
                          </div>
                        </div>
                      </div>
                    </section>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </Styles>
    );
  }
}

export default AboutUs;
