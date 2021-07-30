import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";
const Section = () => {
  let history = useHistory();
  return (
    <div>
      <br />

      <section
        className="hero-section hero-section-2 ptb-100"
        style={{
          background: "#fff",
          height: "505px",
          marginTop: "1px",
          zIndex: "0",
        }}
      >
        <br />
        <div className="container">
          <div
            className="row align-items-center justify-content-between fontFam"
            style={{ marginTop: "-30px", zIndex: "99" }}
          >
            <div className="col-md-6 col-lg-6" style={{ height: "470px" }}>
              <div className="hero-content-left ptb-100 text-black fontFam">
                <br />
                <h1
                  className=" "
                  style={{ marginTop: "10px", lineHeight: "-20px" }}
                >
                  <span
                    className="head__style-1 hero-made-text"
                    style={{
                      fontWeight: "300",
                      lineHeight: "-40px",
                      fontFamily: "Open Sans",
                    }}
                  >
                    <b className="fontFam">
                      Accelerate your quest, learn anywhere, anytime
                    </b>
                  </span>
                </h1>
                <br /> <br /> <br />
                <br /> <br /> <br />
                <br /> <br /> <br />
                <p
                  className="head__style-3 hero-made-text mobile-centry"
                  style={{ marginTop: "-170px", fontFamily: "Open Sans" }}
                >
                  Acquire new knowledge and skills, train for certifications,
                  diplomas and degrees from world-class institutions at your own
                  pace and space.
                  {/*</p>
                <p className="head__style-3" style={{}}>*degrees from world-class institutions at your own pace and */}
                </p>
                <br />
                <div className="mobile-centry entry-center">
                  <a
                    style={{
                      marginTop: "-40px",
                      marginLeft: "-20px",
                      fontSize: "20px",
                      background: "#fff",
                      color: "#000",
                      borderRadius: "43px",
                      padding: "10px",
                    }}
                    href="#"
                    id="login-hero"
                    className="modal-link move-into-mobil fontFam"
                    data-lms-modal="login"
                  >
                    {" "}
                    <b
                      style={{
                        textAlign: "center",
                        fontFamily: "Open Sans",

                        color: "#000",
                        fontSize: "14px",
                        fontWeight: "normal",
                        marginLeft: "10px",

                        transition: "0.5s ease-in-out",
                      }}
                      className="fontFam"
                    >
                      Log In
                    </b>
                  </a>

                  <a
                    style={{
                      borderRadius: "43px",
                      marginTop: "-40px",
                      height: "40px",
                      padding: "10px",
                      color: "#fff",
                      background: "rgb(2, 83, 200)",
                    }}
                    className="modal-link2 fontFam"
                    href="#"
                    id="signup-hero"
                  >
                    <b
                      style={{
                        textAlign: "center",
                        fontFamily: "Open Sans",

                        color: "#fff",
                        fontSize: "14px",
                        fontWeight: "normal",

                        transition: "0.5s ease-in-out",
                      }}
                    >
                      Sign Up
                    </b>
                  </a>
                </div>
              </div>
            </div>
            <br />
            <div className="col-md-6 col-lg-5">
              <br />
              <br />
              <div className="hero-animation-img" style={{ width: "100%" }}>
                <div
                  className="stm_lms_row_animation"
                  style={{ width: "100%" }}
                >
                  <img
                    style={{
                      width: "100%",
                      minWidth: "600px",
                      marginTop: "-100px",
                    }}
                    src={process.env.PUBLIC_URL + "./assets/images/heroman.png"}
                  />

                  {/*

                    <img
                    style={{ position: "absolute", top: "20px", right: "10px" }}
                    className="book1 animation-one"
                    src={process.env.PUBLIC_URL + "./assets/images/book1.png"}
                  />

                  <img
                    style={{
                      position: "absolute",
                      top: "390px",
                      right: "-10px",
                    }}
                    className="book2 animation-two"
                    src={process.env.PUBLIC_URL + "./assets/images/book2.png"}
                  />
                            <img className="bubblespeech " src="https://stylemixthemes.com/wp-content/themes/masterstudy/partials/vc_parts/row_animations/images/bubblespeech.png" />
                        <img className="magnifier" src="https://stylemixthemes.com/wp-content/themes/masterstudy/partials/vc_parts/row_animations/images/magnifier.png" />
                      
                   <img className="moon animation-three" src="https://stylemixthemes.com/wp-content/themes/masterstudy/partials/vc_parts/row_animations/images/moon.png" />
     
                          */}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Section;
