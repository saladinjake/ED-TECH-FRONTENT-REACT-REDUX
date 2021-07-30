import React, { useEffect } from "react";
import "./box-sizer.css";

import $ from "jquery";
import { Container, Row, Col } from "react-bootstrap";
import Swiper from "react-id-swiper";
import { Styles } from "components/styles/courseSlider.js";


const Section = () => {
  useEffect(()=>{
    $("#bg-image").css({
      "background": process.env.PUBLIC_URL+ "/assets/images/H4-Parallax-3.jpg",
       
       "z-index":"900"
     })
    $("body").css({"z-index":1})
  })


  //swipper for mobile device
  const settings = {
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

  return (
    <div >
    <div style={{clear:"both"}} ></div>
      <br />
      <br />
      <br />
      <br />
      <div
       id="bg-image"
        style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/H4-Parallax-3.jpg)`,
          backgroundSize: "cover",
          zIndex:"9899999999999"
        }}
      >
        <div
          className="container main-center-x shown"
         
        >
          <div className="child-center-x"  >
            <div className="mobile-centry-x"  >
              <br />
              <h1
                className="mobile-centry"
                style={{
                  fontWeight: "300px",
                  color: "#000",
                  fontSize: "45px",
                  fontFamily: "Montserrat",
                  lineHight: "34px",
                  letterSpacing: "-1px",
                  fontWeight: "normal",
                }}
              >
                Categories
              </h1>
              <br />
            </div>

            <div class="shown "  style={{
          backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/H4-Parallax-3.jpg)`,
          backgroundSize: "cover",
          zIndex:"9899999999999"
        }} >
              <div
                className="carded-1box  col-merge-s-2 card-1box one "
                style={{ marginTop: "20px" }}
              >
                <div
                  className="style-9"
                  style={{ textAlign: "center", margin: "0px auto" }}
                >
                  <div className="icon-boxs">
                    <i className="fa fa-institution fa-3x midnight"></i>
                  </div>
                  <div className="head-title">
                    <h1 style={{ lineHight: "-10px", marginTop: "-10px" }}>
                      ARTS & HUMANITIES
                    </h1>
                  </div>
                  <div
                    className="detail-sections"
                    style={{ marginTop: "10px" }}
                  >
                    <p className="information bump-up-text ">
                      Education, History, Politics, Sociology, Geography, Law,
                      Psycology, Media, Architecture
                    </p>
                  </div>
                </div>

                <div className="details-window-animated up "></div>

                <div
                  style={{
                    background: "rgba(8,23,200)",
                    height: "40px",
                    position: "absolute",
                    marginLeft: "-15px",
                    bottom: "0px",
                    borderTop: "1px solid #fafafa",
                    width: "100%",
                  }}
                >
                  <a
                    href="./courses/category/10"
                    className="style-9"
                    style={{
                      float: "left",
                      color: "#fff",
                      borderRadius: "10px",
                    }}
                  >
                    Category{" "}
                  </a>

                  <a
                    href="./courses/category/10"
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
                className="carded-1box  col-merge-s-2 card-1box one "
                style={{ marginTop: "20px" }}
              >
                <div
                  className="style-9"
                  style={{ textAlign: "center", margin: "0px auto" }}
                >
                  <div className="icon-boxs">
                    <i className="fa fa-briefcase fa-3x maroon"></i>
                  </div>
                  <div className="head-title">
                    <h1 style={{ lineHight: "-10px", marginTop: "-10px" }}>
                      BUSINESS & OPERATIONS MANAGEMENT
                    </h1>
                  </div>
                  <div className="detail-sections">
                    <p
                      className="information bump-up-text"
                      style={{ marginTop: "-15px" }}
                    >
                      Human Resource Adminstration, Leadership And Management,
                      Finance And Banking, Accounting, Business Process
                      Management, Service Management, Sales And Marketing
                      Management, Supply Chain Management, Risk Management,
                      Customer Service
                    </p>
                  </div>
                </div>

                <div className="details-window-animated up"></div>
                <div
                  style={{
                    background: "rgba(8,23,200)",
                    height: "50px",
                    position: "absolute",
                    marginLeft: "-15px",
                    bottom: "-10px",
                    borderTop: "1px solid #fafafa",
                    width: "100%",
                  }}
                >
                  <a
                    href="./courses/category/2"
                    className="style-9"
                    style={{
                      float: "left",
                      color: "#fff",
                      borderRadius: "10px",
                    }}
                  >
                    Category{" "}
                  </a>

                  <a
                    href="./courses/category/2"
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
                className="carded-1box  col-merge-s-2 card-1box one "
                style={{ marginTop: "20px" }}
              >
                <div
                  className="style-9"
                  style={{ textAlign: "center", margin: "0px auto" }}
                >
                  <div className="icon-boxs">
                    <i className="fa fa-wrench fa-3x sky"></i>
                  </div>
                  <div className="head-title">
                    <h1 style={{ lineHight: "-10px", marginTop: "-10px" }}>
                      ENGINEERING
                    </h1>
                  </div>
                  <div
                    className="detail-sections"
                    style={{ marginTop: "10px" }}
                  >
                    <p className="information bump-up-text">
                      Computer Engineering, Electrical Engineering, Mechanical
                      Engineering, Chemical Engineering, Civil Engineering
                    </p>
                  </div>
                </div>

                <div className="details-window-animated up"></div>
                <div
                  style={{
                    background: "rgba(8,23,200)",
                    height: "50px",
                    position: "absolute",
                    marginLeft: "-15px",
                    bottom: "-10px",
                    borderTop: "1px solid #fafafa",
                    width: "100%",
                  }}
                >
                  <a
                    href="./courses/category/8"
                    className="style-9"
                    style={{
                      float: "left",
                      color: "#fff",
                      borderRadius: "10px",
                    }}
                  >
                    Category{" "}
                  </a>

                  <a
                    href="./courses/category/8"
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
                className="carded-1box  col-merge-s-2 card-1box one "
                style={{ marginTop: "20px" }}
              >
                <div
                  className="style-9"
                  style={{ textAlign: "center", margin: "0px auto" }}
                >
                  <div className="icon-boxs">
                    <i className="fa fa-arrows-alt fa-3x beige"></i>
                  </div>
                  <div className="head-title">
                    <h1 style={{ lineHight: "-10px", marginTop: "-10px" }}>
                      PHYSICAL SCIENCES
                    </h1>
                  </div>

                  <div
                    className="detail-sections"
                    style={{ marginTop: "10px" }}
                  >
                    <p className="information bump-up-text">
                      Biology, Physics, Chemistry, Environmental Studies,
                      Agricultural Science
                    </p>
                  </div>
                </div>

                <div className="details-window-animated up"></div>
                <div
                  style={{
                    background: "rgba(8,23,200)",
                    height: "50px",
                    position: "absolute",
                    marginLeft: "-15px",
                    bottom: "-10px",
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
                    Category{" "}
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

            <div>
              <div
                className="carded-1box  col-merge-s-2 card-1box one "
                style={{ marginTop: "20px" }}
              >
                <div
                  className="style-9"
                  style={{ textAlign: "center", margin: "0px auto" }}
                >
                  <div className="icon-boxs">
                    <i className="fa fa-line-chart fa-3x antiquewhite"></i>
                  </div>
                  <div className="head-title">
                    <h1 style={{ lineHight: "-10px", marginTop: "-10px" }}>
                      MATHEMATICS
                    </h1>
                  </div>
                  <div
                    className="detail-sections"
                    style={{ marginTop: "10px" }}
                  >
                    <p className="information bump-up-text">
                      Calculus, Probability And Statistics, Algebra
                    </p>
                  </div>
                </div>

                <div className="details-window-animated up"></div>
                <div
                  style={{
                    background: "rgba(8,23,200)",
                    height: "50px",
                    position: "absolute",
                    marginLeft: "-15px",
                    bottom: "-10px",
                    borderTop: "1px solid #fafafa",
                    width: "100%",
                  }}
                >
                  <a
                    href="./courses/category/39"
                    className="style-9"
                    style={{
                      float: "left",
                      color: "#fff",
                      borderRadius: "10px",
                    }}
                  >
                    Category{" "}
                  </a>

                  <a
                    href="./courses/category/39"
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
                className="carded-1box  col-merge-s-2 card-1box one "
                style={{ marginTop: "20px" }}
              >
                <div
                  className="style-9"
                  style={{ textAlign: "center", margin: "0px auto" }}
                >
                  <div className="icon-boxs">
                    <i className="fa fa-code fa-3x azure "></i>
                  </div>
                  <div className="head-title">
                    <h1 style={{ lineHight: "-10px", marginTop: "-10px" }}>
                      COMPUTER SCIENCE & INFORMATION TECHNOLOGY
                    </h1>
                  </div>
                  <div
                    className="detail-sections"
                    style={{ marginTop: "40px" }}
                  >
                    <p
                      className="information bump-up-text"
                      style={{ marginTop: "-40px" }}
                    >
                      Computer Science, Neonerking And Security, Software
                      Development, Digital Marketing, IT Management
                    </p>
                  </div>
                </div>

                <div className="details-window-animated up"></div>
                <div
                  style={{
                    background: "rgba(8,23,200)",
                    height: "50px",
                    position: "absolute",
                    marginLeft: "-15px",
                    bottom: "-10px",
                    borderTop: "1px solid #fafafa",
                    width: "100%",
                  }}
                >
                  <a
                    href="./courses/category/1"
                    className="style-9"
                    style={{
                      float: "left",
                      color: "#fff",
                      borderRadius: "10px",
                    }}
                  >
                    Category{" "}
                  </a>

                  <a
                    href="./courses/category/1"
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
                className="carded-1box  col-merge-s-2 card-1box one "
                style={{ marginTop: "20px" }}
              >
                <div
                  className="style-9"
                  style={{ textAlign: "center", margin: "0px auto" }}
                >
                  <div className="icon-boxs">
                    <i className="fa fa-balance-scale fa-3x mediumvioletred"></i>
                  </div>
                  <div className="head-title">
                    <h1 style={{ lineHight: "-10px", marginTop: "-10px" }}>
                      LAW & SOCIAL SCIENCES
                    </h1>
                  </div>
                  <div
                    className="detail-sections"
                    style={{ marginTop: "10px" }}
                  >
                    <p className="information bump-up-text">
                      Economics, Law, Psycology
                    </p>
                  </div>
                </div>

                <div className="details-window-animated up"></div>
                <div
                  style={{
                    background: "rgba(8,23,200)",
                    height: "50px",
                    position: "absolute",
                    marginLeft: "-15px",
                    bottom: "-10px",
                    borderTop: "1px solid #fafafa",
                    width: "100%",
                  }}
                >
                  <a
                    href="./courses/category/9"
                    className="style-9"
                    style={{
                      float: "left",
                      color: "#fff",
                      borderRadius: "10px",
                    }}
                  >
                    Category{" "}
                  </a>

                  <a
                    href="./courses/category/9"
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
                className="carded-1box  col-merge-s-2 card-1box one "
                style={{ marginTop: "20px" }}
              >
                <div
                  className="style-9"
                  style={{ textAlign: "center", margin: "0px auto" }}
                >
                  <div className="icon-boxs">
                    <i className="fa fa-medkit fa-3x deeppink"></i>
                  </div>
                  <div className="head-title">
                    <h1 style={{ lineHight: "-10px", marginTop: "-10px" }}>
                      HEALTH CARE
                    </h1>
                  </div>
                  <div
                    className="detail-sections"
                    style={{ marginTop: "10px" }}
                  >
                    <p className="information bump-up-text">
                      Nursing, Disease And Disorders, Nutrition, Care Giving,
                      Pharmacology
                    </p>
                  </div>
                </div>

                <div className="details-window-animated up"></div>
                <div
                  style={{
                    background: "rgba(8,23,200)",
                    height: "50px",
                    position: "absolute",
                    marginLeft: "-15px",
                    bottom: "-10px",
                    borderTop: "1px solid #fafafa",
                    width: "100%",
                    opacity: "0.9",
                  }}
                >
                  <a
                    href="./courses/category/5"
                    className="style-9"
                    style={{
                      float: "left",
                      color: "#fff",
                      borderRadius: "10px",
                      fontFamily: "Open Sans",
                    }}
                  >
                    Category{" "}
                  </a>

                  <a
                    href="./courses/category/5"
                    className="style-9"
                    style={{
                      float: "right",
                      borderRadius: "10px",
                      color: "#fff",
                      fontFamily: "Open Sans",
                    }}
                  >
                    Details{" "}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>















        <div className="mobile-centry hide">
          <br />
          <br />
          <h1
            className="mobile-centry"
            style={{
              fontWeight: "300px",
              color: "#000",
              fontSize: "45px",
              fontFamily: "Montserrat",
              lineHight: "34px",
              letterSpacing: "-1px",
              fontWeight: "normal",
            }}
          >
            Categories
          </h1>
        </div>

        <Styles>
      <div className="hide container">
        <section class=" hide course-slider-area row">


          
          <Col md="12" className="course-slider col-sm-12">
                <Swiper {...settings}>
    
            <div
              className="carded-1box  col-merge-s-2  col-merge-s-3 hide card-box col-sm-12 card-1box one "
              style={{ marginTop: "20px", height: "330px", margin:"10px" }}
            >
              <div
                className="style-9"
                style={{ textAlign: "center", margin: "0px auto" }}
              >
                <div className="icon-boxs">
                  <i className="fa fa-institution fa-3x midnight"></i>
                </div>
                <div className="head-title">
                  <h1 style={{ lineHight: "-10px", marginTop: "-10px" }}>
                    ARTS & HUMANITIES
                  </h1>
                </div>
                <div className="detail-sections" style={{ marginTop: "10px" }}>
                  <p className="information bump-up-text ">
                    Education, History, Politics, Sociology, Geography, Law,
                    Psycology, Media, Architecture
                  </p>
                </div>
              </div>

              <div className="details-window-animated up "></div>

              <div
                style={{
                  background: "rgba(8,23,200)",
                  height: "40px",
                  position: "absolute",
                  marginLeft: "-15px",
                  bottom: "0px",
                  borderTop: "1px solid #fafafa",
                  width: "100%",
                }}
              >
                <a
                  href="./courses/category/10"
                  className="style-9"
                  style={{
                    float: "left",
                    color: "#fff",
                    borderRadius: "10px",
                  }}
                >
                  Category{" "}
                </a>

                <a
                  href="./courses/category/10"
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
              className="carded-1box  col-merge-s-2  col-merge-s-3 hide card-box col-sm-12 card-1box one "
              style={{ marginTop: "20px", height: "330px", margin:"10px"  }}
            >
              <div
                className="style-9"
                style={{ textAlign: "center", margin: "0px auto" }}
              >
                <div className="icon-boxs">
                  <i className="fa fa-briefcase fa-3x maroon"></i>
                </div>
                <div className="head-title">
                  <h1 style={{ lineHight: "-10px", marginTop: "-10px" }}>
                    BUSINESS & OPERATIONS MANAGEMENT
                  </h1>
                </div>
                <div className="detail-sections">
                  <p
                    className="information bump-up-text"
                    style={{ marginTop: "-15px" }}
                  >
                    Human Resource Adminstration, Leadership And Management,
                    Finance And Banking, Accounting, Business Process
                    Management, Service Management, Sales And Marketing
                    Management, Supply Chain Management, Risk Management,
                    Customer Service
                  </p>
                </div>
              </div>

              <div className="details-window-animated up"></div>
              <div
                style={{
                  background: "rgba(8,23,200)",
                  height: "50px",
                  position: "absolute",
                  marginLeft: "-15px",
                  bottom: "-10px",
                  borderTop: "1px solid #fafafa",
                  width: "100%",
                }}
              >
                <a
                  href="./courses/category/2"
                  className="style-9"
                  style={{
                    float: "left",
                    color: "#fff",
                    borderRadius: "10px",
                  }}
                >
                  Category{" "}
                </a>

                <a
                  href="./courses/category/2"
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
              className="carded-1box  col-merge-s-2  col-merge-s-3 hide card-box col-sm-12 card-1box one "
              style={{ marginTop: "20px", height: "330px", margin:"10px"  }}
            >
              <div
                className="style-9"
                style={{ textAlign: "center", margin: "0px auto" }}
              >
                <div className="icon-boxs">
                  <i className="fa fa-wrench fa-3x sky"></i>
                </div>
                <div className="head-title">
                  <h1 style={{ lineHight: "-10px", marginTop: "-10px" }}>
                    ENGINEERING
                  </h1>
                </div>
                <div className="detail-sections" style={{ marginTop: "10px" }}>
                  <p className="information bump-up-text">
                    Computer Engineering, Electrical Engineering, Mechanical
                    Engineering, Chemical Engineering, Civil Engineering
                  </p>
                </div>
              </div>

              <div className="details-window-animated up"></div>
              <div
                style={{
                  background: "rgba(8,23,200)",
                  height: "50px",
                  position: "absolute",
                  marginLeft: "-15px",
                  bottom: "-10px",
                  borderTop: "1px solid #fafafa",
                  width: "90%",
                }}
              >
                <a
                  href="./courses/category/8"
                  className="style-9"
                  style={{
                    float: "left",
                    color: "#fff",
                    borderRadius: "10px",
                  }}
                >
                  Category{" "}
                </a>

                <a
                  href="./courses/category/8"
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
              className="carded-1box  col-merge-s-2  col-merge-s-3 hide card-box col-sm-12 card-1box one "
              style={{ marginTop: "20px", height: "330px", margin:"10px"  }}
            >
              <div
                className="style-9"
                style={{ textAlign: "center", margin: "0px auto" }}
              >
                <div className="icon-boxs">
                  <i className="fa fa-arrows-alt fa-3x beige"></i>
                </div>
                <div className="head-title">
                  <h1 style={{ lineHight: "-10px", marginTop: "-10px" }}>
                    PHYSICAL SCIENCES
                  </h1>
                </div>

                <div className="detail-sections" style={{ marginTop: "10px" }}>
                  <p className="information bump-up-text">
                    Biology, Physics, Chemistry, Environmental Studies,
                    Agricultural Science
                  </p>
                </div>
              </div>

              <div className="details-window-animated up"></div>
              <div
                style={{
                  background: "rgba(8,23,200)",
                  height: "50px",
                  position: "absolute",
                  marginLeft: "-15px",
                  bottom: "-10px",
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
                  Category{" "}
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
              className="carded-1box  col-merge-s-2  col-merge-s-3 hide card-box col-sm-12 card-1box one "
              style={{ marginTop: "20px", height: "330px", margin:"10px"  }}
            >
              <div
                className="style-9"
                style={{ textAlign: "center", margin: "0px auto" }}
              >
                <div className="icon-boxs">
                  <i className="fa fa-line-chart fa-3x antiquewhite"></i>
                </div>
                <div className="head-title">
                  <h1 style={{ lineHight: "-10px", marginTop: "-10px" }}>
                    MATHEMATICS
                  </h1>
                </div>
                <div className="detail-sections" style={{ marginTop: "10px" }}>
                  <p className="information bump-up-text">
                    Calculus, Probability And Statistics, Algebra
                  </p>
                </div>
              </div>

              <div className="details-window-animated up"></div>
              <div
                style={{
                  background: "rgba(8,23,200)",
                  height: "50px",
                  position: "absolute",
                  marginLeft: "-15px",
                  bottom: "-10px",
                  borderTop: "1px solid #fafafa",
                  width: "100%",
                }}
              >
                <a
                  href="./courses/category/39"
                  className="style-9"
                  style={{
                    float: "left",
                    color: "#fff",
                    borderRadius: "10px",
                  }}
                >
                  Category{" "}
                </a>

                <a
                  href="./courses/category/39"
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
              className="carded-1box  col-merge-s-2  col-merge-s-3 hide card-box col-sm-12 card-1box one "
              
              style={{ marginTop: "20px", height: "330px", margin:"10px"  }}
            >
              <div
                className="style-9"
                style={{ textAlign: "center", margin: "0px auto" }}
              >
                <div className="icon-boxs">
                  <i className="fa fa-code fa-3x azure "></i>
                </div>
                <div className="head-title">
                  <h1 style={{ lineHight: "-10px", marginTop: "-10px" }}>
                    COMPUTER SCIENCE & INFORMATION TECHNOLOGY
                  </h1>
                </div>
                <div className="detail-sections" style={{ marginTop: "40px" }}>
                  <p
                    className="information bump-up-text"
                    style={{ marginTop: "-40px" }}
                  >
                    Computer Science, Neonerking And Security, Software
                    Development, Digital Marketing, IT Management
                  </p>
                </div>
              </div>

              <div className="details-window-animated up"></div>
              <div
                style={{
                  background: "rgba(8,23,200)",
                  height: "50px",
                  position: "absolute",
                  marginLeft: "-15px",
                  bottom: "-10px",
                  borderTop: "1px solid #fafafa",
                  width: "100%",
                }}
              >
                <a
                  href="./courses/category/1"
                  className="style-9"
                  style={{
                    float: "left",
                    color: "#fff",
                    borderRadius: "10px",
                  }}
                >
                  Category{" "}
                </a>

                <a
                  href="./courses/category/1"
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
              className="carded-1box  col-merge-s-2  col-merge-s-3 hide card-box col-sm-12 card-1box one "
              
              style={{ marginTop: "20px", height: "330px", margin:"10px"  }}
            >
              <div
                className="style-9"
                style={{ textAlign: "center", margin: "0px auto" }}
              >
                <div className="icon-boxs">
                  <i className="fa fa-balance-scale fa-3x mediumvioletred"></i>
                </div>
                <div className="head-title">
                  <h1 style={{ lineHight: "-10px", marginTop: "-10px" }}>
                    LAW & SOCIAL SCIENCES
                  </h1>
                </div>
                <div className="detail-sections" style={{ marginTop: "10px" }}>
                  <p className="information bump-up-text">
                    Economics, Law, Psycology
                  </p>
                </div>
              </div>

              <div className="details-window-animated up"></div>
              <div
                style={{
                  background: "rgba(8,23,200)",
                  height: "50px",
                  position: "absolute",
                  marginLeft: "-15px",
                  bottom: "-10px",
                  borderTop: "1px solid #fafafa",
                  width: "100%",
                }}
              >
                <a
                  href="./courses/category/9"
                  className="style-9"
                  style={{
                    float: "left",
                    color: "#fff",
                    borderRadius: "10px",
                  }}
                >
                  Category{" "}
                </a>

                <a
                  href="./courses/category/9"
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
            className="carded-1box  col-merge-s-2  col-merge-s-3 hide card-box col-sm-12 card-1box one "
              
              style={{ marginTop: "20px", height: "330px", margin:"10px"  }}
            >
              <div
                className="style-9"
                style={{ textAlign: "center", margin: "0px auto" }}
              >
                <div className="icon-boxs">
                  <i className="fa fa-medkit fa-3x deeppink"></i>
                </div>
                <div className="head-title">
                  <h1 style={{ lineHight: "-10px", marginTop: "-10px" }}>
                    HEALTH CARE
                  </h1>
                </div>
                <div className="detail-sections" style={{ marginTop: "10px" }}>
                  <p className="information bump-up-text">
                    Nursing, Disease And Disorders, Nutrition, Care Giving,
                    Pharmacology
                  </p>
                </div>
              </div>

              <div className="details-window-animated up"></div>
              <div
                style={{
                  background: "rgba(8,23,200)",
                  height: "50px",
                  position: "absolute",
                  marginLeft: "-15px",
                  bottom: "-10px",
                  borderTop: "1px solid #fafafa",
                  width: "100%",
                  opacity: "0.9",
                }}
              >
                <a
                  href="./courses/category/5"
                  className="style-9"
                  style={{
                    float: "left",
                    color: "#fff",
                    borderRadius: "10px",
                  }}
                >
                  Category{" "}
                </a>

                <a
                  href="./courses/category/5"
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

      </Styles>

        <br /> <br /> <br />

       
      </div>

       <div style={{ margin: "35px" }}></div>
    </div>
  );
};

export default Section;
