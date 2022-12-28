import React from "react";
import { Link } from "react-router-dom";

import "./Header.scss";

export default function Header(props) {
  return (
    <header>
      <Link
        to={`/${props.redirectionPath}`}
        className="redirect-link"
        onClick={props.clickHandler}
      >
        {props.buttonName}
      </Link>
    </header>
  );
}
