import React, {useState} from 'react'


import './Tab.css'
import {CourseDataList, CourseDataLists, CourseData} from './data/data'
import CoursePrice from './CoursePrice.js';
import MyCourses from './MyCourses.js';
import { Grid, List } from 'react-feather';
import {Link} from 'react-router-dom'
import "./scrollbars.css"
import CourseSidebar from '../formboxsection/components/CourseSidebar';




import "./assets/css/bootstrap.min.css";
import "./assets/css/core.css";
import "./assets/css/components.css";
import "./assets/css/icons.css";
import "./assets/css/pages.css";
import "./assets/css/responsive.css";


// import "./topitem.css"



import Navbar from "components/Navbar";



import Footer from "components/Footer"


import Sidebar from "../../newdashboard/Sidebar"


import { useEffect,  Fragment } from "react";
import MyOwnCourses from "../formboxsection/components/MyOwnCourses";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { getAuthProfile } from "services/learner.js";

import Loader from "components/Loader/Loader";
import { useQuery } from "hooks/useQuery.js";

// import Loader from "components/Loader/Loader";
import toast from "react-hot-toast";

function dateToYMD(date) {
    var d = date.getDate();
    var m = date.getMonth() + 1; //Month from 0 to 11
    var y = date.getFullYear();
    return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
}

