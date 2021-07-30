import React, { Fragment, useEffect } from "react"
import {Container, Col, Row } from "react-bootstrap"
import { HeaderBox } from "./activityboxes"
import NavBar from "components/Navbar"
import Footer from "components/Footer"

import { Link } from "react-router-dom";
import Sidebar from "./sidebar"
import $ from "jquery"


const MainFormLayout = () => {

    return(
      <Fragment>
      <NavBar />
      <br />

          <br />
          <br />
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

          <Col lg="9" md="9" sm="12">
            <CourseFormWizard />
          </Col>
          
        </Row>

        
      </div>
      <Footer />
    </Fragment>
    )
}


class CourseFormWizard extends React.Component  {
    constructor(props){
        super(props)
    }

  scroll_to_class(element_class, removed_height) {
    var scroll_to = $(element_class).offset().top - removed_height;
    if($(window).scrollTop() != scroll_to) {
        $('html, body').stop().animate({scrollTop: scroll_to}, 0);
    }
  }

  bar_progress(progress_line_object, direction) {
    var number_of_steps = progress_line_object.data('number-of-steps');
    var now_value = progress_line_object.data('now-value');
    var new_value = 0;
    if(direction == 'right') {
        new_value = now_value + ( 100 / number_of_steps );
    }
    else if(direction == 'left') {
        new_value = now_value - ( 100 / number_of_steps );
    }
    progress_line_object.attr('style', 'width: ' + new_value + '%;').data('now-value', new_value);
  }


  componentDidMount(){
    $(document).ready(function() {
    
        
        
        /*
            Form
        */
        $('.f1 fieldset:first').fadeIn('slow');
        
        $('.f1 input[type="text"], .f1 input[type="password"], .f1 textarea').on('focus', function() {
            $(this).removeClass('input-error');
        });
        
        // next step
        $('.f1 .btn-next').on('click', function() {
            var parent_fieldset = $(this).parents('fieldset');
            var next_step = true;
            // navigation steps / progress steps
            var current_active_step = $(this).parents('.f1').find('.f1-step.active');
            var progress_line = $(this).parents('.f1').find('.f1-progress-line');
            
            // fields validation
            parent_fieldset.find('input[type="text"], input[type="password"], textarea').each(function() {
                if( $(this).val() == "" ) {
                    $(this).addClass('input-error');
                    next_step = false;
                }
                else {
                    $(this).removeClass('input-error');
                }
            });
            // fields validation
            
            if( next_step ) {
                parent_fieldset.fadeOut(400, function() {
                    // change icons
                    current_active_step.removeClass('active').addClass('activated').next().addClass('active');
                    // progress bar
                    this.bar_progress(progress_line, 'right');
                    // show next step
                    $(this).next().fadeIn();
                    // scroll window to beginning of the form
                    this.scroll_to_class( $('.f1'), 20 );
                });
            }
            
        });
        
        // previous step
        $('.f1 .btn-previous').on('click', function() {
            // navigation steps / progress steps
            var current_active_step = $(this).parents('.f1').find('.f1-step.active');
            var progress_line = $(this).parents('.f1').find('.f1-progress-line');
            
            $(this).parents('fieldset').fadeOut(400, function() {
                // change icons
                current_active_step.removeClass('active').prev().removeClass('activated').addClass('active');
                // progress bar
                this.bar_progress(progress_line, 'left');
                // show previous step
                $(this).prev().fadeIn();
                // scroll window to beginning of the form
                this.scroll_to_class( $('.f1'), 20 );
            });
        });
        
        // submit
        $('.f1').on('submit', function(e) {
            
            // fields validation
            $(this).find('input[type="text"], input[type="password"], textarea').each(function() {
                if( $(this).val() == "" ) {
                    e.preventDefault();
                    $(this).addClass('input-error');
                }
                else {
                    $(this).removeClass('input-error');
                }
            });
            // fields validation
            
        });
        
        
    });

  }



