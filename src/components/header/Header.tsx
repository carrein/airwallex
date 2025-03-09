import styled from "styled-components";
import { Paragraph } from "../typography/Typography";

// A fixed header that is always on top of the window.
export const Header = () => {
  return (
    <StyledHeader>
      <Paragraph>Broccoli & Co.</Paragraph>
    </StyledHeader>
  );
};

export const StyledHeader = styled.div`
  display: flex;
  padding: ${({ theme }) => theme.spacing.medium};
`;
