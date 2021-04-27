import React , {Fragment } from "react"
import {Container, Row, Col } from "react-bootstrap"
import "./css/text.css";
import "./css/overview.css";
import "./css/icons.css"

// import notify from "./notification.png"
// import skateboard from  "./skateboard.png"

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logOut } from "actions/authActions";

const WelcomeBanner = ({
  cart: { cart },
  auth: { isAuthenticated, user },
  logOut,
  info,
  wishlists
}) =>{



	return (
<Fragment><br/><br/><br/><br/><br/>
		<Container >
<Row><br/><br/><br/>
    <Col lg="8">
        <div class="card-box" style={{height:"280px"}}>
            <div class="bar-widget" style={{ margin: "auto",width: "100%"}}>
                <div class="table-box" >
                    
                    <div class="table-detail">
                        <h4 class="m-t-0 m-b-5"><b>Hello  {`${user?.last_name}`}, </b></h4>
                        <p class="text-muted m-b-0 m-t-0">Welcome back to your questense dashboard.</p>
                        <p class="text-muted m-b-0 m-t-0">You can continue your learning path by exploring our pages</p>
                        <br />
                        <br />
                        <a type="button" class="btn dropdown-toggle waves-effect" href="/mycourses" style={{background: "rgb(2, 83, 200)", color: "rgb(255, 255, 255)"}}>Explore my courses</a>
                    </div>
                    <div class="table-detail text-right"><img alt="noimage" src={process.env.PUBLIC_URL + "/assets/images/skateboard.png"}  class="thumbnail" style={{border: "none"}} /></div>
                </div>
            </div>
        </div>
    </Col>
    <Col lg="4"     style={{ margin: "auto",width: "100%", height:"300px"}}>
        <div class="card-box">
            <div class="bar-widget">
                <div class="table-box">
                   
                    <div class="table-detail" style={{height: "250px",textAlign:"center"}}>
                         <div >
                            <div ><img alt="not-found" src={process.env.PUBLIC_URL + "/assets/images/book-open.png"} /></div>
                        </div>
                        <h6 class="m-t-0 "><b>Active courses</b></h6>
                        <p class="text-muted m-b-0 m-t-0" style={{fontSize: "40px"}}><b>{info?.all_subscriptions}</b></p>
                    </div>
                    <div class="center"></div>
                </div>
            </div>
        </div>
    </Col>
</Row>


 
 <Row class="row">
    <Col lg="3" sm="6">
        <div class="widget-panel widget-style-2 bg-white">
            <i class="md md-add text-info"></i>
            <h2 class="m-0 text-dark counter font-600">{info?.upcoming_courses}</h2>
            <div class="text-muted m-t-5">Upcoming Courses</div>
        </div>
    </Col>
    

    <Col lg="3" sm="6">
        <div class="widget-panel widget-style-2 bg-white">
            <i class="md md-store-mall-directory  text-brown"></i>
            <h2 class="m-0 text-dark counter font-600">{wishlists.wishlists !== undefined && `(${wishlists.wishlists?.length})` }</h2>
            <div class="text-muted m-t-5">Wishlists</div>
        </div>
    </Col>
    <Col lg="3" sm="6">
        <a href="#custom-modal" data-animation="fadein" data-plugin="custommodal" data-overlayspeed="200" data-overlaycolor="#36404a">
            <div class="widget-panel widget-style-2 bg-white">
                <i class="md md-add-shopping-cart text-pink"></i>
                <h2 class="m-0 text-dark counter font-600">{cart !== undefined && `(${cart?.length})` }</h2>
                <div class="text-muted m-t-5">Cart</div>
            </div>
        </a>
    </Col>
    <Col lg="3" sm="6">
        <div class="widget-panel widget-style-2 bg-white">
            <i class="md md-account-child text-custom"></i>
            <h2 class="m-0 text-dark counter font-600">{info?.all_enrollments}</h2>
            <div class="text-muted m-t-5">Enrollments</div>
        </div>
    </Col>
</Row>


</Container>

</Fragment>
)
}


 WelcomeBanner.propTypes = {
  auth: PropTypes.object.isRequired,
  logOut: PropTypes.func.isRequired,
  cart: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.cart,
  auth: state.auth,
});

export default connect(mapStateToProps, { logOut })( WelcomeBanner);