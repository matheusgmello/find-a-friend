import { City, State } from './Location'
import { CompletePet, Pet, PetGallery } from './Pet'

export interface ResponsePetUrl {
  pets: Pet[]
}

export interface ResponseUniquePetUrl {
  pet: CompletePet
}

export interface ResponseLocationCities {
  citys: City[]
}
export interface ResponsePetUniqueGalleryUrl {
  pet_gallery: PetGallery[]
}
export interface ResponseLocationStates {
  states: State[]
}

export interface ResponseError {
  error: string
}

export interface ResponseValidateToken {
  token: string
}
