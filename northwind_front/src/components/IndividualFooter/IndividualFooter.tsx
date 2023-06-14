import React from "react";
import Button from "../Button/Button";

import "./IndividualFooter.scss";

export default function IndividualFooter({ to }: { to: string }) {
  return (
    <div className="info-footer">
      <Button to={to} />
    </div>
  );
}
