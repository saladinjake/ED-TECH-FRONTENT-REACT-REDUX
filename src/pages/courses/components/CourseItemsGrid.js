import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Col } from "react-bootstrap";
import Pagination from "./Pagination";
import "./filter.css";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addToCart } from "actions/cartActions";
import { getAuthProfile } from "services/learner.js";
import toast from "react-hot-toast";

import { addToWishList } from "actions/wishListActions";


function CourseItemGrid({
  allCourses,
  courses,
  auth: { isAuthenticated },
  cart: { cart },
  wishList: { wishList },
  addToCart,
}) {
  const [currentPage, setCurrentPage] = useState(1);
  const [coursePerPage] = useState(50);
  const [currentCourses, setCurrCourses] = useState([]);

  //added
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const [coursedetails, setCourseDetails] = useState({});
  // eslint-disable-next-line
  const [status, setStatus] = useState("init");
  const [loading, setLoading] = useState(true);

  // Get current course
  var indexOfLastCourse = currentPage * coursePerPage;
  var indexOfFirstCourse = indexOfLastCourse - coursePerPage;

  //added

  console.log(wishList)

  useEffect(() => {
    (async function CheckStatus() {
      if (isAuthenticated === true) {
        try {
          let res = await getAuthProfile();
          let enrolledCourses = res.data.data;

          let ids = enrolledCourses.map((course) => course.course.id);

          setEnrolledCourses([...ids]);

          console.log(ids);
        } catch (err) {
          toast.error(
            err?.response?.data?.message ||
              `Error occured fetching active courses`
          );
        }
        setLoading(false);
      }
    })();
    // eslint-disable-next-line
  }, []);

  const checkCourseStatus = (courseId) => {
    var check = false;
    if (enrolledCourses.length > 0) {
      check = enrolledCourses.includes(courseId);
    }
    console.log(`cehck for ${courseId} is ${check}`);
    return check;
  };

  useEffect(() => {
    if (allCourses.length > 0) {
      setCurrCourses(allCourses.slice(indexOfFirstCourse, indexOfLastCourse));
    } else {
      setCurrCourses([]);
    }
    // eslint-disable-next-line
  }, [allCourses]);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    indexOfLastCourse = pageNumber * coursePerPage;
    indexOfFirstCourse = indexOfLastCourse - coursePerPage;
    setCurrCourses(allCourses.slice(indexOfFirstCourse, indexOfLastCourse));
  };

  return (
    <Fragment>
      {currentCourses.length > 0 ? (
        <Fragment>
        <div class="category-course-list">
                    <ul>
          {currentCourses.map((data, i) => {
            
            return (
             

              

        <li>
        <div class="course-box-2">
            <div class="course-image">
                <a href={`${process.env.PUBLIC_URL}/courses/${data.id}`}>
                    <img style={{height:"180px"}} src={`${data.course_cover_image}`} alt="" class="img-fluid" />
                </a>
            </div>
            <div class="course-details">
                <a href={`${process.env.PUBLIC_URL}/courses/${data.id}`} class="course-title">{data.course_name}</a>
                <a href={`${process.env.PUBLIC_URL}/courses/${data.id}`} class="course-instructor">
                    <span class="instructor-name">{data.instructor.user.first_name} {data.instructor.user.last_name}</span>
                </a>
                <div class="course-subtitle">
                    {data.course_description}</div>
                <div class="course-meta">
                    <span class=""><i class="fa fa-play-circle"></i>
                       {data.learning_style}                   </span>
                    <span class=""><i class="fa fa-clock"></i>
                                           </span>
                    <span class=""><i class="fa fa-closed-captioning"></i>{data.language.english}</span>
                    <span class=""><i class="fa fa-level-up"></i>Level</span>
                </div>
            </div>
            <div class="course-price-rating">
                <div class="course-price">
                                            <span class="current-price">NGN {data.price}</span>
                                    </div>
                <div class="rating">
                             <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <i class="fa fa-star"></i>
                              <span class="d-inline-block average-rating">0</span>
                </div>
                <div class="rating-number">0 Ratings </div>
            </div>
        </div>
    </li>
    

               
            );
          })}
           </ul>
                                    </div>
        </Fragment>

      ) : (
        <p>No courses yet.</p>
      )}

      <Col md="12" className="text-center">
        <Pagination
          coursePerPage={coursePerPage}
          totalCourses={allCourses}
          // totalCourses={courses}
          paginate={paginate}
          currentPage={currentPage}
        />
      </Col>

    </Fragment>
  );
}

// export default CourseItemGrid;

CourseItemGrid.propTypes = {
  cart: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addToCart: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.cart,
  auth: state.auth,
  wishList:state.wishList

});

export default connect(mapStateToProps, {
  addToCart,
  addToWishList
})(CourseItemGrid);
