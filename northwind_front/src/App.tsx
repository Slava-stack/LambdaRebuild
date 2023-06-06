import React from "react";
import "./assets/App.scss";
import { RouterProvider } from "react-router-dom";
import setRouter from "./router/Router";

const router = setRouter();

function App() {
  return (
    <div className="app">
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
