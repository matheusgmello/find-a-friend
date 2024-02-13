import styled from 'styled-components'

import { hexToRgb } from '@/utils/hex-to-rgb'

export const AlertContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 0.75rem;
  padding: 12px 40px;
  color: ${({ theme }) => theme.colors.danger};
  border: 1px solid currentColor;
  border-radius: 15px;
  background-image: ${({ theme }) =>
    `linear-gradient(90deg, ${hexToRgb(
      `${theme.colors.danger}`,
      0.1,
    )}, ${hexToRgb(`${theme.colors.danger}`, 0)})`};

  span {
    flex-grow: 1;
  }

  button {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: ${({ theme }) => theme.colors.danger};
    color: ${({ theme }) => theme.colors.text};
    border: none;
    border-radius: 5px;
    width: 1.5rem;
    height: 1.5rem;

    &:hover,
    &:focus {
      filter: brightness(0.9);
    }
  }

  @media (max-width: 768px) {
    padding: 12px 20px;
  }
`
