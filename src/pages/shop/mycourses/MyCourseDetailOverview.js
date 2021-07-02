import React, { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { Container, Row,  Col, Tab, Nav} from "react-bootstrap";

// import Pagination from "./../../components/Pagination";
import { Styles } from "./styles/course.js";
import { getAuthProfile } from "services/learner.js";
import Loader from "components/Loader/Loader";
import toast from "react-hot-toast";


import "../newdashboard/assets/css/bootstrap.min.css";
import "../newdashboard/assets/css/core.css";
import "../newdashboard/assets/css/components.css";
import "../newdashboard/assets/css/icons.css";
import "../newdashboard/assets/css/pages.css";
import "../newdashboard/assets/css/responsive.css";
import "../newdashboard/tabnotifications.css"
import "./magnify.css"


import Sidebar from "../newdashboard/Sidebar";
// import NewHeader from "../newdashboard/NewHeader";

import $ from "jquery";
import jQueryBridget from "jquery-bridget"
import Isotope from "isotope-layout";
import magnificPopup from "magnific-popup"
// // make Isotope a jQuery plugin




import NavBar from "components/Navbar";
import Footer from "components/Footer";














// import React, { useEffect, useState, Fragment } from "react";
// import { Container, Row, Col, Tab, Nav } from "react-bootstrap";
// import { BreadcrumbBox } from "../../components/common/Breadcrumb";
// import { Styles } from "./styles/course.js";
import moment from "moment";
// import { Link } from "react-router-dom";

// import Loader from "components/Loader/Loader";
import { getCourse } from "services/course";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchCourses, addToCart } from "actions/cartActions";
// import { getAuthProfile } from "services/learner.js";
// import toast from "react-hot-toast";

