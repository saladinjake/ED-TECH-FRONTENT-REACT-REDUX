import React, { useEffect, Fragment }from "react"
import { Col, Container, Row } from "react-bootstrap"
// import { Styles } from "./styles/sidebar.js"
import "./styles/authoring.css";
import "./styles/main.css"

import  $ from "jquery"




export const FormWizard = () => {

	useEffect(() => {

		$('.dropdown-container')
  .on('click', '.dropdown-button', function() {
        $(this).siblings('.dropdown-list').toggle();
  })
  .on('input', '.dropdown-search pull-right', function() {
      var target = $(this);
        var dropdownList = target.closest('.dropdown-list');
      var search = target.val().toLowerCase();
    
      if (!search) {
            dropdownList.find('li').show();
            return false;
        }
    
      dropdownList.find('li').each(function() {
          var text = $(this).text().toLowerCase();
            var match = text.indexOf(search) > -1;
            $(this).toggle(match);
        });
  })
  .on('change', '[type="checkbox"]', function() {
        var container = $(this).closest('.dropdown-container');
        var numChecked = container. find('[type="checkbox"]:checked').length;
      container.find('.quantity').text(numChecked || 'Any');
  });

// JSON of States for demo purposes
var usStates = [
    
];
let stateTemplate =""
// Populate list with states
usStates.forEach(function(s) {
    s.name = s.name;
    stateTemplate+="<li>"
    stateTemplate+=`<input name=\" \"  type=\"checkbox\" />`
     stateTemplate+=`<label for=\" \"   />${s.name}</label>`
    stateTemplate+="</li>"
    $('ul.zap').append( stateTemplate);
});


	})
	return (
       <Fragment>
                    
                    <div className="row ">
						    <div className="col-md-12">
						        <div className="card">
						            <div className="card-body">
						                <h4 className="page-title"> <i className="mdi mdi-apple-keyboard-command title_icon"></i> Add new course</h4>
						            </div> 
						        </div>
						    </div>
                    </div>

<div className="row">
    <div className="col-md-12">
        <div className="card">
            <div className="card-body">

                <h4 className="header-title mb-3">Course adding form                    <a href="#/user/courses" className="alignToTitle btn btn-outline-secondary btn-rounded btn-sm"> <i className=" mdi mdi-keyboard-backspace"></i> Back to course list</a>
                </h4>

                <div className="row">
                    <div className="col-md-12">



                    <form className="required-form"  method="post" enctype="multipart/form-data">
                        



                               <ul className="nav nav-pills nav-justified form-wizard-header mb-3">
                                    <li className="nav-item">
                                        <a href="#basic" data-toggle="tab" className="nav-link rounded-0 pt-2 pb-2 active">
                                            <i className="mdi mdi-fountain-pen-tip mr-1"></i>
                                            <span className="d-none d-sm-inline">Basic</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#requirements" data-toggle="tab" className="nav-link rounded-0 pt-2 pb-2">
                                            <i className="mdi mdi-bell-alert mr-1"></i>
                                            <span className="d-none d-sm-inline">Requirements</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#outcomes" data-toggle="tab" className="nav-link rounded-0 pt-2 pb-2">
                                            <i className="mdi mdi-camera-control mr-1"></i>
                                            <span className="d-none d-sm-inline">Outcomes</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#pricing" data-toggle="tab" className="nav-link rounded-0 pt-2 pb-2">
                                            <i className="mdi mdi-currency-cny mr-1"></i>
                                            <span className="d-none d-sm-inline">Pricing</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#media" data-toggle="tab" className="nav-link rounded-0 pt-2 pb-2">
                                            <i className="mdi mdi-library-video mr-1"></i>
                                            <span className="d-none d-sm-inline">Media</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#seo" data-toggle="tab" className="nav-link rounded-0 pt-2 pb-2">
                                            <i className="mdi mdi-tag-multiple mr-1"></i>
                                            <span className="d-none d-sm-inline">Seo</span>
                                        </a>
                                    </li>
                                    <li className="nav-item">
                                        <a href="#finish" data-toggle="tab" className="nav-link rounded-0 pt-2 pb-2">
                                            <i className="mdi mdi-checkbox-marked-circle-outline mr-1"></i>
                                            <span className="d-none d-sm-inline">Finish</span>
                                        </a>
                                    </li>
                                </ul>

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
                                </div> 

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

                                <div className="tab-pane" id="outcomes">
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

                                <div className="tab-pane" id="pricing">
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
                                <div className="tab-pane" id="media">
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
                                </div>
                                <div className="tab-pane" id="seo">
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
                                <div className="tab-pane" id="finish">
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

                                <ul className="list-inline mb-0 wizard text-center">
                                    <li className="previous list-inline-item disabled">
                                        <a href="javascript::" className="btn btn-info"> <i className="mdi mdi-arrow-left-bold"></i> </a>
                                    </li>
                                    <li className="next list-inline-item">
                                        <a href="javascript::" className="btn btn-info"> <i className="mdi mdi-arrow-right-bold"></i> </a>
                                    </li>
                                </ul>

                            </div>
                            </div>
                          </form>

                </div>
            </div>
        </div> 
    </div> 

 </div> 
    </div> 

</Fragment>



                  
	)
}



