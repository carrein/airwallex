import styled from "styled-components";

export const BaseInput = styled.input`
  font-size: 1.2rem;
  padding: ${({ theme }) => theme.spacing.small};
  border: 2px solid ${({ theme }) => theme.colors.primary};

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.tertiary};
    outline-offset: 2px;
  }
`;
