import { createGlobalStyle } from "styled-components";
import GoudyBookletter1911 from "../fonts/GoudyBookletter1911.otf";

export const GlobalStyles = createGlobalStyle`
  @font-face {
    font-family: "GoudyBookletter1911";
    src: url(${GoudyBookletter1911}) format('opentype');
    font-weight: normal;
    font-style: normal;
  }

  html,
  body {
    padding: 0;
    margin: 0;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  * {
    font-family: "GoudyBookletter1911", sans-serif;
  }
`;
