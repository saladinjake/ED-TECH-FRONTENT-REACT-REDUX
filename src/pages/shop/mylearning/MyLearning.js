import React, {Fragment, useEffect,useState} from "react";
// import NewHeader from "../newdashboard/NewHeader";
import Navbar from "components/Navbar";
import CourseTab from './tabsection/CourseTab'
import MyLearningContainer from './tabsection/Tab';
import CourseGrid from "./formboxsection/CourseGrid"
import Footer from "components/Footer"


import { getLearnerInfo } from "services/dashboard";



import PropTypes from "prop-types";
import { connect } from "react-redux";
// import Loader from "components/Loader/Loader";
import toast from "react-hot-toast";
import Sidebar from "../newdashboard/Sidebar";

import "../newdashboard/assets/css/bootstrap.min.css";
import "../newdashboard/assets/css/core.css";
import "../newdashboard/assets/css/components.css";
import "../newdashboard/assets/css/icons.css";
import "../newdashboard/assets/css/pages.css";
import "../newdashboard/assets/css/responsive.css";




const NewDashBoard = ({ auth: { user } ,match}) => {

  const [loading,setLoading] = useState(true);
 
  const [info,setInfo] = useState({});
  const [wishlists,setWishlist] = useState({});
  const [courseList,setPaginatedCourses] = useState({})

   useEffect(() => {
     (async function loadContent() {
       try {
         // console.log("alot of api request"
       } catch (err) {
         toast.error("Error occured fetching notifications");
       }
      //  setLoading();
     })();
     // eslint-disable-next-line
   }, []);

    return (
      <Fragment>
           <div className="wrapper">{ /* the transformer for different ui design*  col-md-10*/}
               <div className="content-page ">
                     {/*   <NewHeader /> */}
                  <Navbar />

                 
                  <MyLearningContainer match={match} />     

               </div>  
              

           </div>
<Sidebar/>
 <Footer />
        <footer class="footer text-right">
                    © 2021. All rights reserved.
                </footer> 
          </Fragment>
    );
}


NewDashBoard.propTypes = {
  auth: PropTypes.object.isRequired
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {  })(NewDashBoard);
// export default DashBoard;
