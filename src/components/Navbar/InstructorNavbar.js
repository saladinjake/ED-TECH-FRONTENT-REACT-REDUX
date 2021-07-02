import React, { Fragment, useRef , useEffect, useState} from "react";
import { Link } from "react-router-dom";
import "./navbar.scss";
// import questence from "assets/svgs/questence-logo.svg";
// import questence from "assets/pngs/blue-logo-coursera.jpg"
import questence from "assets/pngs/logoweb.png";
import { useHistory } from "react-router-dom";
import { ReactComponent as Dropdown } from "svgs/dropdown.svg";

import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logOut } from "actions/authActions";

import { CATEGORIES, PACES, FEES, INSTRUCTORLINKS, PROGRAM_LINK } from "./data";

import $ from "jquery"
import "./nav.css";
import { getCategories } from "services/category";
import toast from "react-hot-toast";

import "./injector.css";


import { useQuery } from "hooks/useQuery.js";
import AuthWindow from "./PopUpWindow"


const InstructorNavBar = ({
  auth: { isAuthenticated, user },
  logOut,
  cart: { cart },
}) => {
  const toogleBtn = useRef();
  const mobileNav = useRef();
  let  leftSide =``;
   let rightSide =``;



     const [categories,setInfo] = useState([]);
  

   useEffect(() => {
     (async function loadContent() {
       try {
         let res = await getCategories();
         
    
         setInfo([...res.data.data]);
         console.log(res)

        
       
       } catch (err) {
         toast.error("Error occured fetching notifications");
       }
       // setLoading(false);
     })();
     // eslint-disable-next-line
   }, []);

  const openNav = () => {
    toogleBtn.current.classList.toggle("mobActive");
    mobileNav.current.classList.toggle("mobactive");
  };


  useEffect(()=>{
    $('.me-checked').hover(function(){
       $(".authlinker").css({display:"block"})
    })
  })

  
  const handleKeyPress =(e) =>{
    if (e.key == "Enter") {
       handleSearch(e)
       e.target.style.display="none"
       document.getElementById("reset-btn").style.display="block"
    }

  
  }

  let history = useHistory();

  const handleLogout = async () => {
    await logOut();
     setTimeout(()=>{window.location.reload()},2000)
  };

  const handleReset = (e) =>{
    e.target.style.display="none"
    // document.getElementById("search-btn").style.display="block"

    if(document.getElementById("search-result")){
      let element = document.getElementById("search-result")
      element.style.display="none"
    }

    window.location.href=process.env.PUBLIC_URL+ "/courses"
    setTimeout(() =>{
      window.location.reload()
    },2000)

  }


  const handleSearch = (e) => {
    e.preventDefault();
    const searchVal = document.getElementById("search")?.value;
    if (searchVal.length > 0) {
      history.push(`/courses?method=name&search=${searchVal}&filter=course`);
      window.location.reload()
    }


    if(document.getElementById("search-result")){
      let element = document.getElementById("search-result")
      element.style.display="block"
    }


    if(document.getElementById("search-btn")){
       document.getElementById("search-btn").style.display="none"
       document.getElementById("reset-btn").style.display="block"

    }
    

  };


  return (
    <Fragment>
          <nav className="desktop" style={{ position: "fixed", zIndex:"99999999999999999999999999999999999999999" }}>
            <figure className="logo">
              <Link to="/">
                <img src={questence} alt="" width="171px" />
              </Link>
            </figure>

            <ul className="mainNav makeText" ref={mobileNav} style={{marginTop:"10px", fontFamily:"Open Sans"}}>
              <li className="NavHover">
                <div className="parent">
                  <span style={{ fontSize: "16px",fontFamily:"Open Sans" }}>Courses And Programs</span>
                  <Dropdown />
                </div>

                <ul className="ParentDropDown makeText" style={{fontFamily:"Open Sans",height:"35px"}}>
                  <li className="ParentDropDown__item" style={{fontFamily:"Open Sans"}}>
                    <Link
                      style={{ fontSize: "12px" }}
                      className="DropDown__link"
                      to={process.env.PUBLIC_URL + "/courses"}
                    >
                      All Courses
                    </Link>
                  </li>

                  {/*<li className="ParentDropDown__item" style={{ fontSize: "16px" }}>
                    <span style={{ fontSize: "16px" }}>By Category<i className="fa fa-caret-right" style={{float:"right",marginTop:"5px"}}></i></span>
                    <ul className="NavSubMenu makeText" style={{fontFamily:"Open Sans"}}>
                      {CATEGORIES.length > 0 &&
                        CATEGORIES.map((item, i) => {
                          return (
                            <li id={"item" + item.id} style={{fontFamily:"Open Sans"}}>
                              <Link
                                style={{ fontSize: "16px" }}
                                className="DropDown__link"
                                to={`${process.env.PUBLIC_URL}/courses/category/${item.id}`}
                              >
                                {item.name}
                              </Link>
                            </li>
                          );
                        })}
                    </ul>
                  </li>*/}


                  <li className="ParentDropDown__item " style={{ fontSize: "12px", height:"35px",fontFamily: "Open Sans"}}>
                    <span style={{ fontSize: "12px" }}>By Category<i className="fa fa-caret-right" style={{float:"right",marginTop:"5px"}}></i></span>
                    <ul className="NavSubMenu makeText" style={{fontFamily:"Open Sans", marginTop:"-80px",background:"#fafafa", color:"#000"}}>
                      {categories.length > 0 &&
                        categories.map((item, i) => {

                          return (

                            <Fragment>

        



                            <li onClick={()=>{
                              window.location.href=process.env.PUBLIC_URL+ `/courses/category/${item.id}`

                            }} className="dropdown  dropdown-cols-2" id={"item" + item.id} style={{fontFamily:"Open Sans",margin:"-5px",width:"260px",marginLeft:"10px",borderBottom:"none"}}>
                              <a
                                style={{ fontSize: "12px" ,color:"#000", fontFamily: "Open Sans"}}
                                className="DropDown__link "
                                data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"
                                href={`${process.env.PUBLIC_URL}/courses/category/${item.id}`}
                              >
                                {item.name}
                   
                              </a>

                              {item.subcategories.length > 0 && item.subcategories.map( (cat,i) =>{
                                             
                                              // if(i%2 ===0){
                                                 leftSide+= `<a style="background:#fafafa,font-size: 16px, font-family:'Open Sans'" href="#" >${cat.name}</a>
                                                              `
                                              // }else if(i%2 !==0){
                                                // rightSide+=`<li><a href={"${process.env.PUBLIC_URL}/courses/category/${cat.id}"}>${cat.name}</a></li>`
                                              // }

                                              return (



                                                        <div class="dropdown-menu" style={{background:"#fafafa",marginTop:"-60px"}}>
                                                          <div>
                                                            <h5>{item.name}</h5>
                                                            <ul style={{background:"#fafafa",fontFamily: "Open Sans"}} dangerouslySetInnerHTML={{__html: leftSide }}>
                                                             
                                                            </ul>
                                                          </div>
                                                          
                                                        </div>


                                                        )

                                            })}

                                    
                            </li>
</Fragment>


      
                          );
                        })}
                    </ul>
                  </li>


                  <li className="ParentDropDown__item" style={{fontFamily:"Open Sans", height:"35px"}}>
                    <span style={{ fontSize: "12px" }}>  By Program<i className="fa fa-caret-right" style={{float:"right",marginTop:"5px"}}></i></span>
                    <ul className="NavSubMenu makeText extends-3-cols" style={{fontFamily:"Open Sans", marginTop:"-80px",  background:"#fff",color:"#000"}}>
                       {
                        PROGRAM_LINK.length > 0 && PROGRAM_LINK.map(item =>{
                           return (
                              <a
                                style={{ fontSize: "12px", color:"#000" , fontFamily: "Open Sans"}}
                                className="DropDown__link "
                                data-toggle="dropdown" role="button" aria-haspopup="true" aria-expanded="false"
                                href={`${process.env.PUBLIC_URL}/institute/${item.id}`}
                              >
                                <img src={item?.logo} style={{width:"20px",height:"20px", borderRadius:"50px", margin:"10px"}} alt="image-not-given" /> {item.name}
                    {item.name}
                   
                              </a>

                    

                            )
                        })
                       }
                    </ul>
                  </li>

                  <li className="ParentDropDown__item" style={{fontFamily:"Open Sans", height:"35px"}}>
                    <Link
                      style={{ fontSize: "12px",fontFamily: "Open Sans" }}
                      className="DropDown__link"
                      to={process.env.PUBLIC_URL + "#"}
                    >
                      By Training Partner
                    </Link>
                  </li>

                  <li className="ParentDropDown__item" style={{ fontSize: "12px",height:"35px" }}>
                    <span style={{ fontSize: "12px", fontFamily: "Open Sans" }}>By Learning Style</span>
                    <ul className="NavSubMenu makeText" style={{fontFamily:"Open Sans"}}>
                      {PACES.length > 0 &&
                        PACES.map((item, i) => {
                          return (
                            <li>
                              <Link
                                style={{ fontSize: "16px",fontFamily: "Open Sans" }}
                                className="DropDown__link"
                                to={`${item.link}`}
                              >
                                {item.name}
                              </Link>
                            </li>
                          );
                        })}
                    </ul>
                  </li>
                </ul>
              </li>

              <li className="NavHover">
                <div className="parent">
                  <span style={{ fontSize: "16px",fontFamily:"Open Sans" }}> For Institutions</span>
                  <Dropdown />
                </div>
                <ul className="ParentDropDown makeText">
                  <li className="ParentDropDown__item" style={{height:"35px"}}>
                    <Link
                      style={{ fontSize: "12px" }}
                      className="DropDown__link"
                      to={process.env.PUBLIC_URL + "/schools"}
                    >
                      For Schools
                    </Link>
                  </li>
                  <li className="ParentDropDown__item" style={{ fontSize: "12px",height:"35px",fontFamily:"Open Sans" }}>
                    <Link
                      style={{ fontSize: "12px" }}
                      className="DropDown__link"
                      to={process.env.PUBLIC_URL + "/government"}
                    >
                      For Government
                    </Link>
                  </li>
                  <li className="ParentDropDown__item" style={{ fontSize: "12px",height:"35px",fontFamily:"Open Sans" }}>
                    <Link
                      style={{ fontSize: "12px" }}
                      className="DropDown__link"
                      to={process.env.PUBLIC_URL + "/business"}
                    >
                      For Businesses
                    </Link>
                  </li>
                </ul>
              </li>

              <li className="search__group" style={{ fontSize: "16px",fontFamily:"Open Sans" }}>
                <div className="search__form">
                  <input
                    className="zoomText serach"
                    onKeyPress={handleKeyPress}
                    type="text"
                    name="search"
                    id="search"
                    placeholder="Search For A Course"
                   style={{ fontSize: "16px",fontFamily: "Open Sans" }}
                  />
                  <a
                  href="#"
                    onClick={handleSearch}
                    type="button"
                    style={{color:"#fff",fontFamily: "Open Sans", fontSize: "16px",background:"rgb(2, 83, 200)",padding:"10px" }}
                    id="search-btn"
                  >
                    <b style={{textTransform: "capitalize", fontFamily: "Open Sans"}}>Search</b>
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M10.0057 8.80503H9.37336L9.14923 8.58891C9.93368 7.67639 10.4059 6.49171 10.4059 5.20297C10.4059 2.32933 8.07662 0 5.20297 0C2.32933 0 0 2.32933 0 5.20297C0 8.07662 2.32933 10.4059 5.20297 10.4059C6.49171 10.4059 7.67639 9.93368 8.58891 9.14923L8.80503 9.37336V10.0057L12.8073 14L14 12.8073L10.0057 8.80503ZM5.20297 8.80503C3.20983 8.80503 1.60091 7.19611 1.60091 5.20297C1.60091 3.20983 3.20983 1.60091 5.20297 1.60091C7.19611 1.60091 8.80503 3.20983 8.80503 5.20297C8.80503 7.19611 7.19611 8.80503 5.20297 8.80503Z"
                        fill="white"
                      />
                    </svg>
                  </a>


                  <a
                  href="#"
                    onClick={handleReset}
                    type="button"
                    style={{color:"#fff", display:"none", fontSize: "16px",background:"rgb(2, 83, 200)",padding:"10px", fontFamily: "Open Sans" }}
                    id="reset-btn"
                  >
                    <b style={{textTransform: "capitalize",marginRight:"5px", fontFamily: "Open Sans"}}>Reset</b>
                    <i className="fa fa-undo"></i>
                  </a>

                </div>
              </li>

              <li
                className="dropdown top-menu-item-xs"
                style={{ float: "left",fontFamily: "Open Sans" }}
              >
                <Link
                  alt="noimage"
                  to={process.env.PUBLIC_URL + "/cart"}
                  className=" waves-effect waves-light"
                  aria-expanded="true"
                >
                  <i
                    style={{ fontSize: "18px",fontFamily: "Open Sans" }}
                    className="md  md-add-shopping-cart "
                  ></i>{" "}
                  <span
                    className="badge badge-xs "
                    style={{
                      marginTop: "-25px",
                      color: cart?.length > 0 ? "red" : "#000",
                      background: cart?.length > 0 ? "#fff" : "#fff",
                    }}
                  >
                    {cart !== undefined && `(${cart?.length})`}
                  </span>
                </Link>
              </li>

              {!isAuthenticated ? (
                <Fragment>
                  <li className="" style={{ fontSize: "16px",fontFamily:"Open Sans" }}>
                    {/*<Link to="/login" className="auth outline">
                  Log In
                </Link>*/}
                
                    <a
                      style={{ fontSize: "16px",background:"#fff",color:"#000",borderRadius:"43px", fontFamily: "Open Sans" }}
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.href =
                          process.env.PUBLIC_URL + "/login";
                      }}
                      href="#"
                    
                      className="stm_lms_log_in waves-effect waves-light"
                      data-text="Log in"
                      data-target=".stm-lms-modal-login "
                      data-lms-modal="login"
                    >
                      {" "}
                      <i className="stmlms-user fa fa-user"></i>
                      

                      <span style={{ marginLeft: "10px",fontWeight:"bold",fontFamily: "Open Sans" }}>
                        <b>Log In</b>
                      </span>
                      
                    </a>
                    
                  </li>
                  <li style={{ fontSize: "16px",fontFamily:"Open Sans" }} >
                    <a
                      style={{
                        borderRadius: "43px",
                        fontSize: "16px",
                        height: "40px",
                        padding:"7px",
                        color:"#fff",
                        background:"rgb(2, 83, 200)",
                        fontFamily: "Open Sans"
                      }}
                      // className="btnMobileFull"
                      onClick={(e) => {
                        e.preventDefault();
                        window.location.href =
                          process.env.PUBLIC_URL + "/register";
                      }}
                      href="#"
                    >
                      <b>Sign Up</b>
                    </a>
                  </li>
                </Fragment>
              ) : (
                <Fragment>
                  <li className="DropDown" style={{ fontSize: "16px",fontFamily:"Open Sans" }}>
                    <input
                      type="checkbox"
                      className="DropDown__checkbox me-checked"
                      id="navi-toggle3"
                    />

                    <label
                      htmlFor="navi-toggle3"
                      className="DropDown__button useracount me-checked"
                    >
                      <figure>
                        {user.image_url ? (
                          <img src={user.image_url} alt="" width="20px" />
                        ) : (
                          <img
                            src="https://d30y9cdsu7xlg0.cloudfront.net/png/138926-200.png"
                            alt=""
                            width="20px"
                            className="me-checked"
                          />
                        )}
                      </figure>
                      {`${user?.first_name} ${user?.last_name}`}
                      <Dropdown />
                    </label>

                    <ul
                      className="DropDown__list userdropdown makeText"
                      style={{ marginLeft: "90px", fontFamily: "Open Sans" }}
                    >
                      {INSTRUCTORLINKS.length > 0 &&
                        INSTRUCTORLINKS.map((item, i) => {
                          return (
                            <li
                              className="DropDown__item"
                              style={{fontFamily: "Open Sans", height: "35px", marginTop: "2px",zIndex:"99999999999999999999999999999999999999999" }}
                            >
                              <Link
                                className="DropDown__link"
                                to={`${item.link}`}
                              >
                                {item.name}
                              </Link>
                            </li>
                          );
                        })}

                      <li
                        className="DropDown__item"
                        style={{ height: "30px", marginTop: "2px",fontFamily: "Open Sans" }}
                      >
                        <Link
                          className="DropDown__link"
                          to={process.env.PUBLIC_URL + "/cart"}
                        >
                          Cart {cart !== undefined && `(${cart?.length})`}
                        </Link>
                      </li>

                      <li
                        className="DropDown__item"
                        style={{ height: "30px", marginTop: "2px",fontFamily: "Open Sans"}}
                      >
                        <Link className="DropDown__link" onClick={handleLogout}>
                          Logout
                        </Link>
                      </li>
                    </ul>
                  </li>
                </Fragment>
              )}
            </ul>

            <button ref={toogleBtn} onClick={openNav} className="nav-icon">
              <div className="bar1"></div>
              <div className="bar2"></div>
              <div className="bar3"></div>
            </button>
          </nav>
          <br />
        </Fragment>
  );
};

InstructorNavBar.propTypes = {
  auth: PropTypes.object.isRequired,
  logOut: PropTypes.func.isRequired,
  cart: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.cart,
  auth: state.auth,
});

export default connect(mapStateToProps, { logOut })(InstructorNavBar);
