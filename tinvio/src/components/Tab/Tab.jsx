import React from "react";

import "./Tab.scss";

export default function Tab(props) {
  return (
    <button
      className={props.tabnumber === props.id ? "tab-btn active" : "tab-btn"}
      onClick={props.onClick}
    >
      {props.name}
    </button>
  );
}
