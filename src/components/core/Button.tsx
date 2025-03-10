import styled, { keyframes } from "styled-components";
import { BaseButton } from "../BaseButton";

type ButtonProps = {
  isLoading?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ isLoading = false, ...rest }: ButtonProps) => {
  if (isLoading)
    return (
      <BaseButton>
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

// Styled component for the loader
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
