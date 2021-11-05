import React, { useEffect, useState, Fragment } from "react";
// import {Container, Row, Col } from "react-bootstrap"
import toast from "react-hot-toast";
import Loader from "../../components/Loader/Loader";

// import PropTypes from "prop-types";

import "./css/topitem.css";

import "./css/tabnotifications.css";

import { getLearnerProfile } from "../../api/enrollment_services/profile.services";
import { getNotifications } from "../../api/enrollment_services/notification.services";

// import notificationNotFound  from "./images/big/notification.png"

function LongTimeAgo(date) {
  let seconds = Math.floor((Date.now() - date) / 1000);
  let unit = "second";
  let direction = "ago";
  if (seconds < 0) {
    seconds = -seconds;
    direction = "from now";
  }
  let value = seconds;
  if (seconds >= 31536000) {
    value = Math.floor(seconds / 31536000);
    unit = "year";
  } else if (seconds >= 86400) {
    value = Math.floor(seconds / 86400);
    unit = "day";
  } else if (seconds >= 3600) {
    value = Math.floor(seconds / 3600);
    unit = "hour";
  } else if (seconds >= 60) {
    value = Math.floor(seconds / 60);
    unit = "minute";
  }
  if (parseInt(value) !== 1) unit = unit + "s";
  return value + " " + unit + " " + direction;
}

