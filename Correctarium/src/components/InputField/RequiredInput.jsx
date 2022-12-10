import React, { useState } from "react";
import classNames from "classnames";

import "./InputField.scss";

function RequiredInput(props) {
  const [userInput, setUserInput] = useState("");
  const [focused, setFocused] = useState(false);
  const onFocus = () => {
    setFocused(true);
  };
  const onBlur = () => {
    setFocused(false);
  };

  function userInputHandler(event) {
    setUserInput(() => event.target.value);
  }

  return (
    <fieldset
      className={classNames("input-info", { active: focused })}
      onChange={props.emailSetter}
    >
      <legend>{userInput ? props.placeHold : ""}</legend>
      <input
        placeholder={props.placeHold}
        onChange={userInputHandler}
        type="email"
        id="user-input"
        onFocus={onFocus}
        onBlur={onBlur}
        required
      ></input>
    </fieldset>
  );
}

export default RequiredInput;
