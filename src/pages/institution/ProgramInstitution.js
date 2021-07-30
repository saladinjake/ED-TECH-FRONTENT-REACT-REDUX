import React, { Component, Fragment } from "react";
import Datas from "../../data/institutions/info_data";

import { Container, Row, Col } from "react-bootstrap";
import { Styles } from "./styles/learnerBox.js";
import { Link } from "react-router-dom";

import NavBar from "components/Navbar";
import { BreadcrumbBox } from "../../components/common/Breadcrumb";
import Footer from "components/Footer";
import $ from "jquery";

import "./institute.css";

const handleToggleAccordion = (event) => {
  //Bail if our clicked element doesn't have the class
  if (!event.target.classList.contains("accordion-toggle")) return;

  // Get the target content
  var content = document.querySelector(event.target.hash);
  if (!content) return;

  // Prevent default link behavior
  event.preventDefault();

  // If the content is already expanded, collapse it and quit
  if (content.classList.contains("active")) {
    content.classList.remove("active");
    return;
  }

  // Get all open accordion content, loop through it, and close it
  var accordions = document.querySelectorAll(".accordion-content.active");
  for (var i = 0; i < accordions.length; i++) {
    accordions[i].classList.remove("active");
  }

  // Toggle our content
  content.classList.toggle("active");
};

class DynamicContentForInstitutions extends Component {
  constructor(props) {
    super(props);
    const { match } = this.props;
    this.id = match.params.id;
    // if (!parseInt(this.id)) window.location.href="./"; return false;
  }

  componentDidMount() {
    $("body").css({ background: "#fff" });

    // $(".show-more").click(function (e) {
    //     e.preventDefault()
    //     if($(".text").hasClass("show-more-height")) {
    //         $(this).text("(Show Less)");
    //         $(this).css({position:"relative", height:"30px", opacity: "0.6",filter: "50%"})
    //     } else {
    //         $(this).text("(Show More)");
    //         $(this).css({position:"absolute",bottom:"0px", height:"50px", opacity: "1",filter: "100%"})

    //     }

    //     $(".text").toggleClass("show-more-height");
    // });
  }

  redressFooter() {
    $("#resetFooter").css({ height: "5000px" });
  }

  getInstitution() {
    return Datas.institutions.find(
      (institution) => parseInt(institution.id) === parseInt(this.id)
    );
  }

