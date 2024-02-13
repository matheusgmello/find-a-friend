import { useCallback, useEffect, useState } from 'react'

import {
  Coordinates,
  ResponseCity,
  ResponseState,
  SelectOptions,
} from '@/models/location'
import { api } from '@/services/http'

export function useCitys(state?: string) {
  const [citys, setCitys] = useState<SelectOptions[]>([])

  const loadCitys = useCallback(async () => {
    if (!state) return
    const { data } = await api.get<ResponseCity>(`/location/citys/${state}`)
    const dataMapped = data.citys
      .map((city) => ({
        label: city.name,
        value: city.name,
      }))
      .sort((a, b) => a.label.localeCompare(b.label))
    setCitys(dataMapped)
  }, [state])

  useEffect(() => {
    loadCitys()
  }, [loadCitys])

  return citys
}

export function useCoordinates(cep?: string) {
  const [coordinates, setCoordinates] = useState<Coordinates>({} as Coordinates)

  const getCoordinatesByCep = useCallback(async () => {
    if (!cep || cep.length < 8) return
    const { data } = await api.get<{
      coordinates: { latitude: string; longitude: string }
    }>(`/location/coordinates/${cep}`)

    setCoordinates({
      latitude: Number(data.coordinates.latitude),
      longitude: Number(data.coordinates.longitude),
    })
  }, [cep])

  useEffect(() => {
    getCoordinatesByCep()
  }, [cep, getCoordinatesByCep])

  return coordinates
}

export function useStates() {
  const [states, setStates] = useState<SelectOptions[]>([])

  const loadStates = useCallback(async () => {
    const { data } = await api.get<ResponseState>('/location/states')
    const dataMapped = data.states
      .map((state) => ({
        label: state.sigla,
        value: state.sigla,
      }))
      .sort((a, b) => a.label.localeCompare(b.label))
    setStates(dataMapped)
  }, [])

  useEffect(() => {
    loadStates()
  }, [loadStates])

  return states
}
