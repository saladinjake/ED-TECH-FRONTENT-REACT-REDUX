import React, { useEffect, useState, Fragment } from "react";
// import { Container, Row, Col } from "react-bootstrap";
import NavBar from "components/Navbar/InstructorNavbar";

import Footer from "components/Footer";

// import { BreadcrumbBox } from "../../components/common/Breadcrumb";
// import Pagination from "./../../components/Pagination";
// import Footer from "../../components/Footer";
// import { Styles } from "./styles/product.js";
import { getNotifications } from "services/notification";
import toast from "react-hot-toast";
import Loader from "components/Loader/Loader";

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
                      alt="noimagehere"
                      src={
                        process.env.PUBLIC_URL +
                        "/assets/images/notification.png"
                      }
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
      </div>
    </div>
  );
};

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
      <br />
      <br />
      <br />
      <br />

      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <div className="container">
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
                    Notifications
                  </h4>
                </div>
              </div>
              <br />

              <div className="container">
                <div className="row">
                  <div className="table-responsive table-wrapper">
                    {loading ? (
                      <Loader width="70" />
                    ) : notifications.length > 0 ? (
                      <Fragment>
                        <table className="table table-borderless table-reveal">
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
                                Type
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
                                Message
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
                                Time
                              </th>
                            </tr>
                          </thead>
                          <tbody>
                            {notifications.map((item, i) => {
                              let notify_icon = "fa fa-book";
                              console.log(item.data.notification_type);
                              if (
                                item.data.notification_type === "Course Payment"
                              ) {
                                notify_icon = "fa fa-shopping-cart";
                              } else if (
                                item.data.notification_type ===
                                "Course Enrollment"
                              ) {
                                notify_icon = "fa fa-unlock";
                              } else {
                                notify_icon = "fa fa-user";
                              }
                              console.log(item);
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
                                    <i className={notify_icon}></i>
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
                      <NotificationEmpty />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Notifications;
