import React, { Fragment, useState, useEffect } from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import NavBar from "components/Navbar";

import { BreadcrumbBox } from "../../components/common/Breadcrumb";
import Footer from "../../components/Footer";
import { Styles } from "./styles/checkout.js";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { enrollCourses } from "services/enrollment.js";
import toast from "react-hot-toast";
import { useHistory } from "react-router-dom";
import { clearCart } from "actions/cartActions";

import { PaystackButton } from "react-paystack";
import { generateString } from "helper/random";

const Checkout = ({
  cart: { cart, total },
  auth: { user, isAuthenticated, user_roles },
  clearCart,
}) => {
  const [config, setConfig] = useState({});
  let history = useHistory();
  const [loading, setLoading] = useState(false);

  console.log(user);

  useEffect(() => {
    if (!isAuthenticated) {
      history.push("/login", { from: history.location.pathname });
    }
    // eslint-disable-next-line
  }, []);

  const enrollStudent = async () => {
    setLoading(true);
    if (cart.length > 0) {
      let payload = [];

      //check for free
      cart.forEach((item) => {
        let newObj = {};
        newObj.user_id = user.id;
        newObj.course_id = item.id;
        payload.push(newObj);

        // console.log(item)
      });

      try {
        await enrollCourses({
          enrollments: payload,
        });
        toast.success(`Courses enrolled succesfully`);
        clearCart();
        if (user_roles[0].name === "Instructor") {
          history.push("/instructor/dashboard");
        } else {
          history.push("/mycourses");
        }
      } catch (err) {
        toast.error(
          err?.response?.data?.message ||
            `Error occured enrolling you for this Course`
        );
      }
    }
    setLoading(false);
  };

  const handlePaystackSuccessAction = (reference) => {
    toast.success(`Payment succesfully completed`);
    enrollStudent();
    // console.log(reference);
  };

  const handlePaystackCloseAction = () => {
    toast.success(`Payment Closed`);
  };

  useEffect(() => {
    let IDs = [];
    cart.length > 0 &&
      cart.forEach((item) => {
        IDs.push(item.id);
      });

    setConfig({
      publicKey: "pk_live_8bda1438b3a12a521e690adcd27d99b1224b72c9", //"pk_test_5dca9a796da0a59391c7f15c6cdc0275db4c8093",
      reference: new Date().getTime(),
      email: user?.email,
      amount: total * 100,
      onSuccess: (reference) => handlePaystackSuccessAction(reference),
      onClose: handlePaystackCloseAction,
      metadata: {
        custom_fields: [
          {
            display_name: "Payment ID",
            variable_name: "payment_id",
            value: generateString(),
          },
          {
            display_name: "User ID",
            variable_name: "user_id",
            value: user?.id,
          },
          {
            display_name: "Course Ids",
            variable_name: "courseIds",
            value: IDs.join(","),
          },
        ],
      },
      text: `Pay #${total} with Paystack`,
    });
    // eslint-disable-next-line
  }, []);

  return (
    <Styles>
      {/* Main Wrapper */}
      <div className="main-wrapper about-page">
        {/* Header 2 */}
        <NavBar />

        {/* Breadcroumb */}
        <BreadcrumbBox title="Checkout" />

        <Container>
          <Row>
            <Col md="12">
              <section className="checkout">
                <h4 className="tab-title">
                  Customer Name: {`${user?.first_name} ${user?.last_name}`}
                </h4>
                <p className="tab-desc">Customer Email: {user?.email}</p>
                <ul className="list-unstyled check-list">
                  {cart.length > 0 ? (
                    <Fragment>
                      {cart.map((data, i) => {
                        return (
                          <li>
                            <i className="fa fa-check"></i>
                            {data.course_name}
                          </li>
                        );
                      })}
                    </Fragment>
                  ) : (
                    <li>No items in cart</li>
                  )}
                </ul>

                {cart.length > 0 && (
                  <Fragment>
                    {loading ? (
                      <Button
                        className="mt-4"
                        variant="success"
                        style={{ height: "50px" }}
                      >
                        <div className="spinner-border" role="status">
                          <span className="sr-only">Loading...</span>
                        </div>
                      </Button>
                    ) : (
                      <PaystackButton className="btn-pays" {...config} />
                    )}
                  </Fragment>
                )}
              </section>
            </Col>
          </Row>
        </Container>

        {/* Footer 2 */}
        <Footer />
      </div>
    </Styles>
  );
};

Checkout.propTypes = {
  cart: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  clearCart: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.cart,
  auth: state.auth,
});

export default connect(mapStateToProps, { clearCart })(Checkout);

// newObj.item_id = item.id;
// newObj.quantity = 1;
// payload.push(newObj);
