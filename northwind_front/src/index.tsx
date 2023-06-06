import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";

import "./assets/index.scss";
import "./fonts/Helvetica/Helvetica.ttf";
import "./fonts/Urbanist/static/Urbanist-Regular.ttf";
import Global from "./components/styles/Global.styled";

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  // <React.StrictMode>
  <>
    <Global />
    <App />
  </>
  // </React.StrictMode>
);
