import React, { useState, useEffect } from "react";
import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Modal,
  Button,
} from "react-bootstrap";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { Formik } from "formik";
import $ from "jquery"
import {
  useHistory, //useLocation
} from "react-router-dom"
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { setPrevPath } from "../../core/redux/actions/auth.action";
import { BASE_URL_ENROLLMENT } from "../../api/api_config/constants"



import { 
    ChangePassword,
  
   } from "../../api/auth.services";


import { BASE_URL } from "../../api/api_config/constants";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import DigitalOnlineLearning from "../components/DigitalOnlineLearning";

import qs from "qs";
var axios = require('axios');
const ChangePasswordScreen = () => {
  let history = useHistory();

  const getTokenItemFromString = (thePath) =>
    thePath.substring(thePath.lastIndexOf("/") + 1);

  let params = qs.parse(history?.location?.search, { ignoreQueryPrefix: true });

  let token = getTokenItemFromString(window.location.href);
  let tokenSplit = token.split("?")[0];
  // alert(tokenSplit)



    const [loginModalShow, setLoginModalShow] = useState(true);

    const handleLoginModalClose = () => setLoginModalShow(false);
    const handleLoginModalShow = () => {
      setLoginModalShow(false);

    };


     /*functionality feature login signup forget pass*/

  var pattern2 = /[?redirectTo=]/;
  console.log(pattern2.test(history?.location?.search));

  const [loading, setLoading] = useState(false);
  const initialValues = { password: "", confirmPassword: "" };
 

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
      values.email = params.email;
      values.token = tokenSplit;
      values["password_confirmation"] =values?.confirmPassword
      // values.token =
      if(values.password!==values.confirmPassword){
        toast.error('password do not match');
        setSubmitting(false);
        setLoading(false);
        return false;
      }

    //   let res = await ChangePassword(values);


var data = qs.stringify({
  'email': values.email,
  'password': values.password,
  'password_confirmation':     values["password_confirmation"],
  'token': tokenSplit
});
var config = {
  method: 'post',
  url: BASE_URL_ENROLLMENT +'/auth/password/reset',
  headers: { 
    'Content-Type': 'application/x-www-form-urlencoded'
  },
  data : data
};

axios(config)
.then(function (response) {
  console.log(JSON.stringify(response.data));
  toast.success(JSON.stringify(response.data))
  history.push("../");
})
.catch(function (response) {
    toast.error(JSON.stringify(response?.error?.message|| response?.error || "could not perform the update password request"))
});

     // console.log(res);
      setSubmitting(false);

  
    
      
    } catch (err) {
        //toast.error(err?.response?.data?.message|| "Network error");
        Object.keys(err?.response?.data?.errors).map(errval=>{
            return toast.error(err?.response?.data?.errors[errval])
        })
        
     
      // logOut();
      setSubmitting(false);
    }
    setLoading(false);
  };

  return (
    <>
      <NavBar />
      <PageHeader
        pageTitle="Password Reset"
        bgClass="courses-banner-bg"
      />

 
<Modal
          show={loginModalShow}
          onHide={handleLoginModalClose}
          className="border-0"
        >
          <Modal.Header closeButton className="border-0"></Modal.Header>
          <Modal.Body className="border-0">
            <div className="col-md-8 mx-auto">
              <img
                src="/Questence-logo.png"
                style={{ height: "25px" }}
                alt="Logo"
                className="mx-auto d-block mb-3"
              />
              <h5 className="text-uppercase text-center fw-bold my-2">
                Reset Your Password
              </h5>
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

                     <form
                          id="authenticate_anonymous_user"
                          className="form"
                          onSubmit={handleSubmit}
                          data-signin="authenticate_anonymous_user"
                          enctype="application/x-www-form-urlencoded; charset=UTF-8"
                        >
              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">
                  New Password
                </label>
                   <span className="login_input-msg">
                              {errors.password && touched.password && errors.password}
                            </span>
                <input
                  type="password"
                  className="border-radius-15 form-control"
              
                  placeholder="*********"
                   id="email"
                  name="password"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.password}
                />

              </div>
              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">
                 Confirm Password
                </label>
                <span className="login_input-msg">
                              {errors.confirmPassword &&
                                touched.confirmPassword  &&
                                errors.confirmPassword }
                            </span>
                <input
                  type="password"
                  className="border-radius-15 form-control"
                  id="exampleFormControlInput1"
                  placeholder="********"
                 id="password"
                              name="confirmPassword"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.confirmPassword}
                            />
                            
              </div>
              <div className="mb-3">
                <button type="submit"  className="btn btn-solid-teal w-100 border-radius-15" disabled={isSubmitting}>
                            {loading ? (
                              <div className="spinner-border" role="status">
                                <span className="sr-only"></span>
                              </div>
                            ) : (
                              "Change Password"
                            )}
                  
                </button>

                
              </div>
              <div className="mb-3">
                <p
                  className="text-center cursor-pointer"
                  onClick={()=>{window.location.href= process.env.PUBLIC_URL+ "/"}}
                >
                 Remember My Password
                </p>
              </div>
                 </form>
                )}
                  </Formik>
            </div>
          </Modal.Body>
          <Modal.Footer className="bg-teal border-0">
           
          </Modal.Footer>
        </Modal>
     
      <Footer />
    </>
  );
};

ChangePasswordScreen.propTypes = {
  
  };
  
  
  
  const mapStateToProps = (state) => ({
  
  });
  
  export default connect(mapStateToProps, {
   
    setPrevPath,
 
  })(ChangePasswordScreen)
  
  const LoginSchema = Yup.object().shape({
    password: Yup.string()
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
  confirmPassword: Yup.string().oneOf(
    [Yup.ref("password"), null],
    "Passwords must match"
  ),
  // .min(2, "Too Short!")
  // .max(50, "Too Long!")
  // .required("Required"),
});
  
  
  
  var passwordRegex = new RegExp(
    "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
  );
