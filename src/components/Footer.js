import React from "react";
import "./styles/footer.scss";
import { Link } from "react-router-dom";
import facebook from "assets/pngs/facebook.png";
import twitter from "assets/pngs/twitter.png";
import linkedin from "assets/pngs/linkedin.png";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__item footer__item-full d-col">
        <Link to={process.env.PUBLIC_URL + "/"}>
          <figure>
            <img
              src={process.env.PUBLIC_URL + "/assets/images/questence-logo.png"}
              alt=""
              width="171px"
            />
          </figure>
        </Link>
        <p>
          Build skills with courses, certificates, and
          <br /> programmes online from world-class trainers
          <br /> and institutions.
        </p>
        <ul className="d-flex mt-sm mb-sm">
          <li>
            <Link to="#">
              <figure>
                <img src={facebook} alt="facebook" />
              </figure>
            </Link>
          </li>
          <li>
            <Link to="#">
              <figure>
                <img src={twitter} alt="twitter" />
              </figure>
            </Link>
          </li>
          <li>
            <Link to="#">
              <figure>
                <img src={linkedin} alt="linkedin" />
              </figure>
            </Link>
          </li>
        </ul>
        <p>© 2021 Questence. All rights reserved.</p>
      </div>

      <div className="footer__item footer__item-full space ">
        <div className="d-col">
          <h4>Questence</h4>
          <ul className="d-col">
            <li>
              <Link to="#">Questence for Institutions</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
            <li>
              <Link to="#">Careers</Link>
            </li>
            <li>
              <Link to="#">News & Events</Link>
            </li>
          </ul>
        </div>

        <div className="d-col">
          <h4>Legal</h4>
          <ul className="d-col">
            <li>
              <Link to="#">Privacy Policy</Link>
            </li>
            <li>
              <Link to="#">Terms of Service</Link>
            </li>
            <li>
              <Link to="#">Trademark Policy</Link>
            </li>
          </ul>
        </div>
      </div>

      {/* <div className="footer__item d-col">
        <h4>Questence</h4>
        <ul className="d-col">
          <li>
            <Link to="\">Questence for Institutions</Link>
          </li>
          <li>
            <Link to="\">About Us</Link>
          </li>
          <li>
            <Link to="\">Contact</Link>
          </li>
          <li>
            <Link to="\">Careers</Link>
          </li>
          <li>
            <Link to="\">News $ Events</Link>
          </li>
        </ul>
      </div>

      <div className="footer__item d-col">
        <h4>Legal</h4>
        <ul className="d-col">
          <li>
            <Link to="\">Privacy Policy</Link>
          </li>
          <li>
            <Link to="\">Terms of Service</Link>
          </li>
          <li>
            <Link to="\">Trademark Policy</Link>
          </li>
        </ul>
      </div> */}
    </footer>
  );
};

export default Footer;
