import React,{ useState, useEffect} from "react";
// import { addToWishlist } from "../api/wishlist.services";
import { connect } from "react-redux";
import { addToCart, fetchCourses } from "../../core/redux/actions/cart.action";
import toast from "react-hot-toast"
import PropTypes from "prop-types";
import $ from "jquery";



import { addToWishList } from "../../core/redux/actions/wishlist.action";
import moment from "moment";

import { enrollCourses } from "../../api/enrollment.services";


import  {  PRIVATE_KEY_ENCRYPTER_1 , PRIVATE_KEY_ENCRYPTER_2 } from "../../api/api_config/constants"

let CryptoJS= require('crypto-js');

const querySearch = () => {
  const queryString = window.location.search;
  const parameters = new URLSearchParams(queryString);
  return parameters;
};


const HorizontalCourseCard = ({
  courseCode,
  courseName,
  courseDesc,
  courseAuthorCompany,
  courseAuthor,
  coursePrice,
  courseId,
  key,
  courseImage,
  learningStyle,
  learningLang,
  learningLevel,



  history,
    match,
    auth: { isAuthenticated, user },
    cart: { cart },
    wishList: { wishList },
    addToCart,
    addToWishList,
    fetchCourses,

}) => {


    /**hello tobi pls use this code to decrypt your request*/
    const lmsDecrypt =() =>{
 

      let search = querySearch()
      let token =  search.get("token");
      let user_val =search.get("enroute");
      var decrypted = CryptoJS.AES.decrypt(token, PRIVATE_KEY_ENCRYPTER_1);
      var decrypted2 = CryptoJS.AES.decrypt(user_val, PRIVATE_KEY_ENCRYPTER_2);
      if(decrypted.toString(CryptoJS.enc.Utf8)===decrypted2.toString(CryptoJS.enc.Utf8)){
         //you can now process the token access grant to the user
      }else{
         //redirect back to the enrollment home page
      }
    }
  
    const redirectToLms = (urlBits) => {
      if(localStorage.getItem("lms_token")){
        const lms_token =  JSON.parse(localStorage.getItem("lms_token"));
    
         let encrypted = Base64.encodeURI(lms_token); 
         let user_id =  JSON.parse(localStorage.getItem("lms_user_profile_id"));
        urlBits =`fd3a6e73-e95b-4199-990b-553f15218276/?course_findings=${encrypted}&reloaded_data=${user_id}`;
        const lmsFront = MICROSERVICE_FRONT1 + urlBits;
        return lmsFront
  
      }else{
        toast.error("You cant access this course. please login")
      }
      
    };



// eslint-disable-next-line
  const [status, setStatus] = useState("init");
  const [loading, setLoading] = useState(true);
  // const [acloading, setAcLoading] = useState(false);
  // const [enrolledCourses, setEnrolledCourses] = useState([]);

  // useEffect(() => {
  //   (async function loadContent() {
  //     await fetchCourses();

  //     // const lastLocation = useLocation();
  //   })();
  //   // eslint-disable-next-line
  // }, []);

  const addToMyWishList = async (e,id,courseTitle) => {
    e.preventDefault()
    setStatus("loading");
    if(!isAuthenticated){
      toast.error("Authentication is required. Please Login to continue.")
     return false
    }
    try {
      await addToWishList(id);
      setStatus("Course Added to wishlist");
      toast.success("Course Added to wishlist");
    } catch (err) {
      setStatus("Could not add course to wish list");
      toast.error(
          `Could not add the course  ` + courseTitle+" to wish list"
        );
    }
    setLoading(false);
  };

  const handleAddToCart = async (e, courseId,price,courseTitle) => {
    e.preventDefault();
    if(!isAuthenticated){
      toast.error("Authentication is required. Please Login to continue.")
     return false
    }
    if (parseInt(price) <= 0) {
      //automaitcally enroll
      let payload = [];
      let newObj = {};
      newObj.user_id = user?.id;
      newObj.course_id = courseId;
      payload.push(newObj);

      try {
        await enrollCourses({
          enrollments: payload,
        });
        toast.success(`Free Course enrolled succesfully`);

        // setTimeout(() => {
        //   window.location.reload();
        // }, 2000);
      } catch (err) {
        toast.error(
          `Could not enroll you in for the free course: ` + courseTitle
        );
      }
    } else {
      let paidCourseId = courseId;
      addToCart(paidCourseId);
    }
  };

  function removeTags(str) {
    if(str.match(/(<([^>]+)>)/ig))
      return str.replace( /(<([^>]+)>)/ig, '');
    else 
      return str
 }

  return (
    <>
      <div key={key} className="container d-none d-md-flex">
        <div className="card mb-5 border-radius-20 border mt-5">
          <div className="row g-0">
            <div className="col-md-5" style={{backgroundImage: `url(${courseImage})`,backgroundSize:"cover",backgroundRepeat:"no-repeat"}}>
              
              {/*<img
                src={courseImage}
                className="img-fluid rounded-start-20"
                alt="..."
                style={{ width: "100%",height:"100%" }}
              />*/}
              
            </div>
            <div className="col-md-7 border-radius-20 d-flex align-items-center">
              <div className="card-body px-4">
                <div className="position-absolute top-0 end-0 col top-right-radius-20 fw-bold text-center p-2 text-13 bg-grey text-white">
                  {coursePrice}
                </div>
                <h3 className="fw-bold text-18 text-light-green  mt-4">
                  {courseName /**removeTags(courseDesc)*/}
                </h3>
                <h4 className="fw-bold text-14 text-light-green ">
                  {courseAuthor}
                </h4>
                <p className="card-text text-14">{removeTags(courseDesc)}</p>
                <div className="row border-top pt-4">
                  <p className="col text-12">{learningStyle}</p>
                  <p className="col text-12">{learningLang}</p>
                  <p className="col text-12">{learningLevel} </p>
                  <a
                      onClick={(e)=> {addToMyWishList(e,courseId,courseName)}}
                    className="col mx-3 pt-1 btn btn-sm border-radius-50 btn-solid-warning"
                  >
                    Wishlist
                  </a>
                  <a
                    href=""
                     onClick={(e)=> {handleAddToCart(e,courseId,coursePrice,courseName)}}
                    className="col btn mx-3 pt-1 btn-sm border-radius-50 btn-solid-light-green"
                  >
                    Buy
                  </a>

                
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="container d-md-none my-5">
        <div className="card text-white border-radius-20 overflow-hidden">
          <div style={{ height: "auto", width: "100%", overflow: "hidden" }}>
            <img
              src="/partnerWithUs-mobile.png"
              className="card-img-top img-fluid"
              alt="Coaches-img"
            />
          </div>
          <div className="card-body bg-green-gradient p-4">
            <h5 className="card-heading ">Partner With Us</h5>
            <p className="card-text">For Business</p>
            <p className="card-text text-14">
              Using our courses as it is or customized, or using our platform
              for your own internal courses, our aim is to help you create
              essential skills pathways with verifiable and stackable
              credentials to upskill and train every employee with the highest
              quality eLearning experiences in today’s most wanted job relevant
              subject areas.
            </p>
            <a href="#" className="btn btn-light border-radius-50 btn-sm">
              Read more
            </a>
          </div>
        </div>
      </div>
    </>
  );
};




HorizontalCourseCard.propTypes = {
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
})(HorizontalCourseCard);