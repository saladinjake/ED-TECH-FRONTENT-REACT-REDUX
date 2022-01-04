import React , { useState, useEffect} from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import DashboardPageHeader from "../components/DashboardPageHeader";
import QuickMenus from "../components/QuickMenus";
import CoursesSection from "../components/CoursesSection";
import Notifications from "../components/Notifications";


import { getLearnerInfo } from "../../api/dashboard.services";

import { getWishlist } from "../../api/wishlist.services";
import { getAuthProfile } from "../../api/learner.services";
import { getNotifications } from "../../api/notification.services";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import Loader from "../components/Loader";
import toast from "react-hot-toast";

const redirectUnAuthorized = () =>{
  //toast.error("Unauthorized access.please login")
  return window.location.href=process.env.PUBLIC_URL+"/"
}
const DashbaordScreen = ({ auth: { user } }) => {
  //alert(user.roles[0].name)


  const [info, setInfo] = useState({});
  const [wishlists, setWishlist] = useState(0);
  const [loading, setLoading] = useState(true);
  const [coursesActive, setCoursesActive] = useState([]);
  const [upcomingcourses,setUpcomingCourses] = useState([])
  const [profileUrl,setProfileUrl]= useState("/learner/profile")
  const [notifications, setNotifications] = useState([]);
  

  const isDistantFuture = (date, seconds = 0) => {
    // number of milliseconds tolerance (i.e. 60000 == one minute)
    return date.getTime() > Date.now() + seconds;
  };
  let urlLink =""
   //user must be logged in to see this page
   if(user){
     if( user.roles[0].name=="Instructor"){
       urlLink = "/instructor/profile"

     }else{
       urlLink ="/learner/profile"
     }
   }else{
     //show some un authorized page

     redirectUnAuthorized();
   }

   useEffect(() => {
    (async function loadContent() {
      try {

          setProfileUrl(urlLink)

        let courseRes = await getAuthProfile();

       // console.log(courseRes)

       let res = await getNotifications();
      setNotifications([...res.data.data]);

       //alert(JSON.stringify(notifications))



        let enrolledCourses = courseRes.data.data;
        let allcoursesFetched = enrolledCourses;

        /*Active courses*/

        let activecoursesFetched = allcoursesFetched.filter((course) => {
          var requestedDateToStart = new Date(course.course.start_date);
          return !isDistantFuture(requestedDateToStart); // &&  (today.getMonth() == requestedDateToStart.getMonth() && today.getFullYear()+1 >= requestedDateToStart.getFullYear()+1)
        });

        let totalActiveCourses = activecoursesFetched;
        //console.log(totalActiveCourses)
        setCoursesActive([...totalActiveCourses]);
    

        /*upcoming courses*/
        const upcomingcoursesBatch = allcoursesFetched.filter((course) => {
            console.log(course.course.start_date);
            var requestedDateToStart = new Date(course.course.start_date);

            course["set_status"] = "Upcoming";

            return isDistantFuture(requestedDateToStart);
          });
        setUpcomingCourses([...setUpcomingCourses])

          const completedcourses = allcoursesFetched.filter((course) => {
            // var requestedDateToStart = course.course.status
            // course["set_status"] ="Completed"
            // return "Completed" === requestedDateToStart;
            return [];
          });

      } catch (err) {
        //toast.error("Error occured fetching notifications");
      }
      setLoading(false);
    })();
    // eslint-disable-next-line
  }, []);


  return (
    <>
      <NavBar />
      <DashboardPageHeader
        welcomeTitle={`Hey, ${user.first_name}  ${user.last_name}`}
        welcomeSubtitle="Welcome back to your questense dashboard.
        You can continue your learning path by exploring 
        our pages"
        btnTitle="Explore my courses"
        bgClass="courses-banner-bg"
        
        activeCourses={coursesActive}
        upcomingCourses={upcomingcourses}
        completedCourses={[]}
      />
      <QuickMenus 
       profileUrl={urlLink}
       profilePercent={30}
      />
      <CoursesSection />
      <Notifications notifications={notifications} limit={8}/>
      <Footer />
    </>
  );
};

 DashbaordScreen.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})( DashbaordScreen);
