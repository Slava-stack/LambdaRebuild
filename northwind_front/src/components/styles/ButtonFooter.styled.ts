import styled from "styled-components";

const ButtonFooter = styled.div<{ border?: string }>`
  border-top: ${({ border }) => border || "1px solid #e5e7eb"};
  background-color: #fff;
  padding: 1.5rem;
  border-radius: 0 0 0.25rem 0.25rem;
`;

export default ButtonFooter;
