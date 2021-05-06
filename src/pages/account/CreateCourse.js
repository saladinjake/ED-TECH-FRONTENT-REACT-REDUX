import React, { useState, useEffect } from "react";
import { Container, Row, Col } from "react-bootstrap";
// import { useHistory } from "react-router-dom";
import InstructorNavBar from "components/Navbar/InstructorNavbar";
import { BreadcrumbBox } from "../../components/common/Breadcrumb";
import Footer from "components/Footer";
import { Styles } from "./styles/account.js";
import toast from "react-hot-toast";
import { useFormik } from "formik";
import { createCourse } from "services/course";
import { getLanguages } from "services/language";
import { getCategories } from "services/category";
import { getCertificates } from "services/category";
import { getBusiness } from "services/business";
import { courseSchema } from "helper/validations";
import { LearnigStyles } from "helper/data";
// import Loader from "components/Loader/Loader";

const CreateCourse = () => {
  // let history = useHistory();
  const [loading, setLoading] = useState(true);
  const [categories, setCategories] = useState([]);
  // eslint-disable-next-line
  const [business, setBusiness] = useState([]);
  const [certificates, setCertificates] = useState([]);
  const [languages, setLanguages] = useState([]);
  const [topics, setTopics] = useState([]);
  const [outcomes, setOutcomes] = useState([]);

  const handleTopics = (e) => {
    //   console.log("value", e.target.value);
    e.preventDefault();
    // e.stopPropagation();
    if (e.keyCode === 13) {
      // const topic = { text: e.target.value, id: Math.random() };
      setTopics([...topics, e.target.value]);
      // setTopics([...topics, topic]);
      e.target.value = "";
    }
  };

  const handleOutcomes = (e) => {
    e.preventDefault();
    // e.stopPropagation();
    if (e.keyCode === 13) {
      setOutcomes([...outcomes, e.target.value]);
      e.target.value = "";
    }
  };

  // const deleteTopic = (id) => {
  //   // eslint-disable-next-line
  //   const remainder = topics.filter((topic) => {
  //     if (topic.id !== id) return topic;
  //   });
  //   setTopics([...remainder]);
  // };

  const initialValues = {
    course_name: "",
    learning_style: "",
    duration: "",
    language_id: "",
    certificate_id: "",
    category_id: "",
    course_description: "",
    course_thumbnail: "",
    business_id: "",
    introduction_video: "",
    start_date: "",
    end_date: "",
    enrollment_start: "",
    enrollment_end: "",
    course_overview: "",
    prerequisite_course: "",
    entrance_exam: "",
    license: "",
    overall_grade_range: "",
    grace_period_on_deadline: "24hours",
    course_cover_image: "",
  };

  useEffect(() => {
    (async function loadContent() {
      await fetchContent();
    })();
  }, []);

  const fetchContent = async () => {
    Promise.all(
      [
        getCategories(),
        getCertificates(),
        getLanguages(),
        getBusiness(),
      ].map((err) => err.catch(() => err))
    )
      .then((res) => {
        setCategories([...res[0].data.data]);
        setCertificates([...res[1].data.data]);
        setLanguages([...res[2].data.data]);
        setBusiness([...res[3].data.data.profiles.data]);
        setLoading(false);
      })
      .catch((err) => {
        toast.error("Error Occured fetching data");

        setLoading(false);
      });
  };

  const handleSubmit = async (values, { setSubmitting }) => {
    setLoading(true);
    try {
      await createCourse(values);
      toast.success("We have sent a verification mail to your email.");
    } catch (err) {
      toast.error(err?.response?.data?.message);
      toast.error(JSON.stringify(err?.response?.data?.errors));
    }
    setLoading(false);
  };

  const formik = useFormik({
    initialValues: initialValues,
    validationSchema: courseSchema,
    onSubmit: handleSubmit,
  });

  return (
    <Styles>
      {/* Main Wrapper */}
      <div className="main-wrapper registration-page">
        <InstructorNavBar />
        <BreadcrumbBox title="Create Course" />
        <section className="registration-area">
          <Container>
            <Row>
              <Col lg="12">
                <section className="registration-box instructorregister">
                  <div className="registration-title text-center">
                    <h3>Create Course </h3>
                  </div>
                  <form
                    id="form_registration"
                    className="form"
                    onSubmit={formik.handleSubmit}
                  >
                    <Row>
                      <p className="form-control">
                        <label htmlFor="registration_fname">Course Name</label>
                        <input
                          type="text"
                          required
                          placeholder="Course name"
                          name="course_name"
                          {...formik.getFieldProps("course_name")}
                          id="registration_fname"
                        />
                        {formik.touched.course_name &&
                        formik.errors.course_name ? (
                          <span className="registration_input-msg">
                            {formik.errors.course_name}
                          </span>
                        ) : null}
                      </p>

                      <p className="form-control">
                        <label htmlFor="registration_user">
                          Learning Style
                        </label>
                        <select
                          name="learning_style"
                          {...formik.getFieldProps("learning_style")}
                          required
                        >
                          <option>-- Learning Style --</option>
                          {LearnigStyles.length > 0 &&
                            LearnigStyles.map((item) => {
                              return <option value={item}>{item}</option>;
                            })}
                        </select>
                        {formik.touched.learning_style &&
                        formik.errors.learning_style ? (
                          <span className="registration_input-msg">
                            {formik.errors.learning_style}
                          </span>
                        ) : null}
                      </p>

                      <p className="form-control">
                        <label htmlFor="registration_fname">Duration</label>
                        <input
                          type="text"
                          required
                          placeholder="Duration"
                          name="duration"
                          {...formik.getFieldProps("duration")}
                          id="registration_fname"
                        />
                        {formik.touched.duration && formik.errors.duration ? (
                          <span className="registration_input-msg">
                            {formik.errors.duration}
                          </span>
                        ) : null}
                      </p>

                      <p className="form-control">
                        <label htmlFor="registration_email">
                          Course Thumbnail
                        </label>
                        <input
                          type="file"
                          accept="image/jpg,image/png,image/jpeg"
                          placeholder="Course thumbnail"
                          name="course_thumbnail"
                          id="course_thumbnail"
                          onChange={(event) => {
                            formik.setFieldValue(
                              "course_thumbnail",
                              event.currentTarget.files[0]
                            );
                          }}
                          {...formik.getFieldProps("course_thumbnail")}
                        />
                        {formik.touched.course_thumbnail &&
                        formik.errors.course_thumbnail ? (
                          <span className="registration_input-msg">
                            {formik.errors.course_thumbnail}
                          </span>
                        ) : null}
                      </p>
                    </Row>
                    <Row>
                      <p className="form-control">
                        <label htmlFor="registration_user">Language</label>
                        <select
                          name="language_id"
                          {...formik.getFieldProps("language_id")}
                          required
                        >
                          <option>-- Language --</option>
                          {languages.length > 0 &&
                            languages.map((language, i) => {
                              return (
                                <option key={i} value={language.id}>
                                  {language.english}
                                </option>
                              );
                            })}
                        </select>
                        {formik.touched.language_id &&
                        formik.errors.language_id ? (
                          <span className="registration_input-msg">
                            {formik.errors.language_id}
                          </span>
                        ) : null}
                      </p>
                      <p className="form-control">
                        <label htmlFor="registration_user">Certificate</label>
                        <select
                          name="certificate_id"
                          {...formik.getFieldProps("certificate_id")}
                          required
                        >
                          <option>-- Certificate --</option>
                          {certificates.length > 0 &&
                            certificates.map((certificate, i) => {
                              return (
                                <option key={i} value={certificate.id}>
                                  {certificate.name}
                                </option>
                              );
                            })}
                        </select>
                        {formik.touched.certificate_id &&
                        formik.errors.certificate_id ? (
                          <span className="registration_input-msg">
                            {formik.errors.certificate_id}
                          </span>
                        ) : null}
                      </p>
                      <p className="form-control">
                        <label htmlFor="registration_user">Category</label>
                        <select
                          name="category_id"
                          {...formik.getFieldProps("category_id")}
                          required
                        >
                          <option>-- category --</option>
                          {categories.length > 0 &&
                            categories.map((category, i) => {
                              return (
                                <option key={i} value={category.id}>
                                  {category.name}
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

                      <p className="form-control">
                        <label htmlFor="registration_user">
                          Course Description
                        </label>
                        <textarea
                          placeholder="Course Description"
                          name="course_description"
                          {...formik.getFieldProps("course_description")}
                          id="registration_biography"
                        ></textarea>
                        {formik.touched.course_description &&
                        formik.errors.course_description ? (
                          <span className="registration_input-msg">
                            {formik.errors.course_description}
                          </span>
                        ) : null}
                      </p>
                    </Row>
                    <Row>
                      <p className="form-control">
                        <label htmlFor="registration_user">Business</label>
                        <select
                          name="business_id"
                          {...formik.getFieldProps("business_id")}
                          required
                        >
                          <option>Business</option>
                          {business.length > 0 &&
                            business.map((item) => {
                              return (
                                <option value={item.id}>
                                  {item.company_name}
                                </option>
                              );
                            })}
                        </select>
                        {formik.touched.business_id &&
                        formik.errors.business_id ? (
                          <span className="registration_input-msg">
                            {formik.errors.business_id}
                          </span>
                        ) : null}
                      </p>
                      <p className="form-control">
                        <label htmlFor="registration_email">
                          Introductory Video Url
                        </label>
                        <input
                          type="url"
                          placeholder="Course Video Link"
                          name="introduction_video"
                          {...formik.getFieldProps("introduction_video")}
                          id="registration_email"
                        />
                        {formik.touched.introduction_video &&
                        formik.errors.introduction_video ? (
                          <span className="registration_input-msg">
                            {formik.errors.introduction_video}
                          </span>
                        ) : null}
                      </p>
                      <p className="form-control">
                        <label htmlFor="registration_user">
                          Enrollment Start
                        </label>
                        <input
                          type="date"
                          required
                          id="enrollment_start"
                          name="enrollment_start"
                          placeholder="Enrollment Start"
                          {...formik.getFieldProps("enrollment_start")}
                        />
                        {formik.touched.enrollment_start &&
                        formik.errors.enrollment_start ? (
                          <span className="registration_input-msg">
                            {formik.errors.enrollment_start}
                          </span>
                        ) : null}
                      </p>
                      <p className="form-control">
                        <label htmlFor="registration_user">
                          Enrollment End
                        </label>
                        <input
                          type="date"
                          required
                          id="enrollment_end"
                          name="enrollment_end"
                          placeholder="Enrollment end"
                          {...formik.getFieldProps("enrollment_end")}
                        />
                        {formik.touched.enrollment_end &&
                        formik.errors.enrollment_end ? (
                          <span className="registration_input-msg">
                            {formik.errors.enrollment_end}
                          </span>
                        ) : null}
                      </p>
                    </Row>
                    <Row>
                      <p className="form-control">
                        <label htmlFor="registration_user">Start Date</label>
                        <input
                          type="date"
                          required
                          id="start_date"
                          name="start_date"
                          placeholder="Start date"
                          {...formik.getFieldProps("start_date")}
                        />
                        {formik.touched.start_date &&
                        formik.errors.start_date ? (
                          <span className="registration_input-msg">
                            {formik.errors.start_date}
                          </span>
                        ) : null}
                      </p>
                      <p className="form-control">
                        <label htmlFor="registration_user">End Date</label>
                        <input
                          type="date"
                          required
                          id="end_date"
                          name="end_date"
                          placeholder="end date"
                          {...formik.getFieldProps("end_date")}
                        />
                        {formik.touched.end_date && formik.errors.end_date ? (
                          <span className="registration_input-msg">
                            {formik.errors.end_date}
                          </span>
                        ) : null}
                      </p>
                      <p className="form-control">
                        <label htmlFor="registration_email">
                          Course Overview
                        </label>
                        <textarea
                          placeholder="Course Overview"
                          name="course_overview"
                          {...formik.getFieldProps("course_overview")}
                          id="registration_course_overview"
                        ></textarea>

                        {formik.touched.course_overview &&
                        formik.errors.course_overview ? (
                          <span className="registration_input-msg">
                            {formik.errors.course_overview}
                          </span>
                        ) : null}
                      </p>
                      <p className="form-control">
                        <label htmlFor="registration_email">
                          Prerequisite Course
                        </label>
                        <textarea
                          placeholder="Prerequisite Course"
                          name="prerequisite_course"
                          {...formik.getFieldProps("prerequisite_course")}
                          id="registration_prerequisite_course"
                        ></textarea>

                        {formik.touched.prerequisite_course &&
                        formik.errors.prerequisite_course ? (
                          <span className="registration_input-msg">
                            {formik.errors.prerequisite_course}
                          </span>
                        ) : null}
                      </p>
                    </Row>
                    <Row>
                      <p className="form-control">
                        <label htmlFor="registration_user">Entrance Exam</label>
                        <select
                          name="entrance_exam"
                          {...formik.getFieldProps("entrance_exam")}
                          required
                        >
                          <option>Entrance Exam</option>
                          <option value="0">No</option>
                          <option value="1">Yes</option>
                        </select>
                        {formik.touched.entrance_exam &&
                        formik.errors.entrance_exam ? (
                          <span className="registration_input-msg">
                            {formik.errors.entrance_exam}
                          </span>
                        ) : null}
                      </p>
                      <p className="form-control">
                        <label htmlFor="registration_fname">Licesnse</label>
                        <input
                          type="text"
                          required
                          placeholder="License"
                          name="license"
                          {...formik.getFieldProps("license")}
                          id="registration_fname"
                        />
                        {formik.touched.license && formik.errors.license ? (
                          <span className="registration_input-msg">
                            {formik.errors.license}
                          </span>
                        ) : null}
                      </p>
                      <p className="form-control">
                        <label htmlFor="registration_fname">
                          Overall grade range
                        </label>
                        <input
                          type="number"
                          min="1"
                          required
                          placeholder="Overall_grade_range"
                          name="overall_grade_range"
                          {...formik.getFieldProps("overall_grade_range")}
                          id="registration_fname"
                        />
                        {formik.touched.overall_grade_range &&
                        formik.errors.overall_grade_range ? (
                          <span className="registration_input-msg">
                            {formik.errors.overall_grade_range}
                          </span>
                        ) : null}
                      </p>
                      <p className="form-control">
                        <label htmlFor="registration_fname">
                          Grace period on deadline
                        </label>
                        <input
                          type="text"
                          required
                          placeholder=" Grace period on deadline"
                          name="grace_period_on_deadline"
                          {...formik.getFieldProps("grace_period_on_deadline")}
                          id="registration_fname"
                        />
                        {formik.touched.grace_period_on_deadline &&
                        formik.errors.grace_period_on_deadline ? (
                          <span className="registration_input-msg">
                            {formik.errors.grace_period_on_deadline}
                          </span>
                        ) : null}
                      </p>
                    </Row>

                    <Row>
                      <p className="form-control">
                        <label htmlFor="registration_email">
                          Outcomes (Press Enter to save)
                        </label>
                        <input
                          type="text"
                          placeholder="outcomes"
                          name="outcomes"
                          id="outcomes"
                          onKeyUp={handleOutcomes}
                        />
                        <ul className="outcomes">
                          {outcomes.length > 0 &&
                            outcomes.map((item, i) => {
                              return <li key={i}>{item}</li>;
                            })}
                        </ul>
                      </p>
                      <p className="form-control">
                        <label htmlFor="registration_email">
                          Topics (Press Enter to save)
                        </label>
                        <input
                          type="text"
                          placeholder="Topics"
                          name="topics"
                          id="topics"
                          onKeyUp={handleTopics}
                        />
                        <ul className="topics">
                          {/* {topics.length > 0 &&
                            topics.map((item, i) => {
                              return (
                                <li key={i}>
                                  {item.text}
                                  <button
                                    onClick={deleteTopic.bind(this, item.id)}
                                  ></button>
                                </li>
                              );
                            })} */}
                          {topics.length > 0 &&
                            topics.map((item, i) => {
                              return <li key={i}>{item}</li>;
                            })}
                        </ul>
                      </p>
                      <p className="form-control">
                        <label htmlFor="registration_email">
                          Course Cover Image Url
                        </label>
                        <input
                          type="file"
                          accept="image/jpg,image/png,image/jpeg"
                          placeholder=" Course Cover Image"
                          name="course_cover_image"
                          id="course_cover_image"
                          onChange={(event) => {
                            formik.setFieldValue(
                              "course_thumbnail",
                              event.currentTarget.files[0]
                            );
                          }}
                          {...formik.getFieldProps("course_cover_image")}
                        />
                        {formik.touched.course_cover_image &&
                        formik.errors.course_cover_image ? (
                          <span className="registration_input-msg">
                            {formik.errors.course_cover_image}
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
                        "Create Course"
                      )}
                    </button>
                  </form>
                </section>
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

export default CreateCourse;
