import React from "react";
import { Link } from "react-router-dom";

import "./Footer.scss";
import instagramSVG from "./images/Instagram.svg";
import linkedInSVG from "./images/LinkedIn.svg";
import logoNameSVG from "./images/logoName.svg";
import googlePlaySVG from "./images/GooglePlay.svg";
import appStoreSVG from "./images/AppStore.svg";

export default function Footer({ isMainShown, settings, setInfoValue }) {
  const goToPolicy = () => {
    setInfoValue("PrivacyPolicy");
    window.scrollTo(0, 0);
  };

  const goToService = () => {
    setInfoValue("TermsOfService");
    window.scrollTo(0, 0);
  };

  return (
    <footer
      className={
        !isMainShown ? "shrinked" : settings === "" ? "" : ` ${settings}`
      }
    >
      <div className="footer-nav-block">
        {isMainShown && (
          <>
            <img src={logoNameSVG} alt="logo" />
            <div className="footer-nav-separator" />
            <nav className="footer-nav">
              <Link to="/home">Home</Link>
              <Link to="/features">Features</Link>
              <Link to="/company">Company</Link>
              <Link to="/">Login</Link>
            </nav>
          </>
        )}
        <div className="find-us">
          <img src={linkedInSVG} alt="logo" />
          <img src={instagramSVG} alt="logo" />
          <div className="footer-nav-separator" />
          <img src={googlePlaySVG} alt="logo" />
          <img src={appStoreSVG} alt="logo" />
        </div>
      </div>
      <div className="about-us">
        <p>© Tinvio™ 2020. All Rights Reserved</p>
        <div className="about-us-separator-one" />
        <Link onClick={goToPolicy} to="/info">
          Privacy Policy
        </Link>
        <div className="about-us-separator-two" />
        <Link onClick={goToService} to="/info">
          Terms of Service
        </Link>
      </div>
    </footer>
  );
}
