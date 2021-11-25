import React, { useEffect } from "react";

import { init, send } from "emailjs-com";
// import { EMAIL_CONFIG } from "../../config"
import toast from "react-hot-toast";
import { Link } from "react-router-dom";


import $ from "jquery";

init("user_G3PO2EisAWs0dlZT1qu0g");

const ContactUs = () => {
  function setError(input, message) {
      const formControl = input.parentElement;
      const errorMsg = formControl.querySelector(".contact_input-msg");
      //formControl.className = "form-control text-left error";
      errorMsg.innerText = message;
    }

    function setSuccess(input) {
       const errorMsg = document.querySelector(".contact_input-msg");
      //formControl.className = "form-control text-left error";
       errorMsg.innerText = "";

      const formControl = input.parentElement;
      formControl.className = "form-control success";
    }

    function isEmail(email) {
      return /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/.test(email);
    }

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
              window.location.reload()
            }
          })
          // Handle errors here however you like
          .catch((err) =>
            console.error("Failed to send feedback. Error: ", err)
          );
      }
    }

    
  });

  return (
    <>
      <div className="container my-5">
        <div className="row p-3">
          <div className="col-md-6 col-sm-12">
            <p>
              Please let us know if you have a question, want to leave a
              comment, or would like further information about Questence.
            </p>
            <hr />
            <p className="border-start px-3 my-5">
              <strong>Phone Number</strong>
              <br />
              +234- 7019246751
            </p>

            <p className="border-start px-3 my-5">
              <strong>Email Address</strong>
              <br />
              <a
                href="mailto:info@questence.org"
                className="text-decoration-none text-dark"
              >
                info@questence.org
              </a>
            </p>

            <p className="border-start px-3">
              <strong>Our Location</strong>
              <br />
              8A Adekunle Lawal, Ikoyi, Lagos Nigeria
            </p>
          </div>
          <div className="col-md-6 col-sm-12">
            <div className="bg-teal border-radius-15 p-5">
              <label for="form" className="mb-4">
                Send us a message
              </label>
                 <form id="form_contact" className="form">
              <div className="row mb-4">
                <div className="col-md-6">
                   <p className="contact_input-msg"></p>
                  <input
                    type="text"
                    class="form-control border-radius-15"
                    placeholder="Full Name"
                     id="contact_name"
                  />     
                </div>
                <div className="col-md-6">
                <p className="contact_input-msg"></p>
                  <input
                    type="text"
                    class="form-control border-radius-15"
                    placeholder="Email Address"
                     id="contact_email"
                            />
                            
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-md-12">
                  <p className="contact_input-msg"></p>
                  <input
                    type="text"
                    class="form-control border-radius-15"
                    placeholder="Subject"
                  id="contact_subject"
                            />
                          
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-md-12">
                 <p className="contact_input-msg login_input-msg"></p>
                  <textarea
                    class="form-control border-radius-15 p-3"
                    placeholder="Enter Message"
                    rows="5"
                     id="contact_message"
                  ></textarea>
                 
                </div>
              </div>
              <div className="row ">
                <div className="col-md-12">
                  <button class="btn btn-light">Submit</button>
                </div>
              </div>

</form>
            </div>

              
          </div>

        </div>
      </div>
    </>
  );
};

export default ContactUs;
