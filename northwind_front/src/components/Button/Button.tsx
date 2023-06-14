import React from "react";
import { Link } from "react-router-dom";
import "./Button.scss";

export default function Button({ to }: { to: string }) {
  return (
      <Link to={to} className="btn">
        <button>Go back</button>
      </Link>
  );
}
