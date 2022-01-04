import React, { useState, useEffect } from 'react';

import { connect } from "react-redux";
import { addToCart, fetchCourses } from "../../../redux/actions/cart.action";

import PropTypes from "prop-types";
import $ from "jquery";

import toast from "react-hot-toast";

import { addToWishList } from "../../../redux/actions/wishlist.action";
import moment from "moment";

import { enrollCourses } from "../../../api/enrollment_services/enrollment.services";


const CourseCard = (props) => {

    const {
    history,
    match,
    auth: { isAuthenticated, user },
   cart: { cart },
    wishList: { wishList },
    addToCart,
    addToWishList,
    fetchCourses,
  } = props;




  //     const [coursedetails, setCourseDetails] = useState({});
  // eslint-disable-next-line
  const [status, setStatus] = useState("init");
  const [loading, setLoading] = useState(true);
  // const [acloading, setAcLoading] = useState(false);
  // const [enrolledCourses, setEnrolledCourses] = useState([]);

  const addToMyWishList = async (id) => {
    setStatus("loading");
    console.log(id);
    try {
      await addToWishList(id);
      setStatus("Course Added to wishlist");
    } catch (err) {
      setStatus("Could not add course to wish list");
    }
    setLoading(false);
  };


  const handleWishList = async (e, id) => {
    e.preventDefault();
    return await addToWishList(id);
  };



  const handleAddToCart = async (e, course) => {
    e.preventDefault();
    console.log(course?.price);
    if (parseInt(course?.price) <= 0) {
      //automaitcally enroll
      let payload = [];
      let newObj = {};
      newObj.user_id = user?.id;
      newObj.course_id = course?.id;
      payload.push(newObj);

      try {
        await enrollCourses({
          enrollments: payload,
        });
        toast.success(`Free Course enrolled succesfully`);

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (err) {
        toast.error(
          `Could not enroll you in for the free course: ` + course.course_name
        );
      }
    } else {
      let paidCourseId = course?.id;
      addToCart(course.id);
    }
  };



    const { detail } = props;
    const {
        id,
        course_cover_image
    } =detail?.course
    const {
        first_name,last_name
    } = detail?.course?.instructor;

    const {
        previous_institutions
    } = detail?.course?.instructor?.instructor_profile
  





  

    return (
        
            // <div className="">
                <div className="m-2 card border-radius-20 shadow-sm">
                    <img   src={course_cover_image} className="card-img-top" alt="..." /> 
                    <div className="col-4 offset-8 bottom-left-radius-20 fw-bold text-center p-2 bg-grey text-white">{detail?.course?.price || "Free Course"}</div>
                        
                    <div className="card-body">
                    
                        <h5 className="card-title text-light-green">{detail.course.course_code}</h5>
                        <h6 className="card-subtitle text-light-green">{detail.course.course_name}</h6>
                        <p className="mt-2 text-14">{previous_institutions}<br/>{first_name + " " + last_name}</p>
                        {/* <p className="card-text">Martin Caulpepper</p> */}
                        <div className="row border-top pt-2">
                            <a href={`${process.env.PUBLIC_URL}/course/${id}`} className="border-end text-center fw-bold text-decoration-none text-danger col q-text-link">See Details</a>
                            

                              {isAuthenticated ? (
                           

                            <a onClick={(e) => {
                                handleWishList(e, id);
                              }} href="#" className="border-end text-center fw-bold text-decoration-none text-warning col q-text-link">Wishlist</a>

                          ) : (
                            <a href="#" className="border-end text-center fw-bold text-decoration-none text-warning col q-text-link modal-link">Wishlist</a>

                          )}


                            

                            {isAuthenticated ? (
                            

                            <a onClick={(e) => {
                                handleAddToCart(e, detail?.course);
                              }} href="#" className="text-center fw-bold text-decoration-none text-success col q-text-link">Buy</a>
                          ) : (
                            <a href="#" className="text-center fw-bold text-decoration-none text-success col q-text-link modal-link">Buy</a>
                          )}
                            
                        </div>
                    </div>
                </div>
            // </div> 
        
     );
}
 



CourseCard.propTypes = {
  cart: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addToCart: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.cart,
  auth: state.auth,
  wishList: state.wishList,
});

export default connect(mapStateToProps, {
  addToCart,
  fetchCourses,
  addToWishList,
})(CourseCard);