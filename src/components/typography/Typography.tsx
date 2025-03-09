import styled, { css } from "styled-components";

const BaseTypography = css`
  font-weight: normal;
  margin: 0;
  color: #182121;
`;

export const Title = styled.h1`
  font-size: 3rem;
  ${BaseTypography}
`;

export const Paragraph = styled.span`
  font-size: 2rem;
  ${BaseTypography}
`;

export const Petite = styled.span`
  ${BaseTypography}
  font-size: 16px;
`;

export const Tiny = styled.span`
  ${BaseTypography}
  font-size: 12px;
`;

export const Brand = styled(Paragraph)`
  color: #365050;
`;
