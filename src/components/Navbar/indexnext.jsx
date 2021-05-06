import React, { Fragment, useRef, useEffect, useState } from "react";

import { Link } from "react-router-dom";
import "./navbar.scss";
import questence from "assets/svgs/questence-logo.svg";
import { useHistory } from "react-router-dom";
import { ReactComponent as Dropdown } from "svgs/dropdown.svg";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logOut } from "actions/authActions";

import "./core.css";
import "./components.css";

import {
  //CATEGORIES,
  PACES,
  AUTHLINKS,
} from "./data";

import "./nav.css";

import { getCategories } from "services/category";
import toast from "react-hot-toast";

const NavBar = ({
  cart: { cart },
  auth: { isAuthenticated, user },
  logOut,
}) => {
  const toogleBtn = useRef();
  const mobileNav = useRef();

  const [categories, setInfo] = useState([]);

  useEffect(() => {
    (async function loadContent() {
      try {
        let res = await getCategories(user.id);

        setInfo([...res.data.data]);
        console.log(res);
      } catch (err) {
        toast.error("Error occured fetching notifications");
      }
      // setLoading(false);
    })();
    // eslint-disable-next-line
  }, []);

  const openNav = () => {
    toogleBtn.current.classList.toggle("mobActive");
    mobileNav.current.classList.toggle("mobactive");
  };

  let history = useHistory();

  const handleLogout = async () => {
    await logOut();
    history.push("/login");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const searchVal = document.getElementById("search")?.value;
    if (searchVal.length > 0) {
      history.push(`/courses?method=name&search=${searchVal}&filter=course`);
    }
  };

  return (
    <Fragment>
      <section class="menu-area">
        <div>
          <div class="row">
            <div class="col-md-12">
              <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <ul class="mobile-header-buttons">
                  <li>
                    <a class="mobile-nav-trigger" href="#mobile-primary-nav">
                      Menu<span></span>
                    </a>
                  </li>
                  <li>
                    <a class="mobile-search-trigger" href="#mobile-search">
                      Search<span></span>
                    </a>
                  </li>
                </ul>

                <Link to={process.env.PUBLIC_URL + "/"} class="navbar-brand">
                  <img src={questence} alt="" width="171px" height="35" />
                </Link>

                <div class="main-nav-wrap">
                  <div class="mobile-overlay"></div>

                  <ul className="mobile-main-nav">
                    <div class="mobile-menu-helper-top"></div>

                    <li className="has-children">
                      <a href="">
                        <i class="fas fa-th d-inline"></i>
                        <span>Courses</span>
                        <span class="has-sub-category">
                          <i class="fas fa-angle-right"></i>
                        </span>
                      </a>

                      <ul className="category corner-triangle top-left is-hidden pb-0">
                        <li class="go-back">
                          <a href="">
                            <i class="fas fa-angle-left"></i>Menu
                          </a>
                        </li>

                        {categories.length > 0 &&
                          categories.map((item, i) => {
                            return (
                              <li class="has-children">
                                <Link
                                  to={`${process.env.PUBLIC_URL}/courses/category/${item.id}`}
                                >
                                  <span class="icon">
                                    <i class="fas fa-chess"></i>
                                  </span>
                                  <span> {item.name}</span>
                                  <span class="has-sub-category">
                                    <i class="fas fa-angle-right"></i>
                                  </span>
                                </Link>
                                <ul class="sub-category is-hidden">
                                  {item.subcategories.length > 0 &&
                                    item.subcategories.map((cat) => {
                                      return (
                                        <Fragment>
                                          <li class="go-back-menu">
                                            <a href="#">
                                              <i class="fas fa-angle-left"></i>
                                              Menu
                                            </a>
                                          </li>
                                          <li class="go-back">
                                            <a href="#">
                                              <i class="fas fa-angle-left"></i>
                                              <span class="icon">
                                                <i class="fas fa-chess"></i>
                                              </span>
                                            </a>
                                          </li>
                                          <li>
                                            <Link
                                              onClick={() => {
                                                window.location.href = `${process.env.PUBLIC_URL}/courses/${cat.id}`;
                                              }}
                                              to={`${process.env.PUBLIC_URL}/courses/${cat.id}`}
                                            >
                                              {" "}
                                              {cat.name}
                                            </Link>
                                          </li>
                                        </Fragment>
                                      );
                                    })}
                                </ul>
                              </li>
                            );
                          })}

                        <li class="all-category-devided mt-2 mb-0 p-0">
                          <Link
                            to={process.env.PUBLIC_URL + "/courses"}
                            class="py-3"
                          >
                            <span class="icon">
                              <i class="fa fa-align-justify"></i>
                            </span>
                            <span>All courses</span>
                          </Link>
                        </li>
                      </ul>
                    </li>

                    <div class="mobile-menu-helper-bottom"></div>
                  </ul>
                </div>

                <div class="input-group search-box mobile-search">
                  <div className="search__form">
                    <input
                      type="text"
                      name="search"
                      id="search"
                      placeholder="Search for a course"
                    />
                    <button
                      onClick={handleSearch}
                      type="button"
                      style={{ marginLeft: "10px" }}
                    >
                      Search
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
                    </button>
                  </div>
                </div>

                {/* <div class="instructor-box menu-icon-box">
                            <div class="icon">
                                <a href="#user" >Link here</a>
                            </div>
                        </div>
                    
                        <div class="instructor-box menu-icon-box">
                            <div class="icon">
                                <a href="mycourses" >My courses</a>
                            </div>
                        </div>*/}

                {isAuthenticated ? (
                  <div class="wishlist-box menu-icon-box" id="wishlist_items">
                    <div class="icon">
                      <a href="">
                        <i class="far fa-heart" style={{ color: "#fff" }}></i>
                      </a>
                      <span class="number">1</span>
                    </div>
                    <div class="dropdown course-list-dropdown corner-triangle top-right">
                      <div class="list-wrapper">
                        <div class="item-list">
                          <ul>
                            <li>
                              <div class="item clearfix">
                                <div class="item-image">
                                  <a href="">
                                    <img
                                      src="#uploads/thumbnails/course_thumbnails/course_thumbnail_default_26.jpg"
                                      alt=""
                                      class="img-fluid"
                                    />
                                  </a>
                                </div>
                                <div class="item-details">
                                  <a href="#home">
                                    <div class="course-name">
                                      Questence SS1 Mathematics
                                    </div>
                                    <div class="instructor-name">
                                      Demo course not implemented
                                    </div>

                                    <div class="item-price">
                                      <span class="current-price">N20000</span>
                                    </div>
                                  </a>
                                  <button>Already purchased</button>
                                </div>
                              </div>
                            </li>
                          </ul>
                        </div>
                        <div class="dropdown-footer">
                          <a href="#my_wishlist">Go to wishlist</a>
                        </div>
                      </div>
                      <div class="empty-box text-center d-none">
                        <p>Your wishlist is empty.</p>
                        <a href="">Explore courses</a>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Fragment />
                )}

                {isAuthenticated ? (
                  <div class="cart-box menu-icon-box" id="cart_items">
                    <div class="icon" style={{ color: "#fff" }}>
                      <a href="#">
                        <i
                          style={{ color: "#fff" }}
                          class="fas fa-shopping-cart"
                        ></i>
                      </a>
                      <span class="number">
                        {cart !== undefined && `(${cart?.length})`}
                      </span>
                    </div>

                    <div class="dropdown course-list-dropdown corner-triangle top-right">
                      <div class="list-wrapper">
                        <div class="item-list">
                          <ul></ul>
                        </div>
                        <div class="dropdown-footer">
                          <div class="cart-total-price clearfix">
                            <span>Total:</span>
                            <div class="float-right">
                              <span class="current-price"></span>
                            </div>
                          </div>
                          <Link to={process.env.PUBLIC_URL + "/cart"}>
                            Go to cart
                          </Link>
                        </div>
                      </div>
                      <div class="empty-box text-center d-none">
                        <p>Your cart is empty.</p>
                        <a href="">Keep Shopping</a>
                      </div>
                    </div>
                  </div>
                ) : (
                  <Fragment />
                )}

                <div class="user-box menu-icon-box">
                  {isAuthenticated ? (
                    <Fragment>
                      <div class="icon">
                        <a href="javascript::">
                          <img
                            src={
                              process.env.PUBLIC_URL +
                              "/assets/images/questone.jpg"
                            }
                            alt=""
                            width="20px"
                          />
                        </a>
                      </div>
                    </Fragment>
                  ) : (
                    <div style={{ width: "100px" }}>
                      <Link onClick={() => history.push("login")}>Login |</Link>

                      <Link onClick={() => history.push("register")}>
                        Sign Up
                      </Link>
                    </div>
                  )}

                  <div class="dropdown user-dropdown corner-triangle top-right">
                    <ul class="user-dropdown-menu">
                      {!isAuthenticated ? (
                        <Fragment></Fragment>
                      ) : (
                        <Fragment>
                          {/* <li class="dropdown-user-info">
                                <a href="">
                                    <div class="clearfix">
                                        <div class="user-image float-left">
                                             <img
                      src={
                        process.env.PUBLIC_URL + "/assets/images/questone.jpg"
                      }
                      alt=""
                      width="20px"
                    />
                                        </div>
                                        <div class="user-details">
                                        </div>
                                    </div>
                                </a>
                            </li>*/}
                        </Fragment>
                      )}
                    </ul>
                  </div>
                </div>
              </nav>
            </div>
          </div>
        </div>
      </section>

      <nav className="desktop" style={{ height: "40px" }}>
        {/*<figure className="logo">
          <Link to="/">
            <img src={questence} alt="" width="171px" />
          </Link>
        </figure>*/}

        <ul className="mainNav" ref={mobileNav}>
          {/*   <li className="NavHover">
            <div className="parent">
              <span>Courses and Programs</span>
              <Dropdown />
            </div>
            <ul className="ParentDropDown">
              <li className="ParentDropDown__item">
                <Link
                  className="DropDown__link"
                  to={process.env.PUBLIC_URL + "/courses"}
                >
                  All Courses
                </Link>
              </li>

              <li className="ParentDropDown__item">
                <span style={{marginRight:"50px"}}>By Category</span>
                 <span class="caret-right"></span>
                <ul className="NavSubMenu">
                  {categories.length > 0 &&
                    categories.map((item, i) => {
                      return (
                        <li  style={{height:"30px"}}>
                          <Link
                            className="DropDown__link"
                            to={`${process.env.PUBLIC_URL}/courses/category/${item.id}`}
                          >
                            {item.name}
                          </Link>
                        </li>
                      );
                    })}
                </ul>
              </li>
           <li className="ParentDropDown__item">
                <Link
                  className="DropDown__link"
                  to={process.env.PUBLIC_URL + "/courses"}
                >
                  By Program
                </Link>
              </li>
 
              <li className="ParentDropDown__item">
                <Link
                  className="DropDown__link"
                  to={process.env.PUBLIC_URL + "/courses"}
                >
                  By Training Partner
                </Link>
              </li>
 
              <li className="ParentDropDown__item">
                <span>By Fee</span>
                <ul className="NavSubMenu">
                  {FEES.length > 0 &&
                    FEES.map((item, i) => {
                      return (
                        <li>
                          <Link className="DropDown__link" to={`${item.link}`}>
                            {item.name}
                          </Link>
                        </li>
                      );
                    })}
                </ul>
              </li> 

              <li className="ParentDropDown__item">
                <span>By Learning Style</span>
                <ul className="NavSubMenu">
                  {PACES.length > 0 &&
                    PACES.map((item, i) => {
                      return (
                        <li>
                          <Link className="DropDown__link" to={`${item.link}`}>
                            {item.name}
                          </Link>
                        </li>
                      );
                    })}
                </ul>
              </li>
            </ul>
          </li>*/}

          <li className="NavHover">
            <div className="parent">
              <span> For Institutions</span>
              <Dropdown />
            </div>
            <ul className="ParentDropDown">
              <li className="ParentDropDown__item">
                <Link
                  className="DropDown__link"
                  to={process.env.PUBLIC_URL + "/schools"}
                >
                  For Schools
                </Link>
              </li>
              <li className="ParentDropDown__item">
                <Link
                  className="DropDown__link"
                  to={process.env.PUBLIC_URL + "/government"}
                >
                  For Government
                </Link>
              </li>
              <li className="ParentDropDown__item">
                <Link
                  className="DropDown__link"
                  to={process.env.PUBLIC_URL + "/business"}
                >
                  For Businesses
                </Link>
              </li>
            </ul>
          </li>

          {/*<li className="search__group">
            <div className="search__form">
              <input
                type="text"
                name="search"
                id="search"
                placeholder="Search for a course"
              />
              <button onClick={handleSearch} type="button">
                Search
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
              </button>
            </div>
          </li>
           <li className="dropdown top-menu-item-xs" style={{float:"left"}}>
                <Link alt="noimage" to={process.env.PUBLIC_URL + "/cart"} className=" waves-effect waves-light"  aria-expanded="true">
                   <i className="fa fa-shopping-cart"></i> <span className="badge badge-xs badge-danger">{cart !== undefined && `(${cart?.length})`}</span>
                                                    </Link>
                                                    
                                                </li>

           */}

          {!isAuthenticated ? (
            <Fragment></Fragment>
          ) : (
            <Fragment>
              <li className="DropDown">
                <input
                  type="checkbox"
                  className="DropDown__checkbox"
                  id="navi-toggle3"
                />

                <label
                  for="navi-toggle3"
                  className="DropDown__button useracount"
                >
                  <figure>
                    <img
                      src={
                        process.env.PUBLIC_URL + "/assets/images/questone.jpg"
                      }
                      alt=""
                      width="20px"
                    />
                  </figure>
                  {`${user?.first_name} ${user?.last_name}`}
                </label>

                <ul
                  className="DropDown__list userdropdown"
                  style={{ marginLeft: "100px", marginTop: "-20px" }}
                >
                  {AUTHLINKS.length > 0 &&
                    AUTHLINKS.map((item, i) => {
                      return (
                        <li className="DropDown__item">
                          <Link className="DropDown__link" to={`${item.link}`}>
                            {item.name}
                          </Link>
                        </li>
                      );
                    })}

                  <li className="DropDown__item" style={{ height: "30px" }}>
                    <Link className="DropDown__link" onClick={handleLogout}>
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
