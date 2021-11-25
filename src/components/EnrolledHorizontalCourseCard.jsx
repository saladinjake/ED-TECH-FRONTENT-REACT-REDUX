import React,{ useState, useEffect} from "react";
// import { addToWishlist } from "../api/wishlist.services";
import { connect } from "react-redux";
import { addToCart, fetchCourses } from "../redux/actions/cart.action";
import toast from "react-hot-toast"
import PropTypes from "prop-types";
import $ from "jquery";



import { addToWishList } from "../redux/actions/wishlist.action";
import moment from "moment";

import { enrollCourses } from "../api/enrollment.services";


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
    if(str.match(/(<([^>]+)>)/ig))
      return str.replace( /(<([^>]+)>)/ig, '');
    else 
      return str
 }


const redirectToLms = (urlBits) => {

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
                  {courseTitle}
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
                      href={`${process.env.PUBLIC_URL}/course-detail/${courseId}`}
                    className="col mx-3 pt-1 btn btn-sm border-radius-50 btn-solid-warning"
                  >
                    Detail
                  </a>
                  <a
                    href=""
                     onClick={()=>{redirectToLms()}}
                    className="col btn mx-3 pt-1 btn-sm border-radius-50 btn-solid-light-green"
                  >
                    Go to course
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