import React, { Fragment, useEffect, useState } from "react";
import NewHeader from "./NewHeader"; //mine
import Navbar from "components/Navbar"; //old

import Footer from "components/Footer";
import WelcomeHero from "./WelcomeHero";
import Notification from "./Notification";
import TopCourses from "./TopCourses";
import Sidebar from "./Sidebar";

import { getLearnerInfo } from "services/dashboard";

import { getWishlist } from "services/wishlist";

import PropTypes from "prop-types";
import { connect } from "react-redux";
// import Loader from "components/Loader/Loader";
import toast from "react-hot-toast";

import "./assets/css/bootstrap.min.css";
import "./assets/css/core.css";
import "./assets/css/components.css";
import "./assets/css/icons.css";
import "./assets/css/pages.css";
import "./assets/css/responsive.css";

import "./topitem.css";

const NewDashBoard = ({ auth: { user } }) => {
  const carouselLoop = () => {
    document.querySelector(".multi-item-carousel").carousel({
      interval: false,
    });

    document.querySelector(".multi-item-carousel .item").each(function () {
      var next = document.querySelector(this).nextElementSibling;
      if (!next.length) {
        next = document.querySelector(this).siblings(":first");
      }
      next
        .children(":first-child")
        .clone()
        .appendTo(document.querySelector(this));

      if (next.nextElementSibling.length > 0) {
        next.nextElementSibling
          .children(":first-child")
          .clone()
          .appendTo(document.querySelector(this));
      } else {
        document
          .querySelector(this)
          .siblings(":first")
          .children(":first-child")
          .clone()
          .appendTo(document.querySelector(this));
      }
    });
  };

  // const [loading,setLoading] = useState(true);
  // const [info,setInfo] = useState();
  const [info, setInfo] = useState({});
  const [wishlists, setWishlist] = useState({});
  const [courseList, setPaginatedCourses] = useState({});

  useEffect(() => {
    (async function loadContent() {
      try {
        let res = await getLearnerInfo(user.id);
        let reswish = await getWishlist();

        setInfo({ ...res.data.data });
        setWishlist({ wishlists: reswish.data.data });
      } catch (err) {
        toast.error("Error occured fetching notifications");
      }
      //  setLoading();
    })();
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <Navbar />
      <div className="wrapper">
        {/* the transformer for different ui design*/}

        <div className="content-page col-md-10">
          <div className="content">
            <div className="container">
              {/* <NewHeader />*/}

              <WelcomeHero info={info} wishlists={wishlists} />
              <TopCourses />
              <Notification />
            </div>
          </div>
        </div>

        <Footer />
        <footer class="footer text-right">© 2021. All rights reserved.</footer>

        <Sidebar />
      </div>
    </Fragment>
  );

  //  setTimeout(()=>{
  //  carouselLoop()
  // },7000)
};

NewDashBoard.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {})(NewDashBoard);
// export default DashBoard;
