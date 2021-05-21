import React from "react";
// import Datas from './data/filter.json'
import { Link } from "react-router-dom";

import { Styles } from "./styles/courseFilter";
import "./Tab.css";

// import Loader from "components/Loader/Loader";

function MyCourses({ courses }) {
  return (
    <Styles>
      {/* Course Area */}
      <section className="course-filter">
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className=" row filter-items">
                {courses.map((data, i) => (

                  <div className="col-md-4" key={i}>
                    <div className="course-item" >
                     
                        <div
                          className="course-image"
                          style={{
                            backgroundImage: `url(${data?.course_cover_image})`,
                          }}
                        ></div>
                      
                      <div className="course-content" >
                        <h6 className=""  style={{height:"40px", fontSize: 14}}>
                         
                            {data?.course_name}
                          
                        </h6>
                        <p className="desc">
                           {data?.learning_style}
                        </p>
                      {  /*<p className="desc">
                          Instructor: {data?.instructor?.user?.first_name}{" "}
                          {data?.instructor?.user.last_name}
                        </p>*/}
                        <br/>
                        <div className="course-face d-flex justify-content-between">
                         
                          <div className="student">
                            <button className="btn course-btn">
                              Go to course
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </Styles>
  );
}

export default MyCourses;
