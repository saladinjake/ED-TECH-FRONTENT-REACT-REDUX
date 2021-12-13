import React from "react";
//import { Splide, SplideSlide } from "@splidejs/react-splide";
// 
//import '@splidejs/splide/dist/css/themes/splide-skyblue.min.css';
const DigitalOnlineLearning = () => {
  return (
    <>
      <div className="row">
        <div className="col-md-12">
          {/* <Splide
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
                src="coach-2.png"
                alt="Image 1"
                className="mx-auto d-block"
              />
            </SplideSlide>
            <SplideSlide className="bg-orange">
              <img
                src="coach-3.png"
                alt="Image 2"
                className="mx-auto d-block"
              />
            </SplideSlide>
          </Splide> */}
          <div className="row-flexes" style={{
            background:`url(${process.env.PUBLIC_URL+ "/banner.png" })`,
            height:"400px"
          }}>
          <div class="column-flexes">
        
          </div>

          <div class="column-flexes">

            <div class="bordered-box-about">
            <h2>Digital Online Learning</h2>

<p>Digital Online Learning
Looking forward to excellence!!!. Browse through our job opportunities to find your match to grow with excellence. We provide flexible working experience and help you build a successful career path.</p>

            </div>
                  </div>

          </div>
         
        </div>
      </div>
    </>
  );
};

export default DigitalOnlineLearning;
