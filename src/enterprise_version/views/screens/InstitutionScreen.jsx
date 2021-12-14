import React, { useState,useEffect,Fragment } from "react";
import { Link } from "react-router-dom"
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Datas from "../../core/data/institutions/info_data";

import { Container, Row, Col, Tab, Nav} from "react-bootstrap";
import TextCard from "../components/TextCard";
 import CourseHeader from "../components/CourseHeader";
// import toast from "react-hot-toast"


import Loader from "../components/Loader";

const CourseDetails = ({
  history,
  match,
 
}) => {
  // console.log(cart)

  // console.log(history.location.pathname)

  const lastLocation = history.location.pathname;

  const [coursedetails, setCourseDetails] = useState({});
  // eslint-disable-next-line
  const [status, setStatus] = useState("init");
  const [loading, setLoading] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [relatedCourses, setRelatedCourses] = useState([]);
  const [givenId, setGivenId] = useState(parseInt(match.params.id))


  const [editClicked, setEditClicked] = useState(false);

  useEffect(() => {
    
  });

  const redressFooter = () => {
 
  };

  const getInstitution = async (id) => {
    const result = await Datas.institutions.find(
      (institution) => parseInt(institution.id) === id
    );
    return result;
  };

  const init = async () => {
    setStatus("loading");
    let courseId = parseInt(match.params.id);
    try {
      let response = await getInstitution(courseId);
      setCourseDetails({ ...response });

      setStatus("success");
    } catch (err) {
      setStatus("error");
    }
    setLoading(false);
  };

  useEffect(() => {
    init();
  

    // eslint-disable-next-line
  }, []);

  function YouTubeGetID(url) {
    url = url.split(/(vi\/|v=|\/v\/|youtu\.be\/|\/embed\/)/);
    return url[2] !== undefined ? url[2].split(/[^0-9a-z_\-]/i)[0] : url[0];
  }

  useEffect(() => {});

  

  console.log(coursedetails);
  const [activeKey, setActiveKey] = useState("home");
  return (
    <Fragment>
  <NavBar />

<CourseHeader
            pageTitle= {coursedetails?.fullname }
            subHeading={coursedetails?.intro}
            bgClass={"courses-banner-bg"}
            introVideoUrl={""}
            by={""}
            language={coursedetails?.language?.english}

          />




<Tab.Container id="left-tabs-example" defaultActiveKey="home">
      <div className="container">
        <div className="row">
          <div className="col-md-12">
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
                  <Nav.Link eventKey="curriculum">Courses</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="instructors">Instructors</Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
            <Tab.Content>
              <Tab.Pane eventKey="home">
                <div className="py-4">
                  <div >
                    <h5 className="text-light-green">Course Overview</h5>
                    {coursedetails?.about_program?.map(
                                              (paragraph) => {
                                                return (
                                                  <p
                                                    style={{
                                                      color: "#000",
                                                      fontSize: "14px",
                                                    }}
                                                  >
                                                    {paragraph}
                                                  </p>
                                                );
                                              }
                                            )}
                  </div>
                  
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="curriculum">
                <div className="py-4">
                  <div>
                    <h5 className="text-light-green">Courses </h5>

                    <div >
                    
                        
                    
                                
                  </div>
                  
                   
                  </div>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="instructors">
                <div className="row mt-3">

                <div style={{ marginTop: "20px" }}>
                    <h5 className="text-light-green">Instructors</h5>
             
                  </div>
                 
                 
                </div>
              </Tab.Pane>
            </Tab.Content>
          </div>
          
        </div>
      </div>
    </Tab.Container>

    <div className="my-auto border-top bg-green">
        <div className="container">
          <Footer />
        </div>
      </div>
      
     
    </Fragment>
  );
};









// export default CourseDetail;
export default CourseDetails;