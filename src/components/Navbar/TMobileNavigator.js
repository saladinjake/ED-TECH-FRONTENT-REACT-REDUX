import React, { Fragment } from "react";
import $ from "jquery";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logOut } from "actions/authActions";

import "./newmobilenav.css";
import questence from "assets/pngs/logoweb.png";

import { CATEGORIES, PACES, AUTHLINKS, PROGRAM_LINK } from "./data";

import { getCategories } from "services/category";
import toast from "react-hot-toast";
import { useQuery } from "hooks/useQuery.js";
import AuthWindow from "./PopUpWindow";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

class Tmobile extends React.Component {
  makeQuery = () => {
    //window.location.hash
    return new URLSearchParams(window.location.search);
  };

  constructor(props) {
    super(props);
    this.state = {
      categories: [],
      queryVal: "",
      querySearchVal: "",
      querySearchMethod: "",
    };
    this.routeQuery = "";
  }

  async componentDidMount() {
    const query = this.makeQuery();
    this.routeQuery = query.get("filter");
    this.setState({
      querySearchVal: query.get("search"),
      querySearchMethod: query.get("method"),
    });

    if (document.getElementById("search-btn")) {
      if (this.routeQuery !== null && this.routeQuery.length > 0) {
        this.setState({
          querySearchVal: query.get("search"),
          querySearchMethod: query.get("method"),
          queryVal: this.routeQuery,
        });

        document.getElementById("search-btn").style.display = "none";
        document.getElementById("reset-btn").style.display = "block";
      }
    }

    try {
      let res = await getCategories();

      this.setState({ categories: [...res.data.data] });
      console.log(this.state.categories);
    } catch (err) {
      console.log(err);
      toast.error("Error occured fetching notifications");
    }
    // setLoading(false);

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
        $(this).append('<span class="caret"></span>');
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
        let a = $(this).find("a")[0];
        let ch = $(this).find("ul")[0];
        if ($(a).hasClass("menu-is-closed")) {
          if ($(ch).css("display") == "none") {
            $(this).removeClass("menu-is-closed");
            $(ch).css({ display: "block" });
          } else {
            $(this).addClass("menu-is-open");
            $(ch).css({ display: "none" });
          }
        } else if ($(a).hasClass("menu-is-open")) {
          $(this).removeClass("menu-is-open");
          if ($(ch).css("display") == "block") {
            $(ch).css({ display: "none" });
          } else {
            $(this).removeClass("menu-is-closed");
            $(ch).css({ display: "block" });
          }
        }

        // $(".parent ul").not(this).css({display:"none"})
        // $(this).css({display:"block"})
      });

      // $(".no-ripper").on("click", function (e) {
      //   e.preventDefault();
      //   alert("clicked an li")
      //   $(".show-me").css({display:"block"})
      //   let ch = $(this).find("ul")[0];

      //   // let ch = $(this).find('ul')[0]
      //   // if ($(ch).css("display") == "none") {
      //   //   $(ch).css({ display: "block" });
      //   // } else {
      //   //    $(ch).css({display:"none"})
      //   // }
      // });

      $(".dropdown_menu a").append("<span></span>");

      /* ========== Added header shadow ========== */
      headerShadow.append('<div class="header-shadow-wrapper"></div>');

      /* ========== Menu hover transition ========== */
      var listMenuHover4 = $(".navik-menu.menu-hover-4 > ul > li > a");
      listMenuHover4.append('<div class="hover-transition"></div>');
    });
  }

  handleLogout = async () => {
    await logOut();
    // history.push("/");
    // window.location.href=process.env.PUBLIC_URL+ "/"
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  handleReset = (e) => {
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

  handleKeyPress = (e) => {
    if (e.key == "Enter") {
      this.handleSearch(e);
      e.target.style.display = "none";
      document.getElementById("reset-btn").style.display = "block";
    }
  };

  handleSearch = (e) => {
    e.preventDefault();
    const searchVal = document.getElementById("search")?.value;
    if (searchVal.length > 0) {
      alert(
        searchVal,
        `/courses?method=name&search=${searchVal}&filter=course`
      );
      // history.push(`/courses?method=name&search=${searchVal}&filter=course`);
      window.location.href =
        process.env.PUBLIC_URL +
        `/courses?method=name&search=${searchVal}&filter=course`;
      setTimeout(() => {
        window.location.reload();
      }, 2000);
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

  render() {
    const {
      cart: { cart },
      auth: { token, isAuthenticated, user, user_roles },
      logOut,
      hambuggerComponent,
    } = this.props;

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

            <div className="nav-icon burger-menu">
              <div className="line-menu  first-line bar1"></div>
              <div className="line-menu  bar2"></div>
              <div className="line-menu  last-line bar3"></div>
            </div>

            <nav className="navik-menu menu-caret submenu-top-border submenu-scale">
              <ul className="list-unstyled">
                <li>
                  <Link to={process.env.PUBLIC_URL + "/courses"}>
                    Courses And Programmes{" "}
                  </Link>
                </li>

                <li className="current-menu got-sub-menu-dynamic ripper">
                  <a href="#" className="menu-is-closed">
                    {" "}
                    By Category
                  </a>
                  <ul className="list-unstyled show-me">
                    {this.state.categories.length > 0 &&
                      this.state.categories.map((item, i) => {
                        return (
                          <Fragment>
                            <li className="got-sub-menu-child no-ripper ">
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
                  <ul
                    className="list-unstyled"
                    style={{ fontFamily: "Open Sans" }}
                  >
                    {PROGRAM_LINK.length > 0 &&
                      PROGRAM_LINK.map((item) => {
                        return (
                          <li style={{ fontFamily: "Open Sans" }}>
                            <a
                              style={{
                                color: "#000",

                                fontFamily: "Open Sans",
                                color: "#000",

                                zIndex: "25",
                              }}
                              className=" "
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

                <li>
                  <div className="search__form">
                    <input
                      className="zoomText serach form-control"
                      onKeyPress={this.handleKeyPress}
                      type="text"
                      name="search form-control"
                      id="search"
                      placeholder="Search For A Course"
                      style={{
                        padding: "20px",
                        fontFamily: "Open Sans",
                        color: "#000",
                        zIndex: "25",
                        margin: "10px",
                        width: "95%",
                      }}
                    />
                    <a
                      href="#"
                      onClick={this.handleSearch}
                      style={{
                        color: "#fff",
                        marginTop: "10px",
                        padding: "10px",

                        zIndex: "25",
                        background: "rgb(2, 83, 200)",
                        padding: "10px",
                        width: "95%",
                        margin: "10px",
                      }}
                      id="search-btn"
                      className="btn btn-large"
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
                      onClick={this.handleReset}
                      type="button"
                      style={{
                        color: "#fff",
                        display: "none",

                        margin: "10px",
                        width: "95%",

                        fontFamily: "Open Sans",

                        zIndex: "25",
                        background: "rgb(2, 83, 200)",
                        padding: "10px",
                      }}
                      id="reset-btn"
                      className="btn btn-large"
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

                {!this.props.isAuthenticated ? (
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
                          width: "95%",

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
                          margin: "10px",
                          width: "95%",
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
                      <a href="#">
                        {" "}
                        {`${user?.first_name} ${user?.last_name}`}
                      </a>
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
                        Cart{" "}
                        {this.props.cart !== undefined &&
                          `(${this.props.cart?.length})`}
                      </Link>
                    </li>

                    <li
                      className="DropDown__item"
                      style={{ height: "30px", marginTop: "2px" }}
                    >
                      <Link className="" onClick={this.handleLogout}>
                        Logout
                      </Link>
                    </li>
                  </Fragment>
                )}
              </ul>
            </nav>
          </div>
        </div>
      </div>
    );
  }
}

Tmobile.propTypes = {
  auth: PropTypes.object.isRequired,
  logOut: PropTypes.func.isRequired,
  cart: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.cart,
  auth: state.auth,
});

export default connect(mapStateToProps, { logOut })(Tmobile);
