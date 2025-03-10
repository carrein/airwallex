import styled from "styled-components";

// Base input component. Opt to compose this component instead of using it directly.
export const BaseInput = styled.input`
  font-size: 1.2rem;
  padding: ${({ theme }) => theme.spacing.small};
  border: 2px solid ${({ theme }) => theme.colors.primary};

  &:focus {
    outline: 2px solid ${({ theme }) => theme.colors.tertiary};
    outline-offset: 2px;
  }
`;