const NotificationEmpty = ({ completeness }) => {
  return (
    <div>
      <div className="row">
        <div className="col-sm-12">
          <h4 className="page-title">Notifications</h4>
          <br />
        </div>
      </div>

      <div className="row">
        <div className="col-lg-8">
          <div
            className="card-box"
            style={{
              height: "330px",
              display: "flex",
              justifyContent: "center",
            }}
          >
            <div className="bar-widget">
              <div className="table-box">
                <div className="table-detail">
                  <div className="iconbox bg-info">
                    <img
                      alt="noimage"
                      src={
                        process.env.PUBLIC_URL +
                        "/assets/images/notification.png"
                      }
                      alt=""
                      className="thumbnail"
                      style={{ border: "none" }}
                    />
                  </div>

                  <div style={{ marginTop: "100px", textAlign: "center" }}>
                    <h4 className="m-t-0 m-b-5">
                      <b>Don't see anything yet?</b>
                    </h4>
                    <p className="text-muted m-b-0 m-t-0">
                      Dont worry, your notifications would pop up when it
                      reaches you.
                    </p>
                  </div>

                  <br />
                  <br />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="col-lg-4">
          <div className="card-box">
            <h4 className="text-dark header-title m-t-0 m-b-30">
              User profile
            </h4>

            <div
              className="widget-chart text-center"
              style={{ marginLeft: "50px" }}
            >
              <div>
                <div className="percent-circle pc1" data-percent={completeness}>
                  <svg>
                    <use
                      className="percent-circle-inner"
                      xlinkHref="#percent-circle-svg"
                    ></use>
                  </svg>
                </div>
                {Number(completeness) !== 100 ? (
                  <p
                    className="text-dark m-t-0 m-b-30"
                    style={{ marginTop: "14px", marginRight: "7px" }}
                  >
                    {" "}
                    complete your profile
                    <span className="fa fa-arrow-right"> </span>
                  </p>
                ) : (
                  <p
                    className="text-dark m-t-0 m-b-30"
                    style={{ marginTop: "14px", marginRight: "7px" }}
                  >
                    {" "}
                    Edit your profile
                    <span className="fa fa-arrow-right"> </span>
                  </p>
                )}
              </div>
              <svg className="hidden">
                <circle
                  id="percent-circle-svg"
                  cx="50%"
                  cy="50%"
                  r="50%"
                  stroke-alignment="inner"
                ></circle>
              </svg>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const initialState = {
  count1: 5,
};

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState([]);

  useEffect(() => {
    (async function loadContent() {
      setLoading(true);
      try {
        let res = await getNotifications();
        setNotifications([...res.data.data]);
        let userProfile = await getLearnerProfile();
        setProfile(userProfile.data.data);
        console.log(userProfile.data.data);
      } catch (err) {
        console.log(err, "this is the notification error");
        toast.error(`Error occured fetching notifications`);
      }
      setLoading(false);
    })();
  }, []);
  console.log(profile);

  return (
    <div className="main-wrapper product-page">
      <section className="product-area">
        {loading ? (
          <Loader width="70" />
        ) : notifications.length > 0 ? (
          <Fragment>
            <div className="row">
              <div className="col-lg-8">
                <div className="table-responsive table-wrapper">
                  <table
                    className="table table-borderless table-reveal"
                    id="table1"
                  >
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
                          }}
                        >
                          Notification Type
                        </th>
                        <th
                          scope="col"
                          style={{
                            fontWeight: "700",
                            fontFamily: "Open Sans",
                            color: "#000",
                            fontSize: "12px",
                            lineHeight: "20px",
                          }}
                        >
                          Message
                        </th>

                        <th
                          scope="col"
                          style={{
                            fontWeight: "700",
                            fontFamily: "Open Sans",
                            color: "#000",
                            fontSize: "12px",
                            float: "right",
                            lineHeight: "20px",
                          }}
                        >
                          Time
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {notifications.slice(0, 3).map((item, i) => {
                        let notifier = "fa user";
                        if (
                          item.data.notification_type === "Course Enrollment"
                        ) {
                          notifier = "fa  fa-book";
                        } else if (
                          item.data.notification_type === "Course Payment"
                        ) {
                          notifier = "fa  fa-shopping-cart";
                        } else {
                          notifier = "fa  fa-user";
                        }
                        return (
                          <tr
                            id={i + "titanic-" + new Date().toString()}
                            key={i + "titanic-" + new Date().toString()}
                          >
                            <td
                              style={{
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "14px",
                              }}
                            >
                              <i class={notifier}></i>
                            </td>
                            <td
                              style={{
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "14px",
                              }}
                            >
                              {item.data.message}
                            </td>

                            <td
                              style={{
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "14px",
                              }}
                            >
                              {LongTimeAgo(new Date(item.created_at))}
                            </td>
                          </tr>
                        );
                      })}

                      {/*<button type="button" className="btn btn-default pull-left" onClick={()=>{
                          	decrement()
      
                          	previous(initialState.count1)
                          	console.log(initialState.count1)
                          }}>Previous</button>

                           <button style={{marginLeft:"20px"}} className="btn btn-default " type="button" onClick={()=>{
                           	increment()
                          	next(initialState.count1,notifications.length)
                          	console.log(initialState.count1)
                          }}>Next</button>*/}
                    </tbody>
                  </table>
                </div>
              </div>

              <div className="col-lg-4">
                <div className="card-box">
                  <h4
                    className="text-dark-x header-title-x m-t-0 m-b-30"
                    style={{
                      fontWeight: "700",
                      fontFamily: "Open Sans",
                      color: "#000",
                      fontSize: "12px",
                      lineHeight: "20px",
                    }}
                  >
                    User profile
                  </h4>

                  <div
                    className="widget-chart text-center"
                    style={{ marginLeft: "50px" }}
                  >
                    <div>
                      <div
                        className="percent-circle pc1"
                        data-percent={profile.completeness}
                      >
                        <svg>
                          <use
                            className="percent-circle-inner"
                            xlinkHref="#percent-circle-svg"
                          ></use>
                        </svg>
                      </div>
                      {Number(profile.completeness) !== 100 ? (
                        <a
                          href={process.env.PUBLIC_URL + "/learner/profile"}
                          className="text-dark m-t-0 m-b-30"
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
                          {" "}
                          complete your profile
                          <span className="fa fa-arrow-right"> </span>
                        </a>
                      ) : (
                        <a
                          href={process.env.PUBLIC_URL + "/learner/profile"}
                          className="text-dark m-t-0 m-b-30"
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
                          {" "}
                          Edit your profile
                          <span className="fa fa-arrow-right"> </span>
                        </a>
                      )}
                    </div>
                    <svg className="hidden">
                      <circle
                        id="percent-circle-svg"
                        cx="50%"
                        cy="50%"
                        r="50%"
                        stroke-alignment="inner"
                      ></circle>
                    </svg>
                  </div>
                </div>
              </div>
            </div>

            {hideTrsAtIndex5(5)}
          </Fragment>
        ) : (
          <NotificationEmpty completeness={profile.completeness} />
        )}
      </section>

      {/* Footer 2 */}
    </div>
  );
};

setTimeout(() => {
  drawCharts();
}, 9000);
function drawCharts() {
  var circles = document.querySelectorAll(".percent-circle");

  circles.forEach(function (el) {
    //pull the percentage and turn it into a fraction
    var percent = el.dataset.percent / 100;
    //work out the circumference from the width
    var diameter = el.offsetWidth;
    var circumference = Math.ceil(diameter * Math.PI);
    //now we have the circumference, we know how long the ouline should be
    var stroke = Math.ceil(circumference * percent);
    //also workout how long the line doesn't exist for
    var diff = circumference - stroke;

    //now add the strok dash array for the first two values
    //TODO : could this all be done with css?
    el.querySelector(".percent-circle-inner").style.strokeDasharray =
      stroke + "px " + diff + "px";
  });
}

const hideTrsAtIndex5 = (limitAbove) => {
  let trs = null;

  setTimeout(() => {
    trs = document.querySelectorAll("tbody tr");
    hide(trs, limitAbove);
  }, 3000);

  const hide = (trs, limit) => {
    trs.forEach((tr, index) =>
      index >= limit ? (tr.style.display = "none") : ""
    );
  };
};

export default Notifications;
