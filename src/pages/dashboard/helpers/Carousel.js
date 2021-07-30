import React, { useEffect, useState, Fragment } from "react";
import "./carousel.css";
import "../css/overview.css";
import "./wishlist.css";
import { Link } from "react-router-dom";
// import { addToWishlist } from "services/wishlist";
import { connect } from "react-redux";
import { addToCart, fetchCourses } from "actions/cartActions";

import PropTypes from "prop-types";
import $ from "jquery";

import toast from "react-hot-toast";

import { addToWishList } from "actions/wishListActions";
import moment from "moment";

import { enrollCourses } from "services/enrollment.js";


import { Container, Row, Col } from "react-bootstrap";
import Swiper from "react-id-swiper";
import { Styles } from "components/styles/courseSlider.js";


function isElementOutViewport(el) {
  // var parent = el.parentNode.parentElement,
  //   parentComputedStyle = window.getComputedStyle(parent, null),
  //   parentBorderTopWidth = parseInt(parentComputedStyle.getPropertyValue('border-top-width')),
  //   parentBorderLeftWidth = parseInt(parentComputedStyle.getPropertyValue('border-left-width')),
  //   overTop = el.offsetTop - parent.offsetTop < parent.scrollTop,
  //   overBottom = (el.offsetTop - parent.offsetTop + el.clientHeight - parentBorderTopWidth) > (parent.scrollTop + parent.clientHeight),
  //   overLeft = el.offsetLeft - parent.offsetLeft < parent.scrollLeft,
  //   overRight = (el.offsetLeft - parent.offsetLeft + el.clientWidth - parentBorderLeftWidth) > (parent.scrollLeft + parent.clientWidth),
  //   alignWithTop = overTop && !overBottom;
  //   console.log(el.offsetLeft,parent.offsetLeft)
  //   if(overRight){
  //     alert("way over right")
  //   }
  //   if(overLeft){
  //     alert("way over left")
  //   }
}

function inParentViewport(el, pa) {
  //if (typeof jQuery === "function"){
  // if (el instanceof jQuery)
  el = el[0];
  // if (pa instanceof jQuery)
  pa = pa[0];
  // }

  el.style.marginLeft = "0px";
  el.style.position = "absolute";
  el.style.zIndex = "9000000";

  var e = el.getBoundingClientRect();
  var p = pa.getBoundingClientRect();

  if (e.right >= p.right) {
    console.log(e.right, p.right);
    // el.style.
    // alert("way over right")
  }

  if (e.left <= p.left) {
    console.log(e.left, p.left);
    // alert("way over left")
  }

  // alert(
  //     e.bottom >= p.top &&
  //     e.right >= p.left &&
  //     e.top <= p.bottom &&
  //     e.left <= p.right
  // );
}

