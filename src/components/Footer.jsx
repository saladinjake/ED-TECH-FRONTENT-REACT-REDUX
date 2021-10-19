import React from 'react';


const Footer = () => {
    return ( 
        <footer className="row row-cols-5 py-5">
            <div className="col-5">
            <a href="/" className="d-flex align-items-center mb-3 link-dark text-decoration-none">
                <img src="/questence-white.png" style={{height: "30px"}} alt="Logo"/>
            </a>
            <p>Build skills with courses, certificates, and programmes online from world-class trainers and institutions.</p>
            <p className="text-white">© 2021 Questence. All rights reserved.</p>
            </div>


            <div className="col-2 offset-1 mt-3">
            <h5>Pages</h5>
            <ul className="nav flex-column">
                <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Home</a></li>
               
            </ul>
            </div>

            <div className="col-2 mt-3">
            <h5>Connect</h5>
            <ul className="nav flex-column">
                <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Home</a></li>
               
            </ul>
            </div>

            <div className="col-2 mt-3">
            <h5>Legal</h5>
            <ul className="nav flex-column">
                <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-muted">Home</a></li>
                
            </ul>
            </div>
        </footer>
     );
}
 
export default Footer;