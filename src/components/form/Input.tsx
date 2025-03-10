import styled from "styled-components";
import { BaseInput } from "../BaseInput";
import { Error } from "../Error";
import { Column } from "../layout/Column";
import { Label } from "../typography/Typography";

type InputProps = {
  id: string;
  label: string;
  errorMessage?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

export const Input = ({
  id,
  label,
  required,
  errorMessage,
  ...rest
}: InputProps) => {
  return (
    <StyledInput>
      <StyledLabel htmlFor={id}>
        {label} {required && <Required>*</Required>}
      </StyledLabel>
      <BaseInput required={required} {...rest} />
      {errorMessage && <Error>{errorMessage}</Error>}
    </StyledInput>
  );
};

const StyledInput = styled(Column)`
  gap: ${({ theme }) => theme.spacing.small};
`;

const StyledLabel = styled(Label)`
  color: ${({ theme }) => theme.colors.primary};
`;

const Required = styled.span`
  color: ${({ theme }) => theme.colors.error};
`;
