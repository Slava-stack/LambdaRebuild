import React, { useState } from "react";

import MainButton from "../MainButton/MainButton";
import handsSVG from "./images/Group.svg";
import sentSVG from "./images/congrats.svg";
import cross from "./images/cross.svg";

import "./Form.scss";

export default function Form({ setIsShownOverlay, isOverlayForm }) {
  const [numberInput, setNumberInput] = useState("");
  const [isSent, setIsSent] = useState(false);
  const [{ isEmpty, nan }, setIsError] = useState({
    isEmpty: false,
    nan: false,
  });

  function submitHandler(e) {
    e.preventDefault();
    if (!numberInput) {
      setIsError({ nan: false, isEmpty: true });
      return;
    }
    const isNumber = numberInput.replace(" ", "").length === 10;
    if (!isNumber) {
      setIsError({ isEmpty: false, nan: true });
      return;
    }
    setIsSent(true);
  }

  function closeHandlerCross() {
    setIsSent(false);
    setIsShownOverlay(false);
    setNumberInput("");
  }

  function closeHandlerBtn() {
    setIsError({ isEmpty: false, nan: false });
    setIsSent(false);
    setNumberInput("");
  }

  return (
    <div
      className={`form-wrapper${isSent ? " sent" : ""}${
        isOverlayForm ? " overlay" : ""
      }`}
    >
      <form action="#" onSubmit={submitHandler}>
        {isSent ? (
          <>
            {isOverlayForm && (
              <img
                src={cross}
                className="close-btn"
                alt="close btn"
                onClick={closeHandlerCross}
              />
            )}
            <p>Thank you!</p>
            <img src={sentSVG} alt="congratulation sending" />
            <p>We’ll get in touch as soon as possible </p>
            <MainButton
              classnaming="form-btn-close"
              name="Close"
              type="reset"
              onClick={closeHandlerBtn}
            />
          </>
        ) : (
          <>
            {isOverlayForm && (
              <img
                src={cross}
                className="close-btn"
                alt="close btn"
                onClick={closeHandlerCross}
              />
            )}
            <p>
              Hi, we’re <span>Tinvio!</span> And you?
            </p>
            <div className="input-block">
              <div>
                <label htmlFor="name">Name</label>
                <input placeholder="John Appleseed" type="text" name="name" />
              </div>
              <div>
                <label htmlFor="businessName">Business Name</label>
                <input
                  placeholder="Burgers &Boba (Singapore)"
                  type="text"
                  name="businessName"
                />
              </div>
              <div className={`${isEmpty || nan ? "error" : ""}`}>
                <label htmlFor="phone">Phone</label>
                <input
                  placeholder="65 9123 4567"
                  type="tel"
                  name="phone"
                  onChange={(e) => {
                    setNumberInput(e.target.value);
                  }}
                />
                <div>
                  {isEmpty && <p>Requierd field</p>}
                  {nan && <p>Invalid phone number</p>}
                </div>
              </div>
            </div>
            <div className="form-btn-block">
              <MainButton
                classnaming="send-form-btn"
                name="Submit"
                type="submit"
              />
              <div>
                <p>No spam, promise</p>
                <img src={handsSVG} alt="hands" />
              </div>
            </div>
          </>
        )}
      </form>
    </div>
  );
}
