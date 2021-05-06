import React, { Fragment, useState, useEffect } from "react";
import NavBar from "components/Navbar";

import toast from "react-hot-toast";
import { getNotifications } from "services/notification";

import Loader from "components/Loader/Loader";

import { Container, Row, Col } from "react-bootstrap";

// import { Link } from "react-router-dom";
import Footer from "components/Footer";
import { connect } from "react-redux";

import "./purchase.css";

function tabNavigator(evt, cityName) {
  // Declare all variables
  var i, tabcontent, tablinks;

  // Get all elements with class="tabcontent" and hide them
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  // Get all elements with class="tablinks" and remove the class "active"
  tablinks = document.getElementsByClassName("tablink");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }

  // Show the current tab, and add an "active" class to the button that opened the tab
  document.getElementById(cityName).style.display = "block";
  evt.currentTarget.className += " active";
}

const PurchaseEmpty = ({ completeness }) => {
  return (
    <div>
      <div className="row">
        <div className="col-sm-12">
          <h4 className="page-title">Purchase History</h4>
          <br />
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <div
            className="card-box"
            style={{
              height: "330px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div className="bar-widget">
              <div className="table-box">
                <div className="table-detail">
                  <div className="iconbox bg-info">
                    <img
                      alt="noimage"
                      src={
                        process.env.PUBLIC_URL +
                        "/assets/images/notification.png"
                      }
                      alt=""
                      className="thumbnail"
                      style={{ border: "none" }}
                    />
                  </div>

                  <div style={{ marginTop: "100px", textAlign: "center" }}>
                    <h4 className="m-t-0 m-b-5">
                      <b>Don't see anything yet?</b>
                    </h4>
                    <p className="text-muted m-b-0 m-t-0">
                      Dont worry, your notifications would pop up when it
                      reaches you.
                    </p>
                  </div>

                  <br />
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const PurchaseHistory = () => {
  const [loading, setLoading] = useState(false);
  const initialValues = { email: "", password: "" };

  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    (async function loadContent() {
      setLoading(true);
      try {
        let res = []; //await getNotifications();
        setNotifications([]); //...res.data.data
      } catch (err) {
        // toast.error(`Error occured fetching notifications`);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <Fragment>
      <NavBar />
      <div class="container mt-5">
        <div class="row">
          <div class="col-md-12 ">
            <h3>Payments And Purchase History</h3>
            <br />

            <div class="card">
              <div class="card-header">
                <ul class="nav nav-tabs  tabnav" role="tablist">
                  <li
                    class="nav-item tablink"
                    onClick={(e) => {
                      tabNavigator(e, "form-reset");
                    }}
                  >
                    <a
                      class=" active"
                      data-toggle="tab"
                      href="#home"
                      role="tab"
                    >
                      Payments
                    </a>
                  </li>
                  <li
                    class="nav-item tablink"
                    onClick={(e) => {
                      tabNavigator(e, "deactivate");
                    }}
                  >
                    <a class="" data-toggle="tab" href="#profile" role="tab">
                      Purchase History
                    </a>
                  </li>
                </ul>
              </div>
              <div>
                <div className="tab-content">
                  <div
                    className="tab-pane active tabcontent"
                    id="form-reset"
                    role="tabpanel"
                  >
                    <Container>
                      <Row>
                        <Col md="12">
                          <h5>Payment Cards</h5>
                          <br />

                          <p>
                            All payment cards used during purchase would be
                            added here
                          </p>
                          <br />
                          <button
                            id="md-trigger"
                            className="btn btn-danger md-trigger"
                            data-modal="modal-12"
                            onClick={() => {
                              showModalEffect();
                            }}
                          >
                            {" "}
                            Test modal{" "}
                          </button>
                        </Col>
                      </Row>
                    </Container>
                  </div>
                  <div
                    class="tab-pane tabcontent"
                    id="deactivate"
                    role="tabpanel"
                  >
                    <Col>
                      <div className="container">
                        <div className="row">
                          <div className="table-responsive table-wrapper">
                            {loading ? (
                              <Loader width="70" />
                            ) : notifications.length > 0 ? (
                              <Fragment>
                                <table className="table table-borderless table-reveal">
                                  <thead>
                                    <tr>
                                      <th scope="col">Transaction ID</th>
                                      <th scope="col">Payment Date</th>
                                      <th scope="col">Course Bought</th>
                                      <th scope="col">Amount</th>
                                      <th scope="col">Status</th>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    {notifications.length > 0 &&
                                      notifications.map((item, i) => {
                                        let notify_icon = "fa fa-book";
                                        console.log(
                                          item.data.notification_type
                                        );
                                        if (
                                          item.data.notification_type ===
                                          "Course Payment"
                                        ) {
                                          notify_icon = "fa fa-shopping-cart";
                                        } else if (
                                          item.data.notification_type ===
                                          "Course Enrollment"
                                        ) {
                                          notify_icon = "fa fa-unlock";
                                        } else {
                                          notify_icon = "fa fa-user";
                                        }
                                        console.log(item);
                                        return (
                                          <tr
                                            id={
                                              i +
                                              "titanic-" +
                                              new Date().toString()
                                            }
                                            key={
                                              i +
                                              "titanic-" +
                                              new Date().toString()
                                            }
                                          >
                                            <td>
                                              <i class={notify_icon}></i>
                                            </td>
                                            <td>{item.data.message}</td>
                                            <td>{item.data.message}</td>
                                            <td>{item.data.message}</td>

                                            <td>{item.created_at}</td>
                                          </tr>
                                        );
                                      })}
                                  </tbody>
                                </table>
                              </Fragment>
                            ) : (
                              <PurchaseEmpty />
                            )}
                          </div>
                        </div>
                      </div>
                    </Col>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div
          className="md-modal md-effect-12"
          id="md-modal"
          style={{ margin: "auto" }}
        >
          <div className="md-content">
            <br />
            <h3>Add A New Card</h3>
            <br />
            <br />
            <div>
              <p className="text-muted">Show the card form</p>
              <br />
              <br />
              <ul>
                <li>
                  <strong>And a button to create card</strong> would be revoked
                </li>
              </ul>
              <br />
              <br />
              <br />
              <button
                onClick={() => {
                  closeModal();
                }}
                className="md-close btn btn-primary pull-left"
              >
                Cancel & Go back
              </button>
              <button
                onClick={() => {}}
                className="md-close btn btn-danger pull-right"
              >
                Yes Deactivate my account
              </button>
            </div>
          </div>
        </div>

        <div className="md-overlay"></div>
      </div>

      <Footer />
    </Fragment>
  );
};

const closeModal = () => {
  // document.getElementById('md-close').on('click', function() {
  document.getElementById("md-modal").classList.remove("md-show");
  // });
};

const showModalEffect = () => {
  // document.getElementById('md-trigger').addEventListener('click', function() {
  document.getElementById("md-modal").classList.add("md-show");
  // });
};

PurchaseHistory.propTypes = {};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(PurchaseHistory);
