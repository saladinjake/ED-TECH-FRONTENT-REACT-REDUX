import React, { Fragment } from "react";
// import {Container, Row, Col } from "react-bootstrap"
import { Link } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import "./css/topitem.css";
import toast from "react-hot-toast";
// import { getCourses } from "services/course";

import { getCourses, getFeaturedCourses } from "services/course";

import Carousel from "./helpers/Carousel";

class TopCourses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      length: 0,
      index: 0,
    };
  }
  async componentDidMount() {
    try {
      const response = await getFeaturedCourses();
      console.log(response.data.data.courses);
      this.setState({
        data: response.data.data.courses,
        length: response.data.data.courses.length,
      });
    } catch (err) {
      toast.error("Error occured fetching notifications");
    }
  }
  render() {
    const { data } = this.state;

    return data.length === 0 ? (
      <Fragment>
        <p>Loading..</p>
      </Fragment>
    ) : (
      <Fragment>
        <div style={{ marginTop: "-50px", clear: "both" }}>
          <h1
            className="shown"
            style={{
              fontWeight: "300px",
              color: "#000",
              fontSize: "45px",
              fontFamily: "Montserrat",
              lineHight: "34px",
              letterSpacing: "-1px",
              fontWeight: "normal",
              marginTop: "80px",
            }}
          >
            Featured Courses
          </h1>

          <div className="mobile-centry hide">
            <br /> <br /> <br />
            <h1
              className="mobile-centry hide"
              style={{
                fontWeight: "300px",
                color: "#000",
                fontSize: "45px",
                fontFamily: "Montserrat",
                lineHight: "34px",
                letterSpacing: "-1px",
                fontWeight: "normal",
                marginTop: "30px",
              }}
            >
              Featured Courses
            </h1>
          </div>
        </div>
        <br />
        <br />
        <div className="row">
          <div className="col-md-12">
            <Carousel show={2} children={data} />
          </div>

          <div className="col-lg-2  mobile-centry entry-center">
            <br />
            <br />
            <Link
              to="../courses"
              style={{
                textAlign: "center",
                background: "#0253c8",
                borderRadius: "43px",
                height: "35px",
                fontFamily: "Open Sans",

                color: "#fff",
                fontSize: "12px",
                fontWeight: "bold",
                marginLeft: "10px",

                transition: "0.5s ease-in-out",
              }}
              className="btn  waves-effect waves-light pull-left m-b-10 "
            >
              <i className="md  md-chevron-left"></i> See all courses
            </Link>{" "}
          </div>
        </div>
        <br /> <br />
      </Fragment>
    );
  }
}

TopCourses.propTypes = {};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(TopCourses);
