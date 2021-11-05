import React, { Fragment, useEffect } from "react";

import $ from "jquery";

import NavBar from "../../components/shared/Navbar";
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
      left.style.width = winWidth / 4 + "px";
      right.style.width = winWidth / 2 + 4 * left.style.width + "px";
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

      <div id="wrap">
        <div id="left">
          This is the left window with video
          <iframe
            width="420"
            height="315"
            src="https://www.youtube.com/embed/Od6hY_50Dh0?autoplay=1"
            frameborder="0"
            allowfullscreen
          ></iframe>
        </div>
        <div id="right">
          This is the right window with tabs
          <div class="demo">
            <div role="tabpanel">
              <ul
                class="nav nav-tabs nav-justified nav-tabs-dropdown"
                role="tablist"
              >
                <li role="presentation" class="active">
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

              <div class="tab-content">
                <div role="tabpanel" class="tab-pane active" id="home">
                  Lesson Content...
                </div>
                <div role="tabpanel" class="tab-pane" id="profile">
                  Transcript content...
                </div>
                <div role="tabpanel" class="tab-pane" id="messages">
                  Live lessons content...
                </div>
                <div role="tabpanel" class="tab-pane" id="settings">
                  Notification content...
                </div>

                <div role="tabpanel" class="tab-pane" id="notifications">
                  Forums content ...
                </div>
                <div role="tabpanel" class="tab-pane" id="note">
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
