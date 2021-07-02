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

     <div class="left side-menu" style={{background: "#fafafa", position:"fixed"}}>
                <div class="sidebar-inner slimscrollleft">
                   
                    <div id="sidebar-menu">
                        <ul>

                        	<li class="menu-title" style={{ color:"#fff"}}><img src={questence} /></li>

                            <li class="has_sub" style={{border: "1px solid #eee", borderLeft:"4px solid blue"}}>
                                <Link to={`${process.env.PUBLIC_URL + "/dashboard"}`} class="waves-effect" style={{color:"#555"}}><i class="ti-home"></i> <span> Dashboard </span> <span class="menu-arrow"></span></Link>
                                <ul class="list-unstyled">
                                   
                                </ul>
                            </li>

                            <li class="has_sub" style={{border: "1px solid #eee"}}>
                                <Link to={`${process.env.PUBLIC_URL + "/courses"}`} class="waves-effect" style={{color:"#555"}}><i class="fa fa-graduation-cap"></i> <span> All courses</span> <span class="menu-arrow"></span></Link>
                                <ul class="list-unstyled">
                                   
                                </ul>
                            </li>


                            <li class="has_sub" style={{border: "1px solid #eee"}}>
                                <Link to={`${process.env.PUBLIC_URL + "/mycourses"}`} class="waves-effect" style={{color:"#555"}}><i class="fa fa-user"></i> <span> My courses </span> <span class="menu-arrow"></span></Link>
                                <ul class="list-unstyled">
                                   
                                </ul>
                            </li>


                            <li class="has_sub">
                                <Link to={`${process.env.PUBLIC_URL + "/notifications"}`} class="waves-effect" style={{color:"#555"}} ><i style={{color:"lightblue"}} class="fa fa-bell"></i> <span> Notifications </span> <span class="menu-arrow"></span></Link>
                                <ul class="list-unstyled">
                                   
                                </ul>
                            </li>


                            <li class="has_sub">
                                <Link to="../learner/profile" class="waves-effect" style={{color:"#555"}}><i style={{color:"#555"}} class="fa fa-user"></i> <span>Account Profile</span> <span class="menu-arrow"></span></Link>
                                <ul class="list-unstyled">
                                   
                                </ul>
                            </li>


                             <li class="has_sub">
                                <Link to="../cart" class="waves-effect" style={{color:"#555"}}><i style={{color:"#555"}} class="fa fa-shopping-cart"></i> <span> Cart</span> <span class="menu-arrow"></span></Link>
                                <ul class="list-unstyled">
                                   
                                </ul>
                            </li>




                            <li class="has_sub">
                                <Link to="../notifications" class="waves-effect" style={{color:"red"}}><i style={{color:"red"}} class="fa fa-lock"></i> <span> Logout </span> <span class="menu-arrow"></span></Link>
                                <ul class="list-unstyled">
                                   
                                </ul>
                            </li>

                           

                            

                          

                            <li class="text-muted menu-title">Extra</li>


                        </ul>
                        <div class="clearfix"></div>
                    </div>
                    <div class="clearfix"></div>
                </div>
            </div>






              <div class="side-bar right-bar nicescroll" id="rightSide" style={{background: "#ebeff2"}}>
						<h4 class="text-center"><span style={{marginRight:"30px", padding:"5px"}} class="close fa  fa-cancel"  onClick={(e)=>{document.getElementById("rightSide").style.right="-400px"}}>close</span> Upcoming courses
						</h4>

						<div class="contact-list nicescroll" style={{background: "#ebeff2"}}>
							<ul class="list-group contacts-list" style={{background: "#ebeff2"}}>
								<li class="list-group-item">
									<a href="#">
										<div class="avatar">
											<img src="assets/images/users/avatar-1.jpg" alt="" />
										</div>
										<span class="name">Chadengle</span>
										<i class="fa fa-circle online">course name</i>
										<i class="fa fa-circle online">Instructor</i>
									</a>
									<span class="clearfix"></span>
								</li>
								
							</ul>
						</div>
				</div>


            </Fragment>
	)
}

export default Sidebar;