import React, { Fragment, useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";
//import questence from "assets/svgs/questence-logo.svg";
import questence from "assets/pngs/logoweb.png";
import { useHistory } from "react-router-dom";
import { ReactComponent as Dropdown } from "svgs/dropdown.svg";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logOut } from "actions/authActions";
import InstructorNavBar from "./InstructorNavbar";
import MobileNavigator from "./MobileNavBetter"; //"./MobileNav"
import MobileNavigatorInstructor from "./MobileNavInstructor";
import TMobileNavigator from "./TMobileNavigator";

//import { uuid } from "services/dashboard";

//import MegaMenu from "./megamenu"

import { CATEGORIES, PACES, AUTHLINKS, PROGRAM_LINK } from "./data";

import "./nav.css";

import { getCategories } from "services/category";
import toast from "react-hot-toast";

import "./injector.css";

import $ from "jquery";
import { useQuery } from "hooks/useQuery.js";
import AuthWindow from "./PopUpWindow";

// import bridget from "jquery-bridget"
// import leanModal from "lean-modal"

// bridget( 'leanModal', leanModal );



export const TopNav = () => {
  return (
    <div className="pull-left">
      <div className="">
        <a className="button-menu-mobile ">
          <div className="lines">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </a>
      </div>
    </div>
  );
};

function Modal(settings) {
  this.modalLink = $(settings.theLink) || $(".modal-link");
  this.overlay = $(settings.theOverlay) || $(".modal-overlay");
  this.modalClass = "." + $(settings.theModal).attr("class") || ".modal-window";
  this.modalCloseClass =
    "." + $(settings.theCloseButton).attr("class") || ".modal-close";
  this.numItems = this.overlay.length;
}

Modal.prototype = {
  init: function () {
    var self = this;
    this.bindHandlers(self);
  },

  showModal: function (self, link) {
    var n = self.modalLink.index(link),
      overlay = self.overlay.eq(n),
      modal = overlay.find($(self.modalClass));

    overlay.fadeIn();
    modal.fadeIn();
  },

  hideModal: function (self, overlay) {
    var overlayClose = overlay.find(self.modalCloseClass);

    // $(document).keyup(function(objEvent) {
    //   if (objEvent.keyCode == 27) {
    //     overlayClose.click();
    //   }
    // });

    overlayClose.on("click", function (e) {
      overlay.fadeOut();
      overlay.find($(self.modalClass)).fadeOut();
    });
  },

  bindHandlers: function (self) {
    $(".modal-link2").each(function () {
      $(this).on("click", function () {
        self.showModal(self, $(this));
      });
    });

    $(".modal-link").each(function () {
      $(this).on("click", function () {
        self.showModal(self, $(this));
      });
    });

    // $('.modal-link3').each(function() {
    //  $(this).on('click', function() {
    //    self.showModal(self, $(this));
    //  });
    // });

    this.overlay.each(function () {
      var overlay = $(this);

      self.hideModal(self, overlay);
    });
  },
};

