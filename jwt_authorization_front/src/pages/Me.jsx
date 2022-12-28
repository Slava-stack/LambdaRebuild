import React, { useEffect, useState } from "react";
import AuthService from "../service/authService";
import logout from "../service/logout";

import "./Me.scss";

function Me() {
  const [isProgress, setIsProgress] = useState(true);

  useEffect(() => {
    AuthService.me().then((resp) => {
      if (resp.data?.body?.message === "token is valid") {
        setIsProgress(() => false);
      }
    });
  }, []);

  if (isProgress) {
    return (
      <div>
        <p onClick={logout} className="logout">
          logout
        </p>
        <main>
          <h1>In progress...</h1>
        </main>
      </div>
    );
  }

  return (
    <div>
      <p onClick={logout} className="logout">
        logout
      </p>
      <main>
        <h1>Token is valid!</h1>
      </main>
    </div>
  );
}

export default Me;
