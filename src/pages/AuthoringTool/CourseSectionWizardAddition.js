import React, { Fragment, useEffect } from "react";
import { Container, Col, Row } from "react-bootstrap";
import { HeaderBox } from "./activityboxes";
import NavBar from "components/Navbar";
import Footer from "components/Footer";

import { Link } from "react-router-dom";
import { AddHead } from "./sidebar";
import $ from "jquery";
import { Styles } from "./styles/main.js";


import ReactQuill, { Mixin, Toolbar, Quill } from "react-quill";
import Dropzone, { ImageFile } from "react-dropzone";
//import PropTypes from "prop-types"




class Editor extends React.Component {
  constructor (props) {
    super(props)
    this.state = { editorHtml: '', theme: 'snow' }
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (html) {
    this.setState({ editorHtml: html });
  }

  handleThemeChange (newTheme) {
    if (newTheme === "core") newTheme = null;
    this.setState({ theme: newTheme })
  }

  render () {
    return (
      <div>
        <ReactQuill
          theme={this.state.theme}
          onChange={this.handleChange}
          value={this.state.editorHtml}
          modules={Editor.modules}
          formats={Editor.formats}
          bounds={'.app'}
          placeholder={this.props.placeholder}
         />

       </div>
     )
  }
}



/*
 * Quill modules to attach to editor
 * See https://quilljs.com/docs/modules/ for complete options
 */
Editor.modules = {
  toolbar: [
    [{ 'header': '1'}, {'header': '2'}, { 'font': [] }],
    [{size: []}],
    ['bold', 'italic', 'underline', 'strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'},
     {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image', 'video'],
    ['clean']
  ],
  clipboard: {
    // toggle to add extra line breaks when pasting HTML:
    matchVisual: false,
  }
}
/*
 * Quill editor formats
 * See https://quilljs.com/docs/formats/
 */
Editor.formats = [
  'header', 'font', 'size',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image', 'video'
]

/*
 * PropType validation
 */
//Editor.propTypes = {
//  placeholder: PropTypes.string,
//}


export default class MasterForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentStep: 1,
      finishedClicked: false,
      email: "",
      username: "",
      password: "",
      comment: "",
      passwordConfirmation: "",
      formErrors: {
        email: "",
        username: "",
        password: "",
        passwordConfirmation: "",
      },
      formValidity: {
        email: false,
        username: false,
        password: false,
        passwordConfirmation: false,
      },
      canSubmit: false,
    };
    this.handleChange = this.handleChange.bind(this);
    this._next = this._next.bind(this);
    this._prev = this._prev.bind(this);
  }

  goToStep(e, step) {
    e.preventDefault();
    this.setState({
      currentStep: step,
    });
  }

  _next() {
    let currentStep = this.state.currentStep;
    currentStep = currentStep >= 6 ? 7 : currentStep + 1;
    this.setState({
      currentStep: currentStep,
    });
  }

  _prev() {
    let currentStep = this.state.currentStep;
    currentStep = currentStep <= 1 ? 1 : currentStep - 1;
    this.setState({
      currentStep: currentStep,
    });
  }

  handleChange(event) {
    const { name, value } = event.target;
    this.setState(
      {
        [name]: value,
      },
      function () {
        this.validateField(name, value);
      }
    );
  }

  validateField(name, value) {
    if (Object.keys(this.state.formErrors).includes(name)) {
      const fieldValidationErrors = this.state.formErrors;
      const validity = this.state.formValidity;
      const isEmail = name === "email";
      const isPassword = name === "password";
      const isPasswordConfirmation = name === "passwordConfirmation";
      const label =
        name === "passwordConfirmation" ? "password confirmation" : name;
      const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

      validity[name] = value.length > 0;
      fieldValidationErrors[name] = validity[name]
        ? ""
        : `${label} is required and cannot be empty`;

      if (validity[name]) {
        if (isPassword) {
          validity[name] = value.length >= 5;
          fieldValidationErrors[name] = validity[name]
            ? ""
            : `${label} should be 5 characters or more`;
        }
        if (isEmail) {
          validity[name] = emailTest.test(value);
          fieldValidationErrors[name] = validity[name]
            ? ""
            : `${label} should be a valid email address`;
        }
        if (isPasswordConfirmation) {
          validity[name] = value === this.state.password;
          fieldValidationErrors[name] = validity[name]
            ? ""
            : `${label} should match password`;
        }
      }

      this.setState(
        {
          formErrors: fieldValidationErrors,
          formValidity: validity,
        },
        () => this.canSubmit()
      );
    }
  }

  canSubmit() {
    this.setState({
      canSubmit:
        this.state.formValidity.email &&
        this.state.formValidity.username &&
        this.state.formValidity.password &&
        this.state.formValidity.passwordConfirmation,
    });
  }

  errorClass(error) {
    return error.length === 0 ? "" : "is-invalid";
  }

  handleSubmit = (event) => {
    event.preventDefault();
    const { email, username, password } = this.state;
    alert(`Your registration detail: \n
           Email: ${email} \n
           Username: ${username} \n
           Password: ${password}`);
  };

  get previousButton() {
    let currentStep = this.state.currentStep;
    // if (currentStep !== 1) {
      if(document.getElementById("list-nav-gate"+currentStep)){
        document.getElementById("list-nav-gate"+currentStep).backgroundColor="rgba(8,23,200)"
      }

      return (
        <li className="previous list-inline-item" onClick={this._prev}>
          <a href="#" className="">
            {" "}
            <i className="fa fa-arrow-left" style={{color:"#fff"}}></i>{" "}
          </a>
        </li>
      );
    // }
    // return null;
  }

  get nextButton() {
    let currentStep = this.state.currentStep;
    if(document.getElementById("list-nav-gate-"+currentStep)){
        document.getElementById("list-nav-gate-"+currentStep).backgroundColor="rgba(8,23,200)"
      }
    // if (currentStep < 7) {
      return (
        <li className="next list-inline-item" onClick={this._next}>
          <a href="#" className="">
            {" "}
            <i className="fa fa-arrow-right" style={{color:"#fff"}}></i>{" "}
          </a>
        </li>
      );
    // }
    // return null;
  }

  render() {
    return (
      <Fragment>
        <AddHead />

        <div className="row">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body"  >
                <h4 className="header-title mb-3">
                  Course adding form{" "}
                  <a
                    href="#/user/courses"
                    className="alignToTitle btn btn-outline-secondary btn-rounded btn-sm"
                  >
                    {" "}
                    <i className=" mdi mdi-keyboard-backspace"></i> Back to
                    course list
                  </a>
                  <br />
                </h4>
                <br />

                <div className="row">
                  <div className="col-md-12">

                  <ul className="nav nav-pills nav-justified form-wizard-header mb-3" style={{background:"#fff", padding:"1px"}}>

                        <li
                        id="list-nav-gate-1"
                          className="nav-item"
                          style={{border:"none"}}
                          onClick={(e) => {
                            this.goToStep(e, 1);
                          }}
                        >
                          <a
                            href="#basic"
                            data-toggle="tab"
                            className="nav-link rounded-0 pt-2 pb-2 active"
                          >
                            <i className="fa fa-pen mr-1"></i>
                            <span className="d-none d-sm-inline">Curriculum</span>
                          </a>
                        </li>

                        <li
                        id="list-nav-gate-2"
                        style={{border:"none"}}
                          className="nav-item"
                          onClick={(e) => {
                            this.goToStep(e, 2);
                          }}
                        >
                          <a
                            href="#media"
                            data-toggle="tab"
                            className="nav-link rounded-0 pt-2 pb-2"
                          >
                            <i className="fa fa-video mr-1"></i>
                            <span className="d-none d-sm-inline">Live Class</span>
                          </a>
                        </li>


                      </ul>

                    <form

                      className="required-form"
                      method="post"
                      enctype="multipart/form-data"
                    >


                      <Step1
                        currentStep={this.state.currentStep}
                        finishedClicked={this.state.finishedClicked}
                        handleChange={this.handleChange}
                        errorEmailclassName={this.errorClass(
                          this.state.formErrors.email
                        )}
                        email={this.state.email}
                        errorEmail={this.state.formErrors.email}
                        errorUsernameclassName={this.errorClass(
                          this.state.formErrors.username
                        )}
                        username={this.state.username}
                        errorUsername={this.state.formErrors.username}
                      />



                      <br />
                      <br />


                    </form>
                    <br />
                      <br />
                      <div style={{position:"absolute",bottom:"0px"}}>
                      <ul className="list-inline mb-0 wizard text-center">
                        {this.previousButton}

                        {this.nextButton}
                      </ul>
                      </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    );
  }
}

