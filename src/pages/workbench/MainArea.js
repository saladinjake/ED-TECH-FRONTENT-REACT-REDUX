import React, { Fragment } from "react";
import Navbar from "components/Navbar";
import Footer from "components/Footer"


const MainArea = () => {
	let pageLeftContent = []
	return (
       <Fragment>
		   <div id="left">
			 This is the left window
		   </div>
		   <div id="right">
							This is the right window
			                <div class="demo courseset">
							  <div role="tabpanel">


									  <ul class="course nav nav-tabs nav-justified nav-tabs-dropdown" role="tablist">
									    <li role="presentation" class="active"><a href="#home" aria-controls="home" role="tab" data-toggle="tab">Lesson</a></li>
									    <li role="presentation"><a href="#profile" aria-controls="profile" role="tab" data-toggle="tab">Transcript</a></li>
									    <li role="presentation"><a href="#messages" aria-controls="messages" role="tab" data-toggle="tab">Live</a></li>
									    <li role="presentation"><a href="#settings" aria-controls="settings" role="tab" data-toggle="tab">Notifications</a></li>

									    <li role="presentation"><a href="#notifications" aria-controls="notifications" role="tab" data-toggle="tab">Forums</a></li>
									    <li role="presentation"><a href="#note" aria-controls="note" role="tab" data-toggle="tab">Note</a></li>
									  </ul>

									  <div class="tab-content">
									    <div role="tabpanel" class="tab-pane active" id="home">Lesson Content...</div>
									    <div role="tabpanel" class="tab-pane" id="profile">Transcript content...</div>
									    <div role="tabpanel" class="tab-pane" id="messages">Live lessons content...</div>
									    <div role="tabpanel" class="tab-pane" id="settings">Notification content...</div>

									    <div role="tabpanel" class="tab-pane" id="notifications">Forums content ...</div>
									    <div role="tabpanel" class="tab-pane" id="note">Notes content...</div>
									  </div>
							    </div>
							</div>


		             <div id="handle"></div>
		        </div>
          
       </Fragment>
    );
}

export default MainArea