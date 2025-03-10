import styled from "styled-components";

export const Body = styled.div`
  padding: 0 ${({ theme }) => theme.spacing.medium};
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;
