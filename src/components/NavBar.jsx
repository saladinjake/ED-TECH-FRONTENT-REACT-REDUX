import React from 'react';


const NavBar = () => {
    return ( 
        <header className="p-3 border-bottom shadow-sm">
        <div className="container-fluid">
        <nav class="navbar navbar-expand-lg navbar-light">
          <div class="container-fluid">
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
              <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarTogglerDemo01">
              <a class="navbar-brand" href="#">
              <img src="/Questence-logo.png" style={{height: "30px"}} alt="Logo"/>
              </a>
              <ul class="navbar-nav me-auto mb-2 mb-lg-0">
                <li class="nav-item">
                  <a class="nav-link active" aria-current="page" href="#">Home</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link" href="#">Link</a>
                </li>
                <li class="nav-item">
                  <a class="nav-link disabled">Disabled</a>
                </li>
              </ul>
              <form className="col-12 col-lg-auto mb-3 mb-lg-0 me-lg-3">
              {/* <input type="search" className="form-control" placeholder="Search..." aria-label="Search" /> */}
              <i className="bi bi-search"></i>
            </form>
    
            <div className="text-end">
              <a  className="btn btn-outline-dark btn-sm me-2 btn-rounded">Log In</a>
              <a  className="btn btn-solid-teal btn-sm btn-rounded">Sign Up</a>
            </div>
            </div>
          </div>
        </nav>
         
        </div>
      </header>
     );
}
 
export default NavBar;