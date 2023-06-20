import React from "react";
import Button from "../Button/Button";
import { IndividualFooterInterface } from "../../types/types";

import "./IndividualFooter.scss";
import ButtonFooter from "../styles/ButtonFooter.styled";

export default function IndividualFooter({
  to,
  border,
}: IndividualFooterInterface) {
  return (
    <ButtonFooter border={border}>
      <Button to={to} />
    </ButtonFooter>
  );
}