const Carousel = (props) => {
  const { children, show } = props;

  const {
    history,
    match,
    auth: { isAuthenticated, user },
    cart: { cart },
    wishList: { wishList },
    addToCart,
    addToWishList,
    fetchCourses,
  } = props;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [length, setLength] = useState(children.length);

  const [touchPosition, setTouchPosition] = useState(null);

  // Set the length to match current children from props

  //     const [coursedetails, setCourseDetails] = useState({});
  // eslint-disable-next-line
  const [status, setStatus] = useState("init");
  const [loading, setLoading] = useState(true);
  // const [acloading, setAcLoading] = useState(false);
  // const [enrolledCourses, setEnrolledCourses] = useState([]);

  const addToMyWishList = async (id) => {
    setStatus("loading");
    console.log(id);
    try {
      await addToWishList(id);
      setStatus("Course Added to wishlist");
    } catch (err) {
      setStatus("Could not add course to wish list");
    }
    setLoading(false);
  };

  useEffect(() => {
    (async function loadContent() {
      await fetchCourses();
      // const lastLocation = useLocation();
    })();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    (async function CheckStatus() {
      // if (isAuthenticated === true) {
      try {
      } catch (err) {
        // toast.error(
        //   err?.response?.data?.message ||
        //     `Error occured fetching active courses`
        // );
      }
      setLoading(false);
      // }
    })();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    setLength(children.length);
  }, [children]);

  const next = () => {
    if (currentIndex < length - show) {
      setCurrentIndex((prevState) => prevState + 1);
    }
  };

  const prev = () => {
    if (currentIndex > 0) {
      setCurrentIndex((prevState) => prevState - 1);
    }
  };

  const handleWishList = async (e, id) => {
    e.preventDefault();
    return await addToWishList(id);
  };

  const handleTouchStart = (e) => {
    const touchDown = e.touches[0].clientX;
    setTouchPosition(touchDown);
  };

  const handleTouchMove = (e) => {
    const touchDown = touchPosition;

    if (touchDown === null) {
      return;
    }

    const currentTouch = e.touches[0].clientX;
    const diff = touchDown - currentTouch;

    if (diff > 5) {
      next();
    }

    if (diff < -5) {
      prev();
    }

    setTouchPosition(null);
  };

  console.log(children);

  useEffect(() => {
    // Only the class elements in view
    $(".info2").mouseover(function () {
      $(".carousel-content-wrapper").css({
        overflow: "inherit",
        // width:"1000px"
      });

      // inParentViewport($(this), $("#myboxwrap"))
    });

    $(".info2").mouseout(function () {
      $(".carousel-content-wrapper").css({
        overflow: "hidden",
        // width:"100%"
      });
    });

    // var carousels = Array.prototype.map.call(
    //   document.querySelectorAll(".carousel"),
    //   function (element) {
    //     var carousel = new Carousel2(element);
    //     carousel.auto(9000);
    //     return carousel;
    //   }
    // );

    $(".info2 p,.info2 span,.info b").each(function () {
      $(this).css({ color: "#000" });
    });
  });

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



  //swipper for mobile device
  const settings = {
      slidesPerView: 3,
      loop: true,
      speed: 1000,
      // autoplay: {
      //   delay: 3000,
      //   disableOnInteraction: false,
      // },
      spaceBetween: 30,
      watchSlidesVisibility: true,
      pagination: {
        el: ".slider-dot.text-center",
        clickable: true,
      },
      breakpoints: {
        0: {
          slidesPerView: 1,
        },
        576: {
          slidesPerView: 1,
        },
        768: {
          slidesPerView: 2,
        },
        992: {
          slidesPerView: 3,
        },
      },
    };

  return (
    <div className="carousel-container">
      <h3> {/*title */}</h3>
      <div className="carousel-wrapper shown">
        {/* You can alwas change the content of the button to other things */}
        <div
          id="myboxwrap"
          className="carousel-content-wrapper gridDisplay"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          <div
            className={`carousel-content show-${8}`}
            style={{ transform: `translateX(-${currentIndex * (100 / 4)}%)` }}
          >
            {children.map((item, i) => {
              return (
                <div
                  key={"ramlink" + item?.id}
                  className="card-box bookset product-view col-merge-12 col-merge-s-4 col-merge-d3 "
                  style={{
                    marginRight: "3px",
                    height: "310px",
                    margin: "10px",
                  }}
                >
                  <div
                    id={"mei" + item?.id}
                    className="info2 full-width "
                    style={{
                      zIndex: "21474894399999999",
                      margin: "70px auto",
                      padding: "10px",
                    }}
                  >
                    <div
                      style={{
                        width: "100%",
                        marginTop: "20px",
                        height: "50px",
                      }}
                    >
                      <img
                        src={item?.course?.instructor?.image_url}
                        style={{
                          width: "50px",
                          height: "50px",
                          borderRadius: "50%",
                          float: "left",
                          marginLeft: "20px",
                          marginRight: "10px",
                        }}
                      />
                      <div>
                        <h5
                          className="fm"
                          style={{
                            width: "100%",
                            fontSize: "14px",
                            fontWeight: "bold",
                            color: "#000",
                            marginLeft: "20px",
                          }}
                        >
                          {item?.course?.instructor?.first_name}{" "}
                          {item?.course?.instructor?.last_name}
                        </h5>
                        <p
                          className="fm"
                          style={{
                            color: "#000",
                            fontSize: "14px",
                            width: "100%",
                            marginTop: "4px",
                            textTransform: "capitalize",
                            fontWeight: "bold",
                          }}
                        >
                          {
                            item?.course?.instructor?.instructor_profile
                              ?.current_employer_designation
                          }
                        </p>
                      </div>
                    </div>
                    <div
                      className="fm"
                      style={{
                        padding: "5px",
                        color: "#000",
                        width: "100%",
                        margin: "10px auto",
                        clear: "both",
                      }}
                    >
                      <h4
                        className="stori-line fm"
                        style={{
                          fontSize: "25px",
                          lineHeight: "32px",
                          fontWeight: "600",
                          margin: "0 0 15px",
                          color: "#000",
                        }}
                      >
                        {" "}
                        {item?.course?.course_name}
                      </h4>

                      {/*<div style={{width:"100%",padding:"10px"}}><form className="rating-form" action="#" method="post" name="rating-movie">
                              <fieldset className="form-group">
                                
                                <legend className="form-legend">Rating:</legend>
                                
                                <div className="form-item">
                                  
                                  <input id="rating-5" name="rating" type="radio" value="5" />
                                  <label for="rating-5" data-value="5">
                                    <span className="rating-star">
                                      <i className="fa fa-star-o"></i>
                                      <i className="fa fa-star"></i>
                                    </span>
                                    <span className="ir">5</span>
                                  </label>
                                  <input id="rating-4" name="rating" type="radio" value="4" />
                                  <label for="rating-4" data-value="4">
                                    <span className="rating-star">
                                      <i className="fa fa-star-o"></i>
                                      <i className="fa fa-star"></i>
                                    </span>
                                    <span className="ir">4</span>
                                  </label>
                                  <input id="rating-3" name="rating" type="radio" value="3" />
                                  <label for="rating-3" data-value="3">
                                    <span className="rating-star">
                                      <i className="fa fa-star-o"></i>
                                      <i className="fa fa-star"></i>
                                    </span>
                                    <span className="ir">3</span>
                                  </label>
                                  <input id="rating-2" name="rating" type="radio" value="2" />
                                  <label for="rating-2" data-value="2">
                                    <span className="rating-star">
                                      <i className="fa fa-star-o"></i>
                                      <i className="fa fa-star"></i>
                                    </span>
                                    <span className="ir">2</span>
                                  </label>
                                  <input id="rating-1" name="rating" type="radio" value="1" />
                                  <label for="rating-1" data-value="1">
                                    <span className="rating-star">
                                      <i className="fa fa-star-o"></i>
                                      <i className="fa fa-star"></i>
                                    </span>
                                    <span className="ir">1</span>
                                  </label>
                                  
                                  <div className="form-action">
                                    <input className="btn-reset" type="reset" value="Reset" />   
                                  </div>

                                  <div className="form-output">
                                    ? / 5
                                  </div>
                                  
                                </div>
                                
                              </fieldset>
                            </form>
                            </div>*/}

                      {/^/.test(item?.course?.course_description) ? (
                        <p
                          style={{
                            margin: "0 0 13px",
                            fontSize: "14px",
                            lineHeight: "26px",
                            color: "#000",
                            fontWeight: "bold",
                          }}
                          dangerouslySetInnerHTML={{
                            __html:
                              item?.course?.course_description?.substring(
                                0,
                                180
                              ) + "...",
                          }}
                        />
                      ) : (
                        <p
                          className="course-subtitle"
                          style={{
                            margin: "0 0 13px",
                            fontFamily: "Open Sans",
                            color: "#000",
                            fontWeight: "bold",
                            fontSize: "14px",
                            lineHeight: "26px",
                          }}
                        >
                          {item?.course?.course_description.substring(0, 180) +
                            "..."}
                        </p>
                      )}

                      {/*<div className="stm_lms_courses__single--info_meta" style={{marginBottom:"-10px"}}>
                      <div className="stm_lms_course__meta"> 
                         <i className="fa fa-signal " style={{marginLeft:"4px"}}>Beginner</i> 
                      </div>
                      <div className="stm_lms_course__meta"> 
                        <i className="fa fa-bars " style={{marginLeft:"4px"}}>{item?.course?.learning_style}</i> 
                      </div>
                      <div className="stm_lms_course__meta"> 
                        <i className="fa fa-clock " style={{marginLeft:"4px"}}>{item?.course?.duration} hrs</i>
                      </div>
                    </div>*/}

                      <div
                        className="stm_lms_courses__single--info_meta"
                        style={{ position: "absolute", bottom: "30px" }}
                      >
                        <div className="stm_lms_course__meta">
                          <a
                            style={{
                              background: "rgba(8,23,200)",
                              color: "#fff",
                              width: "150px",
                            }}
                            href="#detailView"
                            onClick={() => {
                              window.location.href =
                                process.env.PUBLIC_URL + "/courses/" + item?.id;
                            }}
                            className="button-c button-rounded-right seedetail fm"
                          >
                            See Detail
                          </a>
                        </div>
                        <div
                          className="stm_lms_course__meta"
                          style={{ marginLeft: "30px" }}
                        >
                          {isAuthenticated ? (
                            <a
                              href="#addTowishBox"
                              style={{
                                color: "#fff",
                                background: "red",
                                width: "150px",
                              }}
                              className=" button-c button-rounded-top fm"
                              onClick={(e) => {
                                handleWishList(e, item?.id);
                              }}
                            >
                              Wishlist
                            </a>
                          ) : (
                            <a
                              href="#loginRequired"
                              style={{
                                color: "#fff",
                                background: "red",
                                width: "150px",
                              }}
                              className="button-c button-rounded-right fm modal-link"
                            >
                              Wishlist
                            </a>
                          )}
                        </div>
                        <div
                          className="stm_lms_course__meta fm"
                          style={{ marginLeft: "30px" }}
                        >
                          {isAuthenticated ? (
                            <a
                              href="#addTocart"
                              className="button-c fm button-rounded-left"
                              style={{
                                backgroundColor: "rgba(8,23,200)",
                                color: "#fff",
                                width: "150px",
                              }}
                              onClick={(e) => {
                                handleAddToCart(e, item?.course);
                              }}
                            >
                              Buy
                            </a>
                          ) : (
                            <a
                              href="#addTocart"
                              className="button-c button-rounded-left fm  modal-link"
                              style={{
                                backgroundColor: "rgba(8,23,200)",
                                color: "#fff",
                                width: "150px",
                              }}
                            >
                              Buy
                            </a>
                          )}
                        </div>
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
                          width: "95%",
                          padding: "10px",
                          fontSize: "10px",
                        }}
                        className="fm"
                      >
                        Reviews
                      </p>

                      <div
                        className="fm"
                        style={{
                          color: "#000",
                          position: "absolute",
                          bottom: "0px",
                          padding: "10px",
                          float: "right",
                          right: "0px",
                        }}
                      >
                        NGN{item?.course?.price}
                      </div>
                    </div>
                  </div>

                  <figure
                    style={{
                      border: "1px solid #f5f5f5",
                      borderBottom: "2px solid #000",
                    }}
                  >
                    <Link
                      to={
                        process.env.PUBLIC_URL +
                        "/courses/" +
                        item?.id +
                        "/" +
                        item?.course?.slug
                      }
                      className="image-popup"
                      title="Screenshot-1"
                    >
                      {item?.course?.course_cover_image !== null ? (
                        <img
                          src={item?.course?.course_cover_image}
                          className="thumb-img imagemix"
                          alt="work-thumbnail"
                          style={{ width: "100%", height: "140px" }}
                        />
                      ) : (
                        <Fragment />
                      )}{" "}
                      <div className="middle-overlay"></div>
                    </Link>
                  </figure>

                  <div
                    className=""
                    style={{
                      height: "200px",
                      marginLeft: "10px",
                      width: "100%",
                    }}
                  >
                    <div className="">
                      <p className="style-9b">
                        <Link
                          className="style-9b"
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
                            color: "#000",
                            lineHeight: "20px",
                          }}
                        >
                          {item?.category?.name}
                        </Link>
                      </p>

                      <p className="style-9b">
                        <Link
                          className="style-9b"
                          style={{
                            fontWeight: "700",
                            fontFamily: "Open Sans",
                            color: "#000",
                            fontSize: "12px",
                            lineHeight: "20px",
                          }}
                          to={
                            process.env.PUBLIC_URL +
                            "/courses/" +
                            item.id +
                            "/" +
                            item?.course?.slug
                          }
                        >
                          {item?.course?.course_code}
                        </Link>
                      </p>

                      <p
                        style={{
                          width: "100%",
                          fontWeight: "bold",
                          marginTop: "3px",
                        }}
                      >
                        <Link
                          to={
                            process.env.PUBLIC_URL +
                            "/courses/" +
                            item.id +
                            "/" +
                            item?.course?.slug
                          }
                          style={{
                            fontWeight: "700",
                            fontFamily: "Open Sans",
                            fontSize: "12px",
                            width: "100%",
                            marginTop: "2px",
                            color: "#000",
                            margin: "0 0 15px",
                            lineHeight: "20px",
                          }}
                          className="style-8a"
                        >
                          {item?.course?.course_name?.substring(0, 30) + "..."}
                        </Link>
                      </p>
                      <p
                        style={{
                          width: "100%",
                          marginTop: "4px",
                          color: "#000",
                        }}
                        className="style-8a"
                      >
                        {
                          item?.course?.instructor?.instructor_profile
                            ?.current_employer_designation
                        }
                      </p>

                      <p
                        style={{ width: "100%", color: "#000" }}
                        className="style-8a"
                      >
                        {item?.course?.instructor?.first_name !== null &&
                          item?.course?.instructor?.first_name +
                            " " +
                            item?.course?.instructor?.last_name}
                      </p>
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
                          width: "90%",
                          padding: "10px",
                          fontSize: "10px",
                        }}
                      >
                        Course
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
                        <Link
                          to={
                            process.env.PUBLIC_URL +
                            "/courses/" +
                            item.id +
                            "/" +
                            item?.course?.slug
                          }
                          style={{
                            fontSize: "10px",
                            width: "100%",
                            color: "gray",
                          }}
                        >
                          Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
        {/* You can alwas change the content of the button to other things */}

        <button
          onClick={prev}
          className="left-arrow wing-right shown"
          style={{
            background: "#fff",
            borderRadius: "0%",
            color: "#eee",
            fontSize: "20px",
          }}
        >
          &lt;
        </button>

        <button
          onClick={next}
          className="right-arrow wing-right2 shown"
          style={{
            background: "#fff",
            borderRadius: "0%",
            color: "#eee",
            fontSize: "20px",
          }}
        >
          &gt;
        </button>
      </div>









     
