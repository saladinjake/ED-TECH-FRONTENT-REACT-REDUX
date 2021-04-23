import React, { useEffect, useState, Fragment } from "react";
import { Container, Row, Col } from "react-bootstrap";
import NavBar from "components/Navbar";
import { PageTitle } from "../../components/common/PageTitle";
import CourseSidebar from "./components/CourseSidebar";
import CourseItemGrid from "./components/CourseItemsGrid";
import Footer from "../../components/Footer";
import { Styles } from "./styles/course.js";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchCourses } from "actions/coursesActions";

import Loader from "components/Loader/Loader";
import { useQuery } from "hooks/useQuery.js";


import { Link } from "react-router-dom";


import { getAuthProfile } from "services/learner.js";

import toast from "react-hot-toast";


import "../shop/newdashboard/assets/css/bootstrap.min.css";
import "../shop/newdashboard/assets/css/core.css";
import "../shop/newdashboard/assets/css/components.css";
import "../shop/newdashboard/assets/css/icons.css";
import "../shop/newdashboard/assets/css/pages.css";
import "../shop/newdashboard/assets/css/responsive.css";


import Sidebar from "../shop/newdashboard/Sidebar";
// import NewHeader from "../newdashboard/NewHeader";
import Navbar from "components/Navbar"  //old
import $ from "jquery";
import jQueryBridget from "jquery-bridget"
import Isotope from "isotope-layout";
import magnificPopup from "magnific-popup"
// make Isotope a jQuery plugin
jQueryBridget( 'isotope', Isotope, $ );

const CourseGrid = ({
  course: { courses, courseLoading },
  fetchCourses,
  match,
}) => {
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
    let catId = parseInt(match.params.id);

    if (catId > 0) {
      courses.length > 0 &&
        setFilterAllCourses(
          courses.filter((course) => {
            return parseInt(course.category_id) === catId;
          })
        );
    } else {
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

  return (
<Fragment >
     <div className="content-page ">
        
        <div className="content ">
          <div className="container ">
            <br/>  <br/>

            
    <div className="" style={{height:"2000px"}}>
      <Navbar />
      {/*<PageTitle />*/}
       <br/><br/>
   
        {/* Course Grid */}
        <section className="course-grid-area ">
          
             <div class="col-md-3">
                <CourseSidebar
                  setFilterAllCourses={setFilterAllCourses}
                  setSearch={setSearch}
                  search={search}
                />
             </div>
              <div class="col-md-9">
                <div className="course-items">
               
                    {courseLoading ? (
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
                    )}
            
                </div>
            </div>
       
        </section>
 


      </div>
 </div>

            </div>

      {/* Footer 2 */}
      <Footer />
        <footer class="footer text-right">
                    © 2021. All rights reserved.
                </footer>  
        

    </div>
 <Sidebar />
    </Fragment>
  );
};

// export default CourseGrid;
CourseGrid.propTypes = {
  course: PropTypes.object.isRequired,
  fetchCourses: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  course: state.course,
});

export default connect(mapStateToProps, {
  fetchCourses,
})(CourseGrid);
