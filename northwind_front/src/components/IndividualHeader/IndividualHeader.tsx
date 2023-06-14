import React from "react";
import { FlexWrapper } from "../styles/FlexWrappers.styled";

import "./IndividualHeader.scss";

export default function IndividualHeader({ info }: { info: string }) {
  return (
    <FlexWrapper className="info-header" align="center">
      <span className="material-icons">ballot</span>
      <p>{info}</p>
    </FlexWrapper>
  );
}
