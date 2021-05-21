import React, { Fragment, useEffect, useState } from "react";
import InstructorNavBar from "components/Navbar/InstructorNavbar";
import Footer from "components/Footer";
import WelcomeHero from "./HeroBanner";
import Notification from "./Notification";
import TopCourses from "./TopCourses";

import { getLearnerInfo } from "services/dashboard";

import { getWishlist } from "services/wishlist";
import { getAuthProfile } from "services/learner"
import { getInstructorInfo } from "services/dashboard";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import Loader from "components/Loader/Loader";
import toast from "react-hot-toast";

import "./css/topitem.css";

const NewDashBoard = ({ auth: { user } }) => {
  const [info, setInfo] = useState({});
    const [infoInstructor, setInfoInstructor] = useState({});
  const [wishlists, setWishlist] = useState(0);
  const [loading, setLoading] = useState(true);
  const [coursesActive,setCoursesActive] = useState(0);

  const isDistantFuture = (date, seconds = 0) => {
    // number of milliseconds tolerance (i.e. 60000 == one minute)
    return date.getTime() > Date.now() + seconds;
  };

  
  


  useEffect(() => {
    (async function loadContent() {
      try {
        let res = await getLearnerInfo(user.id);
        let   courseRes = await getAuthProfile(); 

         let res2 = await getInstructorInfo();
        setInfoInstructor({ ...res2.data.data }); 
          
        let enrolledCourses = courseRes.data.data;
        let allcoursesFetched = enrolledCourses;

        let activecoursesFetched = allcoursesFetched.filter((course) => {
          console.log(course.start_date);
          var requestedDateToStart = new Date(course.course.start_date);

          return !isDistantFuture(requestedDateToStart); // &&  (today.getMonth() == requestedDateToStart.getMonth() && today.getFullYear()+1 >= requestedDateToStart.getFullYear()+1)
        });

       let totalActiveCourses = activecoursesFetched.length;
       setCoursesActive(totalActiveCourses)

      
      let reswish = [];
      const cachedWishlist = localStorage && JSON?.parse(localStorage.getItem("wishes"));
       
      let wishListedItems = cachedWishlist ? cachedWishlist : [];
      
      if (localStorage.getItem("wishes")) {
        wishListedItems = wishListedItems ;
      }else{
         wishListedItems =  [] ;
      }

      setWishlist(wishListedItems.length);

        // console.log(reswish);

        console.log(res.data.data )

        setInfo({ ...res.data.data });
      } catch (err) {
        toast.error("Error occured fetching notifications");
      }
      setLoading(false);
    })();
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <InstructorNavBar />

      {loading ? (
        <Loader width="70" />
      ) : !loading ? (
        <Fragment>
          <div className="container">
            <WelcomeHero info={info}
                         infoInst={infoInstructor} 
                         wishlists={wishlists}
                         activeCoursesTotal={coursesActive}
             />
           {/*<TopCourses />*/}
            <Notification />
          </div>
        </Fragment>
      ) : (
        <div class="container">
          <WelcomeHero info={info} wishlists={wishlists} />
          {/*<TopCourses />*/}
          <Notification />
        </div>
      )}

      <Footer />
    </Fragment>
  );
};

NewDashBoard.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(NewDashBoard);
// export default DashBoard;
