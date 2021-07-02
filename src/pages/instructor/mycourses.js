import React, { useEffect, useState, Fragment } from "react";
import "./carousel.css";
import "./wishlist.css";
import { Link } from "react-router-dom";
import { addToWishlist } from "services/wishlist";
import { Container, Row, Col } from "react-bootstrap";


import { addToCart } from "actions/cartActions";

import PropTypes from "prop-types";


import toast from "react-hot-toast";

import { addToWishList } from "actions/wishListActions";
import moment from "moment"

const Carousel = (props) => {
  const { children, show, title } = props;

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
      await addToWishlist(id);
      setStatus("success");
    } catch (err) {
      setStatus("error");
    }
    setLoading(false);
  };

  useEffect(() => {
    (async function loadContent() {})();
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



  const handleWishList = async (e,id) =>{
    e.preventDefault()
    return await addToWishList(id)
  }



  console.log(children);
  return (
    <div className="carousel-containerx">
      <h3> {/*title */}</h3>
      <div className="carousel-wrapperx container-fluid">
        {/* You can alwas change the content of the button to other things *
        <button
          onClick={prev}
          className="left-arrow"
          style={{
            background: "#fff",
            borderRadius: "0%",
            color: "#eee",
            fontSize: "20px",
          }}
        >
          &lt;
        </button>*/}
        <div
          className="carousel-content-wrapperx gridDisplay"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          <div
            className={`carousel-contentx show-${8}`}
            style={{ transform: `translateX(-${currentIndex * (100 / 4)}%)` }}
          >
            {children.map((item, i) => {
              return (
                <div key={"ramlink"+item?.id} className="card-box bookset product-view col-merge-12 col-merge-s-4 col-merge-d3" style={{marginRight:"3px",height:"350px", width:"260px"}}>
                   

                   
                  <figure style={{border:"1px solid #f5f5f5"}}>
                    <Link
                      to={
                        process.env.PUBLIC_URL +
                        "/courses/" +
                        item?.id+
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
                          style={{ width: "300px", height: "140px" }}
                        />
                      ) : (
                        <Fragment />
                      )}{" "}
                      <div className="middle-overlay"></div>
                    </Link>
                  </figure>

                  <div class="" style={{ height: "200px", marginLeft:"10px",width:"100%" }}>
                    <div class="">
<p>
  <Link
                          to={
                            process.env.PUBLIC_URL +
                            "/courses/" +
                            item.id +
                            "/" +
                            item.slug
                          }
                          style={{ fontSize: "10px",width:"100%",color: "gray",lineHeight:"10px" }}
                          
                        >
                          {item?.category?.name} 
                        </Link>
                      </p>

                       <p style={{   width:"100%",fontWeight:"bold",marginTop:"3px"}}>
                        <Link
                          to={
                            process.env.PUBLIC_URL +
                            "/courses/" +
                            item.id +
                            "/" +
                            item?.slug
                          }
                          style={{ fontSize: "13px",width:"100%",color: "#f6f6f6" }}
                          className="text-dark"
                        >
                          {item?.course_code}  
                        </Link>
                      </p>


                      <p style={{   width:"100%",fontWeight:"bold",marginTop:"3px"}}>
                        <Link
                          to={
                            process.env.PUBLIC_URL +
                            "/courses/" +
                            item.id +
                            "/" +
                            item?.slug
                          }
                          style={{ fontSize: "13px",width:"100%",color: "#f6f6f6" ,marginTop:"2px"}}
                          className="text-dark"
                        >
                           {item?.course_name?.substring(0,30)+ "..."}
                        </Link>
                      </p>
                      <p style={{ width:"100%",marginTop:"4px"}}>
                        {item?.instructor?.instructor_profile?.current_employer_designation} 
                        
                      </p>

                      <p style={{ width:"100%"}}>
                        { item?.instructor?.first_name !== null &&
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
                      
                    <p style={{borderTop:"1px solid #000",color:"#000", 
                               display:"table",position:"absolute",
                               bottom:"0px",width:"86%",padding:"10px",fontSize: "10px",

                             }}>Course</p>

                    <div style={{
                               color:"#000", 
                               position:"absolute",
                               bottom:"0px",padding:"10px", float:"right",right:"0px"}}>

                                <Link
                          to={
                            process.env.PUBLIC_URL +
                            "/courses/" +
                            item.id +
                            "/" +
                            item?.slug
                          }
                          style={{ fontSize: "10px",width:"100%",color: "gray" }}
                          
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
        {/* You can alwas change the content of the button to other things
        <button
          onClick={next}
          className="right-arrow"
          style={{
            background: "#fff",
            borderRadius: "0%",
            color: "#eee",
            fontSize: "20px",
          }}
        >
          &gt;
        </button> */}
      </div>
    </div>
  );
};

export default Carousel;
