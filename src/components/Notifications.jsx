import React from "react";
import NotificationCard from "./NotificationCard";

const Notifications = () => {
  return (
    <>
      <div className="container">
        <div className="row">
          <div className="col-md-12">
            <h4>Notifications</h4>
          </div>
          <NotificationCard
            abbr="NT"
            notificationTitle="Your previously created course: 'Leading Virtual Teams' has been approved"
            notificationDate="129 days ago"
          />
          <NotificationCard
            abbr="NT"
            notificationTitle="Your previously created course: 'Leading Virtual Teams' has been approved"
            notificationDate="129 days ago"
          />
        </div>
      </div>
    </>
  );
};

export default Notifications;
