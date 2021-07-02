import React, { Fragment } from "react";
import { useHistory } from "react-router-dom";
const Section = () => {
  let history = useHistory();
  return (
    <div>
      <br />
      {/*<section className="hero-section hero-section-2 ptb-100" style={{background:"#fff",borderTop:"1px solid #fafafa"}}>
        
        <div className="container">
            <div className="row align-items-center justify-content-between">
                <div className="col-md-6 col-lg-6">
                    <div className="hero-content-left ptb-100 text-black">
                        <h1 className="text-black" style={{marginTop:"-140px"}}><span>Accelerate your quest,
learn anywhere, anytime</span></h1>
                        <p className="lead"
                         style={{marginTop:"40px"}} >Acquire new knowledge and skills, train for certifications, diplomas and </p>
                        <p className="lead">degrees from world-class institutions at your own pace and space.</p>

                          <div className="vc_btn3-container vc_btn3-inline" style={{background:"#195ec8",borderRadius: "42px",float:"left",margin:"20px",color:"#fff"}}> <a className="btn btn-default lg" href="#/courses/" title="">Login</a></div>
            
                        <div className="vc_btn3-container vc_btn3-inline" style={{background:"#f6f6f6",borderRadius: "42px",float:"left",margin:"20px",color:"#fff"}}> <a className="btn btn-default lg" href="#/courses/" title="">Sign Up</a></div>
                    </div>
                </div>
                <div className="col-md-6 col-lg-5">
                     <div className="hero-animation-img">
                       


                        <div className="stm_lms_row_animation">
					    <img src={process.env.PUBLIC_URL+ "./assets/images/base.png"} />
					    <img  className="book1 animation-one" src={process.env.PUBLIC_URL+ "./assets/images/book1.png"} />
                        
                        <img className="book2 animation-two" src={process.env.PUBLIC_URL+ "./assets/images/book2.png"} />
                     
                         
                              <img className="bubblespeech " src="https://stylemixthemes.com/wp-content/themes/masterstudy/partials/vc_parts/row_animations/images/bubblespeech.png" />
                        <img className="magnifier" src="https://stylemixthemes.com/wp-content/themes/masterstudy/partials/vc_parts/row_animations/images/magnifier.png" />
                      
					    <img className="moon animation-three" src="https://stylemixthemes.com/wp-content/themes/masterstudy/partials/vc_parts/row_animations/images/moon.png" />
					</div>







                    </div>



                   


                </div>
            </div>
        </div>
    </section>*/}

      <section
        className="hero-section hero-section-2 ptb-100"
        style={{ background: "#fff", height: "465px", marginTop:"1px",zIndex:"0" }}
      >
      <br/>
        <div className="container">
          <div className="row align-items-center justify-content-between" style={{marginTop:"-30px",zIndex:"99"}}>
            <div className="col-md-6 col-lg-6">
              <div className="hero-content-left ptb-100 text-black">
                <br/>
                <h1
                  className="text-black"
                  style={{ marginTop: "10px", lineHeight: "39px" }}
                >
                  <span><b style={{fontFamily: "Open Sans"}}>Accelerate your quest, learn anywhere, anytime</b></span>
                </h1>
                <br /> <br /> <br />
                <br /> <br /> <br />
                <br /> <br /> <br />
                <p className="lead" style={{ marginTop: "-150px" ,color:"#000",zIndex:"0",fontSize:"15px",  fontFamily: "Open Sans"}}>
                  Acquire new knowledge and skills, train for certifications,
                  diplomas and
                </p>
                <p className="lead" style={{color:"#000",zIndex:"99", fontFamily: "Open Sans",fontSize:"15px"}}>
                  degrees from world-class institutions at your own pace and
                  space.
                </p>
                {/*<div
                  className="vc_btn3-container vc_btn3-inline"
                  style={{
                    background: "#195ec8",
                    borderRadius: "42px",
                    float: "left",
                    margin: "20px",
                    color: "#fff",
                  }}
                >
                  {" "}
                  <button
                    style={{
                      borderRadius: "43px",
                      fontSize: "20px",
                      height: "60px",
                    }}
                    className="btnMobileFull"
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href = process.env.PUBLIC_URL + "/login";
                    }}
                  >
                    <b>Log In</b>
                  </button>
                </div>
                <div
                  className="vc_btn3-container vc_btn3-inline"
                  style={{
                    background: "#0253c8",
                    borderRadius: "42px",
                    float: "left",
                    margin: "20px",
                    color: "#fff",
                  }}
                >
                  {" "}
                  <button
                    style={{
                      borderRadius: "43px",
                      fontSize: "20px",
                      height: "60px",
                      color:"#fff",
                      background: "#0253c8"
                    }}
                    className="btnMobileFull"
                    onClick={(e) => {
                      e.preventDefault();
                      window.location.href =
                        process.env.PUBLIC_URL + "/register";
                    }}
                  >
                    <b>Sign Up</b>
                  </button>
                </div>*/}

                     <br/>   <br/>
                    <a
                      style={{ marginLeft:"-20px", fontSize: "20px",background:"#fff",color:"#000",borderRadius:"43px",padding:"10px" }}
                      
                      href="#"
                      id="login-hero"
                      className="modal-link"

                    
                      
                      data-lms-modal="login"
                    >
                      {" "}
                     
                      <span style={{ marginLeft: "10px",fontWeight:"bold", fontFamily: "Montserrat" }}>
                        <b>Log In</b>
                      </span>{" "}
                    </a>
                    
                  
                    <a
                      style={{
                        borderRadius: "43px",
                        fontSize: "20px",
                        height: "40px",
                        padding:"10px",
                        color:"#fff",
                        background:"rgb(2, 83, 200)",
                        
                      }}
                      className="modal-link2"
                      
                      href="#"
                      id="signup-hero"
                    >
                      <b>Sign Up</b>
                    </a>

              </div>
            </div>
            <br/>
            <div className="col-md-6 col-lg-5">
              <br /><br/>
              <div className="hero-animation-img"   style={{width:"100%"}}>
                <div className="stm_lms_row_animation"   style={{width:"100%"}}>
                  <img
                    style={{width:"100%",minWidth:"600px",marginTop:"-100px"}}
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
