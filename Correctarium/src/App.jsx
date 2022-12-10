import React, { useState, useEffect } from "react";
import InputField from "./components/InputField/InputField";
import DropdownChoice from "./components/DropdownChoice/DropdownChoice";
import TextUpload from "./components/TextUpload/TextUpload";
import LanguageDropdown from "./components/LanguageDropdown/LanguageDropdown";
import ExitConfirm from "./components/ExitConfirm/ExitConfirm";
import Footer from "./components/Footer/Footer";
import { calculateDate, getPriceAndHours } from "./logic/correctarium";
import RequiredInput from "./components/InputField/RequiredInput";

import "./App.scss";

const inputPlaceHolderEmail = "Ваша електронна пошта";
const inputPlaceHolder = ["Ваше ім’я", "Коментар або покликання"];

function App() {
  const [service, setService] = useState("");
  const [langServiceChoice, setLangServiceChoice] = useState("");
  const [textInput, setTextInput] = useState("");
  const [email, setEmail] = useState("");
  const [liftedStateFunc, setLiftedStateFunc] = useState();
  const [buttonActivation, setButtonActivation] = useState(true);
  const [exitConfirm, setExitConfirm] = useState(false);
  const [price, setPrice] = useState("0");
  const [tillDate, setTillDate] = useState("");

  function emailSetter(event) {
    setEmail(() => event.target.value);
  }

  function finalClose() {
    window.location.replace("https://www.google.com/_/chrome/newtab");
  }

  function finalNotClose() {
    setExitConfirm(() => false);
  }

  function userChoiseTranslate(choice) {
    setService(() => choice);
  }

  function userLangServiceChoice(choice) {
    setLangServiceChoice(() => choice);
  }

  function clearLangServiceChoice() {
    setLangServiceChoice(() => "");
  }

  function gohome() {
    if (email || textInput) {
      setExitConfirm(() => true);
    } else {
      window.location.replace("https://www.google.com/_/chrome/newtab");
    }
  }

  useEffect(() => {
    if (service && langServiceChoice && textInput && email) {
      setButtonActivation(() => true);
    } else {
      setButtonActivation(() => false);
    }
  }, [service, langServiceChoice, textInput, email]);

  useEffect(() => {
    if (textInput && langServiceChoice && service === "correctness") {
      const timePrice = getPriceAndHours(
        langServiceChoice,
        "none",
        textInput.length
      );
      timePrice.price = (+timePrice.price)
        .toFixed(2)
        .replace(".", ",")
        .replace(/,00$/, "");
      setPrice(() => timePrice.price);
      const date = calculateDate(timePrice.timeInHours);
      const splittedDate = date.date.split(" ");
      setTillDate(
        () =>
          `Термін здавання: ${splittedDate[0].substr(
            0,
            6
          )}${splittedDate[0].substr(-2)} о ${splittedDate[1].slice(0, 5)}`
      );
    }
    if (!textInput || !langServiceChoice || service !== "correctness") {
      setTillDate(() => "");
      setPrice(() => "0");
    }
  }, [service, langServiceChoice, textInput]);

  return (
    <div className="App">
      {exitConfirm && (
        <ExitConfirm finalNotClose={finalNotClose} finalClose={finalClose} />
      )}
      <form className="form">
        <div className="fill">
          <h1>Замовити переклад або редагування</h1>
          <DropdownChoice
            userChoice={userChoiseTranslate}
            setStateLangDropdown={liftedStateFunc}
            langServiceChoiceFoo={clearLangServiceChoice}
          />
          <TextUpload textSetter={setTextInput} />
          <div className="info">
            <RequiredInput
              placeHold={inputPlaceHolderEmail}
              key={inputPlaceHolderEmail}
              emailSetter={emailSetter}
            />
            {inputPlaceHolder.map((el) => (
              <InputField placeHold={el} key={el} />
            ))}
            <LanguageDropdown
              serviceChoice={service}
              langChoice={userLangServiceChoice}
              liftingStateFunc={setLiftedStateFunc}
            />
          </div>
        </div>
        <div className="make-order">
          <div className="close-block">
            <div className="close-button" onClick={gohome}></div>
          </div>
          <div className="price">
            <div className="number">{price}</div>
            <div className="currency">грн</div>
          </div>
          <div className="time">{tillDate}</div>
          <div className="button-block">
            <button
              className="submit-button"
              type="submit"
              disabled={!buttonActivation}
            >
              Замовити
            </button>
          </div>
        </div>
      </form>
      <Footer />
    </div>
  );
}

export default App;
