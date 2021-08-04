import React, { Fragment, useEffect } from "react"
import {Container, Col, Row } from "react-bootstrap"
import { HeaderBox } from "./activityboxes"
import NavBar from "components/Navbar"
import Footer from "components/Footer"

import { Link } from "react-router-dom";
import { AddHead } from "./sidebar"
import $ from "jquery"
import { Styles } from "./styles/main.js"





export default class MasterForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      currentStep: 1,
      email:  '',
      username: '',
      password: '',
      comment: '',
      passwordConfirmation:'',
      formErrors: {
        email: '',
        username:'', 
        password: '', 
        passwordConfirmation: '',
      },
      formValidity: {
        email: false,
        username: false, 
        password: false, 
        passwordConfirmation: false,
      },
      canSubmit: false,
    }
    this.handleChange = this.handleChange.bind(this)
    this._next = this._next.bind(this)
    this._prev = this._prev.bind(this)
  }

  goToStep(e,step){
    e.preventDefault();
    this.setState({
      currentStep: step
    })

  }

  _next() {
    let currentStep = this.state.currentStep
    currentStep = currentStep >= 6? 7: currentStep + 1
    this.setState({
      currentStep: currentStep
    })
  }
   
  _prev() {
    let currentStep = this.state.currentStep
    currentStep = currentStep <= 1? 1: currentStep - 1
    this.setState({
      currentStep: currentStep
    })
  }

  handleChange(event) {
    const {name, value} = event.target
    this.setState({
      [name]: value
    }, function(){ this.validateField(name, value)})
    
  }

  validateField(name, value) {
    if(Object.keys(this.state.formErrors).includes(name)){
      const fieldValidationErrors = this.state.formErrors
      const validity = this.state.formValidity
      const isEmail = name === "email"
      const isPassword = name === "password"
      const isPasswordConfirmation = name === "passwordConfirmation"
      const label = name === "passwordConfirmation"? 'password confirmation' : name
      const emailTest = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i
  
      validity[name] = value.length >0
      fieldValidationErrors[name] = validity[name] ? '': `${label} is required and cannot be empty`
  
      if(validity[name]) {
        if(isPassword){
          validity[name] = value.length >= 5
          fieldValidationErrors[name] = validity[name] ? '': `${label} should be 5 characters or more`
        }
        if(isEmail){
          validity[name] = emailTest.test(value)
          fieldValidationErrors[name] = validity[name] ? '' : `${label} should be a valid email address`
        }
        if(isPasswordConfirmation){
          validity[name] = value === this.state.password
          fieldValidationErrors[name] = validity[name] ? '' : `${label} should match password`
        }
      }
    
      this.setState({
        formErrors: fieldValidationErrors,
        formValidity: validity,
      }, () => this.canSubmit())
    }
  }

  canSubmit() {
    this.setState({canSubmit: this.state.formValidity.email && this.state.formValidity.username && this.state.formValidity.password && this.state.formValidity.passwordConfirmation})
  }

  errorClass(error) {
    return(error.length === 0 ? '' : 'is-invalid')
  }
   
  handleSubmit = (event) => {
    event.preventDefault()
    const { email, username, password } = this.state
    alert(`Your registration detail: \n 
           Email: ${email} \n 
           Username: ${username} \n
           Password: ${password}`)
  }

  get previousButton(){
    let currentStep = this.state.currentStep
    if(currentStep !==1){
      return (

         <li className="previous list-inline-item disabled"  onClick={this._prev}>
                                        <a href="javascript::" className="btn btn-info"> <i className="fa fa-arrow-left" ></i> </a>
                                    </li>
              )
    }
    return null
  }

  get nextButton(){
    let currentStep = this.state.currentStep
    if(currentStep <7){
      return (
      <li className="next list-inline-item" onClick={this._next}>
                                        <a href="javascript::" className="btn btn-info"> <i className="fa fa-arrow-right"></i> </a>
                                    </li>
       
      )
    }
    return null
  }

  
  render() {    
    return (



      <Fragment>

      <AddHead />
    
      <div className="row">
    <div className="col-md-12">
        <div className="card">
            <div className="card-body">

                <h4 className="header-title mb-3">Course adding form                    <a href="#/user/courses" className="alignToTitle btn btn-outline-secondary btn-rounded btn-sm"> <i className=" mdi mdi-keyboard-backspace"></i> Back to course list</a><br/>
                </h4>
                <br/>

                <div className="row">
                    <div className="col-md-12">



                    <form className="required-form"  method="post" enctype="multipart/form-data">
                        



                               <ul className="nav nav-pills nav-justified form-wizard-header mb-3">
                                    <li className="nav-item" onClick={(e) => { this.goToStep(e,1)}}>
                                        <a href="#basic" data-toggle="tab" className="nav-link rounded-0 pt-2 pb-2 active">
                                            <i className="mdi mdi-fountain-pen-tip mr-1"></i>
                                            <span className="d-none d-sm-inline">Basic</span>
                                        </a>
                                    </li>
                                    <li className="nav-item" onClick={(e) => { this.goToStep(e,2)}}>
                                        <a href="#requirements" data-toggle="tab" className="nav-link rounded-0 pt-2 pb-2">
                                            <i className="mdi mdi-bell-alert mr-1"></i>
                                            <span className="d-none d-sm-inline">Requirements</span>
                                        </a>
                                    </li>
                                    <li className="nav-item" onClick={(e) => { this.goToStep(e,3)}}>
                                        <a href="#outcomes" data-toggle="tab" className="nav-link rounded-0 pt-2 pb-2">
                                            <i className="mdi mdi-camera-control mr-1"></i>
                                            <span className="d-none d-sm-inline">Outcomes</span>
                                        </a>
                                    </li>
                                    <li className="nav-item" onClick={(e) => { this.goToStep(e,4)}}>
                                        <a href="#pricing" data-toggle="tab" className="nav-link rounded-0 pt-2 pb-2">
                                            <i className="mdi mdi-currency-cny mr-1"></i>
                                            <span className="d-none d-sm-inline">Pricing</span>
                                        </a>
                                    </li>
                                    <li className="nav-item" onClick={(e) => { this.goToStep(e,5)}}>
                                        <a href="#media" data-toggle="tab" className="nav-link rounded-0 pt-2 pb-2">
                                            <i className="mdi mdi-library-video mr-1"></i>
                                            <span className="d-none d-sm-inline">Media</span>
                                        </a>
                                    </li>
                                    <li className="nav-item" onClick={(e) => { this.goToStep(e,6)}}>
                                        <a href="#seo" data-toggle="tab" className="nav-link rounded-0 pt-2 pb-2">
                                            <i className="mdi mdi-tag-multiple mr-1"></i>
                                            <span className="d-none d-sm-inline">Seo</span>
                                        </a>
                                    </li>
                                    <li className="nav-item"  onClick={(e) => { this.goToStep(e,7)}}>
                                        <a href="#finish" data-toggle="tab" className="nav-link rounded-0 pt-2 pb-2">
                                            <i className="mdi mdi-checkbox-marked-circle-outline mr-1"></i>
                                            <span className="d-none d-sm-inline">Finish</span>
                                        </a>
                                    </li>
                                </ul>



        <Step1 
          currentStep={this.state.currentStep} 
          handleChange={this.handleChange}
          errorEmailClass={this.errorClass(this.state.formErrors.email)}
          email={this.state.email}
          errorEmail={this.state.formErrors.email}
          errorUsernameClass={this.errorClass(this.state.formErrors.username)}
          username={this.state.username}
          errorUsername={this.state.formErrors.username}
        />



        <Step3 
          currentStep={this.state.currentStep} 
          handleChange={this.handleChange}
          comment={this.state.comment}
          canSubmit={this.state.canSubmit}
        />

        <Step2 
        currentStep={this.state.currentStep} 
        handleChange={this.handleChange}
        errorPasswordClass={this.errorClass(this.state.formErrors.password)}
        password={this.state.password}
        errorPassword={this.state.formErrors.password}
        errorPasswordConfirmationClass={this.errorClass(this.state.formErrors.passwordConfirmation)}
        passwordConfirmation={this.state.passwordConfirmation}
        errorPasswordConfirmation={this.state.formErrors.passwordConfirmation}
        />
        <Step4 
          currentStep={this.state.currentStep} 
          handleChange={this.handleChange}
          comment={this.state.comment}
          canSubmit={this.state.canSubmit}
        />
        <Step5
          currentStep={this.state.currentStep} 
          handleChange={this.handleChange}
          comment={this.state.comment}
          canSubmit={this.state.canSubmit}
        />
        <Step6 
          currentStep={this.state.currentStep} 
          handleChange={this.handleChange}
          comment={this.state.comment}
          canSubmit={this.state.canSubmit}
        />
        <Step7 
          currentStep={this.state.currentStep} 
          handleChange={this.handleChange}
          comment={this.state.comment}
          canSubmit={this.state.canSubmit}
        />
        <br/><br/>
      





                                <ul className="list-inline mb-0 wizard text-center">
                                   

                                     {this.previousButton}
                                    
                                     {this.nextButton}
                                </ul>
        

      </form>

     


        
      </div>
    </div></div></div></div></div>


    

    

    </Fragment>
    )
  }
}