    render() {
	return (
	  <Fragment>
  
      <br/><br/><br/>
          <HeaderBox actionLink={"#authoring/add-course"} linkTitle="Add a course" />


          <Container>
            <Row>
               <Col md="12" lg="12">


               <div className="top-content" >
            <div className="container">
                
                <div className="row">
                    <div className="col-sm-8 col-sm-offset-2 text">
                        <h1>Add <strong>Course</strong> </h1>
                        <div className="description">
                       	    
                        </div>
                    </div>
                </div>
                
                <div className="row">
                    <div className="col-sm-10 col-sm-offset-1 col-md-8 col-md-offset-2 col-lg-6 col-lg-offset-3 form-box">
                    	<form role="form" action="" method="post" className="f1">
                    		<div className="f1-steps">
                    			<div className="f1-progress">
                    			    <div className="f1-progress-line" data-now-value="16.66" data-number-of-steps="3" style={{width: "16.66%"}}></div>
                    			</div>
                    			<div className="f1-step active">
                    				<div className="f1-step-icon"><i className="fa fa-user"></i></div>
                    				<p>about</p>
                    			</div>
                    			<div className="f1-step">
                    				<div className="f1-step-icon"><i className="fa fa-key"></i></div>
                    				<p>account</p>
                    			</div>
                    		    <div className="f1-step">
                    				<div className="f1-step-icon"><i className="fa fa-twitter"></i></div>
                    				<p>social</p>
                    			</div>
                    		</div>
                    		
                    		<fieldset>
                    		    <h4>Tell us who you are:</h4>
                    			<div className="form-group">
                    			    <label className="sr-only" for="f1-first-name">First name</label>
                                    <input type="text" name="f1-first-name" placeholder="First name..." className="f1-first-name form-control" id="f1-first-name" />
                                </div>
                                <div className="form-group">
                                    <label className="sr-only" for="f1-last-name">Last name</label>
                                    <input type="text" name="f1-last-name" placeholder="Last name..." className="f1-last-name form-control" id="f1-last-name" />
                                </div>
                                <div className="form-group">
                                    <label className="sr-only" for="f1-about-yourself">About yourself</label>
                                    <textarea name="f1-about-yourself" placeholder="About yourself..." 
                                    	                 className="f1-about-yourself form-control" id="f1-about-yourself"></textarea>
                                </div>
                                <div className="f1-buttons">
                                    <button type="button" className="btn btn-next">Next</button>
                                </div>
                            </fieldset>

                            <fieldset>
                                <h4>Set up your account:</h4>
                                <div className="form-group">
                                    <label className="sr-only" for="f1-email">Email</label>
                                    <input type="text" name="f1-email" placeholder="Email..." className="f1-email form-control" id="f1-email" />
                                </div>
                                <div className="form-group">
                                    <label className="sr-only" for="f1-password">Password</label>
                                    <input type="password" name="f1-password" placeholder="Password..." className="f1-password form-control" id="f1-password" />
                                </div>
                                <div className="form-group">
                                    <label className="sr-only" for="f1-repeat-password">Repeat password</label>
                                    <input type="password" name="f1-repeat-password" placeholder="Repeat password..." 
                                                        className="f1-repeat-password form-control" id="f1-repeat-password" />
                                </div>
                                <div className="f1-buttons">
                                    <button type="button" className="btn btn-previous">Previous</button>
                                    <button type="button" className="btn btn-next">Next</button>
                                </div>
                            </fieldset>

                            <fieldset>
                                <h4>Social media profiles:</h4>
                                <div className="form-group">
                                    <label className="sr-only" for="f1-facebook">Facebook</label>
                                    <input type="text" name="f1-facebook" placeholder="Facebook..." className="f1-facebook form-control" id="f1-facebook" />
                                </div>
                                <div className="form-group">
                                    <label className="sr-only" for="f1-twitter">Twitter</label>
                                    <input type="text" name="f1-twitter" placeholder="Twitter..." className="f1-twitter form-control" id="f1-twitter" />
                                </div>
                                <div className="form-group">
                                    <label className="sr-only" for="f1-google-plus">Google plus</label>
                                    <input type="text" name="f1-google-plus" placeholder="Google plus..." className="f1-google-plus form-control" id="f1-google-plus" />
                                </div>
                                <div className="f1-buttons">
                                    <button type="button" className="btn btn-previous">Previous</button>
                                    <button type="submit" className="btn btn-submit">Submit</button>
                                </div>
                            </fieldset>
                    	
                    	</form>
                    </div>
                </div>
                    
            </div>
        </div>



               </Col>
            </Row>
          </Container>


	  </Fragment>

	)

}
}

export default MainFormLayout