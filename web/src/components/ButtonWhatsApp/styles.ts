import styled from 'styled-components'

export const Container = styled.a`
  text-decoration: none;
  font-weight: 800;
  font-size: 18px;
  line-height: 26px;
  color: ${({ theme }) => theme.colors.text};
  background-color: #3cdc8c;
  border: none;
  border-radius: 15px;
  width: 100%;
  padding: 18px 24px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
`