  render() {
    const currentInstitution = this.getInstitution();
    return (
      <div>
        <NavBar />
        {/* Service Box */}

        <div className="heroMan">
          <h1>
            <span>Offered By</span> <br />
            {currentInstitution?.institution}
          </h1>
          <h4> </h4>

          <div className="heroContentLeft">
            <span>
              By Programs . {currentInstitution?.institution} . Explore
            </span>
            <h2 style={{ color: "#fff", marginTop: "10px" }}>
              {currentInstitution?.fullname}
            </h2>
            <p
              style={{
                color: "#fff",
                fontSize: "20px",
                marginTop: "10px",
                width: "500px",
              }}
            >
              {currentInstitution?.intro}
            </p>

            <div>
              <div
                style={{
                  width: "500px",
                  height: "200px",
                  float: "left",
                  margin: "5px",
                  marginTop: "20px",
                }}
              >
                <img
                  style={{
                    borderRadius: "50%",
                    width: "50px",
                    marginRight: "20px",
                    height: "50px",
                  }}
                  src={`${currentInstitution?.hero_image}`}
                />
                <span>
                  {currentInstitution?.institution} Career Certifaction
                </span>
              </div>
            </div>

            <div>
              <div
                style={{
                  width: "500px",
                  height: "100px",
                  float: "left",
                  margin: "5px",
                  marginTop: "-100px",
                }}
              >
                <button
                  style={{
                    width: "200px",
                    marginRight: "20px",
                    height: "100px",
                    background: "darkblue",
                  }}
                  className="btn btn-primary"
                >
                  Enroll For Course
                </button>
                <span>Financial Aid Available</span>
              </div>
            </div>
          </div>
        </div>

        <div>
          <div id="sidebar-top-view">Sidebar top</div>
          <div id="main-view">
            <div className="tabby">
              <input type="radio" name="tab" id="tabby1" checked="checked" />
              <label for="tabb1">About</label>
              <input type="radio" name="tab" id="tabby2" />
              <label for="tabby2">How It Works</label>
              <input
                type="radio"
                name="tab"
                id="tabby3"
                onClick={() => {
                  this.redressFooter();
                }}
              />
              <label for="tabby3">Courses</label>
              <input type="radio" name="tab" id="tabby4" />
              <label for="tabby4">Instructors</label>
              <input type="radio" name="tab" id="tabby5" />
              <label for="tabby5">Enrollment</label>

              <input type="radio" name="tab" id="tabby6" />
              <label for="tabby6">Faq</label>

              <hr />

              <div className="tabby-content-wrapper">
                <div id="tabby-content-1" className="tabby-content">
                  <Container lg="12" style={{ border: "1px solid #f6f6f6" }}>
                    <Row>
                      <Col
                        lg="12"
                        style={{
                          padding: "3px",
                          color: "#000",
                          fontSize: "20px",
                          marginLeft: "20px",
                        }}
                      >
                        <p style={{ color: "#000", fontSize: "20px" }}>
                          What you will learn
                        </p>
                      </Col>

                      {currentInstitution?.outcomes?.map((outcome) => {
                        return (
                          <Col
                            lg="6"
                            style={{
                              padding: "10px",
                              color: "#000",
                              fontSize: "20px",
                            }}
                          >
                            <p
                              style={{
                                padding: "10px",
                                color: "#000",
                                fontSize: "20px",
                              }}
                            >
                              {outcome}
                            </p>
                          </Col>
                        );
                      })}

                      <Col
                        lg="12"
                        style={{
                          padding: "3px",
                          color: "#000",
                          fontSize: "20px",
                          marginLeft: "20px",
                        }}
                      >
                        <p style={{ color: "#000", fontSize: "20px" }}>
                          Skills you would achieve
                        </p>
                      </Col>

                      {currentInstitution?.skills_acquired?.map(
                        (skillPills) => {
                          return (
                            <Col
                              lg="3"
                              style={{
                                padding: "10px",
                                color: "#fff",
                                borderRadius: "20px",
                                height: "50px",
                                fontSize: "10px",
                                margin: "15px",
                                background: "#f4f4f4",
                                marginLeft: "30px",
                              }}
                            >
                              <p
                                style={{
                                  color: "#000",
                                  fontSize: "12px",
                                  textAlign: "center",
                                }}
                              >
                                {skillPills}
                              </p>
                            </Col>
                          );
                        }
                      )}
                    </Row>
                  </Container>

                  <h3 style={{ margin: "10px" }}>About This Certifaction</h3>

                  <Container lg="12">
                    <Row>
                      <Col
                        lg="12"
                        style={{
                          padding: "20px",
                          color: "#000",
                          fontSize: "20px",
                        }}
                      >
                        {currentInstitution?.about_program?.map((paragraph) => {
                          return (
                            <p style={{ color: "#000", fontSize: "15px" }}>
                              {paragraph}
                            </p>
                          );
                        })}
                      </Col>
                    </Row>
                  </Container>
                </div>
                <div id="tabby-content-2" className="tabby-content">
                  <h3>How It Works</h3>
                </div>
                <div id="tabby-content-3" className="tabby-content">
                  <h4>
                    There are {currentInstitution?.courses?.length} courses in
                    this certification{" "}
                  </h4>

                  <Row>
                    <br />
                    {currentInstitution?.courses?.length > 0 &&
                      currentInstitution?.courses?.map((data, i) => {
                        return (
                          <Fragment>
                            {/*<Col md="12">
                                           <a style={{width:"100%",background:"rgba(8,20,200)", color:"#fff"}}  onClick={handleToggleAccordion} href={"#content-"+ (i+1)} className="accordion-toggle card-box">{data?.title}</a>
                                            </Col> 

                                               <div className="accordion-content" id={"content-"+ (i+1)}  style={{ width:"100%",minWidth:"100%"}}>
                                            */}

                            <Col md="12">
                              <h1 style={{ fontSize: "20px" }}>
                                {data?.title}
                              </h1>
                              <hr />
                            </Col>

                            {data?.body.map((data, index) => {
                              return (
                                <Fragment>
                                  <Col md="3" style={{ marginLeft: "20px" }}>
                                    <h6> Sub Courses </h6>
                                    <h4
                                      style={{
                                        fontSize: "25px",
                                        width: "50px",
                                      }}
                                    >
                                      {" "}
                                      {index + 1}
                                    </h4>
                                  </Col>
                                  <Col
                                    md="9"
                                    key={i}
                                    style={{ marginLeft: "100px" }}
                                  >
                                    <Link to={"#"}>
                                      <div className="">
                                        <div
                                          className="box-title profile-description"
                                          id="profile-description"
                                        >
                                          <h6 style={{ fontSize: "24px" }}>
                                            {data?.title}
                                          </h6>

                                          <div className="text show-more-height">
                                            <p
                                              style={{
                                                fontSize: "14px",
                                                color: "#000",
                                              }}
                                            >
                                              {data?.info}
                                            </p>

                                            <div className="show-more">
                                              (Show More)
                                            </div>
                                          </div>
                                        </div>
                                      </div>
                                    </Link>
                                  </Col>
                                  <hr />
                                </Fragment>
                              );
                            })}

                            {/*</div>*/}
                          </Fragment>
                        );
                      })}
                  </Row>
                </div>
                <div id="tabby-content-4" className="tabby-content">
                  <p>place content</p>
                </div>

                <div id="tabby-content-5" className="tabby-content">
                  <p>place content</p>
                </div>

                <div id="tabby-content-6" className="tabby-content">
                  <p>place content</p>
                </div>
              </div>
            </div>
          </div>
          <div id="sidebar-bottom-view">
            <div>
              <div
                style={{
                  width: "100%",

                  margin: "15px",
                  marginTop: "20px",
                }}
              >
                <i
                  className="fa fa-graduation-cap fa-2x"
                  style={{
                    borderRadius: "50%",
                    marginRight: "20px",
                    float: "left",
                  }}
                />
                <span style={{ fontSize: "25px" }}>Shareable Certificate</span>
              </div>

              <div
                style={{
                  width: "100%",
                  margin: "15px",
                  marginTop: "20px",
                }}
              >
                <i
                  className="fa fa-globe fa-2x"
                  style={{ borderRadius: "50%", marginRight: "20px" }}
                />
                <span style={{ fontSize: "25px" }}>100% online courses</span>
              </div>

              <div
                style={{
                  width: "100%",
                  margin: "15px",
                  marginTop: "20px",
                }}
              >
                <i
                  className="fa fa-signal fa-2x"
                  style={{ borderRadius: "50%", marginRight: "20px" }}
                />
                <span style={{ fontSize: "25px" }}>Beginner Level</span>
              </div>

              <div
                style={{
                  width: "100%",
                  margin: "15px",
                  marginTop: "20px",
                }}
              >
                <i
                  className="fa fa-graduation-cap fa-2x"
                  style={{ borderRadius: "50%", marginRight: "20px" }}
                />
                <span style={{ fontSize: "25px" }}>
                  Approximately 6 months to complete
                </span>
              </div>

              <div
                style={{
                  width: "100%",
                  margin: "15px",
                  marginTop: "20px",
                }}
              >
                <i
                  className="fa fa-graduation-cap fa-2x"
                  style={{ borderRadius: "50%", marginRight: "20px" }}
                />
                <span style={{ fontSize: "25px" }}>English</span>
              </div>
            </div>
          </div>
        </div>
        <div style={{ clear: "both" }} id="resetFooter"></div>

        <Footer />
      </div>
    );
  }
}

export default DynamicContentForInstitutions;
