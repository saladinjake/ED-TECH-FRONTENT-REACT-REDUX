import React, { useState } from "react";
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

const NavBar = () => {
  const [firstShow, setFirstShow] = useState();
  const [secondShow, setSecondShow] = useState();
  const [thirdShow, setThirdShow] = useState();
  const [fourthShow, setFourthShow] = useState();
  return (
    <>
      <header className="py-3 border-bottom d-md-none shadow-sm">
        <Navbar collapseOnSelect expand="lg">
          <Container>
            <Navbar.Brand href="#home">
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
                  <NavDropdown.Item href="#action/3.1">
                    Languages
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.1">
                    Health Care
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.1">
                    Mathematics
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.1">
                    Physical Sciences
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.1">
                    Arts & Humanities
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.1">
                    Office Productivity
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.1">
                    Technology Engineering
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.1">
                    Law & Social Sciences
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.1">
                    Computer Science & Information
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.1">
                    Business & Operations Management
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.1">Others</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Programs" id="collasible-nav-dropdown">
                  <NavDropdown.Item
                    href="#action/3.1"
                    style={{ whiteSpace: "initial", width: "300px" }}
                  >
                    Nigeria Institute Of Management
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    href="#action/3.2"
                    style={{ whiteSpace: "initial", width: "300px" }}
                  >
                    Chattered Institute Of Taxation Of Nigeria
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    href="#action/3.3"
                    style={{ whiteSpace: "initial", width: "300px" }}
                  >
                    Chattered Institute Of Bankers Of Nigeria
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    href="#action/3.3"
                    style={{ whiteSpace: "initial", width: "300px" }}
                  >
                    Institute Of Chattered Accountant Of Nigeria
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    href="#action/3.1"
                    style={{ whiteSpace: "initial", width: "300px" }}
                  >
                    Institute Of Chattered Secretaries And Administrators Of
                    Nigeria
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    href="#action/3.2"
                    style={{ whiteSpace: "initial", width: "300px" }}
                  >
                    Association Of National Accountant Of Nigeria
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    href="#action/3.3"
                    style={{ whiteSpace: "initial", width: "300px" }}
                  >
                    Chattered Institute Of Personel Management Of Nigeria
                  </NavDropdown.Item>
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
                  <NavDropdown.Item href="#action/3.1">
                    For School
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.1">
                    For Business
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.1">
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
                <a className="btn btn-outline-dark btn-sm me-2 btn-rounded">
                  Log In
                </a>
                <a className="btn btn-solid-teal btn-sm btn-rounded">Sign Up</a>
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      <header className="py-3 border-bottom d-none d-md-flex shadow-sm">
        <Navbar expand="lg" style={{ width: "100%" }}>
          <Container fluid>
            <Navbar.Brand href="#home">
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
                      <NavDropdown.Item href="#action/3.1">
                        Languages
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.1">
                        Health Care
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.1">
                        Mathematics
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.1">
                        Physical Sciences
                      </NavDropdown.Item>
                    </div>
                    <div className="col-md-4 border-end">
                      <NavDropdown.Item href="#action/3.1">
                        Arts & Humanities
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.1">
                        Office Productivity
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.1">
                        Technology Engineering
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.1">
                        Law & Social Sciences
                      </NavDropdown.Item>
                    </div>
                    <div className="col-md-4 border-end">
                      <NavDropdown.Item href="#action/3.1">
                        Computer Science & Information
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.1">
                        Business & Operations Management
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.1">
                        Others
                      </NavDropdown.Item>
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
                      <NavDropdown.Item href="#action/3.1">
                        Nigeria Institute Of Management
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.2">
                        Chattered Institute Of Taxation Of Nigeria
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.3">
                        Chattered Institute Of Bankers Of Nigeria
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.3">
                        Institute Of Chattered Accountant Of Nigeria
                      </NavDropdown.Item>
                    </div>
                    <div className="col-md-6">
                      <NavDropdown.Item
                        href="#action/3.1"
                        style={{ whiteSpace: "initial", paddingBottom: "50px" }}
                      >
                        Institute Of Charttered Secretaries And Administrators
                        Of Nigeria
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.2">
                        Association Of National Accountant Of Nigeria
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.3">
                        Chattered Institute Of Personel Management Of Nigeria
                      </NavDropdown.Item>
                    </div>
                  </div>
                  <div className="row d-md-none">
                    <div className="col-sm-12">
                      <NavDropdown.Item
                        href="#action/3.1"
                        style={{ whiteSpace: "initial", paddingBottom: "10px" }}
                      >
                        Nigeria Institute Of Management
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        href="#action/3.2"
                        style={{ whiteSpace: "initial", paddingBottom: "50px" }}
                      >
                        Chattered Institute Of Taxation Of Nigeria
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        href="#action/3.3"
                        style={{ whiteSpace: "initial", paddingBottom: "10px" }}
                      >
                        Chattered Institute Of Bankers Of Nigeria
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        href="#action/3.3"
                        style={{ whiteSpace: "initial", paddingBottom: "50px" }}
                      >
                        Institute Of Chattered Accountant Of Nigeria
                      </NavDropdown.Item>
                    </div>
                    <div className="col-sm-12">
                      <NavDropdown.Item
                        href="#action/3.1"
                        style={{ whiteSpace: "initial", paddingBottom: "50px" }}
                      >
                        Institute Of Charttered Secretaries And Administrators
                        Of Nigeria
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        href="#action/3.2"
                        style={{ whiteSpace: "initial", paddingBottom: "50px" }}
                      >
                        Association Of National Accountant Of Nigeria
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        href="#action/3.3"
                        style={{ whiteSpace: "initial", paddingBottom: "50px" }}
                      >
                        Chattered Institute Of Personel Management Of Nigeria
                      </NavDropdown.Item>
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
                  <NavDropdown.Item href="#action/3.1">
                    Self-Paced
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    Instructor Led
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    By Training Partner
                  </NavDropdown.Item>
                </NavDropdown>
                <NavDropdown
                  title="Partnerships"
                  id="basic-nav-dropdown"
                  show={fourthShow}
                  onMouseEnter={() => setFourthShow(true)}
                  onMouseLeave={() => setFourthShow(false)}
                >
                  <NavDropdown.Item href="#action/3.1">
                    For School
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.1">
                    For Business
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.1">
                    For Government
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
              <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
                {/* <input type="search" className="form-control" placeholder="Search..." aria-label="Search" /> */}
                <i className="bi bi-search"></i>
              </form>
              <div className="text-end">
                <a className="btn btn-outline-dark btn-sm me-2 btn-rounded">
                  Log In
                </a>
                <a className="btn btn-solid-teal btn-sm btn-rounded">Sign Up</a>
              </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
};

export default NavBar;
