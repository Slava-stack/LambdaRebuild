import React, { useState, useEffect } from "react";
import classNames from "classnames";
import currentTime from "../../helpers/clock";
import hamLinks from "../../data/hamLinks";
import useLayoutStore from "../../store/overlay";
import headerHamStore from "../../store/headerHam";

import "./Header.scss";
import { FlexWrapper } from "../styles/FlexWrappers.styled";

export default function Header() {
  const { setShowLayout, setShowAside, showAside, showLayout } = useLayoutStore();
  const { setShowHam, showHam } = headerHamStore();
  const [time, setTime] = useState("");
  const hamButtonClasses = classNames("ham-btn", { "ham-opened": showHam });

  const hamHandler = () => {
    setShowHam(!showHam);
    setShowLayout(!showLayout);
    setShowAside(false);
    document.body.style.overflow = "hidden";
  };

  const asideHamHandler = () => {
    setShowAside(!showAside);
    document.body.style.overflow = !showAside ? "hidden" : "";
  };

  useEffect(() => {
    const clock = () => setTime(currentTime());

    const clockInterval = setInterval(clock, 1000);

    return () => clearInterval(clockInterval);
  }, []);

  return (
    <header>
      {
        <span className="material-icons aside-ham" onClick={asideHamHandler}>
          menu
        </span>
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
          <span className="material-icons icon">more_vert</span>
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
