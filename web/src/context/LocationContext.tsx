import { api } from '@/lib/axios'
import { City, State } from '@/models/interfaces/Location'
import { OptionsProps } from '@/models/interfaces/Select'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { AlertContext } from './AlertContext'
import {
  ResponseLocationCities,
  ResponseLocationStates,
} from '@/models/interfaces/ApiResponse'
import { AxiosResponse } from 'axios'
interface LocationContextProviderProps {
  children: ReactNode
}

interface LocationContextProps {
  states: OptionsProps[]
  cities: OptionsProps[]
  getCitiesByState: (state: string) => void
}

export const LocationContext = createContext({} as LocationContextProps)

export function LocationContextProvider({
  children,
}: LocationContextProviderProps) {
  const { alertDispatch } = useContext(AlertContext)
  const [states, setStates] = useState<OptionsProps[]>([])
  const [cities, setCities] = useState<OptionsProps[]>([])
  async function getStates() {
    try {
      const response: AxiosResponse<ResponseLocationStates> = await api.get(
        '/location/states',
      )
      const treatedResponse = response.data.states.map((state: State) => {
        return {
          value: state.sigla,
          label: state.nome,
        }
      })
      setStates(treatedResponse)
    } catch (error) {
      alertDispatch({
        action: 'error',
        description: 'Carregamento dos estados',
        title: 'Erro',
      })
    }
  }
  async function getCitiesByState(state: string) {
    try {
      setCities([])
      const response: AxiosResponse<ResponseLocationCities> = await api.get(
        `/location/citys/${state}`,
      )

      const treatedResponse = response.data.citys.map((city: City) => {
        return {
          value: city.name,
          label: city.name,
        }
      })
      setCities(treatedResponse)
    } catch (error) {
      alertDispatch({
        action: 'error',
        description: 'Sigla de UF inválida',
        title: 'Erro ao carregar cidades!',
      })
    }
  }

  useEffect(() => {
    getStates()
  }, [])

  return (
    <LocationContext.Provider
      value={{
        cities,
        states,
        getCitiesByState,
      }}
    >
      {children}
    </LocationContext.Provider>
  )
}
