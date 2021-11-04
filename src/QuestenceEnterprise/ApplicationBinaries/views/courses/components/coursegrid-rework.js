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
function CourseItemGrid({
  allCourses,
  courses,
  auth: { isAuthenticated, user },
  cart: { cart },
  wishList: { wishList },
  addToCart,
  fetchCourses,
}) {
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
    // var isMobile = false; //initiate as false
    // // device detection
    // if(/(android|bb\d+|meego).+mobile|avantgo|bada\/|blackberry|blazer|compal|elaine|fennec|hiptop|iemobile|ip(hone|od)|ipad|iris|kindle|Android|Silk|lge |maemo|midp|mmp|netfront|opera m(ob|in)i|palm( os)?|phone|p(ixi|re)\/|plucker|pocket|psp|series(4|6)0|symbian|treo|up\.(browser|link)|vodafone|wap|windows (ce|phone)|xda|xiino/i.test(navigator.userAgent)
    //     || /1207|6310|6590|3gso|4thp|50[1-6]i|770s|802s|a wa|abac|ac(er|oo|s\-)|ai(ko|rn)|al(av|ca|co)|amoi|an(ex|ny|yw)|aptu|ar(ch|go)|as(te|us)|attw|au(di|\-m|r |s )|avan|be(ck|ll|nq)|bi(lb|rd)|bl(ac|az)|br(e|v)w|bumb|bw\-(n|u)|c55\/|capi|ccwa|cdm\-|cell|chtm|cldc|cmd\-|co(mp|nd)|craw|da(it|ll|ng)|dbte|dc\-s|devi|dica|dmob|do(c|p)o|ds(12|\-d)|el(49|ai)|em(l2|ul)|er(ic|k0)|esl8|ez([4-7]0|os|wa|ze)|fetc|fly(\-|_)|g1 u|g560|gene|gf\-5|g\-mo|go(\.w|od)|gr(ad|un)|haie|hcit|hd\-(m|p|t)|hei\-|hi(pt|ta)|hp( i|ip)|hs\-c|ht(c(\-| |_|a|g|p|s|t)|tp)|hu(aw|tc)|i\-(20|go|ma)|i230|iac( |\-|\/)|ibro|idea|ig01|ikom|im1k|inno|ipaq|iris|ja(t|v)a|jbro|jemu|jigs|kddi|keji|kgt( |\/)|klon|kpt |kwc\-|kyo(c|k)|le(no|xi)|lg( g|\/(k|l|u)|50|54|\-[a-w])|libw|lynx|m1\-w|m3ga|m50\/|ma(te|ui|xo)|mc(01|21|ca)|m\-cr|me(rc|ri)|mi(o8|oa|ts)|mmef|mo(01|02|bi|de|do|t(\-| |o|v)|zz)|mt(50|p1|v )|mwbp|mywa|n10[0-2]|n20[2-3]|n30(0|2)|n50(0|2|5)|n7(0(0|1)|10)|ne((c|m)\-|on|tf|wf|wg|wt)|nok(6|i)|nzph|o2im|op(ti|wv)|oran|owg1|p800|pan(a|d|t)|pdxg|pg(13|\-([1-8]|c))|phil|pire|pl(ay|uc)|pn\-2|po(ck|rt|se)|prox|psio|pt\-g|qa\-a|qc(07|12|21|32|60|\-[2-7]|i\-)|qtek|r380|r600|raks|rim9|ro(ve|zo)|s55\/|sa(ge|ma|mm|ms|ny|va)|sc(01|h\-|oo|p\-)|sdk\/|se(c(\-|0|1)|47|mc|nd|ri)|sgh\-|shar|sie(\-|m)|sk\-0|sl(45|id)|sm(al|ar|b3|it|t5)|so(ft|ny)|sp(01|h\-|v\-|v )|sy(01|mb)|t2(18|50)|t6(00|10|18)|ta(gt|lk)|tcl\-|tdg\-|tel(i|m)|tim\-|t\-mo|to(pl|sh)|ts(70|m\-|m3|m5)|tx\-9|up(\.b|g1|si)|utst|v400|v750|veri|vi(rg|te)|vk(40|5[0-3]|\-v)|vm40|voda|vulc|vx(52|53|60|61|70|80|81|83|85|98)|w3c(\-| )|webc|whit|wi(g |nc|nw)|wmlb|wonu|x700|yas\-|your|zeto|zte\-/i.test(navigator.userAgent.substr(0,4))) {
    //     isMobile = true;
    // }
    $("body").css({ background: "#fff" });

    $(".dark")
      .find("p")
      .each(function () {
        $(this).css({ color: "#000", "font-family": "Open Sans" });
        // $("i").css({color:"#000"})
      });

    $(".info p,.info span,.info b").each(function () {
      $(this).css({ color: "#000", "font-family": "Open Sans" });
    });

    $(".product-view p,.product-view span,.product-view a").each(function () {
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

    $(".footer p, .footer span").each(function () {
      $(this).css({ color: "#fff", "font-family": "Open Sans" });
    });
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

  return (
    <Fragment>
      <div style={{ marginTop: "-45px" }}>
        <h1 className="hide" id="push-h1" style={{ margin: "20px" }}>
          {" "}
          Courses
        </h1>
        <div id="push-div" className="" style={{ marginTop: "10px" }}>
          {currentCourses.length > 0 &&
            currentCourses.map((item, i) => {
              let width = "";
              // if (currentCourses.length === 1) {
              //   width = "200px";
              // } else if (
              //   currentCourses.length === 2 ||
              //   currentCourses.length === 3
              // ) {
              //   width = "350px";
              // } else {
              //   width = "";
              // }

              return (
                <Fragment
                  className=" col-md-3 col-sm-12 col-lg-3"
                  key={item.id}
                >
                  <div
                    className={currentCourses.length === 1 ? "" : ""}
                    style={{ width: width, marginRight: "-15px" }}
                  >
                    <div
                      className="card-box"
                      style={{ height: "350px", border: "1px solid #fafafa" }}
                    >
                      <figure>
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

                      <div
                        className="info2   "
                        style={{
                          zIndex: 2147483647 + 900,
                          height: "110%",
                          width: "170%",
                          marginTop: "80px",
                        }}
                      >
                        <div
                          style={{
                            padding: "5px",
                            color: "#000",
                            width: "100%",
                          }}
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
                                  item?.course_description?.substring(0, 170) +
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
                              {item?.course_description.substring(0, 170) +
                                "..."}
                            </p>
                          )}
                        </div>

                        {/* <div className="stm_lms_courses__single--info_meta style-8a" style={{marginBottom:"-10px"}}>
                      <div className="stm_lms_course__meta style-8a"> 
                         <i className="fa fa-signal " style={{marginRight:"4px"}}></i> Beginner
                      </div>
                      <div className="stm_lms_course__meta style-8a"> 
                        <i className="fa fa-bars " style={{marginLeft:"4px"}}>{item?.course?.learning_style}</i> 
                      </div>
                      <div className="stm_lms_course__meta style-8a"> 
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
                              }}
                              href="#detailView"
                              onClick={() => {
                                window.location.href =
                                  process.env.PUBLIC_URL +
                                  "/courses/" +
                                  item?.id;
                              }}
                              className="button-c button-rounded-right seedetail whitish"
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
                                className="button-c button-rounded-right modal-link whitish"
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
                                className="whitish button-c button-rounded-left"
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
                                className="button-c button-rounded-left  modal-link whitish"
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

                      <div className="">
                        <div style={{ padding: "1px", marginLeft: "3px" }}>
                          <p
                            style={{
                              width: "100%",
                              fontWeight: "bold",
                              lineHeight: "0px",
                              marginBottom: "7px",
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
                            style={{
                              width: "100%",
                              fontWeight: "bold",
                              marginTop: "3px",
                              color: "#000",
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
                              }}
                              className=" style-8a"
                            >
                              {item.course_name.substring(0, 80) + "..."}
                            </Link>
                          </p>
                          <p
                            className="style-8a"
                            style={{
                              color: "#000",
                              width: "100%",
                              marginTop: "4px",
                              position: "absolute",
                              bottom: "95px",
                              fontSize: "10px",
                              fontWeight: "bold",
                            }}
                          >
                            {
                              item?.instructor?.instructor_profile
                                ?.current_employer_designation
                            }
                          </p>

                          <p
                            className="style-8a"
                            style={{
                              color: "#000",
                              width: "100%",
                              position: "absolute",
                              bottom: "80px",
                              fontSize: "10px",
                              fontWeight: "bold",
                            }}
                          >
                            {item?.instructor?.first_name !== null &&
                              item?.instructor?.first_name +
                                " " +
                                item?.instructor?.last_name}
                          </p>
                        </div>
                      </div>
                      <div>
                        <p
                          style={{
                            borderTop: "1px solid #000",
                            color: "#000",
                            display: "table",
                            position: "absolute",
                            fontWeight: "bold",
                            bottom: "40px",
                            width: "75%",
                            padding: "10px",
                            fontSize: "10px",
                          }}
                        >
                          Course
                        </p>

                        <div
                          style={{
                            color: "#000",
                            marginRight: "20px",
                            position: "absolute",
                            fontWeight: "bold",
                            bottom: "40px",
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
                              item.slug
                            }
                            style={{
                              fontSize: "10px",
                              width: "100%",
                              color: "#000",
                            }}
                          >
                            Details
                          </Link>
                        </div>

                        {/*  <div style={{position:"absolute",
                               bottom:"-18px",width:"100%",padding:"10px",right:"0px"}}><form className="rating-form" action="#" method="post" name="rating-movie">
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
                            </form>*/}
                      </div>
                    </div>
                  </div>
                </Fragment>
              );
            })}
        </div>
      </div>
    </Fragment>
  );
}

// export default CourseItemGrid;

CourseItemGrid.propTypes = {
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
})(CourseItemGrid);
