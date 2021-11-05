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

import { usePaystackPayment } from "react-paystack";
import { generateString } from "helper/random";

const Checkout = ({
  cart: { cart, total },
  auth: { user, isAuthenticated, user_roles },
  clearCart,
}) => {
  const [IDS, setIDS] = useState([]);
  const [config] = useState({
    publicKey: "pk_test_5dca9a796da0a59391c7f15c6cdc0275db4c8093",
    reference: new Date().getTime(),
    email: user?.email,
    amount: total * 100,
    metadata: {
      custom_fields: {
        user_id: user?.id,
        payment_id: generateString(),
        courseIds: IDS.join(","),
        name: user?.first_name,
        additionalMessage: "Payment for Questence Course!",
      },
    },
    text: `Pay #${total} with Paystack`,
  });

  useEffect(() => {
    let IDs = [];
    cart.length > 0 &&
      cart.forEach((item) => {
        IDs.push(item.id);
      });

    setIDS([...IDs]);
    // eslint-disable-next-line
  }, []);

  const initializePayment = usePaystackPayment(config);

  let history = useHistory();
  const [loading, setLoading] = useState(false);

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
      cart.forEach((item) => {
        let newObj = {};
        newObj.user_id = user.id;
        newObj.course_id = item.id;
        payload.push(newObj);
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

  const onSuccess = (reference) => {
    toast.success(`Payment succesfully completed`);
    enrollStudent();
    console.log(reference);
  };

  // you can call this function anything
  const onClose = () => {
    toast.success(`Payment Closed`);
    console.log("closed");
  };

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
                {/* {cart.length > 0 && (
                  <Button
                    onClick={enrollStudent}
                    className="mt-4"
                    variant="success"
                  >
                    {loading ? (
                      <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    ) : (
                      `Pay #${total} with Paystack`
                    )}
                  </Button>
                )} */}
                {cart.length > 0 && (
                  <Button
                    className="mt-4"
                    variant="success"
                    onClick={() => {
                      initializePayment(onSuccess, onClose);
                    }}
                  >
                    {loading ? (
                      <div className="spinner-border" role="status">
                        <span className="sr-only">Loading...</span>
                      </div>
                    ) : (
                      `Pay #${total} with Paystack`
                    )}
                  </Button>
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