<Styles>
      <div className="hide ">
        <section class=" hide course-slider-area">


          
          <Col md="12" className="course-slider">
                <Swiper {...settings}>
            {children.map((item, i) => {
              return (
                <div
                  data-link={
                    process.env.PUBLIC_URL +
                    "/courses/" +
                    item.id +
                    "/" +
                    item?.course?.slug
                  }
                  key={"ramlink" + item?.id}
                  className="card-box  course-item  "
                  style={{ marginRight: "10px" }}
                >
                  <figure
                    style={{
                      border: "1px solid #f5f5f5",
                      borderBottom: "2px solid #000",
                    }}
                  >
                    <Link
                      to={
                        process.env.PUBLIC_URL +
                        "/courses/" +
                        item?.id +
                        "/" +
                        item?.course?.slug
                      }
                      className="image-popup"
                      title="Screenshot-1"
                    >
                      {item?.course?.course_cover_image !== null ? (
                        <img
                          src={item?.course?.course_cover_image}
                          className="thumb-img imagemix course-image"
                          alt="work-thumbnail"
                          style={{ width: "100%", height: "140px" }}
                        />
                      ) : (
                        <Fragment />
                      )}{" "}
                      <div className="middle-overlay"></div>
                    </Link>
                  </figure>

                  <div
                    className=""
                    style={{
                      textAlign: "left",
                      height: "200px",
                      marginLeft: "10px",
                      width: "100%",
                    }}
                  >
                    <div className="course-content">
                      <p className="style-9b">
                        <Link
                          className="style-9b"
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
                            color: "#000",
                            textAlign: "left",
                            lineHeight: "20px",
                          }}
                        >
                          {item?.category?.name}
                        </Link>
                      </p>

                      <p className="style-9b">
                        <Link
                          className="style-9b"
                          style={{
                            fontWeight: "700",
                            fontFamily: "Open Sans",
                            color: "#000",
                            fontSize: "12px",
                            textAlign: "left",
                            lineHeight: "20px",
                          }}
                          to={
                            process.env.PUBLIC_URL +
                            "/courses/" +
                            item.id +
                            "/" +
                            item?.course?.slug
                          }
                        >
                          {item?.course?.course_code}
                        </Link>
                      </p>

                      <p
                        style={{
                          textAlign: "left",
                          width: "100%",
                          fontWeight: "bold",
                          marginTop: "3px",
                        }}
                      >
                        <Link
                          to={
                            process.env.PUBLIC_URL +
                            "/courses/" +
                            item.id +
                            "/" +
                            item?.course?.slug
                          }
                          style={{
                            fontWeight: "700",
                            fontFamily: "Open Sans",
                            fontSize: "12px",
                            textAlign: "left",
                            width: "100%",
                            marginTop: "2px",
                            color: "#000",
                            margin: "0 0 15px",
                            lineHeight: "20px",
                          }}
                          className="style-8a"
                        >
                          {item?.course?.course_name?.substring(0, 30) + "..."}
                        </Link>
                      </p>
                      <p
                        style={{
                          textAlign: "left",
                          width: "100%",
                          marginTop: "4px",
                          color: "#000",
                        }}
                        className="style-8a"
                      >
                        {
                          item?.course?.instructor?.instructor_profile
                            ?.current_employer_designation
                        }
                      </p>

                      <p
                        style={{ width: "100%", color: "#000" }}
                        className="style-8a"
                      >
                        {item?.course?.instructor?.first_name !== null &&
                          item?.course?.instructor?.first_name +
                            " " +
                            item?.course?.instructor?.last_name}
                      </p>
                    </div>
                    <div
                      className="bottom-sect"
                      style={{
                        display: "table",
                        clear: "both",
                        height: "30px",
                        textAlign: "left",
                      }}
                    >
                      <p
                        style={{
                          borderTop: "1px solid #000",
                          color: "#000",
                          display: "table",
                          position: "absolute",
                          marginLeft: "10px",
                          textAlign: "left",
                          marginLeft: "-10px",
                          bottom: "0px",
                          width: "82%",
                          padding: "10px",
                          fontSize: "10px",
                        }}
                      >
                        Course
                      </p>

                      <div
                        style={{
                          color: "#000",
                          position: "absolute",
                          textAlign: "left",
                          bottom: "0px",
                          padding: "10px",
                          float: "right",
                          right: "0px",
                        }}
                      >
                        <Link
                          to={
                            process.env.PUBLIC_URL +
                            "/courses/" +
                            item.id +
                            "/" +
                            item?.course?.slug
                          }
                          style={{
                            textAlign: "left",
                            fontSize: "10px",
                            width: "100%",
                            color: "gray",
                          }}
                        >
                          Details
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}

            </Swiper>
          </Col>


        </section>
      </div>

      </Styles>
    </div>
  );
};

Carousel.propTypes = {
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
})(Carousel);
