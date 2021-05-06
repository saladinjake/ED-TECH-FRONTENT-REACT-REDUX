import React, { Fragment, useState, useEffect } from "react";
import NavBar from "components/Navbar";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { Formik } from "formik";
import { Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";
import Footer from "components/Footer";
import { connect } from "react-redux";
import "./resetpassword.css";

import { loginUserForgotChangePassword } from "services/auth";
import { useHistory } from "react-router-dom";

import PropTypes from "prop-types";
import { login, logOut, setPrevPath } from "actions/authActions";

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

const PasswordReset = ({ auth: { prevPath }, login, logOut, setPrevPath }) => {
  let history = useHistory();
  const [loading, setLoading] = useState(false);
  const initialValues = {
    current_password: "",
    password: "",
    password_confirmation: "",
  };

  useEffect(() => {
    // eslint-disable-next-line
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    console.log("clicked");
    try {
      console.log(values);
      const res = await loginUserForgotChangePassword(values);

      toast.success("Password Reset successful");

      history.push("../login");

      setSubmitting(false);
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message);

      setSubmitting(false);
    }
    setLoading(false);
  };

  return (
    <Fragment>
      <NavBar />
      <div class="container mt-5">
        <div class="row">
          <div class="col-md-10 ml-auto col-xl-6 mr-auto">
            <h3>Account Reset</h3>
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
                      Change Password
                    </a>
                  </li>
                  <li
                    class="nav-item tablink"
                    onClick={(e) => {
                      tabNavigator(e, "deactivate");
                    }}
                  >
                    <a class="" data-toggle="tab" href="#profile" role="tab">
                      Deactivate My Account
                    </a>
                  </li>
                </ul>
              </div>
              <div class="card-body">
                <div class="tab-content text-center">
                  <div
                    class="tab-pane active tabcontent"
                    id="form-reset"
                    role="tabpanel"
                  >
                    <Container>
                      <Row>
                        <Col md="12">
                          <Formik
                            initialValues={initialValues}
                            validationSchema={ResetSchema}
                            onSubmit={handleSubmit}
                          >
                            {({
                              values,
                              errors,
                              touched,
                              handleChange,
                              handleBlur,
                              handleSubmit,
                              isSubmitting,
                            }) => (
                              <div className="">
                                <form
                                  id="form_login"
                                  className="form form-horizontal"
                                  onSubmit={handleSubmit}
                                >
                                  <p className="form-group">
                                    <label
                                      style={{
                                        textAlign: "left",
                                        float: "left",
                                      }}
                                      htmlFor="current"
                                    >
                                      Current Password
                                    </label>
                                    <input
                                      type="password"
                                      placeholder="********"
                                      id="current_password"
                                      name="current_password"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.current_password}
                                      className="form-control"
                                    />
                                    <span className="login_input-msg">
                                      {errors.current_password &&
                                        touched.current_password &&
                                        errors.current_password}
                                    </span>
                                  </p>
                                  <p className="form-group">
                                    <label
                                      style={{
                                        textAlign: "left",
                                        float: "left",
                                      }}
                                      htmlFor="form-group"
                                    >
                                      New Password
                                    </label>
                                    <input
                                      type="password"
                                      placeholder="*******"
                                      id="password"
                                      name="password"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.password}
                                      className="form-control"
                                    />
                                    <span className="login_input-msg">
                                      {errors.password &&
                                        touched.password &&
                                        errors.password}
                                    </span>
                                  </p>

                                  <p className="form-group">
                                    <label
                                      style={{
                                        textAlign: "left",
                                        float: "left",
                                      }}
                                      htmlFor="form-group"
                                    >
                                      Confirm Password
                                    </label>
                                    <input
                                      type="password"
                                      placeholder="*******"
                                      id="password_confirmation"
                                      name="password_confirmation"
                                      onChange={handleChange}
                                      onBlur={handleBlur}
                                      value={values.password_confirmation}
                                      className="form-control"
                                    />
                                    <span className="login_input-msg">
                                      {errors.password_confirmation &&
                                        touched.password_confirmation &&
                                        errors.password_confirmation}
                                    </span>
                                  </p>
                                  <button
                                    className="btn btn-lg btn-primary"
                                    type="submit"
                                    disabled={isSubmitting}
                                  >
                                    {loading ? (
                                      <div
                                        className="spinner-border"
                                        role="status"
                                      >
                                        <span className="sr-only">
                                          Loading...
                                        </span>
                                      </div>
                                    ) : (
                                      "Change Password"
                                    )}
                                  </button>
                                  <div className="not_account-btn text-center">
                                    <p>
                                      Don't have an account yet?
                                      <Link
                                        to={
                                          process.env.PUBLIC_URL + "/register"
                                        }
                                      >
                                        {" "}
                                        Register Here{" "}
                                      </Link>
                                    </p>
                                  </div>
                                </form>
                              </div>
                            )}
                          </Formik>
                        </Col>
                      </Row>
                    </Container>
                  </div>
                  <div
                    class="tab-pane tabcontent"
                    id="deactivate"
                    role="tabpanel"
                  >
                    <h5>Account Deactivation</h5>
                    <br />
                    <p>
                      This process can not be undone and your access to
                      Questense would be revoked. Please ensure you know what
                      you are doing.
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
                      Deactivate
                    </button>
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
            <h3>Deactivate My Account</h3>
            <br />
            <br />
            <div>
              <p className="text-muted">
                Are you sure you want to deactivate your account
              </p>
              <br />
              <br />
              <ul>
                <li>
                  <strong>Access to use this platform</strong> would be revoked
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

PasswordReset.propTypes = {
  auth: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired,
  setPrevPath: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  login,
  setPrevPath,
  logOut,
})(PasswordReset);

const ResetSchema = Yup.object().shape({
  current_password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  password_confirmation: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
  // .min(2, "Too Short!")
  // .max(50, "Too Long!")
  // .required("Required"),
});
