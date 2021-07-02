import React, { useEffect, Fragment } from "react";
import "./testimony_time.css";

const Section = () => {
  useEffect(() => {
    var testim = document.getElementById("testim"),
      testimDots = Array.prototype.slice.call(
        document.getElementById("testim-dots").children
      ),
      testimContent = Array.prototype.slice.call(
        document.getElementById("testim-content").children
      ),
      testimLeftArrow = document.getElementById("left-arrow"),
      testimRightArrow = document.getElementById("right-arrow"),
      testimSpeed = 4500,
      currentSlide = 0,
      currentActive = 0,
      testimTimer,
      touchStartPos,
      touchEndPos,
      touchPosDiff,
      ignoreTouch = 30;
    window.onload = function () {
      // Testim Script
      function playSlide(slide) {
        for (var k = 0; k < testimDots.length; k++) {
          testimContent[k].classList.remove("active");
          testimContent[k].classList.remove("inactive");
          testimDots[k].classList.remove("active");
        }

        if (slide < 0) {
          slide = currentSlide = testimContent.length - 1;
        }

        if (slide > testimContent.length - 1) {
          slide = currentSlide = 0;
        }

        if (currentActive != currentSlide) {
          testimContent[currentActive].classList.add("inactive");
        }
        testimContent[slide].classList.add("active");
        testimDots[slide].classList.add("active");

        currentActive = currentSlide;

        clearTimeout(testimTimer);
        testimTimer = setTimeout(function () {
          playSlide((currentSlide += 1));
        }, testimSpeed);
      }

      testimLeftArrow.addEventListener("click", function () {
        playSlide((currentSlide -= 1));
      });

      testimRightArrow.addEventListener("click", function () {
        playSlide((currentSlide += 1));
      });

      for (var l = 0; l < testimDots.length; l++) {
        testimDots[l].addEventListener("click", function () {
          playSlide((currentSlide = testimDots.indexOf(this)));
        });
      }

      playSlide(currentSlide);

      // keyboard shortcuts
      document.addEventListener("keyup", function (e) {
        switch (e.keyCode) {
          case 37:
            testimLeftArrow.click();
            break;

          case 39:
            testimRightArrow.click();
            break;

          case 39:
            testimRightArrow.click();
            break;

          default:
            break;
        }
      });

      testim.addEventListener("touchstart", function (e) {
        touchStartPos = e.changedTouches[0].clientX;
      });

      testim.addEventListener("touchend", function (e) {
        touchEndPos = e.changedTouches[0].clientX;

        touchPosDiff = touchStartPos - touchEndPos;

        console.log(touchPosDiff);
        console.log(touchStartPos);
        console.log(touchEndPos);

        if (touchPosDiff > 0 + ignoreTouch) {
          testimLeftArrow.click();
        } else if (touchPosDiff < 0 - ignoreTouch) {
          testimRightArrow.click();
        } else {
          return;
        }
      });
    };
  });
  return (
    <Fragment>
      <main className="testimony_time">
        <section
          id="testim"
          className="testim"
          
        >
          <div className="wrap container-fluid ">
           
            <span
              style={{color:"#000", display:"none"}}
              id="left-arrow"
              className="arrow left fa fa-chevron-left "
            ></span>
             <span
            style={{color:"#000", display:"none"}}
              id="right-arrow"
              className="arrow right fa fa-chevron-right"
            ></span>
            <ul id="testim-dots" className="dots" >
              <li className="dot active"></li>
            
            </ul>
            <div id="testim-content" className="cont" >
           
              <div className="row" style={{
            backgroundImage: `url(${process.env.PUBLIC_URL}/assets/images/testimony2a.png)`,
            backgroundSize: "cover",
            backgroundRepeat: "no-repeat",
            width: "100%",
          }}>
                <div className="col-md-12 ">
                  <div
                    className="card-box col-md-6"
                    style={{ padding: "10px" ,marginTop:"20px"}}
                  >
                    <p className=""  style={{color:"#000",marginLeft:"10px", lineHeight:"35px"}}>
                      Come for all It is no exaggeration to say this MasterStudy
                      experience was transformative–both professionally and
                      personally. This workshop will long remain a high point of
                      my life. Thanks again…. I am feeling energized and eager
                      to start teaching my class next week. I can’t wait to use
                      all of my new teaching tools. I will absolutely recommend
                      this workshop to other educators!
                    </p>
                    <h2  >Linda Green</h2>
                    <h5  >Product Manager, Apple Inc</h5>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </Fragment>
  );
};

export default Section;
