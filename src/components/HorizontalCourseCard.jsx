import React from "react";

const HorizontalCourseCard = ({
  courseTitle,
  courseDesc,
  learningStyle,
  learningLang,
  learningLevel,
  courseAuthor,
  coursePrice,
}) => {
  return (
    <>
      <div className="container d-none d-md-flex">
        <div className="card mb-5 border-radius-20 border mt-5">
          <div className="row g-0">
            <div className="col-md-5">
              <img
                src="/course.png"
                className="img-fluid rounded-start-20"
                alt="..."
                style={{ width: "100%" }}
              />
            </div>
            <div className="col-md-7 border-radius-20 d-flex align-items-center">
              <div className="card-body px-4">
                <div className="position-absolute top-0 end-0 col top-right-radius-20 fw-bold text-center p-2 text-13 bg-grey text-white">
                  {coursePrice}
                </div>
                <h3 className="fw-bold text-18 text-light-green  mt-4">
                  {courseTitle}
                </h3>
                <h4 className="fw-bold text-14 text-light-green ">
                  {courseAuthor}
                </h4>
                <p className="card-text text-14">{courseDesc}</p>
                <div className="row border-top pt-4">
                  <p className="col text-12">{learningStyle}</p>
                  <p className="col text-12">{learningLang}</p>
                  <p className="col text-12">{learningLevel} </p>
                  <a
                    href=""
                    className="col mx-3 pt-1 btn btn-sm border-radius-50 btn-solid-warning"
                  >
                    Wishlist
                  </a>
                  <a
                    href=""
                    className="col btn mx-3 pt-1 btn-sm border-radius-50 btn-solid-light-green"
                  >
                    Buy
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container d-md-none my-5">
        <div className="card text-white border-radius-20 overflow-hidden">
          <div style={{ height: "auto", width: "100%", overflow: "hidden" }}>
            <img
              src="/partnerWithUs-mobile.png"
              className="card-img-top img-fluid"
              alt="Coaches-img"
            />
          </div>
          <div className="card-body bg-green-gradient p-4">
            <h5 className="card-heading ">Partner With Us</h5>
            <p className="card-text">For Business</p>
            <p className="card-text text-14">
              Using our courses as it is or customized, or using our platform
              for your own internal courses, our aim is to help you create
              essential skills pathways with verifiable and stackable
              credentials to upskill and train every employee with the highest
              quality eLearning experiences in today’s most wanted job relevant
              subject areas.
            </p>
            <a href="#" className="btn btn-light border-radius-50 btn-sm">
              Read more
            </a>
          </div>
        </div>
      </div>
    </>
  );
};

export default HorizontalCourseCard;
