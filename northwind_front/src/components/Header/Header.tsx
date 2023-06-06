import React, { useState, useEffect } from "react";
import classNames from "classnames";
import currentTime from "../../helpers/clock";
import hamLinks from "../../data/hamLinks";
import useLayoutStore from "../../store/overlay";
import headerHamStore from "../../store/headerHam";

import "./Header.scss";
import arrowSVG from "../../assets/arrow.svg";
import hamSVG from "../../assets/hamburger.svg";
import linkSVG from "../../assets/link.svg";
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
          <img src={hamSVG} alt="hamburger" className="ham" />
          <p>SQLite Links</p>
          <img src={arrowSVG} alt="arrow" className="arrow" />
        </FlexWrapper>
        {showHam && (
          <FlexWrapper
            direction="column"
            position="absolute"
            inset="35px 0 0 -3px"
            className="links-container"
          >
            {hamLinks.map((el) => (
              <FlexWrapper key={el.id} margin="0 0 5px 0">
                <a href={el.link} className="sql-link">
                  <img src={linkSVG} alt="link" />
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
