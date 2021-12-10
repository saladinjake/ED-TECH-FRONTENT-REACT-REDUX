import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
// import { addToWishlist } from "../api/wishlist.services";
import { connect } from "react-redux";
import { addToCart, fetchCourses } from "../redux/actions/cart.action";
//import { addToWishList } from "../redux/actions/wishlist.action";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
import $ from "jquery";
import { addToWishlist } from "../api/wishlist.services";
import moment from "moment";

import { enrollCourses } from "../api/enrollment.services";
import  {  MICROSERVICE_FRONT1, PRIVATE_KEY_ENCRYPTER_1 , PRIVATE_KEY_ENCRYPTER_2 } from "../api/api_config/constants"

let CryptoJS= require('crypto-js');

const querySearch = () => {
  const queryString = window.location.search;
  const parameters = new URLSearchParams(queryString);
  return parameters;
};


const CourseCard = ({
  courseTitle,
  courseDesc,
  courseAuthorCompany,
  courseAuthor,
  coursePrice,
  courseId,
  key,
  courseImage,
  courseBtnText,
  courseRating,
  courseCompletion,
  history,
  match,
  auth: { isAuthenticated, user },
  cart: { cart },
  wishList: { wishList },
  addToCart,
  //addToWishList,
  fetchCourses,
}) => {
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
<<<<<<< HEAD
    //const lmsFront = "http://lms.8aade.net/fd3a6e73-e95b-4199-990b-553f15218276"+ urlBits;
    const lmsFront =
      "http://lms.8aade.net/fd3a6e73-e95b-4199-990b-553f15218276";
    return lmsFront;
=======
    if(localStorage.getItem("lms_token")){
      const lms_token =  JSON.parse(localStorage.getItem("lms_token"));
      console.log(lms_token)
      var encrypted = CryptoJS.AES.encrypt(lms_token, PRIVATE_KEY_ENCRYPTER_1);
      var encrypted2 = CryptoJS.AES.encrypt(lms_token, PRIVATE_KEY_ENCRYPTER_2);
      //var decrypted = CryptoJS.AES.decrypt(encrypted, PRIVATE_KEY_ENCRYPTER_1);
     // var decrypted2 = CryptoJS.AES.decrypt(encrypted2, PRIVATE_KEY_ENCRYPTER_2);
       //console.log(encrypted.toString()=== encrypted2.toString());
// console.log(decrypted.toString());
     //console.log(decrypted.toString(CryptoJS.enc.Utf8)===decrypted2.toString(CryptoJS.enc.Utf8));

      urlBits+=`&token=${encrypted.toString()}&enroute=${encrypted2}` 
  
      console.log(urlBits); //34feb914c099df25794bf9ccb85bea72
  
      const lmsFront = MICROSERVICE_FRONT1 + urlBits;
      return lmsFront

    }else{
      toast.error("You cant access this course. please login")
    }
    
>>>>>>> 94bc4a3d34ff1e3b614446fe0e00059a417d74e6
  };

 
  function removeTags(str) {
    if (str.match(/(<([^>]+)>)/gi)) return str.replace(/(<([^>]+)>)/gi, "");
    else return str;
  }
  return (
    // <div className=""
    <div key={key} className="m-2 card border-radius-20 shadow-sm">
      <img
        src={courseImage}
        className="card-img-top fixed-height"
        alt="Course"
      />
      <div className="col-5 offset-7 bottom-left-radius-20 fw-bold text-center px-3 py-2 bg-grey text-white">
        <Link
          onClick={(e) => {
<<<<<<< HEAD
            e.preventDefault();
            window.location.href = redirectToLms(courseId);
=======
            e.preventDefault()
            //redirectToLms(courseId)
            window.location.href =redirectToLms(courseId)
>>>>>>> 94bc4a3d34ff1e3b614446fe0e00059a417d74e6
          }}
          to=""
          className="text-decoration-none text-white text-11"
        >
          {courseBtnText}
        </Link>
      </div>

      <div className="card-body">
        <h5 className="card-title text-11 fw-bold text-light-green shorten-text-1l">
          <Link
            to={``}
            className="text-decoration-none text-light-green"

            onClick={(e) => {
              e.preventDefault()
             // redirectToLms(courseId)
              window.location.href =redirectToLms(courseId)
            }}
          >
            {courseTitle}
          </Link>
        </h5>
        <h6 className="card-subtitle text-light-green shorten-text-2l title-height-35 mb-3">
          {removeTags(courseDesc)}
        </h6>
        <p className="text-14 shorten-text-1l m-0">{courseAuthorCompany}</p>
        <p className="text-14 shorten-text-1l">{courseAuthor}</p>
        {/* <p className="card-text">Martin Caulpepper</p> */}
        <div className="row border-top pt-2">
          <a
            href="#"
            className="border-end text-center text-11 fw-bold text-decoration-none text-success col q-text-link"
          >
            {courseCompletion}% completed
          </a>

          <a
            href="#"
            className="text-center fw-bold text-11 text-decoration-none text-dark col q-text-link"
          >
            {courseRating === "5" && (
              <>
                <i class="bi bi-star-fill"></i>&nbsp;
                <i class="bi bi-star-fill"></i>&nbsp;
                <i class="bi bi-star-fill"></i>&nbsp;
                <i class="bi bi-star-fill"></i>&nbsp;
                <i class="bi bi-star-fill"></i>
              </>
            )}
            {courseRating === "4" && (
              <>
                <i class="bi bi-star-fill"></i>&nbsp;
                <i class="bi bi-star-fill"></i>&nbsp;
                <i class="bi bi-star-fill"></i>&nbsp;
                <i class="bi bi-star-fill"></i>&nbsp;
              </>
            )}
            {courseRating === "3" && (
              <>
                <i class="bi bi-star-fill"></i>&nbsp;
                <i class="bi bi-star-fill"></i>&nbsp;
                <i class="bi bi-star-fill"></i>&nbsp;
              </>
            )}
            {courseRating === "2" && (
              <>
                <i class="bi bi-star-fill"></i>&nbsp;
                <i class="bi bi-star-fill"></i>&nbsp;
              </>
            )}
            {courseRating === "1" && (
              <>
                <i class="bi bi-star-fill"></i>&nbsp;
              </>
            )}
          </a>
        </div>
      </div>
    </div>
    // </div>
  );
};

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
  //addToWishList, //this is redux add to wishlist not synced with db
})(CourseCard);
