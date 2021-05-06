import React, { useEffect, useState, Fragment } from "react";
import "./carousel.css";
import "../css/overview.css";
import "./wishlist.css";
import { Link } from "react-router-dom";
import { addToWishlist } from "services/wishlist";

const Carousel = (props) => {
  const { children, show } = props;

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

  return (
    <div className="carousel-container">
      <div className="carousel-wrapper">
        {/* You can alwas change the content of the button to other things */}
        {currentIndex > 0 && (
          <button
            onClick={prev}
            className="left-arrow"
            style={{ background: "#0253c8", color: "#fff" }}
          >
            &lt;
          </button>
        )}
        <div
          className="carousel-content-wrapper"
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
        >
          <div
            className={`carousel-content show-${show}`}
            style={{
              transform: `translateX(-${currentIndex * (100 / show)}%)`,
            }}
          >
            {children.length > 0 &&
              children.map((item, i) => {
                return (
                    <div class="product" style={{marginRight:"20px"}}>
                            <figure>
                                <Link
                                                to={"../courses/" + item.id + "/" + item.slug}
                                                className="image-popup"
                                                title="Screenshot-1"
                                              >
                                                {item.course_cover_image !== null ? (
                                                  <img
                                                    src={item.course_cover_image}
                                                    className="thumb-img imagemix"
                                                    alt="work-thumbnail"
                                                    style={{ width: "100%", height: "auto" }}
                                                  />
                                                ) : (
                                                  <Fragment />
                                                )}{" "}
                                                <div className="middle-overlay"></div>
                                              </Link>
                                </figure>

                                <div class="product-description">
                            
                                  <div class="info">
                                    
                                    <p style={{height:"50px", color:"blue"}}>
                                      <Link to={"../courses/" + item.id + "/" + item.slug}>
                                       
                                          <Link
                                            to={"../courses/" + item.id + "/" + item.slug}
                                            style={{ fontSize: "14px" }}
                                            className="text-dark"
                                          >
                                            {item.course_name}
                                          </Link>
                                     
                                      </Link>
                                    </p>
                                    <p>A course by {item?.instructor?.user?.first_name !== null &&
                             item?.instructor?.user?.first_name  +" " + item?.instructor?.user?.last_name}</p>

                                  </div>

                                  <div class="priceX">
                                    {""}
                                  </div>
                                </div>

       

                                  <div class="product-sidebar card-box">



                                  <h4>{item.course_name} </h4>
                                  <hr style={{backgroundColor:"blue"}}/>
                                   <p>{item.course_overview.length > 0 && item.course_overview.substring(0,200)+ "..." }</p>
                                    <br/>

                                    <div class="card-box price" style={{float:"right"}}>
                                    NGN { item.price }
                                  </div>

                                    <div style={{marginBottom:"0px", paddingTop:"40px"}}>
                                    <Link
                                    className="btn btn-primary btn-large" style={{marginRight:"20px"}}
                                    to={process.env.PUBLIC_URL + "/courses/" + item.id + "/" + item.slug }
                                      >Course Detail</Link> 
                                    
                                      <Link
                                    className="btn btn-primary btn-large"
                                    to={process.env.PUBLIC_URL + "/courses/" + item.id + "/" + item.slug }
                                      >Start Course</Link> 

                                      </div>
                                  </div>
                        </div>
                );
              })}
          </div>
        </div>
        {/* You can alwas change the content of the button to other things */}
        {currentIndex < length - show && (
          <button
            onClick={next}
            className="right-arrow"
            style={{ background: "#0253c8", color: "#fff" }}
          >
            &gt;
          </button>
        )}
      </div>
    </div>
  );
};

export default Carousel;
