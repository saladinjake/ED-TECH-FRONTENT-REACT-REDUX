import React, {useEffect, Fragment } from "react";
import { Container, Row, Col } from "react-bootstrap";



import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logOut } from "actions/authActions";
import { Link } from "react-router-dom";
import Sidebar from "./sidebar"


const HeaderBox = ({ actionLink, linkTitle }) =>{
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

                    {actionLink?.length > 0 ?  (<a style={{background:"#fff",borderRadius:"20px", color:"#000"}} className="btn btn-primary pull-right" href={process.env.PUBLIC_URL+ actionLink} >{linkTitle}</a>) : (<Fragment />)}
                    
                  </div>
                  
                </div>
              </div>
      </div>


  )
}

const AdminRevenue = () => {
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
                      Admin Revenues
                    </h4>



                  <div class="graph-container">
                    <svg></svg>
                    <div class="tooltip"></div>
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
            <div className="widget-panel widget-style-2 bg-white" style={{width:"200px"}}>
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
              <div className="widget-panel widget-style-2 bg-white" style={{margin:"0px"}}>
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
       <HeaderBox actionLink={"authoring/add-course"} linkTitle="Create Course" />

       <EventBoxes />
       



    </Fragment>
  );
};




const Overview = ({ completeness }) => {
  return (
    <div>
      

      <div className="row">





        <div className="col-lg-4" >
          <div className=""   style={{ height: "450px",background:"#fff",padding:"10px",marginBottom:"20px" }}>
             <h4
                      style={{
                        
                        color: "#000",
                        fontSize: "14px",
                        fontFamily: "Open Sans",
                        
                      }}
                    >
                      Course Overview
                    </h4>

            <div
              className="widget-chart text-center"
              style={{ marginLeft: "30px", marginTop:"100px" }}
            >
              <div>
                <div className="percent-circle pc1" data-percent={completeness}>
                  <svg>
                    <use
                      className="percent-circle-inner"
                      xlinkHref="#percent-circle-svg"
                    ></use>
                  </svg>
                </div>
                <div style={{position:"absolute", bottom:"30px"}}>
                  <p class="pull-left">Active Courses</p>
                  <p class="pull-right">Pending Courses</p>
                </div>
              </div>
              <svg className="hidden">
                <circle
                  id="percent-circle-svg"
                  cx="50%"
                  cy="50%"
                  r="50%"
                  stroke-alignment="inner"
                ></circle>
              </svg>
            </div>
          </div>
        </div>





        <div className="col-lg-8"  style={{ height: "450px",background:"#fff",padding:"10px",marginBottom:"20px" }}>
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
                      Request Withdrawals
                    </h4>
                    
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
