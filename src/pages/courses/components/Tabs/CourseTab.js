import React,{useState} from 'react'
import CoursePrice from '../CoursePrice';
import './CourseTab.css'
import { Container, Row, Col, Tab, Nav} from 'react-bootstrap';
import { Styles } from '../../styles/course';
import {CourseDataList, CourseDataLists, CourseData} from './data'

import MyCourses from './MyCourses.js';

const CourseTab = () => {

    const [toggleGridList, setToggleGridList] = useState(false)

    const toggle = ()=>{
        setToggleGridList((previous)=> !previous)
    }
    return (
        <div className="mylearning">
            <div className="mylearning-title">
                <h3>My Learning</h3>
            </div>
            <div className="mylearning-content">
                <div className="mylearning-sidebar">
                <CoursePrice filterType='Sort By:' filtername='Sort Fields' /><br /> 
                <CoursePrice  filterType='Filter By:' filtername='Category'/>
                <CoursePrice filtername='Program'/>
                <CoursePrice  filtername='Learning Partner'/>
                <CoursePrice  filtername='Ownership'/>
                </div>
                <div className="mylearning-contents">
                   <Styles>
                   <div className="course-tab-list" >
                                      
                                      <Tab.Container defaultActiveKey="overview">
                                      
                                      <div className="container-fluid">
                                       <div className="row">
                                           
                                           <div className="">
                                              <Nav  >
                                               <Nav.Item>
                                                      <Nav.Link eventKey="overview">All Courses</Nav.Link>
                                                  </Nav.Item>
                                                  <Nav.Item>
                                                      <Nav.Link eventKey="activecourses">Active Courses</Nav.Link>
                                                  </Nav.Item>
                                                  <Nav.Item>
                                                      <Nav.Link eventKey="upcomingcourse">Upcoming Courses</Nav.Link>
                                                  </Nav.Item>
                                                  <Nav.Item>
                                                      <Nav.Link eventKey="completedcourse">Completed Courses</Nav.Link>
                                                  </Nav.Item>
                                                  <Nav.Item>
                                                      <Nav.Link eventKey="wishlist">Wishlist</Nav.Link>
                                                  </Nav.Item>
                                                  <Nav.Item>
                                                      <Nav.Link eventKey="accomplishment">Accomplishments</Nav.Link>
                                                  </Nav.Item>
                                              </Nav>
                                              
                                           </div>
                                      </div>
                                      </div>
                                               
                                       <Tab.Content>
                                         
                                             
                                    
                                               
                                           <Tab.Pane eventKey="overview" className="overview-tab">
                                           <div className="d-flex justify-content-lg-end" >
                                                <div className="toggle-icon" onClick={toggle}>
                                                     <i className={toggleGridList ? ' fas fa-border-all': 'fas fa-list'}></i>{ toggleGridList ? " View as Grid": " View as List"}</div>   
                                             </div>
                                             {toggleGridList ? <div className="table-responsive">

                                        <table className="table table-borderless ">
                                           <thead>
                                               <tr>
                                               <th scope="col">Course Code</th>
                                               <th scope="col">Course Name</th>
                                               <th scope="col">Instructor Name</th>
                                               <th scope="col">Learning Partner</th>
                                               <th scope="col">Category</th>
                                               <th scope="col">Program</th>
                                               <th scope="col">Ownership</th>
                                               <th scope="col">Start Date</th>
                                               <th scope="col">Status</th>


                                               </tr>
                                           </thead>
                                           <tbody>
                                               {CourseDataList.map((course, i)=>(
                                                   <tr key={i}>
                                                   <td >{course.coursecode}</td>
                                                   <td><strong>{course.coursename}</strong></td>
                                                   <td>{course.instructorname}</td>
                                                   <td>{course.Learningpartner}</td>
                                                   <td>{course.startdate}</td>
                                                   <td>{course.startdate}</td>
                                                   <td>{course.ownership}</td>
                                                   <td>
                                                   {course.startdate}
                                                    </td>
                                                  
                                                  <td><div className="alert alert-success">{course.status}</div></td>
                                                  </tr> 

                                               ))}
                                               
                                               
                                           </tbody>
                                           </table>
                                                
                                              </div>: <>
                                         
                                              <MyCourses />
                                             </>}
                                          

                                           </Tab.Pane>
                                            <Tab.Pane eventKey="activecourses" className="overview-tab">
                                            <div className="d-flex justify-content-lg-end" >
                                                <div className="toggle-icon"  onClick={toggle}> 
                                                 <i className={toggleGridList ? '  fas fa-list': 'fas fa-border-all'}></i>
                                                { toggleGridList ? " View as List ": " View as Grid"}</div>
                                                
                                             </div>
                                             {toggleGridList ? <>
                                                 <MyCourses />
                                             </> : <div>
                                             
                                            <table className="table table-borderless responsive">
                                           <thead>
                                               <tr>
                                               <th scope="col">Course Code</th>
                                               <th scope="col">Course Name</th>
                                               <th scope="col">Instructor Name</th>
                                               <th scope="col">Learning Partner</th>
                                               <th scope="col">Category</th>
                                               <th scope="col">Program</th>
                                               <th scope="col">Ownership</th>
                                               <th scope="col">Start Date</th>
                                               <th scope="col">Status</th>


                                               </tr>
                                           </thead>
                                           <tbody>
                                               {CourseDataList.map((course, i)=>(
                                                   <tr key={i}>
                                                   <td >{course.coursecode}</td>
                                                   <td><strong>{course.coursename}</strong></td>
                                                   <td>{course.instructorname}</td>
                                                   <td>{course.Learningpartner}</td>
                                                   <td>{course.startdate}</td>
                                                   <td>{course.startdate}</td>
                                                   <td>{course.ownership}</td>
                                                   <td>
                                                   {course.startdate}
                                                    </td>
                                                  
                                                  <td><div className="alert alert-success">{course.status}</div></td>
                                                  </tr> 

                                               ))}
                                               
                                               
                                           </tbody>
                                           </table> 
                                             </div>} 
                                          
                                           

                                           </Tab.Pane>
                                           <Tab.Pane eventKey="upcomingcourse" className="curriculum-tab">
                                           <div className="d-flex justify-content-lg-end" >
                                                <div className="toggle-icon"> <i className="fas fa-border-all"></i> View as Grid</div>
                                                
                                             </div>
                                               
                                           <table className="table table-borderless responsive">
                                           <thead>
                                               <tr>
                                               <th scope="col">Course Code</th>
                                               <th scope="col">Course Name</th>
                                               <th scope="col">Instructor Name</th>
                                               <th scope="col">Learning Partner</th>
                                               <th scope="col">Category</th>
                                               <th scope="col">Program</th>
                                               <th scope="col">Ownership</th>
                                               <th scope="col">Start Date</th>
                                               <th scope="col">Status</th>
                                               </tr>
                                           </thead>
                                           <tbody>
                                               {CourseDataLists.map((course, i)=>(
                                                   <tr key={i}>
                                                   <td >{course.coursecode}</td>
                                                   <td><strong>{course.coursename}</strong></td>
                                                   <td>{course.instructorname}</td>
                                                   <td>{course.Learningpartner}</td>
                                                   <td>{course.startdate}</td>
                                                   <td>{course.startdate}</td>
                                                   <td>{course.ownership}</td>
                                                   <td>
                                                   {course.startdate}
                                                    </td>
                                                  
                                                  <td><div className=" alert alert-warning">{course.status}</div></td>
                                                  </tr> 

                                               ))}
                                               
                                               
                                           </tbody>
                                           </table>

                                           </Tab.Pane>
                                           <Tab.Pane eventKey="completedcourse" className="instructor-tab">
                                           <div className="d-flex justify-content-lg-end" >
                                                <div className="toggle-icon"> <i className="fas fa-border-all"></i> View as Grid</div>
                                                
                                             </div>
                                           <table className="table table-borderless responsive">
                                           <thead>
                                               <tr>
                                               <th scope="col">Course Code</th>
                                               <th scope="col">Course Name</th>
                                               <th scope="col">Instructor Name</th>
                                               <th scope="col">Learning Partner</th>
                                               <th scope="col">Category</th>
                                               <th scope="col">Program</th>
                                               <th scope="col">Ownership</th>
                                               <th scope="col">Start Date</th>
                                               <th scope="col">Status</th>


                                               </tr>
                                           </thead>
                                           <tbody>
                                               {CourseData.map((course, i)=>(
                                                   <tr key={i}>
                                                   <td >{course.coursecode}</td>
                                                   <td><strong>{course.coursename}</strong></td>
                                                   <td>{course.instructorname}</td>
                                                   <td>{course.Learningpartner}</td>
                                                   <td>{course.startdate}</td>
                                                   <td>{course.startdate}</td>
                                                   <td>{course.ownership}</td>
                                                   <td>
                                                   {course.startdate}
                                                    </td>
                                                  
                                                  <td><div className=" alert alert-secondary">{course.status}</div></td>
                                                  </tr> 

                                               ))}
                                               
                                               
                                           </tbody>
                                           </table>

                                              
                                              
                                              
                                           </Tab.Pane>
                                           <Tab.Pane eventKey="wishlist" className="review-tab">
                                           <div className="d-flex justify-content-lg-end" >
                                                <div className="toggle-icon"> <i className="fas fa-border-all"></i> View as Grid</div>
                                                
                                             </div>
                                           <table className="table table-borderless responsive">
                                           <thead>
                                               <tr>
                                               <th scope="col">Course Code</th>
                                               <th scope="col">Course Name</th>
                                               <th scope="col">Instructor Name</th>
                                               <th scope="col">Learning Partner</th>
                                               <th scope="col">Category</th>
                                               <th scope="col">Program</th>
                                               <th scope="col">Ownership</th>
                                               <th scope="col">Start Date</th>
                                               <th scope="col">Prize</th>


                                               </tr>
                                           </thead>
                                           <tbody>
                                               {CourseDataList.map((course, i)=>(
                                                   <tr key={i}>
                                                   <td >{course.coursecode}</td>
                                                   <td><strong>{course.coursename}</strong></td>
                                                   <td>{course.instructorname}</td>
                                                   <td>{course.Learningpartner}</td>
                                                   <td>{course.startdate}</td>
                                                   <td>{course.startdate}</td>
                                                   <td>{course.ownership}</td>
                                                   <td>
                                                   {course.startdate}
                                                    </td>
                                                  
                                                  <td><div className="text-success">N{course.price}</div></td>
                                                  </tr> 

                                               ))}
                                               
                                               
                                           </tbody>
                                           </table>
                                           </Tab.Pane>
                                           <Tab.Pane eventKey="accomplishment" className="review-tab">
                                               <Row>
                                                   <Col md="12">
                                                      
                                                       
                                                   </Col>
                                               </Row>
                                           </Tab.Pane>

                                              
                                      </Tab.Content>
                                  </Tab.Container>
                                         
                              </div>
                         
                   </Styles>
                </div>

            </div>
        </div>
    )
}

export default CourseTab
