import styled from "styled-components";

const IndividualContainer = styled.div`
  background-color: #fff;
  display: grid;
  // grid-template-columns: 50% 50%;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 1rem;
  padding: 1.5rem;

  .field {
    margin-bottom: 0.75rem;

    a {
      text-decoration: none;
      color: #2563eb;
      line-height: 24px;
    }

    p:first-child {
      margin-bottom: 0.5rem;
      font-weight: 700;
      line-height: 24px;
    }

    p:last-child {
      line-height: 24px;
    }

    &:last-child {
      margin-bottom: 0;
    }
  }
`;

export default IndividualContainer;
