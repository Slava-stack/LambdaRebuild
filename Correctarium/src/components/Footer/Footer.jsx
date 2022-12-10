import React from "react";

import logoPng from "../../assets/img/footer_logo.png";
import "./Footer.scss";

function Footer() {
  return (
    <footer>
      <div className="footer-block">
        <div className="about-us">
          <a href="https://correctarium.com/terms">Договір публічної оферти</a>
          <p>© Correctarium</p>
          <p>2015–2022</p>
        </div>
        <img src={logoPng} alt="logo" />
        <div className="e-mail">
          <p>Надіслати текст на переклад:</p>
          <a href="mailto:manager@correctarium.com">manager@correctarium.com</a>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
