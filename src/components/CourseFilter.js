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
                      <Col lg="4" md="6" key={i} data-id={data.id}>
                        <div className="course-item">
                          <Link
                            to={`${process.env.PUBLIC_URL}/courses/${data.id}`}
                          >
                            <div
                              className="course-image"
                              style={{
                                backgroundImage: `url(${data.course_cover_image})`,
                              }}
                            >
                              <div className="author-img d-flex"></div>
                            </div>
                          </Link>
                          <div className="course-content">
                            <h6 className="heading">
                              <Link
                                to={`${process.env.PUBLIC_URL}/courses/${data.id}`}
                              >
                                {data.course_name}
                              </Link>
                            </h6>
                            <p className="author">
                              A Course by{" "} {`${data.instructor?.user?.first_name} ${data.instructor?.user?.last_name} `}{" "}
                            </p>
                            <p className="desc">{data.course_description}</p>
                            <div className="course-face d-flex justify-content-between">
                              <div className="duration">
                                <p>
                                  <svg
                                    width="16"
                                    height="16"
                                    viewBox="0 0 16 16"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                  >
                                    <path
                                      d="M15.9583 6.13748C15.8536 5.81349 15.5662 5.58339 15.2262 5.55275L10.6082 5.13342L8.78208 0.859266C8.64744 0.546026 8.34079 0.343262 8.00008 0.343262C7.65937 0.343262 7.35273 0.546026 7.21808 0.859999L5.39198 5.13342L0.773211 5.55275C0.433847 5.58412 0.147219 5.81349 0.0418692 6.13748C-0.0634802 6.46146 0.0338123 6.81682 0.290533 7.04082L3.78122 10.1022L2.7519 14.6364C2.67658 14.9697 2.80598 15.3143 3.0826 15.5143C3.23128 15.6217 3.40524 15.6764 3.58066 15.6764C3.7319 15.6764 3.88193 15.6356 4.01658 15.5551L8.00008 13.1743L11.9821 15.5551C12.2735 15.7304 12.6408 15.7144 12.9168 15.5143C13.1936 15.3137 13.3228 14.969 13.2475 14.6364L12.2182 10.1022L15.7089 7.04143C15.9656 6.81682 16.0636 6.46207 15.9583 6.13748Z"
                                      fill="#FFC107"
                                    />
                                  </svg>
                                </p>
                              </div>
                              <div className="student">
                                <p>NGN{data?.price}</p>
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
