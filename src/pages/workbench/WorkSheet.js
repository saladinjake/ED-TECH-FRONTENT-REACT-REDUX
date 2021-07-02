import React, { Fragment, useEffect } from "react";

import $ from "jquery";

import NavBar from "components/Navbar";
import Footer from "../../components/Footer";

import "./worksheet.css";

const WorkBench = () => {
  let pageLeftContent = [];

  useEffect(() => {
    let left = document.getElementById("left"),
      right = document.getElementById("right"),
      handle = document.getElementById("handle"),
      wrap = document.getElementById("wrap"),
      winWidth = window.innerWidth,
      winHeight = window.innerHeight;
    document.getElementsByTagName("body")[0].style.backgroundColor = "#fff";

    document.addEventListener("DOMContentLoaded", function (event) {
      // left.style.width  = (winWidth / 4) + 'px';
      // right.style.width = (winWidth / 2 + 4*( left.style.width)) +'px';
      // handle.style.top  = (winHeight/2-35)+ 'px';

      left.style.width = winWidth / 2 + "px";
      right.style.width = winWidth / 2 + "px";
      handle.style.top = winHeight / 2 - 35 + "px";

      rStartWidth = parseInt(window.getComputedStyle(right).width, 10);
      handle.style.right = rStartWidth - 4 + "px";

      handle.addEventListener("mousedown", setup, false);
    });

    let StartX = 0,
      rStartWidth = 0,
      lStartWidth = 0;
    const drag = (event) => {
      let firstSetGrid = lStartWidth + event.clientX - StartX;
      let secondSetGrid = rStartWidth - event.clientX + StartX;
      wrap.style.gridTemplateAreas = `${firstSetGrid}px,${secondSetGrid}`;
      right.style.width = rStartWidth - event.clientX + StartX + "px";
      left.style.width = lStartWidth + event.clientX - StartX + "px";
      handle.style.right = rStartWidth - event.clientX + StartX - 4 + "px";
    };

    const destroy = (e) => {
      document.documentElement.removeEventListener("mousemove", drag, false);
      document.documentElement.removeEventListener("mouseup", destroy, false);
    };
    const setup = (event) => {
      StartX = event.clientX;
      rStartWidth = parseInt(window.getComputedStyle(right).width, 10);
      lStartWidth = parseInt(window.getComputedStyle(left).width, 10);

      document.documentElement.addEventListener("mousemove", drag, false);
      document.documentElement.addEventListener("mouseup", destroy, false);
    };

    $(".nav-tabs-dropdown")
      .on("click", "li:not('.active') a", function (event) {
        $(this).closest("ul").removeClass("open");
      })
      .on("click", "li.active a", function (event) {
        $(this).closest("ul").toggleClass("open");
      });
  });

  return (
    <Fragment>
      <NavBar />

      <div id="wrap" className="container" style={{ background: "#fff" }}>
        <div id="left">
          <div>
            this is the contentthis is the contentthis is the contentthis is the
            contentthis is the contentthis is the content
          </div>
        </div>

        <div id="right">
          This is the right window
          <div className="demo">
            <div role="tabpanel">
              <ul
                className="course nav nav-tabs nav-justified nav-tabs-dropdown"
                role="tablist"
              >
                <li role="presentation" className="active">
                  <a
                    href="#home"
                    aria-controls="home"
                    role="tab"
                    data-toggle="tab"
                  >
                    Lesson
                  </a>
                </li>
                <li role="presentation">
                  <a
                    href="#profile"
                    aria-controls="profile"
                    role="tab"
                    data-toggle="tab"
                  >
                    Transcript
                  </a>
                </li>
                <li role="presentation">
                  <a
                    href="#messages"
                    aria-controls="messages"
                    role="tab"
                    data-toggle="tab"
                  >
                    Live
                  </a>
                </li>
                <li role="presentation">
                  <a
                    href="#settings"
                    aria-controls="settings"
                    role="tab"
                    data-toggle="tab"
                  >
                    Notifications
                  </a>
                </li>

                <li role="presentation">
                  <a
                    href="#notifications"
                    aria-controls="notifications"
                    role="tab"
                    data-toggle="tab"
                  >
                    Forums
                  </a>
                </li>
                <li role="presentation">
                  <a
                    href="#note"
                    aria-controls="note"
                    role="tab"
                    data-toggle="tab"
                  >
                    Note
                  </a>
                </li>
              </ul>

              <div className="tab-content">
                <div role="tabpanel" className="tab-pane active" id="home">
                  Lesson Content...
                </div>
                <div role="tabpanel" className="tab-pane" id="profile">
                  Transcript content...
                </div>
                <div role="tabpanel" className="tab-pane" id="messages">
                  Live lessons content...
                </div>
                <div role="tabpanel" className="tab-pane" id="settings">
                  Notification content...
                </div>

                <div role="tabpanel" className="tab-pane" id="notifications">
                  Forums content ...
                </div>
                <div role="tabpanel" className="tab-pane" id="note">
                  Notes content...
                </div>
              </div>
            </div>
          </div>
          <div id="handle"></div>
        </div>
      </div>
      <Footer />
    </Fragment>
  );
};

export default WorkBench;
