import React, { Fragment, useEffect,useState} from "react";
import Navbar from "components/Navbar"  //old
import Footer from "components/Footer"
import WelcomeHero from "./HeroBanner";
import Notification from "./Notification";
import TopCourses from "./TopCourses";



import { getLearnerInfo } from "services/dashboard";

import { getWishlist } from "services/wishlist";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import Loader from "components/Loader/Loader";
import toast from "react-hot-toast";






import "./css/topitem.css"



const NewDashBoard = ({ auth: { user } }) => {

  const [info,setInfo] = useState({});
  const [wishlists,setWishlist] = useState({});
    const [loading, setLoading] = useState(true);

   useEffect(() => {
     (async function loadContent() {
       try {
         let res = await getLearnerInfo(user.id);
         let reswish =  []
         if(localStorage.getItem('wishes')){
            let reswish =  JSON?.parse(localStorage.getItem("wishes"))
             setWishlist({wishlists: reswish});
         }else{
            reswish  = await getWishlist();
            setWishlist({wishlists: reswish.data.data});

         }
            
         console.log(reswish)
    
         setInfo({...res.data.data});
         
       
       } catch (err) {
         toast.error("Error occured fetching notifications");
       }
        setLoading(false);
     })();
     // eslint-disable-next-line
   }, []);

   

    return (
      <Fragment>
       <Navbar />

       {loading ? (
                      <Loader width="70" />
                    ) : !loading ? (
                      <Fragment>
                        <div class="container" >

                            <WelcomeHero info={info} wishlists={wishlists} />
                            <TopCourses />
                            <Notification />            
                       </div>
                      </Fragment>
                    ) : (
                      <div class="container" >

                            <WelcomeHero info={info} wishlists={wishlists} />
                            <TopCourses />
                            <Notification />            
                       </div>
                    )}
     
       
       <Footer/>
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
