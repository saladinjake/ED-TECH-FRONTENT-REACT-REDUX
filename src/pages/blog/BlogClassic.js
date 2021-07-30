import React, { Component } from "react";
import Datas from "../../data/blog/classic.json";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import NavBar from "components/Navbar";

import Footer from "../../components/Footer";
import { BreadcrumbBox } from "../../components/common/Breadcrumb";
import Pagination from "./../../components/Pagination";
import BlogSidebar from "./components/BlogSidebar";
import FooterTwo from "../../components/FooterTwo";
import { Styles } from "./styles/blog.js";
import $ from "jquery";
class BlogClassic extends Component {
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
        <div className="main-wrapper blog-classic-page">
          {/* Header 2 */}
          <NavBar />

          {/* Breadcroumb <BreadcrumbBox title="Blog Classic" />*/}

          {/* Blog Classic */}
          <section className="blog-classic-area">
            <Container>
              <Row>
                <Col lg="9" md="8" sm="12">
                  <br /> <br />
                  {Datas.map((data, i) => (
                    <div className="blog-item  card-box" key={i}>
                      <div className="blog-img card">
                        <Link to={process.env.PUBLIC_URL + data.postLink}>
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              `/assets/images/${data.postImg}`
                            }
                            alt=""
                            className="img-fluid"
                          />
                        </Link>
                      </div>
                      <div className="blog-auth_date d-flex">
                        <div className="author-img d-flex">
                          <Link to={process.env.PUBLIC_URL + data.authorLink}>
                            <img
                              src={
                                process.env.PUBLIC_URL +
                                `/assets/images/${data.authorImg}`
                              }
                              alt=""
                            />
                          </Link>
                          <p>
                            <Link to={process.env.PUBLIC_URL + data.authorLink}>
                              {data.authorName}
                            </Link>
                          </p>
                        </div>

                        <div className="post-date">
                          <p>
                            <i className="las la-calendar"></i> {data.postDate}
                          </p>
                        </div>
                        {/*<div className="post-category">
                          <p>
                            <i className="las la-bookmark"></i>{" "}
                            {data.postCategory}
                          </p>
                        </div>
                        <div className="post-comment">
                          <p>
                            <i className="las la-comment"></i> (
                            {data.commentNumber})
                          </p>
                        </div>*/}
                      </div>
                      <div className="blog-title">
                        <hr style={{ width: "100%", background: "#000" }} />
                        <h5 className="style-3" style={{ color: "#000" }}>
                          <Link to={process.env.PUBLIC_URL + data.postLink}>
                            {data.postTitle}
                          </Link>
                        </h5>
                      </div>
                    </div>
                  ))}
                  <Row>
                    {/*<Col md="12" className="text-center">
                      <Pagination />
                    </Col>*/}
                  </Row>
                </Col>
                <Col lg="3" md="4" sm="12">
                  <BlogSidebar />
                </Col>
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

export default BlogClassic;
