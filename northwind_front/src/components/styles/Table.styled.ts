import { styled } from "styled-components";

const StyledTable = styled.table`
  width: 90%;
  border-radius: 15px;
  background: #edf2f669;
  padding: 10px;

  thead {
    tr {
      th {
        padding: 0 0 10px 0;
        text-align: start;
      }
    }
  }

  tbody {
    tr {
      td {
        padding-bottom: 7px;

        a {
          text-decoration: none;
          color: #207ec4b3;
          font-weight: 600;

          &:visited {
            color: none;
          }
        }
      }
    }
  }

  @media (max-width: 799px) {
    width: 100%;
    display: block;

    thead {
      display: none;
    }

    tbody,
    tr,
    td {
      display: block;
    }

    tr {
      margin-bottom: 15px;
      border-bottom: 1px solid;

      &:last-child {
        margin-bottom: 0;
        border-bottom: unset;
      }
    }

    td {
      text-align: right;
      padding-left: 50%;
      position: relative;

      &::before {
        content: attr(data-label);
        position: absolute;
        left: 0;
        font-weight: 700;
        width: 50%;
        padding-left: 15px;
        text-align: left;
      }
    }
  }
`;

export default StyledTable;
