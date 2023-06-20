import React from "react";
import useLayoutStore from "../../store/overlay";
import headerHamStore from "../../store/headerHam";

import "./Overlay.scss";

export default function Overlay() {
  const { setShowHam } = headerHamStore();
  const { showLayout, setShowLayout } = useLayoutStore();

  const overlayHandler = () => {
    setShowLayout(false);
    setShowHam(false);
    document.body.style.overflow = "";
  };

  return (
    <>{showLayout && <div className="overlay" onClick={overlayHandler} />}</>
  );
}
