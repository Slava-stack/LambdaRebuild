import React from "react";

import "./Input.scss";

function Input(props) {
  // mb I will need to set value parameter in my input fields
  return (
    <div className="input-block">
      <input
        onChange={(event) => props.emailHandler(event.target.value)}
        id="email"
        type="email"
        placeholder="email"
        required={true}
        value={props.emailValue}
      ></input>
      <input
        id="password"
        onChange={(event) => {
          props.passwordHandler(event.target.value);
        }}
        autoComplete="current-password"
        type="password"
        placeholder="password"
        required={true}
        value={props.passwordValue}
      ></input>
    </div>
  );
}

export default Input;
