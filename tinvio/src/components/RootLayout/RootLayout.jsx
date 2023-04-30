import React from "react";
import { Outlet } from "react-router-dom";

import "./RootLayout.scss";
import Header from "../Header/Header";
import Footer from "../Footer/Footer";
import Form from "../Form/Form";

export default function RootLayout({
  hamHandler,
  isMainShown,
  windowWidth,
  settings,
  isShownOverlay,
  setIsShownOverlay,
  setInfoValue,
}) {
  return (
    <>
      {isShownOverlay && (
        <div className="overlay-form">
          <Form setIsShownOverlay={setIsShownOverlay} isOverlayForm />
        </div>
      )}
      <Header
        hamHandler={hamHandler}
        windowWidth={windowWidth}
        isMainShown={isMainShown}
        settings={settings}
      />
      {isMainShown && <Outlet />}
      <Footer
        isMainShown={isMainShown}
        settings={settings}
        setInfoValue={setInfoValue}
      />
    </>
  );
}
