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
      console.log(response.data.data.courses)
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
        
        <br/>
        <h1
          className=""
          style={{ color: "#000"}}
        >
          <b style={{ color: "#000" }}> Featured Courses</b>
        </h1>
        <br />
        <div className="row">
          <div className="col-md-12">
            
            <Carousel show={2} children={data} />
          </div>
          
          <div className="col-lg-2 pull-left">
          <br/><br/>
            <Link
              to="../courses"
              style={{ background: "#0253c8", color: "#fff" }}
              className="btn  waves-effect waves-light pull-left m-b-10"
            >
              <i className="md  md-chevron-left"></i> See All courses
            </Link>{" "}
          </div>
        </div>
        <br/> <br/>
      </Fragment>
    );
  }
}

TopCourses.propTypes = {};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(TopCourses);
