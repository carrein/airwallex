import styled from "styled-components";
import { BaseInput } from "../BaseInput";
import { Column } from "../layout/Column";
import { Error, Label } from "../typography/Typography";

type InputProps = {
  id: string;
  label: string;
  errorMessage?: string;
} & React.InputHTMLAttributes<HTMLInputElement>;

// Form input component that abstracts an input field with a label, styling and displaying optional errors.
export const Input = ({
  id,
  label,
  required = false,
  errorMessage,
  name,
  ...rest
}: InputProps) => {
  return (
    <Container>
      <StyledLabel htmlFor={id}>
        {label} {required && <Required>*</Required>}
      </StyledLabel>
      <BaseInput aria-label={name} required={required} name={name} {...rest} />
      {errorMessage && <Error>{errorMessage}</Error>}
    </Container>
  );
};

const Container = styled(Column)`
  gap: ${({ theme }) => theme.spacing.small};
`;

const StyledLabel = styled(Label)`
  color: ${({ theme }) => theme.colors.primary};
`;

const Required = styled.span`
  color: ${({ theme }) => theme.colors.error};
`;
