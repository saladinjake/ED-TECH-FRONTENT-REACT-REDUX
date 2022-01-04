import React from "react";
import Slider from "react-slick";
import SlickNextArrow from "./SlickNextArrow";

const WhyQuestence = () => {
  var settings = {
    dots: true,
    arrows: true,
    infinite: true,
    speed: 1000,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: 0,
    autoplay: true,
    nextArrow: <SlickNextArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          arrows: false,
        },
      },
    ],
  };
  return (
    <>
      <div className="d-none d-md-flex p-3 mb-3 border-bottom questence-nuggets shadow-sm my-auto min-height-430">
        <div className="container">
          <div className="row py-5">
            <div className="col-md-4 col-sm-12 mb-2 align-items-center d-flex">
              <h4 className="text-white">
                The Questence platform allows you plan and learn at your own
                pace and in your own style.
              </h4>
            </div>
            <div className="col text-white p-4 questence-nuggets-left-border bg-transparent-black bottom-right-radius-20 top-right-radius-20">
              <div className="row">
                <div className="col-md-6 col-sm-12">
                  <div className="row">
                    <img
                      src="/no1.svg"
                      className="col-2"
                      style={{ height: "fit-content" }}
                      alt="No 1"
                    />
                    <div className="col">
                      <h6 className="fw-bold">Easy to Use</h6>
                      <p className="fs-6">
                        Easily enrol and schedule your classes.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-sm-12">
                  <div className="row">
                    <img
                      src="/no2.svg"
                      className="col-2"
                      style={{ height: "fit-content" }}
                      alt="No 2"
                    />
                    <div className="col">
                      <h6 className="fw-bold">Certification Pathways</h6>
                      <p className="fs-6">
                        Ease your path to professional certifications by
                        choosing standalone courses or multiple programmes.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="row mt-4">
                <div className="col-md-6 col-sm-12">
                  <div className="row">
                    <img
                      src="/n03.svg"
                      className="col-2"
                      style={{ height: "fit-content" }}
                      alt="No 3"
                    />
                    <div className="col">
                      <h6 className="fw-bold">Learn with your Peers</h6>
                      <p className="fs-6">
                        Form tutorial groups with fellow learners and review
                        lessons together with or without your instuctor present.
                        Post questions either to the instructor, or to your
                        classmates
                      </p>
                    </div>
                  </div>
                </div>
                <div className="col-md-6 col-sm-12">
                  <div className="row">
                    <img
                      src="/n04.svg"
                      className="col-2"
                      style={{ height: "fit-content" }}
                      alt="No 4"
                    />
                    <div className="col">
                      <h6 className="fw-bold">Live & Recorded Classes</h6>
                      <p className="fs-6">
                        Attend your class live or watch the recording at your
                        convenience.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="d-md-none p-3 mb-3 border-bottom questence-nuggets shadow-sm my-auto min-height-430">
        <div className="container">
          <div className="row py-5">
            <div className="col-sm-12 mb-2 align-items-center d-flex">
              <h4 className="text-white text-center">
                The Questence platform allows you plan and learn at your own
                pace and in your own style.
              </h4>
            </div>
            <div className="col-sm-12 text-white p-4 pb-0 questence-nuggets-left-border bg-transparent-black bottom-right-radius-20 top-right-radius-20">
              <Slider {...settings} className="row">
                <div className="">
                  <div className="row">
                    <img
                      src="/no1.svg"
                      className="col-2"
                      style={{ height: "fit-content" }}
                      alt="No 1"
                    />
                    <div className="col">
                      <h6 className="fw-bold">Easy to Use</h6>
                      <p className="fs-6">
                        Easily enrol and schedule your classes.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="row">
                    <img
                      src="/no2.svg"
                      className="col-2"
                      style={{ height: "fit-content" }}
                      alt="No 2"
                    />
                    <div className="col">
                      <h6 className="fw-bold">Certification Pathways</h6>
                      <p className="fs-6">
                        Ease your path to professional certifications by
                        choosing standalone courses or multiple programmes.
                      </p>
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="row">
                    <img
                      src="/n03.svg"
                      className="col-2"
                      style={{ height: "fit-content" }}
                      alt="No 3"
                    />
                    <div className="col">
                      <h6 className="fw-bold">Learn with your Peers</h6>
                      <p className="fs-6">
                        Form tutorial groups with fellow learners and review
                        lessons together with or without your instuctor present.
                        Post questions either to the instructor, or to your
                        classmates
                      </p>
                    </div>
                  </div>
                </div>
                <div className="">
                  <div className="row">
                    <img
                      src="/n04.svg"
                      className="col-2"
                      style={{ height: "fit-content" }}
                      alt="No 4"
                    />
                    <div className="col">
                      <h6 className="fw-bold">Live & Recorded Classes</h6>
                      <p className="fs-6">
                        Attend your class live or watch the recording at your
                        convenience.
                      </p>
                    </div>
                  </div>
                </div>
              </Slider>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WhyQuestence;
