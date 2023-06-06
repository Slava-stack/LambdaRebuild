import { styled } from "styled-components";
import { ColumnsFlexWrapperInterface } from "../../types/types";

const StyledColumnsFlexWrapper = styled.div<ColumnsFlexWrapperInterface>`
  background: #edf2f669;
  border-radius: 15px;
  padding: 10px;
  columns: ${({ columns }) => columns || "unset"};
  width: ${({ width }) => width || "100%"};

  div {
    margin-bottom: 15px;

    .p-header {
      font-weight: 600;
      margin-bottom: 3px;
    }

    a {
      text-decoration: none;
      color: #207ec4b3;
      font-weight: 600;
    }
  }

  @media (max-width: 1023px) {
    width: 100%;
  }
`;

export default StyledColumnsFlexWrapper;
