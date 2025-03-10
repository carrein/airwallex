import styled from "styled-components";
import Cover from "../../background/cover.webp";

// The UI should occupy the full height of the screen.
export const Layout = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  background-image: url(${Cover});
  background-size: cover;
`;
