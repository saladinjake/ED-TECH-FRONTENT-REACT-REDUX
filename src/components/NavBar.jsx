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
import {
  useHistory, //useLocation
} from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { login, logOut, setPrevPath } from "../redux/actions/auth.action";

import {
  loginUser,
  registerLearner,
  loginUserForgotPassword,
} from "../api/auth.services";

const AUTHLINKS = [
  {
    name: "Dashboard",
    link: "/dashboard",
    clickHandler: (callback) => {
      return callback;
    },
  },
  {
    name: "My Learning",
    link: "/my-learning",
    clickHandler: (callback) => {
      return callback;
    },
  },
  {
    name: "Wishlist",
    link: "/learner/wishlists",
    clickHandler: (callback) => {
      return callback;
    },
  },

  {
    name: "Notifications",
    link: "/notifications",
    clickHandler: (callback) => {
      return callback;
    },
  },
  {
    name: "Account Settings",
    link: "/learner/accounts",
    clickHandler: (callback) => {
      return callback;
    },
  },

  {
    name: "Profile",
    link: "/learner/profile",
    clickHandler: (callback) => {
      return callback;
    },
  },

  {
    name: "Logout",
    link: "/",
    clickHandler: (callback) => {
      return callback;
    },
  },
];

const INSTRUCTORLINKS = [
  {
    name: "Profile",
    link: "/instructor-pages/profile",
    clickHandler: (callback) => {
      return callback;
    },
  },
  {
    name: "Authored Courses",
    link: "/instructor-pages/mycourses",
    clickHandler: (callback) => {
      return callback;
    },
  },

  {
    name: "Account Settings",
    link: "/instructor-account/reset",
  },
];

