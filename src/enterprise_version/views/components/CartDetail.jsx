import React, { useEffect, Fragment, useState } from "react";

import { Nav, Tab,Button } from "react-bootstrap";
import TextCard from "./TextCard";
import InstructorCard from "./InstructorCard";

import { DecryptCart, EncryptCart} from "../../api/encrypter"
import { useHistory, withRouter } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { removeFromCart, fetchCourses,
// getCart 
} from "../../core/redux/actions/cart.action";


import { enrollCourses, enrollCourseInLMS } from "../../api/enrollment.services";
import toast from "react-hot-toast";
import { clearCart } from "../../core/redux/actions/cart.action";

// import { PaystackButton } from "react-paystack"; //does not allow custom js script on click
import { generateString } from "../../core/helpers/random";
import { usePaystackPayment } from 'react-paystack';

import { getAuthProfile } from "../../api/learner.services";

import Loader from "./Loader";

 const cartReset =() =>{
  const flatcart =[]
   localStorage.setItem(
        "giffy_image_*",
        EncryptCart(JSON.stringify(flatcart))
      );
 }











/*enroll handler for only free courses in cart*/
  const allfreeEnrollments = async (cart,user) =>{
  /*write something awesome*/
  // alert("osho free master. you no go buy one course at all!! Nawa u")

  let lms_id = user?.lms_id || "";
  let lms_token_key = user?.lms_token_key || "";
   if(cart.length> 0){
      const freeCourses = cart.filter(course=>{
        return course.price <= 0
      })
    
    if (freeCourses.length > 0) {
      let payload = [];

      console.log(freeCourses)

      //check for free
      freeCourses.forEach((item) => {
        let newObj = {};
        newObj.user_id = user.id;
        newObj.course_id = item.id;
        payload.push(newObj);

        // console.log(item)
      });
      //enroll free courses
      try {
        /// in php api enrollment
        await enrollCourses({
          enrollments: payload,
        });

        //in django api lms 




        freeCourses.forEach(async (item) => {
            await enrollCourseInLMS({
              overall_score	:0,
              course_is_complete	:false,
              start_date:	item.start_date,
              end_date: item.end_date	,
              user:	 user?.lms_id,
              course: item.lms_course_id,
              completed_section	:[
              ],
              completed_subsection:	[
              ],
              completed_lesson:	[
              ]  
            })
         });

        



        toast.success(`Courses enrolled succesfully`);
        clearCart();
        if (user.roles[0].name === "Instructor") {
          window.location.href=process.env.PUBLIC_URL+ "/instructor/dashboard";
        } else {
          window.location.href=process.env.PUBLIC_URL+"/mycourses";
        }
      } catch (err) {
         clearCart();
         cartReset()
        toast.error(
          err?.response?.data?.message ||
            `Error occured enrolling you for this Course`
        );
      }
    }

  }

}





 const PreCheckForPaymentAllowed = ({cart,user,
  totalAmount, config, onSuccessPaystack, 
  onClosePaystack, freeEnrollment,
  history
}) => {
     
      const initializePayment = usePaystackPayment(config);

      if(totalAmount > 0){
       return (
        <div>
            <button class="bg-teal" onClick={(e) => {
               e.preventDefault()
                initializePayment(onSuccessPaystack, onClosePaystack)
            }}>Paystack Payments NGN {totalAmount}</button>
        </div>
      )

    }else{ return (
         <div>
            <button class="bg-teal" onClick={(e) => {
                e.preventDefault()
                allfreeEnrollments(cart,user)
            }}>Enroll for free</button>
        </div>

      )

    }
  };








  /*core component*/

