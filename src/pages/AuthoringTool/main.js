import React, {useEffect, Fragment } from "react";
import { Container, Row, Col } from "react-bootstrap";



import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logOut } from "actions/authActions";
import { Link } from "react-router-dom";
import Sidebar from "./sidebar"
import $ from "jquery"

export const HeaderBox = ({ actionLink, linkTitle }) =>{
  return (
        <div className="" style={{ height: "100px",background:"#fff",padding:"10px",marginBottom:"20px" }}>
              <div
                className="bar-widget"
                style={{ margin: "auto", width: "100%" }}
              >
                <div className="table-box">
                  <div className="table-detail">
                    <h4
                      style={{
                        
                        color: "#000",
                        fontSize: "14px",
                        fontFamily: "Open Sans",
                        
                      }}
                      className="pull-left"
                    >
                      Dashboard
                    </h4>

                    {actionLink?.length > 0 ?  (<a style={{
                                                  background:"#fff",
                                                  borderRadius:"20px",
                                                  color:"#000",
                                                  padding:"5px",
                                                  width:"150px",
                                                  justifyContent:"right",
                                                  fontSize:"14px",
                                                  marginRight:"20px",
                                                  marginTop:"20px"


                                               }} className="btn btn-primary pull-right" href={process.env.PUBLIC_URL+ actionLink} >{linkTitle}</a>) : (<Fragment />)}
                    
                  </div>
                  
                </div>
              </div>
      </div>


  )
}

