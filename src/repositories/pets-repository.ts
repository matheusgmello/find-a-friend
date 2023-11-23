import { FetchPetsFilters } from '@/use-cases/fetch-pets-by-state-and-city'
import { Pet, Prisma } from '@prisma/client'

export interface PetFindManyByOrgIds {
  orgIds: string[]
  filters?: FetchPetsFilters
}

export interface PetsRepository {
  findById(id: string): Promise<Pet | null>
  findManyByOrgIds(data: PetFindManyByOrgIds): Promise<Pet[]>
  create(data: Prisma.PetUncheckedCreateInput): Promise<Pet>
}
