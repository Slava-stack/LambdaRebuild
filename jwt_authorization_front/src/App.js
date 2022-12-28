import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";

import SignUp from "./pages/SignUp";
import Login from "./pages/Login";
import Me from "./pages/Me";
import "./App.scss";

function App() {
  const isLogged = localStorage.getItem("loggedIn");

  return (
    <div className="App">
      <Switch>
        <Route path="/signup">
          {isLogged && <Redirect to="/me" />}
          <SignUp />
        </Route>
        <Route path="/login">
          {isLogged && <Redirect to="/me" />}
          <Login />
        </Route>
        <Route path="/me">
          {!isLogged && <Redirect to="/login" />}
          <Me />
        </Route>
      </Switch>
    </div>
  );
}

export default App;
