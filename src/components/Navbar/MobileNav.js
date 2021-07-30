import React, { Fragment, useRef, useState, useEffect } from "react";
import $ from "jquery";
import "./mobile_nav.css";
import { Link } from "react-router-dom";
import questence from "assets/pngs/logoweb.png";

import { useHistory } from "react-router-dom";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logOut } from "actions/authActions";

import { CATEGORIES, PACES, AUTHLINKS, PROGRAM_LINK } from "./data";

import { getCategories } from "services/category";
import toast from "react-hot-toast";
import { useQuery } from "hooks/useQuery.js";
import AuthWindow from "./PopUpWindow";

const MobileNavigator = ({
  cart: { cart },
  auth: { token, isAuthenticated, user, user_roles },
  logOut,
  hambuggerComponent,
}) => {
  const toogleBtn = useRef();
  const mobileNav = useRef();

  const [queryVal, setQueryVal] = useState("");
  const query = useQuery();
  let routeQuery = query.get("filter");

  const [querySearchVal, setVal] = useState(query.get("search"));
  const [querySearchMethod, setMethod] = useState(query.get("method"));

  const [categories, setInfo] = useState([]);

  useEffect(() => {
    (async function loadContent() {
      try {
        let res = await getCategories();

        setInfo([...res.data.data]);
        console.log(res);
      } catch (err) {
        toast.error("Error occured fetching notifications");
      }
      // setLoading(false);
    })();
    // eslint-disable-next-line
  }, []);

  useEffect(() => {
    if (document.getElementById("search-btn")) {
      if (routeQuery !== null && routeQuery.length > 0) {
        setVal(query.get("search"));
        setMethod(query.get("method"));
        setQueryVal(routeQuery);

        document.getElementById("search-btn").style.display = "none";
        document.getElementById("reset-btn").style.display = "block";
      }
    }
    // eslint-disable-next-line
  }, [routeQuery]);

  const openNav = () => {
    toogleBtn.current.classList.toggle("mobActive");
    mobileNav.current.classList.toggle("mobactive");
  };

  let history = useHistory();

  const handleLogout = async () => {
    await logOut();
    // history.push("/");
    // window.location.href=process.env.PUBLIC_URL+ "/"
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  const handleReset = (e) => {
    e.target.style.display = "none";
    // document.getElementById("search-btn").style.display="block"

    if (document.getElementById("search-result")) {
      let element = document.getElementById("search-result");
      element.style.display = "none";
    }

    window.location.href = process.env.PUBLIC_URL + "/courses";
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key == "Enter") {
      handleSearch(e);
      e.target.style.display = "none";
      document.getElementById("reset-btn").style.display = "block";
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const searchVal = document.getElementById("search")?.value;
    if (searchVal.length > 0) {
      history.push(`/courses?method=name&search=${searchVal}&filter=course`);
      window.location.reload();
    }

    if (document.getElementById("search-result")) {
      let element = document.getElementById("search-result");
      element.style.display = "block";
    }

    if (document.getElementById("search-btn")) {
      document.getElementById("search-btn").style.display = "none";
      document.getElementById("reset-btn").style.display = "block";
    }
  };
  let leftSide = ``;
  let rightSide = ``;

  useEffect(() => {
    $(document).ready(function () {
      // $(".modal-link").click(function(e){
      //     var modalSettings = {
      //   theOverlay: $('.overlay'),
      //   theModal: $('.overlay__modal'),
      //   theLink: $('.modal-link'),
      //   theCloseButton: $('.overlay__close')
      // };

      // var modal = new Modal(modalSettings);
      // modal.init();

      // })

      // $(".modal-link2").click(function(e){

      // var modalSettings2 = {
      //   theOverlay: $('.overlay2'),
      //   theModal: $('.overlay__modal2'),
      //   theLink: $('.modal-link2'),
      //   theCloseButton: $('.overlay__close2')
      // };

      // var modalRegister = new Modal(modalSettings2);
      // modalRegister.init();

      $(".modal-link3").click(function (e) {
        e.preventDefault();

        $(".overlay3").addClass("modal-window").css({ display: "block" });
        $(".overlay2").hide().fadeOut("fast");
        $(".overlay").hide().fadeOut("fast");
      });

      $(".modal-link2").click(function (e) {
        e.preventDefault();

        $(".overlay2").addClass("modal-window").css({ display: "block" });

        $(".overlay").hide().fadeOut("fast");
        $(".overlay3").fadeOut("slow");
      });

      $(".modal-link").click(function (e) {
        e.preventDefault();

        $(".overlay").addClass("modal-window").css({ display: "block" });

        $(".overlay2").hide().fadeOut("fast");

        $(".overlay3").fadeOut("slow");
      });

      $(".overlay__close2").click(function (e) {
        e.preventDefault();
        $(".overlay2").hide().fadeOut("fast");
        $(".overlay").hide().fadeOut("fast");
        $(".overlay3").fadeOut("slow");
      });

      $(".overlay__close").click(function (e) {
        e.preventDefault();
        $(".overlay2").hide().fadeOut("slow");
        $(".overlay").fadeOut("slow");
        $(".overlay3").hide().fadeOut("slow");
      });

      $(".overlay__close3").click(function (e) {
        e.preventDefault();
        $(".overlay2").hide().fadeOut("slow");
        $(".overlay").hide().fadeOut("slow");
        $(".overlay3").fadeOut("slow");
      });
    });
  });

  const [showLogin, SetLogin] = useState(false);
  const [showSignup, setSignUp] = useState(false);

  function bgScrolling(menu, bg) {
    // if menu has toggled class... *
    if (menu.hasClass("openit")) {
      // * disable background scrolling
      // bg.css({
      //      'overflow-y': 'hidden',
      //     'height': 'auto'
      // });
      // if menu does not have toggled class... *
    } else {
      // * enable background scrolling
      // bg.css({
      //     'overflow-y': 'visible',
      //     'height': '100%'
      // });
    }
  }

  useEffect(() => {
    // $(document).ready(function () {
    // append plus symbol to every list item that has children
    $("#mobile-nav2 .parent").append(
      '<span class="open-menu fa fa-caret-right" style="color:#000"></span>'
    );

    // fix non-scrolling overflow issue on mobile devices
    $("#mobile-nav2 > ul").wrap('<div class="overflow"></div>');
    $(window).on("load resize", function () {
      var vph = $(window).height() - 57; // 57px - height of #mobile-nav
      $(".overflow").css("max-height", vph);
    });

    // global variables
    var menu = $(".overflow > ul");
    var bg = $("html, body");

    // toggle background scrolling

    // menu button click events
    $(".menu-button").on("click", function (e) {
      e.preventDefault();
      // activate toggles
      menu.slideToggle(450);
      menu.toggleClass("openit");
      $(this).children().toggleClass("fa-reorder fa-remove");
      //bgScrolling(menu,bg);
      if ($(this).children().hasClass("fa-remove")) {
        $(".content-menu").css({ display: "block" });
      } else {
        $(".content-menu").css({ display: "none" });
      }
    });

    // list item click events
    // list item click events
    $(".open-menu").on("click", function (e) {
      e.preventDefault();
      // $(this).prev('ul').slideToggle(450);
      $(this)
        .parent()
        .find("ul")
        .each(function () {
          // alert(this)
          if ($(this).css("display") == "none") {
            $(this).css({ display: "block" });
          } else {
            $(this).css({ display: "none" });
          }

          // $(".parent ul").not(this).css({display:"none"})
          // $(this).css({display:"block"})
        });
      $(this).toggleClass("rotate");
    });
    // });
  });

  return (
    <div id="mobile-nav2">
      <figure
        className="logo"
        style={{ margin: "10px", float: "left", marginTop: "20px" }}
      >
        <Link to="/">
          <img src={questence} alt="" width="171px" />
        </Link>
      </figure>
      <div class="menu-button" style={{ float: "right", margin: "10px" }}>
        <span class="fa fa-reorder"></span>
      </div>

      <ul className="content-menu ">
        <li>
          <Link to={process.env.PUBLIC_URL + "/courses"}>
            Courses And Programmes{" "}
          </Link>
        </li>
        <li class="parent">
          <a href="#">By Category</a>
          <ul>
            <Fragment>
              {categories.length > 0 &&
                categories.map((item, i) => {
                  return (
                    <Fragment>
                      <li className="parent">
                        <a
                          className=" "
                          href={`#${process.env.PUBLIC_URL}/courses/category/${item.id}`}
                        >
                          {item.name}
                        </a>

                        {item.subcategories.length > 0 &&
                          item.subcategories.map((cat, i) => {
                            return (
                              <ul>
                                <li>
                                  <a href="#">{cat.name}</a>
                                </li>
                              </ul>
                            );
                          })}
                      </li>
                    </Fragment>
                  );
                })}
            </Fragment>
          </ul>
        </li>

        <li class="parent">
          <a href="#">By Learning Style</a>
          <ul className="list-unstyled">
            {PACES.length > 0 &&
              PACES.map((item, i) => {
                return (
                  <li>
                    <Link
                      style={{
                        fontFamily: "Open Sans",
                        color: "#000",

                        zIndex: "25",
                      }}
                      className=""
                      to={`${item.link}`}
                    >
                      {item.name}
                    </Link>
                  </li>
                );
              })}
          </ul>
        </li>
        <li className="parent">
          <a href="#">By Program</a>
          <ul className="list-unstyled got-sub">
            {PROGRAM_LINK.length > 0 &&
              PROGRAM_LINK.map((item) => {
                return (
                  <a
                    style={{
                      color: "#000",

                      fontFamily: "Open Sans",
                      color: "#000",

                      zIndex: "25",
                    }}
                    className=" "
                    data-toggle="dropdownsas"
                    role="button"
                    aria-haspopup="true"
                    aria-expanded="false"
                    href={`${process.env.PUBLIC_URL}/institute/${item.id}`}
                  >
                    <img
                      src={item?.logo}
                      style={{
                        width: "20px",
                        height: "20px",
                        borderRadius: "50px",
                        margin: "10px",
                      }}
                      alt="image-not-given"
                    />{" "}
                    {item.name}
                  </a>
                );
              })}
          </ul>
        </li>
        <li class="parent">
          <a href="#">For Institutions</a>
          <ul>
            <li>
              <Link
                style={{
                  fontFamily: "Open Sans",
                  color: "#000",

                  zIndex: "25",
                }}
                className=""
                to={process.env.PUBLIC_URL + "/schools"}
              >
                For Schools
              </Link>
            </li>

            <li>
              <Link
                style={{
                  fontFamily: "Open Sans",
                  color: "#000",

                  zIndex: "25",
                }}
                className=""
                to={process.env.PUBLIC_URL + "/business"}
              >
                For Businesses
              </Link>
            </li>

            <li>
              <Link
                style={{
                  fontFamily: "Open Sans",
                  color: "#000",

                  zIndex: "25",
                }}
                className=""
                to={process.env.PUBLIC_URL + "/government"}
              >
                For Government
              </Link>
            </li>
          </ul>
        </li>

        <li>
          <div className="search__form">
            <input
              className="zoomText serach form-control"
              onKeyPress={handleKeyPress}
              type="text"
              name="search"
              id="search"
              placeholder="Search For A Course"
              style={{
                padding: "10px",
                fontFamily: "Open Sans",
                color: "#000",
                zIndex: "25",
                margin: "10px",
                width: "260px",
              }}
            />
            <a
              href="#"
              onClick={handleSearch}
              style={{
                color: "#fff",
                marginTop: "10px",
                padding: "10px",

                zIndex: "25",
                background: "rgb(2, 83, 200)",
                padding: "10px",

                margin: "10px",
                width: "260px",
              }}
              id="search-btn"
            >
              <b
                style={{
                  textTransform: "capitalize",
                  fontFamily: "Open Sans",
                  fontSize: "12px",
                  fontWeight: "bold",
                }}
              >
                Search
              </b>
              <svg
                width="14"
                height="14"
                viewBox="0 0 14 14"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M10.0057 8.80503H9.37336L9.14923 8.58891C9.93368 7.67639 10.4059 6.49171 10.4059 5.20297C10.4059 2.32933 8.07662 0 5.20297 0C2.32933 0 0 2.32933 0 5.20297C0 8.07662 2.32933 10.4059 5.20297 10.4059C6.49171 10.4059 7.67639 9.93368 8.58891 9.14923L8.80503 9.37336V10.0057L12.8073 14L14 12.8073L10.0057 8.80503ZM5.20297 8.80503C3.20983 8.80503 1.60091 7.19611 1.60091 5.20297C1.60091 3.20983 3.20983 1.60091 5.20297 1.60091C7.19611 1.60091 8.80503 3.20983 8.80503 5.20297C8.80503 7.19611 7.19611 8.80503 5.20297 8.80503Z"
                  fill="white"
                />
              </svg>
            </a>

            <a
              href="#"
              onClick={handleReset}
              type="button"
              style={{
                color: "#fff",
                display: "none",

                margin: "10px",
                width: "260px",

                fontFamily: "Open Sans",

                zIndex: "25",
                background: "rgb(2, 83, 200)",
                padding: "10px",
              }}
              id="reset-btn"
            >
              <b style={{ textTransform: "capitalize", marginRight: "5px" }}>
                Reset
              </b>
              <i className="fa fa-undo"></i>
            </a>
          </div>
        </li>

        <li style={{ float: "left" }}>
          <Link
            alt="noimage"
            to={process.env.PUBLIC_URL + "/cart"}
            className=" waves-effect waves-light"
            aria-expanded="true"
          >
            <i
              style={{
                fontFamily: "Open Sans",
                color: "#000",

                zIndex: "25",
              }}
              className="md  md-add-shopping-cart "
            ></i>{" "}
            <span
              className="badge badge-xs "
              style={{
                marginTop: "-25px",
                color: cart?.length > 0 ? "red" : "#000",
                background: cart?.length > 0 ? "#fff" : "#fff",
              }}
            >
              {cart !== undefined && `(${cart?.length})`}
            </span>
          </Link>
        </li>

        {!isAuthenticated ? (
          <Fragment>
            <li
              style={{
                fontFamily: "Open Sans",
                color: "#000",

                zIndex: "25",
              }}
            >
              <a
                style={{
                  fontFamily: "Open Sans",
                  color: "#000",
                  margin: "10px",
                  width: "260px",

                  zIndex: "25",
                  background: "#fff",
                  color: "#000",
                  borderRadius: "43px",
                }}
                id="login_form"
                href="#modal"
                className="stm_lms_log_in waves-effect waves-light modal-link"
              >
                {" "}
                <i className="stmlms-user fa fa-user"></i>
                <span style={{ marginLeft: "10px", fontWeight: "bold" }}>
                  <b
                    style={{
                      textTransform: "capitalize",
                      fontFamily: "Open Sans",
                      fontSize: "12px",
                      fontWeight: "bold",
                    }}
                  >
                    Log In
                  </b>
                </span>
              </a>
            </li>
            <li
              className="cd-signup"
              style={{
                fontFamily: "Open Sans",
                color: "#000",

                zIndex: "25",
              }}
            >
              <a
                style={{
                  borderRadius: "43px",

                  height: "40px",
                  padding: "7px",
                  color: "#fff",
                  background: "rgb(2, 83, 200)",
                  margin: "10px",
                  width: "260px",
                }}
                className="modal-link2"
                href="#"
                id="register_form"
              >
                <b
                  style={{
                    textTransform: "capitalize",
                    fontFamily: "Open Sans",
                    fontSize: "12px",
                    fontWeight: "bold",
                  }}
                >
                  Sign Up
                </b>
              </a>
            </li>
          </Fragment>
        ) : (
          <Fragment>
            <li className="parent" style={{}}>
              <a href="#"> {`${user?.first_name} ${user?.last_name}`}</a>
            </li>
            {AUTHLINKS.length > 0 &&
              AUTHLINKS.map((item, i) => {
                return (
                  <li style={{ height: "35px", marginTop: "2px" }}>
                    <Link className="" to={`${item.link}`}>
                      {item.name}
                    </Link>
                  </li>
                );
              })}

            <li
              className="DropDown__item"
              style={{ height: "30px", marginTop: "2px" }}
            >
              <Link className="" to={process.env.PUBLIC_URL + "/cart"}>
                Cart {cart !== undefined && `(${cart?.length})`}
              </Link>
            </li>

            <li
              className="DropDown__item"
              style={{ height: "30px", marginTop: "2px" }}
            >
              <Link className="" onClick={handleLogout}>
                Logout
              </Link>
            </li>
          </Fragment>
        )}
      </ul>
    </div>
  );
};

MobileNavigator.propTypes = {
  auth: PropTypes.object.isRequired,
  logOut: PropTypes.func.isRequired,
  cart: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.cart,
  auth: state.auth,
});

export default connect(mapStateToProps, { logOut })(MobileNavigator);
