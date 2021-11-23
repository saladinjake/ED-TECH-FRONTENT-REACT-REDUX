import React from "react";
import NotificationCard from "./NotificationCard";

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

const Notifications = ({notifications}) => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h4>Notifications</h4>
          </div>

            {notifications.length > 0 && notifications.slice(0,5).map((item, i) => {
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
          <NotificationCard
            abbr="NT"
            notificationTitle={ item.data.message}
            notificationDate={ LongTimeAgo(new Date(item.created_at))}
            icon={notifier}
          />
          )

        })}
        
        
        </div>
      </div>
    </>
  );
};

export default Notifications;
