  
import React, { useEffect, createContext, useContext, useState,Fragment ,useRef } from "react";

import toast from "react-hot-toast";
import Loader from "components/Loader/Loader";
import { Link } from "react-router-dom";
import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import "./topitem.css";

import "./tabnotifications.css"

import { uuid } from "services/dashboard";
import { getLearnerProfile } from "services/profile";
import { getNotifications } from "services/notification";

import notificationNotFound  from "./assets/images/big/notification.png"


 const NotificationEmpty = ({completeness}) =>{
		return (<div>
<div className="row">
                                <div className="col-sm-12">
                                
                                    <h4 className="page-title">Notifications</h4>
                                    <br/>
                                    
                                </div>
                            </div>
    
    
    
                            <div className="row">
    				              <div className="col-lg-8">
    				                <div className="card-box" style={{ height:"330px",  display: "flex",
    				  justifyContent: "center"}}>
    				                  <div className="bar-widget">
    				                    <div className="table-box">
    				                      
    				                      <div className="table-detail">
    
    				                        <div className="iconbox bg-info">
    				                          <img src={notificationNotFound} className="thumbnail" style={{border:"none"}} />
    
    				                        </div>
    
    				                        <div style={{marginTop:"100px",textAlign:"center"}}>
    
    				                        <h4 className="m-t-0 m-b-5"><b>Don't see anything yet?</b></h4>
    				                         <p className="text-muted m-b-0 m-t-0">Dont  worry, your notifications would pop up when it reaches you.</p>
    
    				                         </div>
    				                         
    				                         <br /><br />
    				                        
    				                      </div>
    				                                            
    
    				                    </div>
    				                  </div>
    				                </div>
    				              </div>
    
                              
    
    
                              <div className="col-lg-4">
                            <div className="card-box">
                                <h4 className="text-dark header-title m-t-0 m-b-30">User profile</h4>

                                <div className="widget-chart text-center" style={{marginLeft:"50px"}}>
                                      

                                      <div >
                                        <div class="percent-circle pc1" data-percent={completeness}><svg>
                                                <use class="percent-circle-inner" xlinkHref="#percent-circle-svg"></use>
                                            </svg></div>
                                      { completeness != 100 ? <p  className="text-dark m-t-0 m-b-30" style={{marginTop:"14px", marginRight:"7px"}}> complete your profile<span className="fa fa-arrow-right"> </span></p> :<p  className="text-dark m-t-0 m-b-30" style={{marginTop:"14px", marginRight:"7px"}}> Edit your profile<span className="fa fa-arrow-right"> </span></p> }
                                    </div><svg class="hidden">
                                        <circle id="percent-circle-svg" cx="50%" cy="50%" r="50%" stroke-alignment="inner"></circle>
                                    </svg>
                                    
                                </div>
                            </div>


    
                            </div>
   




         

</div>

			</div>)
}




const NotificationListItem = (props) =>{
  return  (
  <p>Hello</p>)
}




const initialState = {
  count1: 5,
  count2: 5,
};

const useValue = () => useState(initialState);



