export type AgeOptions = 'cub' | 'adolescent' | 'elderly'
export type EnergyOptions = 1 | 2 | 3 | 4 | 5
export type IndependenceOptions = 'low' | 'medium' | 'high'
export type PetTypeOptions = 'dog' | 'cat'
export type SizeOptions = 'small' | 'medium' | 'large'
export type PetTypeSearchOptions = 'all' | 'cat' | 'dog'

export type Org = {
  id: string
  nome: string
  address: string
  cep: string
  whatsappNumber: string
}

export type PetRequirement = {
  id: string
  title: string
  petId: string
}

export type PetDetail = {
  id: string
  name: string
  description: string
  city: string
  age: AgeOptions
  energy: EnergyOptions
  size: SizeOptions
  independence: IndependenceOptions
  type: PetTypeOptions
  photo: string
  orgId: string
  org: Org
  photo_url: string
}

export type PetGallery = {
  id: string
  image: string
  petId: string
  photo_url: string
}

export type SearchFilters = {
  age: string
  city: string
  energy: string
  independence: string
  size: string
  type: PetTypeSearchOptions
}

export type ResponsePet = {
  pet: PetDetail
}

export type ResponsePetGallery = {
  pet_gallery: PetGallery[]
}

export type ResponsePetRequirements = {
  adoption_requirements: PetRequirement[]
}

export type ResponsePets = {
  pets: PetDetail[]
}
