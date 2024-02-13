import styled from 'styled-components'

export const RateContainer = styled.li`
  padding: 1.5rem 1.125rem;
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: 15px;
  display: grid;
  grid-template-columns: 1fr;
  row-gap: 1rem;
`

export const RateSymbols = styled.div`
  height: 24px;
  display: flex;
  gap: 0.5rem;
  justify-content: flex-start;
  align-items: center;
`

export const RateLabel = styled.span`
  font-weight: 600;
  font-size: 18px;
  line-height: 100%;
`
