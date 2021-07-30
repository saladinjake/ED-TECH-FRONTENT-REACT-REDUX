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
      <div
        className="hide"
        style={{ marginTop: "0px", width: "100%", padding: "10px" }}
      >
        <button
          className="btn btn-primary"
          style={{
            width: "100px",
            marginTop: "0px",
            marginBottom: "0px",
            display: "none",
          }}
          onClick={handleOpenFilterBar}
        >
          Open Filter
        </button>
      </div>
      <br />
      {/*<div id="reset-display" className="shown" >*/}
      <div id="reset-display">
        <Row>
          {/*<Col md="12">
          <CourseSearch setSearch={setSearch} search={search} />
        </Col>*/}
          <Col md="12">
            <CourseCategory setFilterAllCourses={setFilterAllCourses} />
          </Col>
          <Col md="12" id="price-boxes" style={{ marginLeft: "5px" }}>
            <CoursePrice setFilterAllCourses={setFilterAllCourses} />
          </Col>
          <Col md="12" id="style-boxes" style={{ marginLeft: "5px" }}>
            <CourseStyle setFilterAllCourses={setFilterAllCourses} />
          </Col>
        </Row>
      </div>
    </div>
  );
}

export default CourseSidebar;
