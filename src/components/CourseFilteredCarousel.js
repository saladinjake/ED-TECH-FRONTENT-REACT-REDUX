import React, { useEffect, useState, Fragment } from "react";
import "./carousel.css";
import "./wishlist.css";
import { Link } from "react-router-dom";
import { addToWishlist } from "services/wishlist";
import { Container, Row, Col } from "react-bootstrap";

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

  console.log(children);
  return (
    <div className="carousel-container">
      <h3> {/*title */}</h3>
      <div className="carousel-wrapper">
        {/* You can alwas change the content of the button to other things */}

        <button
          onClick={prev}
          className="left-arrow reset-left-carosel"
          style={{
            background: "#fff",
            borderRadius: "0%",
            color: "#eee",
            fontSize: "20px",
          }}
        >
          &lt;
        </button>
        <div
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
                <div class="product">
                  <figure>
                    <Link
                      to={
                        process.env.PUBLIC_URL +
                        "/courses/" +
                        item?.course?.id +
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
                      <p
                        style={{
                          height: "50px",
                          color: "blue",
                          margin: "10px",
                        }}
                      >
                        <Link
                          to={
                            process.env.PUBLIC_URL +
                            "/courses/" +
                            item?.course?.id +
                            "/" +
                            item.slug
                          }
                          style={{ fontSize: "14px", color: "#000" }}
                          className="text-dark"
                        >
                          {item?.course?.course_name}
                        </Link>
                      </p>
                      <br />
                      <p>
                        A course by{" "}
                        {item?.course?.instructor?.first_name !== null &&
                          item?.course?.instructor?.first_name +
                            " " +
                            item?.course?.instructor?.last_name}
                      </p>
                    </div>
                    <div
                      className="bottom-sect"
                      style={{ display: "table", clear: "both" }}
                    >
                      <hr
                        style={{
                          width: "250px",
                          maxWidth: "100%",
                          background: "1px solid #000",
                        }}
                      />
                      <div
                        class=""
                        style={{
                          fontSize: "13px",
                          color: "#333",
                          padding: "2px",
                          marginLeft: "20px",
                        }}
                      >
                        {"Course"}
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
          onClick={next}
          className="right-arrow reset-right-carosel"
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
    </div>
  );
};

export default Carousel;
