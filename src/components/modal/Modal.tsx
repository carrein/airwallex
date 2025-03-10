import styled from "styled-components";
import { BaseModal } from "../BaseModal";
import { CloseButton } from "./CloseButton";

// Bind modal for accessibility.
if (process.env.NODE_ENV !== "test") BaseModal.setAppElement("#root");

export const Modal = ({
  children,
  onRequestClose,
  ...rest
}: ReactModal.Props) => {
  return (
    <BaseModal onRequestClose={onRequestClose} {...rest}>
      <ModalHeader>
        <CloseButton onClick={onRequestClose}>✘</CloseButton>
      </ModalHeader>
      {children}
    </BaseModal>
  );
};

const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
`;
