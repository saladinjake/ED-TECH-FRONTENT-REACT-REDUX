import React from 'react';


const Footer = () => {
    return (
        <>
        <footer className="d-none d-md-flex row row-cols-5 py-5 ">
            <div className="col-12">
                <a href="/" className="d-flex align-items-center mb-3 link-dark text-decoration-none">
                    <img src="/questence-white.png" style={{height: "50px"}} alt="Logo"/>
                </a>
            </div>
            <div className="col-md">
                <p>Build skills with courses, certificates, and programmes online from world-class trainers and institutions.</p>
                <div className="row">
                    
                    <i className="bi bi-facebook size-2rem col-1"></i>
                    <i className="bi bi-twitter size-2rem col-1"></i>
                    <i className="bi bi-instagram size-2rem col-1"></i>
                    <i className="col"></i>
                </div>
                <p className="mt-2">© 2021 Questence. All rights reserved.</p>
            </div>

            <div className="col">
                <h5>Pages</h5>
                <ul className="nav flex-column">
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-white">About Us</a></li>
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-white">Blog</a></li>
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-white">Careers</a></li>
                </ul>
            </div>

            <div className="col">
                <h5>Connect</h5>
                <ul className="nav flex-column">
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-white">Contact Us</a></li>
                </ul>
            </div>

            <div className="col">
                <h5>Legal</h5>
                <ul className="nav flex-column">
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-white">Terms of Service</a></li>
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-white">Honor Code</a></li>
                    <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-white">Privacy Policy</a></li>
                </ul>
            </div>
        </footer>

        <footer className="d-md-none row pb-2 pt-5">
         <div className="col-md-5 col-sm-12">
         <a href="/" className="d-flex align-items-center mb-3 link-dark text-decoration-none">
             <img src="/questence-white.png" style={{height: "30px"}} alt="Logo"/>
         </a>
         <p>Build skills with courses, certificates, and programmes online from world-class trainers and institutions.</p>
         </div>
         <div className="row">        
            <i className="bi bi-facebook size-2rem col-2"></i>
            <i className="bi bi-twitter size-2rem col-2"></i>
            <i className="bi bi-instagram size-2rem col-1"></i>
            <i className="col"></i>
        </div>

         <div className="col-md-2 col-sm-12 offset-md-1 mt-3">
         <h5 className="fw-bold">Pages</h5>
         <ul className="nav flex-column">
            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-white">About Us</a></li>
            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-white">Blog</a></li>
            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-white">Careers</a></li>
            
         </ul>
         </div>

         <div className="col-md-2 col-sm-12 mt-3">
         <h5 className="fw-bold">Connect</h5>
         <ul className="nav flex-column">
            <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-white">Contact Us</a></li>
         </ul>
         </div>

         <div className="col-md-2 col-sm-12 mt-3">
         <h5 className="fw-bold">Legal</h5>
            <ul className="nav flex-column">
                <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-white">Terms of Service</a></li>
                <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-white">Honor Code</a></li>
                <li className="nav-item mb-2"><a href="#" className="nav-link p-0 text-white">Privacy Policy</a></li>
                
            </ul>
            <p className="text-white mt-3">© 2021 Questence. All rights reserved.</p>
         </div>
     </footer>
     </>
     );
}
 
export default Footer;