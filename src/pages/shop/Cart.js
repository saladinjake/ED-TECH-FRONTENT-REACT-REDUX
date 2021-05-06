import React, { useEffect, Fragment } from "react";
import { Container, Row, Col, Table, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import NavBar from "components/Navbar";
import Footer from "../../components/Footer";
import { BreadcrumbBox } from "../../components/common/Breadcrumb";
import { Styles } from "./styles/cart.js";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { removeFromCart } from "actions/cartActions";

const Cart = ({
  auth: { isAuthenticated },
  cart: { cart, total },
  removeFromCart,
}) => {
  let history = useHistory();

  useEffect(() => {
    if (!isAuthenticated) {
      history.push("/login", { from: history.location.pathname });
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

        {/* Breadcroumb */}
        <BreadcrumbBox title="wishlist" />

        {/* Product Details */}
        <section className="cart-area">
          <Container>
            <Row>
              <Col lg="8" md="12">
                <div className="product-list table-responsive">
                  <Table className="table-bordered">
                    <thead>
                      <tr>
                        <th className="product-remove"></th>
                        <th className="product-thumbnail"></th>
                        <th className="product-name">Product</th>
                        <th className="product-price">Price</th>
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
                                <td className="product-remove">
                                  <Button
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
                                <td className="product-thumbnail">
                                  <img src={data.course_cover_image} alt="" />
                                </td>
                                <td className="product-title">
                                  {data.course_name}
                                </td>
                                <td className="product-price">
                                  <span className="amount">#{data.price}</span>
                                </td>
                              </tr>
                            );
                          })}
                        </Fragment>
                      ) : (
                        <tr>
                          <td className="product-subtotal">
                            <span className="subtotal">No items in cart</span>
                          </td>
                        </tr>
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
        <Footer />
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