const MycoursesWithTabs = (props) => {

 

   const [courses, setActiveCourses] = useState([]);
   const [filterAllCourses, setFilterAllCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAuthProfile();
  }, []);

  const fetchAuthProfile = async () => {
    try {
      let res = await getAuthProfile();
      setActiveCourses([...res.data.data]);
    } catch (err) {
      toast.error(
        err?.response?.data?.message || `Error occured fetching active courses`
      );
    }
    setLoading(false);
  };


  







    //for sidecontent main

    const [toggleGridList, setToggleGridList] = useState(true)
    const toggle = ()=>{
        setToggleGridList((previous)=> !previous)
    }
    const  filterSelection = (c) => {
      var x, i;
      x = document.getElementsByClassName("requestedFilter");
      if (c == "all") c = "";
     
      for (i = 0; i < x.length; i++) {
        RemoveClass(x[i], "show");
        if (x[i].className.indexOf(c) > -1) AddClass(x[i], "show");
      }
    }
    // Show filtered elements
    function AddClass(element, name) {
      var i, arr1, arr2;
      arr1 = element.className.split(" ");
      arr2 = name.split(" ");
      for (i = 0; i < arr2.length; i++) {
        if (arr1.indexOf(arr2[i]) == -1) {
          element.className += " " + arr2[i];
        }
      }
    }
    // Hide elements that are not selected
    function RemoveClass(element, name) {
      var i, arr1, arr2;
      arr1 = element.className.split(" ");
      arr2 = name.split(" ");
      for (i = 0; i < arr2.length; i++) {
        while (arr1.indexOf(arr2[i]) > -1) {
          arr1.splice(arr1.indexOf(arr2[i]), 1);
        }
      }
      element.className = arr1.join(" ");
    }
    
    setTimeout(()=>{
       filterSelection("all")
    },4000)

    console.log(courses)
    
    return (

      <Fragment>
       <Navbar />
      <div className="wrapper">{/* the transformer for different ui design*/}

      <div className="content-page ">
              
                <div className="content"  style={{height:"1200px"}}>
                    <div className="container">
       {/* <NewHeader />*/}
                      
                       
                        
     
        <div >
        <br/><br/><br/><br/><br/><br/>
                <div className="row">
                    <div className="col-md-12">
                        <div className="mylearning-title">
                            <h4>My Learning</h4>
                        </div>
                    </div>
                </div>
                <div className="row">






                       <div className="col-md-12 " > 
                             {toggleGridList ?  <Fragment /> : <ul className="nav nav-tabs tabs"  id="nav-tabs">
                                    <li className="active tab" style={{width: "25%"}} onClick={()=>{ filterSelection('all') }}>
                                        <a href="#home-2" data-toggle="tab" aria-expanded="false" className="active" > 
                                            <span className="visible-xs"><i className="fa fa-home"></i></span> 
                                            <span className="hidden-xs">All</span> 
                                        </a> 
                                    </li> 
                                    <li className="tab" style={{width: "25%"}} onClick={()=>{ filterSelection('Active') }}> 
                                        <a href="#profile-2" data-toggle="tab" aria-expanded="false"> 
                                            <span className="visible-xs"><i className="fa fa-user"></i></span> 
                                            <span className="hidden-xs">Active courses</span> 
                                        </a> 
                                    </li> 
                                    <li className="tab" style={{width: "25%"}} onClick={()=>{ filterSelection('Upcoming') }}> 
                                        <a href="#messages-2" data-toggle="tab" aria-expanded="true"> 
                                            <span className="visible-xs"><i className="fa fa-envelope-o"></i></span> 
                                            <span className="hidden-xs">Upcoming courses</span> 
                                        </a> 
                                    </li> 
                                    <li className="tab" style={{width: "25%"}} onClick={()=>{ filterSelection('Completed') }}> 
                                        <a href="#settings-2" data-toggle="tab" aria-expanded="false"> 
                                            <span className="visible-xs"><i className="fa fa-cog"></i></span> 
                                             <span className="hidden-xs">Completed</span> 
                                        </a> 
                                    </li> 
                                     <li className="active " style={{width: "25%"}} onClick={()=>{ filterSelection('Wishlist') }}>
                                        <a href="#home-21" data-toggle="tab" aria-expanded="false" > 
                                            <span className="visible-xs"><i className="fa fa-home"></i></span> 
                                             <span className="hidden-xs">Wishlist</span> 
                                        </a> 
                                    </li> 
                                    <li className="tab" style={{width: "25%"}} onClick={()=>{ filterSelection('Acomplishments') }}> 
                                        <a href="#profile-21" data-toggle="tab" aria-expanded="false"> 
                                            <span className="visible-xs"><i className="fa fa-user"></i></span> 
                                            <span className="hidden-xs">Acomplishments</span> 
                                        </a> 
                                    </li> 
                                  
                                <div className="indicator" indicator style={{right: "375px", left: "0px"}}  ></div>
                            </ul> 
          }


                            <div className="toggleBtn">
                                        <div className="d-flex justify-content-end" >
                                            <div className="toggle-icon" onClick={toggle}>
                                                    {toggleGridList ? <Grid  size={15} />: <List  size={15} />} { toggleGridList ? " View as List": " View as Grid"}
                                            </div>   
                                        </div>
                                </div>
                                 {toggleGridList ?
                                            

                                            loading ? (
                                                <Loader width="70" />
                                              ) : courses.length > 0 ? (
                                                <Fragment>
                                                
                                                  <MyOwnCourses
                                                    courses={courses}
                                                  
                                                  />

                                                </Fragment>
                                              ) : (
                                                <Fragment>
                                                  <h1>No courses yet</h1>
                                                </Fragment>
                                              )

                                            :

                                            <div className="table-responsive table-wrapper" >
         
                                                 <table className="table table-borderless responsive " >



                                                 <thead className="nav nav-tabs tabs"  >

                                    <tr>
                                    <th className=""  style={{ width:"100px"}}>
                                        <a href="#home-2" data-toggle="tab" aria-expanded="false" className="active" > 
                                            <span className="visible-xs"><i className="fa fa-home"></i></span> 
                                            <span className="hidden-xs">Course Code</span> 
                                        </a> 
                                    </th> 
                                    <th className="" style={{ width:"130px"}} > 
                                        <a href="#profile-2" data-toggle="tab" aria-expanded="false"> 
                                            <span className="visible-xs"><i className="fa fa-user"></i></span> 
                                            <span className="hidden-xs">Course Name</span> 
                                        </a> 
                                    </th> 
                                    <th className=""  style={{ width:"2px"}}> 
                                        <a href="#messages-2" data-toggle="tab" aria-expanded="true"> 
                                            <span className="visible-xs"><i className="fa fa-envelope-o"></i></span> 
                                            <span className="hidden-xs">Instructor Name</span> 
                                        </a> 
                                    </th> 
                                    <th className=""  style={{ width:"100px"}}> 
                                        <a href="#settings-2" data-toggle="tab" aria-expanded="false"> 
                                            <span className="visible-xs"><i className="fa fa-cog"></i></span> 
                                             <span className="hidden-xs">Start Date</span> 
                                        </a> 
                                    </th> 
                                     <th className=" "  >
                                        <a href="#home-21" data-toggle="tab" aria-expanded="false" > 
                                            <span className="visible-xs"><i className="fa fa-home"></i></span> 
                                             <span className="hidden-xs">Duration</span> 
                                        </a> 
                                    </th> 
                                    <th className=""  > 
                                        <a href="#profile-21" data-toggle="tab" aria-expanded="false"> 
                                            <span className="visible-xs"><i className="fa fa-user"></i></span> 
                                            <span className="hidden-xs">Learning Style</span> 
                                        </a> 
                                    </th> 

                                    <th className=""  > 
                                        <a href="#profile-21" data-toggle="tab" aria-expanded="false"> 
                                            <span className="visible-xs"><i className="fa fa-user"></i></span> 
                                            <span className="hidden-xs">Price</span> 
                                        </a> 
                                    </th> 

                                    <th className=""  > 
                                        <a href="#profile-21" data-toggle="tab" aria-expanded="false"> 
                                            <span className="visible-xs"><i className="fa fa-user"></i></span> 
                                            <span className="hidden-xs">Category </span> 
                                        </a> 
                                    </th> 

                                    <th className=""  > 
                                        <a href="#profile-21" data-toggle="tab" aria-expanded="false"> 
                                            <span className="visible-xs"><i className="fa fa-user"></i></span> 
                                            <span className="hidden-xs">Status</span> 
                                        </a> 
                                    </th> 
                                  
                                <div className="indicator" indicator style={{right: "375px", left: "0px"}}  ></div>
                            </tr> 

                              </thead>                                                      <br/> 
                                                                                         <tbody  style={{backgroundColor:"#ebeff2",padding:"10px"}}>
                                                                                        
                                                                                             {courses.map((course, i)=>  { 
                                                                                                      let status_state = "Active"
                                                                                                      let activity = "alert-info"
                                                                                                       if(course.status==1){
                                                                                                           status_state = "Active"
                                                                                                           activity = "alert-success"

                                                                                                       }else if (course.status==2){
                                                                                                          status_state = "Upcoming"
                                                                                                          activity = "alert-success"
                                                                                                       }else if(course.status==3){
                                                                                                          status_state = "Completed"
                                                                                                          activity = "alert-warning"
                                                                                                       }else{
                                                                                                          status_state = "Accomplished"
                                                                                                       }

                                                                                                

                                                                                               return ( 

                                                                                                 <tr  style={{backgroundColor:"#ebeff2"}} key={i} className={status_state + " requestedFilter"}>
                                                                                                 <td style={{backgroundColor:"#fff", color:"#333", width:"100px"}} >{course?.id}</td>
                                                                                                 <td  style={{backgroundColor:"#fff",  width:"300px"}} ><Link to="/"><strong>{course.course_name}</strong></Link></td>
                                                                                                 <td style={{backgroundColor:"#fff" , width:"100px"}}>{"fill this field"}</td>
                                                                                                 
                                                                                                 <td style={{backgroundColor:"#fff"}}>{dateToYMD(new Date(course.start_date))}</td>
                                                                                                 <td style={{backgroundColor:"#fff"}}>{course.learning_style || "Unlimited"}</td>
                                                                                                 <td style={{backgroundColor:"#fff"}}>{course.price}</td>
                                                                                                 <td style={{backgroundColor:"#fff"}}>{course.course_name}</td>
                                                                                                 
                                                                                                
                                                                                                <td style={{backgroundColor:"#fff"}}><div className={"alert " + activity }>{status_state}</div></td>
                                                                                                </tr> 

                                                                                             )   })}
                                                                                             
                                                                                             
                                                                                         </tbody>
                                                                                         </table> 
                                                 </div> 

                                  }
                             

                         </div> 






              
             
                 </div>


                  
         

</div>


  </div>








  

       </div>    

          </div> 

<Footer />
        <footer class="footer text-right">
                    © 2021. All rights reserved.
                </footer>  
        
 
                    
</div>
<Sidebar />

</Fragment>
         
    )
}

// export default MyLearningContainer
MycoursesWithTabs.propTypes = {
  
};

const mapStateToProps = (state) => ({
  
});

export default connect(mapStateToProps, {
  //fetchCourses,
})(MycoursesWithTabs);