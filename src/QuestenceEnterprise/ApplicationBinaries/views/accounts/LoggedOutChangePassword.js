import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import NavBar from "../../components/shared/NavBar";
import { Styles } from "./styles/account.js";
import { useHistory, useLocation } from "react-router-dom";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { Formik } from "formik";
import Footer from "../../components/shared/Footer";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import qs from "qs";
import { loggedOutUserForgotPassword } from "../../api/enrollment_services/auth.services";
const ChangeCredentials = ({ auth: { prevPath } }) => {
  let history = useHistory();

  const getTokenItemFromString = (thePath) =>
    thePath.substring(thePath.lastIndexOf("/") + 1);

  let params = qs.parse(history?.location?.search, { ignoreQueryPrefix: true });

  let token = getTokenItemFromString(window.location.href);
  let tokenSplit = token.split("?")[0];
  // alert(tokenSplit)

  const [loading, setLoading] = useState(false);
  const initialValues = { password_confirmation: "", password: "" };

  // useEffect(() => {

  //   // eslint-disable-next-line
  // }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    console.log("this are the values");
    try {
      values.email = params.email;
      values.token = tokenSplit;
      // values.token =
      let res = await loggedOutUserForgotPassword(values);
      console.log(res);
      setSubmitting(false);
      toast.success("Your Password reset was successful");
      history.push("../login");
    } catch (err) {
      toast.error(err?.response?.data?.message);
      // logOut();
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

        {/* Login Area */}
        <section className="login-area">
          <Container>
            <Row>
              <Col md="12">
                <br />
                <br />
                <br />
                <br />
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
                        <h3>Change My Password</h3>
                      </div>
                      <form
                        id="form_login"
                        className="form"
                        onSubmit={handleSubmit}
                      >
                        <p className="form-control">
                          <label htmlFor="email">Password</label>
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
                        <p className="form-control">
                          <label htmlFor="login_password">
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
                          />
                          <span className="login_input-msg">
                            {errors.password_confirmation &&
                              touched.password_confirmation &&
                              errors.password_confirmation}
                          </span>
                        </p>
                        <button type="submit" disabled={isSubmitting}>
                          {loading ? (
                            <div className="spinner-border" role="status">
                              <span className="sr-only">Loading...</span>
                            </div>
                          ) : (
                            "Change Password"
                          )}
                        </button>
                        <div className="not_account-btn text-center">
                          <p>
                            <a href="#login" className="modal-link">
                              {" "}
                              Remember my password? Login Here
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

ChangeCredentials.propTypes = {
  auth: PropTypes.object.isRequired,

  // setPrevPath: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(ChangeCredentials);

const LoginSchema = Yup.object().shape({
  password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  password_confirmation: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
});
