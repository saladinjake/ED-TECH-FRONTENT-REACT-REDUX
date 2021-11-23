import React from "react";

const ContactUs = () => {
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
              <div className="row mb-4">
                <div className="col-md-6">
                  <input
                    type="text"
                    class="form-control border-radius-15"
                    placeholder="Full Name"
                  />
                </div>
                <div className="col-md-6">
                  <input
                    type="text"
                    class="form-control border-radius-15"
                    placeholder="Email Address"
                  />
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-md-12">
                  <input
                    type="text"
                    class="form-control border-radius-15"
                    placeholder="Subject"
                  />
                </div>
              </div>
              <div className="row mb-4">
                <div className="col-md-12">
                  <textarea
                    class="form-control border-radius-15 p-3"
                    placeholder="Enter Message"
                    rows="5"
                  ></textarea>
                </div>
              </div>
              <div className="row ">
                <div className="col-md-12">
                  <button class="btn btn-light">Submit</button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ContactUs;
