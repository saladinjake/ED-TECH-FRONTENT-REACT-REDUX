 import React, { useState, useEffect, Fragment, useMemo } from "react";
import { Container, Row, Col } from "react-bootstrap";
import NavBar from "components/Navbar";
import { BreadcrumbBox } from "../../components/common/Breadcrumb";
import FooterTwo from "../../components/FooterTwo";
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
     <div class="content-page" >
              
                <div class="content">
                    <div class="container" >

                        
           <div class="row" style="display: flex;
  justify-content: center;">
                            
                            <div class="col-lg-12 card-box">
                            <div class="col-lg-2 pull-left"><a href="#" onclick="window.history.back();"
                            class="btn btn-default waves-effect waves-light pull-left m-b-10"><i class="md  md-chevron-left"></i> Back to List</a> </div>
                            <div class="col-lg-8"><h4 class="m-b-10 header-title">James Adekunle <span class="m-l-10 text-purple font-13">
                                <b>last seen: 20/20/2020</b>

                            </span></h4></div>
                           


                              <div class="col-lg-12 card-box" style="display: flex;justify-content: center;text-align:center">
                                                        <img src="assets/images/users/avatar-1.jpg" alt="img" class="img-circle thumb-lg m-r-15" />
                                                        
                            </div>
                            <h4  class="m-t-0 header-title text-muted" style="text-align:center"><b>Change profile picture</b></h4>
                             <p class="text-muted font-13 m-b-30" style="text-align:center">
                                            image can not be more than 2
                            </p>

                            <div class="m-t-10" style="border:1px solid #4c3392;"></div>
                            <div class="col-lg-6 m-t-10" style="">
                                <div class="card-box">
                                
                                    <form class="form-horizontal" role="form" data-parsley-validate="" novalidate="">
                                        <h4 class="m-t-0 header-title"><b>Personal Detail</b></h4>
                                        <p class="text-muted font-13 m-b-30">
                                            Bio data
                                        </p>
    
                                        <div class="form-group">
                                            <label for="" class="col-sm-4 control-label">First Name</label>
                                            <div class="col-sm-7">
                                                <input type="text" required="" parsley-type="text" class="form-control" id="" value="James Adekunle" />
                                            </div>
                                        </div>

                                        <div class="form-group">
                                                <label for="firstName" class="col-sm-4 control-label">Phone Number</label>
                                                <div class="col-sm-7">
                                                    <input type="text" required="" parsley-type="text" class="form-control" id="firstName" value="James" />
                                                </div>
                                            </div>

                                              <div class="form-group">
                                                <label for="lastName" class="col-sm-4 control-label">Birthday</label>
                                                <div class="col-sm-7">
                                                    <input type="date" required="" parsley-type="text" class="form-control" id="lastName" value="Adekunle" />
                                                </div>
                                            </div>
        
                                            
                                         <h4 class="m-t-0 header-title"><b>Education and works</b></h4>
                                        <p class="text-muted font-13 m-b-30">
                                            Experience fields
                                        </p>


                                          <div class="form-group">
                                                <label for="lastName" class="col-sm-4 control-label">Degree Obtained</label>
                                                <div class="col-sm-7">
                                                     <select class="form-control">
                                                        <option>Msc</option>
                                                        <option>Bsc</option>
                                                        <option>Hnd</option>
                                                        <option>B-ed</option>
                                                        <option>National Deploma</option>
                                                        <option>Other</option>
                                                    </select>
                                            </div>
                                                </div>
    
                                        <div class="form-group">
                                            <label for="" class="col-sm-4 control-label">Job Role</label>
                                            <div class="col-sm-7">
                                                <input type="text" required=""  parsley-type="text" class="form-control" id="" value="Admin">
                                            </div>
                                        </div>

                                      

                                       


                                         
                                    </form>
                                </div>
                            </div>
    
                            <div class="col-md-6  pull-right m-t-10">
                           



                             <div class="card-box">
                                    <h4 class="m-t-0 header-title"><b>Personal Detail</b></h4>
                                        <p class="text-muted font-13 m-b-30">
                                            Bio data
                                        </p>
    
    
                                    <form class="form-horizontal" role="form" data-parsley-validate="" novalidate="">
                                        
                                       

                                        
                                    </form>
                                </div>

                                 <div class="form-group">
                                            <div class="col-sm-offset-4 col-sm-8">
                                                <button type="submit" class="btn btn-primary waves-effect waves-light">
                                                    Update Changes
                                                </button>
                                                <button type="reset" class="btn btn-default waves-effect waves-light m-l-5">
                                                    Cancel Changes
                                                </button>
                                            </div>
                                        </div>

                            </div>
    
    
    
                        </div>
                    </div>
  );
};

UpdateLearner.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(UpdateLearner);



