import React, { Fragment, useRef } from "react";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import questence from "assets/svgs/questence-logo.svg";
import { useHistory } from "react-router-dom";
import { ReactComponent as Dropdown } from "svgs/dropdown.svg";

import PropTypes from "prop-types";
import { connect } from "react-redux";

import "./topitem.css";
import toast from "react-hot-toast";
import { getCourses } from "services/course";

import { uuid } from "services/dashboard";

import Carousel from "./Carousel";

const ProductList = (props) => {
  console.log(props);

  return (
    <div className=" col-sm-6 col-lg-3 col-md-4 mobiles">
      <div className="">
        <Link
          to={"../courses/" + props.item.id + "/" + props.item.slug}
          className="image-popup"
          title="Screenshot-1"
        >
          <img
            src={props.item.course_thumbnail}
            className="thumb-img"
            alt="work-thumbnail"
          />
        </Link>

        <div className="product-action">
          <Link
            to={"../courses/" + props.item.id + "/" + props.item.slug}
            className="btn btn-success btn-sm"
          >
            <i className="md md-book"></i>
          </Link>
        </div>

        <div className="price-tag">N {props.item.price}</div>
        <div className="detail">
          <Link to={"../courses/" + props.item.id + "/" + props.item.slug}>
            <h4 className="m-t-0">
              <Link
                to={"../courses/" + props.item.id + "/" + props.item.slug}
                className="text-dark"
              >
                {props.item.course_name}
              </Link>
            </h4>
          </Link>
          <div className="rating">
            <ul className="list-inline">
              <li>
                <a className="fa fa-star" href="#"></a>
              </li>
              <li>
                <a className="fa fa-star" href="#"></a>
              </li>
              <li>
                <a className="fa fa-star" href="#"></a>
              </li>
              <li>
                <a className="fa fa-star" href="#"></a>
              </li>
              <li>
                <a className="fa fa-star-o" href="#"></a>
              </li>
            </ul>
          </div>
          <h5 className="m-0">
            {" "}
            <span className="text-muted">
              {" "}
              instructor : {props.item.instructor.user.username}
            </span>
          </h5>
        </div>
      </div>
    </div>
  );
};

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
      const response = await getCourses();
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
    console.log(data);
    let templateString = ``;

    return data.length == 0 ? (
      <Fragment>
        <p>Loading..</p>
      </Fragment>
    ) : (
      <Fragment>
        <h4 className="text-header text-dark "> My Courses</h4>
        <br />
        <div className="row">
          <div className="col-lg-2 pull-left">
            <Link
              to="../courses"
              style={{ background: "#0253c8", color: "#fff" }}
              className="btn  waves-effect waves-light pull-left m-b-10"
            >
              <i className="md  md-chevron-left"></i> See All courses
            </Link>{" "}
          </div>

          <div className=" content-page col-md-10">
            <Carousel show={2} children={data} />
          </div>
        </div>
      </Fragment>
    );
  }
}

TopCourses.propTypes = {};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(TopCourses);
