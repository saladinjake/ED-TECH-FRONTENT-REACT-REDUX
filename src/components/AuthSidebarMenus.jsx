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
              to={process.env.PUBLIC_URL+"/mylearning?search_menu=all&optimize=true&max_range=1000"}
            >
              All Courses
            </Link>
          </li>
          <li className="nav-item py-2">
            <Link className="nav-link text-white" to={process.env.PUBLIC_URL+"/mylearning?search_menu=active&optimize=true&max_range=1000"}>
              Active Courses
            </Link>
          </li>
          <li className="nav-item py-2">
            <Link className="nav-link text-white" to={process.env.PUBLIC_URL+"/mylearning?search_menu=upcoming&optimize=true&max_range=1000"}>
              Upcoming Courses
            </Link>
          </li>
          <li className="nav-item py-2">
            <Link className="nav-link text-white" to={process.env.PUBLIC_URL+"/mylearning?search_menu=completed&optimize=true&max_range=1000"}>
              Completed Courses
            </Link>
          </li>
          <li className="nav-item py-2">
            <Link className="nav-link text-white" to={process.env.PUBLIC_URL+"/mylearning?search_menu=expired&optimize=true&max_range=1000"}>
              Expired Courses
            </Link>
          </li>
          <li className="nav-item py-2">
            <Link className="nav-link text-white" to={process.env.PUBLIC_URL+"/mylearning?search_menu=accomplished&optimize=true&max_range=1000"}>
              Accomplishment
            </Link>
          </li>
        </ul>
      </div>
    </>
  );
};

export default AuthSidebarMenus;
