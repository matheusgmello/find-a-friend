import { api } from '@/lib/axios'
import {
  AdoptionPetRequirementsResponse,
  AdoptionRequirements,
  CompletePet,
  Pet,
  PetAge,
  PetGallery,
  PetIndependence,
  PetParams,
  PetSize,
  PetType,
} from '@/models/interfaces/Pet'
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from 'react'
import { UserContext } from './UserContext'
import { AlertContext } from './AlertContext'
import {
  ResponsePetUniqueGalleryUrl,
  ResponsePetUrl,
  ResponseUniquePetUrl,
} from '@/models/interfaces/ApiResponse'
import { AxiosResponse } from 'axios'
import { Coordinates, ResponseCoordinates } from '@/models/interfaces/Location'

interface PetContextProviderProps {
  children: ReactNode
}

interface PetContextProps {
  adoptionRequirements: AdoptionRequirements[]
  isSubmitting: boolean
  orgCoords: Coordinates
  petQuery: PetParams
  currentPet: CompletePet
  currentPetGallery: PetGallery[]
  pets: Pet[]
  changePetAge: (age: PetAge) => void
  changePetIndependence: (independence: PetIndependence) => void
  changePetEnergy: (energy: number) => void
  changePetSize: (size: PetSize) => void
  changePetType: (type: PetType) => void
  getUniquePet: (id: string) => Promise<void>
  getPetGallery: (id: string) => Promise<string>
}

export const PetContext = createContext({} as PetContextProps)

export function PetContextProvider({ children }: PetContextProviderProps) {
  const [age, setAge] = useState('' as PetAge)
  const [independence, setIndependence] = useState('' as PetIndependence)
  const [energy, setEnergy] = useState<number>()
  const [size, setSize] = useState('' as PetSize)
  const [type, setType] = useState('' as PetType)
  const [pets, setPets] = useState([] as Pet[])
  const [orgCoords, setOrgCoords] = useState({} as Coordinates)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [currentPet, setCurrentPet] = useState({} as CompletePet)
  const [currentPetGallery, setCurrentPetGallery] = useState<PetGallery[]>([])
  const [adoptionRequirements, setAdoptionRequirements] = useState<
    AdoptionRequirements[]
  >([])
  const { user } = useContext(UserContext)
  const { alertDispatch } = useContext(AlertContext)
  function changePetAge(age: PetAge) {
    setAge(age)
  }
  function changePetIndependence(independence: PetIndependence) {
    setIndependence(independence)
  }
  function changePetEnergy(energy: number) {
    setEnergy(energy)
  }
  function changePetSize(size: PetSize) {
    setSize(size)
  }
  function changePetType(type: PetType) {
    setType(type)
  }

  async function getUniquePet(id: string) {
    try {
      const response: AxiosResponse<ResponseUniquePetUrl> = await api.get(
        `/pets/show/${id}`,
      )
      await getPetRequirements(response.data.pet.id)
      await getPetOrgCoordinates(response.data.pet.org.cep)
      setCurrentPet(response.data.pet)
    } catch (error) {
      console.log(error)

      alertDispatch({
        description: 'Buscar informações do pet',
        action: 'error',
        title: 'Erro',
      })
    }
  }

  async function getPetRequirements(petId: string) {
    try {
      const response: AxiosResponse<AdoptionPetRequirementsResponse> =
        await api.get(`/pets/adoption-requirements/${petId}`)
      setAdoptionRequirements(response.data.adoption_requirements)
      return response.data.adoption_requirements
    } catch (error) {
      console.log(error)
      alertDispatch({
        description: 'Buscar requerimentos de adoção',
        action: 'error',
        title: 'Erro',
      })
    }
  }

  async function getPetGallery(id: string) {
    try {
      const response: AxiosResponse<ResponsePetUniqueGalleryUrl> =
        await api.get(`/pets/gallery/${id}`)

      setCurrentPetGallery(response.data.pet_gallery)
      return response.data.pet_gallery[0].photo_url
    } catch (error) {
      console.log(error)

      alertDispatch({
        description: 'Buscar fotos do pet',
        action: 'error',
        title: 'Erro',
      })
    }
  }

  async function getPetOrgCoordinates(cep: string) {
    try {
      const response: AxiosResponse<ResponseCoordinates> = await api.get(
        `/location/coordinates/${cep}`,
      )

      setOrgCoords(response.data.coordinates)
      return response.data
    } catch (error) {
      console.log(error)
      alertDispatch({
        description: 'Carregar google maps',
        action: 'error',
        title: 'Erro',
      })
    }
  }

  useEffect(() => {
    async function getPets() {
      try {
        setIsSubmitting(true)
        const response: AxiosResponse<ResponsePetUrl> = await api.get(
          `/pets/${user.city ?? 'Sao Paulo'}`,
          {
            params: {
              age,
              independence,
              energy: energy === 0 ? null : energy,
              size,
              type,
            },
          },
        )
        setPets(response.data.pets)
        setIsSubmitting(false)
      } catch (error) {
        alertDispatch({
          action: 'error',
          description: 'Não foi possível carregar os pets!',
          title: 'Falha',
        })
      } finally {
        setIsSubmitting(false)
      }
    }
    getPets()
  }, [age, independence, energy, size, type, user])

  return (
    <PetContext.Provider
      value={{
        adoptionRequirements,
        orgCoords,
        currentPet,
        currentPetGallery,
        isSubmitting,
        pets,
        petQuery: {
          age,
          energy,
          independence,
          size,
          type,
        },
        changePetAge,
        changePetEnergy,
        changePetIndependence,
        changePetSize,
        changePetType,
        getPetGallery,
        getUniquePet,
      }}
    >
      {children}
    </PetContext.Provider>
  )
}
