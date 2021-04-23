import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
// import { Container, Row, Col } from "react-bootstrap";
import NavBar from "components/Navbar";
// import { BreadcrumbBox } from "../../components/common/Breadcrumb";
// import { Styles } from "./styles/account.js";
import { useHistory } from "react-router-dom";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { Formik } from "formik";
// import Footer from "components/Footer";


import { loginUser } from "services/auth";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login, logOut, setPrevPath } from "actions/authActions";



import "./assets/css/bootstrap.min.css";
import "./assets/css/core.css";
import "./assets/css/components.css";
import "./assets/css/icons.css";
import "./assets/css/pages.css";
import "./assets/css/responsive.css";
import "./assets/css/login.css";
// import "./basic.css";
// import BasicSlider from "./components/BasicSlider/BasicSlider";




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
      const res = await loginUser(values);
      toast.success("Login Succesfull");
      login(res.data);
      if (prevPath.length > 0) {
        history.push(prevPath);
      } else {
        if (res.data.user_roles[0].name === "User") {
          history.push("/mycourses");
        } else {
          history.push("/instructor/dashboard");
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
   <div>
      {/* Main Wrapper */}
      <div className="">
      <br />
        {/* Header 2 */}
        <NavBar />

       

        {/* Login Area */}
        <div class="account-pages"></div>
  
 
      <div  class="col-lg-8 col-md-6 hidden-md-down hidden-xs hidden-sm "  style={{background:"#fff"}} >
           <div style={{padding:"43%", background:"#fff"}}></div>
      </div>


    <div class="col-lg-4 col-md-6 col-sm-12 col-xs-12 pull-right" style={{background:"#fff",marginTop:"40px",height:"auto"}}>
      <div   >
        

        <div class="panel-body " style={{marginTop:"74px"}}>
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
                    <div className="login-box ">
                      <div className="login-title text-center">
                        <h3 style={{color: "#0253c8"}}>Log In</h3>
                      </div>
                      <form
                        id="form_login"
                        className="form form-horizontal baseForm card-box"
                        onSubmit={handleSubmit}
                      >
                        <p className="form-group">
                          <label class="formFieldLabel " style={{color: "#0253c8"}}  htmlFor="email">Email</label>
                          <input
                          className="form-control"
                            type="email"
                            placeholder="Email here"
                            id="email"
                            name="email"
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.email}
                          />
                          <span className="login_input-msg" style={{color: "red"}}>
                            {errors.email && touched.email && errors.email}
                          </span>
                        </p>
                        <p className="form-group">
                          <label style={{color: "#0253c8"}} htmlFor="login_password" class="formFieldLabel">Password</label>
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
                          <span className="login_input-msg" style={{color: "red"}}>
                            {errors.password &&
                              touched.password &&
                              errors.password}
                          </span>
                        </p>
                        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
                          {loading ? (
                            <div className="spinner-border" role="status">
                              <span className="sr-only">Loading...</span>
                            </div>
                          ) : (
                            "Login"
                          )}
                        </button>
                       
                        <div className="not_account-btn text-center">
                          <p> <br/> <br/>
                            Don't have an account yet?
                            <Link to={process.env.PUBLIC_URL + "/register"}>
                              {" "}
                              Register Here{" "}
                            </Link>
                          </p>
                        </div>
                      </form>
                    </div>
                  )}
                </Formik>


        </div>

        <div class="row m-t-20">
        <div class="col-sm-12 text-center">
          
        </div>
      </div>
      </div>

      <div class="form-group m-t-20 m-b-0" style={{height:"250px"}}>
              
            </div>

    </div>

        {/* Footer 2  <Footer /> */}
        
      </div>

      
    </div>
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



