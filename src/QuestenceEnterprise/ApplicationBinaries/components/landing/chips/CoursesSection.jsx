import React, { useState,useEffect } from 'react';
import CourseCard from './CourseCard';
import Slider from "react-slick";

import PropTypes from "prop-types";
import { connect } from "react-redux";


import toast from "react-hot-toast";
import { getCourses, getFeaturedCourses } from "../../../api/enrollment_services/courses.services";

const CoursesSection = () => {
    const [coursesFeatured, setCourses] = useState([])

    useEffect(() => {
    (async function loadContent() {
      try {
      const response = await getFeaturedCourses();
      setCourses([...response.data.data.courses])
     
    } catch (err) {
      toast.error("Error occured fetching notifications");
    }

      // setLoading(false);
    })();


    // eslint-disable-next-line
  }, []);

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
                        <a href={`${process.env.PUBLIC_URL}/courses/`} className="btn btn-solid-teal border-radius-50 float-end px-3 text-14">See all courses <i className="bi bi-chevron-right"></i></a>
                    </div>
                </div>
                {/* <div className="row"> */}
                    <Slider {...settings} className="row">
                    {coursesFeatured.length > 0 && coursesFeatured.map(course =>{
                       return(
                         <CourseCard detail={course}/>
                       ) 
                    })
                        
                    }
                        
                    </Slider>
                {/* </div> */}
            </div>
        </>
     );
}
 



CoursesSection.propTypes = {};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(CoursesSection);