import React, { Fragment, useRef, useState, useEffect } from "react";
import { Link } from "react-router-dom";

import { useHistory } from "react-router-dom";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import { logOut } from "../../redux/actions/auth.action";
import { 
  CATEGORIES,
 PACES, AUTHLINKS,
  PROGRAM_LINK 
} from "./data";
import { 
  getCategories
} from "../../api/enrollment_services/category.services";
import toast from "react-hot-toast";
import { useQuery } from "../../helpers/hooks/useQuery.js";
import AuthWindow from "./modules/authentication";
import $ from "jquery";


import {
  Navbar,
  Container,
  Nav,
  NavDropdown,
  Row,
  Col,
  Form,
  FormControl,
  Button,
} from "react-bootstrap";


/*usage splitArrayIntoChunksOfLen(["list item",....],4);*/
function splitArrayIntoChunksOfLen(arr, len) {
  var chunks = [], i = 0, n = arr.length;
  while (i < n) {
    chunks.push(arr.slice(i, i += len));
  }
  return chunks;
}


const NavBar = ({
  cart: { cart },
  auth: { token, isAuthenticated, user, user_roles },
  logOut,
  hambuggerComponent,
}) => {
  //mine
  const toogleBtn = useRef();
  const mobileNav = useRef();

  const [queryVal, setQueryVal] = useState("");
  const query = useQuery();
  let routeQuery = query.get("filter");

  const [querySearchVal, setVal] = useState(query.get("search"));
  const [querySearchMethod, setMethod] = useState(query.get("method"));

  const [categories, setInfo] = useState([]);
  const [threeparts, setThreeParts] = useState([])

  const [showLogin, SetLogin] = useState(false);
  const [showSignup, setSignUp] = useState(false);
   let firstgroup= [];let secondgroup =[]; let thirdgroup = [];


  //yours not mine
  const [firstShow, setFirstShow] = useState();
  const [secondShow, setSecondShow] = useState();
  const [thirdShow, setThirdShow] = useState();
  const [fourthShow, setFourthShow] = useState();
   const TotalPrograms = PROGRAM_LINK.length;
   const setDivision =  parseInt(TotalPrograms/2)
  
  const FirstHalf = [...PROGRAM_LINK.slice(0,setDivision)];
  const  SecondHalf =[...PROGRAM_LINK.slice(setDivision,TotalPrograms)];

  console.log(FirstHalf,SecondHalf)



  let leftSide = ``;
  let rightSide = ``;


  let history = useHistory();

  const handleLogout = async () => {
    await logOut();
    // history.push("/");
    // window.location.href=process.env.PUBLIC_URL+ "/"
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  const handleReset = (e) => {
    e.target.style.display = "none";
    // document.getElementById("search-btn").style.display="block"

    if (document.getElementById("search-result")) {
      let element = document.getElementById("search-result");
      element.style.display = "none";
    }

    window.location.href = process.env.PUBLIC_URL + "/courses";
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  const handleKeyPress = (e) => {
    if (e.key == "Enter") {
      handleSearch(e);
      e.target.style.display = "none";
      document.getElementById("reset-btn").style.display = "block";
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    const searchVal = document.getElementById("search")?.value;
    if (searchVal.length > 0) {
      history.push(`/courses?method=name&search=${searchVal}&filter=course`);
      window.location.reload();
    }

    if (document.getElementById("search-result")) {
      let element = document.getElementById("search-result");
      element.style.display = "block";
    }

    if (document.getElementById("search-btn")) {
      document.getElementById("search-btn").style.display = "none";
      document.getElementById("reset-btn").style.display = "block";
    }
  };


   useEffect(() => {
    (async function loadContent() {
      try {
        let res = await getCategories();

        console.log([...res.data.data])

        setInfo([...res.data.data]);
         const temCategories = splitArrayIntoChunksOfLen(categories,4)


        
 
       if(temCategories.length>=3){
        thirdgroup = temCategories[2];
        secondgroup = temCategories[1];
        firstgroup = temCategories[0]
       }else if(temCategories.length ==2){
          secondgroup = temCategories[1];
        firstgroup = temCategories[0]
       }else{

        firstgroup = temCategories[0]
       }
         
         setThreeParts([...temCategories])
      } catch (err) {
        toast.error("Error occured fetching notifications");
      }
      // setLoading(false);
    })();




    $(document).ready(function () {
   

      $(".modal-link3").click(function (e) {
        e.preventDefault();

        $(".overlay3").addClass("modal-window").css({ display: "block" });
        $(".overlay2").hide().fadeOut("fast");
        $(".overlay").hide().fadeOut("fast");
      });

      $(".modal-link2").click(function (e) {
        e.preventDefault();

        $(".overlay2").addClass("modal-window").css({ display: "block" });

        $(".overlay").hide().fadeOut("fast");
        $(".overlay3").fadeOut("slow");
      });

      $(".modal-link").click(function (e) {
        e.preventDefault();

        $(".overlay").addClass("modal-window").css({ display: "block" });

        $(".overlay2").hide().fadeOut("fast");

        $(".overlay3").fadeOut("slow");
      });

      $(".overlay__close2").click(function (e) {
        e.preventDefault();
        $(".overlay2").hide().fadeOut("fast");
        $(".overlay").hide().fadeOut("fast");
        $(".overlay3").fadeOut("slow");
      });

      $(".overlay__close").click(function (e) {
        e.preventDefault();
        $(".overlay2").hide().fadeOut("slow");
        $(".overlay").fadeOut("slow");
        $(".overlay3").hide().fadeOut("slow");
      });

      $(".overlay__close3").click(function (e) {
        e.preventDefault();
        $(".overlay2").hide().fadeOut("slow");
        $(".overlay").hide().fadeOut("slow");
        $(".overlay3").fadeOut("slow");
      });
    });
    // eslint-disable-next-line
  }, []);



  return (
    <>
      <header className="py-3 border-bottom d-md-none shadow-sm">
        <Navbar collapseOnSelect expand="lg">
          <Container>
            <Navbar.Brand  href={`${process.env.PUBLIC_URL}/`}>
              <img
                src="/Questence-logo.png"
                style={{ height: "30px" }}
                alt="Logo"
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="responsive-navbar-nav" />
            <Navbar.Collapse id="responsive-navbar-nav">
              <Nav className="me-auto">
                <NavDropdown title="Courses" id="collasible-nav-dropdown">

                {categories.length  &&
                    categories.map((item, i) => {
                      console.log(item)
                      return (
                  <NavDropdown.Item >
                    {item.name}
                  </NavDropdown.Item>
                  )
                    })

                  }
                  
                  <NavDropdown.Item href="#action/3.1">Others</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Programs" id="collasible-nav-dropdown">
                 
                  {PROGRAM_LINK.length > 0 &&
                    PROGRAM_LINK.map((item) => {
                         return (<NavDropdown.Item
                    href={`${process.env.PUBLIC_URL}/institute/${item.id}`}
                    
                    style={{ whiteSpace: "initial", width: "300px" }}
                  >
                     <img
                            src={item?.logo}
                            style={{
                              width: "20px",
                              height: "20px",
                              borderRadius: "50px",
                              margin: "10px",
                            }}
                            alt="image-not-given"
                          />{" "}
                          {item.name}
                        
                    
                  </NavDropdown.Item>
                        
                         
                      );
                    })}
                </NavDropdown>
                <NavDropdown
                  title="Learning Pathway"
                  id="collasible-nav-dropdown"
                >
                  <NavDropdown.Item href="#action/3.1">
                    Self-Paced
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.1">
                    Instructor Led
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.1">
                    By Training Partner
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Partnerships" id="basic-nav-dropdown">
                  <NavDropdown.Item href={`${process.env.PUBLIC_URL}/schools-offering`}>
                    For School
                  </NavDropdown.Item>

                 <NavDropdown.Item href={`${process.env.PUBLIC_URL}/business-offerings`}>
>
                    For Business
                  </NavDropdown.Item>
                  <NavDropdown.Item href={`${process.env.PUBLIC_URL}/government-offerings`}>
                    For Government
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
                <div className="row px-3">
                  <input
                    type="search"
                    className="form-control col"
                    placeholder="Search..."
                    aria-label="Search"
                  />
                  <i className="bi bi-search col-2 fs-4"></i>
                </div>
              </form>
              <div className="">
                <a className="modal-link btn btn-outline-dark btn-sm me-2 btn-rounded">
                  Log In
                </a>
                <a className="modal-link2 btn btn-solid-teal btn-sm btn-rounded">Sign Up</a>
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      <header className="py-3 border-bottom d-none d-md-flex shadow-sm">
        <Navbar expand="lg" style={{ width: "100%" }}>
          <Container fluid>
            <Navbar.Brand  href={`${process.env.PUBLIC_URL}/`}>
              <img
                src="/Questence-logo.png"
                style={{ height: "30px" }}
                alt="Logo"
              />
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto ">
                {/* <Nav.Link href="#home"></Nav.Link> */}
                <NavDropdown
                  title="Courses"
                  id="basic-nav-dropdown"
                  show={firstShow}
                  onMouseEnter={() => setFirstShow(true)}
                  onMouseLeave={() => setFirstShow(false)}
                >
                  <div className="row p-3" style={{ width: "1000px" }}>
                    <div className="col-md-4 border-end">
                       {categories.length > 0 &&
                    [...categories.slice(0,4)].map((item, i) => {
                      return (
                  <NavDropdown.Item href={`${process.env.PUBLIC_URL}/courses/category/${item.id}`}>
                    {item.name}
                  </NavDropdown.Item>
                  )
                    })

                  }
                    </div>
                    <div className="col-md-4 border-end">
                       {categories.length > 0 &&
                    [...categories.slice(4,8)].map((item, i) => {
                      return (
                  <NavDropdown.Item href={`${process.env.PUBLIC_URL}/courses/category/${item.id}`}>
                    {item.name}
                  </NavDropdown.Item>
                  )
                    })

                  }
                    </div>
                    <div className="col-md-4 border-end">
                       {categories.length > 0  &&
                    [...categories.slice(8,categories.length-1)].map((item, i) => {
                      return (
                  <NavDropdown.Item href={`${process.env.PUBLIC_URL}/courses/category/${item.id}`}>
                    {item.name}
                  </NavDropdown.Item>
                  )
                    })

                  }
                    </div>
                  </div>
                </NavDropdown>
                <NavDropdown
                  title="Programs"
                  id="basic-nav-dropdown"
                  show={secondShow}
                  onMouseEnter={() => setSecondShow(true)}
                  onMouseLeave={() => setSecondShow(false)}
                >
                  <div
                    className="row p-3 d-none d-md-flex"
                    style={{ width: "1000px" }}
                  >
                    <div className="col-md-6 border-end">
                        {SecondHalf.length > 0 &&
                    SecondHalf.map((item, i) => {
                      return (
                      
                         
                       <NavDropdown.Item
                         href={`${process.env.PUBLIC_URL}/institute/${item.id}`}
                        style={{ whiteSpace: "initial", paddingBottom: "10px" }}
                      >
                        Chattered Institute Of Personel Management Of Nigeria
                      </NavDropdown.Item>

                          
                      );
                    })}
                    </div>
                    <div className="col-md-6">
                          {FirstHalf.length > 0 &&
                    FirstHalf.map((item, i) => {
                      return (
                      
                         
                       <NavDropdown.Item
                          href={`${process.env.PUBLIC_URL}/institute/${item.id}`}
                        style={{ whiteSpace: "initial", paddingBottom: "10px" }}
                      >
                       {item.name}
                      </NavDropdown.Item>

                          
                      );
                    })}
                    </div>
                  </div>
                  <div className="row d-md-none">
                    <div className="col-sm-12">

                     {PROGRAM_LINK.length > 0 &&
                    PROGRAM_LINK.map((item, i) => {
                      return (
                      
                         
                       <NavDropdown.Item
                          href={`${process.env.PUBLIC_URL}/institute/${item.id}`}
                        style={{ whiteSpace: "initial", paddingBottom: "50px" }}
                      >
                       {item.name}
                      </NavDropdown.Item>

                          
                      );
                    })}
                     
                    </div>
                  </div>
                </NavDropdown>
                <NavDropdown
                  title="Learning Pathway"
                  id="basic-nav-dropdown"
                  show={thirdShow}
                  onMouseEnter={() => setThirdShow(true)}
                  onMouseLeave={() => setThirdShow(false)}
                >

                 {PACES.length > 0 &&
                    PACES.map((item, i) => {
                      return (
                      
                         
                       

                            <NavDropdown.Item  href={`${item.link}`}>
                           {item.name}
                          </NavDropdown.Item>
                      );
                    })}
                  
                  
                </NavDropdown>
                <NavDropdown
                  title="Partnerships"
                  id="basic-nav-dropdown"
                  show={fourthShow}
                  onMouseEnter={() => setFourthShow(true)}
                  onMouseLeave={() => setFourthShow(false)}
                >
                  <NavDropdown.Item href={`${process.env.PUBLIC_URL}/schools-offerings`}>
                    For School
                  </NavDropdown.Item>
                  <NavDropdown.Item href={`${process.env.PUBLIC_URL}/business-offerings`}>
                    For Business
                  </NavDropdown.Item>
                  <NavDropdown.Item href={`${process.env.PUBLIC_URL}/government-offerings`}>
                    For Government
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
             

              <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
                <div className="row px-3">
                  <input
                    type="search"
                    className="form-control col"
                    placeholder="Search..."
                    aria-label="Search"
                    onKeyPress={handleKeyPress}
                      type="text"
                      name="search"
                      id="search"
                  />
                  <i className="bi bi-search col-2 "   onClick={handleSearch}
                      
                      id="search-btn"></i>

                        <i className="bi bi-search col-2"  onClick={handleReset}  
                      style={{
                        display:"none"
                      }}
                        
                      id="reset-btn"></i>
                </div>
              </form>
              <div className="text-end">
                <a
                     id="login_form"
                        href="#modal"
                 
                 className="btn btn-outline-dark btn-sm me-2 btn-rounded modal-link">
                  Log In
                </a>
                <a
                        href="#"
                        id="register_form" className="modal-link2 btn btn-solid-teal btn-sm btn-rounded">Sign Up</a>
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>

      <AuthWindow showLogin={showLogin} showSignup={showSignup} />
    </>
  );
};


NavBar.propTypes = {
  auth: PropTypes.object.isRequired,
  logOut: PropTypes.func.isRequired,
  cart: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  cart: state.cart,
  auth: state.auth,
});

export default connect(mapStateToProps, { logOut })(NavBar);
