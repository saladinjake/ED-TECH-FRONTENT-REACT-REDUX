import React, {useState} from 'react'
import {  Row} from 'react-bootstrap';
// import { Styles } from './styles/course.js';
import './Tab.css'
// import {CourseDataList, CourseDataLists, CourseData} from './data/data'
// import CoursePrice from './CoursePrice.js';
// import MyCourses from './MyCourses.js';
import { Grid, List } from 'react-feather';
import {Link} from 'react-router-dom'
import "./scrollbars.css"
import CourseSidebar from '../formboxsection/components/CourseSidebar';







import { useEffect,  Fragment } from "react";
import CourseItemGrid from "../formboxsection/components/CourseItemsGrid";
// import { Stylesx } from "../formboxsection/styles/course.js";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchCourses } from "actions/coursesActions";

import Loader from "components/Loader/Loader";
import { useQuery } from "hooks/useQuery.js";



function dateToYMD(date) {
    var d = date.getDate();
    var m = date.getMonth() + 1; //Month from 0 to 11
    var y = date.getFullYear();
    return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
}

const MyLearningContainer = (props) => {

  const {
  course: { courses, courseLoading },
  fetchCourses,
  match,
} = props

  //for aside content forbox left
  const [search, setSearch] = useState("");
  const [filterAllCourses, setFilterAllCourses] = useState([]);
  const [queryVal, setQueryVal] = useState("");
  const query = useQuery();
  let routeQuery = query.get("filter");

  const [querySearchVal, setVal] = useState(query.get("search"));
  const [querySearchMethod, setMethod] = useState(query.get("method"));

  useEffect(() => {
    (async function loadContent() {
      await fetchCourses();

    })();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (routeQuery !== null && routeQuery.length > 0) {
      setVal(query.get("search"));
      setMethod(query.get("method"));
      setQueryVal(routeQuery);
    }
    // eslint-disable-next-line
  }, [routeQuery]);

  useEffect(() => {
    FilterAll();
    // eslint-disable-next-line
  }, [match, courses, search]);

  const FilterAll = async () => {
    let catId = match.params.id

    if(catId){
      
      if (catId > 0) {
        courses.length > 0 &&
          setFilterAllCourses(
            courses.filter((course) => {
              return parseInt(course.category_id) === catId;
            })
          );
      }

    }

     else {
      let searchVal;

      if (queryVal.length > 0) {
        searchVal = querySearchVal;
        let filtered = [];
        switch (querySearchMethod) {
          case "name":
            setFilterAllCourses(
              courses.length > 0 &&
                courses.filter((course) => {
                  return course.course_name
                    .toLowerCase()
                    .includes(query.get("search").toLowerCase());
                })
            );
            break;
          case "pace":
            if (query.get("pace") === "self") {
              filtered = courses.filter((course) => {
                return course.learning_style === "Self Paced";
              });
              setFilterAllCourses([...filtered]);
            } else {
              filtered = courses.filter((course) => {
                return course.learning_style === "Instructor Paced";
              });
              setFilterAllCourses([...filtered]);
            }
            break;
          case "fee":
            if (query.get("amount") === "free") {
              filtered = courses.filter((course) => {
                return parseInt(course.price) === parseInt(0);
              });
              setFilterAllCourses([...filtered]);
            } else {
              filtered = courses.filter((course) => {
                return parseInt(course.price) > parseInt(0);
              });
              setFilterAllCourses([...filtered]);
            }
            break;
          default:
            return true;
        }
        // setQueryVal("");
      } else {
        searchVal = search;
        setFilterAllCourses(
          courses.length > 0 &&
            courses.filter((course) => {
              return course.course_name
                .toLowerCase()
                .includes(searchVal.toLowerCase());
            })
        );
      }
    }
  };













    //for sidecontent main

    const [toggleGridList, setToggleGridList] = useState(true)
    const toggle = ()=>{
        setToggleGridList((previous)=> !previous)
    }
    const  filterSelection = (c) => {
      var x, i;
      x = document.getElementsByClassName("requestedFilter");
      if (c === "all") c = "";
     
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
        if (arr1.indexOf(arr2[i]) === -1) {
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
     
        <div className="container"  style={{height:"1700px",overflow:"scroll"}}>
        <br/><br/><br/>
                <div className="row">
                    <div className="col-md-10">
                        <div className="mylearning-title">
                            <h4>My Learning</h4>

                            <div className="btn-group pull-right m-t-15 open">
                                <button type="button" className="btn  dropdown-toggle waves-effect" data-toggle="dropdown" aria-expanded="true" style={{background: "rgb(2, 83, 200)", color: "rgb(255, 255, 255)"}}>
                                Settings <span className="m-l-5"><i className="fa fa-cog"></i></span></button>
                                <ul className="dropdown-menu drop-menu-right" role="menu"><li>
                                <a href="#">Upcoming courses</a></li><li><a href="/profile">Profile</a></li>
                                <li><a href="/notifications">Account Settings</a></li><li><a href="/cart">Cart</a></li>
                                <li className="divider"></li><li><a href="#">Reload</a></li></ul>
                                </div>


                <h4 className="page-title">Course  Detail</h4>
                <ol className="breadcrumb" style={{display:"block"}}>
                  <li>
                    <a href="#">Courses</a>
                  </li>
                  <li>
                    <a href="#">All courses</a>
                  </li>
                  <li className="active">
                    Dashboard
                  </li>
                </ol>
                        </div>
                    </div>



                </div>
                <div className="row">


                     <div className="col-md-2 col-sm-12">
                             <div className="filter-sidebar"> 
                                  <CourseSidebar
                                      setFilterAllCourses={setFilterAllCourses}
                                      setSearch={setSearch}
                                      search={search}
                                    />
                             </div>
                        </div>





                       <div className="col-md-10 col-sm-12 " > 
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
                                            

                                            courseLoading ? (
                                                <Loader width="70" />
                                              ) : courses.length > 0 ? (
                                                <Fragment>
                                                
                                                  <CourseItemGrid
                                                    courses={courses}
                                                    allCourses={filterAllCourses}
                                                  />

                                                </Fragment>
                                              ) : (
                                                <Row>
                                                  <h1>No courses yet</h1>
                                                </Row>
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
                                                                                                       if(course.status===1){
                                                                                                           status_state = "Active"
                                                                                                           activity = "alert-success"

                                                                                                       }else if (course.status===2){
                                                                                                          status_state = "Upcoming"
                                                                                                          activity = "alert-success"
                                                                                                       }else if(course.status===3){
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
                                                                                                 <td style={{backgroundColor:"#fff"}}>{course.category.name}</td>
                                                                                                 
                                                                                                
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
         
    )
}

// export default MyLearningContainer
MyLearningContainer.propTypes = {
  course: PropTypes.object.isRequired,
  fetchCourses: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  course: state.course,
});

export default connect(mapStateToProps, {
  fetchCourses,
})(MyLearningContainer);