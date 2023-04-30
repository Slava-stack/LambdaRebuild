import React from "react";

import "./HeaderButton.scss";

export default function HeaderButton(props) {
  return (
    <button className={props.classnaming} {...props}>
      {props.buttonname}
    </button>
  );
}
