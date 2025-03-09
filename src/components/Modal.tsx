import ReactModal from "react-modal";
import styled from "styled-components";

export const Modal = styled(ReactModal)`
  &.ReactModal__Content {
    position: absolute;
    top: 20%;
    left: 20%;
    right: 20%;
    bottom: 20%;
  }
  background: ${({ theme }) => theme.colors.background};
  border: 2px solid #182121;
  padding: 24px;
`;
