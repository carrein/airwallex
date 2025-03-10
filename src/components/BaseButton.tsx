import styled from "styled-components";

// Base button component. Opt to compose this component instead of using it directly.
export const BaseButton = styled.button`
  background-color: ${({ theme }) => theme.colors.secondary};
  color: ${({ theme }) => theme.colors.primary};
  border: none;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  font-weight: 700;
  padding: 0.75rem 1.65rem;
  width: 100%;
  max-width: 300px;
  cursor: pointer;
  transform: rotate(-2deg);
  user-select: none;
  touch-action: manipulation;
  min-height: 52px;

  &:focus {
    outline: none;
  }

  &::after {
    content: "";
    position: absolute;
    border: 2px solid ${({ theme }) => theme.colors.primary};
    bottom: 4px;
    left: 4px;
    width: calc(100% - 1px);
    height: calc(100% - 1px);
  }

  &:hover::after {
    bottom: 2px;
    left: 2px;
  }

  &:disabled {
    cursor: not-allowed;
    background-color: ${({ theme }) => theme.colors.grey};
  }

  &:disabled::after {
    bottom: 2px;
    left: 2px;
    border: 2px solid ${({ theme }) => theme.colors.primary};
  }
`;
