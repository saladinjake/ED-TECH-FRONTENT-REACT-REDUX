import React, { Fragment, useRef } from "react";





import { Link } from "react-router-dom";

// import questence from "assets/svgs/questence-logo.svg";
import { useHistory } from "react-router-dom";
// import { ReactComponent as Dropdown } from "svgs/dropdown.svg";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logOut } from "actions/authActions";

import { CATEGORIES,  AUTHLINKS } from "./data";

import { uuid } from "services/dashboard";




 
 //        </ul>

 //        <button ref={toogleBtn} onClick={openNav} className="nav-icon">
 //          <div className="bar1"></div>
 //          <div className="bar2"></div>
 //          <div className="bar3"></div>
 //        </button>





 const NewHeader = ({
  cart: { cart },
  auth: { isAuthenticated, user },
  logOut,
}) =>{


	 // const toogleBtn = useRef();
  const mobileNav = useRef();

  // const openNav = () => {
  //   toogleBtn.current.classList.toggle("mobActive");
  //   mobileNav.current.classList.toggle("mobactive");
  // };

  let history = useHistory();

  const handleLogout = async () => {
    await logOut();
    history.push("/login");
  };

  

  const handleSearch = (e) => {
    e.preventDefault();
    const searchVal = document.getElementById("search")?.value;
    if (searchVal.length > 0) {
      history.push(`/courses?method=name&search=${searchVal}&filter=course`);
    }
  };


	return(<div className="topbar" >




             
                <div className="topbar-left" >
                                    <div className="text-center">
                                        {/*<a alt="noimage" href="/" className="logo"><i className="icon-magnet icon-c-logo"></i><span>Quest<i className="md md-album"></i>tense</span></a>
                                        */}
                                        <a alt="noimage" href="index.html" className="logo">
                                            <i className="icon-c-logo"> <img alt="noimage" src="assets/images/commute-logo.png" height="42" /> </i>
                                            <span><img alt="noimage" src="{questence}" height="20" /></span>
                                        </a>
                                        <div className="pull-left">
                                                <button className="button-menu-mobile open-left waves-effect waves-light">
                                                    <i className="md md-menu"></i>
                                                </button>
                                                <span className="clearfix"></span>
                                            </div>
                                    </div>
                  </div>
                
                                
                              <div className="navbar navbar-default" role="navigation" >
                                    <div className="container">
                                        <div className="" style={{marginLeft:"-990px"}}>
                                            
                
                                            
                
                                            <form role="search" className="navbar-left app-search pull-left hidden-xs">
                                           <input type="text"
                name="search"
                id="search"
                placeholder="Search for a course" className="form-control" />
                                           <a alt="noimage" href="#" onClick={handleSearch} ><i className="fa fa-search"></i></a>
                                      </form>
                
                  
                                            <ul className="nav navbar-right pull-right" style={{marginTop: "-7px",marginRight:"-990px"}} ref={mobileNav}>
                                                 <li> <Link
                                                               className="DropDown__link"
                                                               to={process.env.PUBLIC_URL + "/courses"}
                                                               >
                                                               All Courses
                                                          </Link></li>


                                                <li className="dropdown top-menu-item-xs" style={{float:"left"}}>
                                                    <a alt="noimage" href="#" className="dropdown-toggle waves-effect waves-light" data-toggle="dropdown" aria-expanded="true">Categories </a>
                                                    <ul className="dropdown-menu">
                                                   
                                                        {CATEGORIES.length > 0 &&
										                    CATEGORIES.map((item, i) => {
										                      return (
										                        <li>
										                          <Link
                                              key={uuid()}
										                            className="text-custom"
										                            to={`${process.env.PUBLIC_URL}/courses/category/${item.id}`}
										                          >
										                            {item.name}
										                          </Link>
										                        </li>
										                      );
										                    })}
                                                        
                                                    </ul>
                                                </li>



                                                <li className="dropdown top-menu-item-xs" style={{float:"left"}}>
                                                    <a alt="noimage" href="#" className="dropdown-toggle waves-effect waves-light" data-toggle="dropdown" aria-expanded="true">For Institutions</a>
                                                    <ul className="dropdown-menu">
                                                   
                                                         <li className="ParentDropDown__item">
												                <Link
												                  className="DropDown__link"
												                  to={process.env.PUBLIC_URL + "/schools"}
												                >
												                  For Schools
												                </Link>
												              </li>
												              <li className="ParentDropDown__item">
												                <Link
												                  className="DropDown__link"
												                  to={process.env.PUBLIC_URL + "/government"}
												                >
												                  For Government
												                </Link>
												              </li>
												              <li className="ParentDropDown__item">
												                <Link
												                  className="DropDown__link"
												                  to={process.env.PUBLIC_URL + "/business"}
												                >
												                  For Businesses
												                </Link>
												              </li>
                                                        
                                                    </ul>
                                                </li>




                                                {!isAuthenticated ? (
            <Fragment>
              <li>
                <Link to="/login" className="auth outline">
                  Log In
                </Link>
              </li>
              <li>
                <button
                  className="btnMobileFull"
                  onClick={() => history.push("register")}
                >
                  Sign Up
                </button>
              </li>
            </Fragment>
          ) : (
            <Fragment>
             

                <li className="hidden-xs">
                   <a alt="noimage" href="#" className="right-bar-toggle waves-effect waves-light">{`${user?.first_name} ${user?.last_name}` }</a>
                </li>
                 <li className="dropdown top-menu-item-xs" style={{float:"left"}}>
                  <a alt="noimage" href="" className="dropdown-toggle profile waves-effect waves-light" data-toggle="dropdown" aria-expanded="true">

                   <img alt="noimage"  src={ process.env.PUBLIC_URL + "/assets/images/questone.jpg" } alt="user-img" className="img-circle" /> </a>
                                                    

              <ul className="dropdown-menu">
                  {AUTHLINKS.length > 0 &&
                    AUTHLINKS.map((item, i) => {
                      return (
                        


                       
                         <li><Link className="DropDown__link" to={`${item.link}`}   key={uuid()}>
                            {item.name}
                          </Link></li>
                                                        
                                                        
                                                   
                      );
                    })}
                      <li> <Link to="#" className="ti-power-off m-r-10 text-danger" onClick={handleLogout}>
                      Logout
                    </Link></li>
                     </ul>
                                                </li>


                    <li className="dropdown top-menu-item-xs" style={{float:"left"}}>
                                                    <a alt="noimage" href="#" data-target="#" className="dropdown-toggle waves-effect waves-light" data-toggle="dropdown" aria-expanded="true">
                                                        <i className="fa fa-shopping-cart"></i> <span className="badge badge-xs badge-danger">{cart !== undefined && `(${cart?.length})`}</span>
                                                    </a>
                                                    <ul className="dropdown-menu dropdown-menu-lg">
                                                        <li className="notifi-title"><span className="label label-default pull-right"></span>My Cart {cart !== undefined && `(${cart?.length})`}</li>
                                                        <div className="slimScrollDiv" style={{ position: "relative", overflow: "hidden", width: "auto", height: "230px"}}>
                                                        <li className="list-group slimscroll-noti notification-list" style={{overflow: "hidden", width: "auto", height: "230px"}}>
                                                           


                                                           {cart.length > 0 &&
											                    cart.map((item, i) => {
											                      return (
											                        

											                        <a alt="noimage" href="#" className="list-group-item">
											                                                              <div className="media">
											                                                                 <div className="pull-left p-r-10">
											                                                                    <em className="fa fa-diamond noti-primary"></em>
											                                                                 </div>
											                                                                 <div className="media-body">
											                                                                    <h5 className="media-heading">A new order has been placed A new order has been placed</h5>
											                                                                    <p className="m-0">
											                                                                        <small>There are new settings available</small>
											                                                                    </p>
											                                                                 </div>
											                                                              </div>
											                                                           </a>
											                      );
											                    })}
                                                           
                
                                                        
                                                           
                
                                                           
                                                           
                                                        </li><div className="slimScrollBar" style={{ background: "rgb(152, 166, 173)", width: "5px", position: "absolute" ,top: "0px", opacity: "0.4", display: "none", borderRadius: "7px", zIndex: "99", right: "1px"}}></div>
                                                        <div className="slimScrollRail scrollInsector" ></div></div>
                                                        <li>
                                                            <a alt="noimage" href="#" className="list-group-item text-right">
                                                                <small className="font-600">Checkout</small>
                                                            </a>
                                                        </li>
                                                    </ul>
                                                </li>

                 

                
            </Fragment>
          )}

                                               
        

       

         
                
                
                                                
                
                                                
                                            </ul>{/**/}
                                        </div>
                                        
                                    </div>
                                </div>
            </div>)
}





NewHeader.propTypes = {
  auth: PropTypes.object.isRequired,
  logOut: PropTypes.func.isRequired,
  cart: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.cart,
  auth: state.auth,
});

export default connect(mapStateToProps, { logOut })(NewHeader);