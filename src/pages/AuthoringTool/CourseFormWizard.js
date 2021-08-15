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
          // bounds={'.app'}
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
    e.target.parentElement.style.border="1px solid #eee";
    e.target.parentElement.style.padding="2px"
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


  togglerFullscreen(e){
    e.preventDefault()
    // $('#toggle_fullscreen').on('click', function(){
        // if already full screen; exit
        // else go fullscreen
        if (
          document.fullscreenElement ||
          document.webkitFullscreenElement ||
          document.mozFullScreenElement ||
          document.msFullscreenElement
        ) {
          if (document.exitFullscreen) {
            document.exitFullscreen();
            $('#container-fullscreen').css({height:"auto","overflow-y":"none"})

          } else if (document.mozCancelFullScreen) {
            document.mozCancelFullScreen();
          } else if (document.webkitExitFullscreen) {
            document.webkitExitFullscreen();
          } else if (document.msExitFullscreen) {
            document.msExitFullscreen();
          }
        } else {
          let element = $('#container-fullscreen').get(0);
          if (element.requestFullscreen) {
            element.requestFullscreen();
            $('#container-fullscreen').css({height:"600px","overflow-y":"scroll"})
              // $(".tab-content").css({height:"400px","overflow-y":"none"})
          } else if (element.mozRequestFullScreen) {
            element.mozRequestFullScreen();
          } else if (element.webkitRequestFullscreen) {
            element.webkitRequestFullscreen(Element.ALLOW_KEYBOARD_INPUT);
          } else if (element.msRequestFullscreen) {
            element.msRequestFullscreen();
          }
        }
      // });
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
          <a href="javascript::" className="">
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
          <a href="javascript::" className="">
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

        <div className="row"  id="container-fullscreen">
          <div className="col-md-12">
            <div className="card">
              <div className="card-body"  >

              <div id="make-fixed-on-fullscreen">
                <h4 className="header-title mb-3">
                  Course adding form{" "}
                  <a
                    href={process.env.PUBLIC_URL+ "/authoring/courselist"}
                    className="alignToTitle btn btn-outline-secondary btn-rounded btn-sm"
                  >
                    {" "}
                    <i className=" mdi mdi-keyboard-backspace"></i> Back to
                    course list
                  </a>

                   <a
                   style={{marginRight:"10px"}}
                   href="#no-grid"
                   onClick={this.togglerFullscreen}  id="toggle_fullscreen" 
                    className="alignToTitle btn btn-outline-secondary btn-rounded btn-sm"
                  >
                    {" "}
                    <i className=" mdi mdi-keyboard-backspace"></i> Toggle
                    Fullscreen
                  </a>
                  <br />
                </h4>
                <br />


                <div className="col-md-12">
                   
                  <ul className="nav nav-pills nav-justified form-wizard-header mb-3" style={{background:"#f6f6f6", height:"45px"}}>
                      
                        
                        
                          <a
                          onClick={(e) => {
                            this.goToStep(e, 1);

                          }}
                            href="#basic"
                            data-toggle="tab"
                            className="nav-link rounded-0 pt-2 pb-2 active"
                          >
                            <i className="fa fa-pen mr-1"></i>
                            <span className="d-none d-sm-inline">Basic</span>
                          </a>
                      

                       
                          <a
                          onClick={(e) => {
                            this.goToStep(e, 2);
                          }}
                            href="#outcomes"
                            data-toggle="tab"
                            className="nav-link rounded-0 pt-2 pb-2"
                          >
                            <i className="fa fa-camera mr-1"></i>
                            <span className="d-none d-sm-inline">Schedules</span>
                          </a>
                      

                        
                          <a
                           onClick={(e) => {
                            this.goToStep(e, 3);
                          }}
                            href="#requirements"
                            data-toggle="tab"
                            className="nav-link rounded-0 pt-2 pb-2"
                          >
                            <i className="fa fa-bell mr-1"></i>
                            <span className="d-none d-sm-inline">
                              Grading
                            </span>
                          </a>
                       


                        
                        {/*<li
                        id="list-nav-gate-6"
                       style={{border:"1px solid #eee",padding:"2px"}}
                          className="nav-item"
                          
                        >*/}
                          <a
                          onClick={(e) => {
                            this.goToStep(e, 4);
                          }}
                            href="#seo"
                            data-toggle="tab"
                            className="nav-link rounded-0 pt-2 pb-2"
                          >
                            <i className="fa fa-tag mr-1"></i>
                            <span className="d-none d-sm-inline">Learners Group</span>
                          </a>
                        {/*</li>*/}


                        
                          <a
                          onClick={(e) => {
                            this.goToStep(e, 5);
                          }}
                            href="#pricing"
                            data-toggle="tab"
                            className="nav-link rounded-0 pt-2 pb-2"
                          >
                            <i className="fa fa-currency mr-1"></i>
                            <span className="d-none d-sm-inline">Authoring Team</span>
                          </a>
                        

                       
                          <a
                          onClick={(e) => {
                            this.goToStep(e, 6);
                          }}
                            href="#media"
                            data-toggle="tab"
                            className="nav-link rounded-0 pt-2 pb-2"
                          >
                            <i className="fa fa-video mr-1"></i>
                            <span className="d-none d-sm-inline">Content</span>
                          </a>
                        

                          <a
                          onClick={(e) => {
                            this.goToStep(e, 7);
                          }}
                            href="#finish"
                            data-toggle="tab"
                            className="nav-link rounded-0 pt-2 pb-2"
                          >
                            <i className="fa fa-checkbox mr-1"></i>
                            <span className="d-none d-sm-inline">Process</span>
                          </a>
                        
                      </ul>
                </div>

                </div>

                <div className="row">
                  <div className="col-md-12">
                   
                      

                    <form
                    
                      className="required-form"
                      method="post"
                      enctype="multipart/form-data"
                    >
                      
                      
                      <Step1
                        currentStep={this.state.currentStep}
                        finishedClicked={this.state.finishedClicked}
                        handleChange={this.handleChange}
                        errorEmailClass={this.errorClass(
                          this.state.formErrors.email
                        )}
                        email={this.state.email}
                        errorEmail={this.state.formErrors.email}
                        errorUsernameClass={this.errorClass(
                          this.state.formErrors.username
                        )}
                        username={this.state.username}
                        errorUsername={this.state.formErrors.username}
                      />


                       
                      
                      <Step3
                        currentStep={this.state.currentStep}
                        finishedClicked={this.state.finishedClicked}
                        handleChange={this.handleChange}
                        comment={this.state.comment}
                        canSubmit={this.state.canSubmit}
                      />

                     


                      <Step4
                        currentStep={this.state.currentStep}
                        finishedClicked={this.state.finishedClicked}
                        handleChange={this.handleChange}
                        comment={this.state.comment}
                        canSubmit={this.state.canSubmit}
                      />


                      <Step2
                        currentStep={this.state.currentStep}
                        finishedClicked={this.state.finishedClicked}
                        handleChange={this.handleChange}
                        errorPasswordClass={this.errorClass(
                          this.state.formErrors.password
                        )}
                        password={this.state.password}
                        errorPassword={this.state.formErrors.password}
                        errorPasswordConfirmationClass={this.errorClass(
                          this.state.formErrors.passwordConfirmation
                        )}
                        passwordConfirmation={this.state.passwordConfirmation}
                        errorPasswordConfirmation={
                          this.state.formErrors.passwordConfirmation
                        }
                      />



                      <Step5
                        currentStep={this.state.currentStep}
                        finishedClicked={this.state.finishedClicked}
                        handleChange={this.handleChange}
                        comment={this.state.comment}
                        canSubmit={this.state.canSubmit}
                      />



                      <Step6
                        currentStep={this.state.currentStep}
                        finishedClicked={this.state.finishedClicked}
                        handleChange={this.handleChange}
                        comment={this.state.comment}
                        canSubmit={this.state.canSubmit}
                      />
                      <Step7
                        currentStep={this.state.currentStep}
                        finishedClicked={this.state.finishedClicked}
                        handleChange={this.handleChange}
                        comment={this.state.comment}
                        canSubmit={this.state.canSubmit}
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
            <div className="row">



              <div className="col-md-12 card-box" >



               <div className="form-group col-md-6 fl-left">
                  <label className="col-md-12 col-form-label" for="course_title">
                    Course Code <span className="required">*</span>{" "}
                  </label>
                  <div className="">
                    <input
                     style={{position: "relative", zIndex: "1"}}
                      type="text"
                      className="form-control"
                      id="course_title"
                      name="title"
                      placeholder="Enter course title"
                  
                    />
                  </div>
                </div>


                <div className="form-group col-md-6 fl-left">
                  <label className="col-md-12 col-form-label" for="course_title">
                    Course Name <span className="required">*</span>{" "}
                  </label>
                  <div className="">
                    <input
                    style={{position: "relative", zIndex: "1"}}
                      type="text"
                      className="form-control"
                      id="course_title2"
                      name="title"
                      placeholder="Enter course title"
                    
                    />
                  </div>
                </div>



<div class="form-group  col-md-6 fl-left">
    <label class="col-md-12 col-form-label" for="level">Institution</label>
    <div class="" data-select2-id="94">
        <select style={{position: "relative", zIndex: "1"}} class="form-control select2 select2-hidden-accessible" data-toggle="select2" name="level" id="level" data-select2-id="level" tabindex="-1" aria-hidden="true">
            <option value="beginner" data-select2-id="4">Questence</option>
            <option value="advanced" data-select2-id="95">ABU-Zaria</option>
            <option value="intermediate" data-select2-id="96">UNILAG</option>
        </select>
        
    </div>
</div>





                <div className="form-group col-md-6 fl-left">
                  <label
                    className="col-md-12 col-form-label"
                    for="short_description"
                  >
                    Course Short description
                  </label>
                  <div className="">
                      <textarea style={{position: "relative", zIndex: "1"}} className="form-control" placeholder="Short description" ></textarea>
                  </div>
                </div>



 <div className=" col-md-12 ">
                  <label
                    className="col-md-12 col-form-label"
                    for="short_description"
                  >
                    Course Overview
                  </label>
                  <div className="">
                      <Editor placeholder="course overview"/>
                  </div>
    </div>


                <div className=" col-md-12">
                  <label className="col-md-12 col-form-label" for="description">
                   What You Will Learn
                  </label>
                  <div className="">
                    <Editor placeholder="What you will learn"/>
                  </div>
                 



                </div>



<div class="form-group  mb-3 col-md-6 fl-left">
    <label class="col-md-12 col-form-label" for="level">Level</label>
    <div class="" data-select2-id="94">
        <select style={{position: "relative", zIndex: "1"}} class="form-control select2 select2-hidden-accessible" data-toggle="select2" name="level" id="level" data-select2-id="level" tabindex="-1" aria-hidden="true">
            <option value="beginner" data-select2-id="4">Introductory</option>
            <option value="advanced" data-select2-id="95">Intermediate</option>
            <option value="intermediate" data-select2-id="96">Advanced</option>
        </select>
        
    </div>
</div>


<div class="form-group  mb-3 col-md-6 fl-left">
    <label class="col-md-12 col-form-label" for="level">Enrollment Type</label>
    <div class="" data-select2-id="94">
        <select style={{position: "relative", zIndex: "1"}}  class="form-control select2 select2-hidden-accessible" data-toggle="select2" name="level" id="level" data-select2-id="level" tabindex="-1" aria-hidden="true">
            <option value="beginner" data-select2-id="4">Open</option>
            <option value="advanced" data-select2-id="95">By Invitation</option>
            
        </select>
        
    </div>
</div>
      

<div class="form-group  mb-3 col-md-6 fl-left">
    <label class="col-md-12 col-form-label" for="level">Entrance Exam Required</label>
    <div class="" data-select2-id="94">
        <select style={{position: "relative", zIndex: "1"}}  class="form-control select2 select2-hidden-accessible" data-toggle="select2" name="level" id="level" data-select2-id="level" tabindex="-1" aria-hidden="true">
            <option value="beginner" data-select2-id="4">False</option>
            <option value="advanced" data-select2-id="95">True</option>
            
        </select>
        
    </div>
</div>


<div class="form-group  mb-3 col-md-6 fl-left">
    <label class="col-md-12 col-form-label" for="level">Auditing</label>
    <div class="co" data-select2-id="94">
        <select style={{position: "relative", zIndex: "1"}}  class="form-control select2 select2-hidden-accessible" data-toggle="select2" name="level" id="level" data-select2-id="level" tabindex="-1" aria-hidden="true">
            <option value="beginner" data-select2-id="4">YES</option>
            <option value="advanced" data-select2-id="95">NO</option>
            
        </select>
        
    </div>
</div>


<div className="form-group col-md-6 fl-left">
                  <label className="col-md-12 col-form-label" for="course_title">
                    video url<span className="required">*</span>{" "}
                  </label>
                  <div className="">
                    <input
                    style={{position: "relative", zIndex: "1"}}
                      type="text"
                      className="form-control"
                      id="course_title2"
                      name="title"
                      placeholder="You tube url"
                    
                    />
                  </div>
                </div>


            <div className="form-group row col-md-6 fl-left">
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











                <div className=" col-md-12">
                  <label className="col-md-12 col-form-label" for="description">
                   Curriculum
                  </label>
                  <div className="">
                    <Editor placeholder="Curriculum"/>
                  </div>
                 



                </div>
               



               
<br/><br/><br/><br/><br/>
                 
      {/*                  <div class="form-group col-md-6 fl-left mb-3" data-select2-id="11">
    <label class="col-md-12 col-form-label" for="sub_category_id">Category<span class="required">*</span></label>
    <div class="" data-select2-id="10">
        <select style={{marginLeft:"90px"}} class="form-control select2 select2-hidden-accessible" data-toggle="select2" name="sub_category_id" id="sub_category_id" required="" data-select2-id="sub_category_id" tabindex="-1" aria-hidden="true">
            <option value="" data-select2-id="2">Select a category</option>
            <optgroup label="ARTS &amp; HUMANITIES " data-select2-id="28">
                <option value="69" data-select2-id="29">Education</option>
                <option value="70" data-select2-id="30">History</option>
                <option value="71" data-select2-id="31">Political Science</option>
                <option value="72" data-select2-id="32">Sociology</option>
                <option value="73" data-select2-id="33">Geography</option>
                <option value="76" data-select2-id="34">Media and Journalism</option>
                <option value="77" data-select2-id="35">Architecture</option>
            </optgroup>
            <optgroup label="BUSINESS" data-select2-id="36">
                <option value="86" data-select2-id="37">Business Process Management </option>
                <option value="124" data-select2-id="38">Service Management</option>
                <option value="125" data-select2-id="39">Supply Chain Management</option>
                <option value="126" data-select2-id="40">Sales and Marketing Management</option>
                <option value="127" data-select2-id="41">Risk Management</option>
                <option value="128" data-select2-id="42">Customer Service</option>
                <option value="129" data-select2-id="43">Business Leadership</option>
                <option value="130" data-select2-id="44">Human Resources</option>
                <option value="131" data-select2-id="45">Finance and Banking</option>
                <option value="132" data-select2-id="46">Accounting</option>
            </optgroup>
            <optgroup label="HEALTH CARE" data-select2-id="47">
                <option value="88" data-select2-id="48">Nursing </option>
                <option value="89" data-select2-id="49">Disease and Disorders</option>
                <option value="90" data-select2-id="50">Nutrition</option>
                <option value="91" data-select2-id="51">Caregiving</option>
                <option value="92" data-select2-id="52">Pharmacology</option>
            </optgroup>
            <optgroup label="LAW &amp; SOCIAL SCIENCES" data-select2-id="53">
                <option value="95" data-select2-id="54">Law</option>
                <option value="96" data-select2-id="55">Economics</option>
                <option value="97" data-select2-id="56">Psychology</option>
            </optgroup>
            <optgroup label="INFORMATION TECHNOLOGY" data-select2-id="57">
                <option value="100" data-select2-id="58">Network and security</option>
                <option value="101" data-select2-id="59">IT Management</option>
                <option value="102" data-select2-id="60">Digital Marketing</option>
                <option value="103" data-select2-id="61">Web Site and Application Development</option>
            </optgroup>
            <optgroup label="MATHEMATICS " data-select2-id="62">
                <option value="105" data-select2-id="63">SS1 Mathematics</option>
                <option value="106" data-select2-id="64">SS2 Mathematics</option>
                <option value="107" data-select2-id="65">SS3 Mathematics</option>
            </optgroup>
            <optgroup label="ENGINEERING AND PHYSICAL SCIENCES" data-select2-id="66">
                <option value="110" data-select2-id="67">Computer Science and Engineering</option>
                <option value="111" data-select2-id="68">Electrical Engineering </option>
                <option value="112" data-select2-id="69">Mechanical Engineering</option>
                <option value="113" data-select2-id="70">Chemical Engineering</option>
                <option value="114" data-select2-id="71">Civil Engineering</option>
                <option value="116" data-select2-id="72">Biology </option>
                <option value="117" data-select2-id="73">Physics </option>
                <option value="118" data-select2-id="74">Chemistry</option>
                <option value="119" data-select2-id="75">Environmental Studies</option>
                <option value="120" data-select2-id="76">Agricultural Science</option>
            </optgroup>
            <optgroup label="LANGUAGE " data-select2-id="77">
                <option value="134" data-select2-id="78">English</option>
                <option value="135" data-select2-id="79">Yoruba</option>
                <option value="136" data-select2-id="80">Igbo</option>
                <option value="137" data-select2-id="81">Hausa</option>
                <option value="138" data-select2-id="82">Chinese</option>
                <option value="139" data-select2-id="83">French</option>
            </optgroup>
        </select>
            </div>
</div>





<div class="form-group  mb-3 col-md-6 fl-left">
    <label class="col-md-12 col-form-label" for="level">Level</label>
    <div class="" data-select2-id="94">
        <select  class="form-control select2 select2-hidden-accessible" data-toggle="select2" name="level" id="level" data-select2-id="level" tabindex="-1" aria-hidden="true">
            <option value="beginner" data-select2-id="4">Beginner</option>
            <option value="advanced" data-select2-id="95">Advanced</option>
            <option value="intermediate" data-select2-id="96">Intermediate</option>
        </select>
        
    </div>
</div>

<div class="form-group  mb-3 col-md-6 fl-left">
    <label class="col-md-12 col-form-label" for="language_made_in">Language made in</label>
    <div class="">
        <select  class="form-control select2 select2-hidden-accessible" data-toggle="select2" name="language_made_in" id="language_made_in" data-select2-id="language_made_in" tabindex="-1" aria-hidden="true">
            <option value="english" data-select2-id="6">English</option>
        </select>
      
    </div>
</div>*/}



                  
              </div>
            </div>{" "}
          </div>{" "}
        </div>
         <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>
        <br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/><br/>


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
              placeholder={` #${idx + 1} Enter an instructors email`}
              value={shareholder.name}
              onChange={this.handleShareholderNameChange(idx)}
              className="form-control fl-left"
            />
          </div>
         { /*<div class="col-md-2">
            <button
              type="button"
              onClick={this.handleRemoveShareholder(idx)}
              className="small text-white"
            >
              -
            </button>
            </div>*/}

             <br/><br/> 
          </div>

        ))}
        <br/>
        <button
          type="button"
          onClick={this.handleAddShareholder}
          className="btn btn-primary text-white"
          style={{width:"300px",margin:"10px"}}

        >
          Add A Team
        </button>
      </div>

       <br/><br/>

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
    if (this.props.currentStep !== 3) {
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



<div class="form-group  col-md-6 fl-left">
    <label class="col-md-12 col-form-label" for="level">Grade</label>
    <div class="" data-select2-id="94">
        <select  class="form-control select2 select2-hidden-accessible" data-toggle="select2" name="level" id="level" data-select2-id="level" tabindex="-1" aria-hidden="true">
            <option value="beginner" data-select2-id="4">20-50%</option>
            <option value="advanced" data-select2-id="95">50-70%</option>
            <option value="intermediate" data-select2-id="96">90%</option>
        </select>
        
    </div>
</div>


<div class="form-group  col-md-6 fl-left">
    <label class="col-md-12 col-form-label" for="level">Assignment/Exam Type</label>
    <div class="" data-select2-id="94">
        <select  class="form-control select2 select2-hidden-accessible" data-toggle="select2" name="level" id="level" data-select2-id="level" tabindex="-1" aria-hidden="true">
            <option value="beginner" data-select2-id="4">Professional</option>
            <option value="advanced" data-select2-id="95">Certificate issued</option>
            
        </select>
        
    </div>
</div>

<div class="form-group  mb-3 col-md-6 fl-left">
    <label class="col-md-12 col-form-label" for="language_made_in">Language made in</label>
    <div class="">
        <select  class="form-control select2 select2-hidden-accessible" data-toggle="select2" name="language_made_in" id="language_made_in" data-select2-id="language_made_in" tabindex="-1" aria-hidden="true">
            <option value="english" data-select2-id="6">English</option>
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
    if (this.props.currentStep !== 2) {
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

                <div class="form-group  mb-3 col-md-6 fl-left">
    <label class="col-md-12 col-form-label" for="level">Course Pacing</label>
    <div class="" data-select2-id="94">
        <select  class="form-control select2 select2-hidden-accessible" data-toggle="select2" name="level" id="level" data-select2-id="level" tabindex="-1" aria-hidden="true">
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
    if (this.props.currentStep !== 5) {
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



window.showSubsection = (el) =>{
      // $(el).on("click", function(){
         // alert("you clicked me")
        if($(el).hasClass("open")) {
          $(el).removeClass("open").next(".fold").removeClass("open");
        } else {
          $(".fold-table tr.view").removeClass("open").next(".fold").removeClass("open");
          $(el).addClass("open").next(".fold").addClass("open");
        }
      // });

}


const editSaveSection = (el) => {
  $(".miller_"+ localStorage.getItem("tracker")).find(".tits").text($("#title_edit").val())
  $(".miller_"+ localStorage.getItem("tracker")).find(".pcs").text($("#section_id_edit").val())


}


const editSaveSubSection = (el) => {
  $(".muu_"+ localStorage.getItem("s_tracker")).find(".title_sub").text($("#title_edit_2").val())
  $(".muu_"+ localStorage.getItem("s_tracker")).find(".subsect").text($("#section_id_edit_2").val())


}


const Step2 = (props) => {

  useEffect(() => {


    $('.pricing_lesson__column').on('click', function() {
  $('.pricing_lesson__column').removeClass('selected');
  $(this).addClass('selected');
  $('.check').removeClass('selected');
  $('.check',this).addClass('selected');
})



  })

if (props.currentStep !== 6) {
      return null;
    }


    
    return (
      <React.Fragment>
        <div className="tab-pane" id="media" >
          <div className="row">
            <div className="col-md-12">



 
              <table class="fold-table">
            
  <thead className="card-box">
    <tr >
      <th>Section Name</th>
      <th>Section ID</th>
      <th>Total Sub Components</th>
      <th class="action"><span class="visible-small" title="Strategy C">Action</span><span class="visible-big">Action </span></th>
    </tr>
  </thead>

  <tbody id="js-parent" class="widow-window">
    

  </tbody>
</table>







<br/><br/>  <br/><br/><br/>

 <a
                   style={{marginRight:"10px"}}
                   href="#myModal" role="button" data-toggle="modal"
                    
                    className="alignToTitle btn btn-outline-secondary btn-rounded btn-lg"
                  >
                    
                    <i className=" mdi mdi-keyboard-backspace"></i>Add A New Section
                  </a>
                  <br/><br/>
             
            </div>

           </div>







           <div style={{marginTop:"80px"}} class="modal fade" id="myModal" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title pull-left">Section Detail</h5>
                <a href="#"  class="pull-right" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </a>
            </div>
            <div class="modal-body p-4 col-md-12" id="result" style={{height:"400px",overflowY:"scroll"}}>
                <p>Add a title to the section</p>
                <div class="row">
                    <div class="divided col-md-12"> 
                    
                    
                    <div class="form-group">
                        <label>Title</label>
                        <input type="text" class="form-control" id="title"/>
                    </div>


                    <div class="form-group">
                        <label>Section ID</label>
                        <input type="text" class="form-control" id="section_id"/>
                    </div>


                    <div class="form-group">
                        <label>Title</label>
                        <Editor placeholder="overview"/>
                    </div>
                    
                    
                    
                    
                    
                    </div>
                   
                   
                </div>
            </div>

            <div class="modal-footer">
                <button onClick={addSectionContent} type="button" style={{background:"rgba(8,23,200)"}} class="btn btn-primary" data-dismiss="modal">Add</button>
            </div>
        </div>
    </div>
</div>







 <div style={{marginTop:"80px"}} class="modal fade" id="myModalEdit" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title pull-left">Editing Section Detail</h5>
                <a href="#"  class="pull-right" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </a>
            </div>
            <div class="modal-body p-4 col-md-12" id="result" style={{height:"400px",overflowY:"scroll"}}>
                <p>Add a title to the section</p>
                <div class="row">
                    <div class="divided col-md-12"> 
                    
                    
                    <div class="form-group">
                        <label>Title</label>
                        <input type="text" class="form-control" id="title_edit"/>
                    </div>


                    <div class="form-group">
                        <label>Section ID</label>
                        <input type="text" class="form-control" id="section_id_edit"/>
                    </div>


                    <div class="form-group">
                        <label>Title</label>
                        <Editor placeholder="overview"/>
                    </div>
                    
                    
                    
                    
                    
                    </div>
                   
                   
                </div>
            </div>

            <div class="modal-footer">
                <button onClick={editSaveSection} type="button" style={{background:"rgba(8,23,200)"}} class="btn btn-primary" data-dismiss="modal">Add</button>
            </div>
        </div>
    </div>
</div>




<div style={{marginTop:"80px"}} class="modal fade" id="myModalSubSectionEdit" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title pull-left">Editing Section Detail</h5>
                <a href="#"  class="pull-right" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </a>
            </div>
            <div class="modal-body p-4 col-md-12" id="result" style={{height:"400px",overflowY:"scroll"}}>
                <p>Add a title to the section</p>
                <div class="row">
                    <div class="divided col-md-12"> 
                    
                    
                    <div class="form-group">
                        <label>Title</label>
                        <input type="text" class="form-control" id="title_edit_2"/>
                    </div>


                    <div class="form-group">
                        <label>Section ID</label>
                        <input type="text" class="form-control" id="section_id_edit_2"/>
                    </div>


                    <div class="form-group">
                        <label>Title</label>
                        <Editor placeholder="overview"/>
                    </div>
                    
                    
                    
                    
                    
                    </div>
                   
                   
                </div>
            </div>

            <div class="modal-footer">
                <button onClick={editSaveSubSection} type="button" style={{background:"rgba(8,23,200)"}} class="btn btn-primary" data-dismiss="modal">Add</button>
            </div>
        </div>
    </div>
</div>



           <div style={{marginTop:"80px"}} class="modal fade" id="myModalSubsection" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title pull-left">Sub Section Detail</h5>
                <a href="#"  class="pull-right" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </a>
            </div>
            <div class="modal-body p-4 col-md-12" id="result" style={{height:"400px",overflowY:"scroll"}}>
                <p>Add a title to the section</p>
                <div class="row">
                    <div class="divided col-md-12"> 
                    
                    
                    <div class="form-group">
                        <label>Title</label>
                        <input type="text" class="form-control" id="title_2"/>
                    </div>


                    <div class="form-group">
                        <label>Sub Section ID</label>
                        <input type="text" class="form-control" id="section_id_2"/>
                    </div>


                    <div class="form-group">
                        <label>Title</label>
                        <Editor placeholder="overview"/>
                    </div>
                    
                    
                    
                    
                    
                    </div>
                   
                   
                </div>
            </div>

            <div class="modal-footer">
                <button onClick={addSubSectionContent} type="button" style={{background:"rgba(8,23,200)"}} class="btn btn-primary" data-dismiss="modal">Add</button>
            </div>
        </div>
    </div>
</div>






           <div style={{marginTop:"80px"}} class="modal fade" id="myModalDelete" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title pull-left">Delete this section</h5>
                <a href="#"  class="pull-right" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </a>
            </div>
            <div class="modal-body p-4 col-md-12" id="result" style={{height:"400px",overflowY:"scroll"}}>
                <p>Add a title to the section</p>
                <div class="row">
                    <div class="divided col-md-12"> 
                    
                    
                    <p>Are you sure about this?</p>
                    
                    
                    
                    
                    </div>
                   
                   
                </div>
            </div>

            <div class="modal-footer">
                <button  type="button" style={{background:"rgba(8,23,200)"}} class="btn btn-primary" data-dismiss="modal">Add</button>
            </div>
        </div>
    </div>
</div>






           <div style={{marginTop:"80px"}} class="modal fade" id="myModalExport" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog" role="document">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title pull-left">Delete this section</h5>
                <a href="#"  class="pull-right" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </a>
            </div>
            <div class="modal-body p-4 col-md-12" id="result" style={{height:"400px",overflowY:"scroll"}}>
                <p>Add a title to the section</p>
                <div class="row">
                    <div class="divided col-md-12"> 
                    
                    
                    <p>this is the export format to the database</p>
                    <div id="export"></div>
                    
                    
                    
                    
                    </div>
                   
                   
                </div>
            </div>

            <div class="modal-footer">
                <button  type="button" style={{background:"rgba(8,23,200)"}} class="btn btn-primary" data-dismiss="modal">Add</button>
            </div>
        </div>
    </div>
</div>







<div style={{marginTop:"50px"}} class="modal " id="myModalLesson" tabindex="-1" role="dialog" aria-hidden="true">
    <div class="modal-dialog modal-full" role="document">
        <div class="modal-content">
            <div class="modal-header">
                

                 <ul id="progressbar">
                       <li>1</li>
                       <li>2</li>
                       <li>3</li>
                       <li>4</li>
                       <li>5</li>
                    </ul>

                <a href="#"  class="pull-right" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">×</span>
                </a>
            </div>
            <div class="modal-body p-4 col-md-12" id="result">
                <p></p>
                <div class="row " >
                <div class="col-md-10 divided">

                <div id="msform">
                   
                    <fieldset>


                    <h1 class="fs-title">Select a component</h1>


                    <div class="pricing_lesson">
                      <div class="pricing_lesson__column">
                      <i class="fa fa-comment fa-3x"></i>
                        <div class="check"></div>
                        <button class="button">discussion</button>
                      </div>
                      <div class="pricing_lesson__column selected">
                      <i class="fa fa-edit fa-2x"></i>
                        <div class="check selected"></div>
                        <button class="button">Text content</button>
                      </div>
                      <div class="pricing_lesson__column">
                      <i class="fa fa-video fa-3x"></i>
                        <div class="check"></div>
                        <button class="button">Media</button>
                      </div>


                      <div class="pricing_lesson__column">
                      <i class="fa fa-edit fa-3x"></i>
                        <div class="check"></div>
                        <button class="button">pdf</button>
                      </div>


                      


                    </div>


                    </fieldset>


                   


                    
                </div>

                </div>

                </div>

                <div class="col-md-2">
              <a
                   style={{marginRight:"10px"}}
                   href="#no-grid"
                     className="alignToTitle btn btn-outline-secondary btn-rounded btn-sm pull-left"
                  >
                    {" "}
                    <i className=" mdi mdi-keyboard-backspace"></i> Next
                  
                  </a>


                   <a
                   style={{marginRight:"10px"}}
                   href="#no-grid"
                  
                    className="alignToTitle btn btn-outline-secondary btn-rounded btn-sm pull-right"
                  >
                    {" "}
                    <i className=" mdi mdi-keyboard-backspace"></i> Previous
                  
                  </a>
                  </div>
                   
            </div>

            <div class="modal-footer">
                

                
            </div>
        </div>
    </div>
</div>



        </div>
      </React.Fragment>
    );
  
}

const cloneNew =() =>{
   $(document).on('click', '.js-add-row', function() {  
  $('table').append($('table').find('tr:last').clone());
});

$(document).on('click', '.js-del-row', function() {  
  $('table').find('tr:last').remove();
});
}



window.removeSection = (el) => {

 // alert(el.dataset.id)
// $("#js-remove").on("click", function(){
  var count = $(".js-child").length;
  $("."+el.dataset.id).remove()   //addClass("removed"); // hide + remove last child
  //$("#js-count").text(count - 1); // update count
//});

}


window.removeSubSection = (el) => {

  var count = $(".js-child").length;
  $("."+el.dataset.id).remove()   //addClass("removed"); // hide + remove last child
  

}








window.editSection =(el) =>{
  // alert($("."+el.dataset.id).find(".tits").text())
  $("#title_edit").val($("."+el.dataset.id).find(".tits").text())
  $("#section_id_edit").val( $("."+el.dataset.id).find(".pcs").text())
 


}


window.editSubSection =(el) =>{
  // alert($("."+el.dataset.id).find(".tits").text())
  $("#title_edit_2").val($("."+el.dataset.id).find(".title_sub").text())
  $("#section_id_edit_2").val( $("."+el.dataset.id).find(".subsect").text())
 


}

window.replicateSection =() => {

  var subchildren = $(".section-parent_"+  localStorage.getItem("tracker")).length


 let target = "dynamic_section_"+ localStorage.getItem("tracker")
 if(subchildren<=0){
  //alert("here"+ $("#js-parent").find("#"+target).parent().attr("class"))


  var $template = $("#js-parent").find("#"+target).clone(true);
    $("#js-parent").append($template)

 }else{
  var  $template =    $("#js-parent").find("#"+target).clone(true);

 // alert($("#js-parent").find("#"+target).parent().find(`tr.section-parent_${localStorage.getItem("tracker")}` ).length)
   $("#js-parent").append($template)
 }

}


window.replicateSubSection =() => {
  var subchildren = $(".subsection-child_"+  localStorage.getItem("s_tracker")).length
 let target = "dynamic_subsection_"+ localStorage.getItem("s_tracker")
 if(subchildren<=0){
  var $template = $("#js-parent").find("#"+target).clone(true);
    $("#js-parent").append($template)
 }else{
  var  $template = $("#js-parent").find("#"+target).clone(true);
 // alert($("#js-parent").find("#"+target).parent().find(`tr.section-parent_${localStorage.getItem("tracker")}` ).length)
   $("#js-parent").append($template)
 }

}



window.exportSection = () => {

  try {
  $.fn.pop = [].pop;
  $.fn.shift = [].shift;
  var headers = [];
  var data = [];
  var $EXPORT = $('#export');
 
  var subchildren = $(".section-parent_"+  localStorage.getItem("tracker")).length

 let target = "dynamic_section_"+ localStorage.getItem("tracker")
 // if(subchildren<=0){
 // alert("here"+ $(".fold-table").find("#"+target).parent().attr("class"))

  var $rows = $(".fold-table").find('tr:not(.action)');
  // Get the headers (add special header logic here)
  $($rows.shift()).find('th:not(.action)').each(function() {
    headers.push($(this).text().toLowerCase());
  });

    // Turn all existing rows into a loopable array
  $rows.each(function() {
    var $td = $(this).find('td:not(.action)');
    var h = {};

    // Use the headers from earlier to name our hash keys
    headers.forEach(function(header, i) {
      h[header] = $td.eq(i).text(); // will adapt for inputs if text is empty
    });

    data.push(h);
  });

  $EXPORT.text(JSON.stringify(data));

}catch(err){
  alert(err)
}


 

}

let counter = 0;
const addSectionContent = () => {
  let mycounter = counter++;


  let templateData = `<tr  data-id="${'miller_'+ mycounter }" id="dynamic_section_${mycounter}" onclick="showSubsection(this)" class="view ${'miller_'+ mycounter }" style="min-width:100%;width:100%;height:60px;border-left:3px solid black;margin-top:10px">
     <td class="tits">${document.getElementById("title").value || "Module # " + mycounter   }</td>
      <td class="pcs">${document.getElementById("section_id").value || "Section #" + mycounter }</td>
       <td class="we">0</td>
      <td class="per action">
      <a style="margin-right:10px;background:#fff;color:#000"
                   href="#myModalSubsection" role="button" data-toggle="modal"
                   onclick="localStorage.setItem('given_id','dynamic_section_'+${mycounter});localStorage.setItem('tracker',${mycounter});"
                  >
                
                    <i class="fa fa-plus "></i>
        </a>

        <a style="margin-right:10px;background:#fff;color:#000"
            href="#myModalEdit" role="button" data-toggle="modal"
          data-id="${'miller_'+ mycounter }"
            onclick="editSection(this);localStorage.setItem('given_id','dynamic_section_'+${mycounter});localStorage.setItem('tracker',${mycounter});"       
          >
                
          <i class="fa fa-edit"></i>
        </a>


        <a style="margin-right:10px;background:#fff;color:#000"
          
          data-id="${'miller_'+ mycounter }"
           onclick="removeSection(this)"        
          >
                
          <i class="fa fa-trash"></i>
        </a>


        
         <a class="dropright dropright "  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                 
                <i class="fa fa-ellipsis-v" style="color:#000"></i>
             
        <ul class="dropdown-menu" style="margin-left:40px" >
                <li><a class="dropdown-item" href="#myModalSubsection" role="button" data-toggle="modal"
                   onclick="localStorage.setItem('given_id','dynamic_section_'+${mycounter});localStorage.setItem('tracker',${mycounter});"
                  >Add Sub Section</a></li>

                  <li><a class="dropdown-item" href="#myModalLesson" role="button" data-toggle="modal"
                   onclick="localStorage.setItem('given_id','dynamic_section_'+${mycounter});localStorage.setItem('tracker',${mycounter});"
                  >Add Lesson</a></li>

                <li><a class="dropdown-item"   href="#myModalEdit" role="button" data-toggle="modal"
          data-id="${'miller_'+ mycounter }"
            onclick="editSection(this);localStorage.setItem('given_id','dynamic_section_'+${mycounter});localStorage.setItem('tracker',${mycounter});"       
          >Edit </a></li>
                <li><a class="dropdown-item" 
                 data-id="${'miller_'+ mycounter }"
                onclick="replicateSection(this);localStorage.setItem('given_id','dynamic_section_'+${mycounter});localStorage.setItem('tracker',${mycounter});"

                >Replicate Section</a></li>
                <li><a class="dropdown-item" href="#noclick" >Import </a></li>
                <li><a class="dropdown-item" 
                href="#myModalExport" role="button" data-toggle="modal"
          data-id="${'miller_'+ mycounter }" onclick="exportSection();localStorage.setItem('given_id','dynamic_section_'+${mycounter});localStorage.setItem('tracker',${mycounter});" >Export </a></li>
                <li><a class="dropdown-item" href="#noclick" onclick="alert('published to live course')" >Publish </a></li>
                <li><a class="dropdown-item" href="#noclick" onclick="alert('saved as draft')" >Draft</a></li>
  
                <li><a class="dropdown-item" href="#noclick"  data-id="${'miller_'+ mycounter }"
           onclick="removeSection(this)" >Delete</a></li>
           </ul>
         </a>
              
        </td>
    `;

// $("#js-add").on("click", function(){
  // mockup variables for some randomness
  var heightValue = Math.random() * 10;
  var count = $(".section-parent").length;
  var childrenHeight;
  // var newChild = $("<div class='child-table js-child'>").html(templateData );
  
  // $("#js-count").text(count +1);  // set child text
  $("#js-parent").append( templateData);  // spawn child to DOM
// });


}


let muu_count = 0
const addSubSectionContent = (el) => {
  let muu_counter = muu_count++
  const template = `
    
  
         <tr  id="dynamic_subsection_${muu_counter}"  data-id="${'muu_'+ muu_counter }" class="fold ${'muu_'+ muu_counter } section-parent_${localStorage.getItem('tracker')} subsection-child_${localStorage.getItem('s_tracker')}" style="min-width:100%;width:100%;height:60px;border-left:3px solid black;margin-top:10px">
      <td colspan="7">
        <div class="fold-content">
          <h3>Subsections</h3>
          
          <table class="small-friendly">
            <thead>
              <tr>
                <th><span class="visible-small" title="Premiumns">Title</span><span class="visible-big">Title</span></th>
      <th><span class="visible-small" title="Strategy A">Section ID</span><span class="visible-big">Section ID</span></th>
      <th><span class="visible-small" title="Strategy A">Total Elements</span><span class="visible-big">Elements</span></th>
     
     
     <th class="action"><span class="visible-small" title="Strategy A">Action</span><span class="visible-big">Action</span></th>
              </tr>
            </thead>
            <tbody>

              <tr  style="height:60px;border-left:3px solid black;margin-top:10px">
                <td class="title_sub" data-th="Company name">${$("#title_2").val() || "no content"}</td>
                <td class="subsect" data-th="Customer no">${$("#section_id_2").val() || "no content"}</td>
                <td data-th="Customer name">0</td>
                <td class="action" data-th="Customer nam">



        <a style="margin-right:10px;background:#fff;color:#000"
            href="#myModalSubSectionEdit" role="button" data-toggle="modal"
          data-id="${'muu_'+ muu_counter }"
            onclick="editSubSection(this);localStorage.setItem('given_sid','dynamic_subsection_'+${muu_counter});localStorage.setItem('s_tracker',${muu_counter});"       
          >
                
          <i class="fa fa-edit"></i>
        </a>


        <a style="margin-right:10px;background:#fff;color:#000"
          
          data-id="${'muu_'+ muu_counter }"
           onclick="removeSubSection(this)"        
          >
                
          <i class="fa fa-trash"></i>
        </a>




         <a class="dropright dropright "  data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                 
                <i class="fa fa-ellipsis-v" style="color:#000"></i>
             
        <ul class="dropdown-menu" style="margin-left:40px" >
                

                  <li><a class="dropdown-item" href="#myModalLesson" role="button" data-toggle="modal"
                   onclick="localStorage.setItem('given_sid','dynamic_subsection_'+${muu_counter});localStorage.setItem('s_tracker',${muu_counter});"
                  >Add Lesson</a></li>

                <li><a class="dropdown-item"   href="#myModalEdit" role="button" data-toggle="modal"
          data-id="${'muu_'+ muu_counter }"
            onclick="editSection(this);localStorage.setItem('given_sid','dynamic_subsection_'+${muu_counter});localStorage.setItem('s_tracker',${muu_counter});"       
          >Edit </a></li>
                <li><a class="dropdown-item" 
                 data-id="${'muu_'+ muu_counter }"
                onclick="replicateSubSection(this);localStorage.setItem('given_sid','dynamic_subsection_'+${muu_counter});localStorage.setItem('s_tracker',${muu_counter});"

                >Replicate Section</a></li>
                
                <li><a class="dropdown-item" href="#noclick"  data-id="${'muu_'+ muu_counter }"
           onclick="removeSubSection(this)" >Delete</a></li>
           </ul>
         </a>



                </td>

              </tr>

            
              

            </tbody>
          </table>          
        </div>
      </td>
    </tr>
     
       
      
   
`;

  var newChild = $("<div class='child-table js-child'>").html(template );
  var subchildren = $(".section-parent_"+  localStorage.getItem("tracker")).length


 let target = "dynamic_section_"+ localStorage.getItem("tracker")
 if(subchildren<=0){
  // alert("here"+ $("#js-parent").find("#"+target).parent().attr("class"))
  $("#js-parent").find("#"+target).parent().append(template)

 }else{

 // alert($("#js-parent").find("#"+target).parent().find(`tr.section-parent_${localStorage.getItem("tracker")}` ).length)
 $("#js-parent").find("#"+target).parent().find(`tr.section-parent_${localStorage.getItem("tracker")}:last` ).after(template)

 }

  
  
 
}


class Step6 extends React.Component {
  render() {
    if (this.props.currentStep !== 4) {
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
                  Add Field Name
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




                <div class="form-group  mb-3 col-md-12 ">
    <label class="col-md-12 col-form-label" for="level">Status</label>
    <div class="" data-select2-id="94">
        <select  class="form-control select2 select2-hidden-accessible" data-toggle="select2" name="level" id="level" data-select2-id="level" tabindex="-1" aria-hidden="true">
            <option value="beginner" data-select2-id="4">Draft</option>
            <option value="advanced" data-select2-id="95">Published And Live</option>
            <option value="intermediate" data-select2-id="96">Published</option>
             <option value="intermediate" data-select2-id="96">Visible To Staff Only</option>
        </select>
        
    </div>
</div>

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




