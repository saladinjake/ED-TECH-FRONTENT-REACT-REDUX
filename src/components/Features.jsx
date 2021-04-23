import React from "react";
import book from "assets/svgs/book.svg";
import professor from "assets/svgs/professor.svg";
import student from "assets/svgs/student.svg";
import university from "assets/svgs/university.svg";
import { Container, Row, Col } from "react-bootstrap";
import "./styles/features.scss";

const Features = () => {
  return (
    <section className="features">
      <Container>
        <Row>
        <Col lg="6">
          <div className="features__item shortintro">
            <h2>
              We Have Experienced Professionals & We Do Our Best To Achieve Your
              Goal. Your Happiness Is Our First Priority.
            </h2>

            <button className="mt-sm">
              Read More &nbsp;
              <svg
                width="16"
                height="8"
                viewBox="0 0 16 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12.01 3H0V5H12.01V8L16 4L12.01 0V3Z" fill="white" />
              </svg>
            </button>
          </div>
      </Col>
      <Col lg="6">
          <div className="features__item">
            <section class="features__box">
              <div class="features__box__item">
                <figure class="features__box__item-icon">
                  <img src={student} alt="student" />
                </figure>
                <h3 class="mb-xs">
                  970+ <br></br> Students
                </h3>
              </div>
              <div class="features__box__item">
                <figure class="features__box__item-icon">
                  <img src={professor} alt="professor" />
                </figure>
                <h3 class="mb-xs">
                  100+ <br></br>Instructors
                </h3>
              </div>
              <div class="features__box__item">
                <figure class="features__box__item-icon">
                  <img src={university} alt="university" />
                </figure>
                <h3 class="mb-xs">
                  340+ <br></br>Institutions
                </h3>
              </div>
              <div class="features__box__item">
                <figure class="features__box__item-icon">
                  <img src={book} alt="book" />
                </figure>
                <h3 class="mb-xs">
                  340<br></br>Courses
                </h3>
              </div>
            </section>
          </div>
      </Col>
      </Row>
      </Container>
    </section>
  );
};

export default Features;
