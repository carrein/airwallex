import styled from "styled-components";

// A fixed header that is always on top of the window.
export const Header = styled.div`
  padding: ${({ theme }) => theme.spacing.medium};
  display: flex;
  border-bottom: 1px solid #cdcfcf;
`;
