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
              {currentCourses.length > 0 && currentCourses.map((item, i) => {
                return(

                   <Fragment  key={item.id}>


<Col md="4">
  <div class="product" style={{height:"300px"}}>
                            <figure>
                                <Link
                                                to={process.env.PUBLIC_URL+ "/courses/" + item.id + "/" + item.slug}
                                                className="image-popup"
                                                title="Screenshot-1"
                                              >
                                                {item.course_cover_image !== null ? (
                                                  <img
                                                    src={item.course_cover_image}
                                                    className="thumb-img imagemix"
                                                    alt="work-thumbnail"
                                                    style={{ width: "100%", height: "auto" }}
                                                  />
                                                ) : (
                                                  <Fragment />
                                                )}{" "}
                                                <div className="middle-overlay"></div>
                                              </Link>
                                </figure>

                                <div class="product-description">
                            
                                  <div class="info">
                                    
                                    <p style={{height:"50px", color:"blue"}}>
                                      
                                          <Link
                                            to={ process.env.PUBLIC_URL+ "/courses/" + item.id + "/" + item.slug}
                                            style={{ fontSize: "14px" }}
                                            className="text-dark"
                                          >
                                            {item.course_name}
                                          </Link>
                                     
                                    
                                    </p>
                                    <p>A course by {item?.instructor?.user?.first_name !== null &&
                             item?.instructor?.user?.first_name  +" " + item?.instructor?.user?.last_name}</p>

                                  </div>

                                  <div class="priceX">
                                    {""}
                                  </div>
                                </div>

       

                                  
                        </div>

        </Col>        
              </Fragment>


                  )

              }) }
              </Fragment>

  )
              

     
 
  
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
