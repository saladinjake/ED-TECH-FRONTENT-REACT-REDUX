import React, { Fragment, useState } from "react";
// import Datas from './data/filter.json'
import { Link } from "react-router-dom";

import { Styles } from "./styles/courseFilter";
import "./Tab.css";

// import Loader from "components/Loader/Loader";

function MyCourses(props) {
  const { courses, editable } = props;
  const [showEditor, setShowEdit] = useState(false);

  const handleShowEdit = (value) => {
    setShowEdit(value);
    // props.handleShowEdit(value)
  };

  return (
    <Styles>
      {/* Course Area */}
      <Fragment>
        {courses.map((item, i) => (
          <div
            key={"ramlink" + item?.id}
            className="card-box bookset product-view col-merge-12 col-merge-s-4 col-merge-d3"
            style={{ marginRight: "10px", height: "310px" }}
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
              <div style={{ width: "100%", marginTop: "20px", height: "50px" }}>
                <img
                  src={item?.instructor?.image_url}
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
                    style={{
                      width: "100%",
                      fontSize: "14px",
                      fontWeight: "small",
                      color: "#777",
                      marginLeft: "20px",
                    }}
                  >
                    {item?.instructor?.first_name} {item?.instructor?.last_name}
                  </h5>
                  <p
                    style={{
                      width: "100%",
                      marginTop: "4px",
                      textTransform: "capitalize",
                      fontWeight: "bold",
                    }}
                  >
                    {
                      item?.instructor?.instructor_profile
                        ?.current_employer_designation
                    }
                  </p>
                </div>
              </div>
              <div
                style={{
                  padding: "5px",
                  color: "#000",
                  width: "100%",
                  margin: "10px auto",
                  clear: "both",
                }}
              >
                <h4
                  className="stori-line"
                  style={{
                    fontSize: "18px",
                    lineHeight: "22px",
                    fontWeight: "600",
                    margin: "0 0 15px",
                  }}
                >
                  {" "}
                  {item?.course_name}
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

                {/^/.test(item?.course_description) ? (
                  <p
                    style={{
                      margin: "0 0 13px",
                      fontSize: "14px",
                      lineHeight: "26px",
                      color: "#777",
                    }}
                    dangerouslySetInnerHTML={{
                      __html:
                        item?.course_description?.substring(0, 100) + "..",
                    }}
                  />
                ) : (
                  <p
                    className="course-subtitle"
                    style={{
                      margin: "0 0 13px",
                      fontFamily: "Open Sans",
                      color: "#000",
                      fontSize: "14px",
                      lineHeight: "26px",
                    }}
                  >
                    {item?.course_description.substring(0, 100) + ".."}
                  </p>
                )}

                <div
                  className="stm_lms_courses__single--info_meta"
                  style={{ marginBottom: "-10px" }}
                >
                  <div className="stm_lms_course__meta">
                    <i className="fa fa-signal " style={{ marginLeft: "4px" }}>
                      Beginner
                    </i>
                  </div>
                  <div className="stm_lms_course__meta">
                    <i className="fa fa-bars " style={{ marginLeft: "4px" }}>
                      {item?.learning_style}
                    </i>
                  </div>
                  <div className="stm_lms_course__meta">
                    <i className="fa fa-clock " style={{ marginLeft: "4px" }}>
                      {item?.duration} hrs
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
                        width: "150px",
                      }}
                      href="#detailView"
                      onClick={() => {
                        window.location.href =
                          process.env.PUBLIC_URL + "/courses/" + item?.id;
                      }}
                      className="button-c button-rounded-right seedetail"
                    >
                      See Detail
                    </a>
                  </div>
                  <div
                    className="stm_lms_course__meta"
                    style={{ marginLeft: "30px" }}
                  ></div>
                  <div
                    className="stm_lms_course__meta"
                    style={{ marginLeft: "30px" }}
                  ></div>
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
                  item?.slug
                }
                className="image-popup"
                title="Screenshot-1"
              >
                {item?.course_cover_image !== null ? (
                  <img
                    src={item?.course_cover_image}
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
              style={{ height: "200px", marginLeft: "10px", width: "100%" }}
            >
              <div className="">
                <p className="style-9b">
                  <Link
                    className="style-9b"
                    to={process.env.PUBLIC_URL + "/courses/" + item.id}
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
                    to={process.env.PUBLIC_URL + "/courses/" + item.id}
                  >
                    {item?.course_code}
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
                    to={process.env.PUBLIC_URL + "/courses/" + item.id}
                    style={{ width: "100%", marginTop: "2px", color: "#000" }}
                    className="text-dark style-8a"
                  >
                    {item?.course_name?.substring(0, 30) + ".."}
                  </Link>
                </p>
                <p
                  style={{ width: "100%", marginTop: "4px", color: "#000" }}
                  className="style-8a"
                >
                  {
                    item?.instructor?.instructor_profile
                      ?.current_employer_designation
                  }
                </p>

                <p
                  style={{ width: "100%", color: "#000" }}
                  className="style-8a"
                >
                  {item?.instructor?.first_name !== null &&
                    item?.instructor?.first_name +
                      " " +
                      item?.instructor?.last_name}
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
                      item?.slug
                    }
                    style={{ fontSize: "10px", width: "100%", color: "gray" }}
                  >
                    Details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ))}
      </Fragment>
    </Styles>
  );
}

export default MyCourses;
