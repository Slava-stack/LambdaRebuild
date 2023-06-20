import styled from "styled-components";
import { StyledFlexWrapper } from "../../types/types";

export const FlexWrapper = styled.div<StyledFlexWrapper>`
  display: flex;
  flex-direction: ${({ direction }) => direction || "row"};
  align-items: ${({ align }) => align || "stretch"};
  justify-content: ${({ justify }) => justify || "stretch"};
  position: ${({ position }) => position || "static"};
  inset: ${({ inset }) => inset || "auto"};
  margin: ${({ margin }) => margin || "0"};
`;

export const AsideWrapper = styled(FlexWrapper)`
  background: #edf2f6;
  height: 100%;
  width: 15rem;
  background: rgb(31 41 55);
`;

export const FlexWrapper100Width = styled(FlexWrapper)`
  width: 100%;
  background: #f9fafb;
`;