class Step1 extends React.Component {
  render() {
    if (this.props.currentStep !== 1) {
      return null
    } 
    return(
      <React.Fragment>
       <div className="tab-content b-0 mb-0">
                                    <div className="tab-pane active" id="basic">
                                        <div className="row justify-content-center">

       <div className="col-md-8">
                                                <div className="form-group row mb-3">
                                                    <label className="col-md-2 col-form-label" for="course_title">Course title <span className="required">*</span> </label>
                                                    <div className="col-md-10">
                                                        <input type="text" className="form-control" id="course_title" name="title" placeholder="Enter course title" required="" />
                                                    </div>
                                                </div>
                                                <div className="form-group row mb-3">
                                                    <label className="col-md-2 col-form-label" for="short_description">Short description</label>
                                                    <div className="col-md-10">
                                                        <textarea name="short_description" id="short_description" className="form-control"></textarea>
                                                    </div>
                                                </div>
                                                <div className="form-group row mb-3">
                                                    <label className="col-md-2 col-form-label" for="description">Description</label>
                                                    <div className="col-md-10">
                                                        <textarea name="description" id="description" className="form-control" ></textarea><div className="note-editor note-frame card"><div className="note-dropzone">  <div className="note-dropzone-message"></div></div>
                                                     </div>
                                                </div>


                                                <div className="padded-down">
                  <Container>
                  <Row className="row">
                   
                     <Col md="12">
                     <p> Categories</p>
                       <div class="dropdown-container">
                          <div class="dropdown-button noselect form-control">
                              <div class="dropdown-label">All</div>
                              <div class="dropdown-quantity"></div>
                              <i class="fa fa-search fa "></i>
                          </div>
                          <div class="dropdown-list" style={{display:"none"}}>
                              <input type="search" placeholder="search categories" class=" dropdown-search pull-right"/>
                              <ul className="zap">
                                                        
                              </ul>
                          </div>
                      </div>
                     </Col>

                    <Col md="12">
                     <p> Status</p>
                       <div class="dropdown-container">
                          <div class="dropdown-button noselect form-control">
                              <div class="dropdown-label">All</div>
                              <div class="dropdown-quantity"></div>
                              <i class="fa fa-search fa-search "></i>
                          </div>
                          <div class="dropdown-list" style={{display:"none"}}>
                              <input type="search" placeholder="search categories" class=" dropdown-search pull-right"/>
                              <ul className="zap"></ul>
                          </div>
                      </div>
                     </Col>

                     <Col md="12">
                      <p> Price</p>
                       <div class="dropdown-container">
                          <div class="dropdown-button noselect form-control">
                              <div class="dropdown-label">All</div>
                              <div class="dropdown-quantity"></div>
                              <i class="fa fa-search fa-search "></i>
                          </div>
                          <div class="dropdown-list" style={{display:"none"}}>
                              <input type="search" placeholder="search categories" class="dropdown-search pull-right"/>
                              <ul className="zap"></ul>
                          </div>
                      </div>
                     </Col>

                     
                    
                    </Row>
                  </Container>
                </div>
                <br/>
                 
                                               
                                               
                                            <div className="form-group row ">
                                                <div className="offset-md-2 col-md-10">
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox" className="custom-control-input" name="is_top_course" id="is_top_course" value="1" />
                                                        <label className="custom-control-label" for="is_top_course">Check if this course is top course</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> 

                                        </div> 


          </div> </div> </div></React.Fragment>
   )
 }
}