const CartDetail  = ({
  auth: { user, isAuthenticated, user_roles },
  clearCart,
  cart: { cart, total },
  removeFromCart,
  fetchCourses,
 
  
}) => {

 

    let lms_id = user?.lms_id || "";
    let lms_token_key = user?.lms_token_key || "";

  const [config, setConfig] = useState({});
  let history = useHistory();
  const [loading, setLoading] = useState(false);
  const [loggedInUser,setLoggedInUser] = useState({...user})

  const getTotalFromDecryptedCart = (cart) =>{
    if(cart.length> 0){

    let totalPrice = cart.reduce(function (accumulator, item) {
       return accumulator + item.price;
      }, 0);
    return {

      price: totalPrice
    }
   }  else{
    return 0
   }
  }

  const filterOutAlreadyEnrolledCourses = async () =>{
   /*this is a temporary fix of the bug*/
   //this takes state into considerationwith redux
   

//just do localstorage with encrypted store
    if(localStorage.getItem("giffy_image_*")) {
      cart =JSON.parse( 
          DecryptCart(localStorage.getItem("giffy_image_*"))
          );
    }else{
      cartReset() //reset localstore encrypted cart
    }

   //bring back the cart to plain array data
    const shoppingCart = cart.length> 0? cart: 
         JSON.parse( 
          DecryptCart(localStorage.getItem("giffy_image_*"))
    );
    //mycart
    cart =shoppingCart

    let res = await getAuthProfile(); // faster experience for an expensive request
    let enrolledCourses = res.data.data;
    let courseEnrolledIds = enrolledCourses.map((course) => course.course.id);
    const cleanedUpCart = cart.flat().filter(coursePackage => !courseEnrolledIds.includes(coursePackage.id));
   console.log(cleanedUpCart)
   return cleanedUpCart
 }


  //alert(total.price)


    useEffect(() => {
    (async function loadContent() {
       if (!isAuthenticated) {
         history.push("/login", { from: history.location.pathname });
       }
      cart = await filterOutAlreadyEnrolledCourses() 
    })();
    // eslint-disable-next-line
  }, []);


   

  useEffect(() => {
    if (!isAuthenticated) {
      history.push("/login", { from: history.location.pathname });
    }
    // eslint-disable-next-line
  }, []);

  
 



 const checkIfUserAlreadyEnrolledForThisCourse = async (searchId, courseName) => {
    let res = await getAuthProfile(); // faster experience for an expensive request
    let enrolledCourses = res.data.data;
    const checkCourseStatus = (courseEnrolledIds,searchId) => {
      let check = false;
      if (enrolledCourses.length > 0) {
        check = enrolledCourses.includes(searchId);
        toast.error("You have enrolled for the course: "+ courseName + " Please remove from cart and try again.")
      }
      return check;
    };
    let preventDoubleSpending = false;
    let courseEnrolledIds = enrolledCourses.map((course) => course.course.id);
    preventDoubleSpending = checkCourseStatus(courseEnrolledIds,searchId)
    return preventDoubleSpending;
 }




  
/*enroll user who registers for free and paid courses*/
  const enrollStudentToPaidCourses = async () => {
    setLoading(true);
     //cart is already available in redux state
      cart = cart.length> 0? cart: 
         JSON.parse( 
          DecryptCart(localStorage.getItem("giffy_image_*"))
          )
    if(cart.length> 0){
      const freeCourses = cart.filter(course=>{
        return course.price <= 0
      })
      const  paidCourses = cart.filter(course=>{
        return course.price > 0
      })
    if (freeCourses.length > 0) {
      let payload = [];

      //check for free and enroll them silently
      freeCourses.forEach((item) => {
        let newObj = {};
        newObj.user_id = user.id;
        newObj.course_id = item.id;
        payload.push(newObj);

        // console.log(item)
      });
      //enroll free courses
      try {
        await enrollCourses({
          enrollments: payload,
        });



       
      } catch (err) {
        toast.error(
          err?.response?.data?.message ||
            `You have previously enrolled for this course.`
        );
      }
    }



//enroll paid course due to reasons where paystack dont allow 
    //live payment of 0.00 naira
  
    if (paidCourses.length > 0) {
      let payload = [];

      //check paid courses and enrol them verbosely
      paidCourses.forEach((item) => {
        let newObj = {};
        newObj.user_id = user.id;
        newObj.course_id = item.id;
        payload.push(newObj);

        // console.log(item)
      });
      //enroll paid courses


      try {
        await enrollCourses({
          enrollments: payload,
        });



        paidCourses.forEach(async (item) => {
            await enrollCourseInLMS({
              overall_score	:0,
              course_is_complete	:false,
              start_date:	item.start_date,
              end_date: item.end_date	,
              user:	 	 user?.lms_id,
              course: item.lms_course_id,
              completed_section	:[
              ],
              completed_subsection:	[
              ],
              completed_lesson:	[
              ]  
            })
        });
        toast.success(`Courses enrolled succesfully`);
        
      } catch (err) {
        toast.error(
          err?.response?.data?.message ||
            `Error occured enrolling you for this Course`
        );
      }
    }


    try{
      clearCart();

      if (user_roles[0].name === "Instructor") {
          history.push("/instructor/dashboard");
        } else {
          history.push("/mycourses");
        }
    }catch(err){
      

      toast.error(
          err?.response?.data?.message ||
            `Error occured enrolling you for this Course`
        );
        
    }
    setLoading(false);

   }
  };


  

  const handlePaystackSuccessAction = (reference) => {
    toast.success(`Payment succesfully completed`);
    enrollStudentToPaidCourses();
    // console.log(reference);
  };

  const handlePaystackCloseAction = () => {
    toast.success(`Payment Closed`);
  };

  /*payment hooks for paystack*/
  const onSuccess = (reference) => handlePaystackSuccessAction(reference);
  const onClose = () => handlePaystackCloseAction();

  useEffect(() => {
    let IDs = [];
    cart.length > 0 &&
      cart.forEach((item) => {
        IDs.push(item.id);
      });

    setConfig({
      publicKey: "pk_live_8bda1438b3a12a521e690adcd27d99b1224b72c9", //"pk_test_5dca9a796da0a59391c7f15c6cdc0275db4c8093",
      reference: (new Date()).getTime().toString(),
      email: user?.email,
      amount: total.price * 100,
      
      metadata: {
        custom_fields: [
          {
            display_name: "Payment ID",
            variable_name: "payment_id",
            value: generateString(),
          },
          {
            display_name: "User ID",
            variable_name: "user_id",
            value: user?.id,
          },
          {
            display_name: "Course Ids",
            variable_name: "courseIds",
            value: IDs.join(","),
          },
        ],
      },
      text: `Pay NGN${total.price} with Paystack`,
    });
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
  //no need to add to database

  const [activeKey, setActiveKey] = useState("home");

 





  const removeItemFromCart = async (id) => {
    console.log("func recived", id);
    await removeFromCart(id);
  };
 

   total = getTotalFromDecryptedCart(cart);
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
            {cart.length > 0 ? (
              <Fragment>
                {cart.map((data, i) => {
                  console.log(data)
                  return (
                    <article class="col-md-12 boxedshadow">
                      <header className="">
                       
                          <img
                            src={
                              data.course_thumbnail
                            }
                            alt=""
                            style={{height:"100px"}}
                             className="boxedshadow"
                          />
                          <br/><br/>
                          <h3 >
                            {data.course_name}
                          </h3>
                      
                      </header>

                      <div class="content">
                        <button
                          className="btn btn-danger pull-right"
                          onClick={removeItemFromCart.bind(this, data.id)}
                          
                        >
                          remove item
                          <i className="fa fa-trash"></i>
                        </button>
                        

                        
                      </div>
                      <br/>
                      <footer class="content">
                        <h2 class="full-price">N{data.price}</h2>

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
                  <span className="subtotal">No items in cart</span>
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
              <div className="text-center p-3">Cart Summary</div>
              <div className=" border-bottom"></div>
              <div className="row px-3 py-2">
                <div className="col">Total</div>
                <div class="col text-end">N{total.price}</div>
              </div>


            </div>
            <><br/>

             {cart.length > 0 ? (
                <>
                   {cart.length > 0 && (
                  <Fragment>
                    {loading ? (
                      <Button
                        className="mt-4"
                        variant="success"
                        style={{ height: "50px" }}
                      >
                        <div className="spinner-border" role="status">
                          <span className="sr-only">Loading...</span>
                        </div>
                      </Button>
                    ) : (

                      <PreCheckForPaymentAllowed
                       config={config}
                       user={loggedInUser}
                       cart={cart} 
                       totalAmount={total.price} 
                       onSuccess={onSuccess}
                       onClose={onClose}
                       freeEnrollment={allfreeEnrollments}
                    
                      />
                      
                    )}
                  </Fragment>
                )}
                </>
            ) : (
              <button
                type="button"
                onClick={() => history.push("/courses")}
                className="btn btn-primary bg-teal"
              >
                Browse a course
              </button>
            )}
            </>
          </div>
        </div>
      </div>
    </>
  );
};

CartDetail.propTypes = {
  auth: PropTypes.object.isRequired,
  cart: PropTypes.object.isRequired,
  removeFromCart: PropTypes.func.isRequired,
   clearCart: PropTypes.func.isRequired,
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
  clearCart 

})(CartDetail);
