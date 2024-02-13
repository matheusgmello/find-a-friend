export type Coordinates = {
  latitude: number
  longitude: number
}

export type City = {
  name: string
  code: string
}

export type SelectOptions = {
  value: string | number
  label: string
}

export type State = {
  nome: string
  sigla: string
}

export type ResponseState = {
  states: State[]
}

export type ResponseCity = {
  citys: City[]
}
