import React, {Fragment, useState } from "react";
import { Link } from "react-router-dom";
// import { Container, Row, Col } from "react-bootstrap";
import NavBar from "components/Navbar";

// import { BreadcrumbBox } from "../../components/common/Breadcrumb";
import Footer from "../../components/Footer";
// import { Styles } from "./styles/account.js";
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
// import "./assets/css/login.css";
// import "./basic.css";
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
      <div style={{marginTop:"-20px"}}>
        {/* Header 2 */}
        <NavBar />

         <div class="account-pages"></div>
  
 
      <div  class="col-lg-8 col-md-6 hidden-md-down hidden-xs hidden-sm "  style={{backgroundColor:"#fff", background: "url('dontexist.jpg') #fff no-repeat"}}  >
       <div style={{padding:"43%", background:"#fff"}}></div>
    
    </div>

    <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12 pull-right" style={{background:"#fff",marginTop:"40px",height:"auto"}}>
      <div   >
       

        <div class="panel-body " style={{marginTop:"24px"}}>

                <div class="form-group m-t-20 m-b-0" style={{height:"700px"}}>
                     <div className="not_account-btn text-center">
                          <p>
                            Already have an account?
                            <Link to={process.env.PUBLIC_URL + "/login"}>
                              {" "}
                              Login here{" "}
                            </Link>
                          </p>
                        </div>


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
                      key={new Date().getUTCMilliseconds() + Math.random()}
                        id="form_registration"
                        className="form card-box"
                        onSubmit={handleSubmit}
                      >
                        <p className="form-group">
                          <label style={{color: "#0253c8"}} htmlFor="registration_fname" key={new Date().getUTCMilliseconds() + Math.random()}>First Name</label>
                          <input key={new Date().getUTCMilliseconds() + Math.random()}
                          className="form-control"
                            type="text"
                            placeholder="First name"
                            name="first_name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.first_name}
                            id="registration_fname"
                          />
                          <span className="registration_input-msg" key={new Date().getUTCMilliseconds() + Math.random()}>
                            {" "}
                            {errors.first_name &&
                              touched.first_name &&
                              errors.first_name}
                          </span>
                        </p>
                        <p className="form-group">
                          <label style={{color: "#0253c8"}} htmlFor="registration_lname" key={new Date().getUTCMilliseconds() + Math.random()}>Last Name</label>
                          <input
                          key={new Date().getUTCMilliseconds() + Math.random()}
                          className="form-control"
                            type="text"
                            placeholder="Last name"
                            name="last_name"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.last_name}
                            id="registration_lname"
                          />
                          <span className="registration_input-msg" key={new Date().getUTCMilliseconds() + Math.random()}>
                            {errors.last_name &&
                              touched.last_name &&
                              errors.last_name}
                          </span>
                        </p>
                        <p className="form-group" key={new Date().getUTCMilliseconds() + Math.random()}>
                          <label style={{color: "#0253c8"}} htmlFor="registration_email" key={new Date().getUTCMilliseconds() + Math.random()}>
                            Email Address
                          </label>
                          <input
                          key={new Date().getUTCMilliseconds() + Math.random()}
                          className="form-control"
                            type="email"
                            placeholder="Email here"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                            id="registration_email"
                          />
                          <span className="registration_input-msg" key={new Date().getUTCMilliseconds() + Math.random()}>
                            {errors.email && touched.email && errors.email}
                          </span>
                        </p>
                        <p className="form-group" key={new Date().getUTCMilliseconds() + Math.random()}>
                          <label style={{color: "#0253c8"}} htmlFor="registration_user" key={new Date().getUTCMilliseconds() + Math.random()}>
                            Phone Number
                          </label>
                          <input
                          key={new Date().getUTCMilliseconds() + Math.random()}
                          className="form-control"
                            type="number"
                            id="phone_number"
                            name="phone_number"
                            placeholder="Your phone_number here"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.phone_number}
                          />
                          <span className="registration_input-msg" key={new Date().getUTCMilliseconds() + Math.random()}>
                            {errors.phone_number &&
                              touched.phone_number &&
                              errors.phone_number}
                          </span>
                        </p>
                        <p className="form-group" key={new Date().getUTCMilliseconds() + Math.random()}>
                          <label style={{color: "#0253c8"}} htmlFor="registration_password" key={new Date().getUTCMilliseconds() + Math.random()}>
                            Password
                          </label>
                          <label style={{color: "red"}} htmlFor="registration_password" key={new Date().getUTCMilliseconds() + Math.random()}>
                            <i>
                              At least eight chatracters,one letter and one
                              number
                            </i>
                          </label>
                          <input
                          key={new Date().getUTCMilliseconds() + Math.random()}
                          className="form-control"
                            type="password"
                            placeholder="*******"
                            id="password"
                            name="password"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password}
                          />
                          <span className="registration_input-msg" key={new Date().getUTCMilliseconds() + Math.random()}>
                            {errors.password &&
                              touched.password &&
                              errors.password}
                          </span>
                        </p>
                        <p className="form-group">
                          <label style={{color: "#0253c8"}} htmlFor="registration_cpassword" key={new Date().getUTCMilliseconds() + Math.random()}>
                            Confirm Password
                          </label>
                          <input
                          key={new Date().getUTCMilliseconds() + Math.random()}
                          className="form-control"
                            type="password"
                            placeholder="Confirm password"
                            id="password_confirmation"
                            name="password_confirmation"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.password_confirmation}
                          />
                          <span className="registration_input-msg" key={new Date().getUTCMilliseconds() + Math.random()}>
                            {errors.password_confirmation &&
                              touched.password_confirmation &&
                              errors.password_confirmation}
                          </span>
                        </p>
                        <button type="submit" className="btn btn-default" disabled={isSubmitting} key={new Date().getUTCMilliseconds() + Math.random()}>
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
