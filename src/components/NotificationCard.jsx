import React from "react";

const NotificationCard = ({ abbr, notificationTitle, notificationDate , icon}) => {
  return (
    <div className="col-md-12 border-bottom py-2 my-3">
      <div className="row py-2">
        <div className="col-md-1">
          <div
            className="bg-dark border-radius-40 text-center text-11 p-12px text-white"
            style={{ width: "40px", height: "40px" }}
          >
            {abbr}
            <i class={icon}></i>
          </div>
        </div>
        <div className="col-md-9 py-2">{notificationTitle}</div>
        <div className="col-md-2 py-2">{notificationDate}</div>
      </div>
    </div>
  );
};

export default NotificationCard;
