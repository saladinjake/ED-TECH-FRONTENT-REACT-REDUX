import React, { useState } from "react";
import { Nav, Tab } from "react-bootstrap";
import TextCard from "./TextCard";
import InstructorCard from "./InstructorCard";
import toast from "react-hot-toast"

const CourseDetail = ({ courseId,
   isAuthenticated,
   outcome,
   prerequisite,
   overview,
   curricullum,
    price,instructors,
    enrollCourse,
     checkCourseStatus,
     courseName
  }) => {
  const [activeKey, setActiveKey] = useState("home");
  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="home">
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div className="mt-n-0-4 bg-teal pills-link col-md-8 px-3 py-2 bottom-left-radius-15 bottom-right-radius-15">
              <Nav
                variant="pills"
                defaultActiveKey="home"
                onSelect={(activeKey) => setActiveKey({ activeKey })}
              >
                <Nav.Item>
                  <Nav.Link eventKey="home">Overview</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="curriculum">Curriculum</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="instructors">Instructors</Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
            <Tab.Content>
              <Tab.Pane eventKey="home">
                <div className="py-4">
                  <div style={{ marginTop: "20px" }}>
                    <h5 className="text-light-green">Course Overview</h5>
                    <TextCard
                      content={overview}
                    />
                  </div>
                  <div style={{ marginTop: "20px" }}>
                    <h5 className="text-light-green">What you will learn</h5>
                    <TextCard
                      content={outcome}
                    />
                  </div>
                  <div style={{ marginTop: "20px" }}>
                    <h5 className="text-light-green">Course Prerequisites</h5>
                    <TextCard content={prerequisite} />
                  </div>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="curriculum">
                <div className="py-4">
                  <div style={{ marginTop: "20px" }}>
                    <h5 className="text-light-green">Course Curriculum</h5>
                    <TextCard
                      content={curricullum}
                    />
                  </div>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="instructors">
                <div className="row mt-3">

                 {instructors.length && instructors.map(instructor =>{
                    return (

                        <InstructorCard
                    authorName={instructor?.first_name+ ""+ instructor.last_name}
                    authorPosition={instructor?.instructor_profile?.brief_introduction}
                    authorCompany={instructor?.instructor_profile?.current_employer_designation}
                    authorImage={instructor?.image_url}
                  />
                      )


                 })}
                 
                 
                </div>
              </Tab.Pane>
            </Tab.Content>
          </div>
          <div className="col-md-4 col-sm-12">
            <h5 className="mt-n-0-4 bg-dark-grey float-end px-3 py-2 bottom-left-radius-15 bottom-right-radius-15">
              NGN {price}
            </h5>
            <div className="row mt-5">
              <div className="col-md-5 offset-md-7">
                <hr className="height-2px" />



                {isAuthenticated ? (
                                    checkCourseStatus(courseId) ? (
                                      ""
                                    ) : (
                                       <button onClick={(e)=>{enrollCourse(e,courseId,price,courseName)}} className="btn float-end border-radius-10 btn-solid-teal">
                  Log in to enroll
                </button>
                                        

                                        
                                   
                                    )
                                  ) : (
                                     <button onClick={(e)=>{toast.error("Authentication is required. Please Login to continue")}} className="btn float-end border-radius-10 btn-solid-teal">
                  Log in to enroll
                </button>
                                  )}
               
              </div>
            </div>
          </div>
        </div>
      </div>
    </Tab.Container>
  );
};

export default CourseDetail;
