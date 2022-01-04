import React, { useState,useEffect,Fragment } from "react";
import { Link } from "react-router-dom"
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import Datas from "../../core/data/institutions/info_data";

import { Container, Row, Col, Tab, Nav} from "react-bootstrap";
import TextCard from "../components/TextCard";
 import CourseHeader from "../components/CourseHeader";
// import toast from "react-hot-toast"
import CoursesWithSortWidget from "../components/ProgramsWithSortedWidget"


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
  const [givenName, setGivenName] = useState((match.params.name))

  const [editClicked, setEditClicked] = useState(false);



  const redressFooter = () => {
 
  };

  function removeTags(str) {
    if(str.match(/(<([^>]+)>)/ig))
      return str.replace( /(<([^>]+)>)/ig, '');
    else 
      return str
 }

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
     

      const categoryCourse = response?.courses.filter(data => data.title.toLowerCase() == givenName.toLowerCase())
      if(Array.isArray(categoryCourse) ){
        setCourseDetails({ ...response });
        setRelatedCourses([...categoryCourse[0].body])
      }
     

      const { body } = categoryCourse
      console.log(body)
     
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

  function closeModal(){
    document.querySelector(".md-modal").classList.remove("md-show")
  }

  

  console.log(coursedetails[1]);
  const [activeKey, setActiveKey] = useState("home");

  return (
    <Fragment>
  <NavBar />

<CourseHeader
            pageTitle= {coursedetails?.institution}
            subHeading={coursedetails?.intro}
            bgClass={"courses-banner-bg"}
            introVideoUrl={""}
            by={""}
            language={coursedetails?.language?.english}

          />


<div className="container mb-5">
          <div className="row">
            {/* <div className="col-md-3">
             x
            </div> */}
            <div className="col-md-12 pt-5">
              <>
                {loading == true ? (
                  <Loader width="100" />
                ) : (
                  <CoursesWithSortWidget relatedCourses={relatedCourses} 
                  institution={coursedetails?.institution}
                  hero_image={coursedetails?.hero_image}
                  />
                )}
              </>
            </div>
          </div>
        </div>


        {/*generic modal*/}

        <div class="md-modal md-effect-12">
        
    <div class="md-contentccc ">
    <div id="page">
    <div id="primary">
        <h1>Program name here</h1>
        <h2>Intro about the course</h2>
        <p>skills aquired here?</p>
        <ul>
        <li>faqs</li>
        <li>more</li>
        <li>detail</li>
        </ul>
        </div>
    <div id="secondary">
        <h4>Image of the organization</h4>
        <p>Information</p>
        <ol>
        <li>learning pace</li>
        <li>level</li>
        <li>aCTION BUTTONS HERE</li>
        <li>Yetc</li>
        </ol>
            </div>
</div>
<button class="md-close" onClick={(e) =>{
              closeModal(e)
            }}>Close</button>

        
    </div>

 
</div>

<div class="md-overlay"></div>


                  
                 

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