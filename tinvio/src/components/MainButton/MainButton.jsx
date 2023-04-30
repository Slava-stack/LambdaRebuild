import React from "react";

import "./MainButton.scss";

export default function MainButton(props) {
  return (
    <button
      className={
        props.classnaming ? `btn-main ${props.classnaming}` : "btn-main"
      }
      {...props}
    >
      {props.name}
    </button>
  );
}
