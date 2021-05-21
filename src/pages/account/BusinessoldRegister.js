import React, { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import NavBar from "components/Navbar";
import Footer from "components/Footer";
import { BreadcrumbBox } from "../../components/common/Breadcrumb";
import { Styles } from "./styles/account.js";

import toast from "react-hot-toast";
import { useFormik } from "formik";

import { createBusiness } from "services/business";
import { getCountries } from "services/country";
import { getIndustries } from "services/industry";
import { businessSchema } from "helper/validations";

const BusinessRegister = () => {
  const [loading, setLoading] = useState(false);
  const [countries, setCountries] = useState([]);
  const [industries, setIndustries] = useState([]);

  const initialValues = {
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    country_id: "",
    industry_id: "",
    phone_number: "",
    company_name: "",
    company_phone: "",
    no_of_employees: "100 above",
    type_of_institution: "",
    company_description: "",
    registration_number: "",
    linkedin_page: "",
    color_theme: "",
    facebook_page: "",
    website: "",
  };

  useEffect(() => {
    Promise.all(
      [getCountries(), getIndustries()].map((err) => err.catch(() => err))
    )
      .then((res) => {
        setCountries([...res[0].data.data]);
        setIndustries([...res[1].data.data]);
      })
      .catch((err) => {
        toast.error("Error Occured fetching data");
      });
  }, []);

  const handleSubmit = async (values, { setSubmitting }) => {
    console.log("Values", values);
    setLoading(true);
    values.phone_number = values.phone_number.toString();
    values.company_phone = values.company_phone.toString();
    values.country_id = parseInt(values.country_id);
    values.industry_id = parseInt(values.industry_id);
    try {
      await createBusiness(values);
      toast.success("Business Created.");
      setSubmitting(false);
    } catch (err) {
      toast.error(err?.response?.data?.message);
      setSubmitting(false);
    }
    setLoading(false);
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: businessSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Styles>
      {/* Main Wrapper */}
      <div className="main-wrapper registration-page">
        {/* Header 2 */}
        <NavBar />

        {/* Breadcroumb */}
        <BreadcrumbBox title="Registration" />

        {/* Registration Area */}
        <section className="form_wrapper">
          <Container>
            <Row>
              <Col lg="12">
                 <div className="  form_container">
                  <div className="title_container">
                    <h3>Registration</h3>
                  </div>

                  <form
                    id="form_registration"
                    className="form"
                    onSubmit={formik.handleSubmit}
                  >
                    <Row>
                      <p  className="input_field col_half">
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
                      <p  className="input_field col_half">
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
                      <p  className="input_field col_half">
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
                   
                      <p  className="input_field col_half">
                        <label htmlFor="registration_user">Password</label>
                        <input
                          type="password"
                          id="password"
                          name="password"
                          placeholder="08112345687"
                          {...formik.getFieldProps("password")}
                        />
                        {formik.touched.password && formik.errors.password ? (
                          <span className="registration_input-msg">
                            {formik.errors.password}
                          </span>
                        ) : null}
                      </p>
                      <p  className="input_field col_half">
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
                      <p  className="input_field col_half">
                        <label htmlFor="registration_user">
                          Company Number
                        </label>
                        <input
                          type="number"
                          id="company_phone"
                          name="company_phone"
                          placeholder="08112345687"
                          {...formik.getFieldProps("company_phone")}
                        />
                        {formik.touched.company_phone &&
                        formik.errors.company_phone ? (
                          <span className="registration_input-msg">
                            {formik.errors.company_phone}
                          </span>
                        ) : null}
                      </p>
                      <p  className="input_field col_half">
                        <label htmlFor="registration_email">
                          Company Description
                        </label>
                        <textarea
                          placeholder="Company description here"
                          name="company_description"
                          {...formik.getFieldProps("company_description")}
                          id="company_description"
                        ></textarea>

                        {formik.touched.company_description &&
                        formik.errors.company_description ? (
                          <span className="registration_input-msg">
                            {formik.errors.company_description}
                          </span>
                        ) : null}
                      </p>
                   
                      <p  className="input_field col_half">
                        <label htmlFor="registration_lname">
                          Company Name<i>At least 5 characters</i>
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="company name"
                          name="company_name"
                          {...formik.getFieldProps("company_name")}
                          id="registration_lname"
                        />
                        {formik.touched.company_name &&
                        formik.errors.company_name ? (
                          <span className="registration_input-msg">
                            {formik.errors.company_name}
                          </span>
                        ) : null}
                      </p>

                      <p  className="input_field col_half">
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

                      <p  className="input_field col_half">
                        <label htmlFor="registration_user">Industry</label>
                        <select
                          name="industry_id"
                          {...formik.getFieldProps("industry_id")}
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
                        {formik.touched.industry_id &&
                        formik.errors.industry_id ? (
                          <span className="registration_input-msg">
                            {formik.errors.industry_id}
                          </span>
                        ) : null}
                      </p>
                    
                      <p  className="input_field col_half">
                        <label htmlFor="registration_fname">
                          No of Employees
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="No of Employees"
                          name="no_of_employees"
                          {...formik.getFieldProps("no_of_employees")}
                          id="registration_fname"
                        />
                        {formik.touched.no_of_employees &&
                        formik.errors.no_of_employees ? (
                          <span className="registration_input-msg">
                            {formik.errors.no_of_employees}
                          </span>
                        ) : null}
                      </p>
                      <p  className="input_field col_half">
                        <label htmlFor="registration_fname">
                          Type of Institutuon
                        </label>
                        <select
                          name="type_of_institution"
                          {...formik.getFieldProps("type_of_institution")}
                          required
                        >
                          <option>-- Country --</option>
                          <option value="Tertiary">Tertiary</option>
                          <option value="Polytechnic">Polytechnic</option>
                          <option value="Secondary">Secondary</option>
                        </select>
                        {formik.touched.type_of_institution &&
                        formik.errors.type_of_institution ? (
                          <span className="registration_input-msg">
                            {formik.errors.type_of_institution}
                          </span>
                        ) : null}
                      </p>
                      <p  className="input_field col_half">
                        <label htmlFor="registration_fname">
                          Registration Number
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="Registration Number"
                          name="registration_number"
                          {...formik.getFieldProps("registration_number")}
                          id="registration_fname"
                        />
                        {formik.touched.registration_number &&
                        formik.errors.registration_number ? (
                          <span className="registration_input-msg">
                            {formik.errors.registration_number}
                          </span>
                        ) : null}
                      </p>
                     
                     
                    </Row>

                    <button type="submit" disabled={formik.isSubmitting}>
                      {loading ? (
                        <div className="spinner-border" role="status">
                          <span className="sr-only">Loading...</span>
                        </div>
                      ) : (
                        "Register Business"
                      )}
                    </button>
                  </form>
                </div>
              </Col>
            </Row>
          </Container>
        </section>

        <Footer />
      </div>
    </Styles>
  );
};

export default BusinessRegister;
