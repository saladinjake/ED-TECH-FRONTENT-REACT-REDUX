import React, { Component } from "react";
import Datas from "../../data/shop/details.json";
import { Link } from "react-router-dom";
import { Container, Row, Col, Table } from "react-bootstrap";
import InstructorNavBar from "components/Navbar/InstructorNavbar";
import { BreadcrumbBox } from "../../components/common/Breadcrumb";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import Quantity from "./components/Quantity";
import FooterTwo from "../../components/FooterTwo";
import { Styles } from "./styles/productDetails.js";

class ProductDetails extends Component {
  render() {
    const settings = {
      showArrows: false,
      showStatus: false,
      showIndicators: false,
    };

    return (
      <Styles>
        {/* Main Wrapper */}
        <div className="main-wrapper product-details-page">
          {/* Header 2 */}
          <InstructorNavBar />

          {/* Breadcroumb */}
          <BreadcrumbBox title="Product Details" />

          {/* Product Details */}
          <section className="product-details-area">
            <Container>
              <Row>
                <Col md="5">
                  <div className="product-slider">
                    <Carousel {...settings}>
                      {Datas.map((data, i) => (
                        <div className="slider-item" key={i}>
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              `/assets/images/${data.productImg}`
                            }
                            alt=""
                            className="img-fluid"
                          />
                        </div>
                      ))}
                    </Carousel>
                  </div>
                </Col>

                <Col md="7">
                  <div className="product-information">
                    <div className="product-title">
                      <h4>Learner name</h4>
                    </div>
                    <div className="product-rating d-flex">
                      <ul className="rating list-unstyled list-inline">
                        <li className="list-inline-item">
                          <i className="las la-star"></i>
                        </li>
                        <li className="list-inline-item">
                          <i className="las la-star"></i>
                        </li>
                        <li className="list-inline-item">
                          <i className="las la-star"></i>
                        </li>
                        <li className="list-inline-item">
                          <i className="las la-star"></i>
                        </li>
                        <li className="list-inline-item">
                          <i className="las la-star-half-alt"></i>
                        </li>
                      </ul>
                      <div className="review-num">
                        <Link to={process.env.PUBLIC_URL + "/"}>
                          ( Rating )
                        </Link>
                      </div>
                    </div>
                    <div className="product-desc">
                      <p>Biography goes here.</p>
                    </div>
                    <div className="product-stock">
                      <p>
                        User type : <span className="stock">Learner</span>
                      </p>
                    </div>

                    <Quantity />

                    <div className="product-cart-wh-com-btn">
                      <Link
                        to={process.env.PUBLIC_URL + "/product-details"}
                        className="cart-btn"
                      >
                        Change picture
                      </Link>
                    </div>
                  </div>
                </Col>

                <Col md="12">
                  <div className="product-tab">
                    <Table className="table table-bordered">
                      <tbody>
                        <tr>
                          <td>Username</td>
                          <td>@ksodimu</td>
                        </tr>
                        <tr>
                          <td>Fisrt Name</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>Last Name</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>Email</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>Gender</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>Phone</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>Country</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>Employment Status</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>Education Level</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>Degree Obtained</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>Date of Birth</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>Marital Status</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td>LinkedIn</td>
                          <td></td>
                        </tr>
                        <tr>
                          <td></td>
                          <td></td>
                        </tr>
                      </tbody>
                    </Table>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>

          {/* Footer 2 */}
          <FooterTwo />
        </div>
      </Styles>
    );
  }
}

export default ProductDetails;
