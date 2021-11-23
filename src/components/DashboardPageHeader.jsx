import React from "react";
import { Link } from "react-router-dom";

const DashboardPageHeader = ({
  welcomeTitle,
  welcomeSubtitle,
  btnTitle,
  bgClass,
}) => {
  return (
    <>
      <div
        className={
          bgClass +
          " border-bottom shadow-sm my-auto py-3 px-4 py-3 my-5 height-300px"
        }
      >
        <div className="container">
          <div className="row pb-0 pe-lg-0 pt-lg-5 rounded-3">
            <div className="col-lg-12 px-3 px-lg-5 d-flex flex-column">
              <h1 className="heading-lg fw-bold lh-1 mb-4 text-white">
                {welcomeTitle}
              </h1>
            </div>
          </div>
          <div className="row pb-0 pe-lg-0 pt-lg-1 rounded-3">
            <div className="col-lg-6 p-3 p-lg-5 pt-lg-2 d-flex flex-column">
              <h5 className="text-white">{welcomeSubtitle}</h5>
              <Link
                to="/courses"
                className="inherit btn-solid-teal btn mt-2 border-radius-20"
              >
                {btnTitle}
              </Link>
            </div>
            <div className="ms-auto d-none d-md-flex col-lg-3">
              <div className="row">
                <div className="col-md-12 bg-green-gradient border-radius-15 p-4 height-419px">
                  <h4 className="fw-bold text-white text-18 border-bottom pb-3 border-bottom-width-2">
                    Active Courses
                  </h4>
                  <p className="text-white">No courses</p>
                </div>
                <div className="col-md-12 bg-green-gradient border-radius-15 p-4 mt-3">
                  <h4 className="fw-bolder text-white text-18 pb-3 border-bottom-width-2">
                    Upcoming courses
                    <Link to="" className="text-white float-end">
                      <i class="bi bi-plus size-2rem "></i>
                    </Link>
                  </h4>
                </div>
              </div>
            </div>
          </div>

          <div className="row d-md-none">
            <div className="col-md-12 bg-green-gradient border-radius-15 p-4">
              <h4 className="fw-bold text-white text-18 border-bottom pb-3 border-bottom-width-2">
                Active Courses
              </h4>
              <p className="text-white">No courses</p>
            </div>
            <div className="col-md-12 bg-green-gradient border-radius-15 p-4 mt-3">
              <h4 className="fw-bolder text-white text-18 pb-3 border-bottom-width-2">
                Upcoming courses
                <Link to="" className="text-white float-end">
                  <i class="bi bi-plus size-2rem "></i>
                </Link>
              </h4>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default DashboardPageHeader;