class Step1 extends React.Component {
  render() {
    if (this.props.currentStep !== 1) {
      return null;
    }
    return (
      <React.Fragment>
        <div className="tab-content b-0 mb-0">
          <div className="tab-pane active" id="basic">
                                        <div className="row justify-content-center">
    <div className="col-md-12 mb-4 text-center mt-3">
        <a href="javascript::void(0)" className="btn btn-outline-primary btn-rounded btn-sm ml-1"
        onclick="showAjaxModal('http://demo4a.questence.org/modal/popup/section_add/29', 'Add new section')">
        <i className="mdi mdi-plus"></i> Add section</a>
        <a href="javascript::void(0)" className="btn btn-outline-primary btn-rounded btn-sm ml-1"
        onclick="showAjaxModal('http://demo4a.questence.org/modal/popup/lesson_types/29', 'Add new lesson')">
        <i className="mdi mdi-plus"></i> Add lesson</a>
                    <a href="javascript::void(0)" className="btn btn-outline-primary btn-rounded btn-sm ml-1"
            onclick="showAjaxModal('http://demo4a.questence.org/modal/popup/quiz_add/29', 'Add new quiz')">
            <i className="mdi mdi-plus"></i> Add quiz</a>
            <a href="javascript::void(0)" className="btn btn-outline-primary btn-rounded btn-sm ml-1"
             onclick="showLargeModal('http://demo4a.questence.org/modal/popup/sort_section/29', 'Sort sections')">
             <i className="mdi mdi-sort-variant"></i> Sort sections</a>
            </div>
            <br/><br/>

    <div className="col-md-8">
        <div className="row">
         <br/><br/> <br/><br/>
                        <div className="col-md-12">
                <div className="card bg-light text-seconday  mb-5" id="section-137">
                    <div className="card-body">
                        <h5 className="card-title" style={{minHeight: "45px"}}><span className="font-weight-light">Section 1</span>: Getting Started                            <div className="row justify-content-center alignToTitle float-right display-none" id="widgets-of-section-137" style={{display: "none"}}>
                                <button type="button" className="btn btn-outline-secondary btn-rounded btn-sm" name="button" onclick="showLargeModal('http://demo4a.questence.org/modal/popup/sort_lesson/137', 'Sort lessons')"><i className="mdi mdi-sort-variant"></i> Sort lesson</button>
                                <button type="button" className="btn btn-outline-secondary btn-rounded btn-sm ml-1" name="button" onclick="showAjaxModal('http://demo4a.questence.org/modal/popup/section_edit/137/29', 'Update section')"><i className="mdi mdi-pencil-outline"></i> Edit section</button>
                                <button type="button" className="btn btn-outline-secondary btn-rounded btn-sm ml-1" name="button" onclick="confirm_modal('http://demo4a.questence.org/user/sections/29/delete/137');"><i className="mdi mdi-window-close"></i> Delete section</button>
                            </div>
                        </h5>
                        <div className="clearfix"></div>
                                                <div className="col-md-12">

                            <div className="card text-secondary on-hover-action mb-2 sect-toow" id="lesson-256">
                                <div className="card-body thinner-card-body">
                                    <div className="card-widgets" style={{display:"block"}} id="widgets-of-lesson-256" >
                                      <a href="javascript::" onclick="showAjaxModal('/29', 'Update lesson')">
                                      <i className="mdi mdi-pencil-outline"></i></a>
                                                                                <a href="javascript::" onclick="confirm_modal('256');">
                                                                                <i className="mdi mdi-window-close"></i></a>
                                    </div>
                                    <h5 className="card-title mb-0">
                                        <span className="font-weight-light">
                                  <img src="./1_files/video.png" alt="" height="16" />
                                            Lesson 1 </span>: Welcome!
                                        </h5>
                                </div>
                            </div>
                        </div>
                                    </div>
            </div>
        </div>
    </div>
</div>
</div>
                                    </div>

        </div>



      </React.Fragment>
    );
  }
}

