import React, { useState } from "react";
import classNames from "classnames";

import "./LanguageDropdown.scss";
import dropdownSVG from "../../assets/img/arrow_down.svg";

// https://stackoverflow.com/questions/27827234/how-to-handle-the-onkeypress-event-in-reactjs
function LanguageDropdown(props) {
  const [inputValue, setInputValue] = useState("");
  const [inputPlaceholderValue, setInputPlaceholderValue] = useState(false);
  const legendValue =
    props.serviceChoice === "translate" ? "Мовна пара" : "Мова";

  props.liftingStateFunc(() => setInputValue);

  function serviceHandler(event) {
    if (event.target.childNodes[0].data) {
      setInputValue(() => event.target.childNodes[0].data);
    }
    if (!event.target.childNodes[0].data) {
      setInputValue(() => inputValue);
    }
    setInputPlaceholderValue(() => !inputPlaceholderValue);
  }

  function dropdownClickHandler() {
    if (props.serviceChoice) {
      setInputPlaceholderValue(() => !inputPlaceholderValue);
    }
  }

  return (
    <div>
      <fieldset
        className={classNames(
          "dropdown-lang",
          {
            opened: inputPlaceholderValue,
          },
          { selector: !inputValue },
          { disabled: !props.serviceChoice }
        )}
        tabIndex={props.serviceChoice? "0" : "-1"}
      >
        <legend>{inputValue && legendValue}</legend>
        <input type="checkbox" id="lang" onClick={dropdownClickHandler}></input>
        <label htmlFor="lang">
          {inputValue ? inputValue : legendValue}
          <img src={dropdownSVG} alt="dropDown" />
        </label>
        {inputPlaceholderValue && props.serviceChoice === "translate" && (
          <div className="dropdown-lang-choice" onClick={serviceHandler}>
            <span onClick={() => props.langChoice("UA/RU - EN")}>
              Українська/російська — англійська
            </span>
            <span onClick={() => props.langChoice("EN - UA")}>
              Англійська — українська
            </span>
            <span onClick={() => props.langChoice("EN - RU")}>
              Англійська — російська
            </span>
            <span onClick={() => props.langChoice("RU - UA")}>
              Російська — українська
            </span>
            <span onClick={() => props.langChoice("UA - RU")}>
              Українська — російська
            </span>
          </div>
        )}
        {inputPlaceholderValue && props.serviceChoice === "correctness" && (
          <div className="dropdown-lang-choice" onClick={serviceHandler}>
            <span onClick={() => props.langChoice("ua")}>Українська</span>
            <span onClick={() => props.langChoice("ru")}>Російська</span>
            <span onClick={() => props.langChoice("en")}>Англійська</span>
            <span onClick={() => props.langChoice("en (native)")}>
              Англійська (носій)
            </span>
          </div>
        )}
      </fieldset>
    </div>
  );
}

export default LanguageDropdown;
