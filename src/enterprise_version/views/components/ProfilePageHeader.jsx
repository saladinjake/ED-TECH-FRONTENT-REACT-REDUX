import React from "react";

const ProfilePageHeader = ({
  pageTitle,
  bgClass,
  textPosition = "text-center",
}) => {
  return (
    <>
      <div
        className={
          bgClass +
          " border-bottom shadow-sm my-auto px-4 py-5 my-5 text-center height-300px"
        }
      >
        <div className="container">
          <div className="row pb-0 pe-lg-0 pt-lg-5 rounded-3">
            <div
              className={
                textPosition == "text-start"
                  ? "col-lg-12 p-3 p-lg-5 pt-lg-3 d-flex flex-column"
                  : "col-lg-6 offset-lg-3 p-3 p-lg-5 pt-lg-3 d-flex flex-column"
              }
            >
              <h1
                className={
                  textPosition + " heading-lg fw-bold lh-1 mb-4 text-white"
                }
              >
                {pageTitle}
              </h1>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProfilePageHeader;
