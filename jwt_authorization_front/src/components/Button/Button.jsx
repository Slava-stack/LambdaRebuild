import React from "react";

import "./Button.scss";

export default function Button(props) {
  return (
    // <div className="button-block">
    <button type="submit" onClick={props.clickHandler}>
      {props.buttonName}
    </button>
    // </div>
  );
}
