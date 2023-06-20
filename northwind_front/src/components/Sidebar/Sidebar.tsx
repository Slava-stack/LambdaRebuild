import React from "react";
import asideBtns from "../../data/asideNavBtns";
import { NavLink, Link } from "react-router-dom";
import useLayoutStore from "../../store/overlay";
import classNames from "classnames";

import "./Sidebar.scss";
import { AsideWrapper, FlexWrapper } from "../styles/FlexWrappers.styled";
import headerHamStore from "../../store/headerHam";

export default function Sidebar() {
  const { showAside, setShowAside, setShowLayout } = useLayoutStore();
  const { setShowHam } = headerHamStore();

  const generalBtns = asideBtns.slice(0, 2);
  const backofficeBtns = asideBtns.slice(2);

  const asideClass = classNames({ hidden: !showAside });

  const linksHandler = () => {
    setShowAside(false);
    setShowHam(false);
    setShowLayout(false);
    document.body.style.overflow = "";
  };

  return (
    <aside className={asideClass}>
      <AsideWrapper direction="column">
        <div className="logo-container">
          <Link to="/" className="logo-link" onClick={linksHandler}>
            <h1>
              Northwind <span>Traders</span>
            </h1>
          </Link>
        </div>
        <div>
          <p className="pheader-f">GENERAL</p>
          <FlexWrapper direction="column">
            {generalBtns.map((el) => (
              <NavLink
                to={el.path}
                key={el.id}
                onClick={linksHandler}
                className="nav-link"
              >
                <span className="material-icons">{el.icon}</span>
                <span className="nav-link-content">{el.name}</span>
              </NavLink>
            ))}
          </FlexWrapper>
        </div>
        <div>
          <p className="pheader-s">BACKOFFICE</p>
          <FlexWrapper direction="column" className="link-header">
            {backofficeBtns.map((el) => (
              <NavLink
                to={el.path}
                key={el.id}
                onClick={linksHandler}
                className="nav-link"
              >
                <span className="material-icons">{el.icon}</span>
                <span className="nav-link-content">{el.name}</span>
              </NavLink>
            ))}
          </FlexWrapper>
        </div>
      </AsideWrapper>
    </aside>
  );
}
