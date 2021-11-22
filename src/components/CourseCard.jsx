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
    addToWishList,
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
            className="border-end text-center text-11 fw-bold text-decoration-none text-danger col q-text-link"
          >
            Details
          </a>
          <span
              onClick={(e)=> {addToMyWishList(e,courseId,courseTitle)}}
            className="border-end text-center text-11 fw-bold text-decoration-none text-warning col q-text-link"
          >
            Wishlist
          </span>
          <span
            onClick={(e)=> {handleAddToCart(e,courseId,coursePrice,courseTitle)}}
            className="text-center fw-bold text-11 text-decoration-none text-success col q-text-link"
          >
            Buy
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
  addToWishList,
})(CourseCard);
