import React from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";

const DigitalOnlineLearning = () => {
  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <Splide
            options={{
              // rewind: true,
              // gap   : '1rem',
              direction: "ttb",
              height: "27.6rem",
              arrows: false,
              pagination: false,
            }}
          >
            <SplideSlide className="bg-teal">
              <img
                src="/digital-online-1.png"
                alt="Image 1"
                className="mx-auto d-block"
              />
            </SplideSlide>
            <SplideSlide className="bg-orange">
              <img
                src="/digital-online-2.png"
                alt="Image 2"
                className="mx-auto d-block"
              />
            </SplideSlide>
          </Splide>
        </div>
      </div>
    </>
  );
};

export default DigitalOnlineLearning;
