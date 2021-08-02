import React, { Fragment, useEffect } from "react"
import {Container, Col, Row } from "react-bootstrap"
import { HeaderBox } from "./activityboxes"
import NavBar from "components/Navbar"
import Footer from "components/Footer"

import { Link } from "react-router-dom";
import Sidebar from "./sidebar"
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
        <button style={{background:"rgba(8,23,200)",borderRadius:"30px",padding:"10px", color:"#fff",width:"200px"}} className="btn  btn-small" type="button" onClick={this._prev}>Previous</button>
      )
    }
    return null
  }

  get nextButton(){
    let currentStep = this.state.currentStep
    if(currentStep <7){
      return (
        <button style={{background:"rgba(8,23,200)",width:"200px",borderRadius:"30px",padding:"10px", color:"#fff",marginTop:"-30px"}} className="btn  btn-small float-right" type="button" onClick={this._next}>Next</button>        
      )
    }
    return null
  }

  
  render() {    
    return (



      <Fragment>
    <NavBar/><br/><br/><br/><br/>
    
     <Styles>
      <div className="s-layout">
            
             <Fragment>
      <br />
    
     
      <div className="container-fluid">
        <Row>
          <br />
          <br />
          <br />
          <Col lg="3" md="3" sm="12">

          <div className="authoring-sidebar">
   
        
            <Sidebar/>
        
    
           </div>
           </Col>
           <br />
          <br />

          <Col lg="9" md="9" sm="12">
             
      <React.Fragment>
       <div  style={{margin:"20px auto"}}>

      
          

       

      
       
      <form className="wizard-form" onSubmit={this.handleSubmit}>
               <HeaderBox actionLink={"#authoring/course-new"} linkTitle="Add new course" />


      <div className="col-md-12 col-sm-12" style={{background:"#fff",marginTop:"10px"}}>
      <p>Step {this.state.currentStep} </p> 
         <h5>Course Adding Form</h5>
         <br/><br/><br/>
         <ul className="tabs-of-form">
            <li onClick={(e) => { this.goToStep(e,1)}}><i className="fa fa-user" style={{marginRight:"10px"}}></i>Basic</li>
            <li onClick={(e) => { this.goToStep(e,2)}}><i className="fa fa-user" style={{marginRight:"10px"}}></i>Requirements</li>
            <li onClick={(e) => { this.goToStep(e,3)}}><i className="fa fa-user" style={{marginRight:"10px"}}></i>Outcomes</li>
            <li onClick={(e) => { this.goToStep(e,4)}}><i className="fa fa-user" style={{marginRight:"10px"}}></i>Pricing</li>
            <li onClick={(e) => { this.goToStep(e,5)}}><i className="fa fa-user" style={{marginRight:"10px"}}></i>Media</li>
            <li onClick={(e) => { this.goToStep(e,6)}}><i className="fa fa-user" style={{marginRight:"10px"}}></i>Seo</li>
            <li onClick={(e) => { this.goToStep(e,7)}}><i className="fa fa-user" style={{marginRight:"10px"}}></i>Finish</li>

         </ul>
         <br/>
         <br/>

      </div>


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
        <Step3 
          currentStep={this.state.currentStep} 
          handleChange={this.handleChange}
          comment={this.state.comment}
          canSubmit={this.state.canSubmit}
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
        {this.previousButton}
        {this.nextButton}
        

      </form>

      <br/><br/><br/><br/>

     </div></React.Fragment>
          </Col>
          
        </Row>

        
      </div>
      <Footer />
    </Fragment>
        </div>
      </Styles>

    

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
      <React.Fragment><div className="card-box" >
      <div className="form-group">
        <label htmlFor="email">Title</label>
        <input
          className={`form-control ${this.props.errorEmailClass}`}
          id="email"
          name="email"
          type="text"
          placeholder="Title"
          value={this.props.email}
          onChange={this.props.handleChange}
        />
        <div className="invalid-feedback">{this.props.errorEmail}</div>
      </div>
      <div className="form-group">
      <label htmlFor="username">Short Description</label>
      <input
        className={`form-control ${this.props.errorUsernameClass}`}
        id="username"
        name="username"
        type="text"
        placeholder=""
        value={this.props.username}
        onChange={this.props.handleChange}
      />
       <div className="invalid-feedback">{this.props.errorUsername}</div>
    </div>


      <div className="form-group">
      <label htmlFor="username">Description</label>
      <textarea
      col="260"
        className={`form-control ${this.props.errorUsernameClass}`}
        id="username"
        name="username"
        type="text"
        placeholder=""
        value={this.props.username}
        onChange={this.props.handleChange}
      ></textarea>




      <div className="invalid-feedback">{this.props.errorUsername}</div>
    </div>





        <div className="form-group">
                     <label> Categories</label>
                       <div class=" dropdown-container-x">
                          <div class="dropdown-button noselect">
                              <div class="dropdown-label">All</div>
                              <div class="dropdown-quantity"></div>
                              <i class="fa fa-search fa "></i>
                          </div>
                          <div class="dropdown-list" style={{display:"none"}}>
                              <input type="search" placeholder="search categories" class="dropdown-search pull-right"/>
                              <ul className="zap"></ul>
                          </div>
                      </div>
        </div>

         <div className="form-group">
                     <label>Level</label>
                       <div class="dropdown-container-x">
                          <div class="dropdown-button noselect">
                              <div class="dropdown-label">All</div>
                              <div class="dropdown-quantity"></div>
                              <i class="fa fa-search fa "></i>
                          </div>
                          <div class="dropdown-list" style={{display:"none"}}>
                              <input type="search" placeholder="search categories" class="dropdown-search pull-right"/>
                              <ul className="zap"></ul>
                          </div>
                      </div>
        </div>


        <div className="form-group">
                     <label>Language Made in</label>
                       <div class=" dropdown-container-x">
                          <div class="dropdown-button noselect">
                              <div class="dropdown-label">All</div>
                              <div class="dropdown-quantity"></div>
                              <i class="fa fa-search fa "></i>
                          </div>
                          <div class="dropdown-list" style={{display:"none"}}>
                              <input type="search" placeholder="search categories" class="dropdown-search pull-right"/>
                              <ul className="zap"></ul>
                          </div>
                      </div>
        </div>
     <br/>

        <div className="form-group">
         <br/> <br/>
                     <input className=" pull-left" type="checkbox" style={{marginRight:"20px"}}/>
                     <label className="">Check if course is top course</label>
        </div>



          </div></React.Fragment>
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
    <React.Fragment><div className="card-box">
    <DynamicForm title={"Requirements"} />
   </div></React.Fragment>
  )
 }
}

