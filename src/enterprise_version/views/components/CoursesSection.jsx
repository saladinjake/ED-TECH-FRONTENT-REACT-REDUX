import React, { useState,useEffect, Fragment} from "react";
import CourseCard from "./CourseCard";
import Slider from "react-slick";
import { Link } from "react-router-dom";
import { getFeaturedCourses } from "../../api/courses.services" 
import toast from "react-hot-toast"

import PropTypes from "prop-types";
import { connect } from "react-redux";
import Loader from "./Loader";

const CoursesSection = () => {

  const [isLoading,setLoading] = useState(false);
  const [topCourses,setTopCourses] = useState([])

  useEffect(()=>{
    

     async function fetchData() {

      setLoading(true)
      try{
        const responseTopCourse = await getFeaturedCourses() 
    
        setTopCourses([...responseTopCourse.data.data.courses])

      }catch(e){
        toast.error(`Some error occured. Please check your internet connection and try again`)

      }
      setLoading(false)
   
     }
      fetchData();

  }, [])
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
        },
      },
    ],
  };
  return (
    <>
      <div className="container my-5">
        <div className="row mb-3">
          <h4 className="subheading-1 col">Featured Courses</h4>
          <div className="col">
            <Link
              to="/courses"
              className="btn btn-solid-teal border-radius-50 float-end px-3 text-14"
            >
              See all courses <i className="bi bi-chevron-right"></i>
            </Link>
          </div>
        </div>
        {/* <div className="row"> */}
      
            <>
            {isLoading ? (
              <Loader width={"100"} />
            ) : (
                <Slider {...settings} className="row">

                     {topCourses.length && topCourses.map((featured,index)=>{
            
              return (
                 <CourseCard
                 key={index+ "_" + Math.random()*90}
                courseTitle={featured.course.course_code}
                courseDesc={featured?.course?.course_description}
                courseAuthorCompany={featured?.course?.instructor?.instructor_profile?.current_employer_designation}
                courseAuthor={featured?.course?.instructor?.first_name+ " " + featured?.course?.instructor?.last_name}
                coursePrice={featured?.course?.price}
                courseId={featured?.course?.id}
                courseImage={featured?.course?.course_cover_image}
              />

              )
             

            })
             
             }


                </Slider>



            ) }
            </>
         
             

          
       



        
      
        {/* </div> */}
      </div>
    </>
  );
};






CoursesSection.propTypes = {};

const mapStateToProps = (state) => ({});

export default connect(mapStateToProps, {})(CoursesSection);