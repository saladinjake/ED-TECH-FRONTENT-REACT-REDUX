import React, { useEffect } from "react";
import "./styles/footer.scss";
import { Link } from "react-router-dom";
import facebook from "assets/pngs/facebook.png";
import twitter from "assets/pngs/twitter.png";
import linkedin from "assets/pngs/linkedin.png";
import questence from "assets/pngs/LogoWhite.png";
import $ from "jquery"

const Footer = () => {
  useEffect(()=>{

    $('.footer .lily').find('i').each(function() {
              $(this).css({color:"#fff"})
           });

  })
  return (
    <footer className="footer" style={{}}>
      <div className="" style={{margin:"0px",padding:"0px",clear:"both"}}></div>
      <div className="footer__item footer__item-full d-col">
        <Link to={process.env.PUBLIC_URL + "/"}>
          <figure>
            <img src={questence} alt="" width="171px" />
          </figure>
        </Link>
        <p style={{fontFamily:"Open Sans"}}>
          Build skills with courses, certificates, and
          <br /> programmes online from world-class trainers
          <br /> and institutions.
        </p>
        <ul className="d-flex mt-sm mb-sm">
          <li className="lily" style={{color:"rgb(2, 83, 200)", margin:"10px",marginLeft:"-10px"}}>
            <Link to="#">
              {/*<figure>
                <img src={facebook} alt="facebook" />
              </figure>*/}
              <i className="fa fa-facebook fa-2x"  style={{color:"#fff", margin:"10px"}}/>
            </Link>
          </li>
          <li className="lily" style={{color:"#fff", margin:"10px"}}>
            <Link to="#">
              <i className="fa fa-twitter fa-2x"  style={{color:"#fff", margin:"10px"}}/>
            </Link>
          </li>
          <li className="lily" style={{color:"#fff", margin:"10px"}}>
            <Link to="#">
              <i className="fa fa-linkedin fa-2x"  style={{color:"#fff", margin:"10px"}}/>
            </Link>
          </li>
        </ul>
        <p>© 2021 Questence. All rights reserved.</p>
      </div>

      <div className="footer__item footer__item-full space " style={{marginTop:"40px", marginLeft:"10px"}}>
        <div className="d-col">
           <h4 style={{fontFamily:"Open Sans"}}>Pages</h4>
          <ul className="d-col">
            <li style={{fontFamily:"Open Sans"}}>
              <Link to="#">Questence for Institutions</Link>
            </li>
            <li style={{fontFamily:"Open Sans"}}>
              <Link to="/about">About Us</Link>
            </li>
            <li style={{fontFamily:"Open Sans"}}>
              <Link to="/contact">Contact</Link>
            </li>
            <li style={{fontFamily:"Open Sans"}}>
              <Link to="#">Careers</Link>
            </li>
            <li style={{fontFamily:"Open Sans"}}>
              <Link to="#">News & Events</Link>
            </li>
          </ul>
        </div>


        <div className="d-col">
          <h4 style={{fontFamily:"Open Sans"}}>Connect</h4>
          <ul className="d-col">
            <li style={{fontFamily:"Open Sans"}}>
              <Link to="#">Contact</Link>
            </li>
            <li style={{fontFamily:"Open Sans"}}>
              <Link to="#">Blog</Link>
            </li>
            <li style={{fontFamily:"Open Sans"}}>
              <Link to="#">Help Center</Link>
            </li>
          </ul>
        </div>


        <div className="d-col">
          <h4 style={{fontFamily:"Open Sans"}}>Legal</h4>
          <ul className="d-col">
            <li style={{fontFamily:"Open Sans"}}>
              <Link to="#">Privacy Policy</Link>
            </li>
            <li style={{fontFamily:"Open Sans"}}>
              <Link to="#">Terms of Service</Link>
            </li>
            <li style={{fontFamily:"Open Sans"}}>
              <Link to="#">Trademark Policy</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* <div className="footer__item d-col">
        <h4 style={{fontFamily:"Open Sans"}}>Questence</h4>
        <ul className="d-col">
          <li style={{fontFamily:"Open Sans"}}>
            <Link to="\">Questence for Institutions</Link>
          </li>
          <li style={{fontFamily:"Open Sans"}}>
            <Link to="\">About Us</Link>
          </li>
          <li style={{fontFamily:"Open Sans"}}>
            <Link to="\">Contact</Link>
          </li>
          <li style={{fontFamily:"Open Sans"}}>
            <Link to="\">Careers</Link>
          </li>
          <li style={{fontFamily:"Open Sans"}}>
            <Link to="\">News $ Events</Link>
          </li>
        </ul>
      </div>

      <div className="footer__item d-col">
        <h4 style={{fontFamily:"Open Sans"}}>Legal</h4>
        <ul className="d-col">
          <li style={{fontFamily:"Open Sans"}}>
            <Link to="\">Privacy Policy</Link>
          </li>
          <li style={{fontFamily:"Open Sans"}}>
            <Link to="\">Terms of Service</Link>
          </li>
          <li style={{fontFamily:"Open Sans"}}>
            <Link to="\">Trademark Policy</Link>
          </li>
        </ul>
      </div> */}
    </footer>
  );
};

export default Footer;
