import React, { useState, useEffect } from "react";
// import { addToWishlist } from "../../api/wishlist.services";
import { connect } from "react-redux";
import { addToCart, fetchCourses } from "../../core/redux/actions/cart.action";
import toast from "react-hot-toast";
import PropTypes from "prop-types";
import $ from "jquery";
import { Base64 } from 'js-base64';
import { Link } from "react-router-dom";

import { addToWishList } from "../../core/redux/actions/wishlist.action";
import moment from "moment";

import { enrollCourses } from "../../api/enrollment.services";

import  {  PRIVATE_KEY_ENCRYPTER_1 , PRIVATE_KEY_ENCRYPTER_2, MICROSERVICE_FRONT1 } from "../../api/api_config/constants"

let CryptoJS= require('crypto-js');

const querySearch = () => {
  const queryString = window.location.search;
  const parameters = new URLSearchParams(queryString);
  return parameters;
};


const HorizontalCourseCard = ({
  courseTitle,
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
  courseRating,
  courseCompletion,
  courseBtnText,
  history,
  match,
  auth: { isAuthenticated, user },
  cart: { cart },
  wishList: { wishList },
  addToCart,
  addToWishList,
  fetchCourses,
}) => {
  // eslint-disable-next-line
  const [status, setStatus] = useState("init");
  const [loading, setLoading] = useState(true);
  // const [acloading, setAcLoading] = useState(false);
  // const [enrolledCourses, setEnrolledCourses] = useState([]);

  function removeTags(str) {
    if (str.match(/(<([^>]+)>)/gi)) return str.replace(/(<([^>]+)>)/gi, "");
    else return str;
  }



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
  function makeRandomId(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
   }
   return result;
}

  
  
const redirectToLms = (urlBits) => {
  if(localStorage.getItem("lms_token")){
    const lms_token =  JSON.parse(localStorage.getItem("lms_token"));
    let encrypted =  CryptoJS.AES.encrypt(lms_token, PRIVATE_KEY_ENCRYPTER_1);
    encrypted = Base64.encodeURI(encrypted); 
     let user_id =  JSON.parse(localStorage.getItem("lms_user_profile_id"));
    urlBits =`fd3a6e73-e95b-4199-990b-553f15218276/?${makeRandomId(10)}=${encrypted}&${makeRandomId(15)}=${user_id}`;
    const lmsFront = MICROSERVICE_FRONT1 + urlBits;
    return lmsFront

  }else{
    toast.error("You cant access this course. please login")
  }
  
};


  return (
    <>
      <div key={key} className="container d-none d-md-flex">
        <div className="card mb-5 border-radius-20 border mt-5">
          <div className="row g-0">
            <div className="col-md-5">
              <img
                src={courseImage}
                className="img-fluid rounded-start-20"
                alt="..."
                style={{ width: "100%", height: "100%" }}
              />
            </div>
            <div className="col-md-7 border-radius-20 d-flex align-items-center">
              <div className="card-body px-4">
                <h3 className="fw-bold text-18 text-light-green">
                  <Link
                    className="text-decoration-none text-light-green"
                    to={`${process.env.PUBLIC_URL}/course-detail/${courseId}`}
                  >
                    {courseTitle}
                  </Link>
                </h3>
                <h4 className="fw-bold text-14 text-light-green ">
                  {courseAuthor}
                </h4>
                <p className="card-text text-14">{removeTags(courseDesc)}</p>
                <p className="card-text text-13 text-green  ">
                  {courseCompletion}% completed
                </p>
                <div className="row border-top pt-4">
                  <p className="col text-12">
                    {" "}
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
                  </p>
                  <p className="col text-12">{learningLang}</p>
                  <p className="col text-12">{learningLevel} </p>
                  <a
                    href=""
                    className="col mx-3 pt-1 btn btn-sm border-radius-50 btn-solid-green"
                  >
                    <Link
                      // to={courseBtnLink}
                     onClick={(e) => {
            e.preventDefault()
           // window.location.href =redirectToLms(courseId)
          }}
          to=""
                      className="text-decoration-none text-white text-11"
                    >
                      {courseBtnText}
                    </Link>
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
