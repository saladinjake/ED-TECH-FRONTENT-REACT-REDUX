import React, {Fragment, useState } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import NavBar from "components/Navbar";

import { BreadcrumbBox } from "../../components/common/Breadcrumb";
import Footer from "../../components/Footer";
import { Styles } from "./styles/account.js";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { Formik } from "formik";
import { registerLearner } from "services/auth";



import "./assets/css/bootstrap.min.css";
import "./assets/css/core.css";
import "./assets/css/components.css";
import "./assets/css/icons.css";
import "./assets/css/pages.css";
import "./assets/css/responsive.css";
import "./assets/css/login.css";
import "./basic.css";
// import BasicSlider from "./components/BasicSlider/BasicSlider";

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

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    console.log(values);
    try {
      await registerLearner(values);
      toast.success("We have sent a verification mail to your email.");
      setTimeout(() => {
        history.push("/login");
      }, 2000);
      setSubmitting(false);
    } catch (err) {
      console.log(
        err?.response?.data?.errors?.email[0] || err?.response?.data?.message
      );
      toast.error(
        err?.response?.data?.errors?.email[0] || err?.response?.data?.message
      );
      setSubmitting(false);
    }
    setLoading(false);
  };

  return (
    <Fragment>
      {/* Main Wrapper */}
      <div className="">
        {/* Header 2 */}
        <NavBar />

         <div class="account-pages"></div>
  
 
      <div  class="col-lg-8 col-md-6 hidden-md-down hidden-xs hidden-sm "  >
       <div class="container">
    <header class="clearfix">
      
    </header>
    <div class="main">
      <ul class="cbp-ig-grid">
        <li>
          <a href="#">
            <span class="cbp-ig-icon cbp-ig-icon-shoe"></span>
            <h3 class="cbp-ig-title">Distance Learning</h3>
            <span class="cbp-ig-category">Distance Learning</span>
          </a>
        </li>
        <li>
          <a href="#">
            <span class="cbp-ig-icon cbp-ig-icon-ribbon"></span>
            <h3 class="cbp-ig-title">Learning management</h3>
            <span class="cbp-ig-category">learning management system</span>
          </a>
        </li>
        <li>
          <a href="#">
            <span class="cbp-ig-icon cbp-ig-icon-milk"></span>
            <h3 class="cbp-ig-title">Online uinversity</h3>
            <span class="cbp-ig-category">Online university</span>
          </a>
        </li>
        <li>
          <a href="#">
            <span class="cbp-ig-icon cbp-ig-icon-whippy"></span>
            <h3 class="cbp-ig-title">Learning programs</h3>
            <span class="cbp-ig-category">Learning programs</span>
          </a>
        </li>
        <li>
          <a href="#">
            <span class="cbp-ig-icon cbp-ig-icon-spectacles"></span>
            <h3 class="cbp-ig-title">Learning Bundles</h3>
            <span class="cbp-ig-category">Bundle Subscriptions</span>
          </a>
        </li>
        <li>
          <a href="#">
            <span class="cbp-ig-icon cbp-ig-icon-doumbek"></span>
            <h3 class="cbp-ig-title">Online Training</h3>
            <span class="cbp-ig-category">Online Training</span>
          </a>
        </li>
      </ul>
    </div>
  </div>
    
    </div>

    <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12 pull-right" style={{background:"#fafafa",marginTop:"40px",height:"auto"}}>
      <div   >
        <div class="panel-heading">
          <h3 class="text-center"><strong class="text-custom">

               <a href="#" style={{fontSize:"20px",marginTop:"30px"}} class="waves-effect waves-light">Log in </a>
                           <br/>
               <img class="logo-wide" height="40" src={"/static/media/questence-logo.dba08b1d.svg"} /> 
               <h6 style={{fontSize:"10px"}} class="waves-effect waves-light">Login.</h6>
          </strong></h3>
        </div>

        <div class="panel-body " style={{marginTop:"24px"}}>

                <div class="form-group m-t-20 m-b-0" style={{height:"700px"}}>



      <Formik
                    initialValues={initialValues}
                    validationSchema={RegisterSchema}
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
                      <form
                        id="form_registration"
                        className="form"
                        onSubmit={handleSubmit}
                      >
                        <p className="form-group">
                          <label htmlFor="registration_fname">First Name</label>
                          <input
                          className="form-control"
                            type="text"
                            placeholder="First name"
                            name="first_name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.first_name}
                            id="registration_fname"
                          />
                          <span className="registration_input-msg">
                            {" "}
                            {errors.first_name &&
                              touched.first_name &&
                              errors.first_name}
                          </span>
                        </p>
                        <p className="form-group">
                          <label htmlFor="registration_lname">Last Name</label>
                          <input
                          className="form-control"
                            type="text"
                            placeholder="Last name"
                            name="last_name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.last_name}
                            id="registration_lname"
                          />
                          <span className="registration_input-msg">
                            {errors.last_name &&
                              touched.last_name &&
                              errors.last_name}
                          </span>
                        </p>
                        <p className="form-group">
                          <label htmlFor="registration_email">
                            Email Address
                          </label>
                          <input
                          className="form-control"
                            type="email"
                            placeholder="Email here"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            id="registration_email"
                          />
                          <span className="registration_input-msg">
                            {errors.email && touched.email && errors.email}
                          </span>
                        </p>
                        <p className="form-group">
                          <label htmlFor="registration_user">
                            Phone Number
                          </label>
                          <input
                          className="form-control"
                            type="number"
                            id="phone_number"
                            name="phone_number"
                            placeholder="Your phone_number here"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.phone_number}
                          />
                          <span className="registration_input-msg">
                            {errors.phone_number &&
                              touched.phone_number &&
                              errors.phone_number}
                          </span>
                        </p>
                        <p className="form-group">
                          <label htmlFor="registration_password">
                            Password
                          </label>
                          <label htmlFor="registration_password" >
                            <i>
                              At least eight chatracters,one letter and one
                              number
                            </i>
                          </label>
                          <input
                          className="form-control"
                            type="password"
                            placeholder="*******"
                            id="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                          />
                          <span className="registration_input-msg">
                            {errors.password &&
                              touched.password &&
                              errors.password}
                          </span>
                        </p>
                        <p className="form-group">
                          <label htmlFor="registration_cpassword">
                            Confirm Password
                          </label>
                          <input
                          className="form-control"
                            type="password"
                            placeholder="Confirm password"
                            id="password_confirmation"
                            name="password_confirmation"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password_confirmation}
                          />
                          <span className="registration_input-msg">
                            {errors.password_confirmation &&
                              touched.password_confirmation &&
                              errors.password_confirmation}
                          </span>
                        </p>
                        <button type="submit" className="btn btn-default" disabled={isSubmitting}>
                          {loading ? (
                            <div className="spinner-border" role="status">
                              <span className="sr-only">Loading...</span>
                            </div>
                          ) : (
                            "Register"
                          )}
                        </button>
                      </form>
                    )}
                  </Formik>
              
            </div>



         </div>

      
      </div>

     
    </div>

     
      </div>

      <Footer />
    

    </Fragment>
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
