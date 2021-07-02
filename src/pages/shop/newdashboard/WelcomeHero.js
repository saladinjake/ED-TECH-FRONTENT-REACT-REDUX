 

import React, { Fragment, useRef } from "react";
import { useEffect,useState} from "react";
import { Link } from "react-router-dom";

import questence from "assets/svgs/questence-logo.svg";
import { useHistory } from "react-router-dom";
import { ReactComponent as Dropdown } from "svgs/dropdown.svg";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logOut } from "actions/authActions";

import { CATEGORIES, PACES, AUTHLINKS } from "./data";
import skateboard from "./assets/images/big/skateboard.png"

 const WelcomeHero = ({
  cart: { cart },
  auth: { isAuthenticated, user },
  logOut,
  info,
  wishlists
}) =>{
    console.log(info)

		return(
<div>
                      
                        <div className="row">
                            <div className="col-sm-12">
                                <div className="btn-group pull-right m-t-15">
                                    <button style={{background:"#0253c8",color:"#fff"}} type="button" className="btn  dropdown-toggle waves-effect" data-toggle="dropdown" aria-expanded="false">Settings <span className="m-l-5"><i className="fa fa-cog"></i></span></button>
                                    <ul className="dropdown-menu drop-menu-right" role="menu">
                                    <li><a href="#" onClick={(e)=>{document.getElementById("rightSide").style.right="10px"}}>Upcoming courses</a></li>
                                        <li><Link to="./profile">Profile</Link></li>
                                        <li><Link to="./notifications">Account Settings</Link></li>
                                        <li><Link to="./cart">Cart</Link></li>
                                        <li className="divider"></li>
                                        <li><a href="#" onClick={(e)=>{e.preventDefault();window.location.reload()}}>Reload</a></li>
                                    </ul>
                                </div>

                                <h4 className="page-title">Dashboard </h4>
                                <p className="text-muted page-title-alt">Welcome back saladin !</p>
                            </div>
                        </div>


                        <div className="row">
							<div className="col-lg-8">
								<div className="card-box">
									<div className="bar-widget">
										<div className="table-box">
											<div className="table-detail">
												<div className="iconbox bg-info">
													<i className="icon-layers"></i>
												</div>
											</div>

											<div className="table-detail">
											   <h4 className="m-t-0 m-b-5"><b>Hello {`${user?.first_name} ${user?.last_name}` }</b></h4>
											   <p className="text-muted m-b-0 m-t-0">Welcome back to your questense dashboard.</p>
                         <p className="text-muted m-b-0 m-t-0">You can continue your learning path by exploring our pages</p>
                         <br/><br/>
                         <Link to="../mycourses" type="button"  style={{background:"#0253c8",color:"#fff"}} className="btn  dropdown-toggle waves-effect">Explore my courses</Link>
											</div>
                                            <div className="table-detail text-right">
                                                <img src={skateboard} className="thumbnail" style={{border:"none"}} />
                                            </div>

										</div>
									</div>
								</div>
							</div>

                            <div className="col-lg-4">
								<div className="card-box">
									<div className="bar-widget">
										<div className="table-box">
											<div className="table-detail">
												<div className="iconbox "  style={{background:"#0253c8"}}>
													<i className="icon-layers"></i>
												</div>
											</div>

											<div className="table-detail" style={{height:"250px"}}>
											   <h4 className="m-t-0 m-b-5 "><b>Upcoming course</b></h4>
											   <p style={{fontSize:"40px"}} className="text-muted m-b-0 m-t-0"><b>{info?.upcoming_courses}</b></p>
											   
											</div>

			
            
                      <div className="center " >
                       
                                
                      </div>

										</div>
									</div>
								</div>
							</div>

						</div>



						<div className="row">
                            <div className="col-lg-3 col-sm-6">
                                <div className="widget-panel widget-style-2 bg-white">
                                    <i className="md md-add text-brown"></i>
                                    <h2 className="m-0 text-dark counter font-600">{wishlists.wishlists !== undefined && `(${wishlists.wishlists?.length})` }</h2>
                                    <div className="text-muted m-t-5">Wishlists</div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-6"  >
                            <a href="#custom-modal" data-animation="fadein" data-plugin="custommodal" data-overlayspeed="200" data-overlaycolor="#36404a">
                                <div className="widget-panel widget-style-2 bg-white">
                                    <i className="md md-add-shopping-cart text-pink"></i>
                                    <h2 className="m-0 text-dark counter font-600">{cart !== undefined && `(${cart?.length})` }</h2>
                                    <div className="text-muted m-t-5">Cart</div>
                                </div>

                                </a>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                                <div className="widget-panel widget-style-2 bg-white">
                                    <i className="md md-store-mall-directory text-info"></i>
                                    <h2 className="m-0 text-dark counter font-600">{info?.all_subscriptions}</h2>
                                    <div className="text-muted m-t-5">Active Courses</div>
                                </div>
                            </div>
                            <div className="col-lg-3 col-sm-6">
                                <div className="widget-panel widget-style-2 bg-white">
                                    <i className="md md-account-child text-custom"></i>
                                    <h2 className="m-0 text-dark counter font-600">{info?.all_enrollments}</h2>
                                    <div className="text-muted m-t-5">Enrollments</div>
                                </div>
                            </div>
                        </div>



						




						
</div>
                        
                    )
}



WelcomeHero.propTypes = {
  auth: PropTypes.object.isRequired,
  logOut: PropTypes.func.isRequired,
  cart: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.cart,
  auth: state.auth,
});

export default connect(mapStateToProps, { logOut })(WelcomeHero);