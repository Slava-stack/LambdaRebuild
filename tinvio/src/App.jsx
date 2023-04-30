import "./App.scss";
import React, { useState } from "react";
import { RouterProvider } from "react-router-dom";
import useWindowWidthResize from "./windowSizeHook/windowWidthHook";
import setRouter from "./router/Router";

function App() {
  const windowWidth = useWindowWidthResize();
  const [isMainShown, setIsMainShown] = useState(true);
  const [settings, setSettings] = useState("");
  const [isShownOverlay, setIsShownOverlay] = useState(false);
  const [infoValue, setInfoValue] = useState("PrivacyPolicy");

  const router = setRouter({
    windowWidth,
    isMainShown,
    setIsMainShown,
    settings,
    setSettings,
    isShownOverlay,
    setIsShownOverlay,
    infoValue,
    setInfoValue,
  });

  return (
    <div style={!isMainShown ? { overflow: "hidden" } : {}} className="App">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
