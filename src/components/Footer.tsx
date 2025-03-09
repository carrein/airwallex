import styled from "styled-components";

// A footer that is always on the bottom of the window.
export const Footer = styled.div`
  padding: ${({ theme }) => theme.spacing.medium};
  display: flex;
  border-bottom: 1px solid ${({ theme }) => theme.colors.secondary};
`;