const NavBar = ({
  auth: { isAuthenticated, user, prevPath },
  login,
  logOut,
  setPrevPath,
  cart: { cart },
}) => {
  /*menu and modal toggles*/

  const [firstShow, setFirstShow] = useState();
  const [secondShow, setSecondShow] = useState();
  const [thirdShow, setThirdShow] = useState();
  const [fourthShow, setFourthShow] = useState();
  const [fifthShow, setfifthShow] = useState();
  const [categoriesShow, setCategoriesShow] = useState();
  const [loginModalShow, setLoginModalShow] = useState(false);
  const [regModalShow, setRegModalShow] = useState(false);
  const [forgotModalShow, setForgotModalShow] = useState(false);

  let AuthLinks = [].concat([...AUTHLINKS]);

  // if(user.roles[0].name=="Instructor"){
  //   AuthLinks.concat([...INSTRUCTORLINKS])
  // }

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
    password: "",
  };

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

      setSubmitting(false);
    } catch (err) {
      toast.error(err?.response?.data?.message);
      logOut();
      setSubmitting(false);
      setLoading(false);
    }
    setLoading(false);
  };

  //register

  const prevalidate = (setSubmitting) => {
    let validated = false;
    let gmail_regex = /[a-zA-Z0-9]+\.[a-zA-Z0-9]+@gmail\.com/;
    let email_regex =
      /^(?:(?!.*?[.]{2})[a-zA-Z0-9](?:[a-zA-Z0-9.+!%-]{1,64}|)|\"[a-zA-Z0-9.+!% -]{1,64}\")@[a-zA-Z0-9][a-zA-Z0-9.-]+(.[a-z]{2,}|.[0-9]{1,})$/;
    let passwordRegex = new RegExp("^(?=.*[A-Za-z])(?=.*[0-9])(?=.{8,})");
    const initial = {
      email: document.getElementById("ee").value,
      password: document.getElementById("pp").value,
      first_name: document.getElementById("ff").value,
      last_name: document.getElementById("ll").value,
      phone_number: document.getElementById("ph").value,
      password_confirmation: document.getElementById("ppc").value,
    };
    let showErrorOnce = false;

    console.log(initial);

    Object.keys(initial).forEach((keys) => {
      console.log(keys);
      if (initial[keys].length <= 0) {
        showErrorOnce = true;
        if (showErrorOnce) {
          showErrorOnce = false;
          toast.error("Please fill out the blank fields");
          setSubmitting(false);
          setLoading(false);
          return false;
        }
      }
      //validate email
      if (keys == "email") {
        if (!initial[keys].match(email_regex)) {
          showErrorOnce = true;
          if (showErrorOnce) {
            showErrorOnce = false;
            toast.error(`Invalid Email \n must start with alphanumeric char
can only have alphanumeric and @._-% char\n
cannot have 2 consecutives . exept for quoted string\n
char before @ can only be alphanumeric and ._-%, exept for quoted string\n
must have @ in the middle\n
need to have at least 1 . in the domain part\n
cannot have double - in the domain part\n
can only have alphanumeric and .- char in the domain part`);
            setSubmitting(false);
            setLoading(false);
            return false;
          }
        }
      }

      //check password match
      if (keys == "password") {
        if (initial[keys] != initial["password_confirmation"]) {
          showErrorOnce = true;
          if (showErrorOnce) {
            showErrorOnce = false;
            toast.error("Password do not match");
            setSubmitting(false);
            setLoading(false);
            return false;
          }
        }

        if (!initial[keys].match(passwordRegex)) {
          showErrorOnce = true;
          if (showErrorOnce) {
            showErrorOnce = false;
            toast.error(
              "Please use a strong password . Password should contain One capital letter, and atleast a minimum of 8 alphanumeric digits and other symbols "
            );
            setSubmitting(false);
            setLoading(false);
            return false;
          }
        }
      }
    });

    return true;
  };

  const handleSubmitRegistration = async (values, { setSubmitting }) => {
    if (prevalidate(setSubmitting)) {
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
        // console.log(
        //   err?.response?.data?.errors?.email[0] || err?.response?.data?.message
        // );
        toast.error(
          err?.response?.data?.errors?.email[0] || err?.response?.data?.message
        );
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

  //search form and reset and logout

  const handleLogout = async () => {
    await logOut();
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  return (
    <>
      <header className="py-3 border-bottom d-md-none shadow-sm">
        <Navbar collapseOnSelect expand="lg">
          <Container>
            <Navbar.Brand href="/">
              <img
                src="/Questence-logo.png"
                style={{ height: "30px" }}
                alt="Logo"
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <NavDropdown title="Courses" id="collasible-nav-dropdown">
                  <NavDropdown.Item href="/categories/">
                    Languages
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/categories/">
                    Health Care
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/categories/">
                    Mathematics
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/categories/">
                    Physical Sciences
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/categories/">
                    Arts & Humanities
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/categories/">
                    Office Productivity
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/categories/">
                    Technology Engineering
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/categories/">
                    Law & Social Sciences
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/categories/">
                    Computer Science & Information
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/categories/">
                    Business & Operations Management
                  </NavDropdown.Item>
                  <NavDropdown.Item href="/categories/">
                    Others
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Programs" id="collasible-nav-dropdown">
                  <NavDropdown.Item
                    href="#action/3.1"
                    style={{ whiteSpace: "initial", width: "300px" }}
                  >
                    Nigeria Institute Of Management
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    href="#action/3.2"
                    style={{ whiteSpace: "initial", width: "300px" }}
                  >
                    Chattered Institute Of Taxation Of Nigeria
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    href="#action/3.3"
                    style={{ whiteSpace: "initial", width: "300px" }}
                  >
                    Chattered Institute Of Bankers Of Nigeria
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    href="#action/3.3"
                    style={{ whiteSpace: "initial", width: "300px" }}
                  >
                    Institute Of Chattered Accountant Of Nigeria
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    href="#action/3.1"
                    style={{ whiteSpace: "initial", width: "300px" }}
                  >
                    Institute Of Chattered Secretaries And Administrators Of
                    Nigeria
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    href="#action/3.2"
                    style={{ whiteSpace: "initial", width: "300px" }}
                  >
                    Association Of National Accountant Of Nigeria
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    href="#action/3.3"
                    style={{ whiteSpace: "initial", width: "300px" }}
                  >
                    Chattered Institute Of Personel Management Of Nigeria
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown
                  title="Learning Pathway"
                  id="collasible-nav-dropdown"
                >
                  <NavDropdown.Item href="#action/3.1">
                    Self-Paced
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.1">
                    Instructor Led
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.1">
                    By Training Partner
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Partnership" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">
                    For School
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.1">
                    For Business
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.1">
                    For Government
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
                <div className="row px-3">
                  <input
                    type="search"
                    className="form-control col"
                    placeholder="Search..."
                    aria-label="Search"
                  />
                  <i className="bi bi-search col-2 fs-4"></i>
                </div>
              </form>
              <div className="">
                <a className="btn btn-outline-dark btn-sm me-2 btn-rounded">
                  Log In
                </a>
                <a className="btn btn-solid-teal btn-sm btn-rounded">Sign Up</a>
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      <header className="py-3 border-bottom d-none d-md-flex shadow-sm">
        <Navbar expand="lg" style={{ width: "100%" }}>
          <Container fluid>
            <Navbar.Brand href="/">
              <img
                src="/Questence-logo.png"
                style={{ height: "30px" }}
                alt="Logo"
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto ">
                {/* <Nav.Link href="#home"></Nav.Link> */}
                <NavDropdown
                  title="Courses"
                  id="basic-nav-dropdown"
                  show={firstShow}
                  onMouseEnter={() => setFirstShow(true)}
                  onMouseLeave={() => setFirstShow(false)}
                >
                  <NavDropdown.Item href="./courses" className="px-4">
                    All Courses
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    <NavDropdown
                      title="By Categories"
                      id="basic-nav-dropdown"
                      className="dropend"
                      show={categoriesShow}
                      onMouseEnter={() => setCategoriesShow(true)}
                      onMouseLeave={() => setCategoriesShow(false)}
                    >
                      <div
                        className="row p-3 course-category-scroll"
                        style={{
                          width: "60vw",
                          height: "60vh",
                          overflow: "auto",
                        }}
                      >
                        <div className="col-md-4 border-end">
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="fw-bold"
                          >
                            Arts & Humanities
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Education
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            History
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Politics
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Sociology
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Geography
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Law
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Psychology
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Media And Journalism
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Architecture
                          </NavDropdown.Item>
                          <li>
                            <hr className="dropdown-divider" />
                          </li>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="fw-bold whitespace"
                          >
                            Business And Operations Management
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Human Resources Administration
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Leadership And Management
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Finance And Banking
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Accounting
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Business Process Management
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Service Management
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Supply Chain Management
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Sales And Marketing Management
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Risk Management
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Customer Service
                          </NavDropdown.Item>
                        </div>
                        <div className="col-md-4 border-end">
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="fw-bold whitespace"
                          >
                            Engineering
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Computer Engineering
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Electrical Engineering
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Mechanical Engineering
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Chemical Engineering
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Civil Engineering
                          </NavDropdown.Item>
                          <li>
                            <hr className="dropdown-divider" />
                          </li>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="fw-bold whitespace"
                          >
                            Physical Sciences
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Biology
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Physics
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Chemistry
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Environmental Studies
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Agricultural Science
                          </NavDropdown.Item>
                          <li>
                            <hr className="dropdown-divider" />
                          </li>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="fw-bold whitespace"
                          >
                            Computer Schience & Information Technology
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Computer Science
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Network And Security
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Software Development
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Digital Marketing
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            IT Management
                          </NavDropdown.Item>
                        </div>
                        <div className="col-md-4 border-end">
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="fw-bold whitespace"
                          >
                            Law & Social Sciences
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Economics
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Law
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Psychology
                          </NavDropdown.Item>
                          <li>
                            <hr className="dropdown-divider" />
                          </li>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="fw-bold whitespace"
                          >
                            Health Care
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Nursing
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Disease And Disorders
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Nutrition
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Caregiving
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Pharmacology
                          </NavDropdown.Item>
                        </div>
                      </div>
                    </NavDropdown>
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3" className="px-4">
                    By Learning Center
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    <NavDropdown
                      title="By Learning Style"
                      id="basic-nav-dropdown"
                      className="dropend"
                      show={fourthShow}
                      onMouseEnter={() => setFourthShow(true)}
                      onMouseLeave={() => setFourthShow(false)}
                    >
                      <NavDropdown.Item href="#action/3.1">
                        Instructor Led
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.1">
                        Self Paced
                      </NavDropdown.Item>
                    </NavDropdown>
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown
                  title="Programs"
                  id="basic-nav-dropdown"
                  show={secondShow}
                  onMouseEnter={() => setSecondShow(true)}
                  onMouseLeave={() => setSecondShow(false)}
                >
                  <div
                    className="row p-3 d-none d-md-flex"
                    style={{ width: "50vw" }}
                  >
                    <div className="col border-end">
                      <NavDropdown.Item href="#action/3.1">
                        NIM: Nigerian Institute of Management
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.2">
                        ICAN: Institute of Chartered Accountants
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.3">
                        CITN: Chartered Institute of Taxation of Nigeria
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.3">
                        Chartered Institute of Bankers of Nigeria
                      </NavDropdown.Item>
                    </div>
                    <div className="col">
                      <NavDropdown.Item
                        href="#action/3.1"
                        style={{ whiteSpace: "initial" }}
                      >
                        ICSAN - Institute of Chartered Secretaries and
                        Administrators of Nigeria
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.2">
                        Association Of Accountants of Nigeria
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.3">
                        CIPM: Chartered Institute of Personnel Management of
                        Nigeria
                      </NavDropdown.Item>
                    </div>
                  </div>
                  <div className="row d-md-none">
                    <div className="col-sm-12">
                      <NavDropdown.Item
                        href="#action/3.1"
                        style={{ whiteSpace: "initial", paddingBottom: "10px" }}
                      >
                        NIM: Nigerian Institute of Management
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        href="#action/3.2"
                        style={{ whiteSpace: "initial", paddingBottom: "50px" }}
                      >
                        ICAN: Institute of Chartered Accountants
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        href="#action/3.3"
                        style={{ whiteSpace: "initial", paddingBottom: "10px" }}
                      >
                        CITN: Chartered Institute of Taxation of Nigeria
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        href="#action/3.3"
                        style={{ whiteSpace: "initial", paddingBottom: "50px" }}
                      >
                        Chartered Institute of Bankers of Nigeria
                      </NavDropdown.Item>
                    </div>
                    <div className="col-sm-12">
                      <NavDropdown.Item
                        href="#action/3.1"
                        style={{ whiteSpace: "initial", paddingBottom: "50px" }}
                      >
                        ICSAN - Institute of Chartered Secretaries and
                        Administrators of Nigeria
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        href="#action/3.2"
                        style={{ whiteSpace: "initial", paddingBottom: "50px" }}
                      >
                        Association Of Accountants of Nigeria
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        href="#action/3.3"
                        style={{ whiteSpace: "initial", paddingBottom: "50px" }}
                      >
                        CIPM: Chartered Institute of Personnel Management of
                        Nigeria
                      </NavDropdown.Item>
                    </div>
                  </div>
                </NavDropdown>
                <NavDropdown
                  title="For Institutions"
                  id="basic-nav-dropdown"
                  show={thirdShow}
                  onMouseEnter={() => setThirdShow(true)}
                  onMouseLeave={() => setThirdShow(false)}
                >
                  <NavDropdown.Item href="#action/3.1">
                    For Schools
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    For Businesses
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    For Governments
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
                {/*<input id="search" onKeyPress={handleKeyPress} type="search" className="form-control align-search" placeholder="Search..." aria-label="Search" /> */}
                <i className="bi bi-search "></i>
              </form>
              <div className="text-end">
                {isAuthenticated ? (
                  <>
                    <NavDropdown
                      title={
                        "Logged in as " +
                        user?.first_name +
                        " " +
                        user?.last_name
                      }
                      id="basic-nav-dropdownx"
                      show={thirdShow}
                      onMouseEnter={() => setfifthShow(true)}
                      onMouseLeave={() => setfifthShow(false)}
                    >
                      {AuthLinks.length &&
                        AuthLinks.map((links_authorized) => {
                          return (
                            <NavDropdown.Item href={links_authorized.link}>
                              {links_authorized.name}
                            </NavDropdown.Item>
                          );
                        })}
                    </NavDropdown>
                  </>
                ) : (
                  <>
                    <a
                      className="btn btn-outline-dark btn-sm me-2 btn-rounded"
                      onClick={handleLoginModalShow}
                    >
                      Log In
                    </a>
                    <a
                      className="btn btn-solid-teal btn-sm btn-rounded"
                      onClick={handleRegModalShow}
                    >
                      Sign Up
                    </a>
                  </>
                )}
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>

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
                  <form id="form_reg" className="form" onSubmit={handleSubmit}>
                    <div className="row">
                      <div className="mb-3 col-md-6">
                        <label
                          for="exampleFormControlInput1"
                          className="form-label"
                        >
                          First Name
                        </label>
                        <span className="login_input-msg">
                          {errors.first_name &&
                            touched.first_name &&
                            errors.first_name}
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
                        <label
                          for="exampleFormControlInput1"
                          className="form-label"
                        >
                          Last Name
                        </label>
                        <span className="login_input-msg">
                          {errors.last_name &&
                            touched.last_name &&
                            errors.last_name}
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
                        <label
                          for="exampleFormControlInput1"
                          className="form-label"
                        >
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
                        <label
                          for="exampleFormControlInput1"
                          className="form-label"
                        >
                          Phone Number
                        </label>
                        <span className="login_input-msg">
                          {errors.phone_number &&
                            touched.phone_number &&
                            errors.phone_number}
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
                        <label
                          for="exampleFormControlInput1"
                          className="form-label"
                        >
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
                        <label
                          for="exampleFormControlInput1"
                          className="form-label"
                        >
                          Confirm Password
                        </label>
                        <span className="login_input-msg">
                          {errors.password_confirmation &&
                            touched.password_confirmation &&
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
                      <button
                        type="submit"
                        className="btn btn-solid-teal w-100 border-radius-15"
                        disabled={isSubmitting}
                      >
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
                      <label
                        for="exampleFormControlInput1"
                        className="form-label"
                      >
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
                      <label
                        for="exampleFormControlInput1"
                        className="form-label"
                      >
                        Password
                      </label>
                      <span className="login_input-msg">
                        {errors.password && touched.password && errors.password}
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
                      <button
                        type="submit"
                        className="btn btn-solid-teal w-100 border-radius-15"
                        disabled={isSubmitting}
                      >
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
                      <label
                        for="exampleFormControlInput1"
                        className="form-label"
                      >
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
                      <button
                        className="btn btn-solid-teal w-100 border-radius-15"
                        disabled={isSubmitting}
                      >
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
      </header>
    </>
  );
};

NavBar.propTypes = {
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
})(NavBar);

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