class DynamicForm extends React.Component {
  constructor() {
    super();
    this.state = {
      shareholders: [{ name: "" }],
    };
  }

  handleShareholderNameChange = (idx) => (evt) => {
    const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, name: evt.target.value };
    });

    this.setState({ shareholders: newShareholders });
  };

  handleAddShareholder = () => {
    this.setState({
      shareholders: this.state.shareholders.concat([{ name: "" }]),
    });
  };

  handleRemoveShareholder = (idx) => () => {
    this.setState({
      shareholders: this.state.shareholders.filter((s, sidx) => idx !== sidx),
    });
  };

  render() {
    return (
    <div className="row">
      <div className="col-md-12">
        <h6>{this.props.title}</h6>

        {this.state.shareholders.map((shareholder, idx) => (
          <div className="shareholder form-group ">
         <div className="col-md-10 fl-left">
            <input
              type="text"
              placeholder={` #${idx + 1} name`}
              value={shareholder.name}
              onChange={this.handleShareholderNameChange(idx)}
              className="form-control fl-left"
            />
          </div>
         { /*<div className="col-md-2">
            <button
              type="button"
              onClick={this.handleRemoveShareholder(idx)}
              className="small text-white"
            >
              -
            </button>
            </div>*/}
          </div>
        ))}
        <br/><br/>
        <button
          type="button"
          onClick={this.handleAddShareholder}
          className="btn btn-primary text-white"
          style={{width:"300px",margin:"10px"}}

        >
          Add A Team
        </button>
      </div>

       </div>
    );
  }
}

