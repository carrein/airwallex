import styled from "styled-components";
import { BaseModal } from "../BaseModal";
import { ModalCloseButton } from "./ModalCloseButton";

// Bind modal for accessibility.
BaseModal.setAppElement("#root");

export const Modal = ({
  children,
  onRequestClose,
  ...rest
}: ReactModal.Props) => {
  return (
    <BaseModal onRequestClose={onRequestClose} {...rest}>
      <ModalHeader>
        <ModalCloseButton onClick={onRequestClose}>✘</ModalCloseButton>
      </ModalHeader>
      {children}
    </BaseModal>
  );
};

const ModalHeader = styled.div`
  display: flex;
  justify-content: flex-end;
`;
