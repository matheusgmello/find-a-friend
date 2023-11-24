import { OrgsRepository } from '@/repositories/orgs-repository'
import { PetsRepository } from '@/repositories/pets-repository'
import { Pet } from '@prisma/client'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

export interface FetchPetsFilters {
  age?: string
  ambience?: string
  energy_level?: string
  level_independence?: string
  size?: string
}

interface FetchPetsByStateAndCityUseCaseRequest {
  city: string
  state: string
  filters?: FetchPetsFilters
}

interface FetchPetsByStateAndCityUseCaseResponse {
  pets: Pet[]
}

export class FetchPetsByStateAndCityUseCase {
  constructor(
    private orgsRepository: OrgsRepository,
    private petsRepository: PetsRepository,
  ) {}

  async execute({
    city,
    state,
    filters,
  }: FetchPetsByStateAndCityUseCaseRequest): Promise<FetchPetsByStateAndCityUseCaseResponse> {
    const orgs = await this.orgsRepository.findManyByStateAndCity({
      city,
      state,
    })

    if (orgs.length === 0) {
      throw new ResourceNotFoundError()
    }

    const pets = await this.petsRepository.findManyByOrgIds({
      orgIds: orgs.map((org) => org.id),
      filters,
    })

    return {
      pets,
    }
  }
}