class DynamicForm extends React.Component {
  constructor() {
    super();
    this.state = {
      shareholders: [{ name: '' }],
    };
  }
  
  handleShareholderNameChange = (idx) => (evt) => {
    const newShareholders = this.state.shareholders.map((shareholder, sidx) => {
      if (idx !== sidx) return shareholder;
      return { ...shareholder, name: evt.target.value };
    });
    
    this.setState({ shareholders: newShareholders });
  }
  
  
  handleAddShareholder = () => {
    this.setState({ shareholders: this.state.shareholders.concat([{ name: '' }]) });
  }
  
  handleRemoveShareholder = (idx) => () => {
    this.setState({ shareholders: this.state.shareholders.filter((s, sidx) => idx !== sidx) });
  }
  
  render() {    
    return (
      <div>
        <h6>{this.props.title}</h6>
      
        {this.state.shareholders.map((shareholder, idx) => (
          <div className="shareholder">
            <input
              type="text"
              placeholder={` #${idx + 1} name`}
              value={shareholder.name}
              onChange={this.handleShareholderNameChange(idx)}
            />
            <button type="button" onClick={this.handleRemoveShareholder(idx)} className="small">-</button>
          </div>
        ))}
        <button type="button" onClick={this.handleAddShareholder} className="small">Add More</button>
        
      </div>
    )
  }
}


