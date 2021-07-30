import React, { Fragment, useRef, useState, useEffect } from "react";
import $ from "jquery";
import "./newmobilenav.css";
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

const MobileMenu = ({
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
      //

       var navikHeader = $(".navik-header"),
        navikHeaderHeight = navikHeader.height(),
        logo = navikHeader.find(".logo"),
        logoImg = logo.find("img"),
        logoSrc = logoImg.attr("src"),
        logoClone = logo.clone(),
        mobileLogoSrc = logo.data("mobile-logo"),
        stickyLogoSrc = logo.data("sticky-logo"),
        burgerMenu = navikHeader.find(".burger-menu"),
        navikMenuListWrapper = $(".navik-menu > ul"),
        navikMenuListDropdown = $(".navik-menu ul li:has(ul)"),
        headerShadow = $(".navik-header.header-shadow"),
        headerTransparent = $(".navik-header.header-transparent"),
        headerOpacity = $(".navik-header.header-opacity"),
        megaMenuFullwidthContainer = $(
          ".mega-menu-fullwidth .mega-menu-container"
        );

      /* ========== Center menu 1 ========== */
      $(".center-menu-1 .navik-menu > ul:first-child").after(
        '<div class="logoCenter"></div>'
      );
      $(".logoCenter").html(logoClone);

      /* ========== Mega menu fullwidth wrap container ========== */
      megaMenuFullwidthContainer.each(function () {
        $(this)
          .children()
          .wrapAll('<div class="mega-menu-fullwidth-container"></div>');
      });

      /* ========== Dropdown Menu Toggle ========== */
      burgerMenu.on("click", function () {
        $(this).toggleClass("menu-open");
        navikMenuListWrapper.slideToggle(300);
      });

      navikMenuListDropdown.each(function () {
        $(this).append('<span class="dropdown-plus"></span>');
        $(this).addClass("dropdown_menu");
      });

      $(".got-sub-menu").on("click", function (e) {
        // e.preventDefault();
        // $(this).prev('ul').slideToggle(450);

        let ch = $(this).find("ul")[0];
        if ($(ch).css("display") == "none") {
          $(ch).css({ display: "block" });
        } else {
          $(ch).css({ display: "none" });
        }

        // $(".parent ul").not(this).css({display:"none"})
        // $(this).css({display:"block"})
      });

      $(".got-sub-menu-dynamic").on("click", function (e) {
        // e.preventDefault();
        // $(this).prev('ul').slideToggle(450);

        let ch = $(this).find("ul")[0];
        if ($(ch).css("display") == "none") {
          $(ch).css({ display: "block" });
        } else {
          $(ch).css({ display: "none" });
        }

        // $(".parent ul").not(this).css({display:"none"})
        // $(this).css({display:"block"})
      });

      $(".dropdown-plus").on("click", function (e) {
        // e.preventDefault();
        let ch = $(this).parent().find("ul")[0];

        // let ch = $(this).find('ul')[0]
        if ($(ch).css("display") == "none") {
          $(ch).css({ display: "block" });
        } else {
          // $(ch).css({display:"none"})
        }
      });

      $(".dropdown_menu a").append("<span></span>");

      /* ========== Added header shadow ========== */
      headerShadow.append('<div class="header-shadow-wrapper"></div>');

      /* ========== Menu hover transition ========== */
      var listMenuHover4 = $(".navik-menu.menu-hover-4 > ul > li > a");
      listMenuHover4.append('<div class="hover-transition"></div>');








      //login signup forget pass

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

  /* ========== Menu overlay transition ========== */
  function overlayMenuTransition() {
    var overlayMenuFirst = $(".navik-menu-overlay > ul > li:first-child"),
      overlayMenuList = $(".navik-menu-overlay > ul > li");

    overlayMenuFirst.attr("data-delay", "0");

    overlayMenuList.each(function () {
      var $this = $(this),
        overlayMenuNext = $this.next("li"),
        menuDataDelay = $this.attr("data-delay"),
        menuDataDelayNext = parseInt(menuDataDelay) + parseInt("100");

      overlayMenuNext.attr("data-delay", menuDataDelayNext);

      $this.delay(menuDataDelay).queue(function (next) {
        $(this).addClass("menuSlideIn");
        next();
      });
    });
  }


  return (
    <div className="navik-header header-shadow">
      <div className="container">
        <div className="navik-header-container">
          <div
            className="logo"
            data-mobile-logo={questence}
            data-sticky-logo={questence}
          >
            <a href={process.env.PUBLIC_URL + "/"}>
              {" "}
              <img src={questence} alt="" width="171px" />
            </a>
          </div>

          <div className="burger-menu">
            <div className="line-menu line-half first-line"></div>
            <div className="line-menu"></div>
            <div className="line-menu line-half last-line"></div>
          </div>

          <nav className="navik-menu menu-caret submenu-top-border submenu-scale">
            <ul className="list-unstyled">
              <li>
                <Link to={process.env.PUBLIC_URL + "/courses"}>
                  Courses And Programmes{" "}
                </Link>
              </li>

              <li className="current-menu got-sub-menu-dynamic ripper">
                <a href="#"> By Category</a>
                <ul className="list-unstyled show-me">
                  {categories.length > 0 &&
                    categories.map((item, i) => {
                      return (
                        <Fragment>
                          <li className="got-sub-menu-child no-ripper">
                            <Link
                              className=" "
                              to={`${process.env.PUBLIC_URL}/courses/category/${item.id}`}
                            >
                              {item.name}
                            </Link>

                            {item.subcategories.length > 0 &&
                              item.subcategories.map((cat, i) => {
                                return (
                                  <ul className="list-unstyled show-me">
                                    <li>
                                      <a
                                        href={`${process.env.PUBLIC_URL}/courses/category/${cat.id}`}
                                      >
                                        {cat.name}
                                      </a>
                                    </li>
                                  </ul>
                                );
                              })}
                          </li>
                        </Fragment>
                      );
                    })}

                  {/*<li><a href="#">Dropdown menu</a>
                                	<ul  className="list-unstyled">
                                    	<li><a href="#">Dropdown sub menu</a></li>
                                      <li><a href="#">Dropdown sub menu</a></li>
                                      <li><a href="#">Dropdown sub menu</a></li>
                                      <li><a href="#">Dropdown sub menu</a></li>
                                  </ul>
                              </li>*/}
                </ul>
              </li>
              <li className="got-sub-menu">
                <a href="#">By Program</a>
                <ul className="list-unstyled">
                  {PROGRAM_LINK.length > 0 &&
                    PROGRAM_LINK.map((item) => {
                      return (
                        <li>
                          <a
                            style={{
                              color: "#000",

                              fontFamily: "Open Sans",
                              color: "#000",

                              zIndex: "25",
                            }}
                            className=" "
                            role="button"
                            aria-haspopup="true"
                            href={`${process.env.PUBLIC_URL}/institute/${item.id}`}
                          >
                            {item.name}
                          </a>
                        </li>
                      );
                    })}
                </ul>
              </li>
              <li class="got-sub-menu">
                <a href="#">For Institutions</a>
                <ul className="list-unstyled">
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
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

MobileMenu.propTypes = {
  auth: PropTypes.object.isRequired,
  logOut: PropTypes.func.isRequired,
  cart: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.cart,
  auth: state.auth,
});

export default connect(mapStateToProps, { logOut })(MobileMenu);
