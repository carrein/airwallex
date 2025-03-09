import styled, { css } from "styled-components";

const BaseTypography = css`
  font-weight: normal;
  margin: 0;
  color: ${({ theme }) => theme.colors.white};
`;

export const Title = styled.h1`
  ${BaseTypography}
  font-size: 4rem;
`;

export const Paragraph = styled.span`
  ${BaseTypography}
  font-size: 2rem;
`;

export const Petite = styled.span`
  ${BaseTypography}
  font-size: 1rem;
`;

export const Tiny = styled.span`
  ${BaseTypography}
  font-size: 1rem;
`;
