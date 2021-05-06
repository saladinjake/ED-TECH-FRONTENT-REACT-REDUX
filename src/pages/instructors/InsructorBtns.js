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
          <Button
            className="mt-4 mr-4"
            variant="primary"
            onClick={() => {
              history.push("/instructor/course/create");
            }}
          >
            Create Course
          </Button>
          <Button
            className="mt-4 mr-4"
            variant="primary"
            onClick={() => {
              history.push("/instructor/mycourses");
            }}
          >
            Active Courses
          </Button>
          <Button
            className="mt-4 mr-4"
            variant="primary"
            onClick={() => {
              history.push("/instructor/course/pending");
            }}
          >
            Pending Course
          </Button>
          <Button
            className="mt-4 mr-4"
            variant="primary"
            onClick={() => {
              history.push("/instructor/course/declined");
            }}
          >
            Declined Courses
          </Button>
        </Col>
      </Row>
    </Styles>
  );
};

export default InstructorBtns;
