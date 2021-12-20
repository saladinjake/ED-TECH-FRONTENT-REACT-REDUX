import React, {useState,useEffect} from 'react';
import {
 
  Container,

  NavDropdown,
  Modal,
  Button,
} from "react-bootstrap";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { Formik } from "formik";
import {
  useHistory, //useLocation
} from "react-router-dom"
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login, logOut, setPrevPath } from "../../core/redux/actions/auth.action";

import { loginUser,registerLearner,loginUserForgotPassword } from "../../api/auth.services";

import { BASE_URL } from "../../api/api_config/constants";

const HeroUnit = ({ auth: {isAuthenticated, user , prevPath }, login, logOut, setPrevPath  }) => {

    const [firstShow, setFirstShow] = useState();
  const [secondShow, setSecondShow] = useState();
  const [thirdShow, setThirdShow] = useState();
  const [fourthShow, setFourthShow] = useState();
  const [categoriesShow, setCategoriesShow] = useState();
  const [loginModalShow, setLoginModalShow] = useState(false);
  const [regModalShow, setRegModalShow] = useState(false);
  const [forgotModalShow, setForgotModalShow] = useState(false);
  const [errors, NotificationErrors] = useState({})

  const handleLoginModalClose = () => setLoginModalShow(false);
  const handleLoginModalShow = () => {
    setLoginModalShow(true);
    setRegModalShow(false);
  };

  const handleRegModalClose = () => setRegModalShow(false);
  const handleRegModalShow = () => {
    setRegModalShow(true);
    setLoginModalShow(false);
  };

  const handleForgotModalClose = () => setForgotModalShow(false);
  const handleForgotModalShow = () => {
    setRegModalShow(false);
    setLoginModalShow(false);
    setForgotModalShow(true);
  };



  /*functionality feature login signup forget pass*/
  let history = useHistory();
  

  console.log(history);
  var pattern2 = /[?redirectTo=]/;
  console.log(pattern2.test(history?.location?.search));

  const [loading, setLoading] = useState(false);
  const initialValues = { email: "", password: "" };
  const initialRegValues = {
    email: "",
    password: "",
    first_name: "",
    last_name: "",
    phone_number: "",
    password_confirmation: "",
    password:""
  };

  useEffect(() => {
    if (history.location.state?.from) {
      setPrevPath(history.location.state?.from);
    } else {
    }
    // eslint-disable-next-line
  }, []);

  const prevalidate = (setSubmitting)=>{
    let validated = false;
    let gmail_regex =/[a-zA-Z0-9]+\.[a-zA-Z0-9]+@gmail\.com/
    let email_regex =/^(?:(?!.*?[.]{2})[a-zA-Z0-9](?:[a-zA-Z0-9.+!%-]{1,64}|)|\"[a-zA-Z0-9.+!% -]{1,64}\")@[a-zA-Z0-9][a-zA-Z0-9.-]+(.[a-z]{2,}|.[0-9]{1,})$/
      let passwordRegex = new RegExp("^(?=.*[A-Za-z])(?=.*[0-9])(?=.{8,})");
    const initial = {
        email: document.getElementById("ee").value,
        password: document.getElementById("pp").value,
        first_name: document.getElementById("ff").value,
        last_name: document.getElementById("ll").value,
        phone_number: document.getElementById("ph").value,
        password_confirmation: document.getElementById("ppc").value,
      }
      let showErrorOnce = false

      console.log(initial)

      Object.keys(initial).forEach(keys=>{
        console.log(keys)
         if(initial[keys].length<=0){
           showErrorOnce =true 
           if(showErrorOnce){
             showErrorOnce=false
             toast.error("Please fill out the blank fields")
             setSubmitting(false);
              setLoading(false);
             return false
           }
          
         }
         //validate email
         if(keys=="email"){
           if(!initial[keys].match(email_regex)){
            showErrorOnce =true 
             if(showErrorOnce){
               showErrorOnce=false
               toast.error(`Invalid Email `)
               setSubmitting(false);
                setLoading(false);
               return false
            }
           }
         }

         //check password match
         if(keys=="password"){
            if(initial[keys]!=initial["password_confirmation"]){
               showErrorOnce =true 
               if(showErrorOnce){
                 showErrorOnce=false
                 toast.error("Password do not match")
                 setSubmitting(false);
                 setLoading(false);
                 return false
               }
           }


           if(!initial[keys].match(passwordRegex)){
               showErrorOnce =true 
               if(showErrorOnce){
                 showErrorOnce=false
                 toast.error("Please use a strong password . Password should contain One capital letter, and atleast a minimum of 8 alphanumeric digits and other symbols ")
                 setSubmitting(false);
                 setLoading(false);
                 return false
               }
           }
         }
      })

      return true
  }

  const handleSubmit = async (values, { setSubmitting }) => {
       setLoading(true);
       console.log(values.email,values.password)

       var formdata = new FormData();
       formdata.append("email", values.email);
       formdata.append("password", values.password);

        var requestOptions = {
          method: 'POST',
          body: formdata,
          redirect: 'follow'
        };

        fetch(`${BASE_URL}/profile-resource/api/lms-enrollment/login/`, requestOptions)
          .then(response => response.json())
          .then(result => {
            console.log(result);
            login(result);//without sso login(result.data);

            setTimeout(() => {
              window.location.reload();
            }, 2000);


            toast.success("Login Successful");

          })
          .catch(error => { 
            //console.log('error', error)


            toast.error(error);
            logOut();
            setSubmitting(false);
             setLoading(false);


          });
          setLoading(false);

    
  };



//register


const handleSubmitRegistration = async  (values, { setSubmitting }) => {
   
 
  if(prevalidate(setSubmitting)){
      setLoading(true);
     try {
       
       await registerLearner(values);
       toast.success("We have sent a verification mail to your email.");
       setTimeout(() => {
         // history.push("/");
         window.location.reload();
       }, 2000);
       setSubmitting(false);
     } catch (err) {
       setSubmitting(false);
       setLoading(false);
       if(err?.response?.data?.errors){
         
        if(err?.response?.data?.errors?.phone_number[0]){
          toast.error(err?.response?.data?.errors?.phone_number[0])
        }


        if(err?.response?.data?.errors?.email[0]){
          toast.error(err?.response?.data?.errors?.email[0])
        }


        if(err?.response?.data?.errors?.password[0]){
          toast.error(err?.response?.data?.errors?.password[0])
        }

        if(err?.response?.data?.errors){
          toast.error("Could not complete your sign up registration")
        }

        // return toast.error( err?.response?.data?.errors?.email[0] );
        Object.keys(err?.response?.data?.errors).forEach(keys=>{
         console.log(keys)
          if(err?.response?.data?.errors[keys]){
             NotificationErrors(err?.response?.data?.errors)
              toast.error(err?.response?.data?.errors[keys][0])
              setSubmitting(false);
               setLoading(false);
              //return false
          
          }
        })

       }
   
        setSubmitting(false);

      }
     setLoading(false);

   }
 };




  //password reset email
  const handleSubmitPasswordForgot = async (values, { setSubmitting }) => {
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
            <div className="border-bottom shadow-sm my-auto hero-banner-bg px-4 py-5 my-5 text-center">
                <div className="container">
                    <div className="row pb-0 pe-lg-0 pt-lg-5 rounded-3">
                        <div className="col-lg-6 offset-lg-3 p-3 p-lg-5 pt-lg-3 d-flex flex-column">
                            <h1 className="heading-lg text-center fw-bold lh-1 mb-4 text-white">Accelerate your quest, learn anywhere, anytime</h1>
                            <p className="p-lg-font text-white text-center">Acquire new knowledge and skills, train for certification diplomas and degrees from world-class instituitions at your own pace and space.</p>
                            {/* <div class="d-grid gap-2 d-md-flex align-items-center justify-content-md-start mb-4 mb-lg-3 mt-4">
                                <a class="btn btn-outline-light d-block border-radius-50 btn-sm px-4 me-md-2 fw-bold">Log In</a>
                                <a class="btn btn-solid-teal border-radius-50 d-block btn-sm px-4">Sign Up</a>
                            </div> */}
                            <div className="d-grid gap-2 d-sm-flex justify-content-sm-center">
                                <a className="btn btn btn-outline-light border-radius-50 btn-sm px-4 gap-3"  onClick={handleLoginModalShow}>Log In</a>
                                <a type="button" className="btn btn-solid-teal border-radius-50 btn-sm px-4" onClick={handleRegModalShow}>Sign Up</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



        
        <Modal
          show={regModalShow}
          onHide={handleRegModalClose}
          className="border-0"
        >
          <Modal.Header
            size="lg"
            closeButton
            className="border-0"
          ></Modal.Header>
          <Modal.Body className="border-0">
               
            <div className="col-md-12 px-3">
              <img
                src="/Questence-logo.png"
                style={{ height: "25px" }}
                alt="Logo"
                className="mx-auto d-block mb-3"
              />
              <h5 className="text-uppercase text-center fw-bold my-2">
                Registration
              </h5>


               <Formik
                    initialValues={initialValues}
                    validationSchema={LoginSchema}
                    onSubmit={handleSubmitRegistration}
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
                          id="form_reg"
                          className="form"
                          onSubmit={handleSubmit}
                        >
              <div className="row">



                <div className="mb-3 col-md-6">
                  <label for="exampleFormControlInput1" className="form-label">
                    First Name
                  </label>
                    <span className="login_input-msg">
                              {errors.first_name && touched.first_name && errors.first_name}
                            </span>
                  <input
                    type="text"
                    className="border-radius-15 form-control"
                    id="ff"
                    placeholder="First name"
                    name="first_name"
                    onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.first_name}
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label for="exampleFormControlInput1" className="form-label">
                    Last Name
                  </label>
                    <span className="login_input-msg">
                              {errors.last_name && touched.last_name && errors.last_name}
                    </span>
                  <input
                    type="text"
                    className="border-radius-15 form-control"
                    id="ll"
                    placeholder="Last name"
                    name="last_name"
                    onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.last_name}
                  />
                </div>
              </div>
              <div className="row">

                <div className="mb-3 col-md-6">
                  <label for="exampleFormControlInput1" className="form-label">
                    Email address
                  </label>
                    <span className="login_input-msg">
                              {errors.email && touched.email && errors.email}
                            </span>
                  <input
                    type="email"
                    className="border-radius-15 form-control"
                    id="ee"
                    placeholder="name@example.com"
                    name="email"
                    onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.email}
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label for="exampleFormControlInput1" className="form-label">
                    Phone Number
                  </label>
                    <span className="login_input-msg">
                              {errors.phone_number && touched.phone_number && errors.phone_number}
                            </span>
                  <input
                    type="text"
                    className="border-radius-15 form-control"
                    id="ph"
                    placeholder="Enter your phone number"
                    name="phone_number"
                    onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.phone_number}
                  />
                </div>
              </div>
              <div className="row">
                <div className="mb-3 col-md-6">
                  <label for="exampleFormControlInput1" className="form-label">
                    Password
                  </label>
                   <span className="login_input-msg">
                              {errors.password &&
                                touched.password &&
                                errors.password}
                            </span>
                  <input
                    type="password"
                    className="border-radius-15 form-control"
                    id="pp"
                    placeholder="Password"
                    name="password"
                    onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.password}
                  />
                </div>
                <div className="mb-3 col-md-6">
                  <label for="exampleFormControlInput1" className="form-label">
                    Confirm Password
                  </label>
                   <span className="login_input-msg">
                              {errors.password_confirmation &&
                                touched.password_confirmation&&
                                errors.password_confirmation}
                            </span>
                  <input
                    type="password"
                    className="border-radius-15 form-control"
                    id="ppc"
                    placeholder="Password"
                    name="password_confirmation"
                    onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.password_confirmation}
                  />
                </div>
              </div>
              <div className="mb-3">
                <button type="submit"  className="btn btn-solid-teal w-100 border-radius-15" disabled={isSubmitting}>
                  
                        {loading ? (
                          <div className="spinner-border" role="status">
                            <span className="sr-only"></span>
                          </div>
                        ) : (
                          "Register"
                        )}
                </button>
              </div>

              </form>
             )}
              </Formik>
              
             
            </div>
            
          </Modal.Body>
          <Modal.Footer className="bg-teal border-0">
            <div className="text-center text-13 fill-available">
              Already have an account ?{" "}
              <span
                className="fw-bold cursor-pointer"
                onClick={handleLoginModalShow}
              >
                Sign in
              </span>
            </div>
          </Modal.Footer>
        </Modal>
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
                Log In
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
                          id="form_login"
                          className="form"
                          onSubmit={handleSubmit}
                        >
              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">
                  Email address
                </label>
                   <span className="login_input-msg">
                              {errors.email && touched.email && errors.email}
                            </span>
                <input
                  type="email"
                  className="border-radius-15 form-control"
              
                  placeholder="name@example.com"
                   id="email"
                  name="email"
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />

              </div>
              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">
                  Password
                </label>
                <span className="login_input-msg">
                              {errors.password &&
                                touched.password &&
                                errors.password}
                            </span>
                <input
                  type="password"
                  className="border-radius-15 form-control"
                  id="exampleFormControlInput1"
                  placeholder="********"
                 id="password"
                              name="password"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.password}
                            />
                            
              </div>
              <div className="mb-3">
                <button type="submit"  className="btn btn-solid-teal w-100 border-radius-15" disabled={isSubmitting}>
                            {loading ? (
                              <div className="spinner-border" role="status">
                                <span className="sr-only"></span>
                              </div>
                            ) : (
                              "Log In"
                            )}
                  
                </button>

                
              </div>
              <div className="mb-3">
                <p
                  className="text-center cursor-pointer"
                  onClick={handleForgotModalShow}
                >
                  Forgot password
                </p>
              </div>
                 </form>
                )}
                  </Formik>
            </div>
          </Modal.Body>
          <Modal.Footer className="bg-teal border-0">
            <div className="text-center text-13 fill-available">
              Dont have an account yet?{" "}
              <span
                className="fw-bold cursor-pointer"
                onClick={handleRegModalShow}
              >
                Sign up
              </span>
            </div>
          </Modal.Footer>
        </Modal>
        <Modal
          show={forgotModalShow}
          onHide={handleForgotModalClose}
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
                Forgot Password
              </h5>

               <Formik
                    initialValues={initialValues}
                    validationSchema={ResetSchema}
                    onSubmit={handleSubmitPasswordForgot}
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
                          id="form_login"
                          className="form"
                          onSubmit={handleSubmit}
                        >
              
              <div className="mb-3">
                <label for="exampleFormControlInput1" className="form-label">
                  Email address
                </label>
                <div id="msg-box" style={{ display: "none" }}>
                          An Email has been Sent
                        </div>

                         <span className="login_input-msg">
                              {errors.email && touched.email && errors.email}
                            </span>
                <input
                              type="email"
                              placeholder="Email here"
                              id="email"
                              name="email"
                              onChange={handleChange}
                              onBlur={handleBlur}
                              value={values.email}
                              class="form-control"
                            />
                           
              </div>

              <div className="mb-3">
                <button className="btn btn-solid-teal w-100 border-radius-15" disabled={isSubmitting}>
                            {loading ? (
                              <div className="spinner-border" role="status">
                                <span className="sr-only"></span>
                              </div>
                            ) : (
                              "Send Password Reset Request"
                            )}
                              </button>
              </div>
              <p
                className="text-center cursor-pointer"
                onClick={handleLoginModalShow}
              >
                Remember My Password?{" "}
              </p>

              </form>
              
                    )}
                  </Formik>
             
            </div>

          </Modal.Body>
        </Modal>



        </>
     );
}
 

HeroUnit.propTypes = {
  auth: PropTypes.object.isRequired,
  login: PropTypes.func.isRequired,
  logOut: PropTypes.func.isRequired,
  setPrevPath: PropTypes.func.isRequired,
   cart: PropTypes.object.isRequired,
};



const mapStateToProps = (state) => ({
  auth: state.auth,
   cart: state.cart,
});

export default connect(mapStateToProps, {
  login,
  setPrevPath,
  logOut,
})(HeroUnit);

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



var passwordRegex = new RegExp(
  "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
);
//var passwordRegex = new RegExp("^(?=.*[A-Za-z])(?=.*[0-9])(?=.{8,})");

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




const ResetSchema = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email")
    .min(2, "Too Short!")
    .max(50, "Too Long!")
    .required("Required"),
 
});