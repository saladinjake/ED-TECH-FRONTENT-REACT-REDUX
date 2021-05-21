import React from "react";
import { Row, Col, Button } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import { Styles } from "./styles/product.js";

const InstructorBtns = () => {
  let history = useHistory();

  return (
    <Styles>
      <Row>
        <Col md="12">
        
          <button
            className="btn btn-primary"
          
            onClick={() => {
              history.push("/instructor-pages/course/create");
            }}>
          
            Create Course
          </button>
          <button
            className="btn btn-primary"
           
            onClick={() => {
              history.push("/instructor/mycourses");
            }}
          >
            Active Courses
          </button>
          <button
            className="btn btn-primary"
          
            onClick={() => {
              history.push("/instructor-pages/course/pending");
            }}
          >
            Pending Course
          </button>
          <button
            className="btn btn-primary"
           
            onClick={() => {
              history.push("/instructor-pages/course/declined");
            }}
          >
            Declined Courses
          </button>
        </Col>
      </Row>
    </Styles>
  );
};

export default InstructorBtns;
