import React, { useState } from "react";
import AuthService from "../service/authService";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import Header from "../components/Header/Header";

import "./PageStyling.scss";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submitHandler(event) {
    event.preventDefault();
    const { statusCode } = await AuthService.login(email, password);

    if (statusCode === 200) {
      localStorage.setItem("loggedIn", true);
      // localStorage.setItem("accessToken", access_token);
      // localStorage.setItem("refreshToken", refresh_token);
      window.location.href = "/me";
    }
  }

  return (
    <div>
      <Header redirectionPath={"signup"} buttonName={"sign up"} />
      <main>
        <form onSubmit={submitHandler}>
          <Input
            emailHandler={setEmail}
            emailValue={email}
            passwordHandler={setPassword}
            passwordValue={password}
          />
          <Button buttonName="sign in" />
        </form>
      </main>
    </div>
  );
}

export default Login;