class Step5 extends React.Component {

   constructor() {
    super();
    this.state = {
      shareholders: [{ name: "" }],
    };
  }

  handleShareholderNameChange = (idx) => (evt) => {
    const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, name: evt.target.value };
    });

    this.setState({ shareholders: newShareholders });
  };

  handleAddShareholder = () => {
    this.setState({
      shareholders: this.state.shareholders.concat([{ name: "" }]),
    });
  };

  handleRemoveShareholder = (idx) => () => {
    this.setState({
      shareholders: this.state.shareholders.filter((s, sidx) => idx !== sidx),
    });
  };


  render() {
    if (this.props.currentStep !== 5) {
      return null;
    }
    return (
      <React.Fragment>
        <div className="tab-pane card-box" id="outcomes">
          <div className="row justify-content-center">
            <div className="col-md-12">


            <div className="form-group col-md-6 fl-left">
                  <label className="col-md-12 col-form-label" for="course_title">
                    Grace period after deadline in weeks <span className="required">*</span>{" "}
                  </label>
                  <div className="">
                    <input
                      type="text"
                      className="form-control"
                      id="course_title2"
                      name="title"
                      placeholder="Enter course title"
                      required=""
                    />
                  </div>
                </div>



<div className="form-group  col-md-6 fl-left">
    <label className="col-md-12 col-form-label" for="level">Grade</label>
    <div className="" data-select2-id="94">
        <select  className="form-control select2 select2-hidden-accessible" data-toggle="select2" name="level" id="level" data-select2-id="level" tabindex="-1" aria-hidden="true">
            <option value="beginner" data-select2-id="4">20-50%</option>
            <option value="advanced" data-select2-id="95">50-70%</option>
            <option value="intermediate" data-select2-id="96">90%</option>
        </select>

    </div>
</div>


<div className="form-group  col-md-6 fl-left">
    <label className="col-md-12 col-form-label" for="level">Assignment/Exam Type</label>
    <div className="" data-select2-id="94">
        <select  className="form-control select2 select2-hidden-accessible" data-toggle="select2" name="level" id="level" data-select2-id="level" tabindex="-1" aria-hidden="true">
            <option value="beginner" data-select2-id="4">Professional</option>
            <option value="advanced" data-select2-id="95">Certificate issued</option>

        </select>

    </div>
</div>


              {/*<div className="form-group row mb-3">
                <label className="col-md-2 col-form-label" for="outcomes">
                  Requirements
                </label>
                <div className="col-md-10">
                  <div id="outcomes_area">
                    <div className="d-flex mt-2">
                      <div className="flex-grow-1 px-3">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            name="outcomes[]"
                            id="outcomes"
                            placeholder="Provide outcomes"
                          />
                        </div>
                      </div>
                      <div className="">
                        <button
                          type="button"
                          className="btn btn-success btn-sm"
                          name="button"
                            onClick={this.handleAddShareholder}
                        >
                          {" "}
                          <i className="fa fa-plus"></i>{" "}
                        </button>
                      </div>
                    </div>
                    <div id="blank_outcome_field" style={{ display: "none" }}>
                      <div className="d-flex mt-2">
                        <div className="flex-grow-1 px-3">
                          <div className="form-group">
                            <input
                              type="text"
                              className="form-control"
                              name="outcomes[]"
                              id="outcomes"
                              placeholder="Provide outcomes"
                            />
                          </div>
                        </div>
                        <div className="">
                          <button
                            type="button"
                            className="btn btn-danger btn-sm"
                            style={{ marginTop: "0px" }}
                            name="button"
                            onclick="removeOutcome(this)"
                          >
                            {" "}
                            <i className="fa fa-minus"></i>{" "}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>*/}
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

class Step3 extends React.Component {

   constructor() {
    super();
    this.state = {
      shareholders: [{ name: "" }],
    };
  }



  render() {
    if (this.props.currentStep !== 3) {
      return null;
    }
    return (
      <React.Fragment>
        <div className="tab-pane" id="requirements">
          <div className="row card-box">
            <div className="col-md-12">



            <div className="form-group col-md-6 fl-left">
                  <label className="col-md-12 col-form-label" for="course_title">
                    Course Start Date <span className="required">*</span>{" "}
                  </label>
                  <div className="">
                    <input
                      type="date"
                      className="form-control"
                      id="course_title"
                      name="title"
                      placeholder="Enter course title"
                      required=""
                    />
                  </div>
                </div>


                <div className="form-group col-md-6 fl-left">
                  <label className="col-md-12 col-form-label" for="course_title">
                    Course End Date <span className="required">*</span>{" "}
                  </label>
                  <div className="">
                    <input
                      type="date"
                      className="form-control"
                      id="course_title2"
                      name="title"
                      placeholder="Enter course title"
                      required=""
                    />
                  </div>
                </div>






            <div className="form-group col-md-6 fl-left">
                  <label className="col-md-12 col-form-label" for="course_title">
                    Enrollments Start Date <span className="required">*</span>{" "}
                  </label>
                  <div className="">
                    <input
                      type="date"
                      className="form-control"
                      id="course_title"
                      name="title"
                      placeholder="Enter course title"
                      required=""
                    />
                  </div>
                </div>


                <div className="form-group col-md-6 fl-left">
                  <label className="col-md-12 col-form-label" for="course_title">
                    Enrollments End Date/Time <span className="required">*</span>{" "}
                  </label>
                  <div className="">
                    <input
                      type="date"
                      className="form-control"
                      id="course_title2"
                      name="title"
                      placeholder="Enter course title"
                      required=""
                    />
                  </div>
                </div>




            <div className="form-group col-md-6 fl-left">
                  <label className="col-md-12 col-form-label" for="course_title">
                    Requirements/No of Hours of efforts <span className="required">*</span>{" "}
                  </label>
                  <div className="">
                    <input
                      type="number"
                      className="form-control"
                      id="course_title"
                      name="title"
                      placeholder="Enter course title"
                      required=""
                    />
                  </div>
                </div>


                <div className="form-group col-md-6 fl-left">
                  <label className="col-md-12 col-form-label" for="course_title">
                    No of weeks <span className="required">*</span>{" "}
                  </label>
                  <div className="">
                    <input
                      type="number"
                      className="form-control"
                      id="course_title2"
                      name="title"
                      placeholder="Enter course title"
                      required=""
                    />
                  </div>
                </div>



                <div className="form-group col-md-12 fl-left">
                  <label className="col-md-12 col-form-label" for="description">
                   Prerequisites
                  </label>
                  <div className="">
                    <Editor placeholder="Prerequisites"/>
                  </div>
               </div>

                <div className="form-group  mb-3 col-md-6 fl-left">
    <label className="col-md-12 col-form-label" for="level">Course Pacing</label>
    <div className="" data-select2-id="94">
        <select  className="form-control select2 select2-hidden-accessible" data-toggle="select2" name="level" id="level" data-select2-id="level" tabindex="-1" aria-hidden="true">
            <option value="beginner" data-select2-id="4">Instructor Paced</option>
            <option value="advanced" data-select2-id="95">Self Paced</option>

        </select>

    </div>
</div>



              </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

class Step4 extends React.Component {
  render() {
    if (this.props.currentStep !== 4) {
      return null;
    }
    return (
      <React.Fragment>
        {" "}
        <div className="tab-pane" id="pricing">
          <div className="row card-box">
            <div className="col-md-12">
              <DynamicForm />



            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

class Step2 extends React.Component {
  render() {
    if (this.props.currentStep !== 2) {
      return null;
    }
    return (
      <React.Fragment>
        <div className="tab-pane" id="media">
          <div className="row card-box">
            <div className="col-md-12">


            <div className=" form-group row col-md-12 ">
              <div className="">
                <label
                  className="col-md-12 col-form-label"
                  for="course_overview_url"
                >
                  Course overview url
                </label>
                <div className="form-group row col-md-12 ">
                  <input
                    type="text"
                    className="form-control"
                    name="course_overview_url"
                    id="course_overview_url"
                    placeholder="E.g: https://www.youtube.com/watch?v=oBtf8Yglw2w"
                  />
                </div>
              </div>
            </div>
            <div className="form-group row col-md-12 ">
              <div className="f">
                <label
                  className="col-md-12 col-form-label"
                  for="course_thumbnail_label"
                >
                  Course thumbnail
                </label>
                <div className="">
                  <div
                    className="wrapper-image-preview"
                    style={{ marginLeft: "-6px" }}
                  >
                    <div className="box" >
                      <div
                        className="js--image-preview"
                        style={{
                          backgroundImage: "ourse_thumbnail_placeholder.jpg",
                          backgroundColor: "#F5F5F5",
                        }}
                      ></div>
                      <div className="upload-options">
                        <label for="course_thumbnail" className="btn">
                          {" "}
                          <i className="fa fa-camera"></i> Course thumbnail{" "}
                          <br /> <small>(600 X 600)</small>{" "}
                        </label>
                        <input
                          id="course_thumbnail"
                          style={{ visibility: "hidden" }}
                          type="file"
                          className="image-upload"
                          name="course_thumbnail"
                          accept="image/*"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

           </div>

        </div>
      </React.Fragment>
    );
  }
}

class Step6 extends React.Component {
  render() {
    if (this.props.currentStep !== 6) {
      return null;
    }
    return (
      <React.Fragment>
        {" "}
        <div className="tab-pane" id="seo">
          <div className="row justify-content-center">
            <div className="col-md-8">
              <div className="form-group row mb-3">
                <label
                  className="col-md-2 col-form-label"
                  for="website_keywords"
                >
                  Meta keywords
                </label>
                <div className="col-md-10">
                  <input
                    type="text"
                    className="form-control bootstrap-tag-input"
                    id="meta_keywords"
                    name="meta_keywords"
                    data-role="tagsinput"
                    style={{ width: "100%", display: "none" }}
                    placeholder="Write a keyword and then press enter button"
                  />
                  <div className="bootstrap-tagsinput">
                    <input
                      size="43"
                      type="text"
                      placeholder="Write a keyword and then press enter button"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="col-md-8">
              <div className="form-group row mb-3">
                <label
                  className="col-md-2 col-form-label"
                  for="meta_description"
                >
                  Meta description
                </label>
                <div className="col-md-10">
                  <textarea
                    name="meta_description"
                    className="form-control"
                  ></textarea>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}

class Step7 extends React.Component {
  render() {
    if (this.props.currentStep !== 7) {
      return null;
    }
    return (
      <React.Fragment>
        <div className="tab-pane" id="finish">
          <div className="row">
            <div className="col-12">
              <div className="text-center">
                <h2 className="mt-0">
                  <i className="fa fa-check-all"></i>
                </h2>
                <h3 className="mt-0">Thank you !</h3>

                <p className="w-75 mb-2 mx-auto">You are just one click away</p>

                <div className="mb-3 mt-3">
                  <button
                    type="button"
                    className="btn btn-primary text-center"
                    onClick={(e) =>{
                      e.preventDefault()
                      window.location.href=process.env.PUBLIC_URL+ "/authoring/create/new/step2"
                    }}
                  >
                    Submit
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </React.Fragment>
    );
  }
}




