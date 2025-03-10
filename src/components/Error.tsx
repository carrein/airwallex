import styled from "styled-components";
import { Petite } from "./typography/Typography";

export const Error = styled(Petite)`
  color: ${({ theme }) => theme.colors.error};
`;
