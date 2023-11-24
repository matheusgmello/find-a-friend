export type PetAge = 'cub' | 'adolescent' | 'elderly'
export type PetIndependence = 'low' | 'medium' | 'high'
export type PetSize = 'small' | 'medium' | 'big'
export type PetType = 'cat' | 'dog'
export type PetEnvironment = 'small' | 'medium' | 'large'
export interface PetParams {
  age: PetAge
  energy: number
  independence: PetIndependence
  size: PetSize
  type: PetType
}

export interface Pet {
  id: string
  name: string
  description: string
  city: string
  age: PetAge
  energy: number
  size: PetSize
  environment: PetEnvironment
  independence: PetIndependence
  type: PetType
  photo: string
  orgId: string
  photo_url: string
}

export interface PetOrg {
  id: string
  nome: string
  address: string
  cep: string
  whatsappNumber: string
}

export interface CompletePet extends Pet {
  org: PetOrg
}

export interface PetGallery {
  id: string
  image: string
  petId: string
  photo_url: string
}

export interface AdoptionRequirements {
  id: string
  title: string
  petId: string
}

export interface AdoptionPetRequirementsResponse {
  adoption_requirements: AdoptionRequirements[]
}
