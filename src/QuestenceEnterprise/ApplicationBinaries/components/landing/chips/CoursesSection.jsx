import React from 'react';
import CourseCard from './CourseCard';
import Slider from "react-slick";

const CoursesSection = () => {
    var settings = {
        dots: true,
        arrows: true,
        infinite: true,
        speed: 1000,
        slidesToShow: 4,
        slidesToScroll: 4,
        initialSlide: 0,
        autoplay: false,
        responsive: [
          {
            breakpoint: 1024,
            settings: {
              slidesToShow: 3,
              slidesToScroll: 3,
              infinite: true,
              dots: true,
              
            }
          },
          {
            breakpoint: 600,
            settings: {
              slidesToShow: 2,
              slidesToScroll: 2,
              initialSlide: 2,
              
            }
          },
          {
            breakpoint: 480,
            settings: {
              slidesToShow: 1,
              slidesToScroll: 1,
              
            }
          }
        ]
      };
    return ( 
        <>
            <div className="container my-5">
                <div className="row mb-3">
                    <h4 className="subheading-1 col">Featured Courses</h4>
                    <div className="col">
                        <a href="" className="btn btn-solid-teal border-radius-50 float-end px-3 text-14">See all courses <i className="bi bi-chevron-right"></i></a>
                    </div>
                </div>
                {/* <div className="row"> */}
                    <Slider {...settings} className="row">
                        <CourseCard />
                        <CourseCard />
                        <CourseCard />
                        <CourseCard />
                        <CourseCard />
                        <CourseCard />
                    </Slider>
                {/* </div> */}
            </div>
        </>
     );
}
 
export default CoursesSection;