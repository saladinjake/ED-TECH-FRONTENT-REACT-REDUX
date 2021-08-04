import React, { Fragment } from "react"


import { SideBar, OverviewDash }  from "./sidebar"
import NavBar from "components/Navbar";
import { Styles } from "./styles/main.js"

const ProfileEditor = () => {
	return (
	<Fragment>
	<NavBar/><br/><br/><br/><br/>


    <div className="container">
        <div className="wrapper">
           <SideBar />



          <div class="content-page-x col-md-9" style={{float:"right"}}>
           <div class="content-x">
                    <ProfilTopMenu />
                    <ProfilePane />
                 
             </div>
          </div>


     </div>
    </div>
	
	</Fragment>
	)
}



const ProfilTopMenu = () => {
	return (
       <Fragment>
          <section class="page-header-area my-course-area" style={{height:"140px"}}>
    <div class="container">
        <div class="row">
            <div class="col">
                <h1 class="page-title print-hidden">User profile</h1>
                <ul class="print-hidden">
                  <li class=""><a href="#my_courses">Courses</a></li>

                  
                  <li class=""><a href="#my_wishlist">Wishlists</a></li>

                  <li class=""><a href="my_messages">Messages</a></li>

                  <li class=""><a href="#purchase_history">Purchase history</a></li>

                  <li class="active"><a href="#user_profile">Profile</a></li>
                </ul>
            </div>
        </div>
    </div>
</section>
       </Fragment>
	)
}


const ProfilePane = () =>  {
    return (
	<Fragment>
         <section class="user-dashboard-area">
    <div class="container">
        <div class="row">
            <div class="col">
                <div class="user-dashboard-box">
                    <div class="user-dashboard-sidebar">
                        <div class="user-box">
                            <img src="http://demo4a.questence.org/uploads/user_image/placeholder.png" alt="" class="img-fluid" />
                            <div class="name">
                                <div class="name">Instructor from Questence</div>
                            </div>
                        </div>
                        <div class="user-dashboard-menu">
                            <ul>
                                <li class="active"><a href="#user_profile">Profile</a></li>
                                <li><a href="#user_credentials">Account</a></li>
                                <li><a href="#user_photo">Photo</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="user-dashboard-content">
                        <div class="content-title-box">
                            <div class="title">Profile</div>
                            <div class="subtitle">Add information about yourself to share on your profile.</div>
                        </div>
                        <form action="#/update_basics" method="post">
                            <div class="content-box">
                                <div class="basic-group">
                                    <div class="form-group">
                                        <label for="FristName">Basics:</label>
                                        <input type="text" class="form-control" name="first_name" id="FristName" placeholder="First name" value="Instructor-02" />
                                    </div>
                                    <div class="form-group">
                                        <input type="text" class="form-control" name="last_name" placeholder="Last name" value="Questence" />
                                    </div>
                                    <div class="form-group">
                                        <label for="Biography">Biography:</label>
                                        <div id="mceu_2" class="mce-tinymce mce-container mce-panel" hidefocus="1" tabindex="-1" role="application" style={{ visibility: "hidden", borderWidth: "1px", width: "100%" }}><div id="mceu_2-body" class="mce-container-body mce-stack-layout"><div id="mceu_3" class="mce-top-part mce-container mce-stack-layout-item mce-first"><div id="mceu_3-body" class="mce-container-body"><div id="mceu_4" class="mce-toolbar-grp mce-container mce-panel mce-first mce-last" hidefocus="1" tabindex="-1" role="group"><div id="mceu_4-body" class="mce-container-body mce-stack-layout"><div id="mceu_5" class="mce-container mce-toolbar mce-stack-layout-item mce-first mce-last" role="toolbar"><div id="mceu_5-body" class="mce-container-body mce-flow-layout"><div id="mceu_6" class="mce-container mce-flow-layout-item mce-first mce-last mce-btn-group" role="group"><div id="mceu_6-body"><div id="mceu_0" class="mce-widget mce-btn mce-first" tabindex="-1" aria-pressed="false" role="button" aria-label="Bold"><button id="mceu_0-button" role="presentation" type="button" tabindex="-1"><i class="mce-ico mce-i-bold"></i></button></div><div id="mceu_1" class="mce-widget mce-btn mce-last" tabindex="-1" aria-pressed="false" role="button" aria-label="Italic"><button id="mceu_1-button" role="presentation" type="button" tabindex="-1"><i class="mce-ico mce-i-italic"></i></button></div></div></div></div></div></div></div></div></div><div id="mceu_7" class="mce-edit-area mce-container mce-panel mce-stack-layout-item mce-last" hidefocus="1" tabindex="-1" role="group" 
                                        style={{ borderWidth: "1px 0px 0px"}}><iframe id="Biography_ifr" frameborder="0" allowtransparency="true" title="Rich Text Area. Press ALT-F9 for menu. Press ALT-F10 for toolbar. Press ALT-0 for help" style={{ width: "100%", height: "100px", display: "block"}}></iframe></div></div></div>
                                        <textarea class="form-control author-biography-editor" name="biography" id="Biography" 
                                           aria-hidden="true"></textarea>
                                    </div>
                                </div>
                                <div class="link-group">
                                    <div class="form-group">
                                        <input type="text" class="form-control" maxlength="60" name="twitter_link" placeholder="Twitter link" value="" />
                                        <small class="form-text text-muted">Add your twitter link.</small>
                                    </div>
                                    <div class="form-group">
                                        <input type="text" class="form-control" maxlength="60" name="facebook_link" placeholder="Facebook link" value="" />
                                        <small class="form-text text-muted">Add your facebook link.</small>
                                    </div>
                                    <div class="form-group">
                                        <input type="text" class="form-control" maxlength="60" name="linkedin_link" placeholder="Linkedin link" value="" />
                                        <small class="form-text text-muted">Add your linkedin link.</small>
                                    </div>
                                </div>
                            </div>
                            <div class="content-update-box">
                                <button type="submit" class="btn">Save</button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
	</Fragment>
    )

}


export default ProfileEditor