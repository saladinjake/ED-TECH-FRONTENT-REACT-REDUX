import React, { Fragment, useRef } from "react";
import { Link } from "react-router-dom";

import questence from "assets/svgs/questence-logo.svg";
import { useHistory } from "react-router-dom";
import { ReactComponent as Dropdown } from "svgs/dropdown.svg";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logOut } from "actions/authActions";


const Sidebar =  () =>{
	
	return (


		<Fragment>

     <div className="left side-menu" style={{background: "#fafafa", position:"fixed"}}>
                <div className="sidebar-inner slimscrollleft">
                   
                    <div id="sidebar-menu">
                        <ul>

                        	<li className="menu-title" style={{ color:"#fff"}}><img src={questence} /></li>

                            <li className="has_sub" style={{border: "1px solid #eee", borderLeft:"4px solid blue"}}>
                                <Link to={`${process.env.PUBLIC_URL + "/dashboard"}`} className="waves-effect" style={{color:"#555"}}><i className="ti-home"></i> <span> Dashboard </span> <span className="menu-arrow"></span></Link>
                                <ul className="list-unstyled">
                                   
                                </ul>
                            </li>

                            <li className="has_sub" style={{border: "1px solid #eee"}}>
                                <Link to={`${process.env.PUBLIC_URL + "/courses"}`} className="waves-effect" style={{color:"#555"}}><i className="fa fa-graduation-cap"></i> <span> All courses</span> <span className="menu-arrow"></span></Link>
                                <ul className="list-unstyled">
                                   
                                </ul>
                            </li>


                            <li className="has_sub" style={{border: "1px solid #eee"}}>
                                <Link to={`${process.env.PUBLIC_URL + "/mycourses"}`} className="waves-effect" style={{color:"#555"}}><i className="fa fa-user"></i> <span> My courses </span> <span className="menu-arrow"></span></Link>
                                <ul className="list-unstyled">
                                   
                                </ul>
                            </li>


                            <li className="has_sub">
                                <Link to={`${process.env.PUBLIC_URL + "/notifications"}`} className="waves-effect" style={{color:"#555"}} ><i style={{color:"lightblue"}} className="fa fa-bell"></i> <span> Notifications </span> <span className="menu-arrow"></span></Link>
                                <ul className="list-unstyled">
                                   
                                </ul>
                            </li>


                            <li className="has_sub">
                                <Link to={`${process.env.PUBLIC_URL  + "/profile" }`} className="waves-effect" style={{color:"#555"}}><i style={{color:"#555"}} className="fa fa-user"></i> <span>Account Profile</span> <span className="menu-arrow"></span></Link>
                                <ul className="list-unstyled">
                                   
                                </ul>
                            </li>


                             <li className="has_sub">
                                <Link tto={`${process.env.PUBLIC_URL  + "/cart"  }`} className="waves-effect" style={{color:"#555"}}><i style={{color:"#555"}} className="fa fa-shopping-cart"></i> <span> Cart</span> <span className="menu-arrow"></span></Link>
                                <ul className="list-unstyled">
                                   
                                </ul>
                            </li>




                            <li className="has_sub">
                                <Link to="#" className="waves-effect" style={{color:"red"}}><i style={{color:"red"}} className="fa fa-lock"></i> <span> Logout </span> <span className="menu-arrow"></span></Link>
                                <ul className="list-unstyled">
                                   
                                </ul>
                            </li>

                           

                            

                          

                            <li className="text-muted menu-title">Extra</li>


                        </ul>
                        <div className="clearfix"></div>
                    </div>
                    <div className="clearfix"></div>
                </div>
            </div>






              <div className="side-bar right-bar nicescroll" id="rightSide" style={{background: "#ebeff2"}}>
						<h4 className="text-center"><span style={{marginRight:"30px", padding:"5px"}} className="close fa  fa-cancel"  onClick={(e)=>{document.getElementById("rightSide").style.right="-400px"}}>close</span> Upcoming courses
						</h4>

						<div className="contact-list nicescroll" style={{background: "#ebeff2"}}>
							<ul className="list-group contacts-list" style={{background: "#ebeff2"}}>
								<li className="list-group-item">
									<a href="#">
										<div className="avatar">
											<img src="assets/images/users/avatar-1.jpg" alt="" />
										</div>
										<span className="name">Chadengle</span>
										<i className="fa fa-circle online">course name</i>
										<i className="fa fa-circle online">Instructor</i>
									</a>
									<span className="clearfix"></span>
								</li>
								
							</ul>
						</div>
				</div>


            </Fragment>
	)
}

export default Sidebar;