class Step2 extends React.Component {
  render() {
    if (this.props.currentStep !== 2) {
      return null
    } 
    return(
    <React.Fragment><div className="tab-pane" id="outcomes">
                                    <div className="row justify-content-center">
                                        <div className="col-md-8">
                                            <div className="form-group row mb-3">
                                                <label className="col-md-2 col-form-label" for="outcomes">Outcomes</label>
                                                <div className="col-md-10">
                                                    <div id="outcomes_area">
                                                        <div className="d-flex mt-2">
                                                            <div className="flex-grow-1 px-3">
                                                                <div className="form-group">
                                                                    <input type="text" className="form-control" name="outcomes[]" id="outcomes" placeholder="Provide outcomes" />
                                                                </div>
                                                            </div>
                                                            <div className="">
                                                                <button type="button" className="btn btn-success btn-sm" name="button" onclick="appendOutcome()"> <i className="fa fa-plus"></i> </button>
                                                            </div>
                                                        </div>
                                                        <div id="blank_outcome_field" style={{display: "none"}}>
                                                            <div className="d-flex mt-2">
                                                                <div className="flex-grow-1 px-3">
                                                                    <div className="form-group">
                                                                        <input type="text" className="form-control" name="outcomes[]" id="outcomes" placeholder="Provide outcomes" />
                                                                    </div>
                                                                </div>
                                                                <div className="">
                                                                    <button type="button" className="btn btn-danger btn-sm" style={{marginTop: "0px"}} name="button" onclick="removeOutcome(this)"> <i className="fa fa-minus"></i> </button>
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
  )
 }
}

