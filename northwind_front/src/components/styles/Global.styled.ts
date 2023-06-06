import { createGlobalStyle } from "styled-components";

const Global = createGlobalStyle`
*,
*::after, 
*::after {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  list-style: none;
  font-family: "Helvetica", "Urbanist";
}`;

export default Global;