export const OverviewDash = () => {
  return (
    <div>


   
                    
<div className="row">
    <div className="col-md-12">
        <div className="card">
            <div className="card-body">
                <h4 className="page-title"> <i className="mdi mdi-apple-keyboard-command title_icon"></i> Dashboard</h4>
            </div> 
        </div>
    </div>
</div>

<div className="row">
    <div className="col-md-12">
        <div className="card">
            <div className="card-body">
                <h4 className="header-title mb-4">Instructor revenue</h4>
                <div className="mt-3 chartjs-chart" style={{height: "320px"}}><div className="chartjs-size-monitor" style={{position: "absolute", inset: "0px", 
                overflow: "hidden", pointerEvents: "none", visibility: "hidden", zIndex: "-1"}}>
                <div className="chartjs-size-monitor-expand" style={{position:"absolute", left:"0",top:"0",
                 right:"0", bottom:"0",overflow:"hidden",pointerEvents:"none",
                 visibility:"hidden",zIndex:"-1"}}>
                 <div style={{position:"absolute",width:"1000000px",height:"1000000px",left:"0",top:"0"}}></div></div>
                 <div className="chartjs-size-monitor-shrink" style={{position:"absolute",left:"0",top:"0",right:"0",bottom:"0",
                 overflow:"hidden",pointerEvents:"none",visibility:"hidden",zIndex:"-1"}}>
                 <div style={{position:"absolute",width:"200%",height:"200%",left:"0", top:"0"}}></div></div></div>
                    <canvas id="task-area-chart" width="546" style={{display: "block", height: "320px", width: "182px"}} className="chartjs-render-monitor" height="960"></canvas>
                </div>
            </div> 
        </div> 
    </div>
</div>

<div className="row">
    <div className="col-12">
        <div className="card widget-inline">
            <div className="card-body p-0">
                <div className="row no-gutters">
                    <div className="col-sm-6 col-md-3">
                        <a href="/user/courses" className="text-secondary">
                            <div className="card shadow-none m-0">
                                <div className="card-body text-center">
                                    <i className="dripicons-archive text-muted" style={{fontSize:"24px"}}></i>
                                    <h3><span>0</span></h3>
                                    <p className="text-muted font-15 mb-0">Number of courses</p>
                                </div>
                            </div>
                        </a>
                    </div>

                    <div className="col-sm-6 col-md-3">
                        <div className="card shadow-none m-0 border-left">
                            <div className="card-body text-center">
                                <i className="dripicons-user-group text-muted" style={{fontSize:"24px"}}></i>
                                <h3><span>0</span></h3>
                                <p className="text-muted font-15 mb-0">Number of enrolment</p>
                            </div>
                        </div>
                    </div>

                    <div className="col-sm-6 col-md-3">
                        <a href="/user/payout_report" className="text-secondary">
                            <div className="card shadow-none m-0 border-left">
                                <div className="card-body text-center">
                                    <i className="dripicons-inbox text-muted" style={{fontSize:"24px"}}></i>
                                    <h3><span>₦0</span></h3>
                                    <p className="text-muted font-15 mb-0">Pending balance</p>
                                </div>
                            </div>
                        </a>
                    </div>

                    <div className="col-sm-6 col-md-3">
                        <a href="/user/payout_report" className="text-secondary">
                            <div className="card shadow-none m-0 border-left">
                                <div className="card-body text-center">
                                    <i className="dripicons-pin text-muted" style={{fontSize:"24px"}}></i>
                                    <h3><span>₦0</span></h3>
                                    <p className="text-muted font-15 mb-0">Requested withdrawal amount</p>
                                </div>
                            </div>
                        </a>
                    </div>

                </div> 
            </div>
        </div>
    </div> 
</div>
<div className="row">
    <div className="col-md-12">
        <div className="card">
            <div className="card-body">
                <h4 className="header-title mb-4">Course overview</h4>
                <div className="my-4 chartjs-chart" style={{height: "202px"}}><div className="chartjs-size-monitor" style={{position: "absolute", inset: "0px", 
                overflow: "hidden", pointerEvents: "none", visibility: "hidden", zIndex: "-1"}}><div className="chartjs-size-monitor-expand" style={{position:"absolute", left:"0",top:"0",
                 right:"0", bottom:"0",overflow:"hidden",pointerEvents:"none",
                 visibility:"hidden",zIndex:"-1"}}>
                 <div style={{position:"absolute",width:"1000000px",height:"1000000px",left:"0",top:"0"}}></div></div>
                 <div className="chartjs-size-monitor-shrink" style={{position:"absolute",left:"0",top:"0",right:"0",bottom:"0",
                 overflow:"hidden",pointerEvents:"none",visibility:"hidden",zIndex:"-1"}}>
                 <div style={{position:"absolute",width:"200%",height:"200%",left:"0", top:"0"}}></div></div></div>
                    <canvas id="project-status-chart" width="546" style={{display: "block", height: "202px", width: "182px"}} className="chartjs-render-monitor" height="606"></canvas>
                </div>
                <div className="row text-center mt-2 py-2">
                    <div className="col-6">
                        <i className="mdi mdi-trending-up text-success mt-3 h3"></i>
                        <h3 className="font-weight-normal">
                            <span>0</span>
                        </h3>
                        <p className="text-muted mb-0">Active courses</p>
                    </div>
                    <div className="col-6">
                        <i className="mdi mdi-trending-down text-warning mt-3 h3"></i>
                        <h3 className="font-weight-normal">
                            <span>0</span>
                        </h3>
                        <p className="text-muted mb-0"> Pending courses</p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>
                
      
          
    </div>
  );
};


