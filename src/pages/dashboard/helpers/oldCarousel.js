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
                  <div
                    style={{ marginLeft: "15px" }}
                    className=" col-sm-6 col-lg-3 col-md-4 mobiles card-box"
                  >
                    <a
                      onClick={() => {
                        addToMyWishList(item.id);
                      }}
                      class="button one inactive mobile button--secondary"
                    >
                      <div class="btn__effect">
                        <svg
                          class="heart-stroke icon-svg icon-svg--size-4 icon-svg--color-silver"
                          viewBox="20 18 29 28"
                          aria-hidden="true"
                          focusable="false"
                        >
                          <path d="M28.3 21.1a4.3 4.3 0 0 1 4.1 2.6 2.5 2.5 0 0 0 2.3 1.7c1 0 1.7-.6 2.2-1.7a3.7 3.7 0 0 1 3.7-2.6c2.7 0 5.2 2.7 5.3 5.8.2 4-5.4 11.2-9.3 15a2.8 2.8 0 0 1-2 1 3.4 3.4 0 0 1-2.2-1c-9.6-10-9.4-13.2-9.3-15 0-1 .6-5.8 5.2-5.8m0-3c-5.3 0-7.9 4.3-8.2 8.5-.2 3.2.4 7.2 10.2 17.4a6.3 6.3 0 0 0 4.3 1.9 5.7 5.7 0 0 0 4.1-1.9c1.1-1 10.6-10.7 10.3-17.3-.2-4.6-4-8.6-8.4-8.6a7.6 7.6 0 0 0-6 2.7 8.1 8.1 0 0 0-6.2-2.7z"></path>
                        </svg>
                        <svg
                          class="heart-full icon-svg icon-svg--size-4 icon-svg--color-blue"
                          viewBox="0 0 19.2 18.5"
                          aria-hidden="true"
                          focusable="false"
                        >
                          <path d="M9.66 18.48a4.23 4.23 0 0 1-2.89-1.22C.29 10.44-.12 7.79.02 5.67.21 2.87 1.95.03 5.42.01c1.61-.07 3.16.57 4.25 1.76A5.07 5.07 0 0 1 13.6 0c2.88 0 5.43 2.66 5.59 5.74.2 4.37-6.09 10.79-6.8 11.5-.71.77-1.7 1.21-2.74 1.23z"></path>
                        </svg>
                        <svg
                          class="broken-heart"
                          xmlns="http://www.w3.org/2000/svg"
                          width="48"
                          height="16"
                          viewBox="5.707 17 48 16"
                        >
                          <g fill="#0090E3">
                            <path
                              class="broken-heart--left"
                              d="M29.865 32.735V18.703a4.562 4.562 0 0 0-3.567-1.476c-2.916.017-4.378 2.403-4.538 4.756-.118 1.781.227 4.006 5.672 9.737a3.544 3.544 0 0 0 2.428 1.025l-.008-.008.013-.002z"
                            />
                            <path
                              class="broken-heart--right"
                              d="M37.868 22.045c-.135-2.588-2.277-4.823-4.697-4.823a4.258 4.258 0 0 0-3.302 1.487l-.004-.003v14.035a3.215 3.215 0 0 0 2.289-1.033c.598-.596 5.882-5.99 5.714-9.663z"
                            />
                          </g>
                          <path
                            class="broken-heart--crack"
                            fill="none"
                            stroke="#FFF"
                            stroke-miterlimit="10"
                            d="M29.865 18.205v14.573"
                          />
                        </svg>
                        <div class="effect-group">
                          <span class="effect"></span>
                          <span class="effect"></span>
                          <span class="effect"></span>
                          <span class="effect"></span>
                          <span class="effect"></span>
                        </div>
                      </div>
                    </a>
                    <div className="product-list-box thumb">
                      <Link
                        to={"../courses/" + item.id + "/" + item.slug}
                        className="image-popup"
                        title="Screenshot-1"
                      >
                        {item.course_cover_image !== null ? (
                          <img
                            src={item.course_cover_image}
                            className="thumb-img "
                            alt="work-thumbnail"
                            style={{ width: "100%", height: "auto" }}
                          />
                        ) : (
                          <Fragment />
                        )}{" "}
                      </Link>

                      <Link to={"../courses/" + item.id + "/" + item.slug}>
                        <h4 className="m-t-0">
                          <Link
                            to={"../courses/" + item.id + "/" + item.slug}
                            style={{ fontSize: "14px" }}
                            className="text-dark"
                          >
                            {item.course_name}
                          </Link>
                        </h4>
                      </Link>

                      <div className="price-tag " style={{ fontSize: "10px" }}>
                        N {item.price}
                      </div>
                      <div className="detail" key={i}>
                        <div className="rating" style={{ width: "100px" }}>
                          <ul className="list-inline">
                            <li>
                              <span
                                alt="hello-1"
                                className="fa fa-star"
                                href="#"
                              ></span>
                            </li>
                            <li>
                              <span
                                alt="hello-2"
                                className="fa fa-star"
                                href="#"
                              ></span>
                            </li>
                            <li>
                              <a
                                alt="hello3"
                                className="fa fa-star"
                                href="#"
                              ></a>
                            </li>
                            <li>
                              <a
                                alt="hello33"
                                className="fa fa-star"
                                href="#"
                              ></a>
                            </li>
                            <li>
                              <a
                                alt="hello332"
                                className="fa fa-star-o"
                                href="#"
                              ></a>
                            </li>
                          </ul>
                        </div>

                        <h5 className="m-0">
                          {" "}
                          <span className="text-muted">
                            {" "}
                            {item.instructor.user.username !== null &&
                              "Instructor" + item.instructor.user.username}
                          </span>
                        </h5>
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
