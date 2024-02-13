import styled from 'styled-components'

export const Container = styled.button`
  width: 60px;
  height: 60px;
  display: flex;
  justify-content: center;
  align-items: center;

  background-color: #f4d35e;
  border: none;
  border-radius: 20px;
  transition: filter 0.2s;

  img {
    width: 22px;
  }

  :hover {
    filter: brightness(0.9);
  }

  :disabled {
    opacity: 0.5;
    cursor: not-allowed;
    pointer-events: none;
  }
`