class Step3 extends React.Component {
  render() {
    if (this.props.currentStep !== 3) {
      return null
    } 
    return(
    <React.Fragment>

    <div className="tab-pane" id="requirements">
                                    <div className="row justify-content-center">
                                        <div className="col-md-8">
                                            <div className="form-group row mb-3">
                                                <label className="col-md-2 col-form-label" for="requirements">Requirements</label>
                                                <div className="col-md-10">
                                                    <div id="requirement_area">
                                                        <div className="d-flex mt-2">
                                                            <div className="flex-grow-1 px-3">
                                                                <div className="form-group">
                                                                    <input type="text" className="form-control" name="requirements[]" id="requirements" placeholder="Provide requirements" />
                                                                </div>
                                                            </div>
                                                            <div className="">
                                                                <button type="button" className="btn btn-success btn-sm"  name="button" > <i className="fa fa-plus"></i> </button>
                                                            </div>
                                                        </div>
                                                        <div id="blank_requirement_field" style={{display: "none"}}>
                                                            <div className="d-flex mt-2">
                                                                <div className="flex-grow-1 px-3">
                                                                    <div className="form-group">
                                                                        <input type="text" className="form-control" name="requirements[]" id="requirements" placeholder="Provide requirements" />
                                                                    </div>
                                                                </div>
                                                                <div className="">
                                                                    <button type="button" className="btn btn-danger btn-sm" style={{marginTop: "0px"}} name="button" onclick="removeRequirement(this)"> <i className="fa fa-minus"></i> </button>
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
  )
 }
}



class Step4 extends React.Component {
  render() {
    if (this.props.currentStep !== 4) {
      return null
    } 
    return(
    <React.Fragment> <div className="tab-pane" id="pricing">
                                    <div className="row justify-content-center">
                                        <div className="col-md-8">
                                            <div className="form-group row mb-3">
                                                <div className="offset-md-2 col-md-10">
                                                    <div className="custom-control custom-checkbox">
                                                        <input type="checkbox" className="custom-control-input" name="is_free_course" id="is_free_course" value="1" />
                                                        <label className="custom-control-label" for="is_free_course">Check if this is a free course</label>
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="paid-course-stuffs">
                                                <div className="form-group row mb-3">
                                                    <label className="col-md-2 col-form-label" for="price">Course price (₦)</label>
                                                    <div className="col-md-10">
                                                        <input type="number" className="form-control" id="price" name="price" placeholder="Enter course course price" min="0" />
                                                    </div>
                                                </div>

                                                <div className="form-group row mb-3">
                                                    <div className="offset-md-2 col-md-10">
                                                        <div className="custom-control custom-checkbox">
                                                            <input type="checkbox" className="custom-control-input" name="discount_flag" id="discount_flag" value="1" />
                                                            <label className="custom-control-label" for="discount_flag">Check if this course has discount</label>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="form-group row mb-3">
                                                    <label className="col-md-2 col-form-label" for="discounted_price">Discounted price (₦)</label>
                                                    <div className="col-md-10">
                                                        <input type="number" className="form-control" name="discounted_price" id="discounted_price"  min="0" />
                                                        <small className="text-muted">This course has <span id="discounted_percentage" className="text-danger">0%</span> Discount</small>
                                                    </div>
                                                </div>
                                            </div>
                                        </div> 
                                    </div> 
                                </div> 
                               </React.Fragment>
  )
 }
}


