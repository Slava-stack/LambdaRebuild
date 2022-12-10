import React, { useState } from "react";
import classNames from "classnames";

import "./DropdownChoice.scss";
import dropdownSVG from "../../assets/img/arrow_down.svg";

let temp = "";

// onPressEnter
// https://stackoverflow.com/questions/27827234/how-to-handle-the-onkeypress-event-in-reactjs

function DropdownChoice(props) {
  const [inputValue, setInputValue] = useState("");
  const [inputPlaceholderValue, setinputPlaceholderValue] = useState(false);

  function serviceHandler(event) {
    const dropdownValue = event.target.childNodes[0].data
      ? event.target.childNodes[0].data
      : inputValue;
    setInputValue(() => dropdownValue);
    if (temp !== dropdownValue) {
      props.setStateLangDropdown(() => "");
      props.langServiceChoiceFoo();
      temp = dropdownValue;
    }
    setinputPlaceholderValue(() => !inputPlaceholderValue);
  }

  function dropdownClickHandler() {
    setinputPlaceholderValue(() => !inputPlaceholderValue);
  }

  return (
    <div>
      <fieldset
        className={classNames(
          "dropdown",
          { selector: !inputValue },
          {
            opened: inputPlaceholderValue,
          }
        )}
        tabIndex="0"
      >
        <legend>{inputValue && "Послуга"}</legend>
        <input
          type="checkbox"
          id="service"
          onClick={dropdownClickHandler}
        ></input>
        <label htmlFor="service">
          {inputValue ? inputValue : "Послуга"}
          <img src={dropdownSVG} alt="dropDown" />
        </label>
        {inputPlaceholderValue && (
          <div className="dropdown-choice" onClick={serviceHandler}>
            <span onClick={() => props.userChoice("correctness")}>
              Редагування
            </span>
            <span onClick={() => props.userChoice("translate")}>Переклад</span>
          </div>
        )}
      </fieldset>
    </div>
  );
}

export default DropdownChoice;
