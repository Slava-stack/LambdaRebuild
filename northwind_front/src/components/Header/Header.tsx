import React, { useState, useEffect } from "react";
import classNames from "classnames";
import currentTime from "../../helpers/clock";
import hamLinks from "../../data/hamLinks";
import useLayoutStore from "../../store/overlay";
import headerHamStore from "../../store/headerHam";

import "./Header.scss";
import hamSVG from "../../assets/hamburger.svg";
import { FlexWrapper } from "../styles/FlexWrappers.styled";

export default function Header() {
  const { setShowLayout, setShowAside, showAside } = useLayoutStore();
  const { setShowHam, showHam } = headerHamStore();
  const [time, setTime] = useState("");
  const hamButtonClasses = classNames("ham-btn", { "ham-opened": showHam });

  const hamHandler = () => {
    setShowHam(!showHam);
    setShowLayout(true);
    setShowAside(false);
  };

  const asideHamHandler = () => {
    setShowAside(!showAside);
  };

  useEffect(() => {
    const clock = () => setTime(currentTime());

    const clockInterval = setInterval(clock, 1000);

    return () => clearInterval(clockInterval);
  }, []);

  return (
    <header>
      {
        <img
          src={hamSVG}
          alt="ham"
          className="aside-ham"
          onClick={asideHamHandler}
        />
      }
      <div className="time">{time}</div>
      <FlexWrapper
        direction="row"
        position="relative"
        className="ham-container"
      >
        <FlexWrapper className={hamButtonClasses} onClick={hamHandler}>
          <span className="material-icons">menu</span>
          <p>SQLite Links</p>
          <span className="material-icons">keyboard_arrow_down</span>
        </FlexWrapper>
        {showHam && (
          <FlexWrapper
            direction="column"
            position="absolute"
            inset="49px 0 0 0px"
            className="links-container"
          >
            {hamLinks.map((el) => (
              <FlexWrapper key={el.id} className="link">
                <a href={el.link}>
                  <span className="material-icons">link</span>
                  <p>{el.name}</p>
                </a>
              </FlexWrapper>
            ))}
          </FlexWrapper>
        )}
      </FlexWrapper>
    </header>
  );
}
