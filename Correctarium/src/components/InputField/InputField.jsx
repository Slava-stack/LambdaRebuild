import classNames from "classnames";
import React, { useState } from "react";

import "./InputField.scss";

function InputField(props) {
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
        type="text"
        id="user-input"
        onFocus={onFocus}
        onBlur={onBlur}
      ></input>
    </fieldset>
  );
}

export default InputField;