const NavBar = ({
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

  return (
    <Fragment>
      {token &&
      isAuthenticated &&
      user &&
      user_roles[0].name === "Instructor" ? (
        <Fragment>
          <div className="hide ">
            <MobileNavigatorInstructor />
          </div>

          <div className="shown">
            <InstructorNavBar />
          </div>
        </Fragment>
      ) : (
        <Fragment>
          <div className="hide">
          <TopNav />
            <TMobileNavigator />
          </div>
          <div className="shown">
            <nav
              className="desktop  main-nav"
              style={{
                position: "fixed",
                zIndex: "9999999999999999999999999999",
              }}
            >
              <figure className="logo">
                <Link to="/">
                  <img src={questence} alt="" width="171px" />
                </Link>
              </figure>

              <ul
                className="mainNav makeText"
                ref={mobileNav}
                style={{ marginTop: "10px" }}
              >
                <li className="NavHover">
                  <div className="parent">
                    <span
                      style={{
                        fontFamily: "Open Sans",
                        color: "#000",

                        zIndex: "25",
                      }}
                    >
                      Courses And Programs
                    </span>
                    <Dropdown />
                  </div>

                  <ul
                    className="ParentDropDown makeText"
                    style={{
                      fontFamily: "Open Sans",
                      color: "#000",

                      zIndex: "25",
                    }}
                  >
                    <li
                      className="ParentDropDown__item"
                      style={{
                        fontFamily: "Open Sans",
                        color: "#000",

                        zIndex: "25",
                        height: "35px",
                      }}
                    >
                      <Link
                        style={{
                          fontFamily: "Open Sans",
                          color: "#000",

                          zIndex: "25",
                          height: "35px",
                        }}
                        className=""
                        to={process.env.PUBLIC_URL + "/courses"}
                      >
                        All Courses
                      </Link>
                    </li>

                    <li
                      className="ParentDropDown__item "
                      style={{
                        height: "35px",

                        fontFamily: "Open Sans",
                        color: "#000",

                        zIndex: "25",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "Open Sans",
                          color: "#000",

                          zIndex: "25",
                        }}
                      >
                        By Category
                        <i
                          className="fa fa-caret-right"
                          style={{ float: "right", marginTop: "5px" }}
                        ></i>
                      </span>
                      <ul
                        className="NavSubMenu makeText"
                        style={{
                          opacity: "1",
                          marginTop: "-40px",
                          background: "#fff",

                          fontFamily: "Open Sans",
                          color: "#000",

                          zIndex: "25",
                        }}
                      >
                        {categories.length > 0 &&
                          categories.map((item, i) => {
                            return (
                              <Fragment>
                                <li
                                  onClick={() => {
                                    window.location.href =
                                      process.env.PUBLIC_URL +
                                      `/courses/category/${item.id}`;
                                  }}
                                  className="dropdown  dropdown-cols-2"
                                  id={"item" + item.id}
                                  style={{
                                    margin: "5px",
                                    width: "260px",
                                    marginLeft: "10px",
                                    borderBottom: "none",
                                    height: "25px",
                                    margin: "15px",
                                  }}
                                >
                                  <a
                                    style={{
                                      fontFamily: "Open Sans",
                                      color: "#000",

                                      zIndex: "25",
                                    }}
                                    className=" "
                                    data-toggle="dropdown"
                                    role="button"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                    href={`${process.env.PUBLIC_URL}/courses/category/${item.id}`}
                                  >
                                    {item.name}
                                  </a>

                                  {item.subcategories.length > 0 &&
                                    item.subcategories.map((cat, i) => {
                                      // if(i%2 ===0){
                                      leftSide += `<a class="extension" style="background:#fff,font-size: 12px;height:15px; fontFamily:'Open Sans'" href="${process.env.PUBLIC_URL}/courses/category/${cat.id}"
                              >${cat.name}</a>
                                                              `;
                                      // }else if(i%2 !==0){
                                      // rightSide+=`<li><a href={"${process.env.PUBLIC_URL}/courses/category/${cat.id}"}>${cat.name}</a></li>`
                                      // }

                                      return (
                                        <div
                                          class="dropdown-menu "
                                          style={{
                                            background: "#fff",
                                            marginTop: "-30px",
                                            opacity: "1",
                                          }}
                                        >
                                          <div>
                                            <h5>{item.name}</h5>
                                            <ul
                                              style={{
                                                background: "#fff",
                                                zIndex: "45",

                                                fontFamily: "Open Sans",
                                                color: "#000",

                                                zIndex: "25",
                                              }}
                                              dangerouslySetInnerHTML={{
                                                __html: leftSide,
                                              }}
                                            ></ul>
                                          </div>
                                        </div>
                                      );
                                    })}
                                </li>
                              </Fragment>
                            );
                          })}
                      </ul>
                    </li>

                    <li
                      className="ParentDropDown__item"
                      style={{ height: "35px" }}
                    >
                      <span
                        style={{
                          fontFamily: "Open Sans",
                          color: "#000",

                          zIndex: "25",
                        }}
                      >
                        {" "}
                        By Program
                        <i
                          className="fa fa-caret-right"
                          style={{ float: "right", marginTop: "5px" }}
                        ></i>
                      </span>
                      <ul
                        className="NavSubMenu makeText extends-3-cols"
                        style={{
                          marginTop: "-80px",
                          background: "#fff",
                          color: "#000",
                        }}
                      >
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

                    <li
                      className="ParentDropDown__item"
                      style={{ height: "35px" }}
                    >
                      <Link
                        style={{
                          fontFamily: "Open Sans",
                          color: "#000",

                          zIndex: "25",
                        }}
                        className=""
                        to={process.env.PUBLIC_URL + "#"}
                      >
                        By Training Partner
                      </Link>
                    </li>

                    <li
                      className="ParentDropDown__item"
                      style={{ height: "35px" }}
                    >
                      <span
                        style={{
                          fontFamily: "Open Sans",
                          color: "#000",

                          zIndex: "25",
                        }}
                      >
                        By Learning Style
                      </span>
                      <ul className="NavSubMenu makeText" style={{}}>
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
                  </ul>
                </li>

                <li className="NavHover">
                  <div className="parent">
                    <span
                      style={{
                        fontFamily: "Open Sans",
                        color: "#000",
                        opacity: "1",

                        zIndex: "25",
                      }}
                    >
                      {" "}
                      For Institutions
                    </span>
                    <Dropdown />
                  </div>
                  <ul className="ParentDropDown makeText">
                    <li
                      className="ParentDropDown__item"
                      style={{ height: "35px" }}
                    >
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
                    <li
                      className="ParentDropDown__item"
                      style={{ height: "35px" }}
                    >
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
                    <li
                      className="ParentDropDown__item"
                      style={{ height: "35px" }}
                    >
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
                  </ul>
                </li>

                <li className="search__group" style={{}}>
                  <div className="search__form">
                    <input
                      className="zoomText serach"
                      onKeyPress={handleKeyPress}
                      type="text"
                      name="search"
                      id="search"
                      placeholder="Search For A Course"
                      style={{
                        fontFamily: "Open Sans",
                        color: "#000",

                        zIndex: "25",
                      }}
                    />
                    <a
                      href="#"
                      onClick={handleSearch}
                      style={{
                        color: "#fff",

                        zIndex: "25",
                        background: "rgb(2, 83, 200)",
                        padding: "10px",
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

                        fontFamily: "Open Sans",

                        zIndex: "25",
                        background: "rgb(2, 83, 200)",
                        padding: "10px",
                      }}
                      id="reset-btn"
                    >
                      <b
                        style={{
                          textTransform: "capitalize",
                          marginRight: "5px",
                        }}
                      >
                        Reset
                      </b>
                      <i className="fa fa-undo"></i>
                    </a>
                  </div>
                </li>

                <li
                  className="dropdown top-menu-item-xs"
                  style={{ float: "left" }}
                >
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
                      {/*<Link to="/login" className="auth outline">
                  Log In
                </Link>*/}

                      <a
                        style={{
                          fontFamily: "Open Sans",
                          color: "#000",

                          zIndex: "25",
                          background: "#fff",
                          color: "#000",
                          borderRadius: "43px",
                        }}
                        // onClick={(e) => {
                        //   e.preventDefault();
                        //   window.location.href =
                        //     process.env.PUBLIC_URL + "/login";
                        // }}
                        id="login_form"
                        href="#modal"
                        className="stm_lms_log_in waves-effect waves-light modal-link"
                      >
                        {" "}
                        <i className="stmlms-user fa fa-user"></i>
                        <span
                          style={{ marginLeft: "10px", fontWeight: "bold" }}
                        >
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
                    <li className="DropDown" style={{}}>
                      <input
                        type="checkbox"
                        className="DropDown__checkbox"
                        id="navi-toggle3"
                      />

                      <label
                        htmlFor="navi-toggle3"
                        className="DropDown__button useracount"
                        style={{
                          fontSize: "12px",
                          marginLeft: "10px",
                          fontWeight: "bold",
                          fontFamily: "Open Sans",
                          color: "#fff",
                        }}
                      >
                        <figure>
                          {user.image_url ? (
                            <img src={user.image_url} alt="" width="20px" />
                          ) : (
                            <img
                              src="https://d30y9cdsu7xlg0.cloudfront.net/png/138926-200.png"
                              alt=""
                              width="20px"
                            />
                          )}
                        </figure>
                        {`${user?.first_name} ${user?.last_name}`}
                        <Dropdown />
                      </label>

                      <ul
                        className="DropDown__list userdropdown makeText authlinker"
                        style={{ marginLeft: "90px" }}
                      >
                        {AUTHLINKS.length > 0 &&
                          AUTHLINKS.map((item, i) => {
                            return (
                              <li
                                className="DropDown__item"
                                style={{ height: "35px", marginTop: "2px" }}
                              >
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
                          <Link
                            className=""
                            to={process.env.PUBLIC_URL + "/cart"}
                          >
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
                      </ul>
                    </li>
                  </Fragment>
                )}
              </ul>

              <button ref={toogleBtn} onClick={openNav} className="nav-icon">
                <div className="bar1"></div>
                <div className="bar2"></div>
                <div className="bar3"></div>
              </button>
            </nav>
          </div>
          <br />
        </Fragment>
      )}

      <AuthWindow showLogin={showLogin} showSignup={showSignup} />
    </Fragment>
  );
};

NavBar.propTypes = {
  auth: PropTypes.object.isRequired,
  logOut: PropTypes.func.isRequired,
  cart: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.cart,
  auth: state.auth,
});

export default connect(mapStateToProps, { logOut })(NavBar);

