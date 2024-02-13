import styled from 'styled-components'

import { hexToRgb } from '@/utils/hex-to-rgb'

export const Container = styled.span`
  display: flex;
  align-items: center;
  max-width: max-content;
  gap: 0.5rem;
  padding: 12px 24px;
  border-radius: 15px;
  background-color: ${({ theme }) => hexToRgb(theme.colors.secondary, 0.05)};
`