class Step3 extends React.Component {
  render() {
    if (this.props.currentStep !== 3) {
      return null
    } 
    return(
    <React.Fragment><div className="card-box">
      <DynamicForm title={"Outcomes"} />      
    </div></React.Fragment>
  )
 }
}



class Step4 extends React.Component {
  render() {
    if (this.props.currentStep !== 4) {
      return null
    } 
    return(
    <React.Fragment><div className="card-box">


        <div className="form-group">
         <br/> <br/>
                     <input className=" pull-left" type="checkbox" style={{marginRight:"20px"}}/>
                     <label className="">Check if course is free course</label>
        </div>
      
      <div className="form-group">
      <label htmlFor="username">Course Price</label>
      <input
        className={`form-control ${this.props.errorUsernameClass}`}
        id="username"
        name="username"
        type="number"
        placeholder=""
        value={this.props.username}
        onChange={this.props.handleChange}
      />
       <div className="invalid-feedback">{this.props.errorUsername}</div>
    </div>
        


        <div className="form-group">
         <br/> <br/>
                     <input className=" pull-left" type="checkbox" style={{marginRight:"20px"}}/>
                     <label className="">Check if course has discount</label>
        </div>
      
      <div className="form-group">
      <label htmlFor="username">Discount</label>
      <input
        className={`form-control ${this.props.errorUsernameClass}`}
        id="username"
        name="username"
        type="text"
        placeholder=""
        value={this.props.username}
        onChange={this.props.handleChange}
      />
       <div className="invalid-feedback">{this.props.errorUsername}</div>
    </div>


     </div></React.Fragment>
  )
 }
}


class Step5 extends React.Component {
  render() {
    if (this.props.currentStep !== 5) {
      return null
    } 
    return(
    <React.Fragment><div className="card-box">
        
      <div className="form-group">
      <label htmlFor="username">course overview provider</label>
      <input
        className={`form-control ${this.props.errorUsernameClass}`}
        id="username"
        name="username"
        type="text"
        placeholder=""
        value={this.props.username}
        onChange={this.props.handleChange}
      />
       <div className="invalid-feedback">{this.props.errorUsername}</div>
    </div>



      <div className="form-group">
      <label htmlFor="username">Course overview url</label>
      <input
        className={`form-control ${this.props.errorUsernameClass}`}
        id="username"
        name="username"
        type="text"
        placeholder=""
        value={this.props.username}
        onChange={this.props.handleChange}
      />
       <div className="invalid-feedback">{this.props.errorUsername}</div>
    </div>



    <div >
                
                <div >
                 
                        <img alt="User Pic" src="https://d30y9cdsu7xlg0.cloudfront.net/png/138926-200.png" id="profile-image1" height="200" />
                        <input id="profile-image-upload" class="hidden" type="file" onchange="previewFile()" />
                        <div style={{color:"#999"}} >  </div>
                        
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
    <React.Fragment><div className="card-box">
      <div className="form-group">
        <label htmlFor="comment"> Meta Keyword:</label>
          <textarea 
          className="form-control"
          id="comment"
          name="comment" 
          value={this.props.comment} 
          onChange={this.props.handleChange} />
      </div>

      <div className="form-group">
        <label htmlFor="comment"> Meta description:</label>
          <textarea 
          className="form-control"
          id="comment"
          name="comment" 
          value={this.props.comment} 
          onChange={this.props.handleChange} />
      </div>

     </div></React.Fragment>
  )
 }
}


class Step7 extends React.Component {
  render() {
    if (this.props.currentStep !== 7) {
      return null
    } 
    return(
    <React.Fragment><div className="card-box">
      <div className="form-group" style={{justifyContent:"center",textAlign:"center"}}>
        <h3 style={{justifyContent:"center",textAlign:"center"}}>Thank you</h3>
        <p style={{justifyContent:"center",textAlign:"center"}}>You are just one click away</p>
      </div>       
      <button className="btn btn-success btn-block" style={{background:"green",color:"#fff"}} disabled={!this.props.canSubmit}>submit</button>
   </div></React.Fragment>
  )
 }
}
