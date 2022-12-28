import React, { useState } from "react";
import Input from "../components/Input/Input";
import Button from "../components/Button/Button";
import Header from "../components/Header/Header";
import AuthService from "../service/authService";

import "./PageStyling.scss";

function SignUp() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  async function submitHandler(event) {
    event.preventDefault();
    const response = await AuthService.register(email, password);
    alert(response?.message);
  }

  return (
    <div>
      <Header redirectionPath={"login"} buttonName={"sign in"} />
      <main>
        <form onSubmit={submitHandler}>
          <Input
            emailHandler={setEmail}
            emailValue={email}
            passwordHandler={setPassword}
            passwordValue={password}
          />
          <Button
            buttonName="sign up"
            onClick={() => AuthService.register(email, password)}
          />
        </form>
      </main>
    </div>
  );
}

export default SignUp;
