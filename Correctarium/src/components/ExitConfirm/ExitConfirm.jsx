import React from "react";

import "./ExitConfirm.scss";

function ExitConfirm(props) {
  return (
    <div className="close-background">
      <div className="close-window">
        <h3>Скасувати замовлення?</h3>
        <div className="close-block" onClick={props.finalNotClose}>
          <div className="close-button"></div>
        </div>
        <p>
          Закривши цю сторінку, ви скасуєте заказ і зміни не зберігатися. Ви
          впевнені?
        </p>
        <div className="buttons">
          <button className="yes-choice" onClick={props.finalClose}>
            Так, скасувати
          </button>
          <button className="no-choice" onClick={props.finalNotClose}>
            Ні, залишитися
          </button>
        </div>
      </div>
    </div>
  );
}

export default ExitConfirm;
