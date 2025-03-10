import styled from "styled-components";
import { Subtitle } from "../typography/Typography";

// A fixed header that is always on top of the window.
export const Header = () => {
  return (
    <Content>
      <Brand>Broccoli & Co.</Brand>
    </Content>
  );
};

export const Content = styled.div`
  padding: ${({ theme }) => theme.spacing.medium};
`;

const Brand = styled(Subtitle)`
  color: ${({ theme }) => theme.colors.white};
`;
