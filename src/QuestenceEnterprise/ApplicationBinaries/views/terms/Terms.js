import React, { useEffect, Fragment } from "react";
import $ from "jquery";
import "./tabber.css";

import NavBar from "../../components/shared/NavBar";

import Footer from "../../components/shared/Footer";

const TermsAndConditions = () => {
  

  return (
    <Fragment>
      <NavBar />
     

      <section
        className="blok sidebar-nav container"
        style={{ height: "10000px" }}
      >
        <div className="blok-body">
          <div className="row">
            <ul className=" nav tab-menu nav-pills col-sm-3 nav-stacked pr15 tabs-left trigger-nav">
              <li
                style={{ margin: "20px" }}
                className="authorText active visited-now"
                data-toggle="tab"
              >
                <a
                  href="./terms"
                  style={{ textDecoration: "none" }}
                  onClick={() => {
                    window.location.href = process.env.PUBLIC_URL + "/terms";
                  }}
                >
                  Terms Of Use
                </a>
              </li>
              <li style={{ margin: "20px" }} className="authorText">
                <a
                  className="authorText"
                  href="./honor"
                  data-toggle="tab"
                  style={{ textDecoration: "none" }}
                  onClick={() => {
                    window.location.href = process.env.PUBLIC_URL + "/honor";
                  }}
                >
                  Honour Code
                </a>
              </li>
              <li style={{ margin: "20px" }} className="authorText">
                <a
                  style={{ textDecoration: "none" }}
                  className="authorText"
                  href="./privacy"
                  data-toggle="tab"
                  onClick={() => {
                    window.location.href = process.env.PUBLIC_URL + "/privacy";
                  }}
                >
                  Privacy Policy
                </a>
              </li>

              {/*<li className="authorText"><a className="authorText" href="#settings"  data-toggle="tab">Instructor Terms</a></li>

				    <li className="authorText"><a className="authorText" href="#settings"  data-toggle="tab">Business Provacy Statement</a></li>


				    <li  data-toggle="tab"><a href="#home">Affiliate Terms & Conditions</a></li>
				    <li className="authorText"><a className="authorText" href="#profile"  data-toggle="tab">Credits Program</a></li>
				    <li className="authorText"><a className="authorText" href="#messages"  data-toggle="tab">Pricing & Promotion Policy</a></li>
*/}
            </ul>

            <div className="tab-content col-sm-9 native-right">
              <div
                className="tab-pane well active in active tab-content-below"
                id="terms-of-use"
              >
                <iframe
                  style={{ width: "100%", height: "5700px", border: "none" }}
                  src={process.env.PUBLIC_URL + "/tos.html"}
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      

     <div className="my-auto border-top bg-green">
                <div className="container">
                        <Footer />
                </div>
            </div>
    </Fragment>
  );
};

export default TermsAndConditions;
