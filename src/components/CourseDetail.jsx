import React, { useState } from "react";
import { Nav, Tab } from "react-bootstrap";
import TextCard from "./TextCard";
import InstructorCard from "./InstructorCard";

const CourseDetail = () => {
  const [activeKey, setActiveKey] = useState("home");
  return (
    <Tab.Container id="left-tabs-example" defaultActiveKey="home">
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div className="mt-n-0-4 bg-teal pills-link col-md-8 px-3 py-2 bottom-left-radius-15 bottom-right-radius-15">
              <Nav
                variant="pills"
                defaultActiveKey="home"
                onSelect={(activeKey) => setActiveKey({ activeKey })}
              >
                <Nav.Item>
                  <Nav.Link eventKey="home">Overview</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="curriculum">Curriculum</Nav.Link>
                </Nav.Item>
                <Nav.Item>
                  <Nav.Link eventKey="instructors">Instructors</Nav.Link>
                </Nav.Item>
              </Nav>
            </div>
            <Tab.Content>
              <Tab.Pane eventKey="home">
                <div className="py-4">
                  <div style={{ marginTop: "20px" }}>
                    <h5 className="text-light-green">Course Overview</h5>
                    <TextCard
                      content="<p>What separates a successful leader from a mediocre one? In this course, you will learn what successful 21st-century leaders look like and how you can adopt their inclusive leadership style.</p>
                    <p>Using research and best practices, as well as stories from great leaders and everyday people, you will practice empowerment, accountability, courage, and humility—key leadership skills linked to inclusive, successful teams. Throughout the course, you will meet people like yourself, who want to be the best leaders they possibly can by incorporating inclusive leadership into their everyday lives. With short quizzes and compelling case studies, you will refine your skills each section. Most importantly, you will apply your new leadership skills through exciting real-life exercises.</p>
<p>At the end of the course, you will create a Personal Leadership Plan that will help you continue to develop your skills, knowledge, and awareness in your quest to become a successful, inclusive leader.</p>"
                    />
                  </div>
                  <div style={{ marginTop: "20px" }}>
                    <h5 className="text-light-green">What you will learn</h5>
                    <TextCard
                      content="<ol>
                    <li>What successful 21st-century leaders do.</li>
                    <li>How to develop and refine the key inclusive leadership skills of Empowerment, Accountability,
                    Courage, and Humility—known as the “EACH” framework.</li>
                    <li>How to apply your new skills to case studies and in real-life situations.</li>
                    <li>Why creating your own Personal Leadership Plan is integral to success and weekly guidance around developing yours</li>
                    </ol>"
                    />
                  </div>
                  <div style={{ marginTop: "20px" }}>
                    <h5 className="text-light-green">Course Prerequisites</h5>
                    <TextCard content="<p>None</p>" />
                  </div>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="curriculum">
                <div className="py-4">
                  <div style={{ marginTop: "20px" }}>
                    <h5 className="text-light-green">Course Curriculum</h5>
                    <TextCard
                      content="<p>Before You Begin.</p>
                    <p>Week 1: 21st Century Leaders.</p>
                    <p>Week 2: Unconscious Challenges & Otherness.</p>
                    <p>Week 3: Getting to Inclusive Leadership.</p>
                    <p>Week 4: Pulling It All Together.</p>"
                    />
                  </div>
                </div>
              </Tab.Pane>
              <Tab.Pane eventKey="instructors">
                <div className="row mt-3">
                  <InstructorCard
                    authorName="Deepali Bagati"
                    authorPosition="Vice President"
                    authorCompany="Inclusive Leadership Intiative Catalyst"
                    authorImage="/instructor.png"
                  />
                  <InstructorCard
                    authorName="Emily Troiano"
                    authorPosition="Senior Instructor"
                    authorCompany="Information Centre Catalyst"
                    authorImage="/instructor-2.png"
                  />
                  <InstructorCard
                    authorName="Deepali Bagati"
                    authorPosition="Vice President"
                    authorCompany="Inclusive Leadership Intiative Catalyst"
                    authorImage="/instructor-3.png"
                  />
                </div>
              </Tab.Pane>
            </Tab.Content>
          </div>
          <div className="col-md-4 col-sm-12">
            <h5 className="mt-n-0-4 bg-dark-grey float-end px-3 py-2 bottom-left-radius-15 bottom-right-radius-15">
              NGN 10, 000
            </h5>
            <div className="row mt-5">
              <div className="col-md-5 offset-md-7">
                <hr className="height-2px" />
                <button className="btn float-end border-radius-10 btn-solid-teal">
                  Log in to enroll
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Tab.Container>
  );
};

export default CourseDetail;
