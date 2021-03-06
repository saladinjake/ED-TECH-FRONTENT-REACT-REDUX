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

  const LogInToLMS = () => {};

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      const res = await loginUser(values);
      toast.success("Login Successful");
      login(res.data);
      console.log(prevPath);
      const pattern = /[?redirectTo=]+/g;

      if (pattern.test(history?.location?.search)) {
        let url_link = history?.location?.search;
        url_link = url_link.substring(12);
        // console.log(url_link)
        //let oldPath =
        history.push(url_link);
      } else {
        if (prevPath.length > 0) {
          history.push(prevPath);
        } else {
          if (res.data.user_roles[0].name === "User") {
            history.push("/dashboard");
          } else {
            history.push("/instructor-pages/dashboard");
          }
        }
      }

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
      <div className="main-wrapper login-page">
        {/* Header 2 */}
        <NavBar />

        {/* Breadcroumb */}
        <BreadcrumbBox title="Log In" />

        {/* Login Area */}
        <section className="login-area">
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
                        <h3>Log In</h3>
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
                        <p className="form-control">
                          <label htmlFor="login_password">Password</label>
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
                            Don't have an account yet?
                            <Link to={process.env.PUBLIC_URL + "/register"}>
                              {" "}
                              Register Here{" "}
                            </Link>
                          </p>

                          <p>
                            <a
                              href={process.env.PUBLIC_URL + "/password-forgot"}
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

        {/* Footer 2 */}
        <Footer />
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