const CourseDetails = ({
  match,
  auth: { isAuthenticated },
  cart: { cart },
  addToCart,
  fetchCourses,
}) => {
  const [coursedetails, setCourseDetails] = useState({});
  // eslint-disable-next-line
  const [status, setStatus] = useState("init");
  const [loading, setLoading] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const init = async () => {
    setStatus("loading");
    let courseId = parseInt(match.params.id);
    try {
      let response = await getCourse(courseId);
      setCourseDetails(response.data);
      setStatus("success");
    } catch (err) {
      setStatus("error");
    }
    setLoading(false);
  };

  useEffect(() => {
    (async function loadContent() {
      await fetchCourses();
    })();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    (async function CheckStatus() {
      if (isAuthenticated === true) {
        try {
          let res = await getAuthProfile();
          let enrolledCourses = res.data.data;
          let ids = enrolledCourses.map((course) => course.course.id);
          setEnrolledCourses([...ids]);
          console.log(ids);
        } catch (err) {
          toast.error(
            err?.response?.data?.message ||
              `Error occured fetching active courses`
          );
        }
        setLoading(false);
      }
    })();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    init();
    const courseButton = document.querySelectorAll(".course-button");
    courseButton.forEach((button) => {
      button.addEventListener("click", () => {
        button.classList.toggle("active");
        const content = button.nextElementSibling;

        if (button.classList.contains("active")) {
          content.className = "course-content show";
          content.style.maxHeight = content.scrollHeight + "px";
        } else {
          content.className = "course-content";
          content.style.maxHeight = "0";
        }
      });
    });
    // eslint-disable-next-line
  }, []);

  const checkCourseStatus = (courseId) => {
    var check = false;
    if (enrolledCourses.length > 0) {
      check = enrolledCourses.includes(courseId);
    }
    console.log(`cehck for ${courseId} is ${check}`);
    return check;
  };

  console.log(coursedetails)

  return (
    <div className="main-wrapper course-details-page">
      {/* Header 2 */}
      <NavBar />

      {/* Breadcroumb */}
      
      <Styles>
        {/* Course Details */}
        {loading ? (
          <Loader width="70" />
        ) : Object.entries(coursedetails).length !== 0 ? (
          <Fragment>
            <section className="course-details-area">

            <div className="content-page" class="col-md-12">
      
        <div className="content">
          <div className="container">
            <br/>  <br/>


             <div className="row">
              <div className="col-sm-12">
                                <div class="btn-group pull-right m-t-15 open">
                                <button type="button" class="btn  dropdown-toggle waves-effect" data-toggle="dropdown" aria-expanded="true" style={{background: "rgb(2, 83, 200)", color: "rgb(255, 255, 255)"}}>
                                Settings <span class="m-l-5"><i class="fa fa-cog"></i></span></button>
                                <ul class="dropdown-menu drop-menu-right" role="menu"><li>
                                <a href="#">Upcoming courses</a></li><li><a href="/profile">Profile</a></li>
                                <li><a href="/notifications">Account Settings</a></li><li><a href="/cart">Cart</a></li>
                                <li class="divider"></li><li><a href="#">Reload</a></li></ul>
                                </div>


                <h4 className="page-title">Course  Detail</h4>
                <ol className="breadcrumb" style={{display:"block"}}>
                  <li>
                    <a href="#">Courses</a>
                  </li>
                  <li>
                    <a href="#">Detail</a>
                  </li>
                  <li className="active">
                    Product Detail
                  </li>
                </ol>
              </div>
      </div>
              <br/>  <br/>

                 <div className="row">
                           <div className="col-xs-12">
                               <div className="card-box product-detail-box" style={{background:"#ebeff2"}}>
                                   <div className="row">
                                       <div className="col-sm-4 card-box" style={{background:"#fafafa"}}>
                                          
                                           <div className="sp-wrap">
                                               
                                               <img className="img-responsive card-box" src={`${
                            coursedetails && coursedetails.data
                              ? coursedetails.data.course_cover_image!="" ? coursedetails.data.course_cover_image  : "/assets/images/gallery/1.jpg"
                              : "/assets/images/gallery/1.jpg"
                          }`} />
                            <br/>
                           <div className="rating">
                                                    <ul className="list-inline">
                                                        <li><a className="fa fa-star" href=""></a></li>
                                                        <li><a className="fa fa-star" href=""></a></li>
                                                        <li><a className="fa fa-star" href=""></a></li>
                                                        <li><a className="fa fa-star" href=""></a></li>
                                                        <li><a className="fa fa-star-o" href=""></a></li>
                                                    </ul>
                                                </div>


                                                <p className="text-muted">{coursedetails && coursedetails.data
                                    ? coursedetails.data.course_description
                                    : ""}</p>

                                           </div>
                                       </div>

                                       <div className="col-sm-8 card-box">
                                           <div className="product-right-info">
                                               <h3><b> {coursedetails?.data?.course_name}</b></h3>
                                               <div className="rating">
                                                    <ul className="list-inline">
                                                        <li><a className="fa fa-star" href=""></a></li>
                                                        <li><a className="fa fa-star" href=""></a></li>
                                                        <li><a className="fa fa-star" href=""></a></li>
                                                        <li><a className="fa fa-star" href=""></a></li>
                                                        <li><a className="fa fa-star-o" href=""></a></li>
                                                    </ul>
                                                </div>

                                               <h2> <b>NGN{coursedetails?.data?.price}</b><small className="text-muted m-l-10"><del>NGN30,000</del> </small></h2>

                                               <h5 className="m-t-20"><b>Students Registered: </b> 2500 canditates . <span className="label label-default m-l-5">in counting</span></h5>

                                               <hr/>

                                               <h5 className="font-600">Course Description</h5>

                                               <p className="text-muted">{coursedetails && coursedetails.data
                                    ? coursedetails.data.course_description
                                    : ""}</p>

                                              

                                               <div className="m-t-30">
                                                   

                                                   
                                                     {isAuthenticated ? (
                              checkCourseStatus(coursedetails.data.id) ? (
                                ""
                              ) : (
                                <button
                                  type="button"
                                  onClick={addToCart.bind(
                                    this,
                                    coursedetails?.data?.id
                                  )}
                                  className="btn enroll-btn btn-danger waves-effect waves-light m-l-10"
                                >
                                  Enroll Course
                                </button>
                              )
                            ) : (
                              <button
                                type="button"
                                onClick={addToCart.bind(
                                  this,
                                  coursedetails?.data?.id
                                )}
                               
                                className="btn enroll-btn btn-danger waves-effect waves-light m-l-10"
                              >
                                Enroll Course
                              </button>
                            )}


                                                    <button type="button" className="btn btn-danger waves-effect waves-light m-l-10">
                                                     <span className="btn-label"><i className="fa fa-lock"></i>
                                                   </span>Start Course</button>

                                               </div>
                                                 <hr style={{background:"#ebeff2",height:"20px"}}/>



                      
                                           </div>

                                       </div>



                     
                                   </div>
                                

                                   <div className="">





  <div>
                <div className="row">
                  <div >

  </div>  </div>  </div>  </div>  </div>  </div>  </div>





                  <div class="col-md-12"> 
                                <ul class="nav nav-tabs tabs" style={{width: "100%"}}>
                                    <li class="active tab" style={{width: "25%"}}>
                                        <a href="#home-2" data-toggle="tab" aria-expanded="false" class="active"> 
                                            <span class="visible-xs"><i class="fa fa-home"></i></span> 
                                            <span class="hidden-xs">Course overview</span> 
                                        </a> 
                                    </li> 
                                    <li class="tab" style={{width: "25%"}}> 
                                        <a href="#profile-2" data-toggle="tab" aria-expanded="false"> 
                                            <span class="visible-xs"><i class="fa fa-user"></i></span> 
                                            <span class="hidden-xs">Curriculum</span> 
                                        </a> 
                                    </li> 
                                    <li class="tab" style={{width: "25%"}}> 
                                        <a href="#messages-2" data-toggle="tab" aria-expanded="true"> 
                                            <span class="visible-xs"><i class="fa fa-envelope-o"></i></span> 
                                            <span class="hidden-xs">Instructor</span> 
                                        </a> 
                                    </li> 
                                    <li class="tab" style={{width: "25%"}}> 
                                        <a href="#settings-2" data-toggle="tab" aria-expanded="false"> 
                                            <span class="visible-xs"><i class="fa fa-cog"></i></span> 
                                            <span class="hidden-xs">Reviews</span> 
                                        </a> 
                                    </li> 
                                <div class="indicator" style={{right: "393px", left: "0px"}}></div>
                          </ul> 
                                <div class="tab-content"> 
                                    <div class="tab-pane active card-box" id="home-2"> 
                                    <h3>Course Detail</h3><br/>
                                        <p>{coursedetails && coursedetails.data
                                    ? coursedetails.data.course_description
                                    : ""}</p> 


                                     <div className="course-feature">
                                            <h3>Course Summary</h3><br/>
                                            <hr />
                                            <p>{coursedetails?.data?.course_overview}</p>
                                                    

                                      </div>

                                      


                            <div className="course-learn">
                            <hr/>
                            <h3>Learning Outcome</h3><br/>
                            <p>
                              Lorem ipsum dolor sit, amet consectetur
                              adipisicing elit. Quae impedit eligendi
                              perspiciatis animi maxime ab minus corporis omnis
                              similique excepturi, quidem facere quisquam
                              aperiam neque dolorem saepe. Laboriosam, quam
                              aliquam odit modi harum libero culpa distinctio.
                            </p>
                            <ul className="list-unstyled">
                              <li>
                                <i className="fa fa-check"></i> Lorem ipsum
                                dolor sit amet, consectetur adipisicing elit.
                                Voluptatum amet quo eius saepe et quis
                                necessitatibus hic natus facere Quae impedit
                                eligendi perspiciatis animi maxime ab minus
                                corporis omnis similique excepturi.
                              </li>
                            </ul>
                          </div><br/>

                          <div className="course-share">
                            <h3>Share This Course</h3><br/>
                            <hr/>
                            <ul className="social list-unstyled list-inline">
                              <li className="list-inline-item">
                                <a href={process.env.PUBLIC_URL + "/"}>
                                  <i className="fa fa-2x fa-facebook-f"></i>
                                </a>
                              </li>
                              <li className="list-inline-item">
                                <a href={process.env.PUBLIC_URL + "/"}>
                                  <i className="fa fa-2x fa-twitter"></i>
                                </a>
                              </li>
                              <li className="list-inline-item">
                                <a href={process.env.PUBLIC_URL + "/"}>
                                  <i className="fa fa-2x fa-linkedin-in"></i>
                                </a>
                              </li>
                              <li className="list-inline-item">
                                <a href={process.env.PUBLIC_URL + "/"}>
                                  <i className="fa fa-2x fa-youtube"></i>
                                </a>
                              </li>
                              <li className="list-inline-item">
                                <a href={process.env.PUBLIC_URL + "/"}>
                                  <i className="fa fa-2x fa-dribbble"></i>
                                </a>
                              </li>
                            </ul>

<br/>
                            <div className="single-details-sidbar">
                     
                          <div className="course-details-feature">
                            <h5 className="title">Course Details</h5>

                            <div>
                              <ul className="list-unstyled feature-list">
                                <li>
                                  <i className="las la-calendar"></i> Start
                                  Date:
                                  <span>
                                    {moment(
                                      `${
                                        coursedetails && coursedetails.data
                                          ? coursedetails.data.start_date
                                          : ""
                                      }`
                                    ).format("ll")}
                                  </span>
                                </li>
                                <li>
                                  <i className="las la-clock"></i> Duration:
                                  <span>
                                    {coursedetails && coursedetails.data
                                      ? coursedetails.data.duration
                                      : ""}
                                  </span>
                                </li>
                                <li>
                                  <i className="las la-globe"></i> Language:
                                  <span>English</span>
                                </li>
                                <li>
                                  <i className="las la-sort-amount-up"></i>{" "}
                                  Skill Level: <span>Beginner</span>
                                </li>
                                <li>
                                  <i className="las la-graduation-cap"></i>{" "}
                                  Learning Partner:
                                  <span>Questence</span>
                                </li>
                                <li>
                                  <i className="las la-certificate"></i>
                                  Learning Style:{" "}
                                  <span>
                                    {coursedetails && coursedetails.data
                                      ? coursedetails.data.learning_style
                                      : ""}
                                  </span>
                                </li>
                                <li>
                                  <i className="las la-certificate"></i>
                                  Certification: <span>Yes</span>
                                </li>
                              </ul>
                            </div>



                            
                          </div>
                    </div>


                          </div>
                                    </div> 
                                    <div class="tab-pane" id="profile-2" style={{display: "none"}}>
                                        <p>Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt.Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.</p> 
                                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.</p> 
                                    </div> 
                                    <div class="tab-pane" id="messages-2" style={{display: "none"}}>
                                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.</p> 
                                            <p>Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt.Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.</p> 
                                    </div> 
                                    <div class="tab-pane" id="settings-2" style={{display: "none"}}>
                                        <p>Donec pede justo, fringilla vel, aliquet nec, vulputate eget, arcu. In enim justo, rhoncus ut, imperdiet a, venenatis vitae, justo. Nullam dictum felis eu pede mollis pretium. Integer tincidunt.Cras dapibus. Vivamus elementum semper nisi. Aenean vulputate eleifend tellus. Aenean leo ligula, porttitor eu, consequat vitae, eleifend ac, enim.</p>  
                                        <p>Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Donec quam felis, ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa quis enim.</p> 
                                    </div> 
                                </div> 
 </div>
      

                  <div class="col-md-2" style={{position:"absolute",top:"200px", right:"30px"}}>
                                      <div className="single-details-sidbar">
                                       
                                            <div className="course-details-feature">
                                              <h5 className="title">Course Details</h5>

                                              <div>
                                                <ul className="list-unstyled feature-list">
                                                  <li>
                                                    <i className="las la-calendar"></i> Start
                                                    Date:
                                                    <span>
                                                      {moment(
                                                        `${
                                                          coursedetails && coursedetails.data
                                                            ? coursedetails.data.start_date
                                                            : ""
                                                        }`
                                                      ).format("ll")}
                                                    </span>
                                                  </li>
                                                  <li>
                                                    <i className="las la-clock"></i> Duration:
                                                    <span>
                                                      {coursedetails && coursedetails.data
                                                        ? coursedetails.data.duration
                                                        : ""}
                                                    </span>
                                                  </li>
                                                  <li>
                                                    <i className="las la-globe"></i> Language:
                                                    <span>English</span>
                                                  </li>
                                                  <li>
                                                    <i className="las la-sort-amount-up"></i>{" "}
                                                    Skill Level: <span>Beginner</span>
                                                  </li>
                                                  <li>
                                                    <i className="las la-graduation-cap"></i>{" "}
                                                    Learning Partner:
                                                    <span>Questence</span>
                                                  </li>
                                                  <li>
                                                    <i className="las la-certificate"></i>
                                                    Learning Style:{" "}
                                                    <span>
                                                      {coursedetails && coursedetails.data
                                                        ? coursedetails.data.learning_style
                                                        : ""}
                                                    </span>
                                                  </li>
                                                  <li>
                                                    <i className="las la-certificate"></i>
                                                    Certification: <span>Yes</span>
                                                  </li>
                                                </ul>
                                              </div>
                  </div><br/>
                                              {isAuthenticated ? (
                                                checkCourseStatus(coursedetails.data.id) ? (
                                                  ""
                                                ) : (
                                                  <button
                                                    type="button"
                                                    onClick={addToCart.bind(
                                                      this,
                                                      coursedetails?.data?.id
                                                    )}
                                                    className="btn enroll-btn btn-danger waves-effect waves-light m-l-10"
                                                  >
                                                    Enroll Course
                                                  </button>
                                                )
                                              ) : (
                                                <button
                                                  type="button"
                                                  onClick={addToCart.bind(
                                                    this,
                                                    coursedetails?.data?.id
                                                  )}
                                                  className="btn enroll-btn btn-danger waves-effect waves-light m-l-10"
                                                >
                                                  Enroll Course
                                                </button>
                                              )}
                                            </div>
                                          </div>
      </div> </div> 
<Sidebar />
      </div>
              
            </section>
          </Fragment>
        ) : (
          <p>No Details for this course yet</p>
        )}
      </Styles>

   
    
    </div>
  );
};

CourseDetails.propTypes = {
  cart: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addToCart: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.cart,
  auth: state.auth,
});

export default connect(mapStateToProps, {
  addToCart,
  fetchCourses,
})(CourseDetails);


class MyCourseDetail extends React.Component{
	constructor(props){
		super(props)
	}

	componentDidMount(){

	}


	render(){
	  return(
	  	 
   
      <Footer />
    




	  )
	}
}


// export default MyCourseDetail;