export const AddHead = () => {
	return (
      <div className="row ">
					    <div className="col-md-12">
					        <div className="card">
					            <div className="card-body">
					                <h4 className="page-title"> <i className="mdi mdi-apple-keyboard-command title_icon"></i> Courses                    <a href={process.env.PUBLIC_URL+"/authoring/create/new"} className="btn btn-outline-primary btn-rounded alignToTitle"><i className="mdi mdi-plus"></i>Add new course</a>
					                </h4>
					            </div>
					        </div> 
					    </div>
                   </div>

	)
}

export const AddBoxes =() => {
	return (
      
<div className="row">
    <div className="col-md-12">
        <div className="card widget-inline">
            <div className="card-body p-0">
                <div className="row no-gutters">
                    <div className="col">
                        <a href="/user/courses" className="text-secondary">
                            <div className="card shadow-none m-0">
                                <div className="card-body text-center">
                                    <i className="dripicons-link text-muted" style={{fontSize: "24px"}}></i>
                                    <h3><span>
                                        0                                    </span></h3>
                                    <p className="text-muted font-15 mb-0">Active courses</p>
                                </div>
                            </div>
                        </a>
                    </div>

                    <div className="col">
                        <a href="/user/courses" className="text-secondary">
                            <div className="card shadow-none m-0 border-left">
                                <div className="card-body text-center">
                                    <i className="dripicons-link-broken text-muted" style={{fontSize: "24px"}}></i>
                                    <h3><span>
                                        0                                    </span></h3>
                                    <p className="text-muted font-15 mb-0">Pending courses</p>
                                </div>
                            </div>
                        </a>
                    </div>

                    <div className="col">
                        <a href="/user/courses" className="text-secondary">
                            <div className="card shadow-none m-0 border-left">
                                <div className="card-body text-center">
                                    <i className="dripicons-bookmark text-muted" style={{fontSize: "24px"}}></i>
                                    <h3><span>
                                        0                                    </span></h3>
                                    <p className="text-muted font-15 mb-0">Draft courses</p>
                                </div>
                            </div>
                        </a>
                    </div>

                    <div className="col">
                        <a href="/user/courses" className="text-secondary">
                            <div className="card shadow-none m-0 border-left">
                                <div className="card-body text-center">
                                    <i className="dripicons-star text-muted" style={{fontSize: "24px"}}></i>
                                    <h3><span>0</span></h3>
                                    <p className="text-muted font-15 mb-0">Free courses</p>
                                </div>
                            </div>
                        </a>
                    </div>

                    <div className="col">
                        <a href="/user/courses" className="text-secondary">
                            <div className="card shadow-none m-0 border-left">
                                <div className="card-body text-center">
                                    <i className="dripicons-tags text-muted" style={{fontSize: "24px"}}></i>
                                    <h3><span>0</span></h3>
                                    <p className="text-muted font-15 mb-0">Paid courses</p>
                                </div>
                            </div>
                        </a>
                    </div>

                </div> 
            </div>
        </div> 
    </div> 
</div>
	)
}