const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState([]);
  
  const count =  5;
  const increment = () => {
     initialState.count1+=5 ;
  };
  const decrement = () => {
    initialState.count1-=5 ;
  };

  

  useEffect(() => {
    (async function loadContent() {
      setLoading(true);
      try {
        let res = await getNotifications();
        setNotifications([...res.data.data]);
        let userProfile = await getLearnerProfile()
        setProfile(userProfile.data.data);
        console.log(userProfile.data.data)

       
      

       

       
       


      } catch (err) {
      	console.log(err , "this is the notification error")
        toast.error(`Error occured fetching notifications`);
      }
      setLoading(false);
    })();
  }, []);
  console.log(profile)
  
  return (
 
      <div className="main-wrapper product-page">
        <section className="product-area">
                    {loading ? (
                      <Loader width="70" />
                    ) : notifications.length > 0 ? (
                      <Fragment>
                
                               <div className="row">
				              <div className="col-lg-8">

                          <div class="table-responsive table-wrapper">
                      <table class="table table-borderless table-reveal" id="table1">
                      <thead>
                      <tr>
                         <th scope="col">Recent Notification</th>
                         <th scope="col">Time</th>
                      </tr>
                      </thead><tbody>



                          {notifications.slice(0,3).map((item, i) => {
                          
                            return (          
                              <tr id={ i+ "titanic-"+ new Date().toString()} key={ i+ "titanic-"+ new Date().toString()}>
                                 <td>{item.data.message}</td>
                              
                             
                                  <td><div class="alert alert-success">Active</div></td>
                             </tr>

                           

                            );
                          })}
                        

                          {/*<button type="button" className="btn btn-default pull-left" onClick={()=>{
                          	decrement()
      
                          	previous(initialState.count1)
                          	console.log(initialState.count1)
                          }}>Previous</button>

                           <button style={{marginLeft:"20px"}} className="btn btn-default " type="button" onClick={()=>{
                           	increment()
                          	next(initialState.count1,notifications.length)
                          	console.log(initialState.count1)
                          }}>Next</button>*/}


                        </tbody></table></div>


                     </div>



                      <div className="col-lg-4">
                            <div className="card-box">
                                <h4 className="text-dark header-title m-t-0 m-b-30">User profile</h4>

                                <div className="widget-chart text-center" style={{marginLeft:"50px"}}>
                                      

                                      <div >
                                        <div class="percent-circle pc1" data-percent={profile.completeness}><svg>
                                                <use class="percent-circle-inner" xlinkHref="#percent-circle-svg"></use>
                                            </svg></div>
                                        { profile.completeness != 100 ? <p  className="text-dark m-t-0 m-b-30" style={{marginTop:"14px", marginRight:"7px"}}> complete your profile<span className="fa fa-arrow-right"> </span></p> :<p  className="text-dark m-t-0 m-b-30" style={{marginTop:"14px", marginRight:"7px"}}> Edit your profile<span className="fa fa-arrow-right"> </span></p> }
                                    </div><svg class="hidden">
                                        <circle id="percent-circle-svg" cx="50%" cy="50%" r="50%" stroke-alignment="inner"></circle>
                                    </svg>
                                    
                                </div>
                            </div>

                        </div>


                        
                   </div>





                        {hideTrsAtIndex5(5)}

                      






                      </Fragment>

                    ) : (
                      <NotificationEmpty completeness={profile.completeness} />
                    )}
                  
        </section>

        {/* Footer 2 */}
      
      </div>

    
  );
};


  setTimeout(()=>{
    drawCharts()
  },9000)
  function drawCharts() {
    
    var circles = document.querySelectorAll('.percent-circle');

    circles.forEach(function(el) {
      //pull the percentage and turn it into a fraction
      var percent = el.dataset.percent / 100;
      //work out the circumference from the width
      var diameter = el.offsetWidth;
      var circumference = Math.ceil(diameter * Math.PI);
      //now we have the circumference, we know how long the ouline should be
      var stroke = Math.ceil(circumference * percent);
      //also workout how long the line doesn't exist for
      var diff = circumference - stroke;

      //now add the strok dash array for the first two values
      //TODO : could this all be done with css?
      el.querySelector('.percent-circle-inner').style.strokeDasharray = stroke +'px '+ diff +'px';
    });
  }
  
 


const hideTrsAtIndex5 =(limitAbove) =>{
	let trs = null;
	let shown =true;
	setTimeout(()=>{
		let trs = document.querySelectorAll('tbody tr');
		hide(trs,limitAbove)
	},3000)


  const hide = (trs,limit) => {
    trs.forEach((tr, index) => index >= limit ? tr.style.display = 'none' : '')
  
  }
	
}


const previous = (steps) =>{
 let trs = document.querySelectorAll('tbody tr');
 

 trs.forEach((tr, index) => {

 	if(index<=0){
      return  hideTrsAtIndex5(5);
 	}
 	
 	if( (index <= steps) && (index -5  <= (steps + 5) )){
 		 console.log(index, "new steps:", steps)
 		 tr.style.display = 'table-row'
 	}else{
 		tr.style.display = 'none'
 	}
 })
}

const next = (steps,total) =>{
	let trs = document.querySelectorAll('tbody tr');
	if(steps >= total){
     return toast.error(`You have reached the end of list`);
    }
	trs.forEach((tr, index) => {

    
 	
 	if( (index <= steps) && (index + 5 <= (steps +index) )){
 		 console.log(index, "new steps:", steps)
 		 tr.style.display = 'table-row'
 	}else{
 		tr.style.display = 'none'
 	}
 })
}
















  
export default Notifications;
