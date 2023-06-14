import { createGlobalStyle } from "styled-components";

const Global = createGlobalStyle`
*,
*::after, 
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
  font-family: "system-ui", "ui-sans-serif";
  font-size: 1rem;
}

main{
  padding: 1.5rem;
}`;

export default Global;
