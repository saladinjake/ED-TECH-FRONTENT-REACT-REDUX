import React, { useEffect, Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import WishListDetail from "../components/WishlistDetail";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { removeFromCart, fetchCourses , 
 //getCart
} from "../../core/redux/actions/cart.action";
import { getWishlist, deleteWishlist, addToWishlist} from "../../api/wishlist.services"


const WishListScreen = ({
  auth: { isAuthenticated },
//  cart: { cart, total },
 // removeFromCart,
  //fetchCourses
}) => {
    //api cart not implemented. assumes a run time event when 
  //user might not actually proceed to buy the course
  //no need to add to database
  let history = useHistory(); 

   useEffect(() => {
    (async function loadContent() {
       if (!isAuthenticated) {
         history.push("/login", { from: history.location.pathname });
       }
     
    })();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <NavBar />
      <PageHeader
        pageTitle="WishList"
        bgClass="courses-banner-bg"
        textPosition="text-start"
      />
      <WishListDetail />

      <Footer />
    </>
  );
};

WishListScreen.propTypes = {
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
 
  auth: state.auth,

    course: state.course,
});

export default connect(mapStateToProps, {


})(WishListScreen);

