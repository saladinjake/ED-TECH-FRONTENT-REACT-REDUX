import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";

import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { Formik } from "formik";


import { loginUserForgotPassword } from "../../../../../api/enrollment_services/auth.services";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login, logOut, setPrevPath } from "../../../../../redux/actions/auth.action";
import questence from "./assets/images/logoweb.png";

const Login = ({ auth: { prevPath }, login, logOut, setPrevPath }) => {
  let history = useHistory();
  const [loading, setLoading] = useState(false);
  const initialValues = { email: "", password: "" };

  useEffect(() => {
    if (history.location.state?.from) {
      setPrevPath(history.location.state?.from);
    }
    // eslint-disable-next-line
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      const res = await loginUserForgotPassword(values);
      console.log(res.data);
      toast.success("An email has been sent");
      document.getElementById("msg-box").style.display = "block";
      document.getElementById("msg-box").style.color = "green";
      setTimeout(() => {
        window.location.reload();
      }, 2000);
      // login(res.data);

      // if (res) {
      //   history.push("/reset/password");
      // } else {
      //   history.push("/register");
      // }

      setSubmitting(false);
    } catch (err) {
      toast.error(err?.response?.data?.message);

      logOut();
      setSubmitting(false);
    }
    setLoading(false);
  };

  return (
    <>
      {/* Main Wrapper */}
      <div className="overlay3" style={{ display: "none" }}>
        <div
          className="main-wrapper login-page overlay__modal3"
          style={{ marginTop: "20px" }}
        >
          {/* Header 2 */}

          <figure className="logo" style={{ float: "left" }}>
            <Link to="/">
              <img src={questence} alt="" width="171px" />
            </Link>
          </figure>
          <a
            className="overlay__close3 fa fa-close fa-2x"
            style={{ float: "right", color: "darkblue" }}
          >Close</a>
          {/* Login Area */}
          <br />
          <section className="login-area" style={{ marginTop: "40px" }}>
            <Container>
              <Row>
                <Col md="12">
                  <Formik
                    initialValues={initialValues}
                    validationSchema={LoginSchema}
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
                      <div className="login-box">
                        <div className="login-title text-center">
                          <h3>Forgot Password</h3>
                          <p>Enter your email to rese your password</p>
                        </div>
                        <div id="msg-box" style={{ display: "none" }}>
                          An Email has been Sent
                        </div>
                        <form
                          id="form_login"
                          className="form"
                          onSubmit={handleSubmit}
                        >
                          <p className="form-control">
                            <label htmlFor="email">Email</label>
                            <input
                              type="email"
                              placeholder="Email here"
                              id="email"
                              name="email"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.email}
                            />
                            <span className="login_input-msg">
                              {errors.email && touched.email && errors.email}
                            </span>
                          </p>

                          <button type="submit" disabled={isSubmitting}>
                            {loading ? (
                              <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                              </div>
                            ) : (
                              "Send Password Reset Request"
                            )}
                          </button>
                          <div className="not_account-btn text-center">
                            <p>
                              Remember My Password ?
                              <a
                                className="modal-link"
                                href="#forgotpass"
                                style={{ color: "darkblue" }}
                              >
                                {" "}
                                Login
                              </a>
                            </p>
                          </div>
                        </form>
                      </div>
                    )}
                  </Formik>
                </Col>
              </Row>
            </Container>
          </section>
        </div>
      </div>
    </>
  );
};

// export default Login;

Login.propTypes = {
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
})(Login);

const LoginSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});