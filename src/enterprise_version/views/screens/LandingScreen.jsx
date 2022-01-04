import React from "react";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import SubscribeBox from "../components/SubscribeBox";
import CoachesBox from "../components/CoachesBox";
import HeroUnit from "../components/HeroUnit";
import "../../assets/css/main.css";
import WhyQuestence from "../components/WhyQuestence";
import HorizontalCard from "../components/HorizontalCard";
import CoursesSection from "../components/CoursesSection";
import CategorySection from "../components/CategorySection";
import ReverseHorizontalCard from "../components/ReverseHorizontalCard";
import ProfessionalBodySection from "../components/ProfessionalBodySection";


import PropTypes from "prop-types";
import { connect } from "react-redux";

import { addToCart, fetchCourses } from "../../core/redux/actions/cart.action";
import { addToWishList } from "../../core/redux/actions/wishlist.action";
const querySearch = () => {
  const queryString = window.location.search;
  const parameters = new URLSearchParams(queryString);
  return parameters;
};

const Landing = () => {
  return (
    <>
      <NavBar />
      <HeroUnit />
      <CoursesSection />
      <CategorySection />
      <ReverseHorizontalCard />
      <ProfessionalBodySection />

      <HorizontalCard />
      <WhyQuestence />
      <CoachesBox />
      <SubscribeBox />
      <div className="my-auto border-top bg-green">
        <div className="container">
          <Footer />
        </div>
      </div>
    </>
  );
};


Landing.propTypes = {
  cart: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addToCart: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.cart,
  auth: state.auth,
  wishList: state.wishList,
});

export default connect(mapStateToProps, {
  addToCart,
  fetchCourses,
  addToWishList,
})(Landing);
