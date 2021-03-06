import React, { useEffect, useState, Fragment } from "react";
import { Container, Row, Col } from "react-bootstrap";
import NavBar from "components/Navbar";
import PageTitle2 from "../../components/common/PageTitle2";
import CourseSidebar from "./components/CourseSidebar";
import CourseItemsList from "./components/CourseGridList";
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

  useEffect(() => {
    (async function loadContent() {
      await fetchCourses();
    })();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    // let listButton = document.querySelector(".list-view");
    // let gridButton = document.querySelector(".grid-view");
    // let wrapper = document.querySelector(".viewCourses");
    // listButton.addEventListener("click", function () {
    //   gridButton.classList.remove("on");
    //   listButton.classList.add("on");
    //   wrapper.classList.remove("gridDisplay");
    //   wrapper.classList.add("listDisplay");
    //   //wrapper.querySelector("widget")
    // });
    // gridButton.addEventListener("click", function () {
    //   listButton.classList.remove("on");
    //   gridButton.classList.add("on");
    //   wrapper.classList.remove("listDisplay");
    //   wrapper.classList.add("gridDisplay");
    // });
  });

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
    <div className="main-wrapper course-page">
      <NavBar />

      <br />
      <br />
      <br />
      <PageTitle2 />

      <Styles>
        {/* Course Grid */}
        <section className="course-grid-area" style={{ marginTop: "-20px" }}>
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
                <div className="row hidden-sm-down  shown">
                  <div className="">
                    <div
                      className="container"
                      id="container-actions"
                      style={{ marginRight: "40px" }}
                    >
                      <div className="buttons">
                        <button
                          id="grid"
                          onClick={() => {
                            history.push("/course-grid/list");
                          }}
                          className="list square-btn"
                        >
                          <i className="fa fa-bars fa-3x"></i>
                        </button>
                        <button
                          id="list"
                          onClick={() => {
                            history.push("/courses");
                          }}
                          className="grid square-btn active"
                          style={{ background: "#fafafa" }}
                        >
                          <i className="fa fa-th-large fa-3x"></i>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <br />

                <div className="course-items ">
                  <Row>
                    {courseLoading ? (
                      <Loader width="70" />
                    ) : courses.length > 0 ? (
                      <Fragment>
                        <CourseItemsList
                          courses={courses}
                          allCourses={filterAllCourses}
                        />
                      </Fragment>
                    ) : (
                      <Row>
                        <h1>No Search Found</h1>
                      </Row>
                    )}
                  </Row>

                  <br />
                  <br />
                  <Row>
                    <Col md="12">
                      {query?.get("search")?.toLowerCase()?.length > 0 &&
                        filterAllCourses?.length <= 0 && (
                          <h1>No Search Found</h1>
                        )}
                    </Col>
                  </Row>
                </div>
              </Col>
            </Row>
          </Container>
        </section>
      </Styles>

      {/* Footer 2 */}
      <Footer />
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
