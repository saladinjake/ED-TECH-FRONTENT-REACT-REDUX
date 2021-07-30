import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import NavBar from "components/Navbar";
import { BreadcrumbBox } from "../../components/common/Breadcrumb";
import { Styles } from "./styles/account.js";
import {
  useHistory, //useLocation
} from "react-router-dom";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { Formik } from "formik";
import Footer from "components/Footer";

import { loginUser } from "services/auth";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login, logOut, setPrevPath } from "actions/authActions";
import questence from "assets/pngs/logoweb.png";

const Login = ({ auth: { prevPath }, login, logOut, setPrevPath }) => {
  let history = useHistory();

  console.log(history);
  var pattern2 = /[?redirectTo=]/;
  console.log(pattern2.test(history?.location?.search));

  const [loading, setLoading] = useState(false);
  const initialValues = { email: "", password: "" };

  useEffect(() => {
    if (history.location.state?.from) {
      setPrevPath(history.location.state?.from);
    } else {
    }
    // eslint-disable-next-line
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      const res = await loginUser(values);
      toast.success("Login Successful");
      login(res.data);
      console.log(prevPath);
      const pattern = /[?redirectTo=]+/g;

      setTimeout(() => {
        window.location.reload();
      }, 2000);

      // if (pattern.test(history?.location?.search)) {
      //   let url_link = history?.location?.search;
      //   url_link = url_link.substring(12);
      //   // console.log(url_link)
      //   //let oldPath =
      //   history.push(url_link);
      // } else {
      //   if (prevPath.length > 0) {
      //     history.push(prevPath);
      //   } else {
      //     if (res.data.user_roles[0].name === "User") {
      //       history.push("/dashboard");
      //     } else {
      //       history.push("/instructor-pages/dashboard");
      //     }
      //   }
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
    <Styles>
      {/* Main Wrapper */}
      <div className="overlay">
        <div
          id="login-box"
          className="login-page overlay__modal"
          style={{ marginTop: "20px" }}
        >
          <figure className="logo" style={{ float: "left" }}>
            <Link to="/">
              <img src={questence} alt="" width="171px" />
            </Link>
          </figure>
          <a
            className="overlay__close fa fa-close fa-2x"
            style={{ float: "right", color: "darkblue" }}
          ></a>
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
                      <div className="login-box" style={{}}>
                        <div className="login-title text-center">
                          <h3
                            style={{
                              fontWeight: "300px",
                              color: "#333",
                              fontSize: "45px",
                              fontFamily: "Open Sans",
                              lineHight: "34px",
                              letterSpacing: "-1px",
                              fontWeight: "normal",
                            }}
                          >
                            Log In{" "}
                          </h3>
                        </div>

                        <div className="not_account-btn text-center">
                          <p
                            style={{
                              fontFamily: "Open Sans",
                              color: "#000",
                              fontSize: "14px",
                            }}
                          >
                            Dont have an account yet?
                            <a
                              className="modal-link2"
                              href="#forgotpass"
                              style={{ color: "darkblue" }}
                            >
                              {" "}
                              Sign up
                            </a>
                          </p>
                        </div>
                        <form
                          id="form_login"
                          className="form"
                          onSubmit={handleSubmit}
                        >
                          <p className="form-control">
                            <label
                              htmlFor="email"
                              style={{
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "14px",
                              }}
                            >
                              Email
                            </label>
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
                          <p className="form-control">
                            <label
                              htmlFor="login_password"
                              style={{
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "14px",
                              }}
                            >
                              Password
                            </label>
                            <input
                              type="password"
                              placeholder="*******"
                              id="password"
                              name="password"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.password}
                            />
                            <span className="login_input-msg">
                              {errors.password &&
                                touched.password &&
                                errors.password}
                            </span>
                          </p>
                          <button type="submit" disabled={isSubmitting}>
                            {loading ? (
                              <div className="spinner-border" role="status">
                                <span className="sr-only">Loading...</span>
                              </div>
                            ) : (
                              "Login"
                            )}
                          </button>
                          <div className="not_account-btn text-center">
                            <p>
                              <a
                                className="modal-link3"
                                href="#forgotpass"
                                style={{
                                  fontFamily: "Open Sans",
                                  color: "#000",
                                  fontSize: "14px",
                                }}
                              >
                                {" "}
                                Forgot Password
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
    </Styles>
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
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
});
