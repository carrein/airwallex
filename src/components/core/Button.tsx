import styled, { keyframes } from "styled-components";
import { BaseButton } from "../BaseButton";

type ButtonProps = {
  isLoading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

// Abstraction over BaseButton to support basic loading state.
export const Button = ({ isLoading = false, ...rest }: ButtonProps) => {
  if (isLoading)
    return (
      <BaseButton disabled>
        <Spinner />
      </BaseButton>
    );

  return <BaseButton {...rest} />;
};

const rotation = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

// Spinner can be divorced from this file if there is a use case for it without a button.
const Spinner = styled.div`
  width: 24px;
  height: 24px;
  border: 5px solid ${({ theme }) => theme.colors.primary};
  border-bottom-color: transparent;
  border-radius: 50%;
  display: inline-block;
  box-sizing: border-box;
  animation: ${rotation} 1s linear infinite;
`;
