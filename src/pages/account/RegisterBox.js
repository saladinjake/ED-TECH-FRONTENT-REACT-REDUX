import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import NavBar from "components/Navbar";

import { BreadcrumbBox } from "../../components/common/Breadcrumb";
import FooterTwo from "../../components/FooterTwo";
import { Styles } from "./styles/account.js";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { Formik } from "formik";
import { registerLearner } from "services/auth";
import questence from "assets/pngs/logoweb.png";
import $ from "jquery";
const Register = () => {
  let history = useHistory();
  const [loading, setLoading] = useState(false);
  const initialValues = {
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    password_confirmation: "",
  };

  function myFunction(e) {
    var x = document.getElementById("password1");
    if (x.type === "password") {
      x.type = "text";
      e.target.innerHTML = "Hide Password";
    } else {
      x.type = "password";
      e.target.innerHTML = "Show Password";
    }
  }

  useEffect(() => {
    $(".toggle-password").click(function () {
      $(this).toggleClass("fa-eye fa-eye-slash");
      var input = $($(this).attr("toggle"));
      if (input.attr("type") == "password") {
        input.attr("type", "text");
      } else {
        input.attr("type", "password");
      }
    });
  });

  // const handleSubmit = async (values, { setSubmitting }) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let initial = {
        email: document.getElementById("registration_email1").value,
        password: document.getElementById("password1").value,
        first_name: document.getElementById("registration_fname1").value,
        last_name: document.getElementById("registration_lname1").value,
        phone_number: document.getElementById("phone_number1").value,
        password_confirmation: document.getElementById("password_confirmation1")
          .value,
      };
      await registerLearner(initial);
      toast.success("We have sent a verification mail to your email.");
      setTimeout(() => {
        // history.push("/");
        window.location.reload();
      }, 2000);
      // setSubmitting(false);
    } catch (err) {
      // console.log(
      //   err?.response?.data?.errors?.email[0] || err?.response?.data?.message
      // );
      toast.error(err?.response?.data?.message);
      // setSubmitting(false);
    }
    setLoading(false);
  };

  return (
    <Styles>
      {/* Main Wrapper */}
      <div className="overlay2">
        <div
          className="main-wrapper registration-page overlay__modal2"
          id="register-box"
          style={{
            marginTop: "20px",
            height: "500px",
            overflowY: "scroll",
          }}
        >
          <figure className="logo" style={{ float: "left" }}>
            <Link to="/">
              <img src={questence} alt="" width="171px" />
            </Link>
          </figure>
          <a
            className="overlay__close2 fa fa-close fa-2x"
            style={{ float: "right", color: "darkblue" }}
          ></a>

          <br />

          {/* Registration Area */}
          <section className="registration-area ">
            <Container>
              <Row>
                <Col md="12">
                  <div className="registration-box">
                    <div className="registration-title text-center">
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
                        Registration
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
                        Already have an account ?
                        <a
                          className="modal-link"
                          href="#forgotpass"
                          style={{
                            fontFamily: "Open Sans",
                            color: "#000",
                            fontSize: "14px",
                          }}
                        >
                          Sign in
                        </a>
                      </p>
                    </div>

                    <form
                      id="form_registration"
                      className="form"
                      onSubmit={(e) => {
                        handleSubmit(e);
                      }}
                    >
                      <p className="form-control">
                        <label
                          htmlFor="registration_fname"
                          style={{
                            fontFamily: "Open Sans",
                            color: "#000",
                            fontSize: "14px",
                          }}
                        >
                          First Name
                        </label>
                        <input
                          type="text"
                          placeholder="First name"
                          name="first_name"
                          id="registration_fname1"
                          required
                        />
                      </p>
                      <p className="form-control">
                        <label
                          htmlFor="registration_lname"
                          style={{
                            fontFamily: "Open Sans",
                            color: "#000",
                            fontSize: "14px",
                          }}
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          placeholder="Last name"
                          name="last_name"
                          id="registration_lname1"
                          required
                        />
                      </p>
                      <p className="form-control">
                        <label
                          htmlFor="registration_email"
                          style={{
                            fontFamily: "Open Sans",
                            color: "#000",
                            fontSize: "14px",
                          }}
                        >
                          Email Address
                        </label>
                        <input
                          type="email"
                          placeholder="Email here"
                          name="email"
                          id="registration_email1"
                          required
                        />
                      </p>
                      <p className="form-control">
                        <label
                          htmlFor="registration_user"
                          style={{
                            fontFamily: "Open Sans",
                            color: "#000",
                            fontSize: "14px",
                          }}
                        >
                          Phone Number
                        </label>
                        <input
                          type="number"
                          id="phone_number1"
                          name="phone_number"
                          placeholder="Your phone_number here"
                          required
                        />
                      </p>
                      <p className="form-control form-group">
                        <label
                          htmlFor="registration_password"
                          style={{
                            fontFamily: "Open Sans",
                            color: "#000",
                            fontSize: "14px",
                          }}
                        >
                          Password
                        </label>
                        <label
                          htmlFor="registration_password"
                          style={{
                            fontFamily: "Open Sans",
                            color: "#000",
                            fontSize: "14px",
                          }}
                        >
                          <i>
                            At least eight chatracters,one letter and one number
                          </i>
                        </label>
                        <input
                          type="password"
                          placeholder="*******"
                          id="password1"
                          name="password"
                          required
                        />
                      </p>

                      <a
                        style={{
                          display: "block",
                          fontFamily: "Open Sans",
                          color: "#000",
                          fontSize: "14px",
                        }}
                        href="#pass"
                        onClick={(e) => {
                          myFunction(e);
                        }}
                      >
                        Show Password
                      </a>

                      <p className="form-control">
                        <label
                          htmlFor="registration_cpassword"
                          style={{
                            fontFamily: "Open Sans",
                            color: "#000",
                            fontSize: "14px",
                          }}
                        >
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          placeholder="Confirm password"
                          id="password_confirmation1"
                          name="password_confirmation"
                          required
                        />
                      </p>
                      <button
                        type="submit"
                        className="btn btn-primary"
                        href="#"
                        onClick={(e) => {
                          // e.preventDefault()
                          // handleSubmit(e)
                        }}
                      >
                        {loading ? (
                          <div className="spinner-border" role="status">
                            <span className="sr-only">Loading...</span>
                          </div>
                        ) : (
                          "Register"
                        )}
                      </button>
                    </form>
                  </div>
                </Col>
              </Row>
            </Container>
          </section>
        </div>
      </div>
    </Styles>
  );
};

export default Register;

// var passwordRegex = new RegExp(
//   "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
// );
var passwordRegex = new RegExp("^(?=.*[A-Za-z])(?=.*[0-9])(?=.{8,})");

const RegisterSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("First Name Required"),
  last_name: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Last Name Required"),
  email: Yup.string()
    .email("Invalid email")
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Valid Email Required"),
  password: Yup.string()
    .min(8, "Minimum of eight characters!")
    .max(50, "Too Long!")
    .required("Required")
    .matches(
      passwordRegex,
      "Password must contain One letter, One Number with a minimum of eight characters"
    ),
  password_confirmation: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
  phone_number: Yup.number()
    .required("Required")
    .positive("No negative number")
    .integer(),
});
