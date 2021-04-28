import React, { useEffect, useState, Fragment } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import { Styles } from "./styles/courseFilter.js";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchCourses } from "actions/coursesActions";

import Loader from "components/Loader/Loader";

const CourseFilter = ({ course: { courses, courseLoading }, fetchCourses }) => {
  const [allCourses, setAllCourses] = useState([]);

  useEffect(() => {
    (async function loadContent() {
      await fetchCourses();
    })();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    (async function loadCourses() {
      courses.length > 0 && setAllCourses([...courses]);
    })();
    // eslint-disable-next-line
  }, [courses]);

  useEffect(() => {
    const buttons = document.querySelector(".filter-btn-list").children;
    const items = document.querySelector(".filter-items").children;

    for (let i = 0; i < buttons.length; i++) {
      buttons[i].addEventListener("click", function (e) {
        for (let j = 0; j < buttons.length; j++) {
          buttons[j].classList.remove("active");
        }

        this.classList.add("active");
        const target = this.getAttribute("data-target");

        for (let k = 0; k < items.length; k++) {
          items[k].style.display = "none";

          if (items[k].getAttribute("data-id") === target) {
            items[k].style.display = "block";
          }

          if (target === "*") {
            items[k].style.display = "block";
          }
        }
      });
    }
  });

  const filterCourses = (e) => {
    console.log(parseInt(e.target.getAttribute("data-cat")));
    // // Filter Courses
    let catId = parseInt(e.target.getAttribute('data-cat'));
    if (catId > 0) {
      courses.length > 0 &&
        setAllCourses(
          courses.filter((course) => {
            return parseInt(course.category_id) === catId;
          })
        );
    } else {
      setAllCourses([...courses]);
    }
    // Filter Courses
  };

  return (
    <Styles>
      <section className="course-filter">
        <Container>
          <Row>
            <Col md="12">
              <div className="sec-title text-center">
                <h4>Our top courses by category</h4>
              </div>
            </Col>
            <Col md="12">
              <div className="filter-btns text-center">
                <ul className="filter-btn-list list-unstyled list inline">
                  <li
                    data-target="*"
                    data-cat="0"
                    className="active list-inline-item"
                    onClick={filterCourses}
                  >
                    All Top Courses
                  </li>
                  <li
                    data-target="business"
                    data-cat="2"
                    onClick={filterCourses}
                    className="list-inline-item"
                  >
                    Business
                  </li>
                  <li
                    data-target="technology"
                    data-cat="1"
                    onClick={filterCourses}
                    className="list-inline-item"
                  >
                    Technology
                  </li>
                  <li
                    data-target="engineering"
                    data-cat="8"
                    onClick={filterCourses}
                    className="list-inline-item"
                  >
                    Engineering
                  </li>
                </ul>
              </div>
              <Row className="filter-items">
                {courseLoading ? (
                  <Loader width="70" />
                ) : allCourses.length > 0 ? (
                  <Fragment>
                    {allCourses.map((data, i) => (
                       <Col lg="4" md="6" key={i}>
                <div className="course-item " style={{width:"200px",height:"200px", background:"#fafafa"}}>
                  <Link to={`${process.env.PUBLIC_URL}/courses/${data.id}`}>
                    <div
                      
                      style={{
                        height:"100px",
                        backgroundImage: data

                          ? `url(${data.course_cover_image})`
                          : "",
                             backgroundRepeat:"no-repeat",
    backgroundPosition: "center center",
    
    minHeight:"20%"
                      }}
                    >
                      
                      
                    </div>
                  </Link>
                  <div className="course-content">
                    <h6 style={{fontSize:"14px"}}>
                      <Link to={`${process.env.PUBLIC_URL}/courses/${data.id}`}>
                        {data.course_name.substring(0,20)+ "..."}
                      </Link>
                    </h6>
                  
                    <div className="course-face d-flex justify-content-between" >
                      <div className="duration">
                        <p>
                         Instructor
                        </p>
                      </div>
                     
                      <div className="student">
                        <p>
                          {"sakakas"}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Col>
                    ))}
                  </Fragment>
                ) : (
                  <Row>
                    <h1>No courses yet</h1>
                  </Row>
                )}
              </Row>
            </Col>
            <Col md="12" className="text-center">
              <div className="viewall-btn">
                <Link to={"/courses"}>View All Courses</Link>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </Styles>
  );
};

// export default CourseFilter;
CourseFilter.propTypes = {
  course: PropTypes.object.isRequired,
  fetchCourses: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  course: state.course,
});

export default connect(mapStateToProps, {
  fetchCourses,
})(CourseFilter);
