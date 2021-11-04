import React, { useState, Fragment } from "react";
import "./Tab.css";
import { Grid, List } from "react-feather";
import { Link } from "react-router-dom";
import "./scrollbars.css";
import CourseSidebar from "../formboxsection/components/CourseSidebar";

import { Tab, Tabs } from "react-bootstrap";
import MyCourses from "./MyCourses.js";

import { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchCourses } from "actions/coursesActions";
import Loader from "components/Loader/Loader";
import { useQuery } from "hooks/useQuery.js";

import toast from "react-hot-toast";

import { getEnrolledCourse } from "services/enrollment";
// import SortTest from "./SortTest";

// function dateToYMD(date) {
//     var d = date.getDate();
//     var m = date.getMonth() + 1; //Month from 0 to 11
//     var y = date.getFullYear();
//     return '' + y + '-' + (m<=9 ? '0' + m : m) + '-' + (d <= 9 ? '0' + d : d);
// }

const MyLearningContainer = (props) => {
  const {
    course: { courses },
    fetchCourses,
    match,
  } = props;

  // course.courseLoading = true

  let allcoursesFetched = [],
    activecoursesFetched = [],
    upcomingcourses = [],
    completedcourses = [],
    wishlistcourses = [],
    accomplishedcourses = [];

  //for aside content forbox left
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [filterAllCourses, setFilterAllCourses] = useState([]);
  const [queryVal, setQueryVal] = useState("");
  const query = useQuery();
  let routeQuery = query.get("filter");

  const [querySearchVal, setVal] = useState(query.get("search"));
  const [querySearchMethod, setMethod] = useState(query.get("method"));
  const [mycourse, setData] = useState([]);

  useEffect(() => {
    (async function loadContent() {
      try {
        await fetchCourses();
        let dataUser = await getEnrolledCourse();
        // console.log(filterAllCourses())
        console.log(dataUser.data.data);
        setData([...dataUser.data.data]);
      } catch (e) {
        toast.error("Error occured fetching data");
      }
      setLoading(false);
    })();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (routeQuery !== null && routeQuery.length > 0) {
      setVal(query.get("search"));
      setMethod(query.get("method"));
      setQueryVal(routeQuery);
    }
    // eslint-disable-next-line
  }, [routeQuery]);

  useEffect(() => {
    FilterAll();
    // eslint-disable-next-line
  }, [match, courses, search]);

  console.log([match, courses, search]);

  const FilterAll = async () => {
    let catId = match.params.id;

    if (catId) {
      if (catId > 0) {
        courses.length > 0 &&
          setFilterAllCourses(
            courses.filter((course) => {
              return parseInt(course.category_id) === catId;
            })
          );
      }
    } else {
      let searchVal;

      if (queryVal.length > 0) {
        searchVal = querySearchVal;
        let filtered = [];
        switch (querySearchMethod) {
          case "name":
            setFilterAllCourses(
              courses.length > 0 &&
                courses.filter((course) => {
                  return course.course_name
                    .toLowerCase()
                    .includes(query.get("search").toLowerCase());
                })
            );
            break;
          case "pace":
            if (query.get("pace") === "self") {
              filtered = courses.filter((course) => {
                return course.learning_style === "Self Paced";
              });
              setFilterAllCourses([...filtered]);
            } else {
              filtered = courses.filter((course) => {
                return course.learning_style === "Instructor Paced";
              });
              setFilterAllCourses([...filtered]);
            }
            break;
          case "fee":
            if (query.get("amount") === "free") {
              filtered = courses.filter((course) => {
                return parseInt(course.price) === parseInt(0);
              });
              setFilterAllCourses([...filtered]);
            } else {
              filtered = courses.filter((course) => {
                return parseInt(course.price) > parseInt(0);
              });
              setFilterAllCourses([...filtered]);
            }
            break;
          default:
            return true;
        }
        // setQueryVal("");
      } else {
        searchVal = search;
        setFilterAllCourses(
          courses.length > 0 &&
            courses.filter((course) => {
              return course.course_name
                .toLowerCase()
                .includes(searchVal.toLowerCase());
            })
        );
      }
    }
  };

  const isDistantFuture = (date, seconds = 0) => {
    // number of milliseconds tolerance (i.e. 60000 == one minute)
    return date.getTime() > Date.now() + seconds;
  };

  console.log(mycourse);
  allcoursesFetched = mycourse;

  activecoursesFetched = mycourse.filter((course) => {
    console.log(course.start_date);
    var requestedDateToStart = new Date(course.course.start_date);

    course["set_status"] = "Active";
    return !isDistantFuture(requestedDateToStart); // &&  (today.getMonth() == requestedDateToStart.getMonth() && today.getFullYear()+1 >= requestedDateToStart.getFullYear()+1)
  });

  upcomingcourses = mycourse.filter((course) => {
    console.log(course.course.start_date);
    var requestedDateToStart = new Date(course.course.start_date);

    course["set_status"] = "Upcoming";

    return isDistantFuture(requestedDateToStart);
  });

  completedcourses = mycourse.filter((course) => {
    // var requestedDateToStart = course.course.status
    // course["set_status"] ="Completed"
    // return "Completed" === requestedDateToStart;
    return [];
  });

  allcoursesFetched = upcomingcourses.concat(activecoursesFetched);
  allcoursesFetched = allcoursesFetched.filter(
    (v, i, a) =>
      a.findIndex(
        (t) =>
          t.course.course_name === v.course.course_name &&
          t.course.course_id === v.course.course_id
      ) === i
  );

  let wishListedItems = [];
  if (localStorage.getItem("wishes")) {
    wishListedItems = JSON?.parse(localStorage.getItem("wishes"));
  }

  //for sidecontent main

  const [toggleGridList, setToggleGridList] = useState(true);
  const toggle = () => {
    setToggleGridList((previous) => !previous);
  };

  return (
    <div className="container">
      <br />
      <br />
      <br />
      <br />
      <div className="row">
        <div className="col-sm-12">
          <h4
            className="page-title"
            style={{
              fontWeight: "300px",
              color: "#333",
              fontSize: "45px",
              fontFamily: "Open Sans",
              lineHight: "34px",
              letterSpacing: "-1px",
              fontWeight: "normal",
            }}
          >
            My Learning
          </h4>
        </div>
      </div>
      <div className="row">
        {loading ? (
          <Loader width="70" />
        ) : !loading ? (
          <Fragment>
            <div className="col-md-2 col-sm-12" style={{ display: "none" }}>
              <div style={{ marginTop: "60px" }}>
                <div className="filter-sidebar">
                  <CourseSidebar
                    setFilterAllCourses={setFilterAllCourses}
                    setSearch={setSearch}
                    search={search}
                  />
                </div>
              </div>
            </div>

            <div className="col-md-12 col-sm-12 ">
              <Tabs defaultActiveKey="allcourses" id="uncontrolled-tab-example">
                <Tab eventKey="allcourses" title="All Courses">
                  <div className="toggleBtn">
                    <div className="d-flex justify-content-end">
                      <div className="toggle-icon" onClick={toggle}>
                        {toggleGridList ? (
                          <Grid size={15} />
                        ) : (
                          <List size={15} />
                        )}{" "}
                        {toggleGridList ? " View as List" : " View as Grid"}
                      </div>
                    </div>
                  </div>
                  {toggleGridList ? (
                    <MyCourses courses={allcoursesFetched} />
                  ) : (
                    <div className="table-responsive table-wrapper">
                      <table className="table table-borderless">
                        <thead>
                          <tr>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Course Code
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Course Name
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Instructor Name
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Price
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Start Date
                            </th>

                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              End Date
                            </th>

                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {allcoursesFetched.map((course, i) => {
                            var dateStarted = new Date(course.start_date);
                            var dateEnd = new Date(course.end_date);

                            let activity = "alert-info";
                            if (course.status === 1) {
                              activity = "alert-success";
                            } else if (course.status === 2) {
                              activity = "alert-success";
                            } else if (course.status === 3) {
                              activity = "alert-warning";
                            } else {
                            }
                            return (
                              <tr key={i}>
                                <td
                                  style={{
                                    fontFamily: "Open Sans",
                                    color: "#000",
                                    fontSize: "14px",
                                  }}
                                >
                                  {course.course.course_code}
                                </td>
                                <td
                                  style={{
                                    fontFamily: "Open Sans",
                                    color: "#000",
                                    fontSize: "14px",
                                  }}
                                >
                                  <Link to="">
                                    <strong>{course.course.course_name}</strong>
                                  </Link>
                                </td>
                                <td
                                  style={{
                                    fontFamily: "Open Sans",
                                    color: "#000",
                                    fontSize: "14px",
                                  }}
                                >
                                  {course?.course?.instructor?.first_name}
                                </td>
                                <td
                                  style={{
                                    fontFamily: "Open Sans",
                                    color: "#000",
                                    fontSize: "14px",
                                  }}
                                >
                                  {course?.course?.price}
                                </td>
                                <td
                                  style={{
                                    fontFamily: "Open Sans",
                                    color: "#000",
                                    fontSize: "14px",
                                  }}
                                >
                                  {dateStarted.toLocaleDateString("en-US")}
                                </td>
                                <td
                                  style={{
                                    fontFamily: "Open Sans",
                                    color: "#000",
                                    fontSize: "14px",
                                  }}
                                >
                                  {dateEnd.toLocaleDateString("en-US")}
                                </td>

                                <td
                                  style={{
                                    fontFamily: "Open Sans",
                                    color: "#000",
                                    fontSize: "14px",
                                  }}
                                >
                                  <div className={"alert " + activity}>
                                    {course.set_status}
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </Tab>
                <Tab eventKey="activecourses" title="Active Courses">
                  <div className="toggleBtn">
                    <div className="d-flex justify-content-end">
                      <div className="toggle-icon" onClick={toggle}>
                        {toggleGridList ? (
                          <Grid size={15} />
                        ) : (
                          <List size={15} />
                        )}{" "}
                        {toggleGridList ? " View as List" : " View as Grid"}
                      </div>
                    </div>
                  </div>
                  {toggleGridList ? (
                    <MyCourses courses={activecoursesFetched} />
                  ) : (
                    <div className="table-responsive table-wrapper">
                      <table className="table table-borderless responsive">
                        <thead>
                          <tr>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Course Code
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Course Name
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Instructor Name
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Price
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Start Date
                            </th>

                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              End Date
                            </th>

                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {activecoursesFetched.length > 0 &&
                            activecoursesFetched.map((course, i) => {
                              var dateStarted = new Date(course.start_date);
                              var dateEnd = new Date(course.end_date);

                              return (
                                <tr key={i}>
                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    {course.course.course_code}
                                  </td>
                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    <Link to="">
                                      <strong>
                                        {course.course.course_name}
                                      </strong>
                                    </Link>
                                  </td>
                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  ></td>
                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    {course?.course?.price}
                                  </td>
                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    {dateStarted.toLocaleDateString("en-US")}
                                  </td>
                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    {dateEnd.toLocaleDateString("en-US")}
                                  </td>

                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    <div className={"alert alert-success"}>
                                      Active
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </Tab>
                <Tab eventKey="upcomingcourses" title="Upcoming Courses">
                  <div className="toggleBtn">
                    <div className="d-flex justify-content-end">
                      <div className="toggle-icon" onClick={toggle}>
                        {toggleGridList ? (
                          <Grid size={15} />
                        ) : (
                          <List size={15} />
                        )}{" "}
                        {toggleGridList ? " View as List" : " View as Grid"}
                      </div>
                    </div>
                  </div>
                  {toggleGridList ? (
                    <MyCourses courses={upcomingcourses} />
                  ) : (
                    <div className="table-responsive table-wrapper">
                      <table className="table table-borderless responsive">
                        <thead>
                          <tr>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Course Code
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Course Name
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Instructor Name
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Price
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Start Date
                            </th>

                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              End Date
                            </th>

                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {upcomingcourses.length > 0 &&
                            upcomingcourses.map((course, i) => {
                              var dateStarted = new Date(course.start_date);
                              var dateEnd = new Date(course.end_date);

                              return (
                                <tr key={i}>
                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    {course?.course?.course_code}
                                  </td>
                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    <Link to="">
                                      <strong>
                                        {course?.course?.course_name}
                                      </strong>
                                    </Link>
                                  </td>
                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  ></td>
                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    {course?.course?.price}
                                  </td>
                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    {dateStarted.toLocaleDateString("en-US")}
                                  </td>
                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    {dateEnd.toLocaleDateString("en-US")}
                                  </td>

                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    <div className={"alert alert-warning"}>
                                      Upcoming
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </Tab>
                <Tab eventKey="completedcourses" title="Completed Courses">
                  <div className="toggleBtn">
                    <div className="d-flex justify-content-end">
                      <div className="toggle-icon" onClick={toggle}>
                        {toggleGridList ? (
                          <Grid size={15} />
                        ) : (
                          <List size={15} />
                        )}{" "}
                        {toggleGridList ? " View as List" : " View as Grid"}
                      </div>
                    </div>
                  </div>
                  {toggleGridList ? (
                    <MyCourses courses={[]} />
                  ) : (
                    <div className="table-responsive table-wrapper">
                      <table className="table table-borderless ">
                        <thead>
                          <tr>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Course Code
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Course Name
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Instructor Name
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Price
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Start Date
                            </th>

                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              End Date
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Category
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Ownership
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {[].length > 0 &&
                            [].map((course, i) => {
                              var dateStarted = new Date(course.start_date);
                              var dateEnd = new Date(course.end_date);

                              let status_state = "Active";

                              if (course.status === 1) {
                                status_state = "Active";
                              } else if (course.status === 2) {
                                status_state = "Upcoming";
                              } else if (course.status === 3) {
                                status_state = "Completed";
                              } else {
                                status_state = "Accomplished";
                              }
                              return (
                                <tr key={i}>
                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    {course?.course_code}
                                  </td>
                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    <Link to="">
                                      <strong>{course?.course_name}</strong>
                                    </Link>
                                  </td>
                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    {course?.instructor?.last_name}{" "}
                                    {course?.instructor?.first_name}
                                  </td>
                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    {course.price}
                                  </td>
                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    {dateStarted.toLocaleDateString("en-US")}
                                  </td>
                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    {dateEnd.toLocaleDateString("en-US")}
                                  </td>
                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    {course.learning_style}
                                  </td>

                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    <div className={"alert alert-danger"}>
                                      {status_state}
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </Tab>
                <Tab eventKey="wishlist" title="Wish List">
                  <div className="toggleBtn">
                    <div className="d-flex justify-content-end">
                      <div className="toggle-icon" onClick={toggle}>
                        {toggleGridList ? (
                          <Grid size={15} />
                        ) : (
                          <List size={15} />
                        )}{" "}
                        {toggleGridList ? " View as List" : " View as Grid"}
                      </div>
                    </div>
                  </div>
                  {toggleGridList ? (
                    <MyCourses
                      courses={
                        wishlistcourses.length === 0
                          ? wishListedItems
                          : wishlistcourses
                      }
                    />
                  ) : (
                    <div className="table-responsive table-wrapper">
                      <table className="table table-borderless ">
                        <thead>
                          <tr>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Course Code
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Course Name
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Instructor Name
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Price
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Start Date
                            </th>

                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              End Date
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Category
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Ownership
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {wishListedItems.length > 0 &&
                            wishListedItems.map((course, i) => {
                              var dateStarted = new Date(course.start_date);
                              var dateEnd = new Date(course.end_date);

                              let status_state = "Active";
                              let activity = "alert-info";
                              if (course.status === 1) {
                                status_state = "Active";
                                activity = "alert-success";
                              } else if (course.status === 2) {
                                status_state = "Upcoming";
                                activity = "alert-success";
                              } else if (course.status === 3) {
                                status_state = "Completed";
                                activity = "alert-warning";
                              } else {
                                status_state = "Wish list";
                              }
                              return (
                                <tr key={i}>
                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    {course?.course_code}
                                  </td>
                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    <Link to="">
                                      <strong>{course?.course_name}</strong>
                                    </Link>
                                  </td>
                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    {course?.instructor?.last_name}{" "}
                                    {course?.instructor?.first_name}
                                  </td>
                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    {course?.price}
                                  </td>
                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    {dateStarted.toLocaleDateString("en-US")}
                                  </td>
                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    {dateEnd.toLocaleDateString("en-US")}
                                  </td>
                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    {course?.category?.name}
                                  </td>
                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    {course?.learning_style}
                                  </td>

                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    <div className={"alert " + activity}>
                                      {status_state}
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </Tab>
                <Tab eventKey="accomplishment" title="Accomplishment">
                  <div className="toggleBtn">
                    <div className="d-flex justify-content-end">
                      <div className="toggle-icon" onClick={toggle}>
                        {toggleGridList ? (
                          <Grid size={15} />
                        ) : (
                          <List size={15} />
                        )}{" "}
                        {toggleGridList ? " View as List" : " View as Grid"}
                      </div>
                    </div>
                  </div>
                  {toggleGridList ? (
                    <MyCourses courses={accomplishedcourses} />
                  ) : (
                    <div className="table-responsive table-wrapper">
                      <table className="table table-borderless ">
                        <thead>
                          <tr>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Course Code
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Course Name
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Instructor Name
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Price
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Start Date
                            </th>

                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              End Date
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Category
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Ownership
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {accomplishedcourses.length > 0 &&
                            accomplishedcourses.map((course, i) => {
                              var dateStarted = new Date(course.start_date);
                              var dateEnd = new Date(course.end_date);

                              let status_state = "Active";
                              let activity = "alert-info";
                              if (course.status === 1) {
                                status_state = "Active";
                                activity = "alert-success";
                              } else if (course.status === 2) {
                                status_state = "Upcoming";
                                activity = "alert-success";
                              } else if (course.status === 3) {
                                status_state = "Completed";
                                activity = "alert-warning";
                              } else {
                                status_state = "Accomplished";
                              }
                              return (
                                <tr key={i}>
                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    {course.course_code}
                                  </td>
                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    <Link to="">
                                      <strong>{course.course_name}</strong>
                                    </Link>
                                  </td>
                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    {course?.instructor?.last_name}{" "}
                                    {course?.instructor?.first_name}
                                  </td>
                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    {course.price}
                                  </td>
                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    {dateStarted.toLocaleDateString("en-US")}
                                  </td>
                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    {dateEnd.toLocaleDateString("en-US")}
                                  </td>
                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    {course.category.name}
                                  </td>
                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    {course.learning_style}
                                  </td>

                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    <div className={"alert " + activity}>
                                      {status_state}
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </Tab>
              </Tabs>
            </div>
          </Fragment>
        ) : (
          <div class="container">
            <h5>No records yet</h5>

            <div className="col-md-2 col-sm-12">
              <div className="filter-sidebar">
                <CourseSidebar
                  setFilterAllCourses={setFilterAllCourses}
                  setSearch={setSearch}
                  search={search}
                />
              </div>
            </div>

            <div className="col-md-10 col-sm-12 mt-sm-4">
              <Tabs defaultActiveKey="allcourses" id="uncontrolled-tab-example">
                <Tab eventKey="allcourses" title="All Courses">
                  <div className="toggleBtn">
                    <div className="d-flex justify-content-end">
                      <div className="toggle-icon" onClick={toggle}>
                        {toggleGridList ? (
                          <Grid size={15} />
                        ) : (
                          <List size={15} />
                        )}{" "}
                        {toggleGridList ? " View as List" : " View as Grid"}
                      </div>
                    </div>
                  </div>
                  {toggleGridList ? (
                    <MyCourses courses={allcoursesFetched} />
                  ) : (
                    <div className="table-responsive table-wrapper">
                      <table className="table table-borderless">
                        <thead>
                          <tr>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Course Code
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Course Name
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Instructor Name
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Price
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Start Date
                            </th>

                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              End Date
                            </th>

                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {allcoursesFetched.map((course, i) => {
                            var dateStarted = new Date(course.start_date);
                            var dateEnd = new Date(course.end_date);

                            let activity = "alert-info";
                            if (course.status === 1) {
                              activity = "alert-success";
                            } else if (course.status === 2) {
                              activity = "alert-success";
                            } else if (course.status === 3) {
                              activity = "alert-warning";
                            } else {
                            }
                            return (
                              <tr key={i}>
                                <td
                                  style={{
                                    fontFamily: "Open Sans",
                                    color: "#000",
                                    fontSize: "14px",
                                  }}
                                >
                                  {course.course.course_code}
                                </td>
                                <td
                                  style={{
                                    fontFamily: "Open Sans",
                                    color: "#000",
                                    fontSize: "14px",
                                  }}
                                >
                                  <Link to="">
                                    <strong>{course.course.course_name}</strong>
                                  </Link>
                                </td>
                                <td
                                  style={{
                                    fontFamily: "Open Sans",
                                    color: "#000",
                                    fontSize: "14px",
                                  }}
                                ></td>
                                <td
                                  style={{
                                    fontFamily: "Open Sans",
                                    color: "#000",
                                    fontSize: "14px",
                                  }}
                                >
                                  {course?.course?.price}
                                </td>
                                <td
                                  style={{
                                    fontFamily: "Open Sans",
                                    color: "#000",
                                    fontSize: "14px",
                                  }}
                                >
                                  {dateStarted.toLocaleDateString("en-US")}
                                </td>
                                <td
                                  style={{
                                    fontFamily: "Open Sans",
                                    color: "#000",
                                    fontSize: "14px",
                                  }}
                                >
                                  {dateEnd.toLocaleDateString("en-US")}
                                </td>

                                <td
                                  style={{
                                    fontFamily: "Open Sans",
                                    color: "#000",
                                    fontSize: "14px",
                                  }}
                                >
                                  <div className={"alert " + activity}>
                                    {course.set_status}
                                  </div>
                                </td>
                              </tr>
                            );
                          })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </Tab>
                <Tab eventKey="activecourses" title="Active Courses">
                  <div className="toggleBtn">
                    <div className="d-flex justify-content-end">
                      <div className="toggle-icon" onClick={toggle}>
                        {toggleGridList ? (
                          <Grid size={15} />
                        ) : (
                          <List size={15} />
                        )}{" "}
                        {toggleGridList ? " View as List" : " View as Grid"}
                      </div>
                    </div>
                  </div>
                  {toggleGridList ? (
                    <MyCourses courses={activecoursesFetched} />
                  ) : (
                    <div className="table-responsive table-wrapper">
                      <table className="table table-borderless responsive">
                        <thead>
                          <tr>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Course Code
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Course Name
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Instructor Name
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Price
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Start Date
                            </th>

                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              End Date
                            </th>

                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {activecoursesFetched.length > 0 &&
                            activecoursesFetched.map((course, i) => {
                              var dateStarted = new Date(course.start_date);
                              var dateEnd = new Date(course.end_date);

                              return (
                                <tr key={i}>
                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    {course.course.course_code}
                                  </td>
                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    <Link to="">
                                      <strong>
                                        {course.course.course_name}
                                      </strong>
                                    </Link>
                                  </td>
                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  ></td>
                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    {course?.course?.price}
                                  </td>
                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    {dateStarted.toLocaleDateString("en-US")}
                                  </td>
                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    {dateEnd.toLocaleDateString("en-US")}
                                  </td>

                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    <div className={"alert alert-success"}>
                                      Active
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </Tab>
                <Tab eventKey="upcomingcourses" title="Upcoming Courses">
                  <div className="toggleBtn">
                    <div className="d-flex justify-content-end">
                      <div className="toggle-icon" onClick={toggle}>
                        {toggleGridList ? (
                          <Grid size={15} />
                        ) : (
                          <List size={15} />
                        )}{" "}
                        {toggleGridList ? " View as List" : " View as Grid"}
                      </div>
                    </div>
                  </div>
                  {toggleGridList ? (
                    <MyCourses courses={upcomingcourses} />
                  ) : (
                    <div className="table-responsive table-wrapper">
                      <table className="table table-borderless responsive">
                        <thead>
                          <tr>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Course Code
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Course Name
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Instructor Name
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Price
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Start Date
                            </th>

                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              End Date
                            </th>

                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {upcomingcourses.length > 0 &&
                            upcomingcourses.map((course, i) => {
                              var dateStarted = new Date(course.start_date);
                              var dateEnd = new Date(course.end_date);

                              return (
                                <tr key={i}>
                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    {course.course.course_code}
                                  </td>
                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    <Link to="">
                                      <strong>
                                        {course.course.course_name}
                                      </strong>
                                    </Link>
                                  </td>
                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  ></td>
                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    {course?.course?.price}
                                  </td>
                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    {dateStarted.toLocaleDateString("en-US")}
                                  </td>
                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    {dateEnd.toLocaleDateString("en-US")}
                                  </td>

                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    <div className={"alert alert-warning"}>
                                      Upcoming
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </Tab>
                <Tab eventKey="completedcourses" title="Completed Courses">
                  <div className="toggleBtn">
                    <div className="d-flex justify-content-end">
                      <div className="toggle-icon" onClick={toggle}>
                        {toggleGridList ? (
                          <Grid size={15} />
                        ) : (
                          <List size={15} />
                        )}{" "}
                        {toggleGridList ? " View as List" : " View as Grid"}
                      </div>
                    </div>
                  </div>
                  {toggleGridList ? (
                    <MyCourses courses={completedcourses} />
                  ) : (
                    <div className="table-responsive table-wrapper">
                      <table className="table table-borderless ">
                        <thead>
                          <tr>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Course Code
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Course Name
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Instructor Name
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Price
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Start Date
                            </th>

                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              End Date
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Category
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Ownership
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {completedcourses.length > 0 &&
                            completedcourses.map((course, i) => {
                              var dateStarted = new Date(course.start_date);
                              var dateEnd = new Date(course.end_date);

                              let status_state = "Active";

                              if (course.status === 1) {
                                status_state = "Active";
                              } else if (course.status === 2) {
                                status_state = "Upcoming";
                              } else if (course.status === 3) {
                                status_state = "Completed";
                              } else {
                                status_state = "Accomplished";
                              }
                              return (
                                <tr key={i}>
                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    {course.course_code}
                                  </td>
                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    <Link to="">
                                      <strong>{course.course_name}</strong>
                                    </Link>
                                  </td>
                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    {course?.instructor?.user?.last_name}{" "}
                                    {course?.instructor?.user?.first_name}
                                  </td>
                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    {course.price}
                                  </td>
                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    {dateStarted.toLocaleDateString("en-US")}
                                  </td>
                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    {dateEnd.toLocaleDateString("en-US")}
                                  </td>
                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    {course.learning_style}
                                  </td>

                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    <div className={"alert alert-danger"}>
                                      {status_state}
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </Tab>
                <Tab eventKey="wishlist" title="Wish List">
                  <div className="toggleBtn">
                    <div className="d-flex justify-content-end">
                      <div className="toggle-icon" onClick={toggle}>
                        {toggleGridList ? (
                          <Grid size={15} />
                        ) : (
                          <List size={15} />
                        )}{" "}
                        {toggleGridList ? " View as List" : " View as Grid"}
                      </div>
                    </div>
                  </div>
                  {toggleGridList ? (
                    <MyCourses courses={wishlistcourses} />
                  ) : (
                    <div className="table-responsive table-wrapper">
                      <table className="table table-borderless ">
                        <thead>
                          <tr>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Course Code
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Course Name
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Instructor Name
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Price
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Start Date
                            </th>

                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              End Date
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Category
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Ownership
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {wishlistcourses.length > 0 &&
                            wishlistcourses.map((course, i) => {
                              var dateStarted = new Date(course.start_date);
                              var dateEnd = new Date(course.end_date);

                              let status_state = "Active";
                              let activity = "alert-info";
                              if (course.status === 1) {
                                status_state = "Active";
                                activity = "alert-success";
                              } else if (course.status === 2) {
                                status_state = "Upcoming";
                                activity = "alert-success";
                              } else if (course.status === 3) {
                                status_state = "Completed";
                                activity = "alert-warning";
                              } else {
                                status_state = "Accomplished";
                              }
                              return (
                                <tr key={i}>
                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    {course.course_code}
                                  </td>
                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    <Link to="">
                                      <strong>{course.course_name}</strong>
                                    </Link>
                                  </td>
                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    {course?.instructor?.user?.last_name}{" "}
                                    {course?.instructor?.user?.first_name}
                                  </td>
                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    {course.price}
                                  </td>
                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    {dateStarted.toLocaleDateString("en-US")}
                                  </td>
                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    {dateEnd.toLocaleDateString("en-US")}
                                  </td>
                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    {course.category.name}
                                  </td>
                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    {course.learning_style}
                                  </td>

                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    <div className={"alert " + activity}>
                                      {status_state}
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </Tab>
                <Tab eventKey="accomplishment" title="Accomplishment">
                  <div className="toggleBtn">
                    <div className="d-flex justify-content-end">
                      <div className="toggle-icon" onClick={toggle}>
                        {toggleGridList ? (
                          <Grid size={15} />
                        ) : (
                          <List size={15} />
                        )}{" "}
                        {toggleGridList ? " View as List" : " View as Grid"}
                      </div>
                    </div>
                  </div>
                  {toggleGridList ? (
                    <MyCourses courses={accomplishedcourses} />
                  ) : (
                    <div className="table-responsive table-wrapper">
                      <table className="table table-borderless ">
                        <thead>
                          <tr>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Course Code
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Course Name
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Instructor Name
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Price
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Start Date
                            </th>

                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              End Date
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Category
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Ownership
                            </th>
                            <th
                              scope="col"
                              style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",

                                marginTop: "14px",
                                marginRight: "7px",
                              }}
                            >
                              Status
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {accomplishedcourses.length > 0 &&
                            accomplishedcourses.map((course, i) => {
                              var dateStarted = new Date(course.start_date);
                              var dateEnd = new Date(course.end_date);

                              let status_state = "Active";
                              let activity = "alert-info";
                              if (course.status === 1) {
                                status_state = "Active";
                                activity = "alert-success";
                              } else if (course.status === 2) {
                                status_state = "Upcoming";
                                activity = "alert-success";
                              } else if (course.status === 3) {
                                status_state = "Completed";
                                activity = "alert-warning";
                              } else {
                                status_state = "Accomplished";
                              }
                              return (
                                <tr key={i}>
                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    {course.course_code}
                                  </td>
                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    <Link to="">
                                      <strong>{course.course_name}</strong>
                                    </Link>
                                  </td>
                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    {course?.instructor?.user?.last_name}{" "}
                                    {course?.instructor?.user?.first_name}
                                  </td>
                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    {course.price}
                                  </td>
                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    {dateStarted.toLocaleDateString("en-US")}
                                  </td>
                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    {dateEnd.toLocaleDateString("en-US")}
                                  </td>
                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    {course.category.name}
                                  </td>
                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    {course.learning_style}
                                  </td>

                                  <td
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",
                                      fontSize: "14px",
                                    }}
                                  >
                                    <div className={"alert " + activity}>
                                      {status_state}
                                    </div>
                                  </td>
                                </tr>
                              );
                            })}
                        </tbody>
                      </table>
                    </div>
                  )}
                </Tab>
              </Tabs>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

MyLearningContainer.propTypes = {
  course: PropTypes.object.isRequired,
  fetchCourses: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  course: state.course,
});

export default connect(mapStateToProps, {
  fetchCourses,
})(MyLearningContainer);
