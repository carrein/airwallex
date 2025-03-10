import ReactModal from "react-modal";
import styled from "styled-components";

export const BaseModal = styled(ReactModal)`
  &.ReactModal__Content {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
  background: ${({ theme }) => theme.colors.white};
  border: 2px solid ${({ theme }) => theme.colors.primary};
  // Extra padding to optically balance modal close button and CTA.
  padding: ${({ theme }) =>
    `${theme.spacing.large} ${theme.spacing.xlarge} ${theme.spacing.xlarge} ${theme.spacing.xlarge}`};
  min-width: 250px;

  // Larger width allowance for wider screens.
  @media (min-width: 768px) {
    min-width: 450px;
  }
`;
