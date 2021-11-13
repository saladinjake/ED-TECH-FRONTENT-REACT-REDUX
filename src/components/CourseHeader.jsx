import React from "react";
import ReactPlayer from "react-player";

const CourseHeader = ({ pageTitle, bgClass, subHeading, introVideoUrl }) => {
  return (
    <>
      <div
        className={bgClass + " border-bottom shadow-sm my-auto px-4 py-3 my-5"}
      >
        <div className="container">
          <div className="row pb-0 pe-lg-0 pt-lg-5 rounded-3">
            <div className="col-lg-6 p-3 p-lg-5 pt-lg-3 d-flex flex-column">
              <h1 className="heading-lg fw-bold lh-1 mb-4 text-white">
                {pageTitle}
              </h1>
              <p className="text-14 text-white">{subHeading}</p>
              <div className="row d-none d-md-flex">
                <div className="col">
                  <span className="bg-teal inherit py-2 px-4 rounded">
                    Level
                  </span>
                  <div className="d-inline-flex mx-3 text-white">
                    <i className="bi bi-star-fill text-white mx-1"></i>
                    <i className="bi bi-star-fill text-white mx-1"></i>
                    <i className="bi bi-star-fill text-white mx-1"></i>
                    <i className="bi bi-star-fill text-white mx-1"></i>
                    <i className="bi bi-star-fill text-white mx-1"></i>
                    (0 Ratings)
                  </div>
                </div>
              </div>
              <div className="row d-flex d-md-none">
                <div className="col-sm-12">
                  <span className="bg-teal inherit py-2 px-4 rounded">
                    Level
                  </span>
                </div>
                <div className="col-sm-12 mt-4">
                  <div className="d-inline-flex text-white">
                    <i className="bi bi-star-fill text-white mx-1"></i>
                    <i className="bi bi-star-fill text-white mx-1"></i>
                    <i className="bi bi-star-fill text-white mx-1"></i>
                    <i className="bi bi-star-fill text-white mx-1"></i>
                    <i className="bi bi-star-fill text-white mx-1"></i>
                    (0 Ratings)
                  </div>
                </div>
              </div>
              <div className="row mt-4 fw-bold d-none d-md-flex">
                <div className="col-md-5 col-sm-12 text-14 text-white border-end ">
                  A course by Deepali Bagati
                </div>
                <div className="col-md-3 col-sm-12 text-14 text-white border-end text-center">
                  Last updated
                </div>
                <div className="col-md-4 col-sm-12 text-14 text-white text-center">
                  English
                </div>
              </div>
              <div className="row mt-4 fw-bold d-flex d-md-none">
                <div className="col-sm-12 text-14 text-white">
                  A course by Deepali Bagati
                </div>
                <div className="col-sm-12 text-14 text-white">Last updated</div>
                <div className="col-sm-12 text-14 text-white ">English</div>
              </div>
            </div>
            <div className="col-lg-4 offset-lg-2  d-flex flex-column">
              <div className="rounded">
                <ReactPlayer
                  controls={true}
                  width="100%"
                  height="300px"
                  playsinline={true}
                  url={introVideoUrl}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CourseHeader;
