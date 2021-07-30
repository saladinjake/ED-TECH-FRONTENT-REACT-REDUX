import React, { useEffect, useState, Fragment } from "react";
import { Container, Row, Col } from "react-bootstrap";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchCourses } from "actions/coursesActions";

import Loader from "components/Loader/Loader";
import { useQuery } from "hooks/useQuery.js";

import { useHistory } from "react-router-dom";
import { getCategories } from "services/category";
// import "./mansory.scss"

const Section = ({ match }) => {
  const [courses_categories, setFilterAllCourses] = useState([]);

  let history = useHistory();

  const grids = [
    "item--normal",
    "item--large",
    "item--medium",
    // "item--full"
  ];

  useEffect(() => {
    try {
      let res = getCategories();
      setFilterAllCourses([...res.data.data]);
    } catch (err) {}
  });

  function shuffle(array) {
    for (let i = array.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array[0];
  }

  return (
    <div className="gridroot container">
      <section className="section-grid ">
        <br />
        <h1
          className=" text-dark "
          style={{ color: "#000", fontFamily: "Sequel Sans" }}
        >
          <b>Categories</b>
        </h1>
        <br />
        <div className="grid grid-sect">
          <div className="row" style={{ display: "none" }}>
            <div className="item col-md-8 col-merge-12 shown">
              <img
                onClick={() => {
                  window.location.href =
                    process.env.PUBLIC_URL + "/courses/category/8";
                }}
                src="https://stylemixthemes.com/masterstudy/white-lms/wp-content/uploads/sites/7/2018/07/cat_1-770x375.jpg"
              />

              <div className="item__details">Engineering</div>
            </div>

            <div className="col-md-4  shown">
              <div className="row">
                <div className="item item--large col-md4 col-merge-12">
                  <img
                    onClick={() => {
                      window.location.href =
                        process.env.PUBLIC_URL + "/courses/category/10";
                    }}
                    src="https://stylemixthemes.com/masterstudy/white-lms/wp-content/uploads/sites/7/2018/07/cat_2-370x155.jpg"
                  />

                  <div className="item__details">Arts And Humanities</div>
                </div>
              </div>
              <div className="row">
                <div className="item item--large col-md4 col-merge-12">
                  <img
                    onClick={() => {
                      window.location.href =
                        process.env.PUBLIC_URL + "/courses/category/2";
                    }}
                    src="https://stylemixthemes.com/masterstudy/white-lms/wp-content/uploads/sites/7/2018/07/cat_3-370x155.jpg"
                  />

                  <div className="item__details">Business</div>
                </div>
              </div>
            </div>
          </div>
          <br />
          <div className="container">
            <div className="row">
              <div className="col-md-4 item col-merge-12 ">
                <img
                  className=" millow"
                  style={{ width: "370px" }}
                  onClick={() => {
                    window.location.href =
                      process.env.PUBLIC_URL + "/courses/category/1";
                  }}
                  src="https://stylemixthemes.com/masterstudy/white-lms/wp-content/uploads/sites/7/2018/07/cat_1-770x375.jpg"
                />
                <div className="item__details">Technology</div>
              </div>

              <div className="col-md-4 item col-merge-12">
                <img
                  className=" millow"
                  style={{ width: "370px" }}
                  onClick={() => {
                    window.location.href =
                      process.env.PUBLIC_URL + "/courses/category/8";
                  }}
                  src="https://stylemixthemes.com/masterstudy/white-lms/wp-content/uploads/sites/7/2018/07/cat_1-770x375.jpg"
                />
                <div className="item__details">Engineering</div>
              </div>

              <div className="col-md-4 item col-merge-12 ">
                <img
                  className=" millow"
                  onClick={() => {
                    window.location.href =
                      process.env.PUBLIC_URL + "/courses/category/10";
                  }}
                  src="https://stylemixthemes.com/masterstudy/white-lms/wp-content/uploads/sites/7/2018/07/cat_2-370x155.jpg"
                />
                <div className="item__details">Arts And Humanities</div>
              </div>

              <div className="col-md-4 item col-merge-12 ">
                <img
                  className=" millow"
                  onClick={() => {
                    window.location.href =
                      process.env.PUBLIC_URL + "/courses/category/2";
                  }}
                  src="https://stylemixthemes.com/masterstudy/white-lms/wp-content/uploads/sites/7/2018/07/cat_3-370x155.jpg"
                />

                <div className="item__details">Business</div>
              </div>

              <div className="col-md-4 item col-merge-12 ">
                <img
                  className=" millow"
                  style={{ width: "370px" }}
                  onClick={() => {
                    window.location.href =
                      process.env.PUBLIC_URL + "/courses/category/12";
                  }}
                  src="https://stylemixthemes.com/masterstudy/white-lms/wp-content/uploads/sites/7/2018/07/cat_1-770x375.jpg"
                />
                <div className="item__details">Social Science</div>
              </div>

              <div className="col-md-4 item col-merge-12">
                <img
                  className=" millow"
                  onClick={() => {
                    window.location.href =
                      process.env.PUBLIC_URL + "/courses/category/9";
                  }}
                  src="https://stylemixthemes.com/masterstudy/white-lms/wp-content/uploads/sites/7/2018/07/cat_5-370x155.jpg"
                />
                <div className="item__details">Law</div>
              </div>
              <div className="col-md-4 item col-merge-12">
                <img
                  className=" millow"
                  onClick={() => {
                    window.location.href =
                      process.env.PUBLIC_URL + "/courses/category/5";
                  }}
                  src="https://stylemixthemes.com/masterstudy/white-lms/wp-content/uploads/sites/7/2018/07/cat_4-370x155.jpg"
                />
                <div className="item__details">Health And Nutrition</div>
              </div>
              <div className="col-md-4 item col-merge-12">
                <img
                  className=" millow"
                  onClick={() => {
                    window.location.href =
                      process.env.PUBLIC_URL + "/courses/category/11";
                  }}
                  src="https://stylemixthemes.com/masterstudy/white-lms/wp-content/uploads/sites/7/2018/07/cat_6-370x155.jpg"
                />
                <div className="item__details">Language</div>
              </div>
            </div>
          </div>
        </div>
      </section>
      <br />
    </div>
  );
};

Section.propTypes = {
  course: PropTypes.object.isRequired,
  fetchCourses: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  course: state.course,
});

export default connect(mapStateToProps, {
  fetchCourses,
})(Section);

// export default Section
