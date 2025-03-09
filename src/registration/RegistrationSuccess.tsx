/// <reference types="vite-plugin-svgr/client" />
import styled from "styled-components";
import { Column } from "../components/layout/Column";
import { Petite, Title } from "../components/typography/Typography";
import SuccessSvg from "../svgs/success.svg?react";

export const RegistrationSuccess = () => {
  return (
    <StyledColumn>
      <SuccessSvg />
      <Title>All set!</Title>
      <Petite>
        You'll get an email invitation when our product launches. <br /> Thank
        you for your interest in Broccoli & Co.
      </Petite>
    </StyledColumn>
  );
};

const StyledColumn = styled(Column)`
  gap: ${({ theme }) => theme.spacing.small};
`;
