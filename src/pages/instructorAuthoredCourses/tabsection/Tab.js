import React, { useState, Fragment } from "react";
import "./Tab.css";
import { Grid, List } from "react-feather";
import { Link } from "react-router-dom";
import "./scrollbars.css";
import CourseSidebar from "../formboxsection/components/CourseSidebar";

import { Tab, Tabs, Col } from "react-bootstrap";
import MyCourses from "./MyCourses.js";

import { useEffect } from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchCourses } from "actions/coursesActions";
import Loader from "components/Loader/Loader";
import { useQuery } from "hooks/useQuery.js";

import toast from "react-hot-toast";

import { getInstructorCourses } from "services/instructor.js";
import { useHistory } from "react-router-dom";

const MyLearningContainer = (props) => {
  const {
    course: { courses },
    fetchCourses,
    match,
    auth: { user }
  } = props;


  console.log(user)
 
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

  const history = useHistory();

  useEffect(() => {
    (async function loadContent() {
      try {
        await fetchCourses();
        // let dataUser = await getEnrolledCourse();
 
        // console.log(dataUser.data.data);
        // setData([...dataUser.data.data]);
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
                    .includes(query.get("search").toLowerCase())
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













    const [activeCourses, setActiveCourses] = useState([]);
    const [pendingCourses, setPendingCourses] = useState([]);
    const [deactivatedCourses, setDeactivatedCourses] = useState([]);
  
  // let history = useHistory();

  useEffect(() => {
    fetchAuthProfile();
  }, []);

  const fetchAuthProfile = async () => {
    try {
      let allCourses = await getInstructorCourses();
      // console.log( [...allCourses.data.data.data])
      setActiveCourses(
        allCourses.data.data.data.length > 0 &&
          allCourses.data.data.data.filter((course) => {
            return parseInt(course.status) === 1 && user.email === course?.instructor?.user?.email;
          })
      );

 setDeactivatedCourses(
        allCourses.data.data.data.length > 0 &&
          allCourses.data.data.data.filter((course) => {
            return parseInt(course.status) === 0 && user.email === course?.instructor?.user?.email;
          })
      );

      setPendingCourses(
        allCourses.data.data.data.length > 0 &&
          allCourses.data.data.data.filter((course) => {
            return parseInt(course.status) === -1 && user.email === course?.instructor?.user?.email;
          })
      );
    } catch (err) {
      toast.error(
        err?.response?.data?.message || `Error occured fetching active courses`
      );
    }
    setLoading(false);
  };






  console.log(activeCourses, pendingCourses, deactivatedCourses)
  

  


  //for sidecontent main

  const [toggleGridList, setToggleGridList] = useState(true);
  const toggle = () => {
    setToggleGridList((previous) => !previous);
  };

  const courseSet = []

  return (
    <div className="container">
      <br />
      <br />
      <br />
      <br />
      <div className="row">
        <div className="col-md-12">
          <div className="mylearning-title">
            <h4 className="pull-left">My Authoring</h4>

            <button style={{float:"right", width:"200px"}} className="btn btn-primary pull-right" onClick={()=>{
                       history.push("/instructor-pages/course/create")
                  }}>Add course</button>
          </div>
         
        </div>
      </div>
      <div className="row">
        {loading ? (
          <Loader width="70" />
        ) : !loading ? (
          <Fragment>
            <div className="col-md-2 col-sm-12">
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

            <div className="col-md-10 col-sm-12 mt-sm-4">
              <Tabs defaultActiveKey="activecourses" id="uncontrolled-tab-example">
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
                    <MyCourses courses={activeCourses} />
                  ) : (
                    <div className="table-responsive table-wrapper">
                      <table className="table table-borderless responsive">
                        <thead>
                          <tr>
                            {/*<th scope="col">Course Code</th>*/}
                            <th scope="col">Course Name</th>
                            <th scope="col">Instructor Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Start Date</th>

                            <th scope="col">End Date</th>

                            <th scope="col">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {activeCourses.length > 0 &&
                            activeCourses.map((course, i) => {
                              var dateStarted = new Date(course.start_date);
                              var dateEnd = new Date(course.end_date);

                              return (
                                <tr key={i}>
                                  {/*<td>{course.course_code}</td>*/}
                                  <td>
                                    <Link to="">
                                      <strong>
                                        {course?.course_name}
                                      </strong>
                                    </Link>
                                  </td>
                                  <td>{course?.instructor?.user?.first_name}  {course?.instructor?.user?.first_name}</td>
                                  <td>{course?.price}</td>
                                  <td>
                                    {dateStarted.toLocaleDateString("en-US")}
                                  </td>
                                  <td>{dateEnd.toLocaleDateString("en-US")}</td>

                                  <td>
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
                <Tab eventKey="pending" title="Approval/Pending Courses">
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
                    <MyCourses courses={pendingCourses} />
                  ) : (
                    <div className="table-responsive table-wrapper">
                      <table className="table table-borderless responsive">
                        <thead>
                          <tr>
                           {/* <th scope="col">Course Code</th> */} 
                            <th scope="col">Course Name</th>
                            <th scope="col">Instructor Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Start Date</th>

                            <th scope="col">End Date</th>

                            <th scope="col">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {pendingCourses.length > 0 &&
                            pendingCourses.map((course, i) => {
                              var dateStarted = new Date(course.start_date);
                              var dateEnd = new Date(course.end_date);

                              return (
                                <tr key={i}>
                                  {/*<td>{course.course.course_code}</td>*/}
                                  <td>
                                    <Link to="">
                                      <strong>
                                        {course.course.course_name}
                                      </strong>
                                    </Link>
                                  </td>
                                  <td></td>
                                  <td>{course?.course?.price}</td>
                                  <td>
                                    {dateStarted.toLocaleDateString("en-US")}
                                  </td>
                                  <td>{dateEnd.toLocaleDateString("en-US")}</td>

                                  <td>
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
                <Tab eventKey="archive" title="Archive Courses">
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
                            <th scope="col">Course Code</th>
                            <th scope="col">Course Name</th>
                            <th scope="col">Instructor Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Start Date</th>

                            <th scope="col">End Date</th>
                            <th scope="col">Category</th>
                            <th scope="col">Ownership</th>
                            <th scope="col">Status</th>
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
                                  <td>{course?.course_code}</td>
                                  <td>
                                    <Link to="">
                                      <strong>{course?.course_name}</strong>
                                    </Link>
                                  </td>
                                  <td>
                                    {course?.instructor?.user?.last_name}{" "}
                                    {course?.instructor?.user?.first_name}
                                  </td>
                                  <td>{course.price}</td>
                                  <td>
                                    {dateStarted.toLocaleDateString("en-US")}
                                  </td>
                                  <td>{dateEnd.toLocaleDateString("en-US")}</td>
                                  <td>{course?.learning_style}</td>

                                  <td>
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
                <Tab eventKey="deactivated" title="Deactivated Courses">
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
                    <MyCourses courses={deactivatedCourses}/>
                  ) : (
                    <div className="table-responsive table-wrapper">
                      <table className="table table-borderless ">
                        <thead>
                          <tr>
                            {/*<th scope="col">Course Code</th>*/}
                            <th scope="col">Course Name</th>
                            <th scope="col">Instructor Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Start Date</th>

                            <th scope="col">End Date</th>
                            <th scope="col">Category</th>
                            <th scope="col">Ownership</th>
                            <th scope="col">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {deactivatedCourses.length > 0 &&
                            deactivatedCourses.map((course, i) => {
                              var dateStarted = new Date(course.start_date);
                              var dateEnd = new Date(course.end_date);

                             
                              return (
                                <tr key={i}>
                                 {/* <td>{course?.course_code}</td> */} 
                                  <td>
                                    <Link to="">
                                      <strong>{course?.course_name}</strong>
                                    </Link>
                                  </td>
                                  <td>
                                    {course?.instructor?.user?.last_name}{" "}
                                    {course?.instructor?.user?.first_name}
                                  </td>
                                  <td>NGN {course?.price}</td>
                                  <td>
                                    {dateStarted.toLocaleDateString("en-US")}
                                  </td>
                                  <td>{dateEnd.toLocaleDateString("en-US")}</td>
                                  <td>{course?.category?.name}</td>
                                  <td>{course?.learning_style}</td>

                                  <td>
                                    <div className={"alert alert-danger"}>
                                      Deactivated
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
                    <MyCourses courses={courseSet} />
                  ) : (
                    <div className="table-responsive table-wrapper">
                      <table className="table table-borderless">
                        <thead>
                          <tr>
                            <th scope="col">Course Code</th>
                            <th scope="col">Course Name</th>
                            <th scope="col">Instructor Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Start Date</th>

                            <th scope="col">End Date</th>

                            <th scope="col">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[].map((course, i) => {
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
                                <td>{course.course.course_code}</td>
                                <td>
                                  <Link to="">
                                    <strong>{course.course.course_name}</strong>
                                  </Link>
                                </td>
                                <td></td>
                                <td>{course?.course?.price}</td>
                                <td>
                                  {dateStarted.toLocaleDateString("en-US")}
                                </td>
                                <td>{dateEnd.toLocaleDateString("en-US")}</td>

                                <td>
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
                    <MyCourses courses={courseSet} />
                  ) : (
                    <div className="table-responsive table-wrapper">
                      <table className="table table-borderless responsive">
                        <thead>
                          <tr>
                            <th scope="col">Course Code</th>
                            <th scope="col">Course Name</th>
                            <th scope="col">Instructor Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Start Date</th>

                            <th scope="col">End Date</th>

                            <th scope="col">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[].length > 0 &&
                            [].map((course, i) => {
                              var dateStarted = new Date(course.start_date);
                              var dateEnd = new Date(course.end_date);

                              return (
                                <tr key={i}>
                                  <td>{course.course.course_code}</td>
                                  <td>
                                    <Link to="">
                                      <strong>
                                        {course.course.course_name}
                                      </strong>
                                    </Link>
                                  </td>
                                  <td></td>
                                  <td>{course?.course?.price}</td>
                                  <td>
                                    {dateStarted.toLocaleDateString("en-US")}
                                  </td>
                                  <td>{dateEnd.toLocaleDateString("en-US")}</td>

                                  <td>
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
                    <MyCourses courses={courseSet} />
                  ) : (
                    <div className="table-responsive table-wrapper">
                      <table className="table table-borderless responsive">
                        <thead>
                          <tr>
                            <th scope="col">Course Code</th>
                            <th scope="col">Course Name</th>
                            <th scope="col">Instructor Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Start Date</th>

                            <th scope="col">End Date</th>

                            <th scope="col">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[].length > 0 &&
                            [].map((course, i) => {
                              var dateStarted = new Date(course.start_date);
                              var dateEnd = new Date(course.end_date);

                              return (
                                <tr key={i}>
                                  <td>{course.course.course_code}</td>
                                  <td>
                                    <Link to="">
                                      <strong>
                                        {course.course.course_name}
                                      </strong>
                                    </Link>
                                  </td>
                                  <td></td>
                                  <td>{course?.course?.price}</td>
                                  <td>
                                    {dateStarted.toLocaleDateString("en-US")}
                                  </td>
                                  <td>{dateEnd.toLocaleDateString("en-US")}</td>

                                  <td>
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
                    <MyCourses courses={courseSet} />
                  ) : (
                    <div className="table-responsive table-wrapper">
                      <table className="table table-borderless ">
                        <thead>
                          <tr>
                            <th scope="col">Course Code</th>
                            <th scope="col">Course Name</th>
                            <th scope="col">Instructor Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Start Date</th>

                            <th scope="col">End Date</th>
                            <th scope="col">Category</th>
                            <th scope="col">Ownership</th>
                            <th scope="col">Status</th>
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
                                  <td>{course.course_code}</td>
                                  <td>
                                    <Link to="">
                                      <strong>{course.course_name}</strong>
                                    </Link>
                                  </td>
                                  <td>
                                    {course?.instructor?.user?.last_name}{" "}
                                    {course?.instructor?.user?.first_name}
                                  </td>
                                  <td>{course.price}</td>
                                  <td>
                                    {dateStarted.toLocaleDateString("en-US")}
                                  </td>
                                  <td>{dateEnd.toLocaleDateString("en-US")}</td>
                                  <td>{course.learning_style}</td>

                                  <td>
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
                    <MyCourses courses={courseSet} />
                  ) : (
                    <div className="table-responsive table-wrapper">
                      <table className="table table-borderless ">
                        <thead>
                          <tr>
                            <th scope="col">Course Code</th>
                            <th scope="col">Course Name</th>
                            <th scope="col">Instructor Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Start Date</th>

                            <th scope="col">End Date</th>
                            <th scope="col">Category</th>
                            <th scope="col">Ownership</th>
                            <th scope="col">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[].length > 0 &&
                           [].map((course, i) => {
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
                                  <td>{course.course_code}</td>
                                  <td>
                                    <Link to="">
                                      <strong>{course.course_name}</strong>
                                    </Link>
                                  </td>
                                  <td>
                                    {course?.instructor?.user?.last_name}{" "}
                                    {course?.instructor?.user?.first_name}
                                  </td>
                                  <td>{course.price}</td>
                                  <td>
                                    {dateStarted.toLocaleDateString("en-US")}
                                  </td>
                                  <td>{dateEnd.toLocaleDateString("en-US")}</td>
                                  <td>{course.category.name}</td>
                                  <td>{course.learning_style}</td>

                                  <td>
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
                    <MyCourses courses={courseSet} />
                  ) : (
                    <div className="table-responsive table-wrapper">
                      <table className="table table-borderless ">
                        <thead>
                          <tr>
                            <th scope="col">Course Code</th>
                            <th scope="col">Course Name</th>
                            <th scope="col">Instructor Name</th>
                            <th scope="col">Price</th>
                            <th scope="col">Start Date</th>

                            <th scope="col">End Date</th>
                            <th scope="col">Category</th>
                            <th scope="col">Ownership</th>
                            <th scope="col">Status</th>
                          </tr>
                        </thead>
                        <tbody>
                          {[].length > 0 &&
                            [].map((course, i) => {
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
                                  <td>{course.course_code}</td>
                                  <td>
                                    <Link to="">
                                      <strong>{course.course_name}</strong>
                                    </Link>
                                  </td>
                                  <td>
                                    {course?.instructor?.user?.last_name}{" "}
                                    {course?.instructor?.user?.first_name}
                                  </td>
                                  <td>{course.price}</td>
                                  <td>
                                    {dateStarted.toLocaleDateString("en-US")}
                                  </td>
                                  <td>{dateEnd.toLocaleDateString("en-US")}</td>
                                  <td>{course.category.name}</td>
                                  <td>{course.learning_style}</td>

                                  <td>
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
   auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  course: state.course,
    auth: state.auth,
});

export default connect(mapStateToProps, {
  fetchCourses,

})(MyLearningContainer);


