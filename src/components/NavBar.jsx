import React from 'react';
import {Navbar, Container, Nav, NavDropdown} from 'react-bootstrap';

const NavBar = () => {
    return ( 
        <header className="py-3 border-bottom shadow-sm">
        {/* <div className="container-fluid"> */}
        <Navbar expand="lg">
          <Container fluid>
            <Navbar.Brand href="#home"><img src="/Questence-logo.png" style={{height: "30px"}} alt="Logo"/></Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                {/* <Nav.Link href="#home"></Nav.Link> */}
                <NavDropdown title="Courses" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Programs" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                  <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Learning Pathway" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                </NavDropdown>
                <NavDropdown title="Partnerships" id="basic-nav-dropdown">
                  <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                </NavDropdown>
              </Nav>
               <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
              {/* <input type="search" className="form-control" placeholder="Search..." aria-label="Search" /> */}
              <i className="bi bi-search"></i>
            </form>
              <div className="text-end">
              <a  className="btn btn-outline-dark btn-sm me-2 btn-rounded">Log In</a>
              <a  className="btn btn-solid-teal btn-sm btn-rounded">Sign Up</a>
            </div>
            </Navbar.Collapse>
          </Container>
        </Navbar>
         
        {/* </div> */}
      </header>
     );
}
 
export default NavBar;