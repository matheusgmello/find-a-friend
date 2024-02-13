import styled from 'styled-components'

export const Container = styled.aside`
  position: fixed;
  top: 0;
  left: 0;
  bottom: 0;
  width: 6rem;
  padding: 2rem 1.5rem;
  background-color: ${({ theme }) => theme.colors.primary};
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  > button {
    width: 48px;
    height: 48px;
  }

  @media (max-width: 768px) {
    width: 3rem;
    padding: 0.75rem 0.5rem;

    > button {
      width: 32px;
      height: 32px;
    }
  }
`
