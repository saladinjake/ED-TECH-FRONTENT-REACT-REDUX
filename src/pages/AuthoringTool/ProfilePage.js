import React, { Fragment } from "react";

import { SideBar, OverviewDash } from "./sidebar";
import NavBar from "components/Navbar/AuthoringNav";
import { Styles } from "./styles/main.js";

const ProfileEditor = () => {
  return (
    <Fragment>
      <NavBar />
      <br />
      <br />
      <br />
      <br />

      <div className="container-fluid">
        <div className="wrapper">
          <div
            className="content-page-x col-md-12"
            style={
              {
                /*float:"right"*/
              }
            }
          >
            <div className="content-x">
              <ProfilTopMenu />
              <ProfilePane />
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
};

const ProfilTopMenu = () => {
  return (
    <Fragment>
      <section
        className="page-header-area my-course-area"
        style={{ height: "140px" }}
      >
        <div className="container">
          <div className="row">
            <div className="col">
              <h1 className="page-title print-hidden text-white">
                User profile
              </h1>
              <ul className="print-hidden">
                <li className="">
                  <a href="#my_courses">Courses</a>
                </li>

                <li className="">
                  <a href="#my_wishlist">Wishlists</a>
                </li>

                <li className="">
                  <a href="my_messages">Messages</a>
                </li>

                <li className="">
                  <a href="#purchase_history">Purchase history</a>
                </li>

                <li className="active">
                  <a href="#user_profile">Profile</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

const showTab = (evt, tabName) => {
  evt.preventDefault();

  var i, tabcontent, tablinks;

  tabcontent = document.getElementsByClassName("profile-tabs");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }

  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", " ");
  }

  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
};

const ProfilePane = () => {
  return (
    <Fragment>
      <section className="user-dashboard-area">
        <div className="container">
          <div className="row">
            <div className="col">
              <div className="user-dashboard-box">
                <div className="user-dashboard-sidebar">
                  <div className="user-box">
                    <img
                      src="http://demo4a.questence.org/uploads/user_image/placeholder.png"
                      alt=""
                      className="img-fluid"
                    />
                    <div className="name">
                      <div className="name">Instructor from Questence</div>
                    </div>
                  </div>
                  <div className="user-dashboard-menu">
                    <ul>
                      <li
                        className="active tablinks"
                        onClick={(e) => {
                          showTab(e, "first-profile");
                        }}
                      >
                        <a href="#user_profile">Profile</a>
                      </li>
                      <li
                        className="tablinks"
                        onClick={(e) => {
                          showTab(e, "second-profile");
                        }}
                      >
                        <a href="#user_credentials">Account</a>
                      </li>
                      <li
                        className="tablinks"
                        onClick={(e) => {
                          showTab(e, "third-profile");
                        }}
                      >
                        <a href="#user_photo">Photo</a>
                      </li>
                    </ul>
                  </div>
                </div>

                <div
                  className="user-dashboard-content profile-tabs col-md-12"
                  id="first-profile"
                >
                  <div className="content-title-box">
                    <div className="title">Profile</div>
                    <div className="subtitle">
                      Add information about yourself to share on your profile.
                    </div>
                  </div>
                  <form action="#/update_basics" method="post">
                    <div className="content-box">
                      <div className="basic-group">
                        <div className="form-group">
                          <label for="FristName">Basics:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="first_name"
                            id="FristName"
                            placeholder="First name"
                            value="Instructor-02"
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            name="last_name"
                            placeholder="Last name"
                            value="Questence"
                          />
                        </div>
                        <div className="form-group">
                          <label for="Biography">Biography:</label>

                          <textarea
                            className="form-control author-biography-editor"
                            name="biography"
                            id="Biography"
                            aria-hidden="true"
                          ></textarea>
                        </div>
                      </div>
                      <div className="link-group">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            maxlength="60"
                            name="twitter_link"
                            placeholder="Twitter link"
                            value=""
                          />
                          <small className="form-text text-muted">
                            Add your twitter link.
                          </small>
                        </div>
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            maxlength="60"
                            name="facebook_link"
                            placeholder="Facebook link"
                            value=""
                          />
                          <small className="form-text text-muted">
                            Add your facebook link.
                          </small>
                        </div>
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            maxlength="60"
                            name="linkedin_link"
                            placeholder="Linkedin link"
                            value=""
                          />
                          <small className="form-text text-muted">
                            Add your linkedin link.
                          </small>
                        </div>
                      </div>
                    </div>
                    <div className="content-update-box">
                      <button type="submit" className="btn">
                        Save
                      </button>
                    </div>
                  </form>
                </div>

                <div
                  className="user-dashboard-content profile-tabs col-md-12"
                  id="second-profile"
                >
                  <div className="content-title-box">
                    <div className="title">Profile</div>
                    <div className="subtitle">
                      Add information about yourself to share on your profile.
                    </div>
                  </div>
                  <form action="#/update_basics" method="post">
                    <div className="content-box">
                      <div className="basic-group">
                        <div className="form-group">
                          <label for="FristName">Basics:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="first_name"
                            id="FristName"
                            placeholder="First name"
                            value="Instructor-02"
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            name="last_name"
                            placeholder="Last name"
                            value="Questence"
                          />
                        </div>
                        <div className="form-group">
                          <label for="Biography">Biography:</label>

                          <textarea
                            className="form-control author-biography-editor"
                            name="biography"
                            id="Biography"
                            aria-hidden="true"
                          ></textarea>
                        </div>
                      </div>
                      <div className="link-group">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            maxlength="60"
                            name="twitter_link"
                            placeholder="Twitter link"
                            value=""
                          />
                          <small className="form-text text-muted">
                            Add your twitter link.
                          </small>
                        </div>
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            maxlength="60"
                            name="facebook_link"
                            placeholder="Facebook link"
                            value=""
                          />
                          <small className="form-text text-muted">
                            Add your facebook link.
                          </small>
                        </div>
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            maxlength="60"
                            name="linkedin_link"
                            placeholder="Linkedin link"
                            value=""
                          />
                          <small className="form-text text-muted">
                            Add your linkedin link.
                          </small>
                        </div>
                      </div>
                    </div>
                    <div className="content-update-box">
                      <button type="submit" className="btn">
                        Save
                      </button>
                    </div>
                  </form>
                </div>

                <div
                  className="user-dashboard-content profile-tabs col-md-12"
                  id="third-profile"
                >
                  <div className="content-title-box">
                    <div className="title">Profile</div>
                    <div className="subtitle">
                      Add information about yourself to share on your profile.
                    </div>
                  </div>
                  <form action="#/update_basics" method="post">
                    <div className="content-box">
                      <div className="basic-group">
                        <div className="form-group">
                          <label for="FristName">Basics:</label>
                          <input
                            type="text"
                            className="form-control"
                            name="first_name"
                            id="FristName"
                            placeholder="First name"
                            value="Instructor-02"
                          />
                        </div>
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            name="last_name"
                            placeholder="Last name"
                            value="Questence"
                          />
                        </div>
                        <div className="form-group">
                          <label for="Biography">Biography:</label>

                          <textarea
                            className="form-control author-biography-editor"
                            name="biography"
                            id="Biography"
                            aria-hidden="true"
                          ></textarea>
                        </div>
                      </div>
                      <div className="link-group">
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            maxlength="60"
                            name="twitter_link"
                            placeholder="Twitter link"
                            value=""
                          />
                          <small className="form-text text-muted">
                            Add your twitter link.
                          </small>
                        </div>
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            maxlength="60"
                            name="facebook_link"
                            placeholder="Facebook link"
                            value=""
                          />
                          <small className="form-text text-muted">
                            Add your facebook link.
                          </small>
                        </div>
                        <div className="form-group">
                          <input
                            type="text"
                            className="form-control"
                            maxlength="60"
                            name="linkedin_link"
                            placeholder="Linkedin link"
                            value=""
                          />
                          <small className="form-text text-muted">
                            Add your linkedin link.
                          </small>
                        </div>
                      </div>
                    </div>
                    <div className="content-update-box">
                      <button type="submit" className="btn">
                        Save
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Fragment>
  );
};

export default ProfileEditor;
