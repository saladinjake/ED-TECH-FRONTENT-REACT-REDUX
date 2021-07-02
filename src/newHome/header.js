import React from "react";
import questence from "assets/svgs/questence-logo.svg";

const Section = () => {
  return (
    <div id="header" className="transparent_header_off" data-color="">
      <div className="header_default header_2">
        <div className="header_top_bar header_2_top_bar">
          <div className="container">
            <div className="row">
              <div className="col-md-12">
                <div className="header_2_top_bar__inner">
                  <div className="stm_lms_wpml_switcher">
                    <div className="pull-left language-switcher-unit">
                      <div
                        className="stm_current_language dropdown_toggle"
                        id="lang_dropdown"
                        data-toggle="dropdown"
                      >
                        For Institutions <i className="fa fa-chevron-down"></i>
                      </div>
                      <ul
                        className="dropdown-menu lang_dropdown_menu"
                        role="menu"
                        aria-labelledby="lang_dropdown"
                      >
                        <li role="presentation">
                          <a role="menuitem" tabindex="-1" href="#de">
                            Deutsch
                          </a>
                        </li>
                        <li role="presentation">
                          <a role="menuitem" tabindex="-1" href="#it">
                            Italian
                          </a>
                        </li>
                      </ul>
                    </div>
                  </div>
                  <div className="top_bar_right_part">
                    <div className="stm_menu_toggler" data-text="Menu"></div>
                    <div
                      className="header_main_menu_wrapper clearfix"
                      style={{ margintop: "5px" }}
                    >
                      <div className="pull-right hidden-xs right_buttons">
                        <div className="stm_lms_wishlist_button not-logged-in">
                          <a href="#" data-text="Favorites">
                            {" "}
                            <i className="far fa-heart mtc_h"></i>{" "}
                          </a>
                        </div>
                        <div className="search-toggler-unit">
                          <div
                            className="search-toggler"
                            data-toggle="modal"
                            data-target="#searchModal"
                          >
                            <i className="fa fa-search"></i>
                          </div>
                        </div>
                        <div className="pull-right">
                          <div className="header_top_bar_socs">
                            <ul className="clearfix">
                              <li>
                                <a href="https://www.twitter.com/">
                                  <i className="fab fa-twitter"></i>
                                </a>
                              </li>
                              <li>
                                <a href="https://www.instagram.com/">
                                  <i className="fab fa-instagram"></i>
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <i className="fab fa-behance"></i>
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <i className="fab fa-dribbble"></i>
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <i className="fab fa-flickr"></i>
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <i className="fab fa-git"></i>
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <i className="fab fa-linkedin"></i>
                                </a>
                              </li>
                              <li>
                                <a href="#">
                                  <i className="fab fa-pinterest"></i>
                                </a>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <div className="collapse navbar-collapse pull-right">
                        <ul className="header-menu clearfix">
                          <li
                            id="menu-item-5"
                            className="menu-item menu-item-type-post_type menu-item-object-page menu-item-5"
                          >
                            <a href="./courses">Courses</a>
                            <div
                              className="magic_line"
                              style={{ maxWidth: "47.7031px" }}
                            ></div>
                          </li>
                          {/*<li id="menu-item-3363" className="stm_lms_badge_menu menu-item menu-item-type-custom menu-item-object-custom menu-item-3363">
                                                <a title="Hot" href="#/">Zoom</a>
                                                <div className="magic_line" style={{maxWidth: "35.4219px"}}></div>
                                            </li>*/}
                          <li
                            id="menu-item-408"
                            className="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-408"
                          >
                            <a href="#/about-us/">Pages</a>
                            <span className="stm_lms_menu_toggle"></span>
                            <ul className="sub-menu">
                              <li
                                id="menu-item-3362"
                                className="menu-item menu-item-type-post_type menu-item-object-page menu-item-3362"
                              >
                                <a href="#/about-us/">About Us</a>
                              </li>
                              <li
                                id="menu-item-4148"
                                className="menu-item menu-item-type-post_type menu-item-object-page menu-item-has-children menu-item-4148"
                              >
                                <a href="#/blog/">Page 2</a>
                                <span className="stm_lms_menu_toggle"></span>
                                <ul className="sub-menu">
                                  <li
                                    id="menu-item-4152"
                                    className="menu-item menu-item-type-post_type menu-item-object-page menu-item-4152"
                                  >
                                    <a href="#/blog/">sub page</a>
                                  </li>
                                  <li
                                    id="menu-item-4151"
                                    className="menu-item menu-item-type-custom menu-item-object-custom menu-item-4151"
                                  >
                                    <a href="#/new-chicago-art-budget-relies-on-state-pension/">
                                      sub page
                                    </a>
                                  </li>
                                </ul>
                              </li>
                              {/*<li id="menu-item-4215" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-4215">
                                                        <a href="#/events/">Events</a><span className="stm_lms_menu_toggle"></span>
                                                        <ul className="sub-menu">
                                                            <li id="menu-item-4150" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-4150">
                                                                <a href="#/events/">Events – Grid</a>
                                                            </li>
                                                            <li id="menu-item-4225" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-4225">
                                                                <a href="#">Event with Sidebar</a>
                                                            </li>
                                                            <li id="menu-item-4216" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-4216">
                                                                <a href="#/">Event – Single Post</a>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                    <li id="menu-item-5395" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-5395"><a href="#/shop/">Shop</a></li>
                                                    <li id="menu-item-4224" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-4224">
                                                        <a href="#">Gallery</a><span className="stm_lms_menu_toggle"></span>
                                                        <ul className="sub-menu">
                                                            <li id="menu-item-4223" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-4223">
                                                                <a href="#/gallery/">Gallery Grid</a>
                                                            </li>
                                                            <li id="menu-item-4185" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-4185">
                                                                <a href="#/gallery-masonry/">Gallery Masonry</a>
                                                            </li>
                                                            <li id="menu-item-4220" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-4220">
                                                                <a href="//gallery/?sidebar_position=right">Gallery With Sidebar</a>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                    <li id="menu-item-4186" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children menu-item-4186">
                                                        <a href="#">Features</a><span className="stm_lms_menu_toggle"></span>
                                                        <ul className="sub-menu">
                                                            <li id="menu-item-4147" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-4147">
                                                                <a href="#/shortcodes/">Alerts and Shortcodes</a>
                                                            </li>
                                                            <li id="menu-item-407" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-407">
                                                                <a href="#/membership-account/membership-levels/">Pricing Plans</a>
                                                            </li>
                                                            <li id="menu-item-4146" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-4146">
                                                                <a href="#/typography/">Typography</a>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                    <li id="menu-item-3249" className="menu-item menu-item-type-post_type menu-item-object-page menu-item-3249">
                                                        <a title="Google Classrooms" href="#/google-classrooms/">Google Classrooms</a>
                                                    </li>*/}
                              <li
                                id="menu-item-418"
                                className="menu-item menu-item-type-post_type menu-item-object-page menu-item-418"
                              >
                                <a href="#/contact-us/">Contact Us</a>
                              </li>
                            </ul>
                            <div
                              className="magic_line"
                              style={{ maxWidth: "36.8906px" }}
                            ></div>
                          </li>
                          <li
                            id="menu-item-2926"
                            className="menu-item menu-item-type-post_type menu-item-object-page menu-item-2926"
                          >
                            <a title="New" href="#/course-bundles/">
                              Bundles and Programs
                            </a>
                            <div
                              className="magic_line"
                              style={{ maxWidth: "49.7656px" }}
                            ></div>
                          </li>
                          <li
                            id="menu-item-1322"
                            className="menu-item menu-item-type-custom menu-item-object-custom current-menu-item current_page_item menu-item-home current-menu-ancestor current-menu-parent menu-item-has-children menu-item-1322"
                          >
                            <a href="#/#" aria-current="page">
                              Course Formats
                            </a>
                            <span className="stm_lms_menu_toggle"></span>
                            {/*<ul className="sub-menu">
                                                    <li id="menu-item-1324" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-1324">
                                                        <a href="#/courses/real-things-art-painting-by-jason-ni/">Default Style</a>
                                                    </li>
                                                    <li id="menu-item-1325" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-1325">
                                                        <a href="#masterstudy/classic-lms/courses/how-to-be-a-dj-make-electronic-music/">Classic Style</a>
                                                    </li>
                                                    <li id="menu-item-1323" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-1323">
                                                        <a href="#masterstudy/udemy-affiliate/courses/the-complete-web-developer-course-2-0/">Udemy Affiliate Style</a>
                                                    </li>
                                                    <li id="menu-item-1326" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-1326">
                                                        <a href="#masterstudy/ms/courses/basic-time-management-course/">Offline Style</a>
                                                    </li>
                                                    <li id="menu-item-1327" className="menu-item menu-item-type-custom menu-item-object-custom current-menu-item current_page_item menu-item-home menu-item-has-children menu-item-1327">
                                                        <a href="#/#" aria-current="page">Free Courses</a><span className="stm_lms_menu_toggle"></span>
                                                        <ul className="sub-menu">
                                                            <li id="menu-item-1328" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-1328">
                                                                <a href="#masterstudy/dark-lms/courses/nvidia-and-ue4-technologies-overview-and-practice/">Default Style</a>
                                                            </li>
                                                            <li id="menu-item-1331" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-1331">
                                                                <a href="#masterstudy/classic-lms/courses/how-to-work-with-legendary-red-camera/">Classic Style</a>
                                                            </li>
                                                            <li id="menu-item-9308" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-9308">
                                                                <a href="#masterstudy/udemy-affiliate/courses/the-complete-ios-10-swift-3-developer-course/">Udemy Style</a>
                                                            </li>
                                                            <li id="menu-item-9309" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-9309">
                                                                <a href="#masterstudy/ms/courses/how-to-become-a-startup-founder/">Offline Style</a>
                                                            </li>
                                                        </ul>
                                                    </li>
                                                    <li id="menu-item-3990" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-3990">
                                                        <a href="#/courses/basics-of-masterstudy/880-3025">Lesson Style 1</a>
                                                    </li>
                                                    <li id="menu-item-3989" className="menu-item menu-item-type-custom menu-item-object-custom menu-item-3989">
                                                        <a href="#masterstudy/academy/courses/make-your-concept-right-and-beautiful/1000-16">Lesson Style 2</a>
                                                    </li>
                                                </ul>*/}
                            <div
                              className="magic_line"
                              style={{ maxWidth: "95.156px" }}
                            ></div>
                          </li>
                          <li
                            id="menu-item-1199"
                            className="stm_lms_badge_menu menu-item menu-item-type-custom menu-item-object-custom menu-item-1199"
                          >
                            <a
                              title="Hot"
                              href="#/?demo_login=#/user-account/edit-course"
                            >
                              Add Course
                            </a>
                            <div
                              className="magic_line"
                              style={{ maxwidth: "69.7969px" }}
                            ></div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    <div className="pull-right">
                      <div className="header_top_bar_socs">
                        <ul className="clearfix">
                          <li>
                            <a href="https://www.twitter.com/">
                              <i className="fab fa-twitter"></i>
                            </a>
                          </li>
                          <li>
                            <a href="https://www.instagram.com/">
                              <i className="fab fa-instagram"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="fab fa-behance"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="fab fa-dribbble"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="fab fa-flickr"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="fab fa-git"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="fab fa-linkedin"></i>
                            </a>
                          </li>
                          <li>
                            <a href="#">
                              <i className="fab fa-pinterest"></i>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-12">
              <div className="header_top" style={{ height: "50px" }}>
                <div className="logo-unit">
                  <a href="#/">
                    <img
                      className="img-responsive logo_transparent_static visible"
                      src={questence}
                      style={{ width: "253px" }}
                      alt="Education &amp; Online Course Management Questence Theme"
                    />
                  </a>
                </div>
                <div className="center-unit">
                  <div className="stm_courses_search">
                    <div className="stm_lms_categories">
                      <i className="stmlms-hamburger"></i>{" "}
                      <span className="heading_font">Category</span>
                      <div className="stm_lms_categories_dropdown">
                        {/*<div className="stm_lms_categories_dropdown__parents">
                                            <div className="stm_lms_categories_dropdown__parent">
                                                <a href="#/course/art/" className="sbc_h"> Art </a><span className="stm_lms_cat_toggle"></span>
                                                <div className="stm_lms_categories_dropdown__childs">
                                                    <div className="stm_lms_categories_dropdown__child"><a href="#/course/artism/"> Artism </a></div>
                                                    <div className="stm_lms_categories_dropdown__child"><a href="#/course/conceptual-art/"> Conceptual Art </a></div>
                                                    <div className="stm_lms_categories_dropdown__child"><a href="#/course/minimalism/"> Minimalism </a></div>
                                                    <div className="stm_lms_categories_dropdown__child"><a href="#/course/photography/"> Photography </a></div>
                                                    <div className="stm_lms_categories_dropdown__child"><a href="#/course/pictures/"> Pictures </a></div>
                                                    <div className="stm_lms_categories_dropdown__child"><a href="#/course/post-impressionism/"> Post-Impressionism </a></div>
                                                    <div className="stm_lms_categories_dropdown__child"><a href="#/course/sculpting/"> Sculpting </a></div>
                                                    <div className="stm_lms_categories_dropdown__child"><a href="#/course/textile-art/"> Textile Art </a></div>
                                                    <div className="stm_lms_categories_dropdown__child"><a href="#/course/theatre/"> Theatre </a></div>
                                                    <div className="stm_lms_categories_dropdown__child"><a href="#/course/video-art/"> Video Art </a></div>
                                                </div>
                                            </div>
                                            
                                        </div>*/}
                      </div>
                    </div>

                    <div
                      id="stm_lms_courses_search"
                      className="stm_lms_courses_search vue_is_disabled is_vue_loaded"
                    >
                      <a
                        href="#/courses/?search="
                        className="stm_lms_courses_search__button sbc"
                      >
                        <i className="lnr lnr-magnifier"></i>
                      </a>
                      <form autocomplete="off">
                        <div className="autocomplete-wrapper" model="search">
                          <input
                            type="text"
                            id="search-courses-input"
                            placeholder="Search courses"
                            name="search"
                            autocomplete="off"
                            className="autocomplete-input"
                          />
                          <div
                            className="autocomplete autocomplete-list"
                            style={{ display: "none" }}
                          >
                            <ul></ul>
                          </div>
                        </div>
                      </form>
                    </div>
                  </div>
                  <div className="stm_header_links">
                    <a
                      href="#/user-account/"
                      className="stm_lms_bi_link normal_font"
                    >
                      {" "}
                      <i className="lnr lnr-bullhorn secondary_color"></i>{" "}
                      <span>Become an Instructor</span>{" "}
                    </a>
                    <a
                      href="#"
                      className="stm_lms_bi_link normal_font"
                      data-target=".stm-lms-modal-enterprise"
                      data-lms-modal="enterprise"
                    >
                      {" "}
                      <i className="stmlms-case secondary_color"></i>{" "}
                      <span>For Enterprise</span>{" "}
                    </a>
                  </div>
                </div>
                <div className="right-unit">
                  <a
                    href="#"
                    className="stm_lms_log_in"
                    data-text="Log in"
                    data-target=".stm-lms-modal-login"
                    data-lms-modal="login"
                  >
                    {" "}
                    <i className="stmlms-user"></i> <span>Log in</span>{" "}
                  </a>
                  <a
                    href="#/user-account/"
                    className="btn btn-default"
                    data-text="Sign up"
                    style={{
                      background: "#195ec8",
                      borderRadius: "42px",
                      height: "30px",
                      color: "#fff",
                    }}
                  >
                    {" "}
                    <span>Sign up</span>{" "}
                  </a>
                  <div className="stm_lms_wishlist_button not-logged-in">
                    <a href="#" data-text="Favorites">
                      {" "}
                      <i className="lnr lnr-heart"></i>{" "}
                    </a>
                  </div>
                </div>
                <div className="stm_header_top_search sbc">
                  <i className="lnr lnr-magnifier"></i>
                </div>
                <div className="stm_header_top_toggler mbc">
                  <i className="lnr lnr-user"></i>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="stm_lms_header_popups_overlay"></div>
      </div>
    </div>
  );
};

export default Section;
