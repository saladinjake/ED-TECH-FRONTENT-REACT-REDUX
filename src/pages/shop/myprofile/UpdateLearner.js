import React, { useState, useEffect, Fragment, useMemo } from "react";
import { Container, Row, Col } from "react-bootstrap";
import NavBar from "components/Navbar";

// import FooterTwo from "../../components/FooterTwo";
import { Styles } from "./styles/account.js";
// import { useHistory } from "react-router-dom";
import toast from "react-hot-toast";
import { Formik } from "formik";
import PropTypes from "prop-types";
import { updateLearnerProfile } from "services/profile";
import { getCountries } from "services/country";
import { getLanguages } from "services/language";
import { getLearnerProfile } from "services/profile";
import { learnerSchema } from "helper/validations";
import {
  Degrees,
  EducationLevel,
  EmploymentStatus,
  ExperienceLevel,
  MaritalStatus,
} from "helper/data";




import Sidebar from "../newdashboard/Sidebar";

import "../newdashboard/assets/css/bootstrap.min.css";
import "../newdashboard/assets/css/core.css";
import "../newdashboard/assets/css/components.css";
import "../newdashboard/assets/css/icons.css";
import "../newdashboard/assets/css/pages.css";
import "../newdashboard/assets/css/responsive.css";
import "./tabnotifications.css"

import Loader from "components/Loader/Loader";
import { connect } from "react-redux";

const UpdateLearner = ({ auth: { user } }) => {
  // let history = useHistory();
  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [profile, setProfile] = useState({});

  let initialValues = useMemo(() => {
    return Object.entries(profile).length !== 0
      ? {
          username: profile?.user?.username || "",
          first_name: profile?.user?.first_name || "",
          middle_name: profile?.user?.middle_name || "",
          last_name: profile?.user?.last_name || "",
          phone_number: profile?.user?.phone_number || "",
          // image_url: profile?.image_url || "",
          gender: profile?.user?.learner_profile.gender || "",
          date_of_birth: profile?.user?.learner_profile.date_of_birth || "",
          country_id: profile?.user?.learner_profile.country_id || "",
          biography: profile?.user?.learner_profile.biography || "",
          employment_status: profile?.user?.learner_profile.employment_status || "",
          marital_status: profile?.user?.learner_profile.marital_status || "",
          experience_level: profile?.user?.learner_profile.experience_level || "",
          education_level: profile?.user?.learner_profile.education_level || "",
          degree_obtained: profile?.user?.learner_profile.degree_obtained || "",
          language: profile?.user?.learner_profile.language || "",
          facebook_url: profile?.user?.learner_profile.facebook_url || "",
          linkedin_url: profile?.user?.learner_profile.linkedin_url || "",
          twitter_url: profile?.user?.learner_profile.twitter_url || "",
        }
      : {};
  }, [profile]);

  useEffect(() => {
    (async function loadContent() {
      setLoading(true);
      await fetchContent();
      setLoading(false);
    })();
  }, []);

  const fetchContent = async () => {
    setLoading(true);
    Promise.all(
      [getCountries(), getLanguages(), getLearnerProfile()].map((err) =>
        err.catch(() => err)
      )
    )
      .then((res) => {
        setCountries([...res[0].data.data]);
        setLanguages([...res[1].data.data]);
        setProfile({ ...res[2].data.data });
      })
      .catch((err) => {
        toast.error("Error Occured fetching data");
      });
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    values.email = user.email;
    try {
      await updateLearnerProfile(user.id, values);
      toast.success("Your Profile has been updated.");
    } catch (err) {
      toast.error("Error occured updating Profile");
    }
    setSubmitting(false);
    setLoading(false);
  };

  return (
    <Styles>
      {/* Main Wrapper */}

      <div className="wrapper">

      <div className="content-page">


              
                <div className="content" style={{height:"1200px"}}>
                    <div className="container" >
      <div className="main-wrapper registration-page">
        {/* Header 2 */}
        <NavBar />


        {/* Registration Area */}
        <section className="registration-area">
          <Container>
            {loading ? (
              <Loader width="70" />
            ) : Object.entries(profile).length !== 0 ? (
              <Fragment>
                <Row>
                  <Col lg="12">
                    <div className="registration-box instructorregister">
                      <div className="registration-title text-center">
                        <h3>Update Profile</h3>
                      </div>

                      <Formik
                        initialValues={initialValues}
                        validationSchema={learnerSchema}
                        onSubmit={handleSubmit}
                      >
                        {({
                          values,
                          errors,
                          touched,
                          handleChange,
                          handleBlur,
                          handleSubmit,
                          isSubmitting,
                          setFieldValue,
                        }) => (
                          <form
                            id="form_registration"
                            className="form"
                            onSubmit={handleSubmit}
                          >
                            <Row>
                              <p className="form-control" key={new Date().getUTCMilliseconds() + Math.random()}>
                                <label htmlFor="registration_fname" key={new Date().getUTCMilliseconds() + Math.random()}>
                                  First Name
                                </label>
                                <input
                                key={new Date().getUTCMilliseconds() + Math.random()}
                                  type="text"
                                  required
                                  placeholder="First name"
                                  name="first_name"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.first_name}
                                />

                                <span className="registration_input-msg" key={new Date().getUTCMilliseconds() + Math.random()}>
                                  {errors.first_name &&
                                    touched.first_name &&
                                    errors.first_name}
                                </span>
                              </p>
                              <p className="form-control" key={new Date().getUTCMilliseconds() + Math.random()}>
                                <label htmlFor="registration_lname" key={new Date().getUTCMilliseconds() + Math.random()}>
                                  Last Name
                                </label>
                                <input
                                key={new Date().getUTCMilliseconds() + Math.random()}
                                  type="text"
                                  required
                                  placeholder="Last name"
                                  name="last_name"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.last_name}
                                  id="registration_lname"
                                />
                                {touched.last_name && errors.last_name ? (
                                  <span className="registration_input-msg" key={new Date().getUTCMilliseconds() + Math.random()}>
                                    {errors.last_name}
                                  </span>
                                ) : null}
                              </p>
                              <p className="form-control" key={new Date().getUTCMilliseconds() + Math.random()}>
                                <label htmlFor="registration_email" key={new Date().getUTCMilliseconds() + Math.random()}>
                                  Middle Name
                                </label>
                                <input key={new Date().getUTCMilliseconds() + Math.random()}
                                  type="text"
                                  required
                                  placeholder="Middle name"
                                  name="middle_name"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.middle_name}
                                  id="registration_email"
                                />
                                {touched.middle_name && errors.middle_name ? (
                                  <span className="registration_input-msg" key={new Date().getUTCMilliseconds() + Math.random()}>
                                    {errors.middle_name}
                                  </span>
                                ) : null}
                              </p>
                            </Row>
                            <Row>
                              <p className="form-control" key={new Date().getUTCMilliseconds() + Math.random()}>
                                <label htmlFor="registration_user" key={new Date().getUTCMilliseconds() + Math.random()}>
                                  Phone Number
                                </label>
                                <input key={new Date().getUTCMilliseconds() + Math.random()}
                                  type="number"
                                  id="phone_number"
                                  name="phone_number"
                                  placeholder="08112345687"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.phone_number}
                                />
                                {touched.phone_number && errors.phone_number ? (
                                  <span className="registration_input-msg" key={new Date().getUTCMilliseconds() + Math.random()}>
                                    {errors.phone_number}
                                  </span>
                                ) : null}
                              </p>
                              {/* <p className="form-control">
                                <label htmlFor="registration_email">
                                  Imagee Url
                                </label>
                                <input
                                  type="url"
                                  placeholder="https://image.com"
                                  name="image_url"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.image_url}
                                  id="registration_email"
                                />
                                {touched.image_url && errors.image_url ? (
                                  <span className="registration_input-msg">
                                    {errors.image_url}
                                  </span>
                                ) : null}
                              </p> */}
                              <p className="form-control" key={new Date().getUTCMilliseconds() + Math.random()}>
                                <label htmlFor="registration_biography" key={new Date().getUTCMilliseconds() + Math.random()}>
                                  Biography
                                </label>
                                <textarea
                                key={new Date().getUTCMilliseconds() + Math.random()}
                                  placeholder="Biography here"
                                  name="biography"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.biography}
                                  id="registration_biography"
                                ></textarea>

                                {touched.biography && errors.biography ? (
                                  <span className="registration_input-msg" key={new Date().getUTCMilliseconds() + Math.random()}>
                                    {errors.biography}
                                  </span>
                                ) : null}
                              </p>
                              <p className="form-control" key={new Date().getUTCMilliseconds() + Math.random()}>
                                <label htmlFor="registration_user" key={new Date().getUTCMilliseconds() + Math.random()}>
                                  Date Of Birth
                                </label>
                                <input key={new Date().getUTCMilliseconds() + Math.random()}
                                  type="date"
                                  required
                                  id="date_of_birth"
                                  name="date_of_birth"
                                  placeholder="Your date of birth here"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.date_of_birth}
                                />
                                {touched.phone_number && errors.phone_number ? (
                                  <span className="registration_input-msg" key={new Date().getUTCMilliseconds() + Math.random()}>
                                    {errors.date_of_birth}
                                  </span>
                                ) : null}
                              </p>
                            </Row>
                            <Row>
                              <p className="form-control" key={new Date().getUTCMilliseconds() + Math.random()}>
                                <label htmlFor="registration_user" key={new Date().getUTCMilliseconds() + Math.random()}>
                                  Gender
                                </label>
                                <select
                                key={new Date().getUTCMilliseconds() + Math.random()}
                                  name="gender"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.gender}
                                  required
                                >
                                  <option key={new Date().getUTCMilliseconds() + Math.random()}>-- Gender --</option>
                                  <option key={new Date().getUTCMilliseconds() + Math.random()} value="Male">Male</option>
                                  <option key={new Date().getUTCMilliseconds() + Math.random()} value="Female">Female</option>
                                </select>
                                {touched.gender && errors.gender ? (
                                  <span key={new Date().getUTCMilliseconds() + Math.random()} className="registration_input-msg" >
                                    {errors.gender}
                                  </span>
                                ) : null}
                              </p>

                              <p className="form-control" key={new Date().getUTCMilliseconds() + Math.random()}>
                                <label htmlFor="registration_user" key={new Date().getUTCMilliseconds() + Math.random()}>
                                  Country
                                </label>
                                <select key={new Date().getUTCMilliseconds() + Math.random()}
                                  name="country_id"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.country_id}
                                  required
                                >
                                  <option>-- Country --</option>
                                  {countries.length > 0 &&
                                    countries.map((country, i) => {
                                      return (
                                        <option key={new Date().getUTCMilliseconds() + Math.random()} value={country.id}>
                                          {country.name}
                                        </option>
                                      );
                                    })}
                                </select>
                                {touched.country_id && errors.country_id ? (
                                  <span key={new Date().getUTCMilliseconds() + Math.random()} className="registration_input-msg">
                                    {errors.country_id}
                                  </span>
                                ) : null}
                              </p>

                              <p className="form-control">
                                <label htmlFor="registration_username" key={new Date().getUTCMilliseconds() + Math.random()}>
                                  Username
                                </label>
                                <input
                                  type="text"
                                  required
                                  placeholder="Username"
                                  name="username"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.username}
                                  id="registration_username"
                                  key={new Date().getUTCMilliseconds() + Math.random()}
                                />
                                {touched.username && errors.username ? (
                                  <span className="registration_input-msg">
                                    {errors.username}
                                  </span>
                                ) : null}
                              </p>
                            </Row>
                            <Row>
                              <p className="form-control">
                                <label htmlFor="registration_user">
                                  Language {profile?.user?.learner_profile.language}
                                </label>
                                <select
                                  name="language"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.language}
                                  required
                                >
                                  {/* <option>-- Language --</option> */}
                                  {languages.length > 0 &&
                                    languages.map((language, i) => {
                                      return (
                                        <option
                                          key={i}
                                          value={language.english}
                                        >
                                          {language.english}
                                        </option>
                                      );
                                    })}
                                </select>
                                {touched.language && errors.language ? (
                                  <span className="registration_input-msg">
                                    {errors.language}
                                  </span>
                                ) : null}
                              </p>
                              <p className="form-control">
                                <label htmlFor="registration_user">
                                  Educational Level
                                </label>
                                <select
                                  name="education_level"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.education_level}
                                  required
                                >
                                  <option>-- Education Level --</option>
                                  {EducationLevel.length > 0 &&
                                    EducationLevel.map((item) => {
                                      return (
                                        <option key={new Date().getUTCMilliseconds() + Math.random()} value={item}>{item}</option>
                                      );
                                    })}
                                </select>
                                {touched.education_level &&
                                errors.education_level ? (
                                  <span className="registration_input-msg">
                                    {errors.education_level}
                                  </span>
                                ) : null}
                              </p>
                              <p className="form-control">
                                <label htmlFor="registration_user">
                                  Degree Obtained
                                </label>
                                <select
                                  name="degree_obtained"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.degree_obtained}
                                  required
                                >
                                  <option>-- Degree Obtained --</option>
                                  {Degrees.length > 0 &&
                                    Degrees.map((item) => {
                                      return (
                                        <option key={new Date().getUTCMilliseconds() + Math.random()} value={item}>{item}</option>
                                      );
                                    })}
                                </select>
                                {touched.degree_obtained &&
                                errors.degree_obtained ? (
                                  <span className="registration_input-msg">
                                    {errors.degree_obtained}
                                  </span>
                                ) : null}
                              </p>
                            </Row>
                            <Row>
                              <p className="form-control">
                                <label htmlFor="registration_user">
                                  Employment Status
                                </label>
                                <select
                                  name="employment_status"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.employment_status}
                                  required
                                >
                                  <option>-- Employment Status --</option>
                                  {EmploymentStatus.length > 0 &&
                                    EmploymentStatus.map((item) => {
                                      return (
                                        <option key={new Date().getUTCMilliseconds() + Math.random()} value={item}>{item}</option>
                                      );
                                    })}
                                </select>
                                {touched.employment_status &&
                                errors.employment_status ? (
                                  <span className="registration_input-msg">
                                    {errors.employment_status}
                                  </span>
                                ) : null}
                              </p>
                              <p className="form-control">
                                <label htmlFor="registration_user">
                                  Experience Level
                                </label>
                                <select
                                  name="experience_level"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.experience_level}
                                  required
                                >
                                  <option>-- Experience Level --</option>
                                  {ExperienceLevel.length > 0 &&
                                    ExperienceLevel.map((item) => {
                                      return (
                                        <option key={new Date().getUTCMilliseconds() + Math.random()} value={item}>{item}</option>
                                      );
                                    })}
                                </select>
                                {touched.experience_level &&
                                errors.experience_level ? (
                                  <span className="registration_input-msg">
                                    {errors.experience_level}
                                  </span>
                                ) : null}
                              </p>
                              <p className="form-control">
                                <label htmlFor="registration_user">
                                  Marital Status
                                </label>
                                <select
                                  name="marital_status"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.marital_status}
                                  required
                                >
                                  <option>-- Marital Status --</option>
                                  {MaritalStatus.length > 0 &&
                                    MaritalStatus.map((item) => {
                                      return (
                                        <option key={new Date().getUTCMilliseconds() + Math.random()} value={item}>{item}</option>
                                      );
                                    })}
                                </select>
                                {touched.marital_status &&
                                errors.marital_status ? (
                                  <span className="registration_input-msg">
                                    {errors.marital_status}
                                  </span>
                                ) : null}
                              </p>
                            </Row>
                            <Row>
                              <p className="form-control">
                                <label htmlFor="registration_url">
                                  Facebook Url
                                </label>
                                <input
                                  type="url"
                                  placeholder="https://facebook.com"
                                  name="facebook_url"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.facebook_url}
                                  id="registration_url"
                                />
                                {touched.facebook_url && errors.facebook_url ? (
                                  <span className="registration_input-msg">
                                    {errors.facebook_url}
                                  </span>
                                ) : null}
                              </p>
                              <p className="form-control">
                                <label htmlFor="registration_twitter">
                                  Twitter Url
                                </label>
                                <input
                                  type="url"
                                  placeholder="https://twitter.com"
                                  name="twitter_url"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.twitter_url}
                                  id="registration_twitter"
                                />
                                {touched.twitter_url && errors.twitter_url ? (
                                  <span className="registration_input-msg">
                                    {errors.twitter_url}
                                  </span>
                                ) : null}
                              </p>
                              <p className="form-control">
                                <label htmlFor="registration_linked">
                                  Linkedin Url
                                </label>
                                <input
                                  type="url"
                                  placeholder="https://linkedin.com"
                                  name="linkedin_url"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.linkedin_url}
                                  id="registration_linked"
                                />
                                {touched.linkedin_url && errors.linkedin_url ? (
                                  <span className="registration_input-msg">
                                    {errors.linkedin_url}
                                  </span>
                                ) : null}
                              </p>
                            </Row>
                            <button type="submit" disabled={isSubmitting}>
                              {loading ? (
                                <div className="spinner-border" role="status">
                                  <span className="sr-only">Loading...</span>
                                </div>
                              ) : (
                                "Update Profile"
                              )}
                            </button>
                          </form>
                        )}
                      </Formik>
                    </div>
                  </Col>
                </Row>
              </Fragment>
            ) : (
              <p>No Details for this user yet</p>
            )}
          </Container>
        </section>

        {/* Footer 2 */}
        
      </div>


  </div>
    </div>
      </div>
        </div>
      <Sidebar />
    </Styles>
  );
};

UpdateLearner.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(UpdateLearner);
