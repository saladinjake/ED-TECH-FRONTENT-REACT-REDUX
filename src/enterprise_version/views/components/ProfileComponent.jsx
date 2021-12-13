import React, { useState, useEffect, Fragment, useMemo } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Nav, Tab } from "react-bootstrap";

import { connect } from "react-redux";
import PropTypes from "prop-types";
import Loader from "./Loader";
import { getAuthProfile } from "../../api/instructor.services";
import toast from "react-hot-toast";

import $ from "jquery";


import {
  Degrees,
  EducationLevel,
  EmploymentStatus,
  ExperienceLevel,
  MaritalStatus,
} from "../../core/helpers/data";

import { getCountries } from "../../api/country.services";
import { getLanguages } from "../../api/language.services";
import { getIndustries } from "../../api/industry.services";
import { getInstructorProfile ,updateInstructorProfile, getLearnerProfile,  updateLearnerProfile } from "../../api/profile.services";
import { learnerSchema } from "../../core/helpers/validations";


import { useHistory } from "react-router-dom";
import { Formik } from "formik";

function getTimeAgoInterval(date) {
  let seconds = Math.floor((Date.now() - date) / 1000);
  let unit = "second";
  let direction = "ago";
  if (seconds < 0) {
    seconds = -seconds;
    direction = "from now";
  }
  let value = seconds;
  if (seconds >= 31536000) {
    value = Math.floor(seconds / 31536000);
    unit = "year";
  } else if (seconds >= 86400) {
    value = Math.floor(seconds / 86400);
    unit = "day";
  } else if (seconds >= 3600) {
    value = Math.floor(seconds / 3600);
    unit = "hour";
  } else if (seconds >= 60) {
    value = Math.floor(seconds / 60);
    unit = "minute";
  }
  if (parseInt(value) !== 1) unit = unit + "s";
  return value + " " + unit + " " + direction;
}

