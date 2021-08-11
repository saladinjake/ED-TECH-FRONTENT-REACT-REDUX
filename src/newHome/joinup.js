import React from "react";

const Section = () => {
  return (
    <div className="container" style={{ background: "#fafafa" }}>
      <div className="vc_row wpb_row row vc_row-fluid vc_custom_1533037364435 vc_row-o-equal-height vc_row-flex">
        <div
          className="wpb_column vc_column_container vc_col-sm-12 vc_col-lg-6 vc_col-md-6 col-md-6 "
          style={{ padding: "10px", marginTop: "40px" }}
        >
          <div className="vc_column-inner">
            <div
              className="wpb_wrapper"
              style={{ border: "1px solid #f5f5f5", padding: "20px" }}
            >
              <div className="ab3c01d5f6346cc2f8e3acb9d7269c8bf vc_empty_space">
                {" "}
                <span className="vc_empty_space_inner"></span>
              </div>
              <div className="left">
                <div
                  className="stm_image_box stm_image_box__style_1 
        module__e162146b69965b286e7c69b138e79c08"
                >
                  <img
                    className="thisDivCenter"
                    src={
                      process.env.PUBLIC_URL + "/assets/images/downloadword.jpg"
                    }
                    width="100%"
                    height="231"
                    alt="image_box_1"
                    title="image_box_1"
                  />
                  <br />
                  <div className="center">
                    <div className="stm_image_box__title">
                      <h3
                        style={{
                          fontWeight: "300px",
                          color: "#000",
                          fontSize: "24px",
                          fontFamily: "Open Sans",
                          lineHight: "34px",
                          letterSpacing: "-1px",
                          fontWeight: "normal",
                        }}
                      >
                        For Business
                      </h3>
                      <br />
                    </div>
                    <div
                      className="stm_image_box__textarea-x"
                      style={{
                        fontFamily: "Open Sans",
                        color: "#000",
                        fontSize: "14px",
                      }}
                    >
                      Using our courses as it is or customized, or using our
                      platform for your own internal courses, our aim is to help
                      you create essential skills pathways with verifiable and
                      stackable credentials to upskill and train every employee
                      with the highest quality eLearning experiences, in today's
                      most wanted job-relevant subject areas.
                    </div>
                    <br />
                    <a
                      href="#"
                      className="btn btn-primary"
                      style={{
                        background: "#0253c8",
                        borderRadius: "43px",
                        height: "35px",
                        textAlign: "center",
                        fontFamily: "Open Sans",

                        color: "#fff",
                        fontSize: "14px",
                        fontWeight: "normal",
                        marginLeft: "10px",

                        transition: "0.5s ease-in-out",
                      }}
                    >
                      Read More{" "}
                    </a>
                  </div>
                </div>
              </div>
              <div className="aa3e9b2585d5e7d5f6c929d0beab1846e vc_empty_space">
                {" "}
                <span
                  className="vc_empty_space_inner"
                  style={{ width: "10px" }}
                ></span>
              </div>
            </div>
          </div>
        </div>
        <div
          className="joinit wpb_column vc_column_container vc_col-sm-12 vc_col-lg-6 col-md-6 vc_col-md-6"
          style={{ padding: "10px", marginTop: "40px" }}
        >
          <div className="vc_column-inner">
            <div
              className="wpb_wrapper"
              style={{ padding: "20px", border: "1px solid #f5f5f5" }}
            >
              <div className="ab3c01d5f6346cc2f8e3acb9d7269c8bf vc_empty_space">
                {" "}
                <span className="vc_empty_space_inner"></span>
              </div>
              <div className="left ">
                <div className=" stm_image_box stm_image_box__style_1 module__6b24da982b01ea58104f2ed8a956b2fb">
                  <img
                    className="thisDivCenter"
                    src={process.env.PUBLIC_URL + "/assets/images/govt.jpeg"}
                    width="100%"
                    height="231"
                    alt="image_box_2"
                    title="image_box_2"
                  />
                  <br />
                  <div className="center">
                    <div className="stm_image_box__title">
                      <h3
                        style={{
                          fontWeight: "300px",
                          color: "#000",
                          fontSize: "24px",
                          fontFamily: "Open Sans",
                          lineHight: "34px",
                          letterSpacing: "-1px",
                          fontWeight: "normal",
                        }}
                      >
                        For Government
                      </h3>
                      <br />
                    </div>
                    <div
                      className="stm_image_box__textarea-x"
                      style={{
                        fontFamily: "Open Sans",
                        color: "#000",
                        fontSize: "14px",
                        fontWeight: "normal",
                      }}
                    >
                      In addition to the need to provide adequate training and
                      education for their staff, some government agencies also
                      have the responsibilities to provide training and skill
                      acquisition services to the public. We are poised to work
                      with any government agency to help them achieve these
                      training needs using our world-class platform.
                    </div>
                    <br />
                    <a
                      href=""
                      className="btn btn-primary"
                      style={{
                        textAlign: "center",
                        background: "#0253c8",
                        borderRadius: "43px",
                        height: "35px",
                        fontFamily: "Open Sans",

                        color: "#fff",
                        fontSize: "14px",
                        fontWeight: "normal",
                        marginLeft: "10px",

                        transition: "0.5s ease-in-out",
                      }}
                    >
                      {" "}
                      Read More{" "}
                    </a>{" "}
                  </div>
                </div>
              </div>
              <div className="aa3e9b2585d5e7d5f6c929d0beab1846e vc_empty_space">
                {" "}
                <span className="vc_empty_space_inner"></span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <br />
      <br />
      <br />
    </div>
  );
};

export default Section;
