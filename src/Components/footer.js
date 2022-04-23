import React from "react";
import AppStore from "../images/apps-store.png";
import PlayStore from "../images/play-store.png";
import Facebook from "../images/facebook.svg";
import Instagram from "../images/instagram.svg";
import Twitter from "../images/twitter.svg";
import AboutUs from "./footer-links/about-us";
import PrivacyPolicy from "./footer-links/privacy-policy";
import TermsCondition from "./footer-links/terms-conditions";
import { Route, NavLink } from "react-router-dom";

const Footer = (props) => {
  return (
    <section className="footer-info">
      <div className="container">
        <div className="row">
          <div className="col-md-4">
            <div className="footer-contacts">
              <h6>Contact Us</h6>
              <ul>
                <li>
                  {/* <NavLink to="/home/about-us">About Us</NavLink> */}
                  <a href="https://gharpar.co/about-us/" target="_blank">
                    About Us
                  </a>
                </li>
                <li>
                  {/* <NavLink to="/home/privacy-policy">Privacy Policy</NavLink> */}
                  <a href="https://gharpar.co/privacy-policy/" target="_blank">
                    Privacy Policy
                  </a>
                </li>
                <li>
                  {/* <NavLink to="/home/terms-conditions">
                    Terms & Conditions
                  </NavLink> */}
                  <a
                    href="https://gharpar.co/terms-and-conditions/"
                    target="_blank"
                  >
                    Terms & Conditions
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <div className="col-md-4">
            <div className="app-links">
              <h6>GharPar on The Go</h6>
              <p>
                Visit Apps Store and Google Play to download<br></br> GharPar
                official app:
              </p>
              <div className="app-download">
                {/* <a href="https://tinyurl.com/gharparios" target="_blank">
                  <img src={AppStore} alt="applestore" />
                </a>
                <a href="https://tinyurl.com/gharparandroid" target="_blank">
                  <img src={PlayStore} alt="playstore" />
                </a> */}
                <a
                  href="https://apps.apple.com/us/app/gharpar-beauty-services/id1259744126"
                  target="_blank"
                >
                  <img src={AppStore} alt="applestore" />
                </a>
                <a
                  href="https://play.google.com/store/apps/details?id=com.onebyte.gharpar&hl=en_US"
                  target="_blank"
                >
                  <img src={PlayStore} alt="playstore" />
                </a>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="follow-us">
              <h6>Follow Us On</h6>
              <ul>
                <li>
                  <a href="https://www.facebook.com/gharparco" target="_blank">
                    <img src={Facebook} alt="Facebook" />
                  </a>
                  <a href="https://www.instagram.com/ghar.par/" target="_blank">
                    <img src={Instagram} alt="instagram" />
                  </a>
                  <a
                    href="https://twitter.com/gharparco?lang=en"
                    target="_blank"
                  >
                    <img src={Twitter} alt="twitter" />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="copy-rights">
        <p>
          Copyright © 2021 <a href="">GharPar</a>. All Rights Reserved
        </p>
      </div>
    </section>
  );
};

export default Footer;
