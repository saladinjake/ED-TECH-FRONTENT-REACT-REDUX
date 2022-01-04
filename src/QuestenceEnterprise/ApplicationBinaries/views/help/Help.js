import React, { Fragment, useEffect } from "react";
import "./help.css";
import NavBar from "../../components/shared/NavBar";

import Footer from "../../components/shared/Footer";
import $ from "jquery";

const HelpArea = () => {
  function search(e) {
    e.preventDefault();
    var searchInput = document.getElementById("searchInput").value;
    getUserData(encodeURI(searchInput));
    document.getElementById("searchInput").value = "";
  }

  function getUserData(input) {
    $.ajax({
      url: `https://randomuser.me/api/1.0/?seed=${input}`,
      type: "GET",
      success: function (res) {
        var data = res.results[0];
        openModal(data, `https://avatars.dicebear.com/v2/human/${input}.svg`);
      },
      error: function (jqXHR, exception) {
        console.log(exception);
      },
    });
  }

  function openModal(data, imageURL) {
    $(".modal-help").show();
    var template = `
			      
			        <div><strong>Search Result</strong></div>
			        <div><strong></strong> </div>
			      `;
    $("#modal-results").html(template);
  }

  function closeModal() {
    $(".modal-help").hide();
    $("#searchInput").focus();
  }
  useEffect(() => {
    $(document).keydown(function (e) {
      if (e.keyCode == 27) {
        closeModal();
      }
    });

    $(".footer p , .footer span").each(function () {
      $(this).css({ color: "#fff" });
    });
  });
  return (
    <Fragment>
      <NavBar />

      <div className="main">
        <div className="hero-help">
          <div className="search-help">
            <h1 style={{ marginTop: "-20px", color: "#fff" }}>
              What are you looking for?
            </h1>
            <form
              onSubmit={(event) => {
                search(event);
              }}
            >
              <input id="searchInput" type="text" placeholder="Search..." />
              <a
                className="button-help"
                href="#"
                onClick={(event) => {
                  search(event);
                }}
              >
                <i className="fa fa-search"></i>
              </a>
            </form>
          </div>
        </div>
        <br />
        <br />
        <br />
      
        <div className="modal-help">
          <div className="close-help">
            <button
              onClick={() => {
                closeModal();
              }}
            >
              x
            </button>
          </div>
          <div id="modal-results"></div>
        </div>
      </div>

      
          <div className="my-auto border-top bg-green">
                <div className="container">
                        <Footer />
                </div>
            </div>
    </Fragment>
  );
};

export default HelpArea;
