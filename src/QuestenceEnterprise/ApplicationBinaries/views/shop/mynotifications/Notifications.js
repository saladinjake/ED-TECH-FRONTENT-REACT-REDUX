import React, { useEffect, useState, Fragment } from "react";
import { Container, Row, Col } from "react-bootstrap";
import NavBar from "components/Navbar";

import Footer from "components/Footer";

// import { BreadcrumbBox } from "../../components/common/Breadcrumb";
// import Pagination from "./../../components/Pagination";
// import Footer from "../../components/Footer";
// import { Styles } from "./styles/product.js";
import { getNotifications } from "services/notification";
import toast from "react-hot-toast";
import Loader from "components/Loader/Loader";

import Sidebar from "../newdashboard/Sidebar";

import "../newdashboard/assets/css/bootstrap.min.css";
import "../newdashboard/assets/css/core.css";
import "../newdashboard/assets/css/components.css";
import "../newdashboard/assets/css/icons.css";
import "../newdashboard/assets/css/pages.css";
import "../newdashboard/assets/css/responsive.css";
import "./tabnotifications.css";

function getTimeAgoInterval(date) {
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
  if (value != 1) unit = unit + "s";
  return value + " " + unit + " " + direction;
}

const Notifications = () => {
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async function loadContent() {
      setLoading(true);
      try {
        let res = await getNotifications();
        setNotifications([...res.data.data]);
      } catch (err) {
        toast.error(`Error occured fetching notifications`);
      }
      setLoading(false);
    })();
  }, []);

  return (
    <div>
      <NavBar />

      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="container">
              <div className="row">
                <div className="col-sm-12">
                  <h4 className="page-title">Notifications</h4>
                </div>
              </div>
              <br />

              <div className="container">
                <div className="row">
                  <div class="table-responsive table-wrapper">
                    {loading ? (
                      <Loader width="70" />
                    ) : notifications.length > 0 ? (
                      <Fragment>
                        <table class="table table-borderless table-reveal">
                          <thead>
                            <tr>
                              <th scope="col">Type</th>
                              <th scope="col">Message</th>
                              <th scope="col">Time</th>
                            </tr>
                          </thead>
                          <tbody>
                            {notifications.map((item, i) => {
                              let notify_icon = "fa fa-book";
                              console.log(item.data.notification_type);
                              if (
                                item.data.notification_type == "Course Payment"
                              ) {
                                notify_icon = "fa-shopping-cart";
                              } else if (
                                item.data.notification_type ==
                                "Course Enrollment"
                              ) {
                                notify_icon = "fa-unlock";
                              } else {
                                notify_icon = "fa-user";
                              }
                              console.log(item);
                              return (
                                <tr
                                  className="card-box"
                                  id={i + "titanic-" + new Date().toString()}
                                  key={i + "titanic-" + new Date().toString()}
                                >
                                  <td>
                                    <span
                                      className={"fa fa-2x " + notify_icon}
                                    ></span>
                                  </td>
                                  <td>{item.data.message}</td>

                                  <td>
                                    {getTimeAgoInterval(
                                      new Date(item.created_at)
                                    )}
                                  </td>
                                </tr>
                              );
                            })}
                          </tbody>
                        </table>
                      </Fragment>
                    ) : (
                      <h4>No new notifications yet</h4>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
