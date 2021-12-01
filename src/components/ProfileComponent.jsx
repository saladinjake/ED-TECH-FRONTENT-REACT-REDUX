import React, { useState } from "react";
import { Nav, Tab } from "react-bootstrap";

const ProfileComponent = () => {
  const [activeKey, setActiveKey] = useState("home");
  return (
    <>
      <div class="container" style={{ marginTop: "-13rem" }}>
        <div className="row">
          <div className="col-md-3">
            <img src="/instructor.png" className="rounded w-100" />
            <p className="text-13 mt-2">
              <span className="fw-bold">Senior consultant </span>
              <br />
              Sa-fx global, MIT,MSC, BSC
            </p>
            <hr />
            <p className="text-13">
              I am a senior consultant with certificates in MIT. I have worked
              previously with google on clouds optimization as well as amazon.
            </p>
          </div>
          <div className="col-md-9 text-white">
            <div className="user-info pt-5 mb-4-2">
              <h4>My Profile</h4>
              <p>Temi Odusanya</p>
              <p>Role: Instructor</p>
            </div>
            <div className="row">
              <Tab.Container id="left-tabs-example" defaultActiveKey="home">
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="bg-teal pills-link px-3 py-2 bottom-left-radius-15 bottom-right-radius-15">
                        <Nav
                          variant="pills"
                          defaultActiveKey="home"
                          onSelect={(activeKey) => setActiveKey({ activeKey })}
                        >
                          <Nav.Item>
                            <Nav.Link eventKey="home">Profile Details</Nav.Link>
                          </Nav.Item>
                          <Nav.Item className="me-auto"></Nav.Item>
                          <Nav.Item className="text-end">
                            <Nav.Link eventKey="edit">Edit Profile</Nav.Link>
                          </Nav.Item>
                        </Nav>
                      </div>
                      <Tab.Content>
                        <Tab.Pane eventKey="home">
                          <div className="py-4 mb-3">
                            <div className="row">
                              <div class="mb-3 col-md-6">
                                <label
                                  for="exampleFormControlInput1"
                                  class="form-label text-black"
                                >
                                  First Name
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="exampleFormControlInput1"
                                />
                              </div>
                              <div class="mb-3 col-md-6">
                                <label
                                  for="exampleFormControlInput1"
                                  class="form-label text-black"
                                >
                                  Last Name
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="exampleFormControlInput1"
                                />
                              </div>
                            </div>
                            <div className="row">
                              <div class="mb-3 col-md-6">
                                <label
                                  for="exampleFormControlInput1"
                                  class="form-label text-black"
                                >
                                  Email
                                </label>
                                <input
                                  type="email"
                                  class="form-control"
                                  id="exampleFormControlInput1"
                                />
                              </div>
                              <div class="mb-3 col-md-6">
                                <label
                                  for="exampleFormControlInput1"
                                  class="form-label text-black"
                                >
                                  Phone
                                </label>
                                <input
                                  type="phone"
                                  class="form-control"
                                  id="exampleFormControlInput1"
                                />
                              </div>
                            </div>
                            <div className="row">
                              <div class="mb-3 col-md-6">
                                <label
                                  for="exampleFormControlInput1"
                                  class="form-label text-black"
                                >
                                  Gender
                                </label>
                                <select
                                  name="employment_status"
                                  className="form-control"
                                >
                                  <option value="">--Select--</option>
                                  <option value="male">Male</option>
                                  <option value="female">Female</option>
                                </select>
                              </div>
                              <div class="mb-3 col-md-6">
                                <label
                                  for="exampleFormControlInput1"
                                  class="form-label text-black"
                                >
                                  Employment Status
                                </label>
                                <select
                                  name="employment_status"
                                  className="form-control"
                                >
                                  <option value="">--Select--</option>
                                </select>
                              </div>
                            </div>
                            <div className="row">
                              <div class="mb-3 col-md-6">
                                <label
                                  for="exampleFormControlInput1"
                                  class="form-label text-black"
                                >
                                  Educational level
                                </label>
                                <select
                                  name="employment_status"
                                  className="form-control"
                                >
                                  <option value="">--Select--</option>
                                </select>
                              </div>
                              <div class="mb-3 col-md-6">
                                <label
                                  for="exampleFormControlInput1"
                                  class="form-label text-black"
                                >
                                  Degree Obtained
                                </label>
                                <select
                                  name="employment_status"
                                  className="form-control"
                                >
                                  <option value="">--Select--</option>
                                </select>
                              </div>
                            </div>
                            <div className="row">
                              <div class="mb-3 col-md-6">
                                <label
                                  for="exampleFormControlInput1"
                                  class="form-label text-black"
                                >
                                  Date of Birth
                                </label>
                                <input
                                  type="date"
                                  class="form-control"
                                  id="exampleFormControlInput1"
                                />
                              </div>
                              <div class="mb-3 col-md-6">
                                <label
                                  for="exampleFormControlInput1"
                                  class="form-label text-black"
                                >
                                  Marital Status
                                </label>
                                <select
                                  name="employment_status"
                                  className="form-control"
                                >
                                  <option value="">--Select--</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="edit">
                          <div className="py-4 mb-3">
                            <div className="row">
                              <div class="mb-3 col-md-6">
                                <label
                                  for="exampleFormControlInput1"
                                  class="form-label text-black"
                                >
                                  First Name
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="exampleFormControlInput1"
                                />
                              </div>
                              <div class="mb-3 col-md-6">
                                <label
                                  for="exampleFormControlInput1"
                                  class="form-label text-black"
                                >
                                  Last Name
                                </label>
                                <input
                                  type="text"
                                  class="form-control"
                                  id="exampleFormControlInput1"
                                />
                              </div>
                            </div>
                            <div className="row">
                              <div class="mb-3 col-md-6">
                                <label
                                  for="exampleFormControlInput1"
                                  class="form-label text-black"
                                >
                                  Email
                                </label>
                                <input
                                  type="email"
                                  class="form-control"
                                  id="exampleFormControlInput1"
                                />
                              </div>
                              <div class="mb-3 col-md-6">
                                <label
                                  for="exampleFormControlInput1"
                                  class="form-label text-black"
                                >
                                  Phone
                                </label>
                                <input
                                  type="phone"
                                  class="form-control"
                                  id="exampleFormControlInput1"
                                />
                              </div>
                            </div>
                            <div className="row">
                              <div class="mb-3 col-md-6">
                                <label
                                  for="exampleFormControlInput1"
                                  class="form-label text-black"
                                >
                                  Gender
                                </label>
                                <select
                                  name="employment_status"
                                  className="form-control"
                                >
                                  <option value="">--Select--</option>
                                  <option value="male">Male</option>
                                  <option value="female">Female</option>
                                </select>
                              </div>
                              <div class="mb-3 col-md-6">
                                <label
                                  for="exampleFormControlInput1"
                                  class="form-label text-black"
                                >
                                  Employment Status
                                </label>
                                <select
                                  name="employment_status"
                                  className="form-control"
                                >
                                  <option value="">--Select--</option>
                                </select>
                              </div>
                            </div>
                            <div className="row">
                              <div class="mb-3 col-md-6">
                                <label
                                  for="exampleFormControlInput1"
                                  class="form-label text-black"
                                >
                                  Educational level
                                </label>
                                <select
                                  name="employment_status"
                                  className="form-control"
                                >
                                  <option value="">--Select--</option>
                                </select>
                              </div>
                              <div class="mb-3 col-md-6">
                                <label
                                  for="exampleFormControlInput1"
                                  class="form-label text-black"
                                >
                                  Degree Obtained
                                </label>
                                <select
                                  name="employment_status"
                                  className="form-control"
                                >
                                  <option value="">--Select--</option>
                                </select>
                              </div>
                            </div>
                            <div className="row">
                              <div class="mb-3 col-md-6">
                                <label
                                  for="exampleFormControlInput1"
                                  class="form-label text-black"
                                >
                                  Date of Birth
                                </label>
                                <input
                                  type="date"
                                  class="form-control"
                                  id="exampleFormControlInput1"
                                />
                              </div>
                              <div class="mb-3 col-md-6">
                                <label
                                  for="exampleFormControlInput1"
                                  class="form-label text-black"
                                >
                                  Marital Status
                                </label>
                                <select
                                  name="employment_status"
                                  className="form-control"
                                >
                                  <option value="">--Select--</option>
                                </select>
                              </div>
                            </div>
                            <div class="row">
                              <div class="col-md-6 offset-md-6">
                                <button className="btn btn-solid-teal btn-lg">
                                  Save Changes
                                </button>
                              </div>
                            </div>
                          </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="instructors">
                          <div className="row mt-3"></div>
                        </Tab.Pane>
                      </Tab.Content>
                    </div>
                  </div>
                </div>
              </Tab.Container>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfileComponent;
