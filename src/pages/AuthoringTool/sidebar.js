import React, { useEffect }from "react"
import { Col, Container, Row } from "react-bootstrap"
// import { Styles } from "./styles/sidebar.js"
import  $ from "jquery"
const SideBar = () =>{

	 function previewFile() {
	  var preview = document.querySelector('img');
	  var file    = document.querySelector('input[type=file]').files[0];
	  var reader  = new FileReader();

	  reader.addEventListener("load", function () {
	    preview.src = reader.result;
	  }, false);

	  if (file) {
	    reader.readAsDataURL(file);
	  }
	}

	useEffect(() =>{
		 $(function() {
            $('#profile-image1').on('click', function() {
                $('#profile-image-upload').click();
            });
        });

	})


	return(
	

	<div id="menu-lateral" style={{background:"#fff"}}>
	<h6 style={{margin:"10px", fontSize:"12px"}}>Navigation</h6>


	   
            <div >
                
                <div class="profile-pic">
                 
                        <img alt="User Pic" src="https://d30y9cdsu7xlg0.cloudfront.net/png/138926-200.png" id="profile-image1" height="200" />
                        <input id="profile-image-upload" class="hidden" type="file" onchange="previewFile()" />
                        <div style={{color:"#999"}} >  </div>
                        
                </div>

              </div>
              <br/><br/><br/>
      
    
				<ul id="menu-menu-lateral" class="menu" style={{fontFamily:"Open Sans"}}>			
					<li class="menu-item">
						<a href="#" style={{color:"#000"}}><i class="fa fa-home left iconMenu" aria-hidden='true' style={{margin:"10px"}} ></i> Dashboard</a></li>					
					<li class="menu-item menu-item-has-children">
						<a href="#" style={{color:"#000"}}><i class="fa fa-user left iconMenu" aria-hidden='true' style={{margin:"10px"}}></i>Course Manager</a>
						<i class="fa fa-caret right iconMenu"></i>
						{/*<ul class="sub-menu" style>
							<li class="menu-item"><a href="#">Link</a></li>
							
						</ul>*/}
					</li>					
					<li class="menu-item menu-item-has-children">
						<a href="#" style={{color:"#000"}}><i class="fa fa-user left iconMenu" aria-hidden='true' style={{margin:"10px"}}></i>Sales Report</a>
						<i class="fa fa-caret right iconMenu"></i>
						
					</li>
					<li class="menu-item menu-item-has-children">
						<a href="#" style={{color:"#000"}}><i class="fa fa-user left iconMenu" aria-hidden='true' style={{margin:"10px"}}></i>Payout Reports</a>
						<i class="fa fa-caret right iconMenu"></i>
						
					</li>

					<li class="menu-item menu-item-has-children">
						<a href="#" style={{color:"#000"}}><i class="fa fa-user left iconMenu" aria-hidden='true' style={{margin:"10px"}}></i>Payout Settings</a>
						<i class="fa fa-caret right iconMenu"></i>
						
					</li>

					<li class="menu-item menu-item-has-children">
						<a href="#" style={{color:"#000"}}><i class="fa fa-user left iconMenu" aria-hidden='true' style={{margin:"10px"}}></i>Message</a>
						<i class="fa fa-caret right iconMenu"></i>
						
					</li>					

					<li class="menu-item menu-item-has-children">
						<a href="#" style={{color:"#000"}}><i class="fa fa-user left iconMenu" aria-hidden='true' style={{margin:"10px"}}></i>Manage Profile</a>
						<i class="fa fa-caret right iconMenu"></i>
						
					</li>
					
			</ul>
	</div>

   )
}


export default SideBar