import React from "react";
import { Container, Row, Col, Button } from "react-bootstrap";
import { Styles } from "./styles/busRegister.js";
import { useHistory } from "react-router-dom";

function FreeCourse() {
  let history = useHistory();
  return (
    <Styles>
      {/* Free Course */}
      <section className="free-course-area">
        <Container>
          <Row>
            <Col md="6">
              <div className="course-text">
                <h4>Create your instructor profile today</h4>
                <p>
                  If you're interested in becoming an instructor, please apply
                  on this form.{" "}
                </p>
                <p>
                  After you submit the form, we will reach out to you if there's
                  a good fit. Please note that we can't respond to every
                  application, but we do keep all submissions for future
                  consideration.
                </p>
                <Button
                  className="mt-4"
                  variant="success"
                  onClick={() => history.push("/register/instructor")}
                >
                  Register as an Instructor
                </Button>
              </div>
            </Col>
            <Col md="6"></Col>
          </Row>
        </Container>
      </section>
    </Styles>
  );
}

export default FreeCourse;
