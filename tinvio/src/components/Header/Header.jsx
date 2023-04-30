import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import HeaderButton from "../HeaderButton/HeaderButton";
import Rectangle from "../Rectangle/Rectangle";

import logoNameSVG from "./images/tinvioLogo.svg";
import arrowSVG from "./images/arrow.svg";
import greatBritainSVG from "./images/gb.svg";
import indonisiaSVG from "./images/indonisia.svg";
import thailandSVG from "./images/thai.svg";
import vietnamSVG from "./images/vietnam.svg";
import hamburgerSVG from "./images/ham.svg";
import crossHamSVG from "./images/cross.svg";
import leftTilingIMG from "./images/left768Header.png";
import rightTilingIMG from "./images/right768Header.png";

import "./Header.scss";

export default function Header({
  windowWidth,
  hamHandler,
  isMainShown,
  settings,
}) {
  const [language, setLanguage] = useState("EN");
  const [isOpened, setIsOpened] = useState(false);
  const [headerMove, setHeaderMove] = useState(false);

  function changeBackground() {
    if (window.scrollY !== 0) {
      setHeaderMove(true);
    } else {
      setHeaderMove(false);
    }
  }

  window.addEventListener("scroll", changeBackground);

  return (
    <header
      className={`header-nav${isMainShown && headerMove ? " active" : ""}${
        !isMainShown ? " extended" : ""
      }${settings !== "home" ? " not-home" : ""}`}
    >
      <div className="wrapper">
        <img src={logoNameSVG} alt="logo" />
        {windowWidth < 1024 ? (
          <>
            {!isMainShown && (
              <>
                <Rectangle classnaming="top-header" />
                <Rectangle classnaming="top-left-header" />
                <img
                  className="header-tiling-right"
                  src={rightTilingIMG}
                  alt="tiling"
                />
                <img
                  className="header-tiling-left"
                  src={leftTilingIMG}
                  alt="tiling"
                />
                <div
                  className={`lang-dropdown ${isOpened ? "opened" : ""}`}
                  onClick={() => {
                    setIsOpened((opener) => !opener);
                  }}
                >
                  {language}
                  <img src={arrowSVG} alt="dropdown arrow" />
                  <div className="lang-flags">
                    <img
                      onClick={() => setLanguage("EN")}
                      src={greatBritainSVG}
                      alt="Great Britain"
                    />
                    <hr />
                    <img
                      onClick={() => setLanguage("ID")}
                      src={indonisiaSVG}
                      alt="Indonisia"
                    />
                    <hr />
                    <img
                      onClick={() => setLanguage("TH")}
                      src={thailandSVG}
                      alt="Thailand"
                    />
                    <hr />
                    <img
                      onClick={() => setLanguage("VN")}
                      src={vietnamSVG}
                      alt="Vietnam"
                    />
                  </div>
                </div>
                <nav>
                  <NavLink to="/home" className="nav-links">
                    Home
                  </NavLink>
                  <NavLink to="/features" className="nav-links">
                    Features
                  </NavLink>
                  <NavLink to="/company" className="nav-links">
                    Company
                  </NavLink>
                </nav>
                <HeaderButton
                  classnaming="nav-button"
                  buttonname="Get Started"
                />
              </>
            )}
            <img
              className="nav-ham"
              src={isMainShown ? hamburgerSVG : crossHamSVG}
              alt="hamburger"
              onClick={hamHandler}
            />
          </>
        ) : (
          <>
            <div
              className={`lang-dropdown ${isOpened ? "opened" : ""}`}
              onClick={() => {
                setIsOpened((opener) => !opener);
              }}
            >
              {language}
              <img src={arrowSVG} alt="dropdown arrow" />
              <div className="lang-flags">
                <img
                  onClick={() => setLanguage("EN")}
                  src={greatBritainSVG}
                  alt="Great Britain"
                />
                <hr />
                <img
                  onClick={() => setLanguage("ID")}
                  src={indonisiaSVG}
                  alt="Indonisia"
                />
                <hr />
                <img
                  onClick={() => setLanguage("TH")}
                  src={thailandSVG}
                  alt="Thailand"
                />
                <hr />
                <img
                  onClick={() => setLanguage("VN")}
                  src={vietnamSVG}
                  alt="Vietnam"
                />
              </div>
            </div>
            <nav>
              <NavLink to="/home" className="nav-links">
                Home
              </NavLink>
              <NavLink to="/features" className="nav-links">
                Features
              </NavLink>
              <NavLink to="/company" className="nav-links">
                Company
              </NavLink>
            </nav>
            <HeaderButton classnaming="nav-button" buttonname="Get Started" />
          </>
        )}
      </div>
    </header>
  );
}