export const AddFormBox = () => {
	return (
      <div className="row">
    <div className="col-md-12">
        <div className="card">
            <div className="card-body">
                <h4 className="mb-3 header-title">Course list</h4>
                <form className="row justify-content-center" action="/user/courses" method="get">
                    
                    <div className="col-md-3">
                        <div className="form-group">
                            <label for="category_id">Categories</label>
                            <select className="form-control select2" data-toggle="select2" name="category_id" id="category_id">
                                <option value="all" selected>All</option>
                                                                    <optgroup label="ARTS & HUMANITIES ">
                                                                                <option value="69" >Education</option>
                                                                            <option value="70" >History</option>
                                                                            <option value="71" >Political Science</option>
                                                                            <option value="72" >Sociology</option>
                                                                            <option value="73" >Geography</option>
                                                                            <option value="76" >Media and Journalism</option>
                                                                            <option value="77" >Architecture</option>
                                                                    </optgroup>
                                                                <optgroup label="BUSINESS">
                                                                                <option value="86" >Business Process Management </option>
                                                                            <option value="124" >Service Management</option>
                                                                            <option value="125" >Supply Chain Management</option>
                                                                            <option value="126" >Sales and Marketing Management</option>
                                                                            <option value="127" >Risk Management</option>
                                                                            <option value="128" >Customer Service</option>
                                                                            <option value="129" >Business Leadership</option>
                                                                            <option value="130" >Human Resources</option>
                                                                            <option value="131" >Finance and Banking</option>
                                                                            <option value="132" >Accounting</option>
                                                                    </optgroup>
                                                                <optgroup label="HEALTH CARE">
                                                                                <option value="88" >Nursing </option>
                                                                            <option value="89" >Disease and Disorders</option>
                                                                            <option value="90" >Nutrition</option>
                                                                            <option value="91" >Caregiving</option>
                                                                            <option value="92" >Pharmacology</option>
                                                                    </optgroup>
                                                                <optgroup label="LAW & SOCIAL SCIENCES">
                                                                                <option value="95" >Law</option>
                                                                            <option value="96" >Economics</option>
                                                                            <option value="97" >Psychology</option>
                                                                    </optgroup>
                                                                <optgroup label="INFORMATION TECHNOLOGY">
                                                                                <option value="100" >Network and security</option>
                                                                            <option value="101" >IT Management</option>
                                                                            <option value="102" >Digital Marketing</option>
                                                                            <option value="103" >Web Site and Application Development</option>
                                                                    </optgroup>
                                                                <optgroup label="MATHEMATICS ">
                                                                                <option value="105" >SS1 Mathematics</option>
                                                                            <option value="106" >SS2 Mathematics</option>
                                                                            <option value="107" >SS3 Mathematics</option>
                                                                    </optgroup>
                                                                <optgroup label="ENGINEERING AND PHYSICAL SCIENCES">
                                                                                <option value="110" >Computer Science and Engineering</option>
                                                                            <option value="111" >Electrical Engineering </option>
                                                                            <option value="112" >Mechanical Engineering</option>
                                                                            <option value="113" >Chemical Engineering</option>
                                                                            <option value="114" >Civil Engineering</option>
                                                                            <option value="116" >Biology </option>
                                                                            <option value="117" >Physics </option>
                                                                            <option value="118" >Chemistry</option>
                                                                            <option value="119" >Environmental Studies</option>
                                                                            <option value="120" >Agricultural Science</option>
                                                                    </optgroup>
                                                                <optgroup label="LANGUAGE ">
                                                                                <option value="134" >English</option>
                                                                            <option value="135" >Yoruba</option>
                                                                            <option value="136" >Igbo</option>
                                                                            <option value="137" >Hausa</option>
                                                                            <option value="138" >Chinese</option>
                                                                            <option value="139" >French</option>
                                                                    </optgroup>
                                                    </select>
                    </div>
                </div>

                <div className="col-md-3">
                    <div className="form-group">
                        <label for="status">Status</label>
                        <select className="form-control select2" data-toggle="select2" name="status" id = 'status'>
                            <option value="all" selected>All</option>
                            <option value="active" >Active</option>
                            <option value="pending" >Pending</option>
                        </select>
                    </div>
                </div>

               
                <div className="col-md-3">
                    <div className="form-group">
                        <label for="price">Price</label>
                        <select className="form-control select2" data-toggle="select2" name="price" id = 'price'>
                            <option value="all"  selected>All</option>
                            <option value="free" >Free</option>
                            <option value="paid" >Paid</option>
                        </select>
                    </div>
                </div>

                <div className="col-md-3">
                    <label for=".." className="text-white">..</label>
                    <button type="submit" className="btn btn-primary btn-block" name="button">Filter</button>
                </div>
            </form>

            <div className="table-responsive-sm mt-4">
                                                    <div className="img-fluid w-100 text-center">
                      <img style={{opacity: "1", width: "100px"}} src="/assets/backend/images/file-search.svg" /><br/>
                      No data found                    </div>
                            </div>
        </div>
    </div>
</div>
</div>
  
	)
}


