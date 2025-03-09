import styled from "styled-components";

// Styled button component
export const Button = styled.button`
  background-color: ${({ theme }) => theme.colors.secondary};
  border: 0 solid #e5e7eb;
  box-sizing: border-box;
  color: ${({ theme }) => theme.colors.primary};
  display: flex;
  font-size: 1rem;
  font-weight: 700;
  justify-content: center;
  line-height: 1.75rem;
  padding: 0.75rem 1.65rem;
  position: relative;
  text-align: center;
  text-decoration: none; /* Removed invalid text-decoration value */
  width: 100%;
  max-width: 360px;
  cursor: pointer;
  transform: rotate(-2deg);
  user-select: none;
  -webkit-user-select: none;
  touch-action: manipulation;

  &:focus {
    outline: 0;
  }

  &::after {
    content: "";
    position: absolute;
    border: 2px solid white;
    bottom: 4px;
    left: 4px;
    width: calc(100% - 1px);
    height: calc(100% - 1px);
  }

  &:hover::after {
    bottom: 2px;
    left: 2px;
  }

  @media (min-width: 768px) {
    padding: 0.75rem 3rem;
    font-size: 1.25rem;
  }
`;
