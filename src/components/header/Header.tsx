import styled from "styled-components";
import { Subtitle } from "../typography/Typography";

// A fixed header that is always on top of the window.
export const Header = () => {
  return (
    <StyledHeader>
      <Brand>Broccoli & Co.</Brand>
    </StyledHeader>
  );
};

export const StyledHeader = styled.div`
  display: flex;
  padding: ${({ theme }) => theme.spacing.medium};
`;

const Brand = styled(Subtitle)`
  color: ${({ theme }) => theme.colors.white};
`;
