import React from "react";

const InstructorCard = ({
  authorName,
  authorImage,
  authorPosition,
  authorCompany,
}) => {
  return (
    <div className="col-md-4 col-sm-12">
      <div className="m-2 border-0 card border-radius-20 p-0">
        <img
          src={authorImage}
          className="card-img-top border-radius-15"
          alt="..."
        />
        <h5 className="card-title mt-2 fw-bold shorten-text-1l">
          {authorName}
        </h5>
        <p className="mb-0">{authorPosition}</p>
        <p>{authorCompany}</p>
      </div>
    </div>
  );
};

export default InstructorCard;
