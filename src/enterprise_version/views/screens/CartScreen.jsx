import React, { useEffect, Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";
import PageHeader from "../components/PageHeader";
import CartDetail from "../components/CartDetail";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { removeFromCart, fetchCourses , 
 //getCart
} from "../../core/redux/actions/cart.action";


const CartScreen = ({
  auth: { isAuthenticated },
  cart: { cart, total },
  removeFromCart,
  fetchCourses
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
       // await fetchCourses();
  
      // const lastLocation = useLocation();
    })();
    // eslint-disable-next-line
  }, []);

  return (
    <>
      <NavBar />
      <PageHeader
        pageTitle="Shopping Cart"
        bgClass="courses-banner-bg"
        textPosition="text-start"
      />
      <CartDetail />

      <Footer />
    </>
  );
};

CartScreen.propTypes = {
  auth: PropTypes.object.isRequired,
  cart: PropTypes.object.isRequired,
  removeFromCart: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.cart,
  auth: state.auth,
  wishList: state.wishList,
    course: state.course,
});

export default connect(mapStateToProps, {
  removeFromCart,
  fetchCourses,

})(CartScreen);

