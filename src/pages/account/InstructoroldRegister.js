import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Container, Row, Col } from "react-bootstrap";
import NavBar from "components/Navbar";
import { BreadcrumbBox } from "../../components/common/Breadcrumb";
import Footer from "components/Footer";

import { useHistory } from "react-router-dom";
import toast from "react-hot-toast";
import { useFormik } from "formik";

import { registerInstructor } from "services/auth";
import { getCountries } from "services/country";
import { getIndustries } from "services/industry";
import { getLanguages } from "services/language";
import { instructorSchema } from "helper/validations";
import "./instructorReg.css";

import { Styles } from "components/styles/busRegister.js";

import {
  Degrees,
  EducationLevel,
  EmploymentStatus,
  ExperienceLevel,
  MaritalStatus,
} from "helper/data";

const InstructorRegister = () => {
  let history = useHistory();
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [industries, setIndustries] = useState([]);
  const [languages, setLanguages] = useState([]);

  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    phone_number: "",

    country_id: 0,
    category_id: 0,
    other_info: "",

    experience_level: "",
    previous_institutions: "",
    niche_courses: "",
  };

  useEffect(() => {
    Promise.all(
      [getCountries(), getIndustries(), getLanguages()].map((err) =>
        err.catch(() => err)
      )
    )
      .then((res) => {
        setCountries([...res[0].data.data]);
        setIndustries([...res[1].data.data]);
        setLanguages([...res[2].data.data]);
      })
      .catch((err) => {
        toast.error("Error Occured fetchong data");
      });
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    values.phone_number = values.phone_number.toString();
    values.country_id = parseInt(values.country_id);
    values.category_id = parseInt(values.category_id);
    values.niche_courses = values.niche_courses.split(",");
    values.previous_institutions = values.previous_institutions.split(",");

    try {
      console.log(values);
      await registerInstructor(values);
      toast.success("We have sent a verification mail to your email.");
      setTimeout(() => {
        history.push("/login");
      }, 2000);
      setSubmitting(false);
    } catch (err) {
      console.log(err);
      toast.error(err?.response?.data?.message);
      setSubmitting(false);
    }
    setLoading(false);
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: instructorSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Styles>
      {/* Main Wrapper */}
      <div className="main-wrapper registration-page">
        {/* Header 2 */}
        <NavBar />

        {/* Registration Area */}
        <section className="form_wrapper">
          <Container>
            <Row>
              <Col lg="12">
                <div className="  form_container">
                  <Col md="6">
                    <div className="course-text">
                      <h4>Create your instructor profile today</h4>
                      <p>
                        If you're interested in becoming an instructor, please
                        apply on this form.{" "}
                      </p>
                      <p>
                        After you submit the form, we will reach out to you if
                        there's a good fit. Please note that we can't respond to
                        every application, but we do keep all submissions for
                        future consideration.
                      </p>
                    </div>
                  </Col>

                  <form
                    id="form_registration"
                    className="form"
                    onSubmit={formik.handleSubmit}
                  >
                    <Row>
                      <p className="input_field col_half">
                        <label htmlFor="registration_fname">First Name</label>
                        <input
                          type="text"
                          required
                          placeholder="First name"
                          name="first_name"
                          {...formik.getFieldProps("first_name")}
                          id="registration_fname"
                        />
                        {formik.touched.first_name &&
                        formik.errors.first_name ? (
                          <span className="registration_input-msg">
                            {formik.errors.first_name}
                          </span>
                        ) : null}
                      </p>
                      <br />
                      <p className="input_field col_half">
                        <label htmlFor="registration_lname">Last Name</label>
                        <input
                          type="text"
                          required
                          placeholder="Last name"
                          name="last_name"
                          {...formik.getFieldProps("last_name")}
                          id="registration_lname"
                        />
                        {formik.touched.last_name && formik.errors.last_name ? (
                          <span className="registration_input-msg">
                            {formik.errors.last_name}
                          </span>
                        ) : null}
                      </p>
                      <br />
                      <p className="input_field col_half">
                        <label htmlFor="registration_email">
                          Email Address
                        </label>
                        <input
                          type="email"
                          required
                          placeholder="Email here"
                          name="email"
                          {...formik.getFieldProps("email")}
                          id="registration_email"
                        />
                        {formik.touched.email && formik.errors.email ? (
                          <span className="registration_input-msg">
                            {formik.errors.email}
                          </span>
                        ) : null}
                      </p>
                      <br />

                      <p className="input_field col_half">
                        <label htmlFor="registration_user">Phone Number</label>
                        <input
                          type="number"
                          id="phone_number"
                          name="phone_number"
                          placeholder="08112345687"
                          {...formik.getFieldProps("phone_number")}
                        />
                        {formik.touched.phone_number &&
                        formik.errors.phone_number ? (
                          <span className="registration_input-msg">
                            {formik.errors.phone_number}
                          </span>
                        ) : null}
                      </p>
                      <br />
                      <p className="input_field col_half">
                        <label htmlFor="other_info">Other Information</label>
                        <textarea
                          placeholder="Biography here"
                          name="other_info"
                          {...formik.getFieldProps("other_info")}
                          id="registration_other_info"
                        ></textarea>

                        {formik.touched.other_info &&
                        formik.errors.other_info ? (
                          <span className="registration_input-msg">
                            {formik.errors.other_info}
                          </span>
                        ) : null}
                      </p>
                      <br />

                      <p className="input_field col_half">
                        <label htmlFor="registration_user">Country</label>
                        <select
                          name="country_id"
                          {...formik.getFieldProps("country_id")}
                          required
                        >
                          <option>-- Country --</option>
                          {countries.length > 0 &&
                            countries.map((country, i) => {
                              return (
                                <option value={country.id}>
                                  {country.name}
                                </option>
                              );
                            })}
                        </select>
                        {formik.touched.country_id &&
                        formik.errors.country_id ? (
                          <span className="registration_input-msg">
                            {formik.errors.country_id}
                          </span>
                        ) : null}
                      </p>
                      <br />

                      <p className="input_field col_half">
                        <label htmlFor="registration_user">Category</label>
                        <select
                          name="category_id"
                          {...formik.getFieldProps("category_id")}
                          required
                        >
                          <option>-- Industry --</option>
                          {industries.length > 0 &&
                            industries.map((industry, i) => {
                              return (
                                <option value={industry.id}>
                                  {industry.name}
                                </option>
                              );
                            })}
                        </select>
                        {formik.touched.category_id &&
                        formik.errors.category_id ? (
                          <span className="registration_input-msg">
                            {formik.errors.category_id}
                          </span>
                        ) : null}
                      </p>
                      <br />

                      <p className="input_field col_half">
                        <label htmlFor="registration_user">
                          Experience Level
                        </label>
                        <select
                          name="experience_level"
                          {...formik.getFieldProps("experience_level")}
                          required
                        >
                          <option>-- Experience Level --</option>
                          {ExperienceLevel.length > 0 &&
                            ExperienceLevel.map((item, i) => {
                              return <option value={i}>{item}</option>;
                            })}
                        </select>
                        {formik.touched.experience_level &&
                        formik.errors.experience_level ? (
                          <span className="registration_input-msg">
                            {formik.errors.experience_level}
                          </span>
                        ) : null}
                      </p>
                      <br />

                      <p className="input_field col_half">
                        <label htmlFor="registration_email">
                          Previous Institution seperated by comma
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Previous Institution"
                          name="previous_institutions"
                          {...formik.getFieldProps("previous_institutions")}
                          id="registration_email"
                        />
                        {formik.touched.previous_institutions &&
                        formik.errors.previous_institutions ? (
                          <span className="registration_input-msg">
                            {formik.errors.previous_institutions}
                          </span>
                        ) : null}
                      </p>
                      <br />

                      <p className="input_field col_half">
                        <label htmlFor="registration_email">
                          Niche courses seperated by comma
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Courses"
                          name="niche_courses"
                          {...formik.getFieldProps("niche_courses")}
                          id="registration_email"
                        />
                        {formik.touched.niche_courses &&
                        formik.errors.niche_courses ? (
                          <span className="registration_input-msg">
                            {formik.errors.niche_courses}
                          </span>
                        ) : null}
                      </p>
                      <br />
                    </Row>

                    <button type="submit" disabled={formik.isSubmitting}>
                      {loading ? (
                        <div className="spinner-border" role="status">
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        "Register"
                      )}
                    </button>
                  </form>
                  <div className="have_account-btn text-center">
                    <p>
                      Already have an account?{" "}
                      <Link to="/login"> Login Here</Link>
                    </p>
                  </div>
                  <div className="have_account-btn text-center">
                    <p>
                      <Link to="/register">Register as a Learner</Link>
                    </p>
                  </div>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        {/* Footer 2 */}
        <Footer />
      </div>
    </Styles>
  );
};

export default InstructorRegister;
