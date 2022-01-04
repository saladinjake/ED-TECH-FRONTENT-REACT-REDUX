import React, { useEffect, Fragment } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import NavBar from "../../components/shared/NavBar";
import Footer from "../../components/shared/Footer";
import { Styles } from "./styles/cart.js";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { removeFromCart } from "../../redux/actions/cart.action";
import $ from "jquery";
import "./empty.css";

const Cart = ({
  auth: { isAuthenticated },
  cart: { cart, total },
  removeFromCart,
}) => {
  let history = useHistory();

  useEffect(() => {
    document.getElementsByTagName("body")[0].style.backgroundColor = "#fff";
  });

  useEffect(() => {
    if (!isAuthenticated) {
      // $(".modal-link").click(function(e){

      $(".overlay").addClass("modal-window").css({ display: "block" });
      $(".overlay__close").css({ display: "none" });
      $(".overlay__close2").css({ display: "none" });
      $(".overlay__close3").css({ display: "none" });

      // })
      // history.push("/login", { from: history.location.pathname });
    }
    // eslint-disable-next-line
  }, []);

  const removeItemFromCart = async (id) => {
    console.log("func recived", id);
    await removeFromCart(id);
  };

  // console.log(cart)

  return (
    <Styles>
      {/* Main Wrapper */}
      <div className="main-wrapper cart-page">
        {/* Header 2 */}
        <NavBar />

     

        {/* Product Details */}
        <section className="cart-area">
          <Container>
            <div className="col-sm-12">
              <h4
                className="page-title"
                style={{
                  fontWeight: "300px",
                  color: "#333",
                  fontSize: "25px",
                  fontFamily: "Open Sans",
                  lineHight: "34px",
                  letterSpacing: "-1px",
                  fontWeight: "normal",
                  marginTop: "-20x",
                }}
              >
                Shopping Cart
              </h4>
            </div>
            <br />
            <Row>
              <Col lg="8" md="12">
                <div className="product-list table-responsive">
                  <Table className="table-bordered">
                    <thead>
                      <tr>
                        <th
                          className="product-remove"
                          style={{
                            border: "none",
                            fontFamily: "Open Sans",
                            color: "#000",
                            fontSize: "14px",
                          }}
                        ></th>
                        <th
                          className="product-thumbnail"
                          style={{
                            border: "none",
                            fontFamily: "Open Sans",
                            color: "#000",
                            fontSize: "14px",
                          }}
                        ></th>
                        <th
                          className="product-name"
                          style={{
                            border: "none",
                            fontFamily: "Open Sans",
                            color: "#000",
                            fontSize: "14px",
                          }}
                        >
                          Product
                        </th>
                        <th
                          className="product-price"
                          style={{
                            border: "none",
                            fontFamily: "Open Sans",
                            color: "#000",
                            fontSize: "14px",
                          }}
                        >
                          Price
                        </th>
                        {/* <th className="product-quantity">Quantity</th> */}
                        {/* <th className="product-subtotal">Subtotal</th> */}
                      </tr>
                    </thead>
                    <tbody>
                      {cart.length > 0 ? (
                        <Fragment>
                          {cart.map((data, i) => {
                            return (
                              <tr key={i}>
                                <td
                                  className="product-remove"
                                  style={{
                                    border: "none",
                                    fontFamily: "Open Sans",
                                    color: "#000",
                                    fontSize: "14px",
                                  }}
                                >
                                  <Button
                                    style={{
                                      height: "50px",
                                      background: "rgba(8,23,200)",
                                      fontSize: "12px",
                                      marginLeft: "10px",
                                      fontWeight: "bold",
                                      fontFamily: "Open Sans",
                                      color: "#fff",
                                    }}
                                    onClick={removeItemFromCart.bind(
                                      this,
                                      data.id
                                    )}
                                    variant="danger"
                                  >
                                    remove item
                                    <i className="las la-trash"></i>
                                  </Button>
                                  {/* <button
                                    onClick={removeFromCart.bind(this, data.id)}
                                  >
                                    <i className="las la-trash"></i>
                                  </button> */}
                                </td>
                                <td
                                  className="product-thumbnail"
                                  style={{
                                    border: "none",
                                    fontFamily: "Open Sans",
                                    color: "#000",
                                    fontSize: "14px",
                                  }}
                                >
                                  <img src={data.course_cover_image} alt="" />
                                </td>
                                <td
                                  className="product-title"
                                  style={{
                                    border: "none",
                                    fontFamily: "Open Sans",
                                    color: "#000",
                                    fontSize: "14px",
                                  }}
                                >
                                  {data.course_name}
                                </td>
                                <td
                                  className="product-price"
                                  style={{
                                    border: "none",
                                    fontFamily: "Open Sans",
                                    color: "#000",
                                    fontSize: "14px",
                                  }}
                                >
                                  <span className="amount">#{data.price}</span>
                                </td>
                              </tr>
                            );
                          })}
                        </Fragment>
                      ) : (
                        <Fragment>
                          <div class="empty-cart">
                            <br />
                            <br />
                            <br />
                            <h3
                              style={{
                                fontWeight: "300px",
                                color: "#333",
                                fontSize: "25px",
                                fontFamily: "Open Sans",
                                lineHight: "34px",
                                letterSpacing: "-1px",
                                fontWeight: "normal",
                              }}
                            >
                              Your cart is empty
                            </h3>
                            <br />
                            <br />
                            <p
                              style={{
                                width: "100%",
                                fontWeight: "300px",
                                color: "#333",
                                fontSize: "14px",
                                fontFamily: "Open Sans",
                                lineHight: "34px",
                                letterSpacing: "-1px",
                                fontWeight: "normal",
                              }}
                            >
                              Click on browse a course and add to your wishlist.
                            </p>

                            <br />
                            <br />
                            <button
                              type="button"
                              onClick={() => history.push("/courses")}
                              style={{
                                width: "50%",
                                background: "rgba(8,23,200)",
                                fontSize: "12px",
                                marginLeft: "10px",
                                fontWeight: "bold",
                                fontFamily: "Open Sans",
                                color: "#fff",
                              }}
                            >
                              Browse a course
                            </button>
                          </div>
                        </Fragment>
                      )}
                    </tbody>
                  </Table>
                  {/* <div className="actions d-flex justify-content-between">
                                            <div className="coupon">
                                                <form action="#" className="form-inline">
                                                    <input type="text" className="form-control" placeholder="Coupon code ..." />
                                                    <button type="submit" className="apply-btn">Apply Coupon</button>
                                                </form>
                                            </div>
                                            <div className="update-cart">
                                                <a className="update-btn" href={process.env.PUBLIC_URL + "/"}>Update cart</a>
                                            </div>
                                        </div> */}
                </div>
              </Col>

              <Col lg="4" md="6">
                <div className="cart-summary">
                  <div className="cs-title text-center">
                    <h5>Cart Summary</h5>
                  </div>
                  <div className="cs-content">
                    {/* <ul className="list-unstyled">
                      <li>
                        Vat (2.5%) <span>$3.68</span>
                      </li>
                    </ul> */}
                    <p className="cart-total">
                      Grand Total <span>#{total}</span>
                    </p>
                    {cart.length > 0 ? (
                      <button
                        type="button"
                        style={{
                          background: "rgba(8,23,200)",
                          fontSize: "12px",
                          marginLeft: "10px",
                          fontWeight: "bold",
                          fontFamily: "Open Sans",
                          color: "#fff",
                        }}
                        onClick={() => history.push("/checkout")}
                        className="checkout-btn"
                      >
                        Proceed to checkout
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => history.push("/courses")}
                        className="checkout-btn"
                        style={{
                          background: "rgba(8,23,200)",
                          fontSize: "12px",
                          marginLeft: "10px",
                          fontWeight: "bold",
                          fontFamily: "Open Sans",
                          color: "#fff",
                        }}
                      >
                        Browse a course
                      </button>
                    )}
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Footer 2 */}
        <div className="my-auto border-top bg-green">
                <div className="container">
                        <Footer />
                </div>
            </div>
      </div>
    </Styles>
  );
};

Cart.propTypes = {
  auth: PropTypes.object.isRequired,
  cart: PropTypes.object.isRequired,
  removeFromCart: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.cart,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  removeFromCart,
})(Cart);
