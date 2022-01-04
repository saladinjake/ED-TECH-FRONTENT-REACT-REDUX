import React, { useEffect, useState, Fragment } from "react";
import { Container, Row, Col } from "react-bootstrap";
import NavBar from "components/Navbar";
import PageTitle2 from "../../components/common/PageTitle2";
import CourseSidebar from "./components/CourseSidebar";
import CourseItemGrid from "./components/CourseItemsGrid";
import CourseItemsList from "./components/CourseGridList";

import ResponsiveGrid from "./components/ResponsiveGrid";
import Footer from "../../components/Footer";
import { Styles } from "./styles/course.js";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchCourses } from "actions/coursesActions";

import Loader from "components/Loader/Loader";
import { useQuery } from "hooks/useQuery.js";
import "./grid.css";
import { useHistory } from "react-router-dom";

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

  let history = useHistory();

  const [querySearchVal, setVal] = useState(query.get("search"));
  const [querySearchMethod, setMethod] = useState(query.get("method"));
  const [viewGrid, setViewGrid] = useState(true);

  useEffect(() => {
    (async function loadContent() {
      await fetchCourses();
    })();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {});

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
            return (
              parseInt(course.category_id) === catId &&
              parseInt(course.status) === 1
            );
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
                  return (
                    course.course_name
                      .toLowerCase()
                      .includes(query.get("search").toLowerCase()) &&
                    parseInt(course.status) === 1
                  );
                })
            );
            break;
          case "pace":
            if (query.get("pace") === "self") {
              filtered = courses.filter((course) => {
                return (
                  course.learning_style === "Self Paced" &&
                  parseInt(course.status) === 1
                );
              });
              setFilterAllCourses([...filtered]);
            } else {
              filtered = courses.filter((course) => {
                return (
                  course.learning_style === "Instructor Paced" &&
                  parseInt(course.status) === 1
                );
              });
              setFilterAllCourses([...filtered]);
            }
            break;
          case "fee":
            if (query.get("amount") === "free") {
              filtered = courses.filter((course) => {
                return (
                  parseInt(course.price) === parseInt(0) &&
                  parseInt(course.status) === 1
                );
              });
              setFilterAllCourses([...filtered]);
            } else {
              filtered = courses.filter((course) => {
                return (
                  parseInt(course.price) > parseInt(0) &&
                  parseInt(course.status) === 1
                );
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
              return (
                course.course_name
                  .toLowerCase()
                  .includes(searchVal.toLowerCase()) &&
                parseInt(course.status) === 1
              );
            })
        );
      }
    }
  };

  return (
    <div className="main-wrapper course-page">
      <NavBar />
      <br />
      <br />
      <br />
      <PageTitle2 />

      <Styles>
        {/* Course Grid */}
        <section className="course-grid-area" style={{ marginTop: "-50px" }}>
          <Container>
            <Row>
              <Col lg="3" md="4" sm="5">
                <div style={{ marginTop: "50px" }}>
                  <CourseSidebar
                    setFilterAllCourses={setFilterAllCourses}
                    setSearch={setSearch}
                    search={search}
                  />
                </div>
              </Col>

              <Col lg="9" md="8" sm="7">
                <div className="row   shown">
                  <div className="">
                    <div
                      className="container  col-merge-12 "
                      id="container-actions"
                    >
                      <div className="buttons">
                        <button
                          id="grid"
                          onClick={(e) => {
                            e.preventDefault();
                            // history.push("/course-grid/list");
                            setViewGrid(false);
                            document.getElementById(
                              "grid"
                            ).style.backgroundColor = "#ddd";
                            document.getElementById(
                              "list"
                            ).style.backgroundColor = "#fff";
                            // document.getElementById("listv").style.backgroundColor="#fff"
                          }}
                          className="list square-btn article-dummy"
                        >
                          <i id="listv" className="fa fa-bars fa-3x"></i>
                        </button>
                        <button
                          id="list"
                          style={{ background: "#ddd" }}
                          onClick={(e) => {
                            // history.push("/courses");
                            setViewGrid(true);
                            document.getElementById(
                              "list"
                            ).style.backgroundColor = "#ddd";
                            document.getElementById(
                              "grid"
                            ).style.backgroundColor = "#fff";
                            // document.getElementById("gridv").style.backgroundColor="#fff"
                          }}
                          className="grid square-btn article-dummy"
                        >
                          <i id="gridv" className="fa fa-th-large fa-3x"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <br />

                <div
                  className="course-items viewCourses gridDisplay"
                  style={{ marginTop: "-20px" }}
                >
                  <Row>
                    {courseLoading ? (
                      <Loader width="70" />
                    ) : courses.length > 0 ? (
                      <Fragment>
                        {viewGrid === true ? (
                          <Fragment>
                            {/* <CourseItemsList
                            courses={courses}
                            allCourses={filterAllCourses}
                          />*/}

                            <ResponsiveGrid
                              courses={courses}
                              allCourses={filterAllCourses}
                            />
                            <div style={{ clear: "both" }}></div>
                          </Fragment>
                        ) : (
                          <Fragment>
                            <CourseItemGrid
                              courses={courses}
                              allCourses={filterAllCourses}
                            />

                            <div style={{ clear: "both" }}></div>
                          </Fragment>
                        )}
                      </Fragment>
                    ) : (
                      <Row>
                        <h1>No Search Found</h1>
                      </Row>
                    )}
                  </Row>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </Styles>

      {/* Footer 2 */}
       <div className="my-auto border-top bg-green">
                <div className="container">
                        <Footer />
                </div>
            </div>
    </div>
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