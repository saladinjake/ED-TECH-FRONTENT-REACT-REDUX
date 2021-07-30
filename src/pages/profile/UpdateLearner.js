import React, { useState, useEffect, Fragment, useMemo } from "react";
import { Container, Row, Col } from "react-bootstrap";
import NavBar from "components/Navbar";
import { BreadcrumbBox } from "../../components/common/Breadcrumb";
import Footer from "components/Footer";
import { Styles } from "./styles/account.js";
// import { useHistory } from "react-router-dom";
import toast from "react-hot-toast";
import { Formik } from "formik";
import PropTypes from "prop-types";
import { updateLearnerProfile } from "services/profile";
import { getCountries } from "services/country";
import { getLanguages } from "services/language";
import { getIndustries } from "services/industry";
import { getLearnerProfile } from "services/profile";
import { learnerSchema } from "helper/validations";
import {
  Degrees,
  EducationLevel,
  EmploymentStatus,
  ExperienceLevel,
  MaritalStatus,
} from "helper/data";

import Loader from "components/Loader/Loader";
import { connect } from "react-redux";
import "./instructor.css";
import $ from "jquery";

const UpdateInstructor = ({ auth: { user } }) => {
  // let history = useHistory();
  const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState([]);
  const [languages, setLanguages] = useState([]);
  // eslint-disable-next-line
  const [industries, setIndustries] = useState([]);
  const [profile, setProfile] = useState({});
  let preInst = null;
  let courseNiche = null;
  let dummyAvatar = "https://d30y9cdsu7xlg0.cloudfront.net/png/138926-200.png";
  const [image_url, setImageProfile] = useState("");

  const [lang_id, setLangId] = useState(1);

  let initialValues = useMemo(() => {
    setImageProfile(profile?.user?.image_url);
    return Object.entries(profile).length !== 0
      ? {
          username: profile?.user?.username || "",
          first_name: profile?.user?.first_name || "",
          middle_name: profile?.user?.middle_name || "",
          last_name: profile?.user?.last_name || "",
          phone_number: profile?.user?.phone_number || "",
          // image_url: profile?.user?.image_url || "",
          gender: profile?.user?.learner_profile?.gender || "",
          date_of_birth: profile?.user?.learner_profile?.date_of_birth || "",
          country_id: profile?.user?.learner_profile?.country_id || "",
          industry_id:
            profile?.user?.learner_profile?.industry_id ||
            profile?.user?.learner_profile?.category_id ||
            "",
          category_id: profile?.user?.learner_profile?.category_id || "",
          // biography: profile?.user?.learner_profile?.biography || "",
          employment_status:
            profile?.user?.learner_profile?.employment_status || "",
          marital_status: profile?.user?.learner_profile?.marital_status || "",
          experience_level:
            profile?.user?.learner_profile?.experience_level || "",
          education_level:
            profile?.user?.learner_profile?.education_level || "",
          degree_obtained:
            profile?.user?.learner_profile?.degree_obtained || "",
          language: profile?.user?.learner_profile?.language || "",
          facebook_url: profile?.user?.learner_profile?.facebook_url || "",
          linkedin_url: profile?.user?.learner_profile?.linkedin_url || "",
          twitter_url: profile?.user?.learner_profile?.twitter_url || "",

          brief_introduction:
            profile?.user?.learner_profile?.brief_introduction || "",
          detailed_introduction:
            profile?.user?.learner_profile?.detailed_introduction || "",

          category_id: profile?.user?.learner_profile?.industry_id || "",
          other_info: profile?.user?.learner_profile?.other_info || "",
          previous_institutions:
            profile?.user?.learner_profile?.previous_institutions || "",
          niche_courses: profile?.user?.learner_profile?.niche_courses || "",
          image_url: profile?.user?.image_url || dummyAvatar,

          current_employer_name:
            profile?.user?.learner_profile?.current_employer_name || "",
          current_employer_designation:
            profile?.user?.learner_profile?.current_employer_designation || "",
          previous_employer_name:
            profile?.user?.learner_profile?.previous_employer_name || "",
          previous_employer_designation:
            profile?.user?.learner_profile?.previous_employer_designation || "",
        }
      : {};
  }, [profile]);

  // if(initialValues?.previous_institutions?.length > 0){
  //     initialValues.previous_institutions = JSON.parse(initialValues).previous_institutions .join(",")
  // }

  //  if(initialValues?.niche_courses?.length > 0){
  //     initialValues.niche_courses =JSON.parse( initialValues.niche_courses).join(",")
  // }

  // if(initialValues.image_url){
  //    setImageProfile(initialValues.image_url)
  // }

  useEffect(() => {
    (async function loadContent() {
      await fetchContent();
    })();
  }, []);

  function previewFile() {
    var preview = document.querySelector("img.linkprofile");
    var file = document.querySelector("input[type=file]").files[0];
    var reader = new FileReader();

    reader.addEventListener(
      "load",
      function () {
        preview.src = reader.result;
        //set the image field after upload to cloudinary
        uploadImageAndsetImageField(file);
      },
      false
    );

    if (file) {
      reader.readAsDataURL(file);
    }
  }

  const uploadImageAndsetImageField = (imageFile) => {
    const file = imageFile;
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "hpvklb3p");
    // eslint-disable-next-line no-undef
    fetch("https://api.cloudinary.com/v1_1/questence/image/upload", {
      method: "POST",
      body: formData,
    })
      .then((response) => response.json())
      .then((data) => {
        if (typeof data.secure_url !== "undefined") {
          let imageUrl = data.secure_url;
          console.log(imageUrl);
          toast.success("upload successful");

          setImageProfile(imageUrl);

          // handleUploads();
        } else {
          toast.error("could not upload image");
        }
      })
      .catch((error) => {
        throw error;
      });
  };

  function startUpload() {
    $("#profile-image-upload").click();
  }

  useEffect(() => {
    // $(function() {
    //     $('#profile-image11').on('click', function() {
    //         $('#profile-image-upload').click();
    //     });
    // });
  });

  const fetchContent = async () => {
    Promise.all(
      [
        getCountries(),
        getLanguages(),
        getLearnerProfile(),
        getIndustries(),
      ].map((err) => err.catch(() => err))
    )
      .then((res) => {
        setCountries([...res[0].data.data]);
        setLanguages([...res[1].data.data]);
        setProfile({ ...res[2].data.data });
        setIndustries([...res[3].data.data]);
        console.log("profile", res[2].data.data);
        console.log("languages", [...res[1].data.data]);

        setLoading(false);
      })
      .catch((err) => {
        toast.error("Error Occured fetching data");

        setLoading(false);
      });
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    values.email = user.email;
    let langObject = languages.find((lang) => lang.english == values.language);
    values.language = langObject.id;

    // values.niche_courses = values.niche_courses.split(',');
    // values.previous_institutions = values.previous_institutions.split(',') ;
    values.phone_number = values.phone_number.toString();
    values.country_id = parseInt(values.country_id);
    values.category_id = parseInt(values.industry_id);
    values.niche_courses = values.niche_courses;
    values.previous_institutions = values.previous_institutions;
    values.image_url = image_url;
    values.category_id = values.industry_id;

    console.log(values.language);
    let langIn = { ...values };
    langIn.language = values.language;
    langIn.category_id = values.category_id;

    console.log(langIn);
    // values.language = values.language

    console.log(langIn);

    let error = false;
    Object.keys(values).forEach((item) => {
      if (!values[item] || values[item] === null || values[item] === "") {
        error = true;
        toast.error(`${item} is required`);
      } else {
        // toast.success(`${item} is added here`)
        error = false;
      }
    });

    if (error) {
      return false;
    }
    // console.log(values)
    try {
      await updateLearnerProfile(user.id, langIn);
      toast.success("Your Profile has been updated.");
    } catch (err) {
      console.log(err);
      toast.error("Error occured updating Profile");
    }
    setSubmitting(false);
    setLoading(false);
  };

  let niche = [];
  let previousInst = [];

  //alert(initialValues.language)

  return (
    <Styles>
      {/* Main Wrapper */}
      <div
        className="main-wrapper registration-page "
        style={{ background: "#fff" }}
      >
        {/* Header 2 */}
        <NavBar />

        {/* Registration Area */}
        <section className="form_wrapper card-box">
          <Container>
            {loading ? (
              <Loader width="70" />
            ) : Object.entries(profile).length !== 0 ? (
              <Fragment>
                <Row>
                  <Col lg="12">
                    <div className="form_container card-box">
                      <div className="registration-title text-center">
                        <h3>Update Profile</h3>
                      </div>

                      <Formik
                        initialValues={initialValues}
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
                        }) => (
                          <form
                            id="form_registration"
                            className="form"
                            onSubmit={handleSubmit}
                            style={{ padding: "20px" }}
                          >
                            <div className="container">
                              <div className="row">
                                <div className=" profile-badge">
                                  <h6>Click the image to upload</h6>

                                  <div>
                                    <img
                                      alt="User Pic"
                                      src={initialValues?.image_url}
                                      id="profile-image11"
                                      height="100"
                                      className="linkprofile"
                                      onClick={startUpload}
                                    />

                                    <input
                                      id="profile-image-upload"
                                      className="hidden"
                                      type="file"
                                      onChange={previewFile}
                                    />
                                    <div style={{ color: "#999" }}> </div>
                                  </div>
                                </div>
                              </div>{" "}
                            </div>

                            <br />
                            <br />
                            <br />

                            <Row>
                              <p
                                className="input_field col_half card-box"
                                style={{ width: "45%", margin: "20px" }}
                              >
                                <label
                                  style={{
                                    fontWeight: "700",
                                    fontFamily: "Open Sans",
                                    color: "#000",
                                    fontSize: "12px",
                                    lineHeight: "20px",

                                    marginTop: "14px",
                                    marginRight: "7px",
                                  }}
                                  htmlFor="registration_fname"
                                >
                                  First Name
                                </label>
                                <input
                                  type="text"
                                  required
                                  placeholder="First name"
                                  name="first_name"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.first_name}
                                />

                                <span className="registration_input-msg">
                                  {errors.first_name &&
                                    touched.first_name &&
                                    errors.first_name}
                                </span>
                              </p>
                              <p
                                className="input_field col_half card-box"
                                style={{ width: "45%", margin: "20px" }}
                              >
                                <label
                                  style={{
                                    fontWeight: "700",
                                    fontFamily: "Open Sans",
                                    color: "#000",
                                    fontSize: "12px",
                                    lineHeight: "20px",

                                    marginTop: "14px",
                                    marginRight: "7px",
                                  }}
                                  htmlFor="registration_lname"
                                >
                                  Last Name
                                </label>
                                <input
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
                                  <span className="registration_input-msg">
                                    {errors.last_name}
                                  </span>
                                ) : null}
                              </p>
                              <p
                                className="input_field col_half card-box"
                                style={{ width: "45%", margin: "20px" }}
                              >
                                <label
                                  style={{
                                    fontWeight: "700",
                                    fontFamily: "Open Sans",
                                    color: "#000",
                                    fontSize: "12px",
                                    lineHeight: "20px",

                                    marginTop: "14px",
                                    marginRight: "7px",
                                  }}
                                  htmlFor="registration_email"
                                >
                                  Middle Name
                                </label>
                                <input
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
                                  <span className="registration_input-msg">
                                    {errors.middle_name}
                                  </span>
                                ) : null}
                              </p>

                              <p
                                className="input_field col_half card-box"
                                style={{ width: "45%", margin: "20px" }}
                              >
                                <label
                                  style={{
                                    fontWeight: "700",
                                    fontFamily: "Open Sans",
                                    color: "#000",
                                    fontSize: "12px",
                                    lineHeight: "20px",

                                    marginTop: "14px",
                                    marginRight: "7px",
                                  }}
                                  htmlFor="registration_user"
                                >
                                  Phone Number
                                </label>
                                <input
                                  type="number"
                                  id="phone_number"
                                  name="phone_number"
                                  placeholder="08112345687"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.phone_number}
                                />
                                {touched.phone_number && errors.phone_number ? (
                                  <span className="registration_input-msg">
                                    {errors.phone_number}
                                  </span>
                                ) : null}
                              </p>
                              <p
                                className="input_field col_half card-box"
                                style={{ width: "45%", margin: "20px" }}
                              >
                                <label
                                  style={{
                                    fontWeight: "700",
                                    fontFamily: "Open Sans",
                                    color: "#000",
                                    fontSize: "12px",
                                    lineHeight: "20px",

                                    marginTop: "14px",
                                    marginRight: "7px",
                                  }}
                                  htmlFor="registration_email"
                                >
                                  Brief Introduction
                                </label>
                                <textarea
                                  style={{ height: "300px" }}
                                  placeholder="Brief Introduction"
                                  name="brief_introduction"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.brief_introduction}
                                  id="registration_biography"
                                ></textarea>

                                {touched.brief_introduction &&
                                errors.brief_introduction ? (
                                  <span className="registration_input-msg">
                                    {errors.brief_introduction}
                                  </span>
                                ) : null}
                              </p>

                              <p
                                className="input_field col_half card-box"
                                style={{ width: "45%", margin: "20px" }}
                              >
                                <label
                                  style={{
                                    fontWeight: "700",
                                    fontFamily: "Open Sans",
                                    color: "#000",
                                    fontSize: "12px",
                                    lineHeight: "20px",

                                    marginTop: "14px",
                                    marginRight: "7px",
                                  }}
                                  htmlFor="registration_email"
                                >
                                  Detailed Introduction
                                </label>
                                <textarea
                                  placeholder="Detailed Introduction"
                                  name="detailed_introduction"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.detailed_introduction}
                                  id="registration_biography9"
                                  style={{ height: "300px" }}
                                ></textarea>

                                {touched.detailed_introduction &&
                                errors.detailed_introduction ? (
                                  <span className="registration_input-msg">
                                    {errors.detailed_introduction}
                                  </span>
                                ) : null}
                              </p>

                              <p
                                className="input_field col_half card-box"
                                style={{ width: "45%", margin: "20px" }}
                              >
                                <label
                                  style={{
                                    fontWeight: "700",
                                    fontFamily: "Open Sans",
                                    color: "#000",
                                    fontSize: "12px",
                                    lineHeight: "20px",

                                    marginTop: "14px",
                                    marginRight: "7px",
                                  }}
                                  htmlFor="registration_email"
                                >
                                  current employer name
                                </label>
                                <input
                                  type="text"
                                  required
                                  placeholder="Previous Institution"
                                  name="current_employer_name"
                                  id="registration_email"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.current_employer_name}
                                />
                                {touched.current_employer_name &&
                                errors.current_employer_name ? (
                                  <span className="registration_input-msg">
                                    {errors.current_employer_name}
                                  </span>
                                ) : null}
                              </p>
                              <br />

                              <p
                                className="input_field col_half card-box"
                                style={{ width: "45%", margin: "20px" }}
                              >
                                <label
                                  style={{
                                    fontWeight: "700",
                                    fontFamily: "Open Sans",
                                    color: "#000",
                                    fontSize: "12px",
                                    lineHeight: "20px",

                                    marginTop: "14px",
                                    marginRight: "7px",
                                  }}
                                  htmlFor="registration_email"
                                >
                                  current employer designation
                                </label>
                                <input
                                  type="text"
                                  required
                                  placeholder="Previous Institution"
                                  name="current_employer_designation"
                                  id="registration_email"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.current_employer_designation}
                                />
                                {touched.current_employer_designation &&
                                errors.current_employer_designation ? (
                                  <span className="registration_input-msg">
                                    {errors.current_employer_designation}
                                  </span>
                                ) : null}
                              </p>
                              <br />

                              <p
                                className="input_field col_half card-box"
                                style={{ width: "45%", margin: "20px" }}
                              >
                                <label
                                  style={{
                                    fontWeight: "700",
                                    fontFamily: "Open Sans",
                                    color: "#000",
                                    fontSize: "12px",
                                    lineHeight: "20px",

                                    marginTop: "14px",
                                    marginRight: "7px",
                                  }}
                                  htmlFor="registration_email"
                                >
                                  previous employer name
                                </label>
                                <input
                                  type="text"
                                  required
                                  placeholder="Previous Employer"
                                  name="previous_employer_name"
                                  id="registration_email"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.previous_employer_name}
                                />
                                {touched.previous_employer_name &&
                                errors.previous_employer_name ? (
                                  <span className="registration_input-msg">
                                    {errors.previous_employer_name}
                                  </span>
                                ) : null}
                              </p>
                              <br />

                              <p
                                className="input_field col_half card-box"
                                style={{ width: "45%", margin: "20px" }}
                              >
                                <label
                                  style={{
                                    fontWeight: "700",
                                    fontFamily: "Open Sans",
                                    color: "#000",
                                    fontSize: "12px",
                                    lineHeight: "20px",

                                    marginTop: "14px",
                                    marginRight: "7px",
                                  }}
                                  htmlFor="registration_email"
                                >
                                  previous employer designation
                                </label>
                                <input
                                  type="text"
                                  required
                                  placeholder="Previous Employer"
                                  name="previous_employer_designation"
                                  id="registration_email"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.previous_employer_designation}
                                />
                                {touched.previous_employer_designation &&
                                errors.previous_employer_designation ? (
                                  <span className="registration_input-msg">
                                    {errors.previous_employer_designation}
                                  </span>
                                ) : null}
                              </p>
                              <br />

                              <p
                                className="input_field col_half card-box"
                                style={{ width: "45%", margin: "20px" }}
                              >
                                <label
                                  style={{
                                    fontWeight: "700",
                                    fontFamily: "Open Sans",
                                    color: "#000",
                                    fontSize: "12px",
                                    lineHeight: "20px",

                                    marginTop: "14px",
                                    marginRight: "7px",
                                  }}
                                  htmlFor="registration_user"
                                >
                                  Industry ID
                                </label>
                                <select
                                  name="industry_id"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.industry_id}
                                  required
                                >
                                  <option>
                                    -- Industry {industries.length} --
                                  </option>
                                  {industries.length > 0 &&
                                    industries.map((industry, i) => {
                                      return (
                                        <option key={i} value={industry.id}>
                                          {industry.name}
                                        </option>
                                      );
                                    })}
                                </select>
                                {touched.industry_id && errors.industry_id ? (
                                  <span className="registration_input-msg">
                                    {errors.industry_id}
                                  </span>
                                ) : null}
                              </p>

                              <p
                                className="input_field col_half card-box"
                                style={{ width: "45%", margin: "20px" }}
                              >
                                <label
                                  style={{
                                    fontWeight: "700",
                                    fontFamily: "Open Sans",
                                    color: "#000",
                                    fontSize: "12px",
                                    lineHeight: "20px",

                                    marginTop: "14px",
                                    marginRight: "7px",
                                  }}
                                  htmlFor="registration_email"
                                >
                                  Previous Institution seperated by comma
                                </label>
                                <input
                                  type="text"
                                  required
                                  placeholder="Previous Institution"
                                  name="previous_institutions"
                                  id="registration_email"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.previous_institutions}
                                />
                                {touched.previous_institutions &&
                                errors.previous_institutions ? (
                                  <span className="registration_input-msg">
                                    {errors.previous_institutions}
                                  </span>
                                ) : null}
                              </p>
                              <br />

                              <p
                                className="input_field col_half card-box"
                                style={{ width: "45%", margin: "20px" }}
                              >
                                <label
                                  style={{
                                    fontWeight: "700",
                                    fontFamily: "Open Sans",
                                    color: "#000",
                                    fontSize: "12px",
                                    lineHeight: "20px",

                                    marginTop: "14px",
                                    marginRight: "7px",
                                  }}
                                  htmlFor="registration_email"
                                >
                                  Niche courses seperated by comma
                                </label>
                                <input
                                  type="text"
                                  required
                                  placeholder="Courses"
                                  name="niche_courses"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.niche_courses}
                                  id="registration_email"
                                />
                                {touched.niche_courses &&
                                errors.niche_courses ? (
                                  <span className="registration_input-msg">
                                    {errors.niche_courses}
                                  </span>
                                ) : null}
                              </p>
                              <br />

                              <p
                                className="input_field col_half card-box"
                                style={{ width: "45%", margin: "20px" }}
                              >
                                <label
                                  style={{
                                    fontWeight: "700",
                                    fontFamily: "Open Sans",
                                    color: "#000",
                                    fontSize: "12px",
                                    lineHeight: "20px",

                                    marginTop: "14px",
                                    marginRight: "7px",
                                  }}
                                  htmlFor="registration_email"
                                >
                                  Other Info
                                </label>
                                <textarea
                                  placeholder="Other information here"
                                  name="other_info"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.other_info}
                                  id="registration_biography"
                                ></textarea>

                                {touched.other_info && errors.other_info ? (
                                  <span className="registration_input-msg">
                                    {errors.other_info}
                                  </span>
                                ) : null}
                              </p>
                              <p
                                className="input_field col_half card-box"
                                style={{ width: "45%", margin: "20px" }}
                              >
                                <label
                                  style={{
                                    fontWeight: "700",
                                    fontFamily: "Open Sans",
                                    color: "#000",
                                    fontSize: "12px",
                                    lineHeight: "20px",

                                    marginTop: "14px",
                                    marginRight: "7px",
                                  }}
                                  htmlFor="registration_user"
                                >
                                  Date Of Birth
                                </label>
                                <input
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
                                  <span className="registration_input-msg">
                                    {errors.date_of_birth}
                                  </span>
                                ) : null}
                              </p>
                              <p
                                className="input_field col_half card-box"
                                style={{ width: "45%", margin: "20px" }}
                              >
                                <label
                                  style={{
                                    fontWeight: "700",
                                    fontFamily: "Open Sans",
                                    color: "#000",
                                    fontSize: "12px",
                                    lineHeight: "20px",

                                    marginTop: "14px",
                                    marginRight: "7px",
                                  }}
                                  htmlFor="registration_user"
                                >
                                  Gender
                                </label>
                                <select
                                  name="gender"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.gender}
                                  required
                                >
                                  <option>-- Gender --</option>
                                  <option value="Male">Male</option>
                                  <option value="Female">Female</option>
                                </select>
                                {touched.gender && errors.gender ? (
                                  <span className="registration_input-msg">
                                    {errors.gender}
                                  </span>
                                ) : null}
                              </p>

                              <p
                                className="input_field col_half card-box"
                                style={{ width: "45%", margin: "20px" }}
                              >
                                <label
                                  style={{
                                    fontWeight: "700",
                                    fontFamily: "Open Sans",
                                    color: "#000",
                                    fontSize: "12px",
                                    lineHeight: "20px",

                                    marginTop: "14px",
                                    marginRight: "7px",
                                  }}
                                  htmlFor="registration_user"
                                >
                                  Country
                                </label>
                                <select
                                  name="country_id"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.country_id}
                                  required
                                >
                                  {countries.length > 0 &&
                                    countries.map((country, i) => {
                                      return (
                                        <option key={i} value={country.id}>
                                          {country.name}
                                        </option>
                                      );
                                    })}
                                </select>
                                {touched.country_id && errors.country_id ? (
                                  <span className="registration_input-msg">
                                    {errors.country_id}
                                  </span>
                                ) : null}
                              </p>

                              <p
                                className="input_field col_half card-box"
                                style={{ width: "45%", margin: "20px" }}
                              >
                                <label
                                  style={{
                                    fontWeight: "700",
                                    fontFamily: "Open Sans",
                                    color: "#000",
                                    fontSize: "12px",
                                    lineHeight: "20px",

                                    marginTop: "14px",
                                    marginRight: "7px",
                                  }}
                                  htmlFor="registration_email"
                                >
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
                                  id="registration_email"
                                />
                                {touched.username && errors.username ? (
                                  <span className="registration_input-msg">
                                    {errors.username}
                                  </span>
                                ) : null}
                              </p>
                              <p
                                className="input_field col_half card-box"
                                style={{ width: "45%", margin: "20px" }}
                              >
                                <label
                                  style={{
                                    fontWeight: "700",
                                    fontFamily: "Open Sans",
                                    color: "#000",
                                    fontSize: "12px",
                                    lineHeight: "20px",

                                    marginTop: "14px",
                                    marginRight: "7px",
                                  }}
                                  htmlFor="registration_user"
                                >
                                  Language{" "}
                                  {profile?.user?.learner_profile.language}
                                </label>
                                <select
                                  name="language"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.language}
                                  required
                                >
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

                              <p
                                className="input_field col_half card-box"
                                style={{ width: "45%", margin: "20px" }}
                              >
                                <label
                                  style={{
                                    fontWeight: "700",
                                    fontFamily: "Open Sans",
                                    color: "#000",
                                    fontSize: "12px",
                                    lineHeight: "20px",

                                    marginTop: "14px",
                                    marginRight: "7px",
                                  }}
                                  htmlFor="registration_user"
                                >
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
                                        <option value={item}>{item}</option>
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
                              <p
                                className="input_field col_half card-box"
                                style={{ width: "45%", margin: "20px" }}
                              >
                                <label
                                  style={{
                                    fontWeight: "700",
                                    fontFamily: "Open Sans",
                                    color: "#000",
                                    fontSize: "12px",
                                    lineHeight: "20px",

                                    marginTop: "14px",
                                    marginRight: "7px",
                                  }}
                                  htmlFor="registration_user"
                                >
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
                                        <option value={item}>{item}</option>
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
                              <p
                                className="input_field col_half card-box"
                                style={{ width: "45%", margin: "20px" }}
                              >
                                <label
                                  style={{
                                    fontWeight: "700",
                                    fontFamily: "Open Sans",
                                    color: "#000",
                                    fontSize: "12px",
                                    lineHeight: "20px",

                                    marginTop: "14px",
                                    marginRight: "7px",
                                  }}
                                  htmlFor="registration_user"
                                >
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
                                        <option value={item}>{item}</option>
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
                              <p
                                className="input_field col_half card-box"
                                style={{ width: "45%", margin: "20px" }}
                              >
                                <label
                                  style={{
                                    fontWeight: "700",
                                    fontFamily: "Open Sans",
                                    color: "#000",
                                    fontSize: "12px",
                                    lineHeight: "20px",

                                    marginTop: "14px",
                                    marginRight: "7px",
                                  }}
                                  htmlFor="registration_user"
                                >
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
                                    ExperienceLevel.map((item, i) => {
                                      return (
                                        <option value={i + 1}>{item}</option>
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
                              <p
                                className="input_field col_half card-box"
                                style={{ width: "45%", margin: "20px" }}
                              >
                                <label
                                  style={{
                                    fontWeight: "700",
                                    fontFamily: "Open Sans",
                                    color: "#000",
                                    fontSize: "12px",
                                    lineHeight: "20px",

                                    marginTop: "14px",
                                    marginRight: "7px",
                                  }}
                                  htmlFor="registration_user"
                                >
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
                                        <option value={item}>{item}</option>
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
                              <p
                                className="input_field col_half card-box"
                                style={{ width: "45%", margin: "20px" }}
                              >
                                <label
                                  style={{
                                    fontWeight: "700",
                                    fontFamily: "Open Sans",
                                    color: "#000",
                                    fontSize: "12px",
                                    lineHeight: "20px",

                                    marginTop: "14px",
                                    marginRight: "7px",
                                  }}
                                  htmlFor="registration_email"
                                >
                                  Facebook Url
                                </label>
                                <input
                                  type="url"
                                  placeholder="https://facebook.com"
                                  name="facebook_url"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.facebook_url}
                                  id="registration_email"
                                />
                                {touched.facebook_url && errors.facebook_url ? (
                                  <span className="registration_input-msg">
                                    {errors.facebook_url}
                                  </span>
                                ) : null}
                              </p>
                              <p
                                className="input_field col_half card-box"
                                style={{ width: "45%", margin: "20px" }}
                              >
                                <label
                                  style={{
                                    fontWeight: "700",
                                    fontFamily: "Open Sans",
                                    color: "#000",
                                    fontSize: "12px",
                                    lineHeight: "20px",

                                    marginTop: "14px",
                                    marginRight: "7px",
                                  }}
                                  htmlFor="registration_email"
                                >
                                  Twitter Url
                                </label>
                                <input
                                  type="url"
                                  placeholder="https://twitter.com"
                                  name="twitter_url"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.twitter_url}
                                  id="registration_email"
                                />
                                {touched.twitter_url && errors.twitter_url ? (
                                  <span className="registration_input-msg">
                                    {errors.twitter_url}
                                  </span>
                                ) : null}
                              </p>
                              <p
                                className="input_field col_half card-box"
                                style={{ width: "45%", margin: "20px" }}
                              >
                                <label
                                  style={{
                                    fontWeight: "700",
                                    fontFamily: "Open Sans",
                                    color: "#000",
                                    fontSize: "12px",
                                    lineHeight: "20px",

                                    marginTop: "14px",
                                    marginRight: "7px",
                                  }}
                                  htmlFor="registration_email"
                                >
                                  Linkedin Url
                                </label>
                                <input
                                  type="url"
                                  placeholder="https://linkedin.com"
                                  name="linkedin_url"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.linkedin_url}
                                  id="registration_email"
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
        <Footer />
      </div>
    </Styles>
  );
};

UpdateInstructor.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(UpdateInstructor);
