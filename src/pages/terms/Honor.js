import React, { useEffect, Fragment } from "react";
import $ from "jquery";
import "./tabber.css";

import NavBar from "components/Navbar";
import Footer from "../../components/Footer";



const TermsAndConditions = () => {
  useEffect(() => {
    $(".footer p , .footer span").each(function () {
      $(this).css({ color: "#fff" });
    });

    
    $("body").css({ background: "#fff", display:"none" });

    setTimeout(()=>{
     $("body").css({ background: "#fff", display:"block" });
    },3000)

    // $(".tab-menu a").click(function (e) {
    //   e.preventDefault();
    //   $(this).css({ color: "#fff" });
    //   $(".tab-menu a")
    //     .parents()
    //     .each(function () {
    //       $(this).removeClass("visited-now");
    //       $(this).css({ color: "#000" });
    //     });
    //   $(this).parent().addClass("visited-now");

    //   // $(this).parent().css({background:"rgba(8,23,200)", color:"#fff"})

    //   $(this).tab("show");
    // });
  });

  return (
    <Fragment>
      <NavBar />
      <br />
      <br />
      <br />
      <br />

      <section
        className="blok sidebar-nav container"
        style={{ height: "8000px" }}
      >
        <div className="blok-body">
          <div className="row">
            <ul className="card-box nav tab-menu nav-pills col-sm-3 nav-stacked pr15 tabs-left trigger-nav">
              <li
                style={{ margin: "20px" }}
                className="authorText active visited-now"
                data-toggle="tab"
              >
                <a href="./terms" style={{textDecoration:"none"}}
                onClick={()=>{
                    window.location.href=process.env.PUBLIC_URL+ "/terms"
                  }}


                >Terms Of Use</a>
              </li>
              <li style={{ margin: "20px" }} className="authorText">
                <a className="authorText" href="./honor"

                 data-toggle="tab" style={{textDecoration:"none"}}
                 onClick={()=>{
                    window.location.href=process.env.PUBLIC_URL+ "/honor"
                  }}

                 >
                  Honour Code
                </a>
              </li>
              <li style={{ margin: "20px" }} className="authorText">
                <a
                style={{textDecoration:"none"}}
                  className="authorText"
                  href="./privacy"
                  data-toggle="tab"
                  onClick={()=>{
                    window.location.href=process.env.PUBLIC_URL+ "/privacy"
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
                id="honour-code"
              >

               <iframe style={{width:"100%",height:"3000px",border:"none"}} src={process.env.PUBLIC_URL+ "/honor.html"}/>

                
              </div>
            </div>
          </div>
        </div>
      </section>

      <div>
        <div style={{ clear: "both" }} id="resetFooter"></div>
        <Footer />
      </div>
    </Fragment>
  );
};

export default TermsAndConditions;
