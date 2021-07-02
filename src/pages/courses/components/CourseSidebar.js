import React from "react";
import { Row, Col } from "react-bootstrap";
import CourseSearch from "./CourseSearch";
import CoursePrice from "./CoursePrice";
import CourseCategory from "./CourseCategory";
import CourseStyle from "./CourseStyle";
import { useHistory } from "react-router-dom";

function CourseSidebar({ setSearch, search, setFilterAllCourses }) {
  let history = useHistory();

  const handleOpenFilterBar = (e) => {
    if (document.getElementById("reset-display")) {
      let el = document.getElementById("reset-display");
      if (el.style.display === "block") {
        e.target.textContent = "Open Filter";
        el.style.display = "none";
        //el.classList.remove("shown")
      } else {
        el.style.display = "block";
        e.target.textContent = "Close Filter";
      }
    }
  };
  return (
    <div className="course-sidebar" style={{ marginTop: "-50px" }}>
      <div className="hide">
        <button
          className="btn btn-primary"
          style={{ width: "100px" }}
          onClick={handleOpenFilterBar}
        >
          Open Filter
        </button>
      </div>
      <br />
      <div id="reset-display" className="shown">
        <Row>
          {/*<Col md="12">
          <CourseSearch setSearch={setSearch} search={search} />
        </Col>*/}
          <Col md="12">
            <CourseCategory setFilterAllCourses={setFilterAllCourses} />
          </Col>
          <Col md="12">
            <CoursePrice setFilterAllCourses={setFilterAllCourses} />
          </Col>
          <Col md="12">
            <CourseStyle setFilterAllCourses={setFilterAllCourses} />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default CourseSidebar;