export const  TopNav = () => {
	return (
       	
<div className="navbar-custom topnav-navbar topnav-navbar-dark">
    <div className="container-fluid">

        
<a className="button-menu-mobile disable-btn">
    <div className="lines">
        <span></span>
        <span></span>
        <span></span>
    </div>
</a>
</div>
</div>
	)
}
export const SideBar = () =>{


	return(
	
<Fragment>


    

      <div className="left-side-menu left-side-menu-detached " style={{float:"left", height:"100vh"}}>
	<div className="leftbar-user">
		<a href="javascript: void(0);">
			<img src="#/uploads/user_image/placeholder.png" alt="user-image" height="42" className="rounded-circle shadow-sm" />
						<span className="leftbar-user-name">Instructor-02 Questence</span>
		</a>
	</div>

	<ul className="metismenu side-nav side-nav-light">

		<li className="side-nav-title side-nav-item">Navigation</li>
					<li className="side-nav-item">
				<a href="#/user/dashboard" className="side-nav-link ">
					<i className="dripicons-view-apps"></i>
					<span>Dashboard</span>
				</a>
			</li>
			<li className="side-nav-item">
				<a href="#/user/courses" className="side-nav-link ">
					<i className="dripicons-archive"></i>
					<span>Course manager</span>
				</a>
			</li>
			<li className="side-nav-item">
				<a href="#/user/sales_report" className="side-nav-link ">
					<i className="dripicons-to-do"></i>
					<span>Sales report</span>
				</a>
			</li>
			<li className="side-nav-item">
				<a href="#/user/payout_report" className="side-nav-link ">
					<i className="dripicons-shopping-bag"></i>
					<span>Payout report</span>
				</a>
			</li>
			<li className="side-nav-item">
				<a href="#/user/payout_settings" className="side-nav-link ">
					<i className="dripicons-gear"></i>
					<span>Payout settings</span>
				</a>
			</li>
				<li className="side-nav-item">
			<a href="#/home/my_messages" className="side-nav-link">
				<i className="dripicons-mail"></i>
				<span>Message</span>
			</a>
		</li>
		<li className="side-nav-item">
			<a href="#/user/manage_profile" className="side-nav-link">
				<i className="dripicons-user"></i>
				<span>Manage profile</span>
			</a>
		</li>
	</ul>

</div>






</Fragment>


   )
}


