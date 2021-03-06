import React, { useEffect, Fragment } from "react";
import { Container, Row, Col, Table } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import NavBar from "components/Navbar";
import Footer from "components/Footer";

import "../newdashboard/assets/css/bootstrap.min.css";
import "../newdashboard/assets/css/core.css";
import "../newdashboard/assets/css/components.css";
import "../newdashboard/assets/css/icons.css";
import "../newdashboard/assets/css/pages.css";
import "../newdashboard/assets/css/responsive.css";
import Sidebar from "../newdashboard/Sidebar";
import "./cart.css";

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
  console.log(cart);
  return (
    <div className="main-wrapper cart-page">
      <NavBar />

      <section className="cart-area">
        <div className="container-cart">
          <h1> Shopping Cart</h1>
          <p>Item list in cart.</p>
          <p>
            Click 'Empty Cart' button to remove session cookies from browser.
          </p>
        </div>

        <div class="container">
          <section id="cart">
            <br />
            <br />
            {cart.length > 0 ? (
              <Fragment>
                {cart.map((data, i) => {
                  return (
                    <article class="product col-md-12">
                      <header className="card-box">
                        <a class="remove">
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              `/assets/images/product-01.jpg`
                            }
                            alt=""
                          />
                          <h3 style={{ background: "#0253c8" }}>
                            {data.course_name}
                          </h3>
                        </a>
                      </header>

                      <div class="content">
                        <button
                          className="shop"
                          onClick={removeItemFromCart.bind(this, data.id)}
                          style={{
                            position: "absolute",
                            right: "30px",
                            top: "-40px",
                          }}
                        >
                          remove item
                          <i className="las la-trash"></i>
                        </button>
                        <h1>{data.course_name}</h1>
                        {data.course_overview}

                        <div
                          style={{ top: "43px", width: 140 }}
                          class="type small card-box"
                        >
                          <h3>Instructor</h3>{" "}
                          <p>
                            {data.instructor.user.last_name}{" "}
                            {data.instructor.user.first_name}
                          </p>
                        </div>
                      </div>

                      <footer class="content">
                        <h2 class="full-price">#{data.price}</h2>

                        <h2 class="price"></h2>
                      </footer>
                    </article>
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
          </section>
        </div>

        <div
          className="cart-summary"
          style={{ position: "fixed", right: "30px", bottom: "90px" }}
        >
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
                className="checkout-btn shop"
              >
                Proceed to checkout
              </button>
            ) : (
              <button
                type="button"
                onClick={() => history.push("/courses")}
                className="checkout-btn shop"
              >
                Browse a course
              </button>
            )}
          </div>
        </div>
      </section>

      <Sidebar />
    </div>
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
