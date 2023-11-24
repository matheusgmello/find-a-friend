export interface Region {
  id: number
  nome: string
  sigla: string
}

export interface State {
  id: number
  sigla: string
  nome: string
  regiao: Region
}

export interface City {
  code: string
  name: string
}

export interface Coordinates {
  latitude: string
  longitude: string
}

export interface ResponseCoordinates {
  address: string
  coordinates: Coordinates
}
