import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import NavBar from "../../components/shared/NavBar";
//import { BreadcrumbBox } from "../../components/common/Breadcrumb";
import Footer from "../../components/shared/Footer";
import { Styles } from "./styles/contact.js";

// import { useState } from 'react';
// import PropTypes from 'prop-types';

import { init, send } from "emailjs-com";
// import { EMAIL_CONFIG } from "../../config"
import toast from "react-hot-toast";
import { Link } from "react-router-dom";

import facebook from "../../assets/pngs/facebook.png";
import twitter from "../../assets/pngs/twitter.png";
import linkedin from "../../assets/pngs/linkedin.png";
import $ from "jquery";

init("user_G3PO2EisAWs0dlZT1qu0g");

function Contact() {
  // const [feedback, setFeedback] = useState('');
  // const [formSubmitted, setFormSubmitted] = useState(false);
  // const [formSubmitSuccessful, setFormSubmitSuccessful] = useState(false);

  // const handleCancel = () => {
  //   // setFeedback('');
  // };

  // const handleChange = (event) => {
  //   // setFeedback(event.target.value);
  // };

  useEffect(() => {
    
    

    const form = document.getElementById("form_contact");
    const name = document.getElementById("contact_name");
    const email = document.getElementById("contact_email");
    const subject = document.getElementById("contact_subject");
    const message = document.getElementById("contact_message");

    form.addEventListener("submit", formSubmit);

    function formSubmit(e) {
      e.preventDefault();

      const nameValue = name.value.trim();
      const emailValue = email.value.trim();
      const subjectValue = subject.value.trim();
      const messageValue = message.value.trim();

      if (nameValue === "") {
        setError(name, "Name can't be blank");
      } else {
        setSuccess(name);
      }

      if (emailValue === "") {
        setError(email, "Email can't be blank");
      } else if (!isEmail(emailValue)) {
        setError(email, "Not a valid email");
      } else {
        setSuccess(email);
      }

      if (subjectValue === "") {
        setError(subject, "Subject can't be blank");
      } else {
        setSuccess(subject);
      }

      if (messageValue === "") {
        setError(message, "Message can't be blank");
      } else {
        setSuccess(message);
      }

      if (emailValue && messageValue && subjectValue && nameValue) {
        // setFormSubmitted(true);
        toast.success("Your feedback was sent.");
        send("service_qkww1qn", "template_8a8txks", {
          senderEmail: emailValue,
          title: subjectValue,
          feedback: messageValue,
          reply_to: "admin@questence.org",
          from_name: nameValue,
        })
          .then((res) => {
            if (res.status === 200) {
              // setFormSubmitSuccessful(true);
            }
          })
          // Handle errors here however you like
          .catch((err) =>
            console.error("Failed to send feedback. Error: ", err)
          );
      }
    }

    function setError(input, message) {
      const formControl = input.parentElement;
      const errorMsg = formControl.querySelector(".contact_input-msg");
      formControl.className = "form-control text-left error";
      errorMsg.innerText = message;
    }

    function setSuccess(input) {
      const formControl = input.parentElement;
      formControl.className = "form-control success";
    }

    function isEmail(email) {
      return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
    }
  });

  return (
    <Styles>
      {/* Main Wrapper */}
      <div className="main-wrapper contact-page">
        <NavBar />
        

        {/* Contact Area */}
        <section className="contact-area">
          <Container>
            <Row>
              <Col md="4" className="">
                <div className="contact-box-title">
                  <h4 className="style-3">Contact Info</h4>
                </div>
                <div className="contact-icon-box d-flex">
                  <div className="icon">
                    <i className="las la-map-marker"></i>
                  </div>
                  <div className="box-content card-box">
                    <h5 className="style-3">Our Location</h5>
                    <p className="style-8a" style={{ color: "#000" }}>
                      8A Adekunle Lawal, Ikoyi, Lagos Nigeria
                    </p>
                  </div>
                </div>
                <div className="contact-icon-box d-flex">
                  <div className="icon">
                    <i className="las la-envelope-open"></i>
                  </div>
                  <div className="box-content card-box">
                    <h5 className="style-3">Email Address</h5>
                    <p
                      className="style-8a"
                      style={{ color: "#000", textTransform: "none" }}
                    >
                      info@questence.org
                    </p>
                  </div>
                </div>
                <div className="contact-icon-box d-flex">
                  <div className="icon">
                    <i className="las la-phone"></i>
                  </div>
                  <div className="box-content card-box">
                    <h5 className="style-3">Phone Number</h5>
                    <p className="style-8a" style={{ color: "#000" }}>
                      +234{" "}
                    </p>
                  </div>
                </div>
                {/*<div className="">
                  <ul className="social list-unstyled list-inline">
                    <li className="list-inline-item">
                      
                      <Link to="#">
                        <figure>
                          <img src={facebook} alt="facebook" />
                        </figure>
                      </Link>
                    </li>
                    <li className="list-inline-item">
                      <Link to="#">
                        <figure>
                          <img src={twitter} alt="twitter" />
                        </figure>
                      </Link>
                    </li>
                    <li className="list-inline-item">
                      <Link to="#">
                        <figure>
                          <img src={linkedin} alt="linkedin" />
                        </figure>
                      </Link>
                    </li>
                  </ul>
                </div>*/}
              </Col>
              <Col md="8">
                <div className="contact-form card-box">
                  <div className="form-title">
                    <h4 className="style-3">Get In Touch</h4>
                  </div>
                  <div className="form-box">
                    <form id="form_contact" className="form">
                      <Row>
                        <Col md="6">
                          <p className="form-control">
                            <input
                              type="text"
                              placeholder="Full Name"
                              id="contact_name"
                            />
                            <span className="contact_input-msg"></span>
                          </p>
                        </Col>
                        <Col md="6">
                          <p className="form-control">
                            <input
                              type="email"
                              placeholder="Email Address"
                              id="contact_email"
                            />
                            <span className="contact_input-msg"></span>
                          </p>
                        </Col>
                        <Col md="12">
                          <p className="form-control">
                            <input
                              type="text"
                              placeholder="Subject"
                              id="contact_subject"
                            />
                            <span className="contact_input-msg"></span>
                          </p>
                        </Col>
                        <Col md="12">
                          <p className="form-control">
                            <textarea
                              name="message"
                              id="contact_message"
                              placeholder="Enter Message"
                            ></textarea>
                            <span className="contact_input-msg"></span>
                          </p>
                        </Col>
                        <Col md="12">
                          <button>Send Message</button>
                        </Col>
                      </Row>
                    </form>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

         <div className="my-auto border-top bg-green">
                <div className="container">
                        <Footer />
                </div>
            </div>
      </div>
    </Styles>
  );
}

export default Contact;
