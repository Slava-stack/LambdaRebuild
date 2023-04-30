import React, { useState } from "react";

import "./FAQ.scss";
import minusSVG from "./images/minus.svg";
import plusSVG from "./images/plus.svg";

export default function FAQ({ question, answer, isLast }) {
  const [isQuestionExpanded, setIsQuestionExpanded] = useState(false);

  function answerHandle() {
    setIsQuestionExpanded((isQuestionExpanded) => !isQuestionExpanded);
  }

  return (
    <div className={`question-block ${isQuestionExpanded ? "expanded" : ""}`}>
      <p className="question">{question}</p>
      <img
        src={isQuestionExpanded ? minusSVG : plusSVG}
        alt="answer button"
        onClick={answerHandle}
      />
      {isQuestionExpanded && <p className="answer">{answer}</p>}
      {isLast && <hr />}
    </div>
  );
}