const FilterForm = () => {

  useEffect(() => {


// Events
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
  <div className="" style={{ height: "400px",background:"#fff",padding:"10px",marginBottom:"20px" }}>
              <div
                className="bar-widget"
                style={{ margin: "auto", width: "100%" }}
              >
                <div className="table-box">
                  <div className="table-detail">
                    <h4
                      style={{
                        
                        color: "#000",
                        fontSize: "14px",
                        fontFamily: "Open Sans",
                        
                      }}
                    >
                     Course Lists
                    </h4>

                    <br/><br/><br/>


                 <div className="padded-down">
                  <Container>
                  <Row className="row">
                   
                     <Col md="3">
                     <p> Categories</p>
                       <div class="dropdown-container">
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
                     </Col>

                    <Col md="3">
                     <p> Status</p>
                       <div class="dropdown-container">
                          <div class="dropdown-button noselect">
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

                     <Col md="3">
                      <p> Price</p>
                       <div class="dropdown-container">
                          <div class="dropdown-button noselect">
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

                     <Col md="3">
                     <div class="padded">
                        <button type="submit" className="btn btn-primary" value="Filter" style={{padding:"10px", width:"200px",color:"#fff",fontSize:"14px",marginTop:"30px"}} >Filter</button>
                        </div>
                     </Col>
                    
                    </Row>
                  </Container>
                </div>
                    
                  </div>

                  
                </div>
              </div>
      </div>
   )

}


const EventBoxes = () => {
       return (
         <Row className="row">
          <Col lg="3" sm="6">
            <div className="widget-panel widget-style-2 bg-white">
              <i className="fa fa-book" style={{textAlign:"center", fontSize:"15px",justifyContent:"center"}}></i>
              <h2
                className="m-0 text-dark-x counter font-600-x"
                style={{
                  fontFamily: "Open Sans",
                  color: "#000",
                  fontSize: "14px",
                }}
              >
                (0)
              </h2>
              <div
                className="text-muted-x m-t-5-x"
                style={{
                  fontFamily: "Open Sans",
                  color: "#000",
                  fontSize: "14px",
                }}
              >
                Number courses
              </div>
            </div>
          </Col>

          <Col lg="3" sm="6">
            <div className="widget-panel widget-style-2 bg-white">
              <Link to={process.env.PUBLIC_URL + `/learner/wishlists`}>
                <i className="fa fa-video " style={{textAlign:"center", fontSize:"15px",justifyContent:"center"}}></i>
                <h2
                  className="m-0 text-dark-x counter font-600-x"
                  style={{
                    fontFamily: "Open Sans",
                    color: "#000",
                    fontSize: "14px",
                  }}
                >
                  (0)
                </h2>
                <div
                  className="text-muted-x m-t-5-x"
                  style={{
                    fontFamily: "Open Sans",
                    color: "#000",
                    fontSize: "14px",
                  }}
                >
                  Number of lessons
                </div>
              </Link>
            </div>
          </Col>
          <Col lg="3" sm="6">
            <Link to={process.env.PUBLIC_URL + `/cart`}>
              <div className="widget-panel widget-style-2 bg-white">
                <i className="fa fa-menu" style={{textAlign:"center", fontSize:"15px",justifyContent:"center"}}></i>
                <h2
                  className="m-0 text-dark-x counter font-600-x"
                  style={{
                    fontFamily: "Open Sans",
                    color: "#000",
                    fontSize: "14px",
                  }}
                >
                  (0)
                </h2>
                <div
                  className="text-muted-x m-t-5-x"
                  style={{
                    fontFamily: "Open Sans",
                    color: "#000",
                    fontSize: "14px",
                  }}
                >
                  Number of enrollments
                </div>
              </div>
            </Link>
          </Col>
          <Col lg="3" sm="6">
            <div className="widget-panel widget-style-2 bg-white">
              <i className="fa fa-users" style={{textAlign:"center", fontSize:"15px",justifyContent:"center"}}></i>
              <h2
                className="m-0 text-dark-x counter font-600-x"
                style={{
                  fontFamily: "Open Sans",
                  color: "#000",
                  fontSize: "14px",
                }}
              >
                (0)
              </h2>
              <div
                className="text-muted-c m-t-5-x"
                style={{
                  fontFamily: "Open Sans",
                  color: "#000",
                  fontSize: "14px",
                }}
              >
                Enrollments
              </div>
            </div>
          </Col>
        </Row>
    )

}


const WelcomeBanner = ({
  cart: { cart },
  auth: { isAuthenticated, user },
  logOut,
  info,
  wishlists,
  activeCoursesTotal,
}) => {


  useEffect(() => {

  })
  return (
    <Fragment>
       <HeaderBox actionLink={"authoring/course-new"} linkTitle="+ Add new course" />

       <EventBoxes />
       <FilterForm />
       



    </Fragment>
  );
};




const Overview = ({ completeness }) => {
  return (
    <div>
      
     <div class="content-page">
                <div class="content">
                    <div class="row ">
    <div class="col-xl-12">
        <div class="card">
            <div class="card-body">
                <h4 class="page-title"> <i class="mdi mdi-apple-keyboard-command title_icon"></i> Courses                    <a href="http://demo4a.questence.org/user/course_form/add_course" class="btn btn-outline-primary btn-rounded alignToTitle"><i class="mdi mdi-plus"></i>Add new course</a>
                </h4>
            </div>
        </div> 
    </div>
</div>




<div class="row">
    <div class="col-md-12">
        <div class="card widget-inline">
            <div class="card-body p-0">
                <div class="row no-gutters">
                    <div class="col">
                        <a href="http://demo4a.questence.org/user/courses" class="text-secondary">
                            <div class="card shadow-none m-0">
                                <div class="card-body text-center">
                                    <i class="dripicons-link text-muted" style="font-size: 24px;"></i>
                                    <h3><span>
                                        0                                    </span></h3>
                                    <p class="text-muted font-15 mb-0">Active courses</p>
                                </div>
                            </div>
                        </a>
                    </div>

                    <div class="col">
                        <a href="http://demo4a.questence.org/user/courses" class="text-secondary">
                            <div class="card shadow-none m-0 border-left">
                                <div class="card-body text-center">
                                    <i class="dripicons-link-broken text-muted" style="font-size: 24px;"></i>
                                    <h3><span>
                                        0                                    </span></h3>
                                    <p class="text-muted font-15 mb-0">Pending courses</p>
                                </div>
                            </div>
                        </a>
                    </div>

                    <div class="col">
                        <a href="http://demo4a.questence.org/user/courses" class="text-secondary">
                            <div class="card shadow-none m-0 border-left">
                                <div class="card-body text-center">
                                    <i class="dripicons-bookmark text-muted" style="font-size: 24px;"></i>
                                    <h3><span>
                                        0                                    </span></h3>
                                    <p class="text-muted font-15 mb-0">Draft courses</p>
                                </div>
                            </div>
                        </a>
                    </div>

                    <div class="col">
                        <a href="http://demo4a.questence.org/user/courses" class="text-secondary">
                            <div class="card shadow-none m-0 border-left">
                                <div class="card-body text-center">
                                    <i class="dripicons-star text-muted" style="font-size: 24px;"></i>
                                    <h3><span>0</span></h3>
                                    <p class="text-muted font-15 mb-0">Free courses</p>
                                </div>
                            </div>
                        </a>
                    </div>

                    <div class="col">
                        <a href="http://demo4a.questence.org/user/courses" class="text-secondary">
                            <div class="card shadow-none m-0 border-left">
                                <div class="card-body text-center">
                                    <i class="dripicons-tags text-muted" style="font-size: 24px;"></i>
                                    <h3><span>0</span></h3>
                                    <p class="text-muted font-15 mb-0">Paid courses</p>
                                </div>
                            </div>
                        </a>
                    </div>

                </div> 
            </div>
        </div> 
    </div> 
</div>
<div class="row">
    <div class="col-md-12">
        <div class="card">
            <div class="card-body">
                <h4 class="mb-3 header-title">Course list</h4>
                <form class="row justify-content-center" action="http://demo4a.questence.org/user/courses" method="get">
                    
                    <div class="col-md-3">
                        <div class="form-group">
                            <label for="category_id">Categories</label>
                            <select class="form-control select2" data-toggle="select2" name="category_id" id="category_id">
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

                <div class="col-xl-3">
                    <div class="form-group">
                        <label for="status">Status</label>
                        <select class="form-control select2" data-toggle="select2" name="status" id = 'status'>
                            <option value="all" selected>All</option>
                            <option value="active" >Active</option>
                            <option value="pending" >Pending</option>
                        </select>
                    </div>
                </div>

               
                <div class="col-xl-3">
                    <div class="form-group">
                        <label for="price">Price</label>
                        <select class="form-control select2" data-toggle="select2" name="price" id = 'price'>
                            <option value="all"  selected>All</option>
                            <option value="free" >Free</option>
                            <option value="paid" >Paid</option>
                        </select>
                    </div>
                </div>

                <div class="col-xl-3">
                    <label for=".." class="text-white">..</label>
                    <button type="submit" class="btn btn-primary btn-block" name="button">Filter</button>
                </div>
            </form>

            <div class="table-responsive-sm mt-4">
                                                    <div class="img-fluid w-100 text-center">
                      <img style="opacity: 1; width: 100px;" src="http://demo4a.questence.org/assets/backend/images/file-search.svg" /><br/>
                      No data found                    </div>
                            </div>
        </div>
    </div>
</div>
</div>
                   
                </div>
            </div>
          
    </div>
  );
};

WelcomeBanner.propTypes = {
  auth: PropTypes.object.isRequired,
  logOut: PropTypes.func.isRequired,
  cart: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.cart,
  auth: state.auth,
});

export default connect(mapStateToProps, { logOut })(WelcomeBanner);
