import styled from "styled-components";
import { Column } from "../layout/Column";
import { Petite } from "../typography/Typography";

// A footer that is always on the bottom of the window.
export const Footer = () => {
  return (
    <Content>
      <FooterColumn>
        <StyledPetite>Made with ♥️ in Singapore.</StyledPetite>
        <StyledPetite>All rights reserved © 2025 Broccoli & Co.</StyledPetite>
      </FooterColumn>
    </Content>
  );
};

export const Content = styled.div`
  padding: ${({ theme }) => theme.spacing.large};
`;

const FooterColumn = styled(Column)`
  align-items: center;
  justify-content: center;
`;

const StyledPetite = styled(Petite)`
  color: ${({ theme }) => theme.colors.white};
`;
