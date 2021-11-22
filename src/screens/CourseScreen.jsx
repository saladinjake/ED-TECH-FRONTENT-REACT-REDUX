import React, { useState, useEffect } from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import "../assets/css/main.css";
import CourseHeader from "../components/CourseHeader";
import CourseDetail from "../components/CourseDetail";

import Loader from "../components/Loader";
import { getCourse, getCourses } from "../api/courses.services";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { fetchCourses, addToCart } from "../redux/actions/cart.action";
import { getAuthProfile } from "../api/learner.services";
import toast from "react-hot-toast";
// import { useHistory, useLocation } from "react-router-dom";
import { addToWishList } from "../redux/actions/wishlist.action";

import $ from "jquery";


import { enrollCourses } from "../api/enrollment.services";

const CourseScreen = ({
  history,
  match,
  auth: { isAuthenticated, user },
  cart: { cart },
  wishList: { wishList },
  addToCart,
  addToWishList,
  fetchCourses,
}) => {
  const [sortType, setSortType] = useState("grid");
  const handleSort = (sortType) => {
    setSortType(sortType);
  };




  // console.log(history.location.pathname)

  const lastLocation = history.location.pathname;

  const [coursedetails, setCourseDetails] = useState({});
  // eslint-disable-next-line
  const [status, setStatus] = useState("init");
  const [loading, setLoading] = useState(true);
  const [enrolledCourses, setEnrolledCourses] = useState([]);
  const [relatedCourses, setRelatedCourses] = useState([]);

  const [editClicked, setEditClicked] = useState(false);

  const handleAddToCart = async (e, courseId,price,courseName) => {
    e.preventDefault();
    if (price <= 0) {
      //automaitcally enroll
      let payload = [];
      let newObj = {};
      newObj.user_id = user?.id;
      newObj.course_id =courseId;
      payload.push(newObj);

      try {
        await enrollCourses({
          enrollments: payload,
        });
        toast.success(`Courses enrolled succesfully`);

        // setTimeout(() => {
        //   window.location.reload();
        // }, 2000);
      } catch (err) {
        toast.error(`Could not enroll for free course` + courseName);
      }
    } else {
      let paidCourseId = courseId;
      addToCart(courseId);
    }
  };

  
  const init = async () => {
    setStatus("loading");
    let courseId = parseInt(match.params.id);
    try {
      let response = await getCourse(courseId);
      setCourseDetails(response.data.data);

      

      setStatus("success");
    } catch (err) {
      setStatus("error");
    }
    setLoading(false);
  };

  useEffect(() => {
    (async function loadContent() {
      await init()
      await fetchCourses()

      // const lastLocation = useLocation();
    })();
    // eslint-disable-next-line
  }, []);

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



  return (
    <>
       <NavBar />
     {loading ? (
              <Loader width={"100"} />
            ) : (

      <>
          <CourseHeader
            pageTitle={coursedetails?.course_name}
            subHeading={coursedetails?.course_description}
            bgClass={"courses-banner-bg"}
            introVideoUrl={coursedetails?.introduction_video}
            by={coursedetails?.instructor?.first_name+""+coursedetails?.instructor?.last_name}
            language={coursedetails?.language?.english}

          />
          <CourseDetail overview={coursedetails.course_overview}
            prerequisite={coursedetails.prerequisite_course}
            outcome={coursedetails.outcomes}
            curricullum={coursedetails?.topics}
            instructors={coursedetails?.instructors}
            price={coursedetails?.price}
            enrollCourse={handleAddToCart}
            checkCourseStatus={checkCourseStatus}
            courseId={coursedetails?.id}
            courseName={coursedetails?.course_name}

             />

      </>

        )}



          <div className="my-auto border-top bg-green">
            <div className="container">
              <Footer />
            </div>
          </div>
    </>


  )
};





CourseScreen.propTypes = {
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
})(CourseScreen);