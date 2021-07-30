import React from "react"
import { Col, Container, Row } from "react-bootstrap"
// import { Styles } from "./styles/sidebar.js"

const SideBar = () =>{
	return(
	

	<div id="menu-lateral">
	<h6 style={{margin:"10px", fontSize:"12px"}}>Navigation</h6>
				<ul id="menu-menu-lateral" class="menu" style={{fontFamily:"Open Sans"}}>			
					<li class="menu-item">
						<a href="#" style={{color:"#000"}}><i class="fa fa-home left iconMenu" aria-hidden='true' style={{margin:"10px"}} ></i> Dashboard</a></li>					
					<li class="menu-item menu-item-has-children">
						<a href="#" style={{color:"#000"}}><i class="fa fa-user left iconMenu" aria-hidden='true' style={{margin:"10px"}}></i>Course Manager</a>
						<i class="fa fa-caret right iconMenu"></i>
						<ul class="sub-menu">
							<li class="menu-item"><a href="#">Link</a></li>
							
						</ul>
					</li>					
					<li class="menu-item menu-item-has-children">
						<a href="#" style={{color:"#000"}}><i class="fa fa-user left iconMenu" aria-hidden='true' style={{margin:"10px"}}></i>Sales Report</a>
						<i class="fa fa-caret right iconMenu"></i>
						<ul class="sub-menu">
							<li class="menu-item"><a href="#">Link</a></li>
							
						</ul>
					</li>
					<li class="menu-item menu-item-has-children">
						<a href="#" style={{color:"#000"}}><i class="fa fa-user left iconMenu" aria-hidden='true' style={{margin:"10px"}}></i>Payout Reports</a>
						<i class="fa fa-caret right iconMenu"></i>
						<ul class="sub-menu">
							<li class="menu-item"><a href="#">Links</a></li>
							
						</ul>
					</li>

					<li class="menu-item menu-item-has-children">
						<a href="#" style={{color:"#000"}}><i class="fa fa-user left iconMenu" aria-hidden='true' style={{margin:"10px"}}></i>Payout Settings</a>
						<i class="fa fa-caret right iconMenu"></i>
						<ul class="sub-menu">
							<li class="menu-item"><a href="#">Links</a></li>
							
						</ul>
					</li>

					<li class="menu-item menu-item-has-children">
						<a href="#" style={{color:"#000"}}><i class="fa fa-user left iconMenu" aria-hidden='true' style={{margin:"10px"}}></i>Message</a>
						<i class="fa fa-caret right iconMenu"></i>
						<ul class="sub-menu">
							<li class="menu-item"><a href="#">Links</a></li>
							
						</ul>
					</li>					

					<li class="menu-item menu-item-has-children">
						<a href="#" style={{color:"#000"}}><i class="fa fa-user left iconMenu" aria-hidden='true' style={{margin:"10px"}}></i>Manage Profile</a>
						<i class="fa fa-caret right iconMenu"></i>
						<ul class="sub-menu">
							<li class="menu-item"><a href="#">Links</a></li>
							
						</ul>
					</li>
					
			</ul>
	</div>

   )
}


export default SideBar