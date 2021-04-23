import React, { Fragment, useRef } from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";
import questence from "assets/svgs/questence-logo.svg";
import { useHistory } from "react-router-dom";
import { ReactComponent as Dropdown } from "svgs/dropdown.svg";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logOut } from "actions/authActions";

import { uuid } from "services/dashboard";

import { CATEGORIES, PACES, FEES, AUTHLINKS } from "./data";

const NavBar = ({
  cart: { cart },
  auth: { isAuthenticated, user },
  logOut,
}) => {
  const toogleBtn = useRef();
  const mobileNav = useRef();

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
      <nav className="desktop" style={{position:"fixed"}}>
        <figure className="logo">
          <Link to="/">
            <img src={questence} alt="" width="171px" />
          </Link>
        </figure>

        <ul className="mainNav" ref={mobileNav}>
          <li className="NavHover" key={new Date().getUTCMilliseconds() + Math.random()}>
            <div className="parent">
              <span>Courses and Programs</span>
              <Dropdown />
            </div>
            <ul className="ParentDropDown">
              <li className="ParentDropDown__item" key={new Date().getUTCMilliseconds() + Math.random()}>
                <Link
                key={new Date().getUTCMilliseconds() + Math.random()}
                  className="DropDown__link"
                  to={process.env.PUBLIC_URL + "/courses"}
                >
                  All Courses
                </Link>
              </li>

              <li className="ParentDropDown__item">
                <span>By Category</span>
                <ul className="NavSubMenu">
                  {CATEGORIES.length > 0 &&
                    CATEGORIES.map((item, i) => {
                      return (
                        <li key={new Date().getUTCMilliseconds() + Math.random()}>
                          <Link
                          key={new Date().getUTCMilliseconds() + Math.random()}
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
              
              <li className="ParentDropDown__item" key={new Date().getUTCMilliseconds() + Math.random()}>
                <Link
                key={new Date().getUTCMilliseconds() + Math.random()}
                  className="DropDown__link"
                  to={process.env.PUBLIC_URL + "/courses"}
                >
                  By Program
                </Link>
              </li>
 
              <li className="ParentDropDown__item" key={new Date().getUTCMilliseconds() + Math.random()}>
                <Link
                key={new Date().getUTCMilliseconds() + Math.random()}
                  className="DropDown__link"
                  to={process.env.PUBLIC_URL + "/courses"}
                >
                  By Training Partner
                </Link>
              </li>
{/* 
              <li className="ParentDropDown__item">
                <span>By Fee</span>
                <ul className="NavSubMenu">
                  {FEES.length > 0 &&
                    FEES.map((item, i) => {
                      return (
                        <li key={new Date().getUTCMilliseconds() + Math.random()}>
                          <Link className="DropDown__link" to={`${item.link}`}>
                            {item.name}
                          </Link>
                        </li>
                      );
                    })}
                </ul>
              </li> */}

              <li className="ParentDropDown__item">
                <span>By Learning Style</span>
                <ul className="NavSubMenu">
                  {PACES.length > 0 &&
                    PACES.map((item, i) => {
                      return (
                        <li key={new Date().getUTCMilliseconds() + Math.random()}>
                          <Link key={new Date().getUTCMilliseconds() + Math.random()} className="DropDown__link" to={`${item.link}`}>
                            {item.name}
                          </Link>
                        </li>
                      );
                    })}
                </ul>
              </li>
            </ul>
          </li>

          <li className="NavHover" key={new Date().getUTCMilliseconds() + Math.random()}>
            <div className="parent">
              <span> For Institutions</span>
              <Dropdown />
            </div>
            <ul className="ParentDropDown">
              <li className="ParentDropDown__item" key={new Date().getUTCMilliseconds() + Math.random()}>
                <Link
                  className="DropDown__link"
                  to={process.env.PUBLIC_URL + "/schools"}
                >
                  For Schools
                </Link>
              </li>
              <li className="ParentDropDown__item" key={new Date().getUTCMilliseconds() + Math.random()}>
                <Link
                  className="DropDown__link"
                  to={process.env.PUBLIC_URL + "/government"}
                >
                  For Government
                </Link>
              </li>
              <li className="ParentDropDown__item" key={new Date().getUTCMilliseconds() + Math.random()}>
                <Link
                key={new Date().getUTCMilliseconds() + Math.random()}
                  className="DropDown__link"
                  to={process.env.PUBLIC_URL + "/business"}
                >
                  For Businesses
                </Link>
              </li>
            </ul>
          </li>

        

          <li className="search__group" key={new Date().getUTCMilliseconds() + Math.random()}>
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

          {!isAuthenticated ? (
            <Fragment>
              <li key={new Date().getUTCMilliseconds() + Math.random()}>
                <Link to="/login" className="auth outline">
                  Log In
                </Link>
              </li>
              <li key={new Date().getUTCMilliseconds() + Math.random()}>
                <button
                  className="btnMobileFull"
                  onClick={() => history.push("register")}
                >
                  Sign Up
                </button>
              </li>
            </Fragment>
          ) : (
            <Fragment>
              <li className="DropDown" key={new Date().getUTCMilliseconds() + Math.random()}>
                <input
                  type="checkbox"
                  className="DropDown__checkbox"
                  id="navi-toggle3"
                />

                <label
                  htmlFor="navi-toggle3"
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

                <ul className="DropDown__list userdropdown">
                  {AUTHLINKS.length > 0 &&
                    AUTHLINKS.map((item, i) => {
                      return (
                        <li key={new Date().getUTCMilliseconds() + Math.random()} className="DropDown__item">
                          <Link key={new Date().getUTCMilliseconds() + Math.random()} className="DropDown__link" to={`${item.link}`}>
                            {item.name}
                          </Link>
                        </li>
                      );
                    })}

                  <li className="DropDown__item" key={new Date().getUTCMilliseconds() + Math.random()}>
                    <Link 
                    key={new Date().getUTCMilliseconds() + Math.random()}
                      className="DropDown__link"
                      to={process.env.PUBLIC_URL + "/cart"}
                    >
                      Cart {cart !== undefined && `(${cart?.length})`}
                    </Link>
                  </li>

                  <li className="DropDown__item" key={new Date().getUTCMilliseconds() + Math.random()}>
                    <Link key={new Date().getUTCMilliseconds() + Math.random()} className="DropDown__link" to="#" onClick={handleLogout}>
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
      <br/>
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