class Step5 extends React.Component {
  render() {
    if (this.props.currentStep !== 5) {
      return null
    } 
    return(
    <React.Fragment><div className="tab-pane" id="media">
                                    <div className="row justify-content-center">

                                        <div className="col-md-8">
                                            <div className="form-group row mb-3">
                                                <label className="col-md-2 col-form-label" for="course_overview_provider">Course overview provider</label>
                                                <div className="col-md-10">
                                                    <select className="form-control select2 select2-hidden-accessible" data-toggle="select2" name="course_overview_provider" id="course_overview_provider" data-select2-id="course_overview_provider" tabindex="-1" aria-hidden="true">
                                                        <option value="youtube" data-select2-id="8">Youtube</option>
                                                        <option value="vimeo">Vimeo</option>
                                                        <option value="html5">Html5</option>
                                                    </select><span className="" dir="ltr" data-select2-id="7" style={{width: "auto"}}><span className="selection"><span className="select2-selection select2-selection--single" role="combobox" aria-haspopup="true" aria-expanded="false" tabindex="0" aria-labelledby="select2-course_overview_provider-container"><span className="select2-selection__rendered" id="select2-course_overview_provider-container" role="textbox" aria-readonly="true" title="Youtube">Youtube</span><span className="select2-selection__arrow" role="presentation"><b role="presentation"></b></span></span></span><span className="dropdown-wrapper" aria-hidden="true"></span></span>
                                                </div>
                                            </div>
                                        </div> 

                                        <div className="col-md-8">
                                            <div className="form-group row mb-3">
                                                <label className="col-md-2 col-form-label" for="course_overview_url">Course overview url</label>
                                                <div className="col-md-10">
                                                    <input type="text" className="form-control" name="course_overview_url" id="course_overview_url" placeholder="E.g: https://www.youtube.com/watch?v=oBtf8Yglw2w" />
                                                </div>
                                            </div>
                                        </div> 
                                          <div className="col-md-8">
    <div className="form-group row mb-3">
      <label className="col-md-2 col-form-label" for="course_thumbnail_label">Course thumbnail</label>
      <div className="col-md-10">
        <div className="wrapper-image-preview" style={{marginLeft: "-6px"}}>
          <div className="box" style={{width: "250px"}}>
            <div className="js--image-preview" style={{backgroundImage: "ourse_thumbnail_placeholder.jpg",
              backgroundColor: "#F5F5F5"}}></div>
            <div className="upload-options">
              <label for="course_thumbnail" className="btn"> <i className="mdi mdi-camera"></i> Course thumbnail <br /> <small>(600 X 600)</small> </label>
              <input id="course_thumbnail" style={{visibility:"hidden"}} type="file" className="image-upload" name="course_thumbnail" accept="image/*" />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
                                       
                                    </div> 
                                </div></React.Fragment>
  )
 }
}


class Step6 extends React.Component {
  render() {
    if (this.props.currentStep !== 6) {
      return null
    } 
    return(
    <React.Fragment> <div className="tab-pane" id="seo">
                                    <div className="row justify-content-center">
                                        <div className="col-md-8">
                                            <div className="form-group row mb-3">
                                                <label className="col-md-2 col-form-label" for="website_keywords">Meta keywords</label>
                                                <div className="col-md-10">
                                                    <input type="text" className="form-control bootstrap-tag-input" id="meta_keywords" 
                                                    name="meta_keywords" data-role="tagsinput" style={{width: "100%", display: "none"}} placeholder="Write a keyword and then press enter button"  /><div className="bootstrap-tagsinput">
                                                    <input size="43" type="text" placeholder="Write a keyword and then press enter button" /></div>
                                                </div>
                                            </div>
                                        </div> 
                                        <div className="col-md-8">
                                            <div className="form-group row mb-3">
                                                <label className="col-md-2 col-form-label" for="meta_description">Meta description</label>
                                                <div className="col-md-10">
                                                    <textarea name="meta_description" className="form-control"></textarea>
                                                </div>
                                            </div>
                                        </div>
                                    </div> 
                                </div>
                               </React.Fragment>
  )
 }
}


class Step7 extends React.Component {
  render() {
    if (this.props.currentStep !== 7) {
      return null
    } 
    return(
    <React.Fragment><div className="tab-pane" id="finish">
                                    <div className="row">
                                        <div className="col-12">
                                            <div className="text-center">
                                                <h2 className="mt-0"><i className="mdi mdi-check-all"></i></h2>
                                                <h3 className="mt-0">Thank you !</h3>

                                                <p className="w-75 mb-2 mx-auto">You are just one click away</p>

                                                <div className="mb-3 mt-3">
                                                    <button type="button" className="btn btn-primary text-center" onclick="checkRequiredFields()">Submit</button>
                                                </div>
                                            </div>
                                        </div> 
                                    </div> 
                                </div>
</React.Fragment>
  )
 }
}
