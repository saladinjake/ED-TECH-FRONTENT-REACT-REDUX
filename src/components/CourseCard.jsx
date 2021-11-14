import React from "react";

const CourseCard = ({
  courseTitle,
  courseDesc,
  courseAuthorCompany,
  courseAuthor,
  coursePrice,
}) => {
  return (
    // <div className="">
    <div className="m-2 card border-radius-20 shadow-sm">
      <img src="/course-1.png" className="card-img-top" alt="Course" />
      <div className="col-4 offset-8 bottom-left-radius-20 fw-bold text-center p-2 bg-grey text-white">
        {coursePrice}
      </div>

      <div className="card-body">
        <h5 className="card-title text-11 fw-bold text-light-green shorten-text-1l">
          {courseTitle}
        </h5>
        <h6 className="card-subtitle text-light-green shorten-text-2l title-height-35 mb-3">
          {courseDesc}
        </h6>
        <p className="text-14 shorten-text-1l m-0">{courseAuthorCompany}</p>
        <p className="text-14 shorten-text-1l">{courseAuthor}</p>
        {/* <p className="card-text">Martin Caulpepper</p> */}
        <div className="row border-top pt-2">
          <a
            href="#"
            className="border-end text-center text-11 fw-bold text-decoration-none text-danger col q-text-link"
          >
            Details
          </a>
          <a
            href="#"
            className="border-end text-center text-11 fw-bold text-decoration-none text-warning col q-text-link"
          >
            Wishlist
          </a>
          <a
            href="#"
            className="text-center fw-bold text-11 text-decoration-none text-success col q-text-link"
          >
            Buy
          </a>
        </div>
      </div>
    </div>
    // </div>
  );
};

export default CourseCard;
