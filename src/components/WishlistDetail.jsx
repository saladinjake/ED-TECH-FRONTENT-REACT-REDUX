import React, { useEffect, Fragment, useState } from "react";

import { Nav, Tab,Button } from "react-bootstrap";
import TextCard from "./TextCard";
import InstructorCard from "./InstructorCard";

import { DecryptCart, EncryptCart} from "../api/encrypter"
import { useHistory, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { removeFromCart, fetchCourses,
// getCart 
} from "../redux/actions/cart.action";


import { enrollCourses } from "../api/enrollment.services";
import toast from "react-hot-toast";
import Loader from "../components/Loader";

// import { PaystackButton } from "react-paystack"; //does not allow custom js script on click
import { generateString } from "../helpers/random";
import { usePaystackPayment } from 'react-paystack';



import {getWishlist,deleteWishlist,addToWishlist} from "../api/wishlist.services"




  /*core component*/

const WishListDetail  = ({
  auth: { user, isAuthenticated, user_roles },
  //clearCart,
  // cart: { cart, total },
  // removeFromCart,
  // fetchCourses,
  
}) => {

  const [config, setConfig] = useState({});
  let history = useHistory();
  const [loading, setLoading] = useState(false);
  const [loggedInUser,setLoggedInUser] = useState({...user})
  const [total,setTotal] = useState({})

  const [cartWish, setWishList] = useState([])

  const getTotalFromWishList = (cartWish) =>{
    if(cartWish.length> 0){

    let totalPrice = cartWish.reduce(function (accumulator, item) {
       return accumulator + item.course.price;
      }, 0);
    return {

      price: totalPrice
    }
   }  else{
    return 0
   }
  }

  let totalVal = 0

  useEffect(() => {
 
    
     (async function loadContent() {
       if (!isAuthenticated) {
         history.push("/login", { from: history.location.pathname });
       }
        setLoading(true)

       try{
           const res = await getWishlist()
    
        setWishList([...res.data.data.data])
       }catch(err){
          toast.error("Some error occured wile fetching data")
       }
       setLoading(false)
    


        
  
      // const lastLocation = useLocation();
    })();
    // eslint-disable-next-line

  }, []);


   function removeTags(str) {
    if(str.match(/(<([^>]+)>)/ig))
      return str.replace( /(<([^>]+)>)/ig, '');
    else 
      return str
 }

  //api cart not implemented. assumes a run time event when 
  //user might not actually proceed to buy the course
  //no need to add to data.coursebase

  const [activeKey, setActiveKey] = useState("home");

 


  useEffect(() => {
    (async function loadContent() {
       if (!isAuthenticated) {
         history.push("/login", { from: history.location.pathname });
       }
//        await fetchCourses() // get all courses

      // const lastLocation = useLocation();
    })();
    // eslint-disable-next-line
  }, []);


  const removeItemFromWishList = async (data) => {
       
    try{
        await deleteWishlist(data);
         toast.success(
         
            `Wishlist was successfully deleted `
        );
    }catch (err) {
       //production error msg
        // toast.error(
         
        //     `Wish list could not be deleted`
        // );
        

        //dev error msg
        toast.error(
          err?.response?.data?.message ||
           `Wish list could not be deleted`
        );
    }

    //window.location.reload()
  };


  const handleAddToCart = () => {

  }

  totalVal = getTotalFromWishList(cartWish);
  

  return (
    <>
      <div className="container">
        <div className="row mb-3">
          <div className="col-md-8">
            <div className="mt-n-0-9 col-md-11 bg-teal pills-link col-md-10 px-4 py-2 bottom-left-radius-15 bottom-right-radius-15">
              <div className="row">
                <div className="col-8 col-sm-6">Course Details</div>
                <div className="col-4 col-sm-6 text-end">Price</div>
              </div>
            </div>
            <div className="row">
              <div className="col-md-11 border-radius-10 border shadow-sm mx-1 my-3 height-419px overflow-auto">
                <div class="container">
          <section id="cart">
            <br />
            <br />
            {cartWish.length > 0 ? (
              <Fragment>
                {cartWish.map((data, i) => {
                  console.log(data.course)
                  return (
                    <article class="col-md-12 boxedshadow">
                      <header className="">
                        
                          <img
                            src={
                              data.course.course_thumbnail
                            }
                            alt=""
                            style={{height:"100px"}}
                            className="boxedshadow"
                          />
                          <br/><br/>
                          <h3 >
                            {data.course.course_name}
                          </h3>
                    
                      </header>

                      <div class="content">
                        <button
                          className="btn btn-danger pull-right"
                          onClick={() => {
                            alert(data.course.id)
                            removeItemFromWishList( parseInt(data.course.id))
                          }}
                          
                        >
                          remove item
                          <i className="fa fa-trash"></i>
                        </button>
                        

                        
                      </div>
                       <br/>
                      <footer class="content">

                        <h2 class="full-price">N{data.course.price}</h2>

                        <h2 class="price"></h2>
                      </footer>
                      <hr/>
                    </article>
                  );
                })}
              </Fragment>
            ) : (
              <tr>

                {loading==true ? (<Loader width="100"/>):(<td className="product-subtotal">
                  <span className="subtotal">No items in wishlist</span>
                </td>)}
                
              </tr>
            )}
          </section>
        </div>


              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="bg-teal mt-5 border-radius-10">
              <div className="text-center p-3">Wishlist Summary</div>
              <div className=" border-bottom"></div>
              <div className="row px-3 py-2">
                <div className="col">Total</div>
                <div class="col text-end">N{totalVal.price}</div>
              </div>


            </div>
            <><br/>

             
              <button
                type="button"
                onClick={() => history.push("/cart")}
                className="btn btn-primary bg-teal"
              >
                Proceed to cart
              </button>
         
            </>
          </div>
        </div>
      </div>
    </>
  );
};

WishListDetail.propTypes = {
  auth: PropTypes.object.isRequired,
 // cart: PropTypes.object.isRequired,
 // removeFromCart: PropTypes.func.isRequired,
 //  clearCart: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
 // cart: state.cart,
  auth: state.auth,
 // wishList: state.wishList,
 //   course: state.course,
});

export default connect(mapStateToProps, {
 // removeFromCart,
 // fetchCourses,
  //clearCart 

})(WishListDetail);
