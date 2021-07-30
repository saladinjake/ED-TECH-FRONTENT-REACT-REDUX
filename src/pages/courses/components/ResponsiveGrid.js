import React, { Fragment, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Col, Row } from "react-bootstrap";
import Pagination from "./Pagination";
import "./filter.css";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { addToCart, fetchCourses } from "actions/cartActions";
import { getAuthProfile } from "services/learner.js";
import toast from "react-hot-toast";

import { addToWishList } from "actions/wishListActions";
import { useQuery } from "hooks/useQuery.js";
import "./rating.css";
import moment from "moment";
import { enrollCourses } from "services/enrollment.js";
import $ from "jquery";

import "./res-grid-size.css"
const ResponsiveGrids = ({
  allCourses,
  courses,
  auth: { isAuthenticated, user },
  cart: { cart },
  wishList: { wishList },
  addToCart,
  fetchCourses,
}) => {

  const [currentPage, setCurrentPage] = useState(1);
  const [coursePerPage] = useState(50);
  const [currentCourses, setCurrCourses] = useState([]);

  //added
  const [enrolledCourses, setEnrolledCourses] = useState([]);

  const [coursedetails, setCourseDetails] = useState({});
  // eslint-disable-next-line
  const [status, setStatus] = useState("init");
  const [loading, setLoading] = useState(true);

  // Get current course
  var indexOfLastCourse = currentPage * coursePerPage;
  var indexOfFirstCourse = indexOfLastCourse - coursePerPage;

  useEffect(() => {
    (async function loadContent() {
      await fetchCourses();
      // const lastLocation = useLocation();
    })();
    // eslint-disable-next-line
  }, []);

  const handleWishList = async (e, id) => {
    e.preventDefault();
    return await addToWishList(id);
  };

  useEffect(() => {
  	 $("body").css({"background-color":"#fff"})
    $(".dark")
      .find("p")
      .each(function () {
        $(this).css({ color: "#000", "font-family": "Open Sans" });
        // $("i").css({color:"#000"})
      });



    $(".info p,.info span,.info b").each(function () {
      $(this).css({ color: "#000", "font-family": "Open Sans" });
    });

    $(".product-view p").each(function () {
      $(this).css({ color: "#000", "font-family": "Open Sans" });
    });

    $(".product-view span").each(function () {
      $(this).css({ color: "#000", "font-family": "Open Sans" });
    });

    $(".found-item p, .found-item span, .found-item div, .found-item a").each(
      function () {
        $(this).css({ color: "#000", "font-family": "Open Sans" });
      }
    );
  });

  useEffect(() => {
    (async function CheckStatus() {
      if (isAuthenticated === true) {
        try {
          let res = await getAuthProfile();
          let enrolledCourses = res.data.data;

          let ids = enrolledCourses.map((course) => course.course.id);

          setEnrolledCourses([...ids]);

          console.log(ids);
        } catch (err) {
          toast.error(
            err?.response?.data?.message ||
              `Error occured fetching active courses`
          );
        }
        setLoading(false);
      }
    })();
    // eslint-disable-next-line
  }, []);

  const checkCourseStatus = (courseId) => {
    var check = false;
    if (enrolledCourses.length > 0) {
      check = enrolledCourses.includes(courseId);
    }
    console.log(`cehck for ${courseId} is ${check}`);
    return check;
  };

  useEffect(() => {
    if (allCourses.length > 0) {
      setCurrCourses(allCourses.slice(indexOfFirstCourse, indexOfLastCourse));
    } else {
      setCurrCourses([]);
    }
    // eslint-disable-next-line
  }, [allCourses]);

  // Change page
  const paginate = (pageNumber) => {
    setCurrentPage(pageNumber);
    indexOfLastCourse = pageNumber * coursePerPage;
    indexOfFirstCourse = indexOfLastCourse - coursePerPage;
    setCurrCourses(allCourses.slice(indexOfFirstCourse, indexOfLastCourse));
  };

  const handleAddToCart = async (e, course) => {
    e.preventDefault();
    console.log(course?.price);
    if (parseInt(course?.price) <= 0) {
      //automaitcally enroll
      let payload = [];
      let newObj = {};
      newObj.user_id = user?.id;
      newObj.course_id = course?.id;
      payload.push(newObj);

      try {
        await enrollCourses({
          enrollments: payload,
        });
        toast.success(`Free Course enrolled succesfully`);

        setTimeout(() => {
          window.location.reload();
        }, 2000);
      } catch (err) {
        toast.error(
          `Could not enroll you in for the free course: ` + course.course_name
        );
      }
    } else {
      let paidCourseId = course?.id;
      addToCart(course.id);
    }
  };
	return(
      <div className="page-dummy col-md-12">
           <h1>Courses</h1>
            <br/>

  <div className="archive-dummy">


   
      {currentCourses.length > 0 &&
        currentCourses.map((item, i) => {
          return (
			    <article className="article-dummy  article-dummy-product">
			    

                     
                  <figure className="dummy dummy-image">
                    <Link
                      to={
                        process.env.PUBLIC_URL +
                        "/courses/" +
                        item.id +
                        "/" +
                        item.slug
                      }
                      className="image-popup"
                      title="Screenshot-1"
                    >
                      {item.course_cover_image !== null ? (
                        <img
                          src={item.course_cover_image}
                          className="thumb-img imagemix"
                          alt="work-thumbnail"
                          style={{
                            width: "100%",
                            height: "100px",
                            borderBottom: "2px solid #000",
                          }}
                        />
                      ) : (
                        <Fragment />
                      )}{" "}
                      <div className="middle-overlay"></div>
                    </Link>
                  </figure>
                  <br/>

              {/*POP UP ON HOVER*/}


               <div
                    className="info-x full-width-mark card-box"
                    style={{ zIndex: 2147483647 + 900,  }}
                  >
                    <div
                      style={{ padding: "5px", color: "#000", width: "100%" }}
                    >
                      <div style={{ width: "100%", height: "50px" }}>
                        <img
                          src={item?.instructor?.image_url}
                          style={{
                            width: "50px",
                            height: "50px",
                            borderRadius: "50%",
                            float: "left",
                            marginRight: "10px",
                          }}
                        />

                        <div>
                          <h5
                            style={{
                                  width: "100%",
                                  fontSize: "14px",
                                  fontWeight: "small",
                                  color: "#000",
                                  marginLeft: "20px",
                                  fontFamily: "Open Sans",
                                }}
                          >
                            {item?.instructor?.first_name}{" "}
                            {item?.instructor?.last_name}
                          </h5>
                          <p
                            style={{
                                  width: "100%",
                                  marginTop: "4px",
                                  textTransform: "capitalize",
                                  fontWeight: "bold",
                                  color: "#000",
                                }}
                          >
                            {
                              item?.instructor?.instructor_profile
                                ?.current_employer_designation
                            }
                          </p>
                        </div>
                      </div>
                      <br />

                      <h4
                        className="stori-line"
                        style={{
                              fontSize: "25px",
                              lineHeight: "32px",
                              fontWeight: "600",
                              width: "100%",
                              color: "#000",
                              margin: "0 0 15px",
                            }}
                      >
                        {" "}
                        {item?.course_name}
                      </h4>

                      {/^/.test(item?.course_description) ? (
                        <p
                          className="course-subtitle dark"
                          style={{
                            fontFamily: "Open Sans",
                            color: "#000",
                            fontSize: "12px",
                          }}
                          dangerouslySetInnerHTML={{
                            __html:
                              item?.course_description?.substring(0, 100) +
                              "...",
                          }}
                        />
                      ) : (
                        <p
                          className="course-subtitle dark"
                          style={{
                            fontFamily: "Open Sans",
                            color: "#000",
                            fontSize: "12px",
                          }}
                        >
                          {item?.course_description.substring(0, 100) + "..."}
                        </p>
                      )}
                    </div>

                    <div
                      className="stm_lms_courses__single--info_meta style-8a"
                      style={{ marginBottom: "-10px" }}
                    >
                      <div className="stm_lms_course__meta style-8a">
                        <i
                          className="fa fa-signal "
                          style={{ marginRight: "4px", fontWeight:"bold"  }}
                        ></i>{" "}
                        Beginner
                      </div>
                      <div className="stm_lms_course__meta style-8a">
                        <i
                          className="fa fa-bars "
                          style={{ marginLeft: "4px", fontWeight:"bold"  }}
                        >
                          {item?.course?.learning_style}
                        </i>
                      </div>
                      <div className="stm_lms_course__meta style-8a">
                        <i
                          className="fa fa-clock "
                          style={{ marginLeft: "4px", fontWeight:"bold" }}
                        >
                          {item?.course?.duration} hrs
                        </i>
                      </div>
                    </div>

                    <div
                      className="stm_lms_courses__single--info_meta"
                      style={{ position: "absolute", bottom: "30px" }}
                    >
                      <div className="stm_lms_course__meta">
                        <a
                          style={{
                            background: "rgba(8,23,200)",
                            color: "#fff",
                          }}
                          href="#detailView"
                          onClick={() => {
                            window.location.href =
                              process.env.PUBLIC_URL + "/courses/" + item?.id;
                          }}
                          className="button-c button-rounded-right seedetail"
                        >
                          Detail
                        </a>
                      </div>
                      <div
                        className="stm_lms_course__meta"
                        style={{ marginLeft: "30px" }}
                      >
                        {isAuthenticated ? (
                          <a
                            href="#addTowishBox"
                            style={{ color: "#fff", background: "red" }}
                            className=" button-c button-rounded-top"
                            onClick={(e) => {
                              handleWishList(e, item);
                            }}
                          >
                            Wishlist
                          </a>
                        ) : (
                          <a
                            href="#loginRequired"
                            style={{ color: "#fff", background: "red" }}
                            className="button-c button-rounded-right modal-link"
                          >
                            Wishlist
                          </a>
                        )}
                      </div>
                      <div
                        className="stm_lms_course__meta"
                        style={{ marginLeft: "30px" }}
                      >
                        {isAuthenticated ? (
                          <a
                            href="#addTocart"
                            className="button-c button-rounded-left"
                            style={{
                              backgroundColor: "rgba(8,23,200)",
                              color: "#fff",
                            }}
                            onClick={(e) => {
                              handleAddToCart(e, item);
                            }}
                          >
                            Buy
                          </a>
                        ) : (
                          <a
                            href="#addTocart"
                            className="button-c button-rounded-left  modal-link"
                            style={{
                              backgroundColor: "rgba(8,23,200)",
                              color: "#fff",
                            }}
                          >
                            Buy
                          </a>
                        )}
                      </div>
                    </div>

                    <div
                      className="bottom-sect"
                      style={{
                        display: "table",
                        clear: "both",
                        height: "30px",
                      }}
                    >
                      <p
                        style={{
                          borderTop: "1px solid #000",
                          color: "#000",
                          display: "table",
                          position: "absolute",
                          bottom: "0px",
                          width: "86%",
                          padding: "10px",
                          fontSize: "10px",
                        }}
                      >
                        Reviews
                      </p>

                      <div
                        style={{
                          color: "#000",
                          position: "absolute",
                          bottom: "0px",
                          padding: "10px",
                          float: "right",
                          right: "0px",
                        }}
                      >
                        NGN{item?.price}
                      </div>
                    </div>
                  </div>





               {/*END POP UP ON HOVER*/}
			     

			      <p className="dummy"
                        style={{
                          width: "100%",
                          fontWeight: "bold",
                          lineHeight: "0px",
                          marginBottom: "7px",
                          fontFamily:"Open Sans",
                        }}
                      >
                        <Link
                          to={
                            process.env.PUBLIC_URL +
                            "/courses/" +
                            item.id +
                            "/" +
                            item.slug
                          }
                          style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                fontSize: "12px",
                                width: "100%",
                                color: "#000",
                                lineHeight: "20px",
                              }}
                        >
                          {item?.category?.name} >
                        </Link>
                      </p>

                      <p
                      className="dummy"
                        style={{
                              fontWeight: "700",
                              width: "100%",
                              fontFamily: "Open Sans",
                              fontSize: "12px",
                              color: "#000",
                              lineHeight: "20px",
                            }}
                      >
                        <Link
                          to={
                            process.env.PUBLIC_URL +
                            "/courses/" +
                            item.id +
                            "/" +
                            item.slug
                          }
                          style={{
                                fontWeight: "700",
                                fontFamily: "Open Sans",
                                color: "#000",
                                fontSize: "12px",
                                lineHeight: "20px",
                              }}
                         
                        >
                          {item?.course_code}
                        </Link>
                      </p>

                      <p
                      className="dummy"
                       style={{
                              width: "100%",
                              fontWeight: "bold",
                              marginTop: "3px",
                              color: "#000",
                              fontFamily:"Open Sans",
                            }}
                      >
                        <Link
                          to={
                            process.env.PUBLIC_URL +
                            "/courses/" +
                            item.id +
                            "/" +
                            item.slug
                          }
                          style={{
                                width: "100%",
                                marginTop: "2px",
                                color: "#000",
                                fontWeight: "bold",
                                fontFamily:"Open Sans",
                              }}
                              className=" style-8a"
                        >
                          {item.course_name.substring(0, 80) + "..."}
                        </Link>
                      </p>
                      <p
                        className="style-8a dummy"
                        style={{
                          color: "#000",
                          width: "100%",
                          marginTop: "4px",
                          fontFamily:"Open Sans",
                         
                      
                        }}
                      >
                        {
                          item?.instructor?.instructor_profile
                            ?.current_employer_designation
                        }
                      </p>

                      <p
                        className="style-8a dummy"
                        style={{
                          color: "#000",
                          width: "100%",
                        fontFamily:"Open Sans",
                      
                        }}
                      >
                        {item?.instructor?.first_name !== null &&
                          item?.instructor?.first_name +
                            " " +
                            item?.instructor?.last_name}
                      </p>
                      <br/><br/>

                      <div style={{
                        borderTop: "1px solid #000",
                        color: "#000",
                        display: "table",
                        marginTop:"-20px",
                        fontFamily:"Open Sans",
                       
                        width: "100%",
                        padding: "10px",
                        fontSize: "10px",
                      }}>
                    <p

                    className="pull-left"
                      style={{  fontSize: "10px",color:"#000",fontFamily:"Open Sans",}}
                    >
                      Course
                    </p>

                    <div
                      className="pull-right "
                    >
                      <Link
                        to={
                          process.env.PUBLIC_URL +
                          "/courses/" +
                          item.id +
                          "/" +
                          item.slug
                        }
                        style={{
                          fontSize: "10px",
                          width: "100%",
                          color: "#000",
                          borderRadius:"23px",
                          background:"#ccc",
                          padding:"6px",
                          fontFamily:"Open Sans",
                        }}
                        className="article-dummy"
                      >
                        Details
                      </Link>
                    </div>
                  </div>

			    </article>

          )

      })
     }
    
  </div>
</div>
	)
}



ResponsiveGrids.propTypes = {
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
  addToWishList,
  fetchCourses,
})(ResponsiveGrids);
