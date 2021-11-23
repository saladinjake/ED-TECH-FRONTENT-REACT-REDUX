import React from "react";
import { Link } from "react-router-dom";

const AuthSidebarMenus = () => {
  return (
    <>
      <div className="bg-green-gradient mt-n-0-4 px-4 py-3 bottom-left-radius-20 bottom-right-radius-20">
        <ul className="nav flex-column pills-link col-md-10 text-center offset-md-1">
          <li className="nav-item py-2">
            <Link
              className="nav-link text-white inherit active"
              aria-current="page"
              to="#"
            >
              All Courses
            </Link>
          </li>
          <li className="nav-item py-2">
            <Link className="nav-link text-white" to="#">
              Active Courses
            </Link>
          </li>
          <li className="nav-item py-2">
            <Link className="nav-link text-white" to="#">
              Upcoming Courses
            </Link>
          </li>
          <li className="nav-item py-2">
            <Link className="nav-link text-white" to="#">
              Completed Courses
            </Link>
          </li>
          <li className="nav-item py-2">
            <Link className="nav-link text-white" to="#">
              Expired Courses
            </Link>
          </li>
          <li className="nav-item py-2">
            <Link className="nav-link text-white" to="#">
              Accomplishment
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default AuthSidebarMenus;
