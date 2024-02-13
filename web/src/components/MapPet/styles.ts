import styled from 'styled-components'

export const MapOrgContainer = styled.div`
  border-radius: 20px;
  width: 100%;
  height: 290px;
  max-width: 560px;
  background-color: ${({ theme }) => theme.colors.secondary};

  display: grid;
  grid-template-columns: 1fr;
  grid-template-rows: 1fr auto;

  .leaflet-container {
    border-radius: 20px;
  }
`
