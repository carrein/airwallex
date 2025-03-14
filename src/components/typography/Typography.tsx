import styled, { css } from "styled-components";

// Reset default HTML typography styling.
const BaseTypography = css`
  font-weight: normal;
  margin: 0;
  color: ${({ theme }) => theme.colors.primary};
`;

export const Title = styled.h1`
  ${BaseTypography}
  font-size: 4rem;
`;

export const Subtitle = styled.h2`
  ${BaseTypography}
  font-size: 2rem;
`;

export const Petite = styled.span`
  ${BaseTypography}
  font-size: 1rem;
`;

export const Label = styled.label`
  ${BaseTypography}
  font-size: 1.2rem;
  font-weight: 700;
  letter-spacing: 1.2px;
`;

export const Error = styled.span`
  ${BaseTypography}
  font-size: 1rem;
  color: ${({ theme }) => theme.colors.error};
`;
