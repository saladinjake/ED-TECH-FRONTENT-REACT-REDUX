import React, { useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Styles } from "components/styles/busRegister.js";

function FreeCourse() {
  useEffect(() => {
    const form = document.getElementById("form3");
    const name = document.getElementById("name3");
    const email = document.getElementById("email3");
    const phone = document.getElementById("phone3");

    form.addEventListener("submit", formSubmit);

    function formSubmit(e) {
      e.preventDefault();

      const nameValue = name.value.trim();
      const emailValue = email.value.trim();
      const phoneValue = phone.value.trim();

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

      if (phoneValue === "") {
        setError(phone, "Phone number can't be blank");
      } else if (isNaN(phoneValue)) {
        setError(phone, "Not a valid phone number");
      } else {
        setSuccess(phone);
      }
    }

    function setError(input, message) {
      const formControl = input.parentElement;
      const errorMsg = formControl.querySelector(".input-msg3");
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
      {/* Free Course */}
      <section className="free-course-area">
        <Container>
          <Row>
            <Col md="6">
              <div className="course-text">
                <h4>Create your business profile today</h4>
                <p>
                  If you're interested in training your team or employees using
                  Questence, please apply on this form.{" "}
                </p>
                <p>
                  After you submit the form, we will reach out to you to gain
                  better knowledge of how we can help you achieve your goals.
                  Please note that it might take between 24 - 72 hours to
                  respond to your application.
                </p>
              </div>
            </Col>
            <Col md="6">
              <div
                className="register-form text-center"
                style={{
                  backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/business-about.png)`,
                }}
              >
                <div className="form-box">
                  {/* <h4 className="title"></h4> */}
                  <form id="form3" className="form">
                    <Row>
                      <Col lg="12">
                        <p className="form-control">
                          <input
                            type="text"
                            placeholder="Contact Person"
                            id="name3"
                          />
                          <span className="input-msg3"></span>
                        </p>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="12">
                        <p className="form-control">
                          <input type="text" placeholder="Company Name" id="" />
                          <span className="input-msg3"></span>
                        </p>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <p className="form-control">
                          <input
                            type="text"
                            placeholder="Phone Number"
                            id="phone3"
                          />
                          <span className="input-msg3"></span>
                        </p>
                      </Col>
                      <Col lg="6">
                        <p className="form-control">
                          <input
                            type="email"
                            placeholder="Corporate Email"
                            id="email3"
                          />
                          <span className="input-msg3"></span>
                        </p>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <p className="form-control">
                          <input
                            type="text"
                            placeholder="Country of operation"
                            id=""
                          />
                          <span className="input-msg3"></span>
                        </p>
                      </Col>
                      <Col lg="6">
                        <p className="form-control">
                          <input
                            type="text"
                            placeholder="Service industry"
                            id=""
                          />
                          <span className="input-msg3"></span>
                        </p>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="6">
                        <p className="form-control">
                          <input
                            type="text"
                            placeholder="Your Role at Company"
                            id=""
                          />
                          <span className="input-msg3"></span>
                        </p>
                      </Col>
                      <Col lg="6">
                        <p className="form-control">
                          <input
                            type="text"
                            placeholder="Est. number of users"
                            id=""
                          />
                          <span className="input-msg3"></span>
                        </p>
                      </Col>
                    </Row>
                    <Row>
                      <Col lg="12">
                        <p className="form-control">
                          <input
                            type="textarea"
                            placeholder="Any other information you'd like us to know?"
                            id=""
                          />
                          <span className="input-msg3"></span>
                        </p>
                      </Col>
                    </Row>
                    <button type="submit">Send Request</button>
                  </form>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Styles>
  );
}

export default FreeCourse;