const ProfileComponent = ({ auth: { user, user_roles } }) => {
  const [profile, setProfile] = useState({});
  const [loading, setLoading] = useState(true);
  let dummyAvatar = "https://d30y9cdsu7xlg0.cloudfront.net/png/138926-200.png";
  const [image_url, setImageProfile] = useState("");

  const [gender, setGender] = useState(true);
  const [education, setEducation] = useState(true);
  const [employment, setEmployment] = useState(true)
  const [degree, setDegree] = useState(true);

  // console.log(user);

  useEffect(() => {
    (async function loadContent() {
      try {


         let res = await getAuthProfile();
        setProfile({ ...res.data.data });

    
        
        

       
      } catch (err) {
        toast.error(`Error fetching instructor's details`);
      }
      setLoading(false);
    })();
    // eslint-disable-next-line
  }, []);







   console.log(user);
  let history = useHistory();
  //const [loading, setLoading] = useState(true);
  const [countries, setCountries] = useState([]);
  const [languages, setLanguages] = useState([]);
  // eslint-disable-next-line
  const [industries, setIndustries] = useState([]);
 // const [profile, setProfile] = useState({});
  let preInst = null;
  let courseNiche = null;
 // let dummyAvatar = "https://d30y9cdsu7xlg0.cloudfront.net/png/138926-200.png";
 // const [image_url, setImageProfile] = useState("");

  // alert(user?.image_url,profile?.user?.image_url, "hello Nija" )

  // const realImg =

  const [userId, setUserId] = useState(user.id);

  const [lang_id, setLangId] = useState(1);

  let initialValues = useMemo(() => {
    console.log(profile);
    setImageProfile(profile?.user?.image_url);
    return Object.entries(profile).length !== 0
      ? {
          username: profile?.user?.username || "",
          first_name: profile?.user?.first_name || "",
          middle_name: profile?.user?.middle_name || "",
          last_name: profile?.user?.last_name || "",
          phone_number: profile?.user?.phone_number || "",

          gender: profile?.user?.instructor_profile?.gender || "",
          date_of_birth: profile?.user?.instructor_profile?.date_of_birth || "",
          country_id: profile?.user?.instructor_profile?.country_id || "",
          industry_id: profile?.user?.instructor_profile?.industry_id || "",
          // biography: profile?.user?.instructor_profile?.biography || "",
          employment_status:
            profile?.user?.instructor_profile?.employment_status || "",
          marital_status:
            profile?.user?.instructor_profile?.marital_status || "",
          experience_level:
            profile?.user?.instructor_profile?.experience_level || "",
          education_level:
            profile?.user?.instructor_profile?.education_level || "",
          degree_obtained:
            profile?.user?.instructor_profile?.degree_obtained || "",
          language: profile?.user?.instructor_profile?.language || "",
          facebook_url: profile?.user?.instructor_profile?.facebook_url || "",
          linkedin_url: profile?.user?.instructor_profile?.linkedin_url || "",
          twitter_url: profile?.user?.instructor_profile?.twitter_url || "",

          brief_introduction:
            profile?.user?.instructor_profile?.brief_introduction || "",
          detailed_introduction:
            profile?.user?.instructor_profile?.detailed_introduction || "",

          category_id: profile?.user?.instructor_profile?.industry_id || "",
          other_info: profile?.user?.instructor_profile?.other_info || "",
          previous_institutions:
            profile?.user?.instructor_profile?.previous_institutions || "",
          niche_courses: profile?.user?.instructor_profile?.niche_courses || "",
          image_url: profile?.user?.image_url || dummyAvatar,

          current_employer_name:
            profile?.user?.instructor_profile?.current_employer_name || "",
          current_employer_designation:
            profile?.user?.instructor_profile?.current_employer_designation ||
            "",
          previous_employer_name:
            profile?.user?.instructor_profile?.previous_employer_name || "",
          previous_employer_designation:
            profile?.user?.instructor_profile?.previous_employer_designation ||
            "",
        }
      : {};
  }, [profile]);

  // if (!initialValues.image_url) {
  //   initialValues.image_url ="https://d30y9cdsu7xlg0.cloudfront.net/png/138926-200.png";
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
          // console.log(imageUrl);
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

 

  const fetchContent = async () => {
    Promise.all(
      [
        getCountries(),
        getLanguages(),
        getInstructorProfile(),
        getIndustries(),
      ].map((err) => err.catch(() => err))
    )
      .then((res) => {
        setCountries([...res[0].data.data]);
        setLanguages([...res[1].data.data]);
        setProfile({ ...res[2].data.data });
        setIndustries([...res[3].data.data]);
        // console.log("profile", res[2].data.data);
        // console.log("languages", [...res[1].data.data]);

        setLoading(false);
      })
      .catch((err) => {
        toast.error("Error Occured fetching data");

        setLoading(false);
      });
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      setLoading(true);
      values.email = user.email;
      let langObject = languages.find(
        (lang) => lang.english == values.language
      );
      console.log(langObject);
      if (langObject) {
        values.language = langObject.id;
      } else {
        values.language = "38";
      }

      // values.niche_courses = values.niche_courses.split(',');
      // values.previous_institutions = values.previous_institutions.split(',') ;
      values.phone_number = values.phone_number.toString();
      values.country_id = parseInt(values.country_id);
      values.category_id = parseInt(values.category_id);
      values.niche_courses = values.niche_courses;
      values.previous_institutions = values.previous_institutions;
      values.image_url = image_url;

      console.log(values.language);
      let langIn = { ...values };
      langIn.language = values.language;
      // langIn.username = values.username;
      // langIn.middle_name = values.middle_name
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

        if(user_roles[0].name=='Instructor'){
            await updateInstructorProfile(userId, langIn);
     
        toast.success("Your Profile has been updated.");
           history.push("/");
        }else{
          await updateLearnerProfile(user.id, langIn);
  
      toast.success("Your Profile has been updated.");
         history.push("/");
        }
      

        // setTimeout(()=>{window.location.href= process.env.PUBLIC_URL+ "/"},2000)
      } catch (err) {
        console.log(err);
        toast.error("Error occured updating Profile");
      }
      setSubmitting(false);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  let niche = [];
  let previousInst = [];


  // console.log(profile);
  const [activeKey, setActiveKey] = useState("home");

  return (
    <>

     {loading ? (
              <Loader width="70" />
            ) : Object.entries(profile).length !== 0 ? (
      <div class="container" style={{ marginTop: "-13rem" }}>
        <div className="row">
          <div className="col-md-3">

           {profile?.user?.image_url ? (
             <>
                         

                           <img
                                      alt="User Pic"
                                      src={initialValues?.image_url}
                                      id="profile-image11"
                                   
                                          className="rounded w-100"
                                      onClick={startUpload}
                              
                                    />

                                    <input className="form-control"
                                      id="profile-image-upload"
                                      
                                      type="file"
                                      onChange={previewFile}
                                    />

                          </>
                        ) : (
                          <img
                            src={dummyAvatar}
                            alt=""
                            height="200"
                            width="200"
                            alt=""
                            className="rounded w-100"
                          />
                        )}
           
            <p className="text-13 mt-2">
              
                {`${profile?.user?.instructor_profile?.brief_introduction}`}
          </p>
            <hr />
            <p className="text-13">
              {`${profile?.user?.instructor_profile?.detailed_introduction}`}
          </p>
          </div>
          <div className="col-md-9 text-white">
            <div className="user-info pt-5 mb-4-2">
              <h4>My Profile</h4>
              <p>{profile?.user?.first_name} {profile?.user?.last_name}</p>
              <p>Role: {user_roles[0].name}</p>
            </div>
            <div className="row">
              <Tab.Container id="left-tabs-example" defaultActiveKey="home">
                <div className="container">
                  <div className="row">
                    <div className="col-md-12">
                      <div className="bg-teal pills-link px-3 py-2 bottom-left-radius-15 bottom-right-radius-15">
                        <Nav
                          variant="pills"
                          defaultActiveKey="home"
                          onSelect={(activeKey) => setActiveKey({ activeKey })}
                        >
                          <Nav.Item>
                            <Nav.Link eventKey="home">Profile Details</Nav.Link>
                          </Nav.Item>
                          <Nav.Item className="me-auto"></Nav.Item>
                          <Nav.Item className="text-end">
                            <Nav.Link eventKey="edit">Edit Profile</Nav.Link>
                          </Nav.Item>
                        </Nav>
                      </div>
                      <Tab.Content>
                        <Tab.Pane eventKey="home">
                          <div className="py-4 mb-3">
                            <div className="row">
                              <div class="mb-3 col-md-6">
                                <label
                                  for="exampleFormControlInput1"
                                  class="form-label text-black"
                                >
                                  First Name
                                </label>
                                <input className="form-control"
                                  type="text"
                                  class="form-control"
                                  id="exampleFormControlInput1"

                                  value={`${profile?.user?.first_name}  `}
                                />
                              </div>
                              <div class="mb-3 col-md-6">
                                <label
                                  for="exampleFormControlInput1"
                                  class="form-label text-black"
                                >
                                  Last Name
                                </label>
                                <input className="form-control"
                                  type="text"
                                  class="form-control"
                                  id="exampleFormControlInput1"
                                  value={`${profile?.user?.last_name}`}
                                />
                              </div>
                            </div>
                            <div className="row">
                              <div class="mb-3 col-md-6">
                                <label
                                  for="exampleFormControlInput1"
                                  class="form-label text-black"
                                >
                                  Email
                                </label>
                                <input className="form-control"
                                  type="email"
                                  class="form-control"
                                  id="exampleFormControlInput1"
                                   value={`${profile?.user?.email}`}
                                />
                              </div>
                              <div class="mb-3 col-md-6">
                                <label
                                  for="exampleFormControlInput1"
                                  class="form-label text-black"
                                >
                                  Phone
                                </label>
                                <input className="form-control"
                                  type="phone"
                                  class="form-control"
                                  id="exampleFormControlInput1"
                                   value={`${profile?.user?.phone_number}`}
                                />
                              </div>
                            </div>
                            <div className="row">
                              <div class="mb-3 col-md-6">
                                <label
                                  for="exampleFormControlInput1"
                                  class="form-label text-black"
                                >
                                  Gender
                                </label>
                                <select
                                  name="employment_status"
                                  className="form-control"
                                >
                                  <option value="">--Select--</option>
                                  <option value="male" selected={profile?.user?.instructor_profile?.gender?.toLowerCase()=='male'}>Male</option>
                                  <option value="female" selected={profile?.user?.instructor_profile?.gender?.toLowerCase()=='females'}>Female</option>
                                </select>
                              </div>
                              <div class="mb-3 col-md-6">
                                <label
                                  for="exampleFormControlInput1"
                                  class="form-label text-black"
                                >
                                  Employment Status
                                </label>
                                <select
                                  name="employment_status"
                                  className="form-control"
                                >
                                  <option value="">--Select--</option>
                                  <option value="Employed" selected={profile?.user?.instructor_profile?.employment_status=="Employed"}>Employed</option>
                                  <option value="Not Employed" selected={profile?.user?.instructor_profile?.employment_status=="Not Employed"}>Not Employed</option>
                                </select>
                              </div>
                            </div>



                          


                            <div className="row">
                              <div class="mb-3 col-md-6">
                                <label
                                  for="exampleFormControlInput1"
                                  class="form-label text-black"
                                >
                                  Educational level
                                </label>
                                <select
                                  name="employment_status"
                                  className="form-control"
                                >
                                  <option value="Tertiary">--Select--</option>
                                  <option value="1" selected={profile?.user?.instructor_profile?.experience_level=="1"}>Secondary</option>
                                  <option value="2" selected={profile?.user?.instructor_profile?.experience_level=="2"}>Tertiary</option>
                                  <option value="3" selected={profile?.user?.instructor_profile?.experience_level=="3"}>Postgraduate</option>
                                  <option value="4" selected={profile?.user?.instructor_profile?.experience_level=="4"}>Diploma</option>
                                  <option value="5" selected={profile?.user?.instructor_profile?.experience_level=="5"}>High School</option>
                                  <option value="6" selected={profile?.user?.instructor_profile?.experience_level=="6"}> College</option>
                                  <option value="7" selected={profile?.user?.instructor_profile?.experience_level=="7"}> A-Level</option>
  
                                </select>
                              </div>
                              <div class="mb-3 col-md-6">
                                <label
                                  for="exampleFormControlInput1"
                                  class="form-label text-black"
                                >
                                  Educational Level
                                </label>
                                <select
                                  name="employment_status"
                                  className="form-control"
                                >
                                  <option value="Professional" >--Select--</option>
                                   <option value="Professional" selected={profile?.user?.instructor_profile?.education_level?.toLowerCase()=="professional"}> Professional</option>
                                    <option value="Master" selected={profile?.user?.instructor_profile?.education_level?.toLowerCase()=="master"}>Master</option>


                                  
                                </select>
                              </div>
                            </div>
                            <div className="row">
                              <div class="mb-3 col-md-6">
                                <label
                                  for="exampleFormControlInput1"
                                  class="form-label text-black"
                                >
                                  Date of Birth
                                </label>
                                <input className="form-control"
                                  type="date"
                                  class="form-control"
                                  id="exampleFormControlInput1"
                                  value={profile?.user?.instructor_profile?.date_of_birth}
                                />
                              </div>
                              <div class="mb-3 col-md-6">
                                <label
                                  for="exampleFormControlInput1"
                                  class="form-label text-black"
                                >
                                  Marital Status
                                </label>
                                <select
                                  name="employment_status"
                                  className="form-control"
                                >

                           
        

                                  <option value="Single" >--Select--</option>
                                  <option value="Single" selected={profile?.user?.instructor_profile?.marital_status=='Single'}>Single</option>
                                  <option value="Married" selected={profile?.user?.instructor_profile?.marital_status=='Married'}>Married</option>
                                  <option value="Widowed" selected={profile?.user?.instructor_profile?.marital_status=='Widowed'}>Widowed</option>
                                  <option value="Divorced" selected={profile?.user?.instructor_profile?.marital_status=='Divorced'}>Divorced</option>
                                  <option value="Seperated" selected={profile?.user?.instructor_profile?.marital_status=='Seperated'}>Seperated</option>
                                </select>
                              </div>
                            </div>
                          </div>
                        </Tab.Pane>
                        <Tab.Pane eventKey="edit">
                          <div className="py-4 mb-3">
                            <div className="row">
                           <section className="form_wrapper card-box">
        
            {loading ? (
              <Loader width="70" />
            ) : Object.entries(profile).length !== 0 ? (
              <Fragment>
               
                    <div className=" ">
                      
                      <div className="row">
                        <h4
                          className="page-title"
                         
                        >
                          Edit My Profile
                        </h4>
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
                            
           
                          >

                          
                  
                             <div className="mb-3 col-md-12 "
                              
                              >
                               <label>First Name</label>
                                <input className="form-control"
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
                            </div>
                              <div className="mb-3 col-md-12 "
                              
                              >
                                <label>Last Name</label>
                                <input className="form-control"
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
                            </div>
                              <div className="mb-3 col-md-12 "
                           
                              >
                               <label>Middle Name</label>
                                <input className="form-control"
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
                            </div>

                              <div className="mb-3 col-md-12 "
                                
                              >
                               <label>Phone Number</label>
                                <input className="form-control"
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
                            </div>
                              <div className="mb-3 col-md-12 "
                         
                              >
                                <label>Brief Introduction</label>
                                <textarea
                                  style={{ height: "200px",width:"100%" }}
                                  placeholder="Brief Introduction"
                                  name="brief_introduction"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.brief_introduction}
                                  id="registration_biography"
                                
                                  className="form-control"
                                ></textarea>

                                {touched.brief_introduction &&
                                errors.brief_introduction ? (
                                  <span className="registration_input-msg">
                                    {errors.brief_introduction}
                                  </span>
                                ) : null}
                            </div>

                              <div className="mb-3 col-md-12 ">
                               <label>Detailed Introduction</label>
                                <textarea
                                  placeholder="Detailed Introduction"
                                  name="detailed_introduction"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.detailed_introduction}
                                  id="registration_biography9"
                                 style={{ height: "200px",width:"100%" }}
                                  className="form-control"
                                ></textarea>

                                {touched.detailed_introduction &&
                                errors.detailed_introduction ? (
                                  <span className="registration_input-msg">
                                    {errors.detailed_introduction}
                                  </span>
                                ) : null}
                            </div>

                              <div className="mb-3 col-md-12 "
                             
                              >
                               <label>Current Employers Name</label>
                                <input className="form-control"
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
                            </div>
                          

                              <div className="mb-3 col-md-12 "
                              
                              >
                               <label>Current Employer Designation</label>
                                <input className="form-control"
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
                            </div>
                         

                              <div className="mb-3 col-md-12 "
                               
                              >
                               <label>Previous Employers Name</label>
                                <input className="form-control"
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
                            </div>
                              <br />

                              <div className="mb-3 col-md-12 "
                          
                              >
                               <label>Previous Employer Designation</label>
                                <input className="form-control"
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
                            </div>
                         

                              <div className="mb-3 col-md-12 "
                          
                              >
                                <label>Industry</label>
                                <select
                                  name="industry_id"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.industry_id}
                                  required
                                  class="form-control"
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
                            </div>

                              <div className="mb-3 col-md-12 "
                         
                              >
                               <label>Previous Institution</label>
                                <input className="form-control"
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
                            </div>
                       

                              <div className="mb-3 col-md-12 "
                        
                              >
                               <label>Niche courses</label>
                                <input className="form-control"
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
                            </div>
                    

                              <div className="mb-3 col-md-12 "
                          
                              >
                               <label>biography</label>
                                <textarea
                                  placeholder="Other information here"
                                  name="other_info"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.other_info}
                                  style={{width:"100%"}}
                                  id="registration_biography"
                                ></textarea>

                                {touched.other_info && errors.other_info ? (
                                  <span className="registration_input-msg">
                                    {errors.other_info}
                                  </span>
                                ) : null}
                            </div>
                              <div className="mb-3 col-md-12 "
                              
                              ><label>DOB (Date Of Births)</label>
                               
                                <input className="form-control"
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
                            </div>
                              <div className="mb-3 col-md-12 "
                               
                              >
                                <label
                                  
                                >
                                  Gender
                                </label>
                                <select
                                className="form-control"
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
                            </div>

                              <div className="mb-3 col-md-12 "
                              
                              >
                                <label
                                  
                                  htmlFor="registration_user"
                                >
                                  Country
                                </label>
                                <select
                                  className="form-control"
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
                            </div>

                              <div className="mb-3 col-md-12 "
                        
                              >
                                <label
                                 
                                  htmlFor="registration_email"
                                >
                                  Username
                                </label>
                                <input className="form-control"
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
                            </div>
                              <div className="mb-3 col-md-12 "
                                
                              >
                                <label
                                  
                                  htmlFor="registration_user"
                                >
                                  Language{" "}
                                  {profile?.user?.instructor_profile.language}
                                </label>
                                <select
                                  name="language"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.language}
                                  required
                                    className="form-control"
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
                            </div>

                              <div className="mb-3 col-md-12 "
                            
                              >
                                <label
                                  
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
                                    className="form-control"
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
                            </div>
                              <div className="mb-3 col-md-12 "
                             
                              >
                                <label
                                  
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
                                    className="form-control"
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
                            </div>
                              <div className="mb-3 col-md-12 "
                               
                              >
                                <label
                                  
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
                                    className="form-control"
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
                            </div>
                              <div className="mb-3 col-md-6 "
                                
                              >
                                <label
                                  
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
                                    className="form-control"
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
                            </div>
                              <div className="mb-3 col-md-6 "
                                
                              >
                                <label
                                 
                                >
                                  Marital Status
                                </label>
                                <select
                                  name="marital_status"
                                  onChange={handleChange}
                                  onBlur={handleBlur}
                                  value={values.marital_status}
                                  required
                                    className="form-control"
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
                            </div>
                              <div className="mb-3 col-md-12 "
                             
                              >
                                <label
                                  
                                >
                                  Facebook Url
                                </label>
                                <input className="form-control"
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
                            </div>
                              <div className="mb-3 col-md-6 "
                              
                              >
                                <label
                                  
                                >
                                  Twitter Url
                                </label>
                                <input className="form-control"
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
                            </div>
                              <div className="mb-3 col-md-12 "
                       
                              >
                                <label
                                 
                                  htmlFor="registration_email"
                                >
                                  Linkedin Url
                                </label>
                                <input className="form-control"
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
                            </div>
                           
                            <button onClick={handleSubmit}>
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
                 
              </Fragment>
            ) : (
              <p>No Details for this user yet</p>
            )}
         
        </section>
   </div>
                           </div>
                        
                        </Tab.Pane>
                        <Tab.Pane eventKey="instructors">
                          <div className="row mt-3"></div>
                        </Tab.Pane>
                      </Tab.Content>
                    </div>
                  </div>
                </div>
              </Tab.Container>
            </div>
          </div>
        </div>
      </div>
     ) : (
              <p>No Details for this user yet</p>
            )}
    </>
  );
};




ProfileComponent.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.cart,
  auth: state.auth,
});

export default connect(mapStateToProps, {})(ProfileComponent);