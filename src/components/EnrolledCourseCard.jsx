import React,{ useState, useEffect} from "react";

// import { addToWishlist } from "../api/wishlist.services";
import { connect } from "react-redux";
import { addToCart, fetchCourses } from "../redux/actions/cart.action";
//import { addToWishList } from "../redux/actions/wishlist.action";
import toast from "react-hot-toast"
import PropTypes from "prop-types";
import $ from "jquery";


import { addToWishlist } from "../api/wishlist.services"

import moment from "moment";

import { enrollCourses } from "../api/enrollment.services";

const CourseCard = ({
  courseTitle,
  courseDesc,
  courseAuthorCompany,
  courseAuthor,
  coursePrice,
  courseId,
  key,
  courseImage,


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

  const redirectToLms = (urlBits) => {

  }

 

  function removeTags(str) {
    if(str.match(/(<([^>]+)>)/ig))
      return str.replace( /(<([^>]+)>)/ig, '');
    else 
      return str
 }
  return (
    // <div className="">
    <div key={key} className="m-2 card border-radius-20 shadow-sm">
      <img  src={courseImage} className="card-img-top fixed-height" alt="Course" />
      <div className="col-4 offset-8 bottom-left-radius-20 fw-bold text-center p-2 bg-grey text-white">
        N{coursePrice}
      </div>

      <div className="card-body">
        <h5 className="card-title text-11 fw-bold text-light-green shorten-text-1l">
          {courseTitle}
        </h5>
        <h6  className="card-subtitle text-light-green shorten-text-2l title-height-35 mb-3"
         
        >
         {removeTags(courseDesc)}
        </h6>
        <p className="text-14 shorten-text-1l m-0">{courseAuthorCompany}</p>
        <p className="text-14 shorten-text-1l">{courseAuthor}</p>
        {/* <p className="card-text">Martin Caulpepper</p> */}
        <div className="row border-top pt-2">
          <a
            href={`${process.env.PUBLIC_URL}/course-detail/${courseId}`}
            className="fake-cursor border-end text-center text-11 fw-bold text-decoration-none text-danger col q-text-link"
          >
            Details
          </a>
          
          <span
            onClick={()=>{redirectToLms()}}
            className="fake-cursor text-center fw-bold text-11 text-decoration-none text-success col q-text-link"
          >
            Go to course
          </span>
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
