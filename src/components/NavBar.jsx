import React, { useState } from "react";
import { Navbar, Container, Nav, NavDropdown } from "react-bootstrap";

const NavBar = () => {
  const [firstShow, setFirstShow] = useState();
  const [secondShow, setSecondShow] = useState();
  const [thirdShow, setThirdShow] = useState();
  const [fourthShow, setFourthShow] = useState();
  const [categoriesShow, setCategoriesShow] = useState();
  return (
    <>
      <header className="py-3 border-bottom d-md-none shadow-sm">
        <Navbar collapseOnSelect expand="lg">
          <Container>
            <Navbar.Brand href="/">
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
                <NavDropdown title="Partnership" id="basic-nav-dropdown">
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
            <Navbar.Brand href="/">
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
                  <NavDropdown.Item href="#action/3.1" className="px-4">
                    All Courses
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    <NavDropdown
                      title="By Categories"
                      id="basic-nav-dropdown"
                      className="dropend"
                      show={categoriesShow}
                      onMouseEnter={() => setCategoriesShow(true)}
                      onMouseLeave={() => setCategoriesShow(false)}
                    >
                      <div
                        className="row p-3 course-category-scroll"
                        style={{
                          width: "60vw",
                          height: "60vh",
                          overflow: "auto",
                        }}
                      >
                        <div className="col-md-4 border-end">
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="fw-bold"
                          >
                            Arts & Humanities
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Education
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            History
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Politics
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Sociology
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Geography
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Law
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Psychology
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Media And Journalism
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Architecture
                          </NavDropdown.Item>
                          <li>
                            <hr className="dropdown-divider" />
                          </li>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="fw-bold whitespace"
                          >
                            Business And Operations Management
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Human Resources Administration
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Leadership And Management
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Finance And Banking
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Accounting
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Business Process Management
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Service Management
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Supply Chain Management
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Sales And Marketing Management
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Risk Management
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Customer Service
                          </NavDropdown.Item>
                        </div>
                        <div className="col-md-4 border-end">
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="fw-bold whitespace"
                          >
                            Engineering
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Computer Engineering
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Electrical Engineering
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Mechanical Engineering
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Chemical Engineering
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Civil Engineering
                          </NavDropdown.Item>
                          <li>
                            <hr className="dropdown-divider" />
                          </li>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="fw-bold whitespace"
                          >
                            Physical Sciences
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Biology
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Physics
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Chemistry
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Environmental Studies
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Agricultural Science
                          </NavDropdown.Item>
                          <li>
                            <hr className="dropdown-divider" />
                          </li>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="fw-bold whitespace"
                          >
                            Computer Schience & Information Technology
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Computer Science
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Network And Security
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Software Development
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Digital Marketing
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            IT Management
                          </NavDropdown.Item>
                        </div>
                        <div className="col-md-4 border-end">
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="fw-bold whitespace"
                          >
                            Law & Social Sciences
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Economics
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Law
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Psychology
                          </NavDropdown.Item>
                          <li>
                            <hr className="dropdown-divider" />
                          </li>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="fw-bold whitespace"
                          >
                            Health Care
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Nursing
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Disease And Disorders
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Nutrition
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Caregiving
                          </NavDropdown.Item>
                          <NavDropdown.Item
                            href="#action/3.1"
                            className="whitespace"
                          >
                            Pharmacology
                          </NavDropdown.Item>
                        </div>
                      </div>
                    </NavDropdown>
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3" className="px-4">
                    By Learning Center
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    <NavDropdown
                      title="By Learning Style"
                      id="basic-nav-dropdown"
                      className="dropend"
                      show={fourthShow}
                      onMouseEnter={() => setFourthShow(true)}
                      onMouseLeave={() => setFourthShow(false)}
                    >
                      <NavDropdown.Item href="#action/3.1">
                        Instructor Led
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.1">
                        Self Paced
                      </NavDropdown.Item>
                    </NavDropdown>
                  </NavDropdown.Item>
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
                    style={{ width: "50vw" }}
                  >
                    <div className="col border-end">
                      <NavDropdown.Item href="#action/3.1">
                        NIM: Nigerian Institute of Management
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.2">
                        ICAN: Institute of Chartered Accountants
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.3">
                        CITN: Chartered Institute of Taxation of Nigeria
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.3">
                        Chartered Institute of Bankers of Nigeria
                      </NavDropdown.Item>
                    </div>
                    <div className="col">
                      <NavDropdown.Item
                        href="#action/3.1"
                        style={{ whiteSpace: "initial" }}
                      >
                        ICSAN - Institute of Chartered Secretaries and
                        Administrators of Nigeria
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.2">
                        Association Of Accountants of Nigeria
                      </NavDropdown.Item>
                      <NavDropdown.Item href="#action/3.3">
                        CIPM: Chartered Institute of Personnel Management of
                        Nigeria
                      </NavDropdown.Item>
                    </div>
                  </div>
                  <div className="row d-md-none">
                    <div className="col-sm-12">
                      <NavDropdown.Item
                        href="#action/3.1"
                        style={{ whiteSpace: "initial", paddingBottom: "10px" }}
                      >
                        NIM: Nigerian Institute of Management
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        href="#action/3.2"
                        style={{ whiteSpace: "initial", paddingBottom: "50px" }}
                      >
                        ICAN: Institute of Chartered Accountants
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        href="#action/3.3"
                        style={{ whiteSpace: "initial", paddingBottom: "10px" }}
                      >
                        CITN: Chartered Institute of Taxation of Nigeria
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        href="#action/3.3"
                        style={{ whiteSpace: "initial", paddingBottom: "50px" }}
                      >
                        Chartered Institute of Bankers of Nigeria
                      </NavDropdown.Item>
                    </div>
                    <div className="col-sm-12">
                      <NavDropdown.Item
                        href="#action/3.1"
                        style={{ whiteSpace: "initial", paddingBottom: "50px" }}
                      >
                        ICSAN - Institute of Chartered Secretaries and
                        Administrators of Nigeria
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        href="#action/3.2"
                        style={{ whiteSpace: "initial", paddingBottom: "50px" }}
                      >
                        Association Of Accountants of Nigeria
                      </NavDropdown.Item>
                      <NavDropdown.Item
                        href="#action/3.3"
                        style={{ whiteSpace: "initial", paddingBottom: "50px" }}
                      >
                        CIPM: Chartered Institute of Personnel Management of
                        Nigeria
                      </NavDropdown.Item>
                    </div>
                  </div>
                </NavDropdown>
                <NavDropdown
                  title="For Institutions"
                  id="basic-nav-dropdown"
                  show={thirdShow}
                  onMouseEnter={() => setThirdShow(true)}
                  onMouseLeave={() => setThirdShow(false)}
                >
                  <NavDropdown.Item href="#action/3.1">
                    For Schools
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">
                    For Businesses
                  </NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">
                    For Governments
                  </NavDropdown.Item>
                </NavDropdown>
                {/* <NavDropdown
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
                </NavDropdown> */}
